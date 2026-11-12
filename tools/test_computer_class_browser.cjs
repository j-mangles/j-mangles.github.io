/* Real-Chrome Computer Class end-to-end checks at phone and desktop widths. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {chromium}=require("playwright-core");
const BASE=process.env.SITE_TEST_ORIGIN||"http://127.0.0.1:8765";
const shots=path.resolve(__dirname,"../browser-artifacts");
fs.mkdirSync(shots,{recursive:true});
const routes=[
"science-membranes","science-organelle-rescue","science-oxygen-systems","science-microscope-evidence",
"social-mesopotamia","social-hammurabi-justice","social-trade-network","social-historical-source",
"math-store","math-fraction-kitchen","math-decimal-detective","math-fraction-budget",
"ela-slides","ela-second-draft","ela-the-choice","ela-revision-workshop",
"thinking-case","thinking-misinformation","thinking-fair-test","thinking-ai-fact-check"
];
function checkOverflow(actual,where,width){assert.ok(actual.scroll<=actual.viewport+4,where+" width="+width+" overflow: "+JSON.stringify(actual));}
(async()=>{
 const launchOptions={headless:true,args:["--disable-dev-shm-usage"]};
 if(process.env.CHROME_PATH)launchOptions.executablePath=process.env.CHROME_PATH;
 else launchOptions.channel="chrome";
 const browser=await chromium.launch(launchOptions);
 try{
 for(const width of [390,1200]){
  const page=await browser.newPage({viewport:{width,height:844},acceptDownloads:true,deviceScaleFactor:1});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto(BASE+"/",{waitUntil:"domcontentloaded",timeout:30000});
  await page.locator('a[href="computer-class/"]').waitFor({state:"visible"});
  assert.equal(await page.locator('a[href="computer-class/"]').getAttribute("href"),"computer-class/");
  await page.goto(BASE+"/computer-class/",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator(".cc-entry").count(),20,"All 20 assignments listed");
  assert.ok(await page.locator(".cc-policy").innerText().then(x=>x.includes("Nothing is submitted")));
  checkOverflow(await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth})),"directory",width);
  for(const id of routes){
   await page.goto(BASE+"/computer-class/#"+id,{waitUntil:"domcontentloaded"});
   await page.locator(".cc-question").first().waitFor({state:"visible",timeout:15000});
   const size=await page.locator(".cc-question").count();
   assert.ok(size>=8,"Complete computer-class lesson: "+id);
   assert.ok(await page.locator(".cc-reading p").count()>=3,"A reading context for "+id);
   assert.ok(await page.locator("#cc-progress-count").innerText().then(x=>x.includes("0 of")));
   checkOverflow(await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth})),id,width);
  }
  await page.goto(BASE+"/computer-class/#science-membranes");
  const answer="Water moves through the membrane toward the higher solute concentration, so water leaves Cell A overall.";
  await page.locator('textarea[data-id="sc3"]').fill(answer);
  assert.ok(await page.locator("#cc-progress-count").innerText().then(x=>x.includes("1 of 9")));
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator('textarea[data-id="sc3"]').inputValue(),answer,"Draft survived refresh");
  await page.locator('input[name="choice-sc1"][value="0"]').check();
  await page.locator('[data-action="check"][data-id="sc1"]').click();
  assert.match(await page.locator("#cc-feedback-sc1").innerText(),/Not quite/);
  await page.locator('input[name="choice-sc1"][value="1"]').check();
  await page.locator('[data-action="check"][data-id="sc1"]').click();
  assert.match(await page.locator("#cc-feedback-sc1").innerText(),/Correct/);
  const order=[1,3,2,0];
  for(let i=0;i<order.length;i++)await page.locator('select[data-id="sc5"][data-position="'+i+'"]').selectOption(String(order[i]));
  await page.locator('[data-action="check"][data-id="sc5"]').click();
  assert.match(await page.locator("#cc-feedback-sc5").innerText(),/Correct/);
  const osm=page.locator("#cc-lab-sc9");
  await osm.locator("[data-record]").click();
  await osm.locator('[data-field="outside"]').fill("20");
  await osm.locator("[data-record]").click();
  await osm.locator('[data-field="cell"]').selectOption("animal");
  await osm.locator("[data-record]").click();
  assert.equal(await osm.locator("[data-trials] tr").count(),3,"Three osmosis trials recorded");
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#cc-lab-sc9 [data-trials] tr").count(),3,"Recorded trials persist");
  assert.ok(await page.locator("#cc-progress-count").innerText().then(x=>x.includes("4 of 9")),"Osmosis adds a response");
  await page.goto(BASE+"/computer-class/#math-fraction-kitchen");
  const kitchen=page.locator("#cc-lab-fk0");
  await kitchen.locator('[data-field="servings"]').fill("8");
  assert.match(await kitchen.locator(".cc-lab-result").innerText(),/Flour 3\.000/);
  await kitchen.locator("[data-record]").click();
  await kitchen.locator('[data-field="servings"]').fill("2");
  await kitchen.locator("[data-record]").click();
  await kitchen.locator('[data-field="servings"]').fill("6");
  await kitchen.locator("[data-record]").click();
  assert.equal(await kitchen.locator("[data-trials] tr").count(),3);
  await page.goto(BASE+"/computer-class/#science-oxygen-systems");
  const oxygen=page.locator("#cc-lab-ox4");
  await oxygen.locator('[data-field="breathing"]').fill("10");
  assert.match(await oxygen.locator(".cc-lab-result").innerText(),/Limiting supply: breathing/);
  await oxygen.locator("[data-record]").click();
  const organReport="Human Systems · Organ Inspector\nSelected structures: lungs, heart and diaphragm.\nThe lungs exchange gases; the heart pumps blood.";
  await page.locator('input[data-evidence-file="ox10"]').setInputFiles({
   name:"organ-systems-investigation.txt",mimeType:"text/plain",buffer:Buffer.from(organReport,"utf8")
  });
  await page.locator("#cc-q-ox10 .cc-evidence-loaded").waitFor({state:"visible"});
  await page.locator('textarea[data-id="ox10"]').fill("The report says the lungs exchange gases and the heart pumps blood. They work together because oxygen enters blood in the lungs before the heart moves it around the body.");
  assert.ok(await page.locator("a[href=\"../science/#cells/circulatory\"]").first().innerText().then(x=>x.includes("Exercise & Circulation Data Lab")),"Second related Science lesson link");
  assert.match(await page.locator("#cc-progress-count").innerText(),/1 of 11/);
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("#cc-q-ox10 .cc-evidence-loaded pre").textContent(),organReport,"Imported evidence stays in the local draft");
  const exerciseReport="Exercise & Circulation Data Lab — Grade 8 Science\nSample data from the Science 8 Systems booklet; one student, not a medical measurement.\nPeak while jogging: 142 bpm at minute 8\nIncrease above resting average: 70 bpm\nWithin 5 bpm of resting average by minute 13 (about 5 minutes after stopping).\nLimitation: heart rate does not measure oxygen or carbon dioxide directly.";
  await page.locator('input[data-evidence-file="ox11"]').setInputFiles({name:"exercise-circulation-data-report.txt",mimeType:"text/plain",buffer:Buffer.from(exerciseReport,"utf8")});
  await page.locator("#cc-q-ox11 .cc-evidence-loaded").waitFor({state:"visible"});
  await page.locator('textarea[data-id="ox11"]').fill("The sample reaches 142 beats per minute while jogging, which is 70 above the resting average. Working muscles need more oxygen, so the heart pumps blood faster. This graph does not measure oxygen levels or carbon dioxide exchange.");
  assert.match(await page.locator("#cc-progress-count").innerText(),/2 of 11/);
  const [scienceReportDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator('[data-action="download"]').click()
  ]);
  assert.match(fs.readFileSync(await scienceReportDownload.path(),"utf8"),/Selected structures: lungs, heart and diaphragm/);
  await page.locator("#cc-student-name").fill("Sam Example");
  const [teacherCopyDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator('[data-action="teacher-copy"]').click()
  ]);
  const evidenceTeacherCopy=fs.readFileSync(await teacherCopyDownload.path(),"utf8");
  await page.goto(BASE+"/computer-class/teacher.html",{waitUntil:"domcontentloaded"});
  await page.locator("#tr-files").setInputFiles({name:"oxygen-mission.json",mimeType:"application/json",buffer:Buffer.from(evidenceTeacherCopy,"utf8")});
  await page.locator(".tr-entry").waitFor({state:"visible",timeout:10000});
  await page.locator(".tr-entry").click();
  assert.match(await page.locator(".tr-answer-text").filter({hasText:"Imported investigation: organ-systems-investigation.txt"}).innerText(),/Selected structures: lungs, heart and diaphragm/);
  assert.match(await page.locator(".tr-answer-text").filter({hasText:"Imported investigation: exercise-circulation-data-report.txt"}).innerText(),/142 bpm at minute 8/);
  page.once("dialog",dialog=>dialog.accept());
  await page.goto(BASE+"/computer-class/#science-oxygen-systems");
  await page.locator('[data-action="clear-evidence"][data-id="ox10"]').click();
  assert.equal(await page.locator("#cc-q-ox10 .cc-evidence-empty").innerText(),"No report selected yet.");
  page.once("dialog",dialog=>dialog.accept());
  await page.locator('[data-action="clear"]').click();
  await page.locator("#cc-import").setInputFiles({name:"oxygen-mission.json",mimeType:"application/json",buffer:Buffer.from(evidenceTeacherCopy,"utf8")});
  await page.locator("#cc-q-ox10 .cc-evidence-loaded").waitFor({state:"visible",timeout:10000});
  assert.match(await page.locator("#cc-q-ox10 .cc-evidence-loaded pre").textContent(),/Selected structures: lungs, heart and diaphragm/);
  await page.goto(BASE+"/computer-class/#science-microscope-evidence");
  const microscopeReport="Virtual Microscope Investigation\nTrial 1: Onion epidermis, 400× total, estimated cell width 82 µm.\nThis is a schematic model.";
  await page.locator('input[data-evidence-file="mi11"]').setInputFiles({
   name:"virtual-microscope-investigation.txt",mimeType:"text/plain",buffer:Buffer.from(microscopeReport,"utf8")
  });
  await page.locator("#cc-q-mi11 .cc-evidence-loaded").waitFor({state:"visible"});
  await page.locator('textarea[data-id="mi11"]').fill("One trial estimates a cell width of 82 micrometres at 400 times magnification. This is an estimate because the microscope image is schematic.");
  assert.match(await page.locator("#cc-progress-count").innerText(),/1 of 11/);
  await page.goto(BASE+"/computer-class/#social-trade-network");
  const canal=page.locator("#cc-lab-tr4");
  await canal.locator('[data-field="north"]').fill("40");
  await canal.locator('[data-field="centre"]').fill("35");
  assert.match(await canal.locator(".cc-lab-result").innerText(),/3 of 3/);
  await canal.locator("[data-record]").click();
  await canal.locator('[data-field="north"]').fill("60");
  await canal.locator("[data-record]").click();
  assert.equal(await canal.locator("[data-trials] tr").count(),2);
  await page.goto(BASE+"/computer-class/#ela-slides");
  const plot=page.locator("#cc-lab-el9");
  await plot.locator('[data-field="turning"]').fill("30");
  assert.match(await plot.locator(".cc-lab-result").innerText(),/flat or unusual tension pattern/);
  await plot.locator("[data-record]").click();
  await plot.locator('[data-field="turning"]').fill("100");
  assert.match(await plot.locator(".cc-lab-result").innerText(),/clear turning-point peak/);
  await plot.locator("[data-record]").click();
  assert.equal(await plot.locator("[data-trials] tr").count(),2,"ELA tension interpretations");
  await page.goto(BASE+"/computer-class/#thinking-misinformation");
  const sourceboard=page.locator("#cc-lab-vc10");
  await sourceboard.locator("[data-record]").click();
  for(const id of ["named","dated","direct"])await sourceboard.locator('[data-field="'+id+'"]').selectOption("1");
  assert.match(await sourceboard.locator(".cc-lab-result").innerText(),/3 of 3/);
  await sourceboard.locator("[data-record]").click();
  await sourceboard.locator('[data-field="dated"]').selectOption("0");
  await sourceboard.locator("[data-record]").click();
  assert.equal(await sourceboard.locator("[data-trials] tr").count(),3,"Three verification profiles");
  await page.goto(BASE+"/computer-class/#math-store");
  const values={ma1:"18",ma2:"54",ma3:"6.48",ma4:"60.48",ma5:"19.52",ma6:"51"};
  for(const [id,v] of Object.entries(values))await page.locator('input[data-id="'+id+'"]').fill(v);
  await page.locator('input[name="choice-ma7"][value="1"]').check();
  await page.locator('input[name="choice-ma8"][value="0"]').check();
  await page.locator('textarea[data-id="ma9"]').fill("I converted twenty five percent to one quarter, found eighteen dollars off, then calculated twelve percent of fifty four dollars for tax.");
  await page.locator('textarea[data-id="ma10"]').fill("Calculate the discount before the tax and keep track of whether each amount is a dollar value or a percent.");
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"10 of 10 responses complete");
  await page.locator("#cc-student-name").fill("Alex Example");
  await page.locator('[data-action="review"]').click();
  assert.match(await page.locator("#cc-finish-status").innerText(),/All 10 responses complete/);
  const [download]=await Promise.all([
   page.waitForEvent("download", {timeout:10000}),
   page.locator('[data-action="download"]').click()
  ]);
  assert.match(download.suggestedFilename(),/math-store-alex-example\.txt/);
  const file=await download.path();
  const contents=fs.readFileSync(file,"utf8");
  assert.match(contents,/Alex Example/);
  assert.match(contents,/60.48/);
  assert.match(contents,/End of assignment/);
  assert.match(await page.locator("#cc-finish-status").innerText(),/Follow your teacher/);

  // Structured student copy and teacher review, completely local to the browser.
  const [jsonDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator('[data-action="teacher-copy"]').click()
  ]);
  assert.match(jsonDownload.suggestedFilename(),/math-store-alex-example\.json/);
  const jsonFile=await jsonDownload.path(),jsonText=fs.readFileSync(jsonFile,"utf8"),studentCopy=JSON.parse(jsonText);
  assert.equal(studentCopy.schema,"eess-computer-class-submission-v1");
  assert.equal(studentCopy.student_name,"Alex Example");
  assert.equal(studentCopy.answers.ma4,"60.48");
  await page.goto(BASE+"/computer-class/teacher.html",{waitUntil:"domcontentloaded"});
  await page.locator("#tr-files").setInputFiles({
   name:"math-store-alex-example.json",mimeType:"application/json",buffer:Buffer.from(jsonText,"utf8")
  });
  await page.locator(".tr-entry").waitFor({state:"visible",timeout:10000});
  await page.locator(".tr-entry").click();
  assert.match(await page.locator(".tr-stats").innerText(),/8 \/ 8 objective answers correct/);
  await page.locator('[data-rating="ma9"]').selectOption("meeting");
  await page.locator('[data-feedback="ma9"]').fill("Clear reasoning. Next: show a complete equation.");
  await page.locator("#tr-overall-note").fill("Strong calculations and attention to units.");

  await page.locator("#tr-files").setInputFiles({
   name:"math-store-alex-example-resubmission.json",mimeType:"application/json",buffer:Buffer.from(jsonText,"utf8")
  });
  await page.waitForFunction(()=>document.querySelector("#tr-file-message")?.textContent?.includes("protected from replacement"),null,{timeout:10000});
  assert.equal(await page.locator('[data-rating="ma9"]').inputValue(),"meeting");
  assert.equal(await page.locator('[data-feedback="ma9"]').inputValue(),"Clear reasoning. Next: show a complete equation.");

  const [csvDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator("#tr-csv").click()
  ]);
  assert.match(csvDownload.suggestedFilename(),/review-summary\.csv/);
  const csvText=fs.readFileSync(await csvDownload.path(),"utf8");
  assert.match(csvText,/Alex Example/);
  assert.match(csvText,/ma9: meeting/);
  assert.match(csvText,/Strong calculations/);
  const [feedbackDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator("#tr-feedback-download").click()
  ]);
  assert.match(fs.readFileSync(await feedbackDownload.path(),"utf8"),/Clear reasoning/);
  assert.match(await page.locator("#tr-session-state").innerText(),/not backed up/);
  const [sessionDownload]=await Promise.all([
   page.waitForEvent("download",{timeout:10000}),
   page.locator("#tr-session-save").click()
  ]);
  const reviewBackup=fs.readFileSync(await sessionDownload.path(),"utf8");
  const reviewObject=JSON.parse(reviewBackup);
  assert.equal(reviewObject.schema,"eess-computer-class-review-session-v1");
  assert.equal(reviewObject.entries[0].review.ma9.note,"Clear reasoning. Next: show a complete equation.");
  assert.match(await page.locator("#tr-session-state").innerText(),/Session backed up/);
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal((await page.locator("#tr-count").innerText()).trim(),"0 files loaded","Teacher data never stored");
  await page.locator("#tr-session-file").setInputFiles({
   name:"review-session.json",mimeType:"application/json",buffer:Buffer.from(reviewBackup,"utf8")
  });
  await page.locator(".tr-entry").waitFor({state:"visible",timeout:10000});
  await page.locator(".tr-entry").click();
  assert.equal(await page.locator('[data-rating="ma9"]').inputValue(),"meeting");
  assert.equal(await page.locator('[data-feedback="ma9"]').inputValue(),"Clear reasoning. Next: show a complete equation.");
  assert.equal(await page.locator("#tr-overall-note").inputValue(),"Strong calculations and attention to units.");

  await page.goto(BASE+"/computer-class/#math-store");
  page.once("dialog",dialog=>dialog.accept());
  await page.locator('[data-action="clear"]').click();
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"0 of 10 responses complete","Clear answers");
  // A saved teacher-copy file is also a cross-device resume backup.
  await page.locator("#cc-import").setInputFiles({
   name:"math-store-alex-example.json",mimeType:"application/json",buffer:Buffer.from(jsonText,"utf8")
  });
  await page.waitForFunction(()=>document.querySelector("#cc-progress-count")?.textContent?.includes("10 of 10"),null,{timeout:10000});
  assert.equal(await page.locator('input[data-id="ma4"]').inputValue(),"60.48");
  page.once("dialog",dialog=>dialog.accept());
  await page.locator('[data-action="clear"]').click();

  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal((await page.locator("#cc-progress-count").innerText()).trim(),"0 of 10 responses complete","Clear persisted");
  if(width===390){
   await page.goto(BASE+"/computer-class/");
   await page.screenshot({path:path.join(shots,"computer-class-mobile-directory.png"),fullPage:true,animations:"disabled"});
   await page.goto(BASE+"/computer-class/#ela-slides");
   await page.screenshot({path:path.join(shots,"computer-class-mobile-ela.png"),fullPage:true,animations:"disabled"});
  }
  assert.deepEqual(errors,[],"No uncaught JS errors at "+width+"px");
  await page.close();
 }
 console.log("Computer Class Chrome pass: 20 assignments, local Science evidence hand-offs, teacher review backup/restore, six labs and two screen sizes.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
