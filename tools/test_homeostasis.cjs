(function testHomeostasis(){
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),code=fs.readFileSync(path.join(root,"science","homeostasis.js"),"utf8");
const scope={window:{HUB:{subject:"sci",lessonTools:{}}},console};
vm.runInNewContext(code,scope,{filename:"science/homeostasis.js",timeout:2000});
const H=scope.window.HUB;
assert.equal(typeof H.thermoModel.simulateStep,"function");
assert.equal(typeof H.lessonTools["cells/systems"],"function");
const step=H.thermoModel.simulateStep;
const evolve=(air,active,reg,minutes)=>{let t=37;for(let i=0;i<minutes;i++)t=step(t,air,active,reg).temperature;return t;};
assert.equal(evolve(22,false,true,20),37,"comfortable condition should remain near the set point");
assert.ok(step(38,22,false,true).regulation<0,"too warm should cause correction toward set point");
assert.ok(step(36,22,false,true).regulation>0,"too cold should cause correction toward set point");
assert.ok(Math.abs(evolve(8,false,true,20)-37)<Math.abs(evolve(8,false,false,20)-37),"negative feedback must resist cold");
assert.ok(Math.abs(evolve(35,false,true,20)-37)<Math.abs(evolve(35,false,false,20)-37),"negative feedback must resist heat");
assert.ok(step(37,35,true,false).temperature>step(37,35,false,false).temperature,"physical activity should increase initial model heat load");
const index=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
assert.match(index,/<script src="homeostasis\.js"><\/script>/);
assert.ok(index.indexOf('src="homeostasis.js"')<index.indexOf('src="../assets/hub.js"'),"tool must register before lesson hub mounts");
const selectors=["#hx-env [data-env]","#hx-activity [data-active]","#hx-feedback [data-regulated]","#hx-pred [data-predict]"];
const fake=(dataset={})=>({dataset,value:"",disabled:false,textContent:"",innerHTML:"",attrs:{},setAttribute(k,v){this.attrs[k]=v;}});
const groups={
 [selectors[0]]:[8,22,35].map(v=>fake({env:String(v)})),
 [selectors[1]]:[false,true].map(v=>fake({active:String(v)})),
 [selectors[2]]:[true,false].map(v=>fake({regulated:String(v)})),
 [selectors[3]]:["rise","fall","steady"].map(v=>fake({predict:v}))
};
const elems=new Map(),el={innerHTML:"",querySelector(q){if(!elems.has(q))elems.set(q,fake());return elems.get(q);},querySelectorAll(q){assert.ok(groups[q],"Unexpected selector "+q);return groups[q];}};
H.lessonTools["cells/systems"](el);
const get=q=>el.querySelector(q);
assert.match(el.innerHTML,/Homeostasis Lab/);
assert.match(get("#hx-plot").innerHTML,/<svg/);
groups[selectors[0]][2].onclick();
groups[selectors[3]][0].onclick();
get("#hx-ten").onclick();
assert.equal(get("#hx-time").textContent,"Minute 10");
assert.match(get("#hx-hypothesis").textContent,/supported/);
const withFeedback=parseFloat(get("#hx-temp").textContent);
groups[selectors[2]][1].onclick();
assert.equal(get("#hx-time").textContent,"Minute 0","changing feedback resets trial");
get("#hx-ten").onclick();
assert.ok(parseFloat(get("#hx-temp").textContent)>withFeedback);
get("#hx-reset").onclick();
assert.equal(get("#hx-time").textContent,"Minute 0");
assert.ok(groups[selectors[3]].every(b=>!b.disabled));
console.log("Homeostasis Lab passed: model, graph, controls, hypothesis, comparison, reset and integration.");
})();
