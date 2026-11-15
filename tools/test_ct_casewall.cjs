/* Critical Thinking homepage: every lesson is on the wall exactly once, the open case is the newest lesson of the unit we're in, the wall is the same on every load, and nothing loads from outside. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const load=extra=>{const ctx={window:{}};vm.runInNewContext(read("critical-thinking/data.js")+(extra||""),ctx);vm.runInNewContext(read("critical-thinking/casewall.js"),ctx);return ctx.window.HUB;};
const keysOf=L=>{const k=[];if(L.open)k.push(L.open.key);
  L.groups.forEach(g=>g.cards.forEach(c=>c.stack?(c.stack.lessons||[]).forEach(l=>k.push(c.stack.id+"/"+l.id)):k.push(c.key)));
  L.unsorted.forEach(c=>k.push(c.key));return k.sort();};
const H=load(),W=H.caseWall,L=W.layout(H.units);
assert.equal(typeof H.home,"function");
const all=[];H.units.forEach(u=>(u.lessons||[]).forEach(l=>all.push(u.id+"/"+l.id)));
assert.deepEqual(keysOf(L),[...all].sort(),"every lesson is on the wall exactly once");
const now=H.units.find(u=>u.status==="now"&&(u.lessons||[]).length);
if(now) assert.equal(L.open.key,now.id+"/"+now.lessons[now.lessons.length-1].id,"the open case is the newest lesson of the unit we're in");
for(const g of L.groups) for(const c of g.cards) assert.ok(W.POS[c.key],c.key+" has a pin position");
for(const k of Object.keys(W.POS)){const t=+W.tilt(k);assert.ok(Math.abs(t)<=2.5,"tilt stays readable");assert.equal(W.tilt(k),load().caseWall.tilt(k),"same tilt on every load");}
// a lesson added later still shows up, as Unsorted
const H2=load(';window.HUB.units[0].lessons.splice(3,0,{id:"zz",n:"99",title:"New case"});'),L2=H2.caseWall.layout(H2.units);
assert.ok(L2.unsorted.some(c=>c.key==="lab/zz"),"a new lesson lands in Unsorted");
const all2=[];H2.units.forEach(u=>(u.lessons||[]).forEach(l=>all2.push(u.id+"/"+l.id)));
assert.deepEqual(keysOf(L2),all2.sort());
for(const f of ["critical-thinking/casewall.js","critical-thinking/ct.css"]) assert.ok(!/https?:\/\/|@import/.test(read(f)),f+" loads nothing from outside");
const html=read("critical-thinking/index.html");
assert.ok(html.indexOf("casewall.js")<html.indexOf("hub.js")&&html.indexOf("ct.css")>html.indexOf("site.css"));
console.log(`Case wall: ${all.length} lessons, ${L.groups.length} groups, open case ${L.open.key}, ${L.unsorted.length} unsorted.`);
