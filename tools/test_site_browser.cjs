/* Browser QA for real subject pages and live tools, rather than isolated DOM mocks.
 * Run: python3 -m http.server 8765 &; node tools/test_site_browser.cjs
 * Requires: npm install --no-save playwright; npx playwright install chromium
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,".."),artifacts=path.join(root,"browser-artifacts");
fs.mkdirSync(artifacts,{recursive:true});
const origin=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const courses=["math","science","ela","critical-thinking"];
async function goto(page,route,selector){
 const response=await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:30000});
 assert.equal(response.status(),200,"HTTP error at "+route);
 await page.locator(selector).first().waitFor({state:"visible",timeout:20000});
}
async function capture(page,label){
 await page.screenshot({path:path.join(artifacts,label+".png"),fullPage:true,animations:"disabled"});
}
async function checkNoHorizontalOverflow(page,label){
 const o=await page.evaluate(()=>({width:window.innerWidth,scroll:document.documentElement.scrollWidth}));
 assert.ok(o.scroll<=o.width+6,label+" overflows: "+JSON.stringify(o));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--disable-dev-shm-usage"]});
 let page=null,stage="initial";
 try{
  page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
  const jsErrors=[];
  page.on("pageerror",err=>jsErrors.push({url:page.url(),message:err.message}));
  stage="homepage";
  await goto(page,"/",".home-tiles .home-tile");
  assert.equal(await page.locator(".home-tile").count(),5,"Homepage should have five course cards");
  await capture(page,"01-home-desktop");
  stage="course maps and resource libraries";
  for(const subject of courses){
   await goto(page,"/"+subject+"/#overview","#atlas-unit-grid .atlas-unit");
   assert.ok(await page.locator("#atlas-unit-grid .atlas-unit").count()>1,"Not enough units: "+subject);
   await capture(page,"map-"+subject);
   await page.locator("#course-resources-link").click();
   await page.locator("#resource-grid .resource-card").first().waitFor({timeout:18000});
   assert.ok(await page.locator(".resource-card").count()>10,subject+" resources missing");
   await page.locator("#resource-search").fill("not-a-real-school-topic-zzqq");
   await page.locator("#resource-none").waitFor({state:"visible"});
   await capture(page,"resources-"+subject);
  }
  stage="Math integer operations";
  await goto(page,"/math/#int","#il-problem");
  await page.locator("#il-problem").selectOption("10"); // 4 - (-3)
  await page.locator("#il-answer").fill("7");
  await page.locator("#il-form button[type=submit]").click();
  assert.match(await page.locator("#il-feedback").innerText(),/Correct!/);
  await page.locator('[data-mode="numberline"]').click();
  await page.locator('[data-stage="2"]').click();
  assert.ok(await page.locator("#il-visual svg[role=img]").count()>0);
  await capture(page,"integer-lab-desktop");
  stage="Math fraction operations";
  await goto(page,"/math/#fracops","#fl-case");
  await page.locator("#fl-denominator").fill("4");
  await page.locator("#fl-answer").fill("3/4");
  await page.locator("#fl-form button[type=submit]").click();
  assert.match(await page.locator("#fl-feedback").innerText(),/Correct!/);
  await page.locator('[data-step="2"]').click();
  await capture(page,"fraction-strips-desktop");
  stage="Science solar spectrum";
  await goto(page,"/science/#light","#se-content");
  await page.locator('[data-band="ultraviolet"]').click();
  await page.locator("#se-reference").selectOption("visible");
  await page.locator('[data-relation="shorter"]').click();
  assert.match(await page.locator("#se-response").innerText(),/Correct/);
  await capture(page,"solar-spectrum-desktop");
  stage="Science albedo";
  await page.locator('[data-tab="albedo"]').click();
  await page.locator("#se-slider").fill("70");
  assert.match(await page.locator("#se-albedo-explain").innerText(),/70 reflected, 30 absorbed/);
  await capture(page,"albedo-desktop");
  stage="ELA and Critical Thinking interactive modules";
  for(const [route,label] of [["/ela/#answering/day2","writer-studio"],["/critical-thinking/#lab/l4","evidence-inspector"]]){
   await goto(page,route,"#ltool");
   assert.ok((await page.locator("#ltool").innerText()).length>20,label+" not rendered");
   await capture(page,label+"-desktop");
  }
  stage="Social Studies atlas shell";
  const atlas=await page.request.get(origin+"/social-studies/");
  assert.equal(atlas.status(),200);
  const text=await atlas.text();
  assert.ok(text.includes("Societies of the Past Atlas"),"Historical atlas HTML missing");
  stage="mobile layout";
  const phone=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  phone.on("pageerror",err=>jsErrors.push({url:phone.url(),message:err.message}));
  await goto(phone,"/",".home-tiles .home-tile");
  await checkNoHorizontalOverflow(phone,"Homepage mobile");
  await capture(phone,"home-mobile");
  for(const subject of courses){
   await goto(phone,"/"+subject+"/#overview","#atlas-unit-grid .atlas-unit");
   await checkNoHorizontalOverflow(phone,subject+" overview mobile");
   await capture(phone,"map-"+subject+"-mobile");
  }
  await goto(phone,"/math/#int","#il-problem");
  await capture(phone,"integer-lab-mobile");
  await goto(phone,"/science/#light","#se-content");
  await capture(phone,"solar-spectrum-mobile");
  await phone.close();
  assert.deepEqual(jsErrors,[],"Uncaught browser exceptions: "+JSON.stringify(jsErrors));
  console.log("Browser QA passed: homepage, 4 maps, 4 libraries, integer/fraction/spectrum/albedo tools, ELA, CT, social atlas and mobile.");
 }catch(e){
  console.error("Browser QA failed at stage:",stage);
  console.error(e);
  if(page)try{await capture(page,"failure-"+stage.replace(/[^a-z0-9]+/gi,"-").toLowerCase())}catch{}
  process.exitCode=1;
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
