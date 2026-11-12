/* Teacher Review Desk: safe local import, objective marking, CSV escaping. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),src=name=>fs.readFileSync(path.join(root,"computer-class",name),"utf8");
const files=["data.js","activities-2.js","activities-3.js","labs.js","teacher.js"];
const elements=new Map(),events={};
const box=()=>({innerHTML:"",textContent:"",value:"",listeners:{},addEventListener(k,f){this.listeners[k]=f;},setAttribute(){}});
const page=box();page.addEventListener=(k,f)=>events[k]=f;
const doc={body:{dataset:{}},title:"",getElementById(id){
 if(id==="tr-root")return page;
 if(!elements.has(id))elements.set(id,box());
 return elements.get(id);
}};
const w={confirm(){return true;}},ctx={window:w,document:doc,console,Set,Number,Date};
for(const file of files)vm.runInNewContext(src(file),ctx,{filename:file,timeout:2500});
const t=w.ComputerClassTeacher;
assert.ok(t);
const data=w.ComputerClassData;
assert.equal(data.activities.length,15);
const payload={schema:"eess-computer-class-submission-v1",version:1,activity_id:"math-store",
 student_name:"Alex Example",exported_at:"2026-11-11T19:00:00Z",answers:{
 ma1:"18",ma2:"54",ma3:"6.48",ma4:"60.48",ma5:"19.52",ma6:"51",ma7:"1",ma8:"0",
 ma9:"The discount is eighteen dollars and the tax is six dollars and forty eight cents.",
 ma10:"Calculate the discount before sales tax."
 }};
const e=t.sanitize(payload),s=t.stats(e);
assert.equal(e.student,"Alex Example");
assert.equal(s.correct,8);
assert.equal(s.possible,8);
assert.equal(s.writtenDone,2);
assert.equal(s.written,2);
assert.throws(()=>t.sanitize({...payload,student_name:""}));
assert.throws(()=>t.sanitize({...payload,schema:"incorrect"}));
assert.throws(()=>t.sanitize({...payload,activity_id:"unknown"}));
assert.throws(()=>t.sanitize({...payload,version:99}));
assert.throws(()=>t.sanitize({...payload,answers:[]}));
assert.equal(t.csvEscape("=HYPERLINK(\"evil\")"),'"\'=HYPERLINK(""evil"")"');
assert.equal(t.csvEscape("-5"),'"\'-5"');
assert.equal(t.csvEscape("Normal"),'"Normal"');
assert.match(fs.readFileSync(path.join(root,"computer-class","teacher.html"),"utf8"),/teacher.js/);
assert.match(fs.readFileSync(path.join(root,"computer-class","teacher.css"),"utf8"),/tr-student-head/);
assert.ok(!src("teacher.js").includes("fetch("),"No network calls");
console.log("Teacher review passed: 15 assignments, safe import, scoring and CSV formula escaping.");
