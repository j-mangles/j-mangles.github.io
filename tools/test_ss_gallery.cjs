/* Grade 8 SS atlas: the gallery design has a room for every unit and the page switches rooms with the unit. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const html=read("social-studies/index.html"),css=read("social-studies/rooms.css")+read("social-studies/gallery.css");
assert.ok(html.indexOf("rooms.css")>html.indexOf("</style>",1200)&&html.indexOf("gallery.css")>html.indexOf("rooms.css"),"rooms.css then gallery.css must load after the page's own styles");
assert.ok(/<html[^>]*data-room="world"/.test(html),"the page starts in the World room");
assert.ok(html.includes("document.documentElement.dataset.room=S.view")&&html.includes('$("#sheet").dataset.room=unitId'));
const units=[...new Set([...html.matchAll(/\bid:\s*"([a-z-]+)",\s*n:/g)].map(m=>m[1]))];
assert.ok(units.length>=6,"expected the unit list, found "+units.join(","));
for(const u of units){
  const m=css.match(new RegExp(':root\\[data-room="'+u+'"\\],\\.sheet\\[data-room="'+u+'"\\]\\{([^}]*)\\}'));
  assert.ok(m,"no room for unit "+u);
  for(const v of ["--room","--room-ink","--gilt","--paper","--paper-ink","--label","--ocean","--land","--band"]) assert.ok(m[1].includes(v+":"),u+" room is missing "+v);
}
assert.ok(!/https?:\/\//.test(css.replace(/http:\/\/www\.w3\.org\/2000\/svg/g,"")),"the stylesheet must not load anything from another site");
assert.ok(!/Inter|JetBrains/.test(css),"the gallery uses Cormorant, Newsreader and Space Grotesk only");
// every lab page sits in a known room, stays light, and loads rooms.css then lab.css after its own styles
const labs=fs.readdirSync(path.join(root,"social-studies")).filter(f=>f.endsWith(".html")&&!["index.html","giza-expedition.html","giza-harbour.html"].includes(f));
for(const f of labs){
  const h=read("social-studies/"+f),room=(h.match(/<html[^>]*data-room="([a-z-]+)"/)||[])[1];
  assert.ok(room&&(room==="world"||units.includes(room)),f+" has no valid data-room");
  assert.ok(/<html[^>]*data-theme="light"/.test(h),f+" must stay light");
  const r=h.indexOf("rooms.css"),l=h.indexOf("lab.css"),st=h.lastIndexOf("</style>");
  assert.ok(r>st&&l>r,f+" must load rooms.css then lab.css after its own styles");
}
console.log(labs.length+" lab pages in their unit rooms.");
console.log("Gallery design: "+units.length+" unit rooms defined, page switches rooms with the unit and lesson.");
