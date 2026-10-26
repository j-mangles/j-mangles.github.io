/* Game Theory payoff chart: aligns with student booklet, protects original live game. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const h={window:{HUB:{tools:{games:()=>{}},lessonTools:{}}}};const original=h.window.HUB.tools.games;
vm.runInNewContext(read("critical-thinking/payoff-matrix.js"),h,{filename:"critical-thinking/payoff-matrix.js"});
const P=h.window.PayoffMatrixCore;
assert.equal(h.window.HUB.tools.games,original,"Do not replace the original interactive Prisoner Dilemma game");
assert.equal(typeof h.window.HUB.lessonTools["games/g1"],"function","Mount new model in real Lesson 1");
assert.deepEqual(Array.from(P.SCORES.CC),[3,3]);
assert.deepEqual(Array.from(P.SCORES.CB),[0,5]);
assert.deepEqual(Array.from(P.SCORES.BC),[5,0]);
assert.deepEqual(Array.from(P.SCORES.BB),[1,1]);
assert.equal(P.comparePayoffs("C").better,"B");
assert.equal(P.comparePayoffs("B").better,"B");
assert.deepEqual(Array.from(P.STRATEGIES,x=>x.id),["alwaysC","alwaysB","tit","grudger"]);
for(const a of P.STRATEGIES){
 for(const b of P.STRATEGIES){
  const simulation=P.play(a.id,b.id);
  assert.equal(simulation.rows.length,10);
  assert.equal(simulation.rows[9].totalA,simulation.totalA);
  assert.equal(simulation.rows[9].totalB,simulation.totalB);
  assert.equal(simulation.totalA+simulation.totalB,simulation.combined);
  for(const row of simulation.rows){
   const expected=P.SCORES[row.choiceA+row.choiceB];
   assert.equal(row.payA,expected[0]);
   assert.equal(row.payB,expected[1]);
  }
  const graph=P.chart(simulation);
  assert.ok(graph.includes('role="img"')&&graph.includes("Cumulative points"));
  assert.ok(!graph.includes("NaN")&&!graph.includes("undefined"));
 }
}
assert.equal(P.play("alwaysC","alwaysC").totalA,30);
assert.equal(P.play("alwaysC","alwaysC").totalB,30);
assert.equal(P.play("alwaysB","alwaysB").combined,20);
assert.equal(P.play("alwaysB","alwaysC").totalA,50);
assert.equal(P.play("alwaysB","alwaysC").totalB,0);
assert.equal(P.play("tit","alwaysB").totalA,9);
assert.equal(P.play("tit","alwaysB").totalB,14);
assert.throws(()=>P.play("alwaysC","unknown"));
assert.throws(()=>P.play("alwaysC","alwaysC",0));
const html=read("critical-thinking/index.html"),scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(scripts.includes("payoff-matrix.js")&&scripts.indexOf("payoff-matrix.js")<scripts.indexOf("../assets/hub.js"));
const d={window:{}};vm.runInNewContext(read("critical-thinking/data.js"),d);
assert.ok(d.window.HUB.units.some(u=>u.id==="games"&&u.lessons.some(l=>l.id==="g1"&&l.title==="Outsmart the Game")));
assert.ok(read("index.html").includes('href="critical-thinking/#games/g1"'));
console.log("Game-theory payoff matrix: 16 strategy pairings, exact score charts, real lesson route, original game preserved.");
