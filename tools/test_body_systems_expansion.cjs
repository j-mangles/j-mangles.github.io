/* Human Systems Explorer: seven systems, musculoskeletal roles and observable routes. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(root,"science/system-interactions.js"),"utf8");
new vm.Script(src);
const window={HUB:{lessonTools:{}}};
vm.runInNewContext(src,{window,console},{timeout:3000});
const data=window.HUB.systemExplorerData;
assert.ok(data,"Body-systems data must be exposed");
assert.deepEqual(Object.keys(data.systems).sort(),["circulatory","digestive","integumentary","muscular","nervous","respiratory","skeletal"].sort());
for(const [id,x] of Object.entries(data.systems)){
 assert.ok(x.name&&x.organs&&x.job&&x.link, "System has labeled parts and connections: "+id);
 assert.equal(x.path.length,4,"Four explorable steps: "+id);
 assert.ok(x.path.every(step=>step.length===2&&step[0].length>=3&&step[1].length>=15),"Pathway stages have meaningful labels and explanations");
}
assert.match(data.systems.muscular.link,/nervous/i);
assert.match(data.systems.skeletal.job,/protection/i);
assert.ok(data.quiz.length>=6);
assert.ok(data.quiz.every(q=>q.c>=0&&q.c<q.a.length));
assert.equal(typeof window.HUB.lessonTools["cells/systems"],"function");
console.log("Body systems passed: seven selectable systems, four-step pathways, six reasoning questions and lesson-tool registration.");