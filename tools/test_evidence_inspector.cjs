"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const code=fs.readFileSync(path.join(root,"critical-thinking","evidence-inspector.js"),"utf8");
const copied=[],downloads=[];
const scope={
 window:{HUB:{subject:"ct",lessonTools:{}},confirm:()=>true},
 document:{body:{appendChild(){}},createElement(){return {click(){downloads.push(1);},remove(){}};}},
 navigator:{clipboard:{writeText(v){copied.push(v);return Promise.resolve();}}},
 Blob,URL:{createObjectURL(){return "blob:local";},revokeObjectURL(){}},setTimeout(){}
};
vm.runInNewContext(code,scope,{timeout:2000});
const H=scope.window.HUB;
assert.equal(typeof H.lessonTools["lab/l4"],"function");
const html=fs.readFileSync(path.join(root,"critical-thinking","index.html"),"utf8");
assert.ok(html.indexOf('src="evidence-inspector.js"')>=0&&html.indexOf('src="evidence-inspector.js"')<html.indexOf('src="../assets/hub.js"'));
const nodes=new Map(),node=()=>({value:"",textContent:"",innerHTML:"",hidden:false,disabled:false});
const el={innerHTML:"",querySelector(q){if(!nodes.has(q)){const x=node();if(q==="#ei-reveal"||q==="#ei-revision")x.hidden=true;nodes.set(q,x);}return nodes.get(q);}};
H.lessonTools["lab/l4"](el);const $=q=>el.querySelector(q);
assert.match(el.innerHTML,/Evidence Inspector/);
assert.match($("#ei-claim").textContent,/cafeteria/);
$("#ei-first").value="3";$("#ei-reason").value="This poll is not necessarily representative.";
$("#ei-first").onchange();
assert.match($("#ei-ladder").innerHTML,/chosen/);
$("#ei-new").onclick();
assert.equal($("#ei-reveal").hidden,false);
assert.match($("#ei-detail").textContent,/food club/);
$("#ei-second").value="2";$("#ei-why").value="The poll reached only one interest group.";
$("#ei-case").value="1";$("#ei-case").onchange();
assert.match($("#ei-claim").textContent,/assembly/);
$("#ei-case").value="0";$("#ei-case").onchange();
assert.equal($("#ei-first").value,"3");
assert.equal($("#ei-reveal").hidden,false);
assert.equal($("#ei-second").value,"2");
assert.match($("#ei-why").value,/interest group/);
$("#ei-copy").onclick();$("#ei-download").onclick();
assert.equal(copied.length,1);
assert.match(copied[0],/initial/i);
assert.equal(downloads.length,1);
$("#ei-reset").onclick();assert.equal($("#ei-first").value,"");
assert.equal($("#ei-reveal").hidden,true);
console.log("Evidence Inspector passed: registration, ranking, reveal, revision, switching, export and reset.");