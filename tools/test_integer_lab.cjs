/* Grade 7 integer model tests: exact counter and number-line representations. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{HUB:{subject:"math",units:[],tools:{}}}};
vm.runInNewContext(read("math/integer-lab.js"),ctx,{filename:"math/integer-lab.js"});
const L=ctx.window.IntegerLabCore;
assert.equal(typeof ctx.window.HUB.tools.int,"function","Lab must register on integer unit");
assert.equal(L.EXAMPLES.length,16,"Unexpected curated problem list");
let seenSubtractNeg=false,seenAddNeg=false,seenZeroPairs=false,seenNoPairs=false;
for(const p of L.EXAMPLES){
 const result=L.solve(p),m=L.process(p);
 assert.equal(result,p.op==="+"?p.a+p.b:p.a-p.b,"wrong integer result");
 assert.equal(m.before.plus-m.before.minus,p.a,"incorrect initial value");
 assert.equal(m.after.plus-m.after.minus,result,"incorrect end value");
 assert.ok(m.after.plus>=0&&m.after.minus>=0,"negative tile counts");
 if(p.op==="−"){
  assert.equal(m.working.plus-m.working.minus,p.a,"zero pairs must preserve value");
  assert.equal(m.after.plus,m.working.plus-Math.max(0,p.b),"subtracted positive tiles");
  assert.equal(m.after.minus,m.working.minus-Math.max(0,-p.b),"subtracted negative tiles");
  assert.ok(m.working.plus>=Math.max(0,p.b)&&m.working.minus>=Math.max(0,-p.b),"insufficient counters for subtraction");
  if(p.b<0)seenSubtractNeg=true;
  if(m.addedPairs)seenZeroPairs=true;else seenNoPairs=true;
 }else{
  assert.equal(m.working.plus-m.working.minus,result,"joining tile sets changes total");
  assert.equal(m.after.plus,m.working.plus-m.removedPairs,"incorrect positive cancellation");
  assert.equal(m.after.minus,m.working.minus-m.removedPairs,"incorrect negative cancellation");
  if(p.b<0)seenAddNeg=true;
 }
 for(let step=0;step<3;step++){
  const tiles=L.countersSVG(p,step),line=L.numberlineSVG(p,step);
  assert.ok(tiles.includes('role="img"')&&tiles.includes("positive and"),"counter figure needs accessible equivalent");
  assert.ok(line.includes('role="img"')&&line.includes('viewBox="0 0 760 112"'),"number line model missing");
  assert.ok(!tiles.includes("NaN")&&!line.includes("NaN"),"invalid diagram coordinates");
  assert.ok(!tiles.includes("undefined")&&!line.includes("undefined"),"bad model labels");
 }
}
assert.ok(seenSubtractNeg&&seenAddNeg&&seenZeroPairs&&seenNoPairs,"Important teaching cases missing");
const problems=[
 {a:4,b:-3,op:"−",expected:7,pairs:3},
 {a:3,b:8,op:"−",expected:-5,pairs:5},
 {a:-6,b:-4,op:"−",expected:-2,pairs:0},
 {a:-3,b:-5,op:"−",expected:2,pairs:2},
 {a:6,b:-6,op:"+",expected:0,pairs:0},
 {a:-2,b:5,op:"−",expected:-7,pairs:5},
 {a:0,b:4,op:"−",expected:-4,pairs:4}
];
for(const p of problems){
 assert.equal(L.solve(p),p.expected,JSON.stringify(p));
 assert.equal(L.process(p).addedPairs,p.pairs,JSON.stringify(p));
}
const html=read("math/index.html");
const order=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(order.includes("integer-lab.js"));
assert.ok(order.indexOf("tools.js")<order.indexOf("integer-lab.js"));
assert.ok(order.indexOf("integer-lab.js")<order.indexOf("../assets/course-map.js"));
const dataCtx={window:{}};vm.runInNewContext(read("math/data.js"),dataCtx);
const unit=dataCtx.window.HUB.units.find(u=>u.id==="int");
assert.ok(unit&&unit.name==="Integer Operations"&&unit.lessons.length===0,"Do not invent unpublished lessons");
const link=read("index.html");assert.ok(link.includes('href="math/#int"'),"Missing homepage Integer Lab shortcut");
const cm=read("assets/course-map.js");assert.ok(cm.includes('int:"Integer Tiles & Number Line"'),"Model not properly named in tools menu");
console.log("Integer model tests passed: 16 scenarios, zero-pair semantics, arithmetic and route integration.");
