/* Grade 8 Science homepage: the zoom covers every content unit, biggest scale first, and the hub shows it only with no hash. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("science/data.js"),ctx);
vm.runInNewContext(read("science/zoom.js").replace("H.home=render;","H.home=render;window.__L=LEVELS;"),ctx);
const H=ctx.window.HUB,L=ctx.window.__L;
assert.equal(typeof H.home,"function");
const ids=H.units.map(u=>u.id).filter(id=>id!=="skills");
assert.deepEqual([...L.map(l=>l.id)].sort(),[...ids].sort(),"every content unit has a level");
const metres={light:1.5e11,earth:1.27e7,cells:2e-5,matter:3e-10};
for(let i=1;i<L.length;i++) assert.ok(metres[L[i-1].id]>metres[L[i].id],"levels must go from biggest to smallest");
const hub=read("assets/hub.js");
assert.ok(hub.includes('if(!h && H.home)'),"hub shows a subject homepage only when there is no hash");
const html=read("science/index.html");
assert.ok(html.indexOf("zoom.js")<html.indexOf("hub.js")&&html.indexOf("science.css")>html.indexOf("site.css"));
console.log("Science zoom: "+L.length+" levels, biggest to smallest, every unit covered.");
