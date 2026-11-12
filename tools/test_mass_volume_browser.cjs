/* Real Chrome: mass-volume graph, slope comparison, editable observations and local export. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),{chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:820},acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/science/#cells/theory",{waitUntil:"domcontentloaded",timeout:30000});
   await page.locator(".vm").waitFor({state:"visible",timeout:15000});
   const mounted=await page.evaluate(()=>{
     const root=document.createElement("section");root.id="qa-density-root";document.body.appendChild(root);
     window.HUB.lessonTools["matter/density"](root);
     return {graph:root.querySelectorAll(".mvg").length,buoyancy:root.querySelectorAll(".bl").length};
   });
   assert.equal(mounted.graph,1,"Mass-volume model appears on Density lesson");
   assert.equal(mounted.buoyancy,1,"Existing buoyancy investigation is preserved");
   const lab=page.locator("#qa-density-root .mvg");
   assert.match(await lab.locator("h3").innerText(),/Mass.*Volume/i);
   await lab.locator("#mvg-export").click();
   assert.match(await lab.locator("#mvg-export-status").innerText(),/two different volumes/i);
   for(const id of ["wood","plastic","metal"]){
    await lab.locator("#mvg-material").selectOption(id);
    for(const volume of ["20","40"]){
     await lab.locator("#mvg-volume").selectOption(volume);
     await lab.locator("#mvg-measure").click();
    }
   }
   assert.equal(await lab.locator("#mvg-records tr").count(),6);
   assert.equal(await lab.locator("#mvg-chart svg circle").count(),6);
   assert.match(await lab.locator("#mvg-slopes").innerText(),/2.7 g\/cm³/);
   await lab.locator("#mvg-predict").selectOption("metal");
   await lab.locator("#mvg-check").click();
   assert.match(await lab.locator("#mvg-check-status").innerText(),/Correct/);
   await lab.locator("#mvg-export").click();
   assert.match(await lab.locator("#mvg-export-status").innerText(),/six words/i);
   for(const id of ["claim","evidence","reason"]){
    await lab.locator("#mvg-"+id).fill("I measured different blocks and compared the mass versus volume slopes to infer density.");
   }
   const [download]=await Promise.all([page.waitForEvent("download",{timeout:10000}),lab.locator("#mvg-export").click()]);
   assert.equal(download.suggestedFilename(),"mass-volume-investigation.txt");
   const report=fs.readFileSync(await download.path(),"utf8");
   assert.match(report,/Slope Sample C/);assert.match(report,/2.7 g\/cm³/);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No horizontal overflow at "+width);
   assert.deepEqual(errors,[]);
   const dir=path.resolve(__dirname,"../browser-artifacts");fs.mkdirSync(dir,{recursive:true});
   await page.screenshot({path:path.join(dir,"science-mass-volume-"+width+".png"),fullPage:true,animations:"disabled"});
   await page.close();
  }
  console.log("Mass–volume Chrome passed: three graph series, slopes, predictions, trial validation, export and 390/1100 px widths.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});