/* Browser QA: new organ hotspots, keyboard, cross-system knowledge and downloaded evidence. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),{chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:830},acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/science/#cells/systems",{waitUntil:"domcontentloaded",timeout:30000});
   const lab=page.locator(".hsi .oi");await lab.waitFor({state:"visible",timeout:15000});
   assert.equal(await page.locator(".hsi svg .oi-marker").count(),12);
   assert.equal(await lab.locator(".oi-list button").count(),12);
   await lab.locator('[data-part="lungs"]').click();
   assert.match(await lab.locator("#oi-job").innerText(),/oxygen/);
   await lab.locator('.oi-answer [data-answer="Circulatory"]').click();
   assert.match(await lab.locator("#oi-feedback").innerText(),/Correct/);
   await page.locator('.hsi .oi-marker[data-part="heart"]').focus();
   await page.keyboard.press("Enter");
   assert.match(await lab.locator("#oi-name").innerText(),/Heart/);
   await lab.locator('.oi-answer [data-answer="Respiratory"]').click();
   await lab.locator('.oi-list [data-part="femur"]').click();
   await lab.locator('.oi-answer [data-answer="Muscular"]').click();
   assert.match(await lab.locator("#oi-progress").innerText(),/3 of 12/);
   await lab.locator("#oi-export").click();
   assert.match(await lab.locator("#oi-download-status").innerText(),/24 words/);
   await lab.locator("#oi-explain").fill("The heart is part of the circulatory system and the lungs belong to the respiratory system. Blood flows through lung capillaries where oxygen enters the blood and carbon dioxide leaves.");
   const [download]=await Promise.all([page.waitForEvent("download",{timeout:10000}),lab.locator("#oi-export").click()]);
   assert.equal(download.suggestedFilename(),"organ-systems-investigation.txt");
   const text=fs.readFileSync(await download.path(),"utf8");
   assert.match(text,/Lungs/);assert.match(text,/Femur/);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No horizontal overflow "+width);
   assert.deepEqual(errors,[],"No JavaScript errors at width "+width);
   const dir=path.resolve(__dirname,"../browser-artifacts");fs.mkdirSync(dir,{recursive:true});
   await page.screenshot({path:path.join(dir,"science-organ-inspector-"+width+".png"),fullPage:true,animations:"disabled"});
   await page.close();
  }
  console.log("Organ Inspector Chrome passed: 12 markers, touch/keyboard, cross-system checks, export and mobile/desktop.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});