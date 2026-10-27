/* Giza Field Expedition source, content, quiz, geometry and privacy regression tests. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const c={window:{}};
vm.runInNewContext(read("social-studies/giza-expedition-core.js"),c,{filename:"giza-expedition-core.js",timeout:4000});
const G=c.window.GizaExpeditionCore;
assert.equal(G.MISSIONS.length,6);
assert.equal(G.PEOPLE.length,3);
assert.deepEqual(Array.from(G.MISSIONS,m=>m.id),["sphinx","causeway","khufu","scribe","village","menkaure"]);
for(const m of G.MISSIONS){
 assert.ok(m.id&&m.title&&m.fact&&m.inference&&m.question&&m.options.length===3);
 assert.ok(m.outcomes.length>=1&&m.source&&G.SOURCES[m.source]);
 assert.ok(Number.isFinite(m.x)&&Number.isFinite(m.z)&&m.range>=10);
 assert.ok(m.correct>=0&&m.correct<3);
 assert.ok(/https:\/\/(egymonuments\.gov\.eg|giza\.fas\.harvard\.edu)\//.test(G.SOURCES[m.source].url));
}
for(const p of G.PEOPLE)assert.ok(p.name&&/fictional/.test(p.role)&&p.lines.length>=2);
const journal=G.makeJournal();
const first=G.MISSIONS[0];
let result=G.answer(journal,first.id,(first.correct+1)%3);
assert.equal(result.correct,false);assert.equal(result.done,0);assert.equal(journal.attempts[first.id],1);
result=G.answer(journal,first.id,first.correct);
assert.equal(result.correct,true);assert.equal(result.done,1);
G.answer(journal,first.id,first.correct);
assert.equal(journal.done.length,1,"Do not count same clue twice");
for(const m of G.MISSIONS)G.answer(journal,m.id,m.correct);
assert.equal(journal.done.length,6);
assert.equal(G.nearest({x:44,z:33}).id,"sphinx");
assert.throws(()=>G.answer(journal,"not-a-place",0));
assert.throws(()=>G.answer(journal,"sphinx",7));
const blocked=G.safeMove({x:15,z:-42},0,-100);
assert.ok(Math.hypot(blocked.x-15,blocked.z+89)>=42,"Pyramid collision must prevent walking through core");
const bounds=G.safeMove({x:500,z:500},0,0);
assert.ok(bounds.x<=174&&bounds.z<=157);
const html=read("social-studies/giza-expedition.html");
const engine=read("social-studies/giza-expedition.js");
for(const id of ["render","dialog","mission-list","near-action","minimap","view-mode","pad","notes","download-report"]){
 assert.ok(html.includes('id="'+id+'"'),"Missing UI element "+id);
}
assert.match(html,/giza-expedition-core\.js/);assert.match(html,/type="module" src="giza-expedition\.js"/);
assert.ok(engine.includes("three@0.164.1"),"Pinned 3D engine expected");
assert.ok(engine.includes("WebGLRenderer"),"WebGL first/third-person renderer must exist");
assert.ok(engine.includes("setupMap"),"Accessible overhead fallback must exist");
assert.ok(engine.includes("makePerson"),"Visible animated people expected");
assert.ok(engine.includes("data-travel"),"Accessible travel controls expected");
assert.ok(!/localStorage|sessionStorage|fetch\(/.test(engine),"No personal data storage or remote submissions");
const atlas=read("social-studies/index.html");
assert.match(atlas,/href="giza-expedition\.html"/);
assert.match(atlas,/Walkable Giza Game/);
assert.match(html,/Fourth Dynasty/);
assert.ok(!html.includes("Karnak Temple")&&!html.includes("Abu Simbel"),"Avoid mixing periods in one site reconstruction");
console.log("Giza: six sites, 3 NPC roles, accurate sourcing, collisions, 6-step quest, input/privacy and atlas links passed.");
