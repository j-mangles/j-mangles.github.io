(function testWriterStudio(){
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),js=fs.readFileSync(path.join(root,"ela","writer-studio.js"),"utf8");
const copied=[],clicked=[];
const doc={body:{appendChild(){}},createElement(){return {click(){clicked.push(true);},remove(){}};}};
const scope={window:{HUB:{subject:"ela",lessonTools:{}},confirm:()=>true},document:doc,
 navigator:{clipboard:{writeText(t){copied.push(t);return Promise.resolve();}}},
 Blob,URL:{createObjectURL(){return "blob:test";},revokeObjectURL(){}},setTimeout(){}};
vm.runInNewContext(js,scope,{filename:"ela/writer-studio.js",timeout:2000});
const model=scope.window.HUB.lessonTools["answering/day2"];
assert.equal(typeof model,"function","Expected registration on Answer, Evidence, Explain lesson");
const index=fs.readFileSync(path.join(root,"ela","index.html"),"utf8");
assert.match(index,/<script src="writer-studio\.js"><\/script>/);
assert.ok(index.indexOf('src="writer-studio.js"')<index.indexOf('src="../assets/hub.js"'));
const mk=(dataset={})=>({dataset,value:"",checked:false,attributes:{},listeners:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,cb){this.listeners[k]=cb;},focus(){}});
const nodes=new Map(),groups={
 "[data-check]":Array.from({length:4},()=>mk()),
 "[data-quote]":Array.from({length:6},(_,i)=>mk({quote:String(i)}))
};
const el={innerHTML:"",querySelector(q){if(!nodes.has(q))nodes.set(q,mk());return nodes.get(q);},querySelectorAll(q){assert.ok(groups[q],"Unexpected selector: "+q);return groups[q];}};
model(el);
const get=q=>el.querySelector(q);
assert.match(el.innerHTML,/New Room/);
assert.match(el.innerHTML,/Maya stood outside room 108/);
get("#ws-answer").value="Maya does not want attention.";get("#ws-answer").listeners.input();
groups["[data-quote]"][3].onclick();
assert.match(get("#ws-evidence").value,/third row/);
get("#ws-explain").value="The third-row seat lets her see the board without being noticed.";get("#ws-explain").listeners.input();
assert.match(get("#ws-preview").textContent,/third-row seat/);
get("#ws-q").value="1";get("#ws-q").onchange();
assert.equal(get("#ws-answer").value,"","New prompt should use its own draft");
get("#ws-q").value="0";get("#ws-q").onchange();
assert.match(get("#ws-answer").value,/Maya does not want attention/,"Previous draft should be preserved within current page");
groups["[data-check]"][0].checked=true;
get("#ws-copy").onclick();get("#ws-download").onclick();
assert.equal(copied.length,1,"One clipboard export");
assert.match(copied[0],/Maya does not want attention/);
assert.match(copied[0],/\[x\]/);
assert.equal(clicked.length,1,"One download triggered");
get("#ws-clear").onclick();
assert.equal(get("#ws-answer").value,"","Clear resets current draft");
console.log("Writer's Studio passed: lesson registration, source text, evidence, preview, draft switching, copy/download and reset.");
})();
