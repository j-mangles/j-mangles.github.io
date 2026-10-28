/* Science 8 Solar Spectrum & Albedo: exact model and course integration. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{HUB:{subject:"sci",units:[],tools:{}}}};
vm.runInNewContext(read("science/solar-explorer.js"),ctx,{filename:"science/solar-explorer.js"});
const C=ctx.window.SolarExplorerCore;
assert.equal(typeof ctx.window.HUB.tools.light,"function","Must register on solar unit");
assert.equal(C.bands.length,7,"Seven ordered spectrum groups expected");
assert.deepEqual(Array.from(C.bands,x=>x.id),["radio","microwave","infrared","visible","ultraviolet","xray","gamma"]);
assert.equal(C.compare("visible","infrared").wavelength,"shorter");
assert.equal(C.compare("visible","infrared").frequency,"higher");
assert.equal(C.compare("radio","gamma").wavelength,"longer");
assert.equal(C.compare("ultraviolet","ultraviolet").wavelength,"same");
assert.throws(()=>C.compare("unknown","radio"));
for(let i=0;i<C.bands.length;i++){
 for(let j=0;j<C.bands.length;j++){
  const answer=C.compare(C.bands[i].id,C.bands[j].id);
  assert.equal(answer.frequency,i===j?"same":i>j?"higher":"lower");
  assert.equal(answer.wavelength,i===j?"same":i>j?"shorter":"longer");
  assert.equal(answer.energy,answer.frequency);
 }
 const svg=C.waveSVG(C.bands[i].id);
 assert.ok(svg.includes('role="img"')&&svg.includes("Not to scale"));
 assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"));
}
for(const percent of [0,5,15,25,35,50,70,85,100]){
 const data=C.energyBudget(percent);
 assert.equal(data.reflected,percent);
 assert.equal(data.absorbed,100-percent);
 assert.equal(data.reflected+data.absorbed,data.incoming);
 const svg=C.albedoSVG(percent);
 assert.ok(svg.includes('role="img"')&&svg.includes("surface-only"));
 assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"));
}
assert.equal(C.energyBudget(60,240).reflected,144);
assert.equal(C.energyBudget(60,240).absorbed,96);
for(const n of [-1,101,NaN])assert.throws(()=>C.energyBudget(n));
const html=read("science/index.html"),src=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
assert.ok(src.includes("solar-explorer.js")&&src.indexOf("tools.js")<src.indexOf("solar-explorer.js"));
assert.ok(src.indexOf("solar-explorer.js")<src.indexOf("../assets/course-map.js"));
assert.ok(read("index.html").includes('href="science/#light"'));
assert.ok(read("assets/course-map.js").includes('light:"Solar Spectrum & Albedo Explorer"'));
const h={window:{}};vm.runInNewContext(read("science/data.js"),h);
const light=h.window.HUB.units.find(u=>u.id==="light");
assert.ok(light&&light.name==="Solar Energy and Light");
assert.equal(light.lessons.length,14,"Solar unit now has fourteen topic-based lesson guides");
assert.ok(light.lessons.some(l=>l.id==="u3t4-chains"),"Energy pathways lesson exists");
assert.ok(light.after.includes("booklet"),"Guides point students back to the booklet and class materials");
console.log("Science solar explorer tests passed: spectrum ranking, 49 comparisons, albedo budget and navigation.");
