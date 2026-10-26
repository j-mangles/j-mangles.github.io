/* Manitoba 7.SP.3: construct, label and interpret circle graphs. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{HUB:{subject:"math",tools:{},units:[]}}};
vm.runInNewContext(read("math/circle-graph-lab.js"),ctx,{filename:"math/circle-graph-lab.js"});
const G=ctx.window.CircleGraphCore;
assert.equal(typeof ctx.window.HUB.tools.area,"function","Unit 9 graph tool must be registered");
const ex=G.calculate(G.EXAMPLE);
assert.equal(ex.total,30);
assert.deepEqual(Array.from(ex.rows,x=>x.count),[12,9,6,3]);
assert.deepEqual(Array.from(ex.rows,x=>x.angle),[144,108,72,36]);
assert.deepEqual(Array.from(ex.rows,x=>x.percent),[40,30,20,10]);
assert.equal(ex.rows.reduce((s,r)=>s+r.angle,0),360);
const a=G.calculate([{label:"A",count:1},{label:"B",count:2}]);
assert.equal(a.rows[0].angle,120);
assert.equal(a.rows[1].angle,240);
assert.ok(Math.abs(a.rows.reduce((s,r)=>s+r.ratio,0)-1)<1e-10);
const one=G.calculate([{label:"Everything",count:10},{label:"Nothing",count:0}]);
assert.equal(one.rows[0].angle,360);
assert.equal(one.rows[1].angle,0);
for(const rows of [
 [{label:"A",count:0},{label:"B",count:0}],
 [{label:"A",count:-1},{label:"B",count:2}],
 [{label:"A",count:1.5},{label:"B",count:2}],
 [{label:"",count:1},{label:"B",count:2}],
 [{label:"A",count:1001},{label:"B",count:2}],
 [{label:"A",count:1}]
])assert.throws(()=>G.calculate(rows));
const svg=G.chart(G.EXAMPLE);
assert.ok(svg.includes('role="img"')&&svg.includes("Playing sports 40 percent"));
assert.ok(svg.includes("144°")&&svg.includes("360")===false || svg.includes("144°"));
assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"));
const circle=G.chart([{label:"All",count:9},{label:"Zero",count:0}]);
assert.ok(circle.includes("<circle"),"A 100 percent category needs a full circle");
const attack=G.chart([{label:'"><script>alert(1)</script>',count:1},{label:"Normal",count:1}]);
assert.ok(!attack.includes("<script>")&&!attack.includes('"><script>'));
const out=G.report(G.EXAMPLE,"The largest category is sports, 12 out of 30.");
assert.ok(out.includes("7.SP.3")&&out.includes("144°")&&out.includes("12 out of 30."));
const page=read("math/index.html"),scripts=[...page.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes("circle-graph-lab.js")&&scripts.indexOf("tools.js")<scripts.indexOf("circle-graph-lab.js")&&scripts.indexOf("circle-graph-lab.js")<scripts.indexOf("../assets/hub.js"));
const data={window:{}};vm.runInNewContext(read("math/data.js"),data);
const unit=data.window.HUB.units.find(u=>u.id==="area");
assert.ok(unit&&unit.name==="Area and Circle Graphs");
assert.ok(!unit.lessons||unit.lessons.length===0,"Do not invent unpublished unit lessons");
assert.ok(read("assets/course-map.js").includes('area:"Circle Graph Construction Lab"'));
assert.ok(read("index.html").includes('href="math/#area"'));
console.log("Grade 7 Circle Graph Lab validated: fractional sectors, percentages, 360° totals, invalid data handling, safe labels and course routes.");
