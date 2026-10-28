/* Science 8: Earth layers, plate boundaries, evidence and measured scale disclaimers. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{HUB:{subject:"sci",units:[],tools:{}}}};
vm.runInNewContext(read("science/earth-explorer.js"),ctx,{filename:"science/earth-explorer.js"});
const E=ctx.window.EarthExplorerCore;
assert.equal(typeof ctx.window.HUB.tools.earth,"function");
assert.deepEqual(Array.from(E.layers,x=>x.id),["crust","mantle","outer","inner"]);
assert.equal(E.layers.find(x=>x.id==="outer").state,"Liquid metal");
assert.equal(E.layers.find(x=>x.id==="inner").state,"Solid metal");
assert.ok(E.layers.find(x=>x.id==="mantle").detail.includes("Mostly")===false);
assert.ok(E.layers.find(x=>x.id==="mantle").detail.includes("solid")||E.layers.find(x=>x.id==="mantle").state.includes("solid"));
assert.ok(E.layers.find(x=>x.id==="crust").observation.includes("lithosphere"));
for(const layer of E.layers){
 const svg=E.layerSVG(layer.id);
 assert.ok(svg.includes('role="img"')&&svg.includes(layer.name)&&svg.includes("Not to scale"),layer.id);
 assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"),layer.id);
}
assert.deepEqual(Array.from(E.boundaries,x=>x.id),["divergent","subduction","collision","transform"]);
for(const b of E.boundaries){
 assert.ok(b.options.length===3);
 assert.ok(Number.isInteger(b.correct)&&b.correct>=0&&b.correct<3);
 assert.ok(b.prompt.length>25&&b.effect.length>30);
 for(const stage of [0,5,45,50,95,100]){
  const diagram=E.plateSVG(b.id,stage);
  assert.ok(diagram.includes('role="img"')&&diagram.includes("Not to scale"),b.id);
  assert.ok(diagram.includes("Movement is exaggerated"),b.id);
  assert.ok(!diagram.includes("NaN")&&!diagram.includes("undefined"),b.id+" "+stage);
 }
}
assert.equal(E.rateDistance(2.5,1),25);
assert.equal(E.rateDistance(0,1),0);
assert.equal(E.rateDistance(3,2),60);
for(const input of [[-2,1],[2,-1],[NaN,2]])assert.throws(()=>E.rateDistance(...input));
assert.equal(E.evidence.length,4);
assert.ok(E.evidence.find(x=>x.id==="fossils").fact.includes("South America"));
assert.ok(E.evidence.find(x=>x.id==="seafloor").support.includes("spreading"));
const html=read("science/index.html"),scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(scripts.includes("earth-explorer.js"));
assert.ok(scripts.indexOf("data.js")<scripts.indexOf("earth-explorer.js"));
assert.ok(scripts.indexOf("earth-explorer.js")<scripts.indexOf("../assets/course-map.js"));
assert.ok(read("index.html").includes('href="science/#earth"'));
assert.ok(read("assets/course-map.js").includes('earth:"Earth & Plate Tectonics Explorer"'));
const dc={window:{}};vm.runInNewContext(read("science/data.js"),dc);
const earth=dc.window.HUB.units.find(u=>u.id==="earth");
assert.ok(earth&&/^Earth Science/.test(earth.name));
assert.equal(earth.lessons.length,16,"Full Earth Science unit should have sixteen lesson guides");
assert.ok(earth.lessons.some(l=>/watershed/i.test(l.title)),"Include Manitoba watersheds");
console.log("Earth Explorer passed: four compositional layers, four plate boundaries, 24 diagrams, continental drift evidence, scaled motion arithmetic, valid routes.");
