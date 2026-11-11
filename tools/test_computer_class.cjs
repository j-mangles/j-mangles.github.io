/* Computer Class: deterministic tests for assignment integrity, answers, drafts, links. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const dataJs=fs.readFileSync(path.join(root,"computer-class","data.js"),"utf8");
const appJs=fs.readFileSync(path.join(root,"computer-class","app.js"),"utf8");
const html=fs.readFileSync(path.join(root,"computer-class","index.html"),"utf8");
new vm.Script(dataJs,{filename:"data.js"});new vm.Script(appJs,{filename:"app.js"});
const activities=[];const win={addEventListener(k,f){this.handlers[k]=f;},handlers:{},scrollTo(){},confirm(){return true;}};
const domRoot={innerHTML:"",listeners:{},addEventListener(k,f){this.listeners[k]=f;},contains(){return true;}};
const doc={body:{dataset:{}},title:"",getElementById(id){return id==="cc-root"?domRoot:null;}};
const loc={hash:""};
const storage=new Map(),localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};
const ctx={window:win,document:doc,location:loc,localStorage,console,Number,Set};
vm.runInNewContext(dataJs,ctx,{filename:"data.js",timeout:3000});
const data=win.ComputerClassData;
assert.equal(data.version,1);
assert.equal(data.activities.length,5);
assert.deepEqual([...data.activities.map(a=>a.subject)].sort(),["ct","ela","math","sci","ss"].sort());
const qids=new Set();
for(const activity of data.activities){
 assert.ok(activity.sections.length>=2,"At least two parts "+activity.id);
 assert.ok(activity.reading.length>=2,"Complete source context "+activity.id);
 assert.ok(activity.time.includes("min"),"Timed digital task "+activity.id);
 for(const section of activity.sections){
  for(const q of section.questions){
   assert.ok(!qids.has(q.id),"Unique question ID "+q.id);
   qids.add(q.id);
   assert.ok(q.prompt?.length>=15,"Specific prompt "+q.id);
   if(q.type==="choice"){assert.ok(q.correct>=0&&q.correct<q.options.length);}
   else if(q.type==="number"){assert.ok(Number.isFinite(q.answer));}
   else if(q.type==="text"){assert.ok(q.minWords>=8);}
   else if(q.type==="order"){
    assert.equal(q.correct.length,q.items.length);
    assert.equal(new Set(q.correct).size,q.items.length);
    assert.ok(!q.correct.every((x,i)=>x===i),"Sequence is actually scrambled "+q.id);
   }else assert.fail("Unknown question type "+q.id);
  }
 }
}
assert.equal(qids.size,43);
vm.runInNewContext(appJs,ctx,{filename:"app.js",timeout:3000});
const engine=win.ComputerClassEngine;
assert.ok(engine);
assert.match(domRoot.innerHTML,/Computer Class/);
assert.equal((domRoot.innerHTML.match(/class="cc-entry"/g)||[]).length,5);
const math=data.activities.find(a=>a.subject==="math");
const mathQuestions=engine.allQuestions(math);
const price=mathQuestions.find(q=>q.id==="ma4");
assert.equal(engine.grade(price,"60.48"),true);
assert.equal(engine.grade(price,"60.50"),false);
assert.equal(engine.grade(mathQuestions.find(q=>q.id==="ma7"),"1"),true);
const ct=data.activities.find(a=>a.subject==="ct");
const order=engine.allQuestions(ct).find(q=>q.id==="ct3");
assert.equal(engine.grade(order,order.correct.map(String)),true);
assert.equal(engine.grade(order,["0","1","2","3"]),false);
assert.equal(engine.words("alpha   beta\n gamma"),3);
const p0=engine.progress(math,{});
assert.equal(p0.complete,0);
assert.equal(p0.total,10);
assert.equal(engine.progress(math,{ma1:"18",ma2:"54",ma3:"6.48"}).complete,3);
loc.hash="#science-membranes";win.handlers.hashchange();
assert.match(domRoot.innerHTML,/Cell Membrane Investigation/);
assert.match(domRoot.innerHTML,/Science/);
const textAnswer="Water moves through a selectively permeable membrane toward the side with more dissolved solute.";
domRoot.listeners.input({target:{dataset:{id:"sc3"},value:textAnswer}});
assert.ok([...storage.keys()].some(x=>x.includes("science-membranes")),"Auto-save key created");
assert.match(engine.reportText(),/Water moves through a selectively permeable membrane/);
loc.hash="";win.handlers.hashchange();
loc.hash="#science-membranes";win.handlers.hashchange();
assert.match(domRoot.innerHTML,/Water moves through a selectively permeable membrane/);
const dataResult=JSON.parse(storage.get("eess-computer-class-v1:science-membranes"));
assert.equal(dataResult.answers.sc3,textAnswer);
for(const name of ["science","social-studies","math","ela","critical-thinking"]){
 const page=fs.readFileSync(path.join(root,name,"index.html"),"utf8");
 assert.ok(page.includes("computer-class/"),"Subject link "+name);
}
assert.ok(fs.readFileSync(path.join(root,"index.html"),"utf8").includes('href="computer-class/"'));
assert.match(html,/src="data.js/);
assert.match(html,/src="app.js/);
assert.match(fs.readFileSync(path.join(root,"computer-class","style.css"),"utf8"),/@media print/);
console.log("Computer Class passed: 5 subjects, 43 responses, objective grading, autosave, reload, export, links.");
