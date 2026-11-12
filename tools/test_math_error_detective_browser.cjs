/* Real Chrome: Grade 7 Error Detective corrective reasoning, feedback and export. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),{chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1200]){
   const page=await browser.newPage({viewport:{width,height:820},acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/math/#fdp/l21",{waitUntil:"domcontentloaded",timeout:30000});
   const lab=page.locator(".ed");await lab.waitFor({state:"visible",timeout:15000});
   assert.equal(await lab.locator(".ed-cases button").count(),9);
   await lab.locator("#ed-step").selectOption("1");
   await lab.locator("#ed-value").fill("0.5");
   await lab.locator("#ed-reason").fill("Moving the decimal point one place is incorrect because percent means per hundred.");
   await lab.locator("#ed-check").click();
   assert.match(await lab.locator("#ed-feedback").innerText(),/recalculating/i);
   const answers=[{i:0,step:"1",value:"0.05"},{i:1,step:"1",value:"-0.35"},{i:2,step:"1",value:"20"},{i:3,step:"1",value:"37.5"},{i:4,step:"1",value:"53.76"}];
   for(const answer of answers){
    await lab.locator('.ed-cases [data-case="'+answer.i+'"]').click();
    await lab.locator("#ed-step").selectOption(answer.step);
    await lab.locator("#ed-value").fill(answer.value);
    await lab.locator("#ed-reason").fill("The mistake changes the meaning of the number. I checked the method and recalculated the value.");
    await lab.locator("#ed-check").click();
    assert.match(await lab.locator("#ed-feedback").innerText(),/Correct!/);
   }
   assert.match(await lab.locator("#ed-progress").innerText(),/5 of 9/);
   const [download]=await Promise.all([page.waitForEvent("download",{timeout:10000}),lab.locator("#ed-export").click()]);
   assert.equal(download.suggestedFilename(),"math-error-detective.txt");
   const report=fs.readFileSync(await download.path(),"utf8");
   assert.match(report,/Correct value: 53.76/);assert.match(report,/Total correct cases: 5/);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No overflow at "+width);
   assert.deepEqual(errors,[],"No browser JavaScript errors");
   const dir=path.resolve(__dirname,"../browser-artifacts");fs.mkdirSync(dir,{recursive:true});
   await page.screenshot({path:path.join(dir,"math-error-detective-"+width+".png"),fullPage:true,animations:"disabled"});
   await page.close();
  }
  console.log("Math Error Detective Chrome passed: nine case navigation, corrections, explanation, export and phone/desktop layout.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});