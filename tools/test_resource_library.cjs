/* Validate published-only resource library for all four lesson-hub subjects. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const library=read("assets/resource-library.js"),map=read("assets/course-map.js");
const lessonTools={
 math:["fdp/l05","fdp/l06","fdp/l09","fdp/l19","prob/p2"],
 science:["cells/levels","cells/systems","cells/transport","cells/metabolism","cells/circulatory"],
 ela:["answering/day2"],
 "critical-thinking":["lab/l4"]
};
const validImages=/^img\/[a-zA-Z0-9/_ .-]+\.(?:png|jpe?g|webp|gif|svg)$/i;
for(const subject of ["math","science","ela","critical-thinking"]){
 const Hctx={window:{}};
 vm.runInNewContext(read(subject+"/data.js"),Hctx,{filename:subject+"/data.js"});
 vm.runInNewContext(map,Hctx);
 vm.runInNewContext(library,Hctx);
 const H=Hctx.window.HUB;
 const registered=[...read(subject+"/tools.js").matchAll(/window\.HUB\.tools\.(\w+)\s*=/g)].map(x=>x[1]);
 H.tools=Object.fromEntries(registered.map(x=>[x,()=>{}]));
 H.lessonTools=Object.fromEntries(lessonTools[subject].map(x=>[x,()=>{}]));
 const items=Hctx.window.StudentResources.collect(H);
 assert.ok(items.length>10,subject+" has too few resource links");
 const types=new Set(items.map(x=>x.type));
 assert.ok(types.has("notes")&&types.has("practice")&&types.has("task"),subject+" missing resource categories");
 for(const item of items){
  assert.ok(H.units.some(u=>u.id===item.unitId),subject+" has invalid unit "+item.unitId);
  const u=H.units.find(x=>x.id===item.unitId);
  if(item.lessonId)assert.ok(u.lessons.some(l=>l.id===item.lessonId),subject+" invalid lesson "+item.lessonId);
  assert.ok(item.route.startsWith("#"+encodeURIComponent(item.unitId)),subject+" invalid route "+item.route);
  assert.ok(!item.route.includes("?")&&!item.route.includes("//"),"External URL in library route");
  if(item.image){assert.ok(validImages.test(item.image)&&!item.image.includes(".."),"Unsafe image "+item.image);}
 }
 assert.ok(registered.every(unitId=>items.some(it=>it.route==="#"+unitId&&it.type==="practice")),subject+" missing unit tools");
 const html=Hctx.window.StudentResources.createMarkup(H);
 assert.ok(html.includes('id="resource-search"')&&html.includes('id="resource-unit"')&&html.includes('id="resource-type"'));
 assert.ok(html.includes("Google Drive files are not downloadable here"),"Missing safe-sharing statement");
 assert.ok(!html.includes('href="https://drive.google.com'),"Unapproved Drive URL on page");
 const page=read(subject+"/index.html"),scripts=[...page.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
 assert.ok(page.includes('id="course-resources-link"'),subject+" no visible navigation");
 assert.ok(scripts.includes("../assets/resource-library.js")&&scripts.indexOf("../assets/resource-library.js")<scripts.indexOf("../assets/hub.js"),"Wrong resource script load order");
 console.log("PASS "+subject+": "+items.length+" published resources across "+H.units.length+" units");
}
const ctx={window:{}};
vm.runInNewContext(library,ctx);
const injected={subject:"sci",units:[{id:"safe",n:"1",name:"Visible Unit",lessons:[{
 id:"test",title:'<img src=x onerror=alert(1)>',big:'<script>alert("x")</script>',
 imgs:[{src:"https://private.example/test.png",cap:"Secret"},{src:"img/../private.jpg",cap:"Escaped"},{src:"img/public.png",cap:"Real"}],
 work:"Student-facing directions"}]}]};
const poisoned=ctx.window.StudentResources.createMarkup(injected);
assert.ok(!poisoned.includes('<script>alert')&&!poisoned.includes('<img src=x'));
assert.ok(!poisoned.includes('https://private.example')&&!poisoned.includes("img/../private.jpg"));
assert.ok(poisoned.includes('src="img/public.png"'));
assert.ok(!poisoned.includes('teacherMaterials'));
const hub=read("assets/hub.js");
assert.ok(hub.includes('h==="resources"')&&hub.includes('window.StudentResources.render($("#main"),H)'),"Resource view route is missing");
const home=read("index.html");
for(const subject of ["math","science","ela","critical-thinking"])
 assert.ok(home.includes('href="'+subject+'/#resources"'),"Homepage missing "+subject+" resource link");
console.log("Resource library navigation, safe image paths and all category links validated.");
