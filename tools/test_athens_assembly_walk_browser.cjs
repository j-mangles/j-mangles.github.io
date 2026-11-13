"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const origin=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const artifacts=path.resolve(__dirname,"../browser-artifacts");
fs.mkdirSync(artifacts,{recursive:true});

(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  const desktop=await browser.newPage({viewport:{width:1280,height:820},deviceScaleFactor:1});
  const errors=[];desktop.on("pageerror",e=>errors.push(e.message));
  const response=await desktop.goto(origin+"/social-studies/athens-assembly-walk.html",{waitUntil:"domcontentloaded"});
  assert.equal(response.status(),200);
  await desktop.locator("#begin").click();
  assert.equal(await desktop.locator("#mission").isHidden(),true);

  // Verify real keyboard movement and proximity interaction at the Agora.
  await desktop.keyboard.down("ArrowUp");
  await desktop.waitForTimeout(1100);
  await desktop.keyboard.up("ArrowUp");
  await desktop.keyboard.press("e");
  await desktop.getByText("The Agora was a commercial and civic gathering place.",{exact:false}).waitFor();
  assert.match(await desktop.locator("#count").innerText(),/1 of 3 clues/);

  // The remaining places can also be reached through the accessible location controls.
  await desktop.locator('[data-site="pnyx"]').focus();
  await desktop.keyboard.press("Enter");
  await desktop.locator('[data-site="court"]').click();
  assert.match(await desktop.locator("#count").innerText(),/3 of 3 clues/);
  assert.equal(await desktop.locator("#conclude").isEnabled(),true);
  await desktop.screenshot({path:path.join(artifacts,"athens-field-walk-desktop.png"),fullPage:true,animations:"disabled"});

  await desktop.locator("#conclude").click();
  await desktop.locator("#claim").selectOption({label:"Athens used direct democracy, but political participation was limited to a smaller citizen group."});
  await desktop.locator("#response").fill("The Assembly met at the Pnyx, and some public roles were chosen by lot. Only eligible male citizens could participate, so many residents were excluded.");
  const downloadPromise=desktop.waitForEvent("download");
  await desktop.locator("#download").click();
  const download=await downloadPromise;
  assert.equal(download.suggestedFilename(),"athens-field-walk-report.txt");
  assert.equal(await desktop.evaluate(()=>document.activeElement.id),"download","Download action should return focus to the dialog");
  await desktop.keyboard.press("Escape");
  assert.equal(await desktop.locator("#final").isHidden(),true);
  assert.deepEqual(errors,[],"Desktop game should not raise browser errors");

  const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  mobile.on("pageerror",e=>errors.push(e.message));
  await mobile.goto(origin+"/social-studies/athens-assembly-walk.html",{waitUntil:"domcontentloaded"});
  await mobile.locator("#begin").click();
  assert.equal(await mobile.locator('[data-move="up"]').isVisible(),true);
  await mobile.locator('[data-site="pnyx"]').click();
  await mobile.locator('[data-site="agora"]').click();
  await mobile.locator('[data-site="court"]').click();
  assert.match(await mobile.locator("#count").innerText(),/3 of 3 clues/);
  const dimensions=await mobile.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(dimensions.scroll<=dimensions.width+6,"Mobile page should not overflow horizontally: "+JSON.stringify(dimensions));
  await mobile.screenshot({path:path.join(artifacts,"athens-field-walk-mobile.png"),fullPage:true,animations:"disabled"});
  assert.deepEqual(errors,[],"Game should not raise browser errors");
  console.log("Athens Assembly Walk PASS: keyboard movement, keyboard and touch location access, evidence, conclusion, report download and mobile overflow.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
