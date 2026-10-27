/* Structural checks for Egyptian Temple Walkthrough, Manitoba SS8. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"social-studies/temple-walkthrough.html"),"utf8");
const atlas=fs.readFileSync(path.join(root,"social-studies/index.html"),"utf8");
const lessons=fs.readFileSync(path.join(root,"social-studies/egypt-lessons.js"),"utf8");
assert.match(html,/Model, not reconstruction/);
assert.match(html,/Pylon gateway/);
assert.match(html,/Hypostyle hall/);
assert.match(html,/Sanctuary/);
assert.match(html,/Ordinary resident/);
assert.match(html,/Authorized ritual priest/);
assert.match(html,/aria-pressed=/);
assert.match(html,/role="progressbar"/);
assert.match(html,/role="status"/);
assert.match(atlas,/href="temple-walkthrough.html"/);
assert.match(lessons,/"href": "temple-walkthrough.html"/);
assert.doesNotMatch(html,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|mailto:/);
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1);
new vm.Script(scripts[0][1],{filename:"social-studies/temple-walkthrough.html inline JS"});
const ctx={window:{}};vm.runInNewContext(lessons,ctx,{filename:"egypt-lessons.js"});
assert.equal(ctx.window.EgyptLessons.length,11);
for(const [id,term] of [["l9","Trade"],["l10","Pharaohs"],["l11","Decline"]]){
 const lesson=ctx.window.EgyptLessons.find(x=>x.id===id);
 assert.ok(lesson&&lesson.title.includes(term),"Missing study topic "+id);
 assert.ok(lesson.notes.length>=6&&lesson.check.length===3,"Incomplete study topic "+id);
 for(const q of lesson.check)assert.ok(q.c>=0&&q.c<q.a.length,"Invalid answer index "+id);
}
const l5=ctx.window.EgyptLessons.find(x=>x.id==="l5");
assert.equal(l5.activity.href,"temple-walkthrough.html");
console.log("Temple Walkthrough and Egypt lesson integration checks passed.");