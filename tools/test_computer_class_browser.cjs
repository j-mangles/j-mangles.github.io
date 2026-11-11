/* Real-Chrome Computer Class end-to-end checks at phone and desktop widths. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const shots=path.resolve(__dirname,"../browser-artifacts");
fs.mkdirSync(shots,{recursive:true});
const routes=["science-membranes","social-mesopotamia","math-store","ela-slides","thinking-case"];
function checkOverflow(actual,where,width){assert.ok(actual.scroll<=actual.viewport+4,where+" width="+width+" overflow: "+JSON.stringify(actual));}
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
 for(const width of [390,1200]){
  const page=await browser.newPage({viewport:{width,height:844},acceptDownloads:true,deviceScaleFactor:1});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto(BASE+"/",{waitUntil:"domcontentloaded",timeout:30000});
  await page.locator(".home-computer-link").waitFor({state:"visible"});
  assert.equal(await page.locator(".home-computer-link").getAttribute("href"),"computer-class/");
  await page.goto(BASE+"/computer-class/",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator(".cc-entry").count(),5,"All subjects listed");
  assert.ok(await page.locator(".cc-policy").innerText().then(x=>x.includes("Nothing is submitted")));
  checkOverflow(await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth})),"directory",width);
  for(const id of routes){
   await page.goto(BASE+"/computer-class/#"+id,{waitUntil:"domcontentloaded"});
   await page.locator(".cc-question").first().waitFor({state:"visible",timeout:15000});
   const size=await page.locator(".cc-question").count();
   assert.ok(size>=8,"Complete computer-class lesson: "+id);
   assert.ok(await page.locator(".cc-reading p").count()>=3,"A reading context for "+id);
   assert.ok(await page.locator("#cc-progress-count").innerText().then(x=>x.includes("0 of")));
   checkOverflow(await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth})),id,width);
  }
  await page.goto(BASE+"/computer-class/#science-membranes");
  const answer="Water moves through the membrane toward the higher solute concentration, so water leaves Cell A overall.";
  await page.locator('textarea[data-id="sc3"]').fill(answer);
  assert.ok(await page.locator("#cc-progress-count").innerText().then(x=>x.includes("1 of 8")));
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator('textarea[data-id="sc3"]').inputValue(),answer,"Draft survived refresh");
  await page.locator('input[name="choice-sc1"][value="0"]').check();
  await page.locator('[data-action="check"][data-id="sc1"]').click();
  assert.match(await page.locator("#cc-feedback-sc1").innerText(),/Not quite/);
  await page.locator('input[name="choice-sc1"][value="1"]').check();
  await page.locator('[data-action="check"][data-id="sc1"]').click();
  assert.match(await page.locator("#cc-feedback-sc1").innerText(),/Correct/);
  const order=[1,3,2,0];
  for(let i=0;i<order.length;i++)await page.locator('select[data-id="sc5"][data-position="'+i+'"]').selectOption(String(order[i]));
  await page.locator('[data-action="check"][data-id="sc5"]').click();
  assert.match(await page.locator("#cc-feedback-sc5").innerText(),/Correct/);
  await page.goto(BASE+"/computer-class/#math-store");
  const values={ma1:"18",ma2:"54",ma3:"6.48",ma4:"60.48",ma5:"19.52",ma6:"51"};
  for(const [id,v] of Object.entries(values))await page.locator('input[data-id="'+id+'"]').fill(v);
  await page.locator('input[name="choice-ma7"][value="1"]').check();
  await page.locator('input[name="choice-ma8"][value="0"]').check();
  await page.locator('textarea[data-id="ma9"]').fill("I converted twenty five percent to one quarter, found eighteen dollars off, then calculated twelve percent of fifty four dollars for tax.");
  await page.locator('textarea[data-id="ma10"]').fill("Calculate the discount before the tax and keep track of whether each amount is a dollar value or a percent.");
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"10 of 10 responses complete");
  await page.locator("#cc-student-name").fill("Alex Example");
  await page.locator('[data-action="review"]').click();
  assert.match(await page.locator("#cc-finish-status").innerText(),/All 10 responses complete/);
  const [download]=await Promise.all([
   page.waitForEvent("download", {timeout:10000}),
   page.locator('[data-action="download"]').click()
  ]);
  assert.match(download.suggestedFilename(),/math-store-alex-example\.txt/);
  const file=await download.path();
  const contents=fs.readFileSync(file,"utf8");
  assert.match(contents,/Alex Example/);
  assert.match(contents,/60.48/);
  assert.match(contents,/End of assignment/);
  assert.match(await page.locator("#cc-finish-status").innerText(),/Follow your teacher/);
  page.once("dialog",dialog=>dialog.accept());
  await page.locator('[data-action="clear"]').click();
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"0 of 10 responses complete","Clear answers");
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"0 of 10 responses complete","Clear persisted");
  if(width===390){
   await page.goto(BASE+"/computer-class/");
   await page.screenshot({path:path.join(shots,"computer-class-mobile-directory.png"),fullPage:true,animations:"disabled"});
   await page.goto(BASE+"/computer-class/#ela-slides");
   await page.screenshot({path:path.join(shots,"computer-class-mobile-ela.png"),fullPage:true,animations:"disabled"});
  }
  assert.deepEqual(errors,[],"No uncaught JS errors at "+width+"px");
  await page.close();
 }
 console.log("Computer Class browser pass: 5 subjects, 2 widths, self-checks, draft reload, full completion, download and clearing.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
