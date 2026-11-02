"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const w={};vm.runInNewContext(read("ela/data.js"),{window:w});const hub=w.HUB;assert.equal(hub.subject,"ela");
const find=(unit,id)=>(hub.units.find(u=>u.id===unit).lessons||[]).find(l=>l.id===id);
const expected=[["answering","day1"],["answering","day2"],["grammar","apostrophes"],["stories","thankyou"],["stories","plot"],["stories","snack"],["stories","upswing"],["stories","summer"],["stories","birds"],["stories","landlady"],["stories","paw"]];
for(const [unit,id] of expected){const l=find(unit,id);assert.ok(l&&l.directLesson,unit+"/"+id);const d=l.directLesson;assert.ok(d.goal&&d.steps.length>=3&&d.model&&d.practice,unit+"/"+id);assert.ok(d.model.answer&&d.practice.sample,unit+"/"+id);}
const engine=read("assets/hub.js");new Function(engine);assert.match(engine,/function directLessonHTML\(l\)/);assert.match(engine,/\$\{directLessonHTML\(l\)\}/);
const page=read("ela/index.html");assert.match(page,/data\.js\?v=20261102a/);assert.match(page,/hub\.js\?v=20261102a/);assert.match(page,/\.direct-lesson/);assert.match(engine,/direct-practice/);
console.log("ELA direct lessons PASS: 11 guided lessons render inside Answering Well, Grammar and all eight Short Stories lessons.");
