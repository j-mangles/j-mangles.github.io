/* Grade 8 Science: the 3D matter models replace three flat pictures, keep them as fallbacks, and stay true to the booklet's numbers. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const srcs=[...read("science/index.html").matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split("?")[0]);
const at=n=>srcs.indexOf(n);
assert.ok(at("matter-visuals.js")>=0&&at("matter-visuals.js")<at("../assets/model3d.js")&&at("../assets/model3d.js")<at("matter-3d.js"),"load order: matter-visuals, model3d, matter-3d");
assert.ok(!/https?:\/\//.test(read("science/matter-3d.js")),"the models must not load anything from another site");
const flat={};["states","viscosity","water","density"].forEach(k=>flat["matter/"+k]=el=>{el.innerHTML="<svg>flat "+k+"</svg>";});
const ctx={window:{HUB:{lessonTools:flat}},document:{}};
vm.runInNewContext(read("assets/model3d.js"),ctx);
vm.runInNewContext(read("science/matter-3d.js").replace("const WATER=","window.__m={ice:()=>ICE,liq:()=>LIQ,reach};const WATER="),ctx);
const T=ctx.window.HUB.lessonTools,m=ctx.window.__m;
for(const k of ["states","viscosity","water"]){const el={};T["matter/"+k](el);assert.ok(el.innerHTML.includes("flat "+k),"no DOM here, so "+k+" must fall back to the flat picture");}
assert.equal(T["matter/density"],flat["matter/density"],"other lesson pictures are left alone");
// ice: same number of particles as the liquid, every link the same length, nobody with more than four neighbours
const ice=m.ice(),liq=m.liq();
assert.equal(ice.pts.length,liq.pts.length);
assert.ok(Math.abs(liq.h/ice.L[1]-.92)<1e-9,"liquid takes 92% of the ice volume (0.92 g/cm³ against 1.00 g/mL)");
const n=ice.pts.map((_,a)=>ice.bonds.filter(b=>b.includes(a)).length);
assert.ok(Math.max(...n)===4&&n.filter(v=>v>=3).length>ice.pts.length*.7);
ice.bonds.forEach(([a,b])=>assert.ok(Math.abs(Math.hypot(...ice.pts[a].map((v,k)=>v-ice.pts[b][k]))-ice.bond)<.01));
// ramp: water is fastest, warming helps the thick liquids, nothing overshoots the finish
assert.ok(m.reach("water",20)===1&&m.reach("oil",20)<1&&m.reach("syrup",20)<m.reach("oil",20));
assert.ok(m.reach("syrup",50)>m.reach("syrup",20)&&m.reach("syrup",50)<m.reach("oil",50)&&m.reach("oil",50)<=1);
console.log("3D matter models: fallbacks, ice lattice, 92% volume and ramp order all check out.");
