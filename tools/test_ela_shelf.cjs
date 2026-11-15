/* Grade 8 ELA homepage: every story and film is on the shelf or in the drawer, the shelf is the same on every load, and nothing loads from outside. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const load=()=>{const ctx={window:{}};vm.runInNewContext(read("ela/data.js"),ctx);vm.runInNewContext(read("ela/shelf.js"),ctx);return ctx.window.HUB;};
const H=load(),L=H.shelfLayout(H.units);
assert.equal(typeof H.home,"function");
const started=u=>["now","done","ongoing"].includes(u.status);
const placed=new Set([...L.spines.map(s=>s.key),...L.drawer.map(d=>d.go)]);
for(const u of H.units.filter(u=>["stories","film","novel","essays"].includes(u.id))){
  if(started(u)) for(const l of u.lessons||[]) assert.ok(placed.has(u.id+"/"+l.id),`${u.id}/${l.id} is on the shelf or in the drawer`);
  else assert.ok(L.spaces.some(p=>p.unit===u.id),`${u.id} has a space saved on the shelf`);
}
for(const id of ["answering","grammar"]) assert.ok(placed.has(id),id+" is in the drawer");
assert.equal(new Set(L.spines.map(s=>s.key)).size,L.spines.length,"no spine appears twice");
const now=H.units.find(u=>u.status==="now"&&["stories","film","novel","essays"].includes(u.id));
if(now) assert.ok(L.open.startsWith(now.id+"/"),"the pulled-out text is from the unit we're in");
assert.deepEqual(JSON.parse(JSON.stringify(load().shelfLayout(load().units))),JSON.parse(JSON.stringify(L)),"the shelf is the same on every load");
const known={"Langston Hughes":1,"Ray Bradbury":1,"Roald Dahl":1,"W. W. Jacobs":1};
for(const s of L.spines) if(s.author) assert.ok(known[s.author],"only verified authors: "+s.author);
for(const f of ["ela/shelf.js","ela/ela.css"]) assert.ok(!/https?:\/\/|@import/.test(read(f)),f+" loads nothing from outside");
const html=read("ela/index.html");
assert.ok(html.indexOf("shelf.js")<html.indexOf("hub.js")&&html.indexOf("ela.css")>html.indexOf("site.css"));
assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(html+read("assets/fonts.css")));
console.log(`ELA shelf: ${L.spines.length} spines, ${L.spaces.length} spaces, ${L.drawer.length} drawer cards.`);
