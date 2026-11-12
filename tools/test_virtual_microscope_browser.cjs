/* Microscope end-to-end Chrome test — released Grade 8 Cells lesson. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core"),BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1024]){
   const page=await browser.newPage({viewport:{width,height:820},acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/science/#cells/theory",{waitUntil:"domcontentloaded",timeout:30000});
   const lab=page.locator(".vm");
   await lab.waitFor({state:"visible",timeout:15000});
   assert.match(await lab.locator("h3").innerText(),/Virtual Microscope/);
   assert.match(await lab.locator("#vm-field").innerText(),/4500/);
   await lab.locator("#vm-predict").selectOption("fewer");
   await lab.locator("#vm-check").click();
   assert.match(await lab.locator("#vm-feedback").innerText(),/Correct/);
   await lab.locator("#vm-objective").selectOption("40");
   assert.match(await lab.locator("#vm-field").innerText(),/450/);
   await lab.locator("#vm-focus").fill("30");
   await lab.locator("#vm-count").fill("4");
   await lab.locator("#vm-record").click();
   assert.match(await lab.locator("#vm-record-status").innerText(),/Focus/);
   await lab.locator("#vm-focus").fill("100");
   await lab.locator("#vm-record").click();
   assert.match(await lab.locator("#vm-record-status").innerText(),/Trial/);
   await lab.locator("#vm-record").click();
   assert.match(await lab.locator("#vm-record-status").innerText(),/Already recorded/);
   await lab.locator("#vm-slide").selectOption("cheek");
   await lab.locator("#vm-record").click();
   await lab.locator("#vm-objective").selectOption("10");
   await lab.locator("#vm-count").fill("20");
   await lab.locator("#vm-record").click();
   assert.equal(await lab.locator("#vm-rows tr").count(),3);
   await lab.locator("#vm-export").click();
   assert.match(await lab.locator("#vm-export-status").innerText(),/six words/);
   for(const id of ["claim","evidence","reasoning"]){
    await lab.locator("#vm-"+id).fill("My evidence shows that field size changes as the microscope magnification changes.");
   }
   const [download]=await Promise.all([page.waitForEvent("download",{timeout:10000}),lab.locator("#vm-export").click()]);
   assert.equal(download.suggestedFilename(),"virtual-microscope-investigation.txt");
   const report=fs.readFileSync(await download.path(),"utf8");
   assert.match(report,/Trial 3/);assert.match(report,/450 µm/);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No horizontal overflow at "+width);
   assert.deepEqual(errors,[],"No JavaScript errors at "+width);
   await page.close();
  }
  console.log("Microscope browser passed: field sizes, prediction, focus gate, distinct trials, export and responsive layout.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});