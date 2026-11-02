/* Grade 7 Math: the review lesson embeds the Divisibility Detective. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const data={window:{}};vm.runInNewContext(read("math/data.js"),data,{filename:"math/data.js"});
const unit=data.window.HUB.units.find(u=>u.id==="div");
assert.ok(unit&&unit.status==="soon","Keep Divisibility staged until it is taught");
const lesson=unit.lessons.find(l=>l.id==="d4");
assert.ok(lesson&&lesson.title.includes("Review"));
assert.ok(lesson.work.includes("in this lesson"));
const context={window:{HUB:{subject:"math",tools:{}}}};
vm.runInNewContext(read("math/divisibility-lab.js"),context,{filename:"math/divisibility-lab.js"});
assert.equal(typeof context.window.HUB.tools.div,"function");
assert.equal(context.window.HUB.lessonTools["div/d4"],context.window.HUB.tools.div);
const html=read("math/index.html"),scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split("?")[0]);
assert.ok(scripts.includes("divisibility-lab.js"));
assert.ok(scripts.indexOf("divisibility-lab.js")<scripts.indexOf("../assets/hub.js"));
console.log("Divisibility Detective is linked inside the staged review lesson.");
