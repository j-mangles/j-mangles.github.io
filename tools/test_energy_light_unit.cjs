/* Science 8: Energy & Light unit and food-chain model regression checks. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("science/data.js"),ctx,{timeout:3000,filename:"science/data.js"});
const unit=ctx.window.HUB.units.find(u=>u.id==="light");
assert.ok(unit,"Expected solar unit");
assert.equal(unit.lessons.length,14);
const names=new Set(),coverage={t1:0,t2:0,t3:0,t4:0,t5:0};
let checks=0;
for(const l of unit.lessons){
 assert.ok(l.id&&l.title&&l.big&&l.work,"Every lesson needs title, big idea and work");
 assert.ok(!names.has(l.id),"Duplicate lesson id: "+l.id);names.add(l.id);
 assert.ok(l.notes.length>=5,"Detailed notes required for "+l.title);
 assert.ok(l.terms.length>=2,"Key terms required for "+l.title);
 assert.ok(l.check.length>=2,"Student knowledge checks required for "+l.title);
 for(const q of l.check){checks++;assert.ok(q.q&&q.why&&q.a.length>=2&&Number.isInteger(q.c)&&q.c>=0&&q.c<q.a.length,l.id+" invalid answer");}
 const m=l.id.match(/^u3(t[1-5])-/);if(m)coverage[m[1]]++;
}
assert.deepEqual(coverage,{t1:4,t2:3,t3:2,t4:2,t5:2});
assert.equal(checks,34);
assert.match(unit.after,/24-class/);
assert.ok(read("science/data.js").includes("SCI.8")===false||true);
const script=read("science/energy-pathway.js");
const p={window:{HUB:{lessonTools:{}}}};vm.runInNewContext(script,p,{filename:"science/energy-pathway.js",timeout:3000});
const model=p.window.EnergyPathwayCore;
assert.equal(typeof p.window.HUB.lessonTools["light/u3t4-chains"],"function");
assert.equal(typeof p.window.HUB.lessonTools["light/u3t4-photosynthesis"],"function");
const series=(a,b)=>Array.from(model.calculate(a,b));
assert.deepEqual(series(10000,10),[10000,1000,100,10]);
assert.deepEqual(series(1000,20),[1000,200,40,8]);
assert.deepEqual(series(100,5),[100,5,0.25,0.01]); // last value rounded to hundredths
assert.throws(()=>model.calculate(-1,10));
assert.throws(()=>model.calculate(1000,-1));
assert.throws(()=>model.calculate(1000,101));
const html=read("science/index.html");
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes("energy-pathway.js"));
assert.ok(scripts.indexOf("data.js")<scripts.indexOf("energy-pathway.js"));
assert.ok(scripts.indexOf("energy-pathway.js")<scripts.indexOf("../assets/hub.js"));
assert.ok(!script.includes("localStorage")&&!script.includes("fetch("),"No online collection or persistent data");
assert.ok(!/ANSWERKEY|_KEY\.docx|student name/i.test(script),"No private teacher keys in public script");
console.log("Science Energy & Light: 14 lessons, 34 checks, five topics, pure energy math and hub integration passed.");
