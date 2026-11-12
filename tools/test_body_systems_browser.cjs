/* Real Chrome body systems exploration, new muscle and skeleton selection. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:845}});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE+"/science/#cells/systems",{waitUntil:"domcontentloaded",timeout:30000});
   await page.locator(".hsi").waitFor({state:"visible",timeout:15000});
   assert.equal(await page.locator(".hsi .tabs [data-system]").count(),7);
   await page.locator('.hsi .tabs [data-system="muscular"]').click();
   assert.match(await page.locator(".hsi .detail").innerText(),/Skeletal muscles/);
   assert.match(await page.locator(".hsi .detail").innerText(),/tendons/i);
   await page.locator('.hsi .steps [data-step="2"]').click();
   assert.match(await page.locator(".hsi .step-detail").innerText(),/Tendon and bone/);
   await page.locator('.hsi .tabs [data-system="skeletal"]').click();
   assert.match(await page.locator(".hsi .detail").innerText(),/joints/);
   await page.locator('.hsi .steps [data-step="1"]').click();
   assert.match(await page.locator(".hsi .step-detail").innerText(),/joint/i);
   await page.locator('.hsi [data-organ="muscular"]').focus();
   await page.keyboard.press("Enter");
   assert.match(await page.locator(".hsi .detail").innerText(),/Muscular system/i);
   const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dims.scroll<=dims.viewport+4,"No horizontal overflow at "+width);
   assert.deepEqual(errors,[],"No JavaScript errors");
   const artifacts=path.resolve(__dirname,"../browser-artifacts");fs.mkdirSync(artifacts,{recursive:true});
   await page.screenshot({path:path.join(artifacts,"science-systems-"+width+".png"),fullPage:true,animations:"disabled"});
   await page.close();
  }
  console.log("Human Systems Chrome pass: seven tabs, muscles, bones, keyboard organ controls, mobile/desktop.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});