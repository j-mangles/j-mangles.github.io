/* Real-Chrome checks: Mission Control planning, board sharing and backup recovery. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const output=path.resolve(__dirname,"../browser-artifacts");
fs.mkdirSync(output,{recursive:true});
const overflow=async(page,label)=>{
 const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth}));
 assert.ok(dims.scroll<=dims.viewport+4,label+" has horizontal overflow: "+JSON.stringify(dims));
};
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,820,1280]){
   const context=await browser.newContext({viewport:{width,height:845},deviceScaleFactor:1,acceptDownloads:true});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",err=>errors.push(err.message));
   await page.goto(BASE+"/",{waitUntil:"domcontentloaded",timeout:30000});
   await page.locator('a[href="today/"]').waitFor({state:"visible"});
   await page.goto(BASE+"/today/",{waitUntil:"domcontentloaded"});
   await page.locator(".mc-block").first().waitFor({state:"visible"});
   assert.equal(await page.locator(".mc-days button").count(),6);
   assert.equal(await page.locator(".mc-block").count(),5);
   assert.equal(await page.locator("#mc-resource-0").inputValue(),"lesson:math-home");
   assert.match(await page.locator(".mc-progressline").innerText(),/1 of 5 blocks assigned/);
   await overflow(page,"planner "+width);
   await page.locator("#mc-resource-1").selectOption("assignment:science-membranes");
   assert.match(await page.locator("#mc-info-1").innerText(),/Cell Membrane Investigation/);
   await page.locator("#mc-note-1").fill("PRIVATE teacher preparation: print the materials.");
   await page.locator('input[data-field="taught"][data-slot="1"]').check();
   assert.match(await page.locator(".mc-progressline").innerText(),/2 of 5 blocks assigned.*1 marked done/);
   const boardUrl=await page.locator("#mc-share").inputValue();
   assert.match(boardUrl,/#v1\/1\//);
   assert.ok(!boardUrl.includes("PRIVATE"));
   assert.ok(!boardUrl.includes("print"));
   await page.reload({waitUntil:"domcontentloaded"});
   await page.locator(".mc-block").first().waitFor();
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"assignment:science-membranes");
   assert.equal(await page.locator("#mc-note-1").inputValue(),"PRIVATE teacher preparation: print the materials.");
   assert.equal(await page.locator('input[data-field="taught"][data-slot="1"]').isChecked(),true);
   await page.locator('button[data-day="2"]').click();
   assert.equal(await page.locator("#mc-resource-0").inputValue(),"lesson:math-home");
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"");
   await page.locator("#mc-resource-2").selectOption("lesson:ela-plot");
   assert.match(await page.locator(".mc-progressline").innerText(),/2 of 5 blocks assigned/);
   await page.locator('button[data-day="1"]').click();
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"assignment:science-membranes");
   const board=await context.newPage();
   board.on("pageerror",err=>errors.push(err.message));
   await board.goto(boardUrl,{waitUntil:"domcontentloaded"});
   await board.locator(".mb-card").first().waitFor();
   assert.match(await board.locator("h1").innerText(),/Today in class/);
   assert.match(await board.locator(".mb-day").innerText(),/Day 1/);
   assert.equal(await board.locator(".mb-card").count(),2);
   assert.match(await board.locator(".mb-card").last().innerText(),/Cell Membrane Investigation/);
   assert.ok(!(await board.locator("body").innerText()).includes("PRIVATE teacher preparation"));
   assert.ok(!(await board.locator("body").innerText()).includes("print the materials"));
   await board.locator('[data-focus="2"]').click();
   assert.equal(await board.locator('[data-period="1"]').isHidden(),true);
   assert.equal(await board.locator('[data-period="2"]').isVisible(),true);
   await board.locator("#mb-all").click();
   assert.equal(await board.locator(".mb-card:visible").count(),2);
   await overflow(board,"student board "+width);
   await board.close();
   const [backup]=await Promise.all([
    page.waitForEvent("download",{timeout:10000}),
    page.locator("#mc-export").click()
   ]);
   assert.equal(backup.suggestedFilename(),"classroom-six-day-plan.json");
   const json=fs.readFileSync(await backup.path(),"utf8"),parsed=JSON.parse(json);
   assert.equal(parsed.schema,1);
   assert.equal(parsed.days.length,6);
   assert.equal(parsed.days[0].slots[1].resourceId,"assignment:science-membranes");
   assert.equal(parsed.days[0].slots[1].note,"PRIVATE teacher preparation: print the materials.");
   page.once("dialog",dialog=>dialog.accept());
   await page.locator("#mc-reset").click();
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"");
   page.once("dialog",dialog=>dialog.accept());
   await page.locator("#mc-import").setInputFiles({
    name:"classroom-six-day-plan.json",mimeType:"application/json",buffer:Buffer.from(json,"utf8")
   });
   await page.waitForFunction(()=>document.querySelector("#mc-resource-1")?.value==="assignment:science-membranes",null,{timeout:10000});
   assert.equal(await page.locator("#mc-note-1").inputValue(),"PRIVATE teacher preparation: print the materials.");
   assert.equal(await page.locator('input[data-field="taught"][data-slot="1"]').isChecked(),true);
   await page.goto(BASE+"/today/launch.html#v1/1/%3Cscript%3E,-,-,-,-",{waitUntil:"domcontentloaded"});
   assert.match(await page.locator("h1").innerText(),/Classroom Board/);
   assert.equal(await page.locator(".mb-card").count(),0);
   await overflow(page,"malformed board "+width);
   assert.deepEqual(errors,[],"No JavaScript exceptions at "+width+"px");
   if(width===390||width===1280){
    await page.goto(BASE+"/today/",{waitUntil:"domcontentloaded"});
    await page.screenshot({path:path.join(output,"mission-"+width+"-planner.png"),fullPage:true,animations:"disabled"});
    await page.goto(boardUrl,{waitUntil:"domcontentloaded"});
    await page.screenshot({path:path.join(output,"mission-"+width+"-board.png"),fullPage:true,animations:"disabled"});
   }
   await context.close();
  }
  console.log("Mission Control Chrome passed: six-day plans, session reload, private notes, safe student links, focus mode, backup and restore at 390/820/1280px.");
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});