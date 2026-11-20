/* Classroom Mission Control: pure planner, resource, serialization and privacy checks. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const source=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const window={};
for(const name of ["computer-class/data.js","computer-class/activities-2.js","computer-class/activities-3.js","computer-class/activities-4.js","computer-class/nile-investigation.js","computer-class/kush-investigation.js","today/resources.js","today/released-lessons.js","today/core.js"]){
 vm.runInNewContext(source(name),{window,console},{filename:name,timeout:3000});
}
const core=window.MissionCore,resource=window.MissionResources,list=core.catalog();
assert.equal(resource.periods.length,5);
assert.deepEqual(Array.from(resource.periods,p=>p.number),[1,2,3,4,5]);
assert.equal(new Set(list.map(x=>x.id)).size,list.length,"All IDs unique");
assert.equal(list.filter(x=>x.kind==="Digital assignment").length,window.ComputerClassData.activities.length);
assert.equal(list.some(x=>x.href==="../math/#fracops"),false,"Planned fraction unit stays hidden");
assert.ok(list.some(x=>x.href==="../social-studies/#egypt-l1"),"Published Egypt lessons are selectable");
assert.ok(list.some(x=>x.id==="assignment:social-nile-advantage"),"Assigned investigation is selectable");
for(const x of list){
 assert.ok(core.SUBJECTS.includes(x.subject),"Recognized subject");
 assert.ok(x.href.startsWith("../")&&!x.href.includes("../../"),"Only same-site relative links");
 assert.ok(x.title.length>2);
}
const byId=core.index(list);
assert.equal(byId.get("assignment:science-membranes").href,"../computer-class/#science-membranes");
assert.equal(byId.get("lesson:sci-transport").href,"../science/#cells/transport");
assert.equal(byId.get("lesson:released-math-fdp-l01").href,"../math/#fdp/l01");
const plan=core.defaultPlan();
assert.equal(plan.schema,1);
assert.equal(plan.days.length,6);
for(let day=0;day<6;day++){
 assert.equal(plan.days[day].slots.length,5);
 assert.equal(plan.days[day].slots[0].resourceId,"lesson:math-home","Every day begins with Grade 7 Math");
 assert.equal(core.progress(plan,day+1).assigned,1);
 assert.equal(core.progress(plan,day+1).taught,0);
}
plan.selectedDay=4;
plan.days[3].slots[1].resourceId="assignment:science-membranes";
plan.days[3].slots[1].note="PRIVATE TEACHER NOTE only on the editing device.";
plan.days[3].slots[1].taught=true;
assert.equal(core.progress(plan,4).assigned,2);
assert.equal(core.progress(plan,4).taught,1);
const hash=core.boardHash(4,plan.days[3].slots,list);
assert.match(hash,/^#v1\/4\//);
assert.ok(!hash.includes("PRIVATE"),"No teacher notes in board URLs");
const board=core.parseBoardHash(hash,list);
assert.equal(board.day,4);
assert.equal(board.slots.length,5);
assert.equal(board.slots[0],"lesson:math-home");
assert.equal(board.slots[1],"assignment:science-membranes");
assert.equal(board.slots[2],"");
assert.equal(core.parseBoardHash("#v1/1/not-real,-,-,-,-",list),null,"Unknown public ID rejected");
assert.equal(core.parseBoardHash("#v1/9/-,-,-,-,-",list),null,"Invalid day rejected");
assert.equal(core.parseBoardHash("#hello-world",list),null,"Non-board hash rejected");
assert.equal(core.parseBoardHash("#v1/3/-,-,-,-",list),null,"Malformed number of slots rejected");
assert.equal(core.parseBoardHash("#v1/1/%3Cscript%3E,-,-,-,-",list),null,"Untrusted ID rejected");
// Existing six-day backups and v1 links predate catch-up lessons.
assert.deepEqual([...board.lastClass],Array(5).fill(""));
const prior=JSON.parse(JSON.stringify(plan));
for(const d of prior.days)for(const slot of d.slots)delete slot.lastClassId;
assert.equal(core.sanitizePlan(prior,list).days[3].slots[1].lastClassId,"");
plan.days[3].slots[1].lastClassId="lesson:released-ss-egypt-l1";
plan.days[3].slots[2].lastClassId="lesson:sci-transport"; // Last class only.
const withPins=core.boardHash(4,plan.days[3].slots,list);
assert.match(withPins,/^#v2\/4\//);
assert.ok(!withPins.includes("PRIVATE"));
const pinned=core.parseBoardHash(withPins,list);
assert.equal(pinned.lastClass[1],"lesson:released-ss-egypt-l1");
assert.equal(pinned.slots[2],"");
assert.equal(pinned.lastClass[2],"lesson:sci-transport");
assert.equal(core.parseBoardHash(withPins+"/trailing",list),null);
assert.equal(core.parseBoardHash(withPins.replace("sci-transport","missing"),list),null);
assert.equal(core.parseBoardHash("#v1/2/-,-,-,-,-/-,-,-,-,-",list),null);
assert.equal(core.parseBoardHash("#v2/2/-,-,-,-,-",list),null);
const writes=new Map();
window.localStorage={setItem:(k,v)=>writes.set(k,v),getItem:k=>writes.get(k)};
assert.equal(core.rememberBoard(pinned,list),withPins);
assert.deepEqual([...core.previousBoard(list).lastClass],[...pinned.lastClass]);
assert.equal(writes.size,1);
assert.equal(writes.get(core.STORE_KEY),undefined);
assert.ok(![...writes.values()].join("").includes("PRIVATE"));
const recovered=core.sanitizePlan(JSON.parse(JSON.stringify(core.backup(plan))),list);
assert.equal(recovered.selectedDay,4);
assert.equal(recovered.days[3].slots[1].note,plan.days[3].slots[1].note);
assert.equal(recovered.days[3].slots[1].taught,true);
assert.equal(recovered.days[3].slots[1].lastClassId,plan.days[3].slots[1].lastClassId);
assert.deepEqual([...core.parseBoardHash(core.boardHash(4,recovered.days[3].slots,list),list).slots],[...board.slots]);
const withInvalid=JSON.parse(JSON.stringify(core.backup(plan)));
withInvalid.days[3].slots[2]={resourceId:"/http://evil.example",note:"A".repeat(500),taught:1};
const clean=core.sanitizePlan(withInvalid,list);
assert.equal(clean.days[3].slots[2].resourceId,"");
assert.equal(clean.days[3].slots[2].note.length,350);
assert.equal(clean.days[3].slots[2].taught,false);
assert.throws(()=>core.sanitizePlan({...plan,days:[]},list));
assert.throws(()=>core.sanitizePlan({...plan,schema:999},list));
for(const page of ["today/index.html","today/launch.html"]){
 const html=source(page);
 assert.ok(html.includes('src="resources.js'),page);
 assert.ok(html.includes('src="released-lessons.js'),page);
 assert.ok(html.includes('src="core.js'),page);
 assert.ok(html.includes('src="../computer-class/activities-3.js'),page);
 assert.ok(html.includes('src="../computer-class/activities-4.js'),page);
 assert.ok(html.includes('name="viewport"'),page);
}
assert.ok(source("index.html").includes('href="today/"'),"Homepage entry point");
assert.ok(source("today/launch.js").includes("parseBoardHash"),"Student screen only takes safe catalog IDs");
assert.ok(!source("today/launch.js").includes("localStorage"),"Student presentation cannot read teacher browser notes");
assert.ok(source("today/style.css").includes("prefers-reduced-motion"),"Motion-reduction support");
console.log("Mission Control passed: "+list.length+" resources, six-day plans, Today/Last class pins, old links, private notes and homepage integration.");
