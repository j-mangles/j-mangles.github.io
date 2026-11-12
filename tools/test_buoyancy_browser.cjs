/* Real Chrome buoyancy investigation regression test. Matter unit remains marked coming soon. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),{chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:820},acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/science/#cells/theory",{waitUntil:"domcontentloaded",timeout:30000});
   // Matter is intentionally unreleased; mount the module only inside this automated QA page.
   await page.evaluate(()=>{
    const testRoot=document.createElement("section");
    testRoot.id="test-buoyancy-qa";
    document.body.appendChild(testRoot);
    window.HUB.lessonTools["matter/density"](testRoot);
   });
   const lab=page.locator("#test-buoyancy-qa .bl");await lab.waitFor({state:"visible",timeout:15000});
   assert.match(await lab.locator("h3").innerText(),/Buoyancy/i);
   await lab.locator("#bl-liquid").selectOption("water");
   await lab.locator("#bl-predict").selectOption("float");
   await lab.locator("#bl-test").click();
   assert.match(await lab.locator("#bl-result").innerText(),/floating|float/i);
   await lab.locator("#bl-record").click();
   assert.equal(await lab.locator("#bl-rows tr").count(),1);
   await lab.locator("#bl-liquid").selectOption("oil");
   await lab.locator("#bl-predict").selectOption("float");
   await lab.locator("#bl-test").click();
   await lab.locator("#bl-record").click();
   await lab.locator("#bl-liquid").selectOption("salt");
   await lab.locator("#bl-test").click();
   await lab.locator("#bl-record").click();
   assert.equal(await lab.locator("#bl-rows tr").count(),3);
   await lab.locator("#bl-export").click();
   assert.match(await lab.locator("#bl-export-status").innerText(),/six words/);
   for(const id of ["claim","evidence","reasoning"]){
    await lab.locator("#bl-"+id).fill("My model comparison shows that different liquids have different densities and buoyancy effects.");
   }
   const [download]=await Promise.all([page.waitForEvent("download",{timeout:10000}),lab.locator("#bl-export").click()]);
   assert.equal(download.suggestedFilename(),"buoyancy-investigation.txt");
   const text=fs.readFileSync(await download.path(),"utf8");
   assert.match(text,/Trial 3/);assert.match(text,/Salty water/);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No horizontal overflow at "+width);
   assert.deepEqual(errors,[]);
   await page.close();
  }
  console.log("Buoyancy browser pass: different liquid densities, predictions, observations, CER and file export.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});