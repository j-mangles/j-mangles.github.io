/* Grade 7 Math homepage: every unit is a station on a line, interchanges sit on two lines, lines only run flat, up or at 45 degrees, and nothing loads from outside. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("math/data.js"),ctx);vm.runInNewContext(read("math/metro.js"),ctx);
const H=ctx.window.HUB,{LINES,STATIONS}=H.metro;
assert.equal(typeof H.home,"function");
const on=id=>LINES.filter(L=>L.stops.includes(id));
for(const u of H.units){assert.ok(STATIONS[u.id],`unit ${u.id} is a station`);assert.ok(on(u.id).length>=1,`${u.id} is on a line`);}
for(const id of Object.keys(STATIONS)) assert.ok(H.units.some(u=>u.id===id),`station ${id} is a real unit`);
for(const id of ["fdp","lin","area"]) assert.equal(on(id).length,2,`${id} is an interchange on two lines`);
// stations sit on their line's path, and every segment is horizontal, vertical or 45 degrees
for(const L of LINES){
  const pts=[];let x=0,y=0;
  for(const m of L.path.matchAll(/([MLHV])\s*([\d.]+)(?:[ ,]([\d.]+))?/g)){const a=+m[2],b=+m[3];
    if(m[1]==="H")x=a;else if(m[1]==="V")y=a;else{x=a;y=b;}pts.push([x,y]);}
  for(let i=1;i<pts.length;i++){const dx=Math.abs(pts[i][0]-pts[i-1][0]),dy=Math.abs(pts[i][1]-pts[i-1][1]);
    assert.ok(dx===0||dy===0||dx===dy,`${L.id}: segment ${i} is flat, straight up or 45 degrees`);}
  for(const id of L.stops){const S=STATIONS[id];
    const hit=pts.slice(1).some((q,i)=>{const p=pts[i],cross=(q[0]-p[0])*(S.y-p[1])-(q[1]-p[1])*(S.x-p[0]);
      return cross===0&&S.x>=Math.min(p[0],q[0])&&S.x<=Math.max(p[0],q[0])&&S.y>=Math.min(p[1],q[1])&&S.y<=Math.max(p[1],q[1]);});
    assert.ok(hit,`${id} sits on the ${L.id} line`);}
}
// units stay in NAP order along each line
for(const L of LINES){const n=Array.from(L.stops,id=>+H.units.find(u=>u.id===id).n);assert.deepEqual([...n].sort((a,b)=>a-b),n,L.id+" stops are in unit order");}
for(const f of ["math/metro.js","math/math.css"]) assert.ok(!/https?:\/\/|@import/.test(read(f)),f+" loads nothing from outside");
const html=read("math/index.html");
assert.ok(html.indexOf("metro.js")<html.indexOf("hub.js")&&html.indexOf("math.css")>html.indexOf("site.css"));
console.log(`Math metro: ${Object.keys(STATIONS).length} stations on ${LINES.length} lines, 3 interchanges.`);
