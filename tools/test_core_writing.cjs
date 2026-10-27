/* Regression checks for source-aligned Grade 8 ELA core writing tasks. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const code=fs.readFileSync(path.join(root,"ela/core-writing-workshop.js"),"utf8");
const scope={window:{HUB:{subject:"ela",lessonTools:{}}}};
vm.runInNewContext(code,scope,{filename:"ela/core-writing-workshop.js",timeout:3000});
const tasks=scope.window.CoreWritingWorkshop.tasks;
const lessonTools=scope.window.HUB.lessonTools;
const expected=["thankyou","summer","landlady","paw"];
assert.deepEqual(Object.keys(tasks),expected);
for(const key of expected){
 assert.equal(typeof lessonTools["stories/"+key],"function",key+" lacks lesson registration");
 const t=tasks[key];
 assert.ok(t.title&&t.question&&t.length&&t.hint.length===2&&t.kind.length===2);
 assert.equal(t.checks.length,5,"Five review requirements for "+key);
}
assert.match(tasks.thankyou.question,/compassion.*punishment/i);
assert.match(tasks.summer.question,/setting and group behaviour/i);
assert.equal(tasks.landlady.tech,true);
assert.equal(tasks.paw.opposing,true);
assert.match(tasks.paw.length,/Three or four/);
const html=fs.readFileSync(path.join(root,"ela/index.html"),"utf8");
assert.match(html,/<script src="core-writing-workshop\.js"><\/script>/);
assert.ok(html.indexOf('src="core-writing-workshop.js"')<html.indexOf('src="../assets/hub.js"'));
const data=fs.readFileSync(path.join(root,"ela/data.js"),"utf8");
for(const k of expected)assert.match(data,new RegExp('id:"'+k+'"'),"Story lesson is missing: "+k);
assert.ok(!code.includes("localStorage")&&!code.includes("fetch("),"No saved or network data");
assert.ok(!code.includes("Teacher_Key"),"Do not publish teacher keys");
console.log("Core Writing Workshop: four task variants, structure, privacy and hub registration passed.");
