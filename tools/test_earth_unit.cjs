/* Grade 8 Earth Science: curriculum coverage, student guides and model limitations. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("science/data.js"),ctx,{timeout:3000});
const hub=ctx.window.HUB,unit=hub.units.find(u=>u.id==="earth");
assert.ok(unit);assert.equal(unit.lessons.length,16);
assert.match(unit.intro,/Manitoba/i);
assert.equal(new Set(Array.from(unit.lessons,x=>x.id)).size,16);
const count=unit.lessons.reduce((n,l)=>n+l.check.length,0);
assert.ok(count>=32,"Expected substantial student self-check coverage");
let vocab=0;
for(const l of unit.lessons){
 assert.ok(l.title&&l.big&&l.work,l.id);
 assert.ok(l.notes.length>=4,l.id+" needs explanatory lesson notes");
 assert.ok(l.terms.length>=3,l.id+" needs a glossary");
 assert.ok(l.check.length>=2,l.id+" needs practice checks");
 for(const q of l.check){
  assert.ok(q.q&&q.why&&q.a.length>=3&&Number.isInteger(q.c)&&q.c>=0&&q.c<q.a.length,"Invalid check "+l.id);
 }
 vocab+=l.terms.length;
}
assert.ok(vocab>=55);
assert.ok(unit.lessons.some(l=>/Lake Agassiz/.test(l.notes.join(" "))));
assert.ok(unit.lessons.some(l=>/Red River/.test(l.notes.join(" "))));
assert.ok(unit.lessons.some(l=>/Cascadia/.test(l.notes.join(" "))));
assert.ok(unit.lessons.some(l=>/seafloor/i.test(l.title)));
assert.ok(unit.lessons.some(l=>l.activity?.prompts?.length>=4),"Review needs a copyable evidence-based response");
ctx.window.HUB.lessonTools={};
vm.runInNewContext(read("science/river-watershed.js"),ctx,{timeout:4000});
const R=ctx.window.RiverWatershedCore;
assert.ok(R);
for(const id of ["e13-rivers","e14-watersheds","e15-glaciers","e16-review"])assert.equal(typeof hub.lessonTools["earth/"+id],"function");
const base=R.floodScore(50,40,20,false);
assert.ok(R.floodScore(85,40,20,false)>base,"More rain should raise simplified pressure");
assert.ok(R.floodScore(50,80,20,false)>base,"More snowmelt should raise simplified pressure");
assert.ok(R.floodScore(50,40,80,false)<base,"More cover should reduce simplified pressure");
assert.ok(R.floodScore(50,40,20,true)<base,"Diversion should reduce simplified pressure");
assert.ok(R.floodScore(0,0,100,false)===0);
assert.ok(R.floodScore(100,100,0,false)<=100);
assert.match(R.flowNote(12),/Lower/);
assert.match(R.iceNote(90),/More land/);
for(const m of ["meander","flood","glacier"]){
 const image=R.diagram(m,50,50,40,50,false,45);
 assert.ok(image.includes("<svg")&&image.includes('role="img"'),"Missing accessible diagram "+m);
 assert.ok(!image.includes("NaN")&&!image.includes("undefined"),"Broken diagram "+m);
}
const html=read("science/index.html");
assert.ok(html.indexOf('src="earth-explorer.js"')<html.indexOf('src="river-watershed.js"'));
assert.ok(html.indexOf('src="river-watershed.js"')<html.indexOf('src="../assets/hub.js"'));
assert.ok(!/localStorage|sessionStorage|fetch\(/.test(read("science/river-watershed.js")),"Don't store or transmit student responses");
console.log("Earth Science Unit 4 passed: "+unit.lessons.length+" lessons, "+count+" checks, "+vocab+" vocabulary entries, 4 bound models, 3 accessible diagrams and Manitoba examples.");
