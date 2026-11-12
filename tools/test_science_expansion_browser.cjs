/* In-browser smoke tests for the Science labs and library.
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
  assert.equal(await page.locator(".hsi .oi").count(),1,"Organ Inspector must remain mounted through the systems wrappers");
  assert.ok(await page.locator(".hx-lab").count()===1,"Homeostasis lab must remain present");
 }},
 {hash:"cells/circulatory",selector:".erd",async check(page){
  assert.equal(await page.locator(".erd .point").count(),15,"The interactive graph uses all sample data points");
  assert.equal(await page.locator(".odi").count(),1,"The existing oxygen index model remains available");
  await page.locator('.erd button[data-phase="jogging"]').click();
  assert.match(await page.locator("#erd-phase-summary").innerText(),/142 bpm at minute 8, about 70 bpm/);
  await page.locator("#erd-minute").selectOption("13");
  assert.match(await page.locator("#erd-point-readout").innerText(),/76 beats per minute, recovery/);
  await page.locator("#erd-increase").fill("70");
  await page.locator('[data-check="increase"]').click();
  assert.match(await page.locator("#erd-increase-feedback").innerText(),/Correct/);
  await page.locator("#erd-recovery").fill("5");
  await page.locator('[data-check="recovery"]').click();
  assert.match(await page.locator("#erd-recovery-feedback").innerText(),/Correct/);
  await page.locator("#erd-observe").fill("Heart rate rises during jogging and drops during recovery.");
  await page.locator("#erd-explain").fill("Blood carries oxygen to working cells. The graph records heart rate but does not measure gas exchange.");
  const [download]=await Promise.all([page.waitForEvent("download"),page.locator("#erd-download").click()]);
  const report=fs.readFileSync(await download.path(),"utf8");
  assert.match(report,/142 bpm at minute 8/);
  assert.match(report,/does not measure oxygen saturation, carbon dioxide or gas exchange directly/);
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
 }},
 {hash:"cells/specialized",selector:".scs",async check(page){
  await page.locator('.scs button[data-cell="nerve"]').click();
  assert.match(await page.locator("#scs-info").innerText(),/Nerve cell/i);
  await page.locator("#scs-a").selectOption("red");
  assert.match(await page.locator("#scs-compare").innerText(),/Red blood cell/i);
  await page.locator('.scs button[data-stem="blood"]').click();
  assert.match(await page.locator("#scs-stem-note").innerText(),/tissue-specific/i);
 }},
 {hash:"light/u3t1-energy",selector:".efs",async check(page){
  await page.locator("#efs-record").click();
  assert.equal(await page.locator("#efs-trials tr").count(),1);
  await page.locator('.efs button[data-mode="hill"]').click();
  await page.locator("#efs-height").fill("0");
  assert.equal((await page.locator("#efs-useful").innerText()).trim(),"0.0 J");
  assert.equal((await page.locator("#efs-other").innerText()).trim(),"98.1 J");
 }},
 {hash:"earth/e2-time",selector:".gdl",async check(page){
  await page.locator('.gdl .rocks button[data-rock="X"]').click();
  assert.match(await page.locator("#gdl-readout").innerText(),/Igneous intrusion/i);
  await page.locator('.gdl button[data-mode="radiometric"]').click();
  await page.locator("#gdl-half").fill("2");
  assert.equal((await page.locator("#gdl-parent").innerText()).trim(),"6.00");
  assert.equal((await page.locator("#gdl-age").innerText()).trim(),"50.0");
  await page.locator("#gdl-record").click();
  assert.equal(await page.locator("#gdl-trials tr").count(),1);
 }},
 {hash:"light/u3t3-colour",selector:".pc",async check(page){
  await page.locator('.pc button[data-mode="object"]').click();
  await page.locator("#pc-lamp").selectOption("green");
  await page.locator("#pc-surface").selectOption("red");
  assert.match(await page.locator("#pc-reading").innerText(),/dark/i);
  await page.locator("#pc-lamp").selectOption("white");
  await page.locator("#pc-surface").selectOption("yellow");
  assert.match(await page.locator("#pc-reading").innerText(),/yellow/i);
  await page.locator("#pc-record").click();
  assert.equal(await page.locator("#pc-rows tr").count(),1);
 }},
 {hash:"skills/graph",selector:".glab",async check(page){
  await page.locator("#glab-data").selectOption("liquids");
  assert.equal(await page.locator("#glab-rows tr").count(),4);
  await page.locator('.glab button[data-graph="line"]').click();
  await page.locator("#glab-check").click();
  assert.match(await page.locator("#glab-feedback").innerText(),/Try another graph type/);
  await page.locator('.glab button[data-graph="bar"]').click();
  await page.locator("#glab-check").click();
  assert.match(await page.locator("#glab-feedback").innerText(),/Suitable graph type/);
  await page.locator('[data-measure="0"]').fill("8");
  assert.ok((await page.locator("#glab-chart svg rect").count())>=4);
 }},
 {hash:"skills/si",selector:".msl",async check(page){
  await page.locator("#msl-answer").fill("3.4");
  await page.locator("#msl-check").click();
  assert.match(await page.locator("#msl-feedback").innerText(),/Correct/);
  await page.locator("#msl-next").click();
  await page.locator("#msl-answer").fill("6.7");
  await page.locator("#msl-check").click();
  assert.match(await page.locator("#msl-feedback").innerText(),/Correct/);
  await page.locator('[data-tool="cylinder"]').click();
  await page.locator("#msl-answer").fill("17");
  await page.locator("#msl-check").click();
  assert.equal(await page.locator("#msl-results tr").count(),3);
 }},
 {hash:"cells/transport",selector:".osmo",async check(page){
  await page.locator("#osmo-inside").fill("60");
  await page.locator("#osmo-outside").fill("30");
  assert.match(await page.locator("#osmo-reading").innerText(),/Turgid/i);
  await page.locator('[data-cell="animal"]').click();
  assert.match(await page.locator("#osmo-reading").innerText(),/Swollen/i);
  await page.locator("#osmo-record").click();
  assert.equal(await page.locator("#osmo-trials tr").count(),1);
  assert.ok(await page.locator("#ltool").innerText().then(x=>x.length>100),"Older membrane lab remains");
 }},
 {hash:"earth/e5-drift",selector:".wed",async check(page){
  await page.locator("#wed-distance").fill("0");
  assert.match(await page.locator("#wed-reading").innerText(),/closer together/);
  for(const id of ["fossil","rocks","glacial","shape"])await page.locator('#wed-answer-'+id).selectOption(id);
  await page.locator("#wed-check").click();
  assert.match(await page.locator("#wed-total").innerText(),/4 correct/);
  await page.locator("#wed-claim").fill("The continents were once connected.");
  await page.locator("#wed-reason").fill("Matching fossils and rocks suggest land connections.");
 }},
 {hash:"skills/fair",selector:".fts",async check(page){
  await page.locator(".fts-plan-toggle").click();
  assert.equal(await page.locator(".fts-plan").isVisible(),true,"Complete investigation planner opens");
  await page.locator("#fts-plan-example").selectOption("0");
  assert.match(await page.locator("#fts-plan-question").inputValue(),/water temperature/i);
  await page.locator("#fts-plan-prediction").fill("If the water is warmer, the sugar will dissolve faster because its particles move more quickly.");
  await page.locator("#fts-plan-cv2").fill("Volume of water");
  await page.locator("#fts-plan-cv3").fill("Stirring rate");
  await page.locator("#fts-plan-method").fill("1. Measure the same amount of water.\n2. Change only its temperature.\n3. Add the same sugar, stir consistently, and time how long it takes to dissolve. Repeat three times.");
  const [download]=await Promise.all([page.waitForEvent("download"),page.locator(".fts-plan-download").click()]);
  assert.equal(download.suggestedFilename(),"fair-test-plan.txt");
  const report=fs.readFileSync(await download.path(),"utf8");
  assert.match(report,/Independent variable \(changed\): Water temperature/);
  assert.match(report,/Repeat trials per condition: 3/);
  assert.match(await page.locator(".fts-plan-status").innerText(),/No information was uploaded/);
 }}
];
(async()=>{
 const browser=await chromium.launch({channel:"chrome",headless:true,args:["--disable-dev-shm-usage"]});
 try{
  for(const width of [390,1100]){
   const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1,acceptDownloads:true});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(origin+"/science/labs.html",{waitUntil:"domcontentloaded",timeout:30000});
   await page.locator(".labs-page").waitFor({state:"visible",timeout:15000});
   assert.equal(await page.locator(".unit").count(),5,"Five Science units in the Lab Library");
   assert.equal(await page.locator(".entry a").count(),14,"Only current Science labs should link");
   assert.equal(await page.locator(".entry .soon").count(),19,"Upcoming labs must stay unavailable in the library");
   await page.locator("#lab-search").fill("refraction");
   assert.equal(await page.locator(".entry").count(),1,"Science Lab Library search");
   assert.equal(await page.locator(".entry a").count(),0,"Future labs must not open from the library");
   await page.locator("#lab-search").fill("");
   await page.locator('[data-unit="cells"]').click();
   assert.equal(await page.locator(".entry").count(),10,"Cells lab filter");
   await page.locator('[data-unit="all"]').click();
   const libraryOverflow=await page.evaluate(()=>({w:window.innerWidth,s:document.documentElement.scrollWidth}));
   assert.ok(libraryOverflow.s<=libraryOverflow.w+5,"Science Lab Library horizontal overflow");
   for(const t of tasks){
    const url=origin+"/science/#"+t.hash;
    await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
    const lab=page.locator("#ltool "+t.selector);
    await lab.waitFor({state:"visible",timeout:20000});
    await t.check(page);
    const overflow=await lab.evaluate(el=>({content:el.scrollWidth,width:el.clientWidth}));
    assert.ok(overflow.content<=overflow.width+5,t.hash+" "+width+" tool overflow: "+JSON.stringify(overflow));
    if(width===390&&["cells/systems","cells/circulatory","light/u3t2-refraction","earth/e11-quakes","cells/specialized","light/u3t3-colour","skills/graph","cells/transport","earth/e5-drift"].includes(t.hash)){
     await page.screenshot({path:path.join(screenshots,"science-"+t.hash.replace("/","-")+"-mobile.png"),fullPage:true,animations:"disabled"});
    }
   }
   assert.deepEqual(errors,[],"Uncaught browser JS errors at "+width+"px");
   await page.close();
  }
  console.log("Science labs and the library passed in real Chrome at 390px and 1100px.");
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
