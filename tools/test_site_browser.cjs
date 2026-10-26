/* Browser QA for real subject pages and live tools, rather than isolated DOM mocks.
 * Run: python3 -m http.server 8765 &; node tools/test_site_browser.cjs
 * Requires: npm install --no-save playwright-core; uses preinstalled Google Chrome
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const root=path.resolve(__dirname,".."),artifacts=path.join(root,"browser-artifacts");
fs.mkdirSync(artifacts,{recursive:true});
const origin=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const courses=["math","science","ela","critical-thinking"];
async function goto(page,route,selector){
 const response=await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:30000});
 if(response)assert.equal(response.status(),200,"HTTP error at "+route); // hash-only navigation has no HTTP response
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
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
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
  stage="Math equation balance scale";
  await goto(page,"/math/#eq","#bs-problem");
  await page.locator('[data-op="leftRemove"]').click();
  assert.match(await page.locator("#bs-reason").innerText(),/equality is no longer true/i);
  await page.locator('[data-op="bothRemove"]').click();
  assert.match(await page.locator("#bs-reason").innerText(),/leaves x on one side/i);
  await page.locator("#bs-answer").fill("7");
  await page.locator('#bs-form button[type="submit"]').click();
  assert.match(await page.locator("#bs-feedback").innerText(),/Correct/i);
  await capture(page,"equation-balance-desktop");
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
  stage="Science Earth layers";
  await goto(page,"/science/#earth","#ee-content");
  await page.locator('[data-layer="outer"]').click();
  assert.match(await page.locator("#ee-content").innerText(),/liquid iron-rich/i);
  await capture(page,"earth-layers-desktop");
  stage="Science plate boundaries";
  await page.locator('[data-tab="boundaries"]').click();
  await page.locator('[data-boundary="subduction"]').click();
  await page.locator("#ee-movement").fill("80");
  assert.ok((await page.locator("#ee-boundary-picture svg").getAttribute("aria-label")).includes("Subduction"));
  await page.locator('[data-choice="0"]').click();
  assert.match(await page.locator("#ee-response").innerText(),/Correct/);
  await page.locator("#ee-reflection").fill("The oceanic plate goes under the continent because it is denser.");
  await capture(page,"earth-boundaries-desktop");
  stage="Science continental drift evidence";
  await page.locator('[data-tab="evidence"]').click();
  await page.locator('[data-evidence="fossils"]').click();
  await page.locator("#ee-reveal").click();
  assert.match(await page.locator("#ee-interpretation").innerText(),/continents were connected/);
  await capture(page,"earth-evidence-desktop");
  stage="ELA and Critical Thinking interactive modules";
  for(const [route,label] of [["/ela/#answering/day2","writer-studio"],["/critical-thinking/#lab/l4","evidence-inspector"]]){
   await goto(page,route,"#ltool");
   assert.ok((await page.locator("#ltool").innerText()).length>20,label+" not rendered");
   await capture(page,label+"-desktop");
  }
  stage="Critical Thinking payoff matrix";
  await goto(page,"/critical-thinking/#games/g1","#pl-a");
  await page.locator("#pl-a").selectOption("alwaysC");
  await page.locator("#pl-b").selectOption("alwaysC");
  await page.locator("#pl-run").click();
  assert.match(await page.locator("#pl-output").innerText(),/Player A 30.*Player B 30/);
  assert.ok(await page.locator("#pl-output svg[role=img]").count()>0);
  await page.locator('[data-cell="BC"]').click();
  assert.match(await page.locator("#pl-explain").innerText(),/5 points/);
  await capture(page,"thinklab-payoff-matrix-desktop");
  stage="ELA plot evidence board";
  await goto(page,"/ela/#stories/plot","#pb-text");
  await page.locator("#pb-text").selectOption("thankyou");
  await page.locator('[data-moment="3"]').fill("Roger changes his decision.");
  await page.locator('[data-evidence="3"]').fill("A specific moment from the assigned story copy.");
  await page.locator('[data-tension="3"]').fill("9");
  assert.match(await page.locator('[data-output="3"]').innerText(),/9/);
  assert.ok((await page.locator("#pb-graph svg").getAttribute("aria-label")).includes("Climax 9 of 10"));
  await capture(page,"ela-plot-board-desktop");
  stage="Social Studies comparative chronology";
  await goto(page,"/social-studies/compare.html","#period-a");
  await page.locator("#period-a").selectOption("greece");
  await page.locator("#period-b").selectOption("rome");
  assert.match(await page.locator("#overlap-description").innerText(),/overlap from approximately/);
  await page.locator('[data-answer="greece"]').click();
  assert.match(await page.locator("#feedback").innerText(),/Correct/);
  await capture(page,"atlas-civilization-compare-desktop");
  stage="ELA camera shot visualizer";
  await goto(page,"/ela/#film","#ss-shots");
  await page.locator('[data-shot="extreme-close"]').click();
  assert.match(await page.locator("#ss-explain").innerText(),/detail/);
  await page.locator('[data-scene="1"]').click();
  await page.locator("#ss-choice").selectOption("extreme-close");
  await page.locator("#ss-reason").fill("I want viewers to notice what is written without seeing the whole room.");
  await page.locator('[data-scene="0"]').click();
  await page.locator('[data-scene="1"]').click();
  assert.match(await page.locator("#ss-reason").inputValue(),/what is written/);
  await capture(page,"ela-camera-shot-studio-desktop");
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
  await goto(phone,"/math/#eq","#bs-problem");
  await checkNoHorizontalOverflow(phone,"Equation Balance mobile");
  await capture(phone,"equation-balance-mobile");
  await goto(phone,"/science/#light","#se-content");
  await capture(phone,"solar-spectrum-mobile");
  await goto(phone,"/ela/#film","#ss-shots");
  await checkNoHorizontalOverflow(phone,"ELA Camera Studio mobile");
  await capture(phone,"ela-camera-mobile");
  await goto(phone,"/ela/#stories/plot","#pb-text");
  await checkNoHorizontalOverflow(phone,"ELA Plot Board mobile");
  await capture(phone,"ela-plot-board-mobile");
  await goto(phone,"/critical-thinking/#games/g1","#pl-a");
  await capture(phone,"thinklab-payoff-mobile");
  await goto(phone,"/social-studies/compare.html","#period-a");
  await checkNoHorizontalOverflow(phone,"Civilization comparison mobile");
  await capture(phone,"atlas-compare-mobile");
  await goto(phone,"/science/#earth","#ee-content");
  await checkNoHorizontalOverflow(phone,"Earth science mobile");
  await capture(phone,"earth-explorer-mobile");
  await phone.close();
  assert.deepEqual(jsErrors,[],"Uncaught browser exceptions: "+JSON.stringify(jsErrors));
  console.log("Browser QA passed: homepage, 4 maps, 4 libraries, integer/fraction/equation/spectrum/albedo/Earth tools, ELA, CT, social atlas and mobile.");
 }catch(e){
  console.error("Browser QA failed at stage:",stage);
  console.error(e);
  if(page)try{await capture(page,"failure-"+stage.replace(/[^a-z0-9]+/gi,"-").toLowerCase())}catch{}
  process.exitCode=1;
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
