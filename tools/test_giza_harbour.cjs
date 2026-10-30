/* Grade 8 Giza Harbour v2: historical accuracy, solvable mystery and student privacy. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};
vm.runInNewContext(read("social-studies/giza-harbour-core.js"),ctx,{timeout:3500});
const q=ctx.window.HarbourQuest;
assert.equal(q.EVIDENCE.length,5);
assert.equal(q.CHARACTERS.length,3);
assert.equal(q.VERDICTS.length,3);
assert.equal(q.VERDICTS.filter(x=>x.isCorrect).length,1);
assert.deepEqual(Array.from(q.EVIDENCE,x=>x.id),["water","tracks","manifest","limestone","seal"]);
for(const item of q.EVIDENCE){
 assert.ok(item.name&&item.observation&&item.context&&item.question&&item.lead,item.id);
 assert.ok(/fictional|reconstruct|imagined|invented|illustrative/i.test(item.context),item.id+" needs historical caveat");
 assert.ok(item.range>5&&item.range<25);
}
for(const p of q.CHARACTERS){
 assert.ok(p.role==="fictional composite"&&p.options.length===3);
 assert.ok(p.options.every(x=>x.text&&x.reply));
}
const dry=q.haul(q.newHaul(),0),wetted=q.haul(q.newHaul(),43),flooded=q.haul(q.newHaul(),100);
assert.ok(wetted.advanced>dry.advanced&&wetted.advanced>flooded.advanced);
const practice=q.newHaul();for(let i=0;i<4;i++)q.haul(practice,43);
assert.equal(practice.progress,100);
assert.throws(()=>q.haul(practice,101));
const state=q.start();
assert.equal(q.canConclude(state),false);
assert.equal(q.inspect(state,"water").newCount,1);
assert.equal(q.inspect(state,"water").newCount,1);
assert.equal(q.inspect(state,"tracks").newCount,2);
assert.equal(q.inspect(state,"manifest").newCount,3);
assert.equal(q.canConclude(state),false,"Need two interviews in addition to clues");
q.interview(state,"scribe");q.interview(state,"scribe");
assert.equal(state.interviews.length,1);
q.interview(state,"boatman");
assert.equal(q.canConclude(state),true);
let result=q.conclude(state,"diverted",["water"],"Water level was lower and the shipment may have moved.");
assert.equal(result.ok,false);
result=q.conclude(state,"diverted",["water","unseen"],"Water level was lower and the shipment may have moved.");
assert.equal(result.ok,false);
result=q.conclude(state,"stolen",["water","manifest"],"My theory is that the blocks were stolen on the road.");
assert.equal(result.ok,false);
assert.equal(state.stage,"rethink");
result=q.conclude(state,"diverted",["manifest","tracks"],"The written record and sledge marks both indicate a change in dock.");
assert.equal(result.ok,false,"Low-water physical clue is necessary");
result=q.conclude(state,"diverted",["water","manifest"],"Shallow northern water required unloading at the southern berth.");
assert.equal(result.ok,true);
assert.equal(state.stage,"complete");
assert.deepEqual(Array.from(state.selected),["water","manifest"]);
assert.throws(()=>q.inspect(state,"notreal"));
assert.throws(()=>q.interview(state,"notreal"));
assert.throws(()=>q.conclude(state,"notreal",["water","manifest"],"This is a complete explanation."));
for(const location of q.EVIDENCE.concat(q.CHARACTERS)){
 const n=q.safeMove({x:location.x,z:location.z},4,4);
 assert.ok(q.distance(location,n)<=15,location.id+" should be accessible");
}
const scripts=["social-studies/giza-harbour-core.js","social-studies/giza-harbour-world.js","social-studies/giza-harbour.js"];
for(const path of scripts)assert.ok(!/localStorage|sessionStorage|fetch\(/.test(read(path)),path+": No persistent student profiles or remote submissions");
const html=read("social-studies/giza-harbour.html");
for(const id of ["scene","start-button","journal","conclude","case-file","prompt","map","touch","interact-mobile","field-notes"]){
 assert.ok(html.includes('id="'+id+'"'),"Missing UI: "+id);
}
const scriptOrder=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(scriptOrder,["giza-harbour-core.js","giza-harbour-world.js","giza-harbour.js"]);
assert.ok(read("social-studies/giza-harbour-world.js").includes("WebGLRenderer"));
assert.ok(read("social-studies/giza-harbour-world.js").includes("CanvasTexture"));
assert.ok(read("social-studies/giza-harbour.js").includes("fallback()"));
assert.ok(read("social-studies/index.html").includes('href:"giza-harbour.html"'));
assert.ok(html.includes("Fictional mystery")||html.includes("fictional mystery"));
assert.ok(/doi.org\/10.1111\/apaa.12111/.test(html));
console.log("Giza Harbour: 5 clues, 3 branching NPCs, evidence-gated conclusion, historical caveats, WebGL/2D, accessibility and privacy passed");
