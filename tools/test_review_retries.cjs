/* Unit review focused retry regression: wrong answers, shrinking rounds, reset. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const src=fs.readFileSync(path.join(__dirname,"../assets/review.js"),"utf8");
const document={head:{appendChild(){}},createElement(){return {textContent:""};}};
const window={};
vm.runInNewContext(src,{window,document,Math},{filename:"assets/review.js",timeout:3000});
assert.equal(typeof window.UnitReview.render,"function");
const el={
 innerHTML:"",
 querySelector(q){
  if(!q.startsWith("#"))return null;
  const id=q.slice(1);
  if(!this.innerHTML.includes('id="'+id+'"'))return null;
  const node={onclick:null};this._nodes[id]=node;return node;
 },
 querySelectorAll(q){
  if(q==="[data-tab]")return ["ideas","cards","test"].map(tab=>({dataset:{tab},onclick:null}));
  if(q===".rv-open")return [];
  if(q===".rv [data-o]"){
   const opts=[...this.innerHTML.matchAll(/data-o="(\d+)"/g)].map(m=>Number(m[1]));
   return opts.map(o=>({dataset:{o:String(o)},onclick:null}));
  }
  throw Error("Unexpected selector "+q);
 },
 _nodes:{}
};
const unit={name:"Test unit",lessons:[
 {id:"a",n:"1",title:"First",big:"First idea",check:[
  {q:"One?",a:["Yes","No"],c:0,why:"Yes."},
  {q:"Two?",a:["Yes","No"],c:0,why:"Yes."}
 ]},
 {id:"b",n:"2",title:"Second",big:"Second idea",check:[
  {q:"Three?",a:["Yes","No"],c:0,why:"Yes."}
 ]}
]};
window.UnitReview.render(el,unit);
function tab(){const nodes=el.querySelectorAll("[data-tab]");nodes[2].onclick();} 
// The test re-creates nodes during every draw; call the latest handler by parsing the current HTML.
function choose(o){
 assert.ok(el._answerButtons.length>=2);
 el._answerButtons.find(b=>Number(b.dataset.o)===o).onclick();
}
const originalAll=el.querySelectorAll.bind(el);
el.querySelectorAll=function(q){const x=originalAll(q);if(q==="[data-tab]")this._tabs=x;if(q===".rv [data-o]")this._answerButtons=x;return x;};
window.UnitReview.render(el,unit);
el._tabs.find(b=>b.dataset.tab==="test").onclick();
assert.match(el.innerHTML,/Question 1 of 3/);
choose(1);el._nodes["rv-nq"].onclick();
assert.match(el.innerHTML,/Question 2 of 3/);
choose(0);el._nodes["rv-nq"].onclick();
assert.match(el.innerHTML,/Question 3 of 3/);
choose(0);el._nodes["rv-nq"].onclick();
assert.match(el.innerHTML,/2<\/span> \/ 3/);
assert.match(el.innerHTML,/Practice missed questions \(1\)/);
el._nodes["rv-missed"].onclick();
assert.match(el.innerHTML,/Question 1 of 1/);
choose(0);el._nodes["rv-nq"].onclick();
assert.match(el.innerHTML,/1<\/span> \/ 1/);
assert.doesNotMatch(el.innerHTML,/id="rv-missed"/);
el._nodes["rv-again"].onclick();
assert.match(el.innerHTML,/Question 1 of 3/);
console.log("Unit review focused retries passed.");
