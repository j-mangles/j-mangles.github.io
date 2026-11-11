/* In-browser smoke tests for the seven new Grade 8 science labs.
   Start: python3 -m http.server 8765
   Requires playwright-core and locally installed Google Chrome. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const {chromium}=require("playwright-core");
const origin=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const screenshots=path.resolve(__dirname,"../browser-artifacts");
fs.mkdirSync(screenshots,{recursive:true});
const tasks=[
 {hash:"cells/systems",selector:".dn",async check(page){
  await page.locator('.dn button[data-stage="3"]').click();
  assert.match(await page.locator(".dn .readout").innerText(),/Small intestine/);
  assert.ok(await page.locator(".hsi").count()===1,"Human systems explorer must remain present");
  assert.ok(await page.locator(".hx-lab").count()===1,"Homeostasis lab must remain present");
 }},
 {hash:"cells/reproduction",selector:".cd",async check(page){
  await page.locator("#cd-cycle").click();
  assert.equal((await page.locator("#cd-normal-count").innerText()).trim(),"2");
  await page.locator("#cd-cycle").click();
  assert.equal((await page.locator("#cd-free-count").innerText()).trim(),"4");
  await page.locator('button[data-phase="2"]').click();
  assert.match(await page.locator("#cd-phase-note").innerText(),/DNA/);
 }},
 {hash:"matter/viscosity",selector:".vl",async check(page){
  assert.match(await page.locator("#vl-status").innerText(),/Fluid A flows faster/);
  await page.locator("#vl-record").click();
  assert.equal(await page.locator("#vl-trials tr").count(),1);
  await page.locator("#vl-tb").fill("50");
  assert.match(await page.locator("#vl-fair").innerText(),/Temperatures differ/);
 }},
 {hash:"matter/water",selector:".wl",async check(page){
  await page.locator("#wl-temp").fill("4");
  assert.equal((await page.locator("#wl-density").innerText()).trim(),"1.0000");
  await page.locator('button[data-phase="ice"]').click();
  assert.equal((await page.locator("#wl-density").innerText()).trim(),"0.9200");
  await page.locator("#wl-record").click();
  assert.equal(await page.locator("#wl-trials tr").count(),1);
 }},
 {hash:"light/u3t2-refraction",selector:".rr",async check(page){
  await page.locator("#rr-from").selectOption("water");
  await page.locator("#rr-to").selectOption("air");
  await page.locator("#rr-angle").fill("60");
  assert.match(await page.locator("#rr-reading").innerText(),/Total internal reflection/);
  await page.locator("#rr-record").click();
  assert.equal(await page.locator("#rr-trials tr").count(),1);
 }},
 {hash:"earth/e6-seafloor",selector:".sf",async check(page){
  await page.locator("#sf-rate").fill("2");
  await page.locator("#sf-distance").fill("100");
  assert.equal((await page.locator("#sf-age").innerText()).trim(),"5.00 Myr");
  await page.locator("#sf-record").click();
  assert.equal(await page.locator("#sf-trials tr").count(),1);
 }},
 {hash:"earth/e11-quakes",selector:".eq",async check(page){
  await page.locator("#eq-depth").fill("30");
  await page.locator("#eq-distance").fill("40");
  assert.equal((await page.locator("#eq-path").innerText()).trim(),"50.0 km");
  assert.equal((await page.locator("#eq-time").innerText()).trim(),"10.0 s");
  await page.locator('[data-tsunami="3"]').click();
  assert.match(await page.locator("#eq-tsunami-info").innerText(),/shallower water/);
 }}
];
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   for(const t of tasks){
    const url=origin+"/science/#"+t.hash;
    await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
    const lab=page.locator("#ltool "+t.selector);
    await lab.waitFor({state:"visible",timeout:20000});
    await t.check(page);
    const overflow=await lab.evaluate(el=>({content:el.scrollWidth,width:el.clientWidth}));
    assert.ok(overflow.content<=overflow.width+5,t.hash+" "+width+" tool overflow: "+JSON.stringify(overflow));
    if(width===390&&["cells/systems","light/u3t2-refraction","earth/e11-quakes"].includes(t.hash)){
     await page.screenshot({path:path.join(screenshots,"science-"+t.hash.replace("/","-")+"-mobile.png"),fullPage:true,animations:"disabled"});
    }
   }
   assert.deepEqual(errors,[],"Uncaught browser JS errors at "+width+"px");
   await page.close();
  }
  console.log("Seven Science labs passed in real Chrome at 390px and 1100px.");
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
