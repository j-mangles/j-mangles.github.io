"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8"),c={window:{}};
vm.runInNewContext(read("social-studies/middle-ages-lessons.js"),c);
const lessons=c.window.MiddleAgesLessons;assert.equal(lessons.length,13);
assert.deepEqual(Array.from(lessons,x=>x.id),Array.from({length:13},(_,i)=>"l"+(i+1)));
for(const l of lessons)assert.ok(l.title&&l.big&&l.notes.length>=4&&l.work,l.id);
const expected={l2:"middle-ages-byzantium-sources.html",l4:"medieval-knowledge-routes.html#baghdad",l5:"middle-ages-viking-evidence.html",l6:"middle-ages-manor-model.html",l9:"middle-ages-crusade-sources.html",l11:"middle-ages-magna-carta-lab.html",l12:"medieval-knowledge-routes.html#silk-road",l13:"middle-ages-black-death-web.html"};
for(const [id,href] of Object.entries(expected)){const l=lessons.find(x=>x.id===id);assert.ok(l.activity&&l.activity.href===href,id);if(!href.includes("#"))assert.ok(fs.existsSync(path.join(root,"social-studies",href)),href);}
assert.match(read("social-studies/index.html"),/middle-ages-lessons\.js\?v=20261102a/);
for(const href of Object.values(expected).filter(x=>!x.includes("#"))){const page=read("social-studies/"+href);assert.match(page,/aria-live/);assert.match(page,/Clear my work/);assert.ok(!/localStorage|sessionStorage|fetch\(/.test(page),href+" must be page-only");const start=page.indexOf("<script>")+8,end=page.indexOf("</script>",start);assert.ok(start>=8&&end>start,href);new Function(page.slice(start,end));}
console.log("Middle Ages PASS: 13 lessons, eight lesson investigations, clear controls, accessible feedback and page-only work.");
