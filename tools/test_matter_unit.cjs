// Science Unit 2 follows the Sci8_MDF student booklet topics, with a picture on lessons 1, 2, 3 and 7.
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
const read=f=>fs.readFileSync(path.join(__dirname,"..",f),"utf8");
const ctx={window:{}};vm.runInNewContext(read("science/data.js"),ctx);
const u=ctx.window.HUB.units.find(x=>x.id==="matter");
assert.ok(u,"matter unit");
assert.equal(JSON.stringify(u.lessons.map(l=>l.id)),JSON.stringify(["states","density","lab","viscosity","temperature","pressure","phase","water"]));
u.lessons.forEach(l=>{assert.ok(l.big&&l.notes.length>=4&&l.work,l.id);l.check.forEach(q=>assert.ok(q.c>=0&&q.c<q.a.length,l.id+" answer"));});
assert.ok(/Topic 1, Particles and Density/.test(u.after));
const vctx={window:{HUB:{}}};vm.runInNewContext(read("science/matter-visuals.js"),vctx);
["states","density","lab","phase"].forEach(id=>assert.equal(typeof vctx.window.HUB.lessonTools["matter/"+id],"function",id));
const html=read("science/index.html");assert.ok(html.indexOf("matter-visuals.js")>html.indexOf("data.js")&&html.indexOf("matter-visuals.js")<html.indexOf("assets/hub.js"));
console.log("Matter unit: 8 lessons in booklet order, 4 visuals registered.");
