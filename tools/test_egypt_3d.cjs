/* Grade 8 SS: the 3D pyramid and temple models register over the flat diagrams and keep them as the fallback. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const srcs=[...read("social-studies/index.html").matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split("?")[0]);
assert.ok(srcs.indexOf("egypt-3d.js")>srcs.indexOf("egypt-interactives.js")&&srcs.indexOf("egypt-interactives.js")>srcs.indexOf("egypt-diagrams.js"),"egypt-3d.js must load after the diagrams and interactives");
const ctx={window:{}};
for(const f of ["egypt-diagrams.js","egypt-interactives.js","egypt-3d.js"]) vm.runInNewContext(read("social-studies/"+f),ctx);
const IX=ctx.window.EgyptInteractives,D=ctx.window.EgyptDiagrams;
assert.ok(IX.nileYear,"the Nile interactive must still be registered");
for(const k of ["pyramids","temple"]){
 assert.equal(typeof IX[k].mount,"function");
 assert.ok(IX[k].cap.length>20);
 assert.ok(D[k]().svg.includes("<svg"),"flat fallback diagram missing: "+k);
 const el={};IX[k].mount(el);                      // no DOM here, so the model must fall back instead of throwing
 assert.ok(el.innerHTML.includes("<svg"),"fallback did not draw: "+k);
}
assert.ok(!/https?:\/\//.test(read("social-studies/egypt-3d.js")),"the 3D models must not load anything from another site");
const lessons=read("social-studies/egypt-lessons.js");
assert.ok(lessons.includes('"diagram": "pyramids"')&&lessons.includes('"diagram": "temple"'));
assert.ok(D.kingdoms().svg.includes("BCE | CE")&&!D.kingdoms().svg.includes(">0 CE<"),"there is no year 0");
console.log("3D pyramid and temple models register, fall back to the flat diagrams, and load nothing external.");
