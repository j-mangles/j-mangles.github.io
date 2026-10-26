/* Student-facing navigation regression tests: course map uses actual live unit data. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const mapScript=read("assets/course-map.js");
for(const subject of ["math","science","ela","critical-thinking"]){
 const html=read(subject+"/index.html"),src=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]);
 assert.ok(html.includes('id="course-map-link"'),subject+" missing course-map navigation");
 assert.ok(src.includes("../assets/course-map.js"),subject+" missing map script");
 assert.ok(src.indexOf("../assets/course-map.js")<src.indexOf("../assets/hub.js"),"map must load before hub");
 assert.equal(new Set(src).size,src.length,"Duplicate scripts in "+subject);
 const ctx={window:{}};
 vm.runInNewContext(read(subject+"/data.js"),ctx,{filename:subject+"/data.js"});
 vm.runInNewContext(mapScript,ctx,{filename:"assets/course-map.js"});
 const H=ctx.window.HUB;
 assert.ok(H&&Array.isArray(H.units)&&H.units.length>0,subject+" has no units");
 const models={
  math:["fdp/l05","fdp/l06","fdp/l09","fdp/l19","prob/p2"],
  science:["cells/levels","cells/systems"],
  ela:["answering/day2"],
  "critical-thinking":["lab/l4"]
 };
 H.lessonTools=Object.fromEntries(models[subject].map(x=>[x,()=>{}]));
 for(const route of models[subject]){
  const [uid,lid]=route.split("/");
  assert.ok(H.units.some(u=>u.id===uid&&(u.lessons||[]).some(l=>l.id===lid)),subject+" model route is invalid: "+route);
 }
 const markup=ctx.window.CourseAtlas.createMarkup(H);
 assert.ok(markup.includes('id="atlas-unit-grid"')&&markup.includes('id="atlas-tools"'));
 assert.equal((markup.match(/class="atlas-unit" /g)||[]).length,H.units.length,"unit count mismatch");
 for(const u of H.units)assert.ok(markup.includes('href="#'+encodeURIComponent(u.id)+'"'),"Missing unit "+u.id);
 for(const route of models[subject])assert.ok(markup.includes('href="#'+route+'"'),"Missing model "+route);
 const poisoned={subject:"math",units:[{id:"x",n:"1",name:'<script>alert("X")</script>',intro:"<img src=x onerror=alert(1)>",status:"now",lessons:[]}]};
 const safe=ctx.window.CourseAtlas.createMarkup(poisoned);
 assert.ok(!safe.includes("<script>")&&!safe.includes("<img src=x"),"Unsafe subject data reached HTML");
 console.log("PASS "+subject+": "+H.units.length+" units and "+models[subject].length+" tool links");
}
const home=read("index.html");
for(const route of ["math/#overview","science/#overview","ela/#overview","critical-thinking/#overview","social-studies/"])assert.ok(home.includes('href="'+route+'"'),"Home subject link missing "+route);
for(const route of ["math/#fdp/l05","math/#fdp/l19","math/#prob/p2","science/#cells/levels","science/#cells/systems","ela/#answering/day2","critical-thinking/#lab/l4"])
 assert.ok(home.includes('href="'+route+'"'),"Home quick launch missing "+route);
const hub=read("assets/hub.js");
assert.ok(hub.includes('window.CourseAtlas.render($("#main"),H)')&&hub.includes('h==="overview"'),"Course-map route integration missing");
console.log("Course atlas navigation and deep-link validations passed.");
