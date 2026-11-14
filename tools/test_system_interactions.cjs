/* Regression checks for the Cells & Systems interactive body and oxygen lab. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const src=fs.readFileSync(path.join(root,"science","system-interactions.js"),"utf8");
const systems=["respiratory","circulatory","digestive","nervous","integumentary"];
function element(){
 const selectors=new Map(),listeners={},children=[];
 function control(){const classes=new Set();return {textContent:"",innerHTML:"",value:"",style:{},disabled:false,classList:{toggle(k,on){if(on===false)classes.delete(k);else classes.add(k);},contains(k){return classes.has(k);}},addEventListener(){},setAttribute(){}};}
 return {innerHTML:"",children,listeners,appendChild(child){children.push(child);},contains(){return true;},addEventListener(k,fn){listeners[k]=fn;},
 querySelector(k){if(!selectors.has(k))selectors.set(k,control());return selectors.get(k);},
 querySelectorAll(k){return k==="[data-organ]"?systems.map(organ=>({dataset:{organ},classList:{toggle(){}}})):[];}};
}
const H={lessonTools:{
 "cells/systems":el=>{el.innerHTML="Existing homeostasis lab";},
 "cells/circulatory":el=>{el.innerHTML="Existing blood-flow lab";}
}};
const scope={window:{HUB:H},document:{createElement:element},console};
vm.runInNewContext(src,scope,{filename:"science/system-interactions.js",timeout:3000});
assert.equal(Object.keys(H.systemInteractions.systems).length,5);
assert.equal(H.systemInteractions.questions.length,4);
const model=H.systemInteractions.oxygenModel;
const at=(b,c,a)=>model({breathing:b,circulation:c,activity:a});
assert.equal(at(60,60,30).delivered,72);
assert.equal(at(0,100,100).limit,"respiratory");
assert.equal(at(100,0,100).limit,"circulatory");
assert.equal(at(100,100,100).enough,true);
assert.equal(at(0,100,100).enough,false);
assert.throws(()=>at(110,50,50));
const human=element();
H.lessonTools["cells/systems"](human);
assert.equal(human.children.length,2);
assert.match(human.children[1].innerHTML,/Existing homeostasis lab/);
const explorer=human.children[0];
const quizBtn=(dataset,css)=>({dataset,classList:{contains:k=>css===k},setAttribute(){}});
assert.match(explorer.innerHTML,/Human Systems Explorer/);
assert.match(explorer.innerHTML,/Respiratory system/);
assert.match(explorer.innerHTML,/Circulatory system and blood pathway/);
assert.match(explorer.innerHTML,/Digestive system/);
assert.match(explorer.innerHTML,/Human body systems overview \(updated 2024\)/i);
assert.equal((explorer.innerHTML.match(/Watch on YouTube/g)||[]).length,4);
assert.match(explorer.innerHTML,/rel="noopener noreferrer"/);
assert.match(explorer.querySelector(".tabs").innerHTML,/Nervous/);
explorer.systemsExplorer.select("digestive");
assert.equal(explorer.systemsExplorer.current,"digestive");
assert.match(explorer.querySelector(".steps").innerHTML,/Small intestine/);
assert.match(explorer.innerHTML,/data-structure="blood"/);
assert.match(explorer.innerHTML,/Oxygen-rich blood/);
explorer.systemsExplorer.select("digestive","small-intestine");
assert.equal(explorer.systemsExplorer.structure,"small-intestine");
assert.match(explorer.querySelector(".detail").innerHTML,/Most nutrient absorption/);
assert.match(explorer.querySelector(".structures").innerHTML,/Small intestine/);
const mapButton=quizBtn({organ:"nervous",structure:"neuron"},"");
explorer.listeners.click({target:{closest:()=>mapButton}});
assert.equal(explorer.systemsExplorer.current,"nervous");
assert.equal(explorer.systemsExplorer.structure,"neuron");
const pathToggle=quizBtn({},"connection-toggle"),connectionLayer=explorer.querySelector("#body-connections");
explorer.listeners.click({target:{closest:()=>pathToggle}});
assert.equal(connectionLayer.classList.contains("hidden"),true);
explorer.listeners.click({target:{closest:()=>quizBtn({answer:"1"},"")}});
assert.match(explorer.querySelector(".feedback").textContent,/Correct/);
explorer.listeners.click({target:{closest:()=>quizBtn({},"next")}});
assert.match(explorer.querySelector(".question").innerHTML,/2 \/ 4/);
const circulation=element();
H.lessonTools["cells/circulatory"](circulation);
assert.equal(circulation.children.length,2);
assert.match(circulation.children[0].innerHTML,/Existing blood-flow lab/);
const lab=circulation.children[1];
assert.match(lab.innerHTML,/Oxygen Delivery Lab/);
assert.equal(lab.querySelector("#od-delivered").textContent,"72");
lab.oxygenStudio.set({breathing:0,circulation:100,activity:100});
assert.equal(lab.querySelector("#od-delivered").textContent,"30");
lab.querySelector("#od-record").onclick();
assert.equal(lab.oxygenStudio.trials.length,1);
assert.equal(lab.oxygenStudio.trials[0].limit,"respiratory");
lab.querySelector("#od-reset").onclick();
assert.equal(lab.oxygenStudio.values.breathing,60);
lab.querySelector("#od-clear").onclick();
assert.equal(lab.oxygenStudio.trials.length,0);
const index=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
const atScript=name=>index.indexOf('src="'+name);
assert.ok(atScript("system-interactions.js")>atScript("homeostasis.js"));
assert.ok(atScript("system-interactions.js")>atScript("models.js"));
assert.ok(atScript("system-interactions.js")<atScript("../assets/hub.js"));
console.log("Science human-body systems + oxygen delivery passed: model, selections, quiz, trials, legacy tools, integration.");
