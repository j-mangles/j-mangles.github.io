/* Validate atlas inline JavaScript and published Early Humans lesson structure without loading D3. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const html=fs.readFileSync(path.resolve(__dirname,"..","social-studies","index.html"),"utf8");
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
assert.ok(scripts.length,"No inline atlas scripts found");
scripts.forEach((code,i)=>assert.doesNotThrow(()=>new vm.Script(code,{filename:"atlas-inline-"+i+".js"})));
const content=scripts.find(s=>s.includes("const UNITS ="));
assert.ok(content,"Atlas course data not found");
assert.match(content,/id:"early-humans"/);
for(const id of ["l1","l2","l3"])assert.match(content,new RegExp('id:"'+id+'", n:"[123]"'));
assert.match(content,/How Do We Know What Happened\?/);
assert.match(content,/Could You Survive 12,000 Years Ago\?/);
assert.match(content,/FICTIONAL/);
assert.match(content,/Kestrel Valley Decision Log/);
assert.match(content,/id:"mesopotamia"/);
console.log("Atlas inline scripts and Early Humans lesson structure validated.");