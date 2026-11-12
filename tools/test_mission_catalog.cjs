/* Verify Mission Control's generated list matches exactly the released course lessons.
   This catches stale catalogs and prevents exposing soon/next units to students. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const dirs={math:"math",sci:"science",ela:"ela",ct:"critical-thinking"};
const expected=[];
for(const [key,dir]of Object.entries(dirs)){
 const window={};
 vm.runInNewContext(read(dir+"/data.js"),{window},{timeout:5000,filename:dir+"/data.js"});
 const hub=window.HUB;
 assert.equal(hub.subject,key);
 for(const unit of hub.units){
  const released=["now","done","ongoing"].includes(unit.status);
  for(const lesson of unit.lessons||[]){
   if(!released)continue;
   expected.push({
    id:"released-"+key+"-"+unit.id+"-"+lesson.id,
    subject:key,kind:"Course lesson",title:lesson.title,
    href:"../"+dir+"/#"+unit.id+"/"+lesson.id,
    description:unit.name
   });
  }
 }
}
const source=read("social-studies/index.html");
const from=source.indexOf("const UNITS = ["),to=source.indexOf("\n];",from);
assert.ok(from>=0&&to>from,"Social Studies unit data must be present");
const stub=new Proxy({},{get(target,key){
 if(!(key in target))target[key]=String(key).endsWith("Lessons")?[]:
  {places:[],rivers:[],labels:[],routes:[],timeline:[],lessons:[],activities:[]};
 return target[key];
}});
const socialUnits=vm.runInNewContext(source.slice(from,to+3)+";UNITS",{window:stub},{timeout:3000});
for(const unit of socialUnits.filter(x=>["done","now","ongoing"].includes(x.status))){
 for(const lesson of (unit.lessons||[]).filter(x=>x.released)){
  expected.push({
   id:"released-ss-"+unit.id+"-"+lesson.id,subject:"ss",kind:"Course lesson",
   title:lesson.title,href:"../social-studies/#"+unit.id+"-"+lesson.id,description:unit.name
  });
 }
}
const generated={};
vm.runInNewContext(read("today/released-lessons.js"),{window:generated},{timeout:2500,filename:"released-lessons.js"});
const actual=JSON.parse(JSON.stringify(generated.MissionReleasedLessons));
assert.deepEqual(actual,expected,"Generated lesson catalog must match the current released units");
assert.equal(expected.length,76);
const ids=new Set(actual.map(x=>x.id));
assert.equal(ids.size,actual.length);
for(const item of actual)assert.ok(!/soon|future|next/i.test(item.id));
assert.ok(!actual.some(x=>x.href==="../math/#fracops"),"Future Math units remain off the board");
console.log("Mission curriculum catalog matches all "+actual.length+" released course lessons, excluding future units.");