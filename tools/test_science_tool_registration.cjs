/* Science lesson tools with shared keys must load in order and compose. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),index=fs.readFileSync(path.join(root,"science/index.html"),"utf8");
const scripts=[...index.matchAll(/<script src="([^"]+)"/g)].map(match=>path.basename(match[1].split("?")[0]));
const hubIndex=scripts.indexOf("hub.js");
const groups={
 "cells/systems":["homeostasis.js","system-interactions.js","digestion-pathway.js","organ-inspector.js"],
 "cells/circulatory":["models.js","system-interactions.js","exercise-response-lab.js"],
 "cells/transport":["tools.js","osmosis-cell-response.js"],
 "matter/density":["matter-visuals.js","buoyancy-investigation.js","mass-volume-investigation.js"],
 "matter/lab":["matter-visuals.js","density-lab-companion.js"],
 "matter/viscosity":["matter-visuals.js","viscosity-race.js"],
 "matter/water":["matter-visuals.js","lake-density-lab.js"]
};
const source=file=>fs.readFileSync(path.join(root,"science",file),"utf8");
for(const [key,modules] of Object.entries(groups)){
 let last=-1;
 for(const file of modules){
  const at=scripts.indexOf(file);
  assert.ok(at>last,key+": "+file+" must load after the prior tool");
  assert.ok(at>=0&&at<hubIndex,key+": "+file+" must register before the lesson hub");
  last=at;
 }
 const composedModules=key==="cells/systems"?modules:modules.slice(1);
 for(const file of composedModules){
  const code=source(file);
  if(file==="system-interactions.js"){
   assert.match(code,/const previous=H\.lessonTools&&H\.lessonTools\[key\]/,key+": shared extension must capture its predecessor");
   assert.ok(code.includes('extend("'+key+'"'),key+": shared extension must register this lesson");
   assert.match(code,/if\(old\)\{[^}]*previous\(old\)/s,key+": shared extension must invoke its predecessor");
   continue;
  }
  if(file==="exercise-response-lab.js"){
   assert.ok(code.includes('const key="'+key+'"'),key+": dynamic extension must name its lesson key");
   assert.match(code,/previous=H\.lessonTools&&H\.lessonTools\[key\]/,key+": dynamic extension must capture its predecessor");
   assert.match(code,/if\(previous\)\{[^}]*previous\(old\)/s,key+": dynamic extension must invoke its predecessor");
   continue;
  }
  const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const capture=new RegExp("(?:const|let|var)\\s+(\\w+)\\s*=\\s*H\\.lessonTools\\s*\\[\\s*['\\\"]"+escaped+"['\\\"]\\s*\\]");
  const match=code.match(capture);
  assert.ok(match,key+": "+file+" must preserve an existing registration for "+key);
  const name=match[1];
  const invoke=new RegExp("if\\s*\\(\\s*"+name+"\\s*\\)\\s*\\{?[\\s\\S]{0,2000}?\\b"+name+"\\s*\\(");
  assert.match(code,invoke,key+": "+file+" must mount the tool it wraps");
 }
}
console.log("Science lesson registration passed: seven shared keys preserve their tool chains and script order.");
