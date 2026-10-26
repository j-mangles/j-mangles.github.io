/* Grade 7 Math: Preservation of Equality / one-step equations.
 * Confirm each operation preserves or breaks balance exactly, and models stay valid. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const h={window:{HUB:{subject:"math",tools:{},units:[]}}};
vm.runInNewContext(read("math/balance-studio.js"),h,{filename:"math/balance-studio.js"});
const B=h.window.BalanceStudioCore;
assert.equal(typeof h.window.HUB.tools.eq,"function","Eq unit tool must register");
assert.equal(B.tasks.length,6,"Expected six curated practice cases");
for(const p of B.tasks){
 assert.ok(p.b>p.a&&p.a>0&&Number.isSafeInteger(p.a)&&Number.isSafeInteger(p.b));
 const x=B.value(p);
 assert.equal(x+p.a,p.b,p.label);
 const start=B.shift(p,"start");
 assert.equal(start.leftTotal,p.b);
 assert.equal(start.rightTotal,p.b);
 assert.ok(start.balanced&&!start.isolated);
 const both=B.shift(p,"bothRemove");
 assert.ok(both.balanced&&both.isolated);
 assert.equal(both.leftConstant,0);
 assert.equal(both.rightConstant,x);
 assert.equal(both.leftTotal,both.rightTotal);
 const add=B.shift(p,"bothAdd");
 assert.ok(add.balanced&&!add.isolated);
 assert.equal(add.changeLeft,2);assert.equal(add.changeRight,2);
 const left=B.shift(p,"leftRemove"),right=B.shift(p,"rightRemove");
 assert.ok(!left.balanced&&!right.balanced);
 assert.equal(left.delta,-p.a);
 assert.equal(right.delta,p.a);
 assert.equal(left.leftTotal-left.rightTotal,left.delta);
 assert.equal(right.leftTotal-right.rightTotal,right.delta);
 for(const a of ["start","bothRemove","leftRemove","rightRemove","bothAdd"]){
  const svg=B.balanceSVG(p,a);
  assert.ok(svg.includes('role="img"')&&svg.includes('Conceptual balance scale'));
  assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"));
  assert.ok(svg.includes(B.shift(p,a).balanced?"Balanced":"Unbalanced"));
 }
}
assert.equal(B.formatAddition(4,11),"x + 4 = 11");
assert.equal(B.formatAddition(0,7),"x = 7");
assert.equal(B.formatAddition(-3,5),"x − 3 = 5");
const html=read("math/index.html"),tags=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]);
assert.ok(tags.includes("balance-studio.js"));
assert.ok(tags.indexOf("tools.js")<tags.indexOf("balance-studio.js"));
assert.ok(tags.indexOf("balance-studio.js")<tags.indexOf("../assets/course-map.js"));
assert.ok(read("index.html").includes('href="math/#eq"'));
assert.ok(read("assets/course-map.js").includes('eq:"Equation Balance Studio"'));
const data={window:{}};vm.runInNewContext(read("math/data.js"),data);
const eq=data.window.HUB.units.find(u=>u.id==="eq");
assert.ok(eq&&eq.name==="Patterns and Equations"&&!(eq.lessons||[]).length,"Do not invent unpublished lessons");
console.log("Balance Studio tests passed: 6 bags, preserving vs breaking equality, exact answers, SVGs and navigation.");
