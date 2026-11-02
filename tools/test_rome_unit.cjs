"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const c={window:{}};vm.runInNewContext(read("social-studies/rome-lessons.js"),c);
const lessons=c.window.RomeLessons;assert.equal(lessons.length,13);
assert.deepEqual(Array.from(lessons,x=>x.id),Array.from({length:13},(_,i)=>"l"+(i+1)));
for(const l of lessons){assert.ok(l.title&&l.big&&l.notes.length>=4&&l.work&&l.check.length>=1,l.id);}
const expected={l1:"rome-evidence-desk.html",l2:"rome-republic-power-map.html",l5:"rome-punic-wars-maproom.html",l9:"rome-water-network.html",l12:"rome-crash-model.html",l3:"rome-social-status.html",l7:"rome-caesar-crisis.html",l8:"rome-augustus-image.html",l10:"rome-slavery-source-lab.html",l13:"rome-legacy-audit.html"};
for(const [id,file] of Object.entries(expected)){const l=lessons.find(x=>x.id===id);assert.ok(l.activity&&l.activity.href===file,id);assert.ok(fs.existsSync(path.join(root,"social-studies",file)),file);}
const html=read("social-studies/index.html");assert.match(html,/rome-lessons\.js\?v=20261102a/);
for(const file of Object.values(expected).slice(1)){const page=read("social-studies/"+file);assert.match(page,/aria-live/);assert.match(page,/Clear my work/);assert.ok(!/localStorage|sessionStorage|fetch\(/.test(page),file+" must remain page-only");const start=page.indexOf("<script>")+8,end=page.indexOf("</script>",start);assert.ok(start>=8&&end>start,file+" needs interaction code");new Function(page.slice(start,end));}
console.log("Ancient Rome PASS: 13 lessons, nine new lesson investigations, page-only responses and inline scripts parse.");
