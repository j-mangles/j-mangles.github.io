/* Computer Class: deterministic tests for assignment integrity, answers, drafts, links. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const dataJs=fs.readFileSync(path.join(root,"computer-class","data.js"),"utf8");
const appJs=fs.readFileSync(path.join(root,"computer-class","app.js"),"utf8");
const extension1=fs.readFileSync(path.join(root,"computer-class","activities-2.js"),"utf8");
const extension2=fs.readFileSync(path.join(root,"computer-class","activities-3.js"),"utf8");
const extension3=fs.readFileSync(path.join(root,"computer-class","activities-4.js"),"utf8");
const labJs=fs.readFileSync(path.join(root,"computer-class","labs.js"),"utf8");
const html=fs.readFileSync(path.join(root,"computer-class","index.html"),"utf8");
for(const [name,source] of [["data",dataJs],["pack2",extension1],["pack3",extension2],["pack4",extension3],["labs",labJs],["app",appJs]])new vm.Script(source,{filename:name+".js"});
const activities=[];const win={addEventListener(k,f){this.handlers[k]=f;},handlers:{},scrollTo(){},confirm(){return true;}};
const domRoot={innerHTML:"",listeners:{},addEventListener(k,f){this.listeners[k]=f;},contains(){return true;}};
const doc={body:{dataset:{}},title:"",getElementById(id){return id==="cc-root"?domRoot:null;}};
const loc={hash:""};
const storage=new Map(),localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};
const ctx={window:win,document:doc,location:loc,localStorage,console,Number,Set};
vm.runInNewContext(dataJs,ctx,{filename:"data.js",timeout:3000});
vm.runInNewContext(extension1,ctx,{filename:"activities-2.js",timeout:3000});
vm.runInNewContext(extension2,ctx,{filename:"activities-3.js",timeout:3000});
vm.runInNewContext(extension3,ctx,{filename:"activities-4.js",timeout:3000});
vm.runInNewContext(labJs,ctx,{filename:"labs.js",timeout:3000});
const data=win.ComputerClassData;
assert.equal(data.version,1);
assert.equal(data.activities.length,20);
assert.deepEqual([...new Set(data.activities.map(a=>a.subject))].sort(),["ct","ela","math","sci","ss"].sort());
for(const subject of ["ct","ela","math","sci","ss"])assert.equal(data.activities.filter(a=>a.subject===subject).length,4);
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
   else if(q.type==="lab"){
    assert.ok(win.ComputerClassLabs.config[q.lab],"Supported lab "+q.lab);
    assert.ok(q.minTrials>=2);
   }
   else if(q.type==="evidence"){assert.ok(q.minWords>=8);assert.match(q.prompt,/report/i);}
   else if(q.type==="order"){
    assert.equal(q.correct.length,q.items.length);
    assert.equal(new Set(q.correct).size,q.items.length);
    assert.ok(!q.correct.every((x,i)=>x===i),"Sequence is actually scrambled "+q.id);
   }else assert.fail("Unknown question type "+q.id);
  }
 }
}
assert.equal(qids.size,193);
const core=win.ComputerClassLabs;
assert.equal(core.calculate("osmosis",{cell:"plant",inside:30,outside:60}).effect,"plasmolysed");
assert.equal(core.calculate("oxygen",{breathing:10,circulation:100,activity:100}).limitedBy,"breathing");
assert.equal(core.calculate("oxygen",{breathing:100,circulation:10,activity:100}).limitedBy,"circulation");
assert.equal(core.calculate("recipe",{servings:8}).flour,3);
assert.equal(core.calculate("recipe",{servings:2}).milk,.375);
const canals=core.calculate("canal",{north:40,centre:35});
assert.equal(canals.south,25);
assert.equal(canals.fullySupported,3);
const plot=core.calculate("plot",{beginning:20,turning:90,ending:30});
assert.equal(plot.shape,"clear turning-point peak");
assert.equal(core.calculate("sources",{named:1,dated:1,direct:0}).checks,2);
assert.equal(core.calculate("sources",{named:"0",dated:"1",direct:"0"}).checks,1);
vm.runInNewContext(appJs,ctx,{filename:"app.js",timeout:3000});
const engine=win.ComputerClassEngine;
assert.ok(engine);
assert.match(domRoot.innerHTML,/Computer Class/);
assert.equal((domRoot.innerHTML.match(/class="cc-entry"/g)||[]).length,20);
const labQ=engine.allQuestions(data.activities[0]).find(q=>q.type==="lab");
assert.equal(engine.answered(labQ,[]),false);
const trials=[
 core.calculate("osmosis",{cell:"plant",inside:30,outside:60}),
 core.calculate("osmosis",{cell:"animal",inside:60,outside:30}),
 core.calculate("osmosis",{cell:"plant",inside:50,outside:50})
];
assert.equal(engine.answered(labQ,trials),true);
assert.equal(engine.answered(labQ,[trials[0],trials[0],trials[0]]),false);
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
const evidence=data.activities.flatMap(a=>engine.allQuestions(a)).find(q=>q.type==="evidence");
assert.equal(engine.answered(evidence,{content:"Microscope report",reflection:"A microscope trial records a measurement that supports my claim because the observed values provide evidence for the scientific explanation."}),true);
assert.equal(engine.answered(evidence,{content:"Microscope report",reflection:""}),false);
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
for(const name of ["activities-2.js","activities-3.js","activities-4.js","labs.js"])assert.ok(html.includes('src="'+name));
assert.match(fs.readFileSync(path.join(root,"computer-class","style.css"),"utf8"),/@media print/);
console.log("Computer Class passed: 20 assignments, 193 responses, evidence imports, six models, autosave, reports, links.");
