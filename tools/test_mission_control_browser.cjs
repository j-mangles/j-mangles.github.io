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
async function checkStoryLab(page,width) {
 await page.goto(BASE+"/ela/story-lab.html#simulation");
 await page.locator("#keep").click();
 const first=await page.locator("#earlier").innerText();
 await page.getByLabel("Alongside Noor").check();
 await page.getByLabel("Pass the envelope quietly").check();
 assert.notEqual(await page.locator("#scene").innerText(),first);
 assert.equal(await page.locator("#earlier").innerText(),first);
 await page.locator("#step-mode").check();
 assert.equal(await page.locator("#scene p").count(),1);
 assert.equal(await page.locator("#earlier p").count(),1);
 assert.ok(await page.locator("#debrief").isHidden());
 await page.locator("#next-beat").click();
 assert.equal(await page.locator("#scene .changed-beat").count(),1);
 await page.locator("#back-beat").click();
 assert.ok(await page.locator("#back-beat").isDisabled());
 await page.getByRole("link",{name:"Team review",exact:true}).click();
 for(let round=0;round<12;round++){
  await page.locator("#board button:enabled").first().click();
  assert.ok(await page.locator("#judging").isHidden());
  await page.locator("#reveal").click();
  await page.getByRole("button",{name:"Team 1 scores"}).click();
 }
 assert.match(await page.locator("#score").innerText(),/Team 1 · 30.*Team 1 wins/);
 await page.getByRole("button",{name:"Correct last award"}).click();
 await page.reload();
 assert.ok(await page.locator("#judging").isVisible());
 await page.getByRole("button",{name:"Team 2 scores"}).click();
 await page.reload();
 assert.match(await page.locator("#score").innerText(),/Team 1 · 26.*Team 2 · 4/);
 await page.locator("#new-game").click();
 assert.equal(await page.locator("#board button:enabled").count(),12);
 await page.getByRole("link",{name:"Individual test"}).click();
 await page.locator("#student").fill("Test student");
 await page.locator('input[name="q1"]').nth(1).check();
 await page.locator("#questions textarea").first().fill("Two details from the scene.");
 await page.reload();
 assert.match(await page.locator("#progress").textContent(),/2 of 8/);
 assert.equal(await page.locator("#questions textarea").first().inputValue(),"Two details from the scene.");
 const download=page.waitForEvent("download");
 await page.locator("#download").click();
 assert.equal((await download).suggestedFilename(),"blue-line-responses.txt");
 await page.emulateMedia({media:"print"});
 assert.equal(await page.locator(".print-answer").first().innerText(),"Two details from the scene.");
 await page.emulateMedia({media:"screen"});
 if(width===1280||width===390){
  await page.setViewportSize({width,height:width===390?844:900});
  for(const mode of ["simulation","review","test"]){
   await page.goto(BASE+"/ela/story-lab.html#"+mode);
   await overflow(page,"short story "+mode);
   await page.screenshot({path:path.join(output,"mission-story-"+mode+"-"+width+".png")});
  }
 }
}

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
   await page.locator("#mc-filter-1").selectOption("sci");
   await page.locator("#mc-search-1").fill("Cell Membrane");
   assert.match(await page.locator("#mc-filter-count-1").innerText(),/matching resource/);
   assert.ok(await page.locator("#mc-resource-1 option").count()<=5,"Search narrows the catalog");
   await page.locator("#mc-resource-1").selectOption("assignment:science-membranes");
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"assignment:science-membranes");
   assert.match(await page.locator("#mc-resource-1 option:checked").innerText(),/Cell Membrane Investigation/);
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
   await page.locator('button[data-day="3"]').click();
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"");
   await page.locator("#mc-copy-from").selectOption("1");
   page.once("dialog",dialog=>dialog.accept());
   await page.locator("#mc-copy-day").click();
   assert.equal(await page.locator("#mc-resource-1").inputValue(),"assignment:science-membranes");
   assert.equal(await page.locator("#mc-note-1").inputValue(),"PRIVATE teacher preparation: print the materials.");
   assert.equal(await page.locator('input[data-field="taught"][data-slot="1"]').isChecked(),false,
     "Copied day resets completion but retains preparation notes");
   await page.locator('button[data-day="1"]').click();
   assert.equal(await page.locator('input[data-field="taught"][data-slot="1"]').isChecked(),true,
     "Original day completion remains marked");
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
   await page.locator("#mc-filter-1").selectOption("ss");
   await page.locator("#mc-search-1").fill("Gift of the Nile");
   await page.locator("#mc-last-1").selectOption("lesson:released-ss-egypt-l1");
   const shared=await page.locator("#mc-share").inputValue();
   assert.match(shared,/#v2\/1\//);
   assert.ok(!shared.includes("PRIVATE"));
   const visitor=await browser.newContext({viewport:{width,height:845}}),guest=await visitor.newPage();
   await guest.goto(shared,{waitUntil:"domcontentloaded"});
   const warmup=guest.locator(".mb-warmup").first();
   await warmup.locator("summary").first().click();
   assert.ok(await warmup.locator("svg").isVisible());
   await warmup.getByText("Reveal a sample answer",{exact:true}).click();
   assert.ok(await warmup.locator(".wu-answer p").isVisible());
   await overflow(guest,"expanded warm-up "+width);
   await guest.getByRole("link",{name:"Gift of the Nile",exact:true}).click();
   assert.ok(guest.url().endsWith("/social-studies/#egypt-l1"));
   await guest.goBack();
   await guest.locator(".mb-home").click();
   await guest.locator("#home-board").waitFor();
   assert.ok(guest.url().includes("#v2/"));
   assert.match(await guest.locator("#home-board").innerText(),/Last class/);
   assert.equal(await guest.locator('#home-board a[href*="#egypt-l1"]').count(),1);
   await guest.goto(BASE+"/");
   await guest.locator("#home-board").waitFor();
   assert.match(await guest.locator("#home-board p").innerText(),/Last board opened/);
   assert.equal(await guest.locator('#home-board a[href*="#egypt-l1"]').count(),1);
   await overflow(guest,"class homepage pins "+width);
   await checkStoryLab(guest,width);
   await guest.goto(BASE+"/ela/opening.html?lesson=stories/plot");
   const week=guest.locator("#week");
   assert.equal(await week.locator("option").count(),40);
   for(const number of [1,2,40]){
    await week.selectOption(String(number));
    const days=guest.locator("#slide-guide dd");
    assert.equal(await days.count(),5);
    assert.ok((await days.last().innerText()).endsWith("Slide "+(number===2?5:6)));
    assert.match(await guest.locator("#slides").getAttribute("href"),/docs\.google\.com\/presentation\/d\//);
    assert.match(await guest.locator("#handout").getAttribute("href"),/drive\.google\.com\/file\/d\//);
   }
   await guest.goto(BASE+"/ela/opening.html?lesson=stories/plot");
   assert.equal(await week.inputValue(),"40");
   await guest.goto(BASE+"/ela/opening.html?week=1");
   assert.equal(await week.inputValue(),"1");
   if(width===390||width===1280){
    await guest.setViewportSize({width,height:width===390?844:900});
    await guest.screenshot({path:path.join(output,"mission-"+width+"-ela-opening.png"),fullPage:true});
   }
   await guest.route("https://drive.google.com/**",route=>route.fulfill({body:"Preview control test"}));
   await guest.locator("#preview summary").click();
   const frame=guest.locator("#slide-frame iframe");
   const firstSource=await frame.getAttribute("src");
   assert.match(firstSource,/\/preview$/);
   await week.selectOption("2");
   assert.notEqual(await frame.getAttribute("src"),firstSource);
   await guest.locator("#preview summary").click();
   await frame.waitFor({state:"detached"});
   await guest.goto(BASE+"/ela/opening.html?lesson=stories/plot");
   assert.equal(await guest.locator("#topic").inputValue(),"stories/plot");
   const firstQuestion=await guest.locator("#question").innerText();
   await guest.getByText("Reveal answer",{exact:true}).click();
   assert.ok(await guest.locator("#reason").isVisible());
   await guest.getByRole("button",{name:"Next question"}).click();
   assert.notEqual(await guest.locator("#question").innerText(),firstQuestion);
   assert.ok(await guest.locator("#reason").isHidden());
   assert.ok(await guest.getByRole("link",{name:"Play Connections"}).isVisible());
   await overflow(guest,"ELA opener "+width);
   await visitor.close();
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
  console.log("Mission Control Chrome passed: resource search, day copying, six-day plans, session reload, safe links, presentation mode, backup/restore at 390/820/1280px.");
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
