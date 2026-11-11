/* All seven newly added Grade 8 science interactives: deterministic model + DOM smoke tests. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const names=["digestion-pathway","cell-division-studio","viscosity-race","lake-density-lab","refraction-ray-lab","seafloor-lab","earthquake-lab"];
const keys=["cells/systems","cells/reproduction","matter/viscosity","matter/water","light/u3t2-refraction","earth/e6-seafloor","earth/e11-quakes"];
const H={lessonTools:{}};
keys.forEach(key=>{H.lessonTools[key]=el=>{el.innerHTML="Existing lesson tool: "+key;};});
function mockElement(){
 const elements=new Map(),children=[],listeners={};
 const control=()=>({innerHTML:"",textContent:"",value:"",style:{},disabled:false,dataset:{},classList:{toggle(){}},setAttribute(){},addEventListener(){}});
 return {innerHTML:"",textContent:"",value:"",style:{},disabled:false,dataset:{},classList:{toggle(){}},
  children,listeners,contains(){return true},appendChild(x){children.push(x);},addEventListener(k,fn){listeners[k]=fn;},
  querySelector(k){if(!elements.has(k))elements.set(k,control());return elements.get(k);},
  querySelectorAll(){return [];}};
}
const scope={window:{HUB:H},document:{createElement:mockElement},console};
names.forEach(name=>{
 const code=fs.readFileSync(path.join(root,"science",name+".js"),"utf8");
 vm.runInNewContext(code,scope,{filename:name+".js",timeout:2500});
});
assert.equal(H.digestionData.stages.length,6);
assert.equal(H.digestionData.quiz.length,4);
assert.equal(H.cellDivisionCore.progression(0,true),1);
assert.equal(H.cellDivisionCore.progression(4,true),4);
assert.equal(H.cellDivisionCore.progression(4,false),16);
const v=H.viscosityCore;
assert.equal(v.compare("water",20,"syrup",20).faster,"A");
assert.ok(v.flowIndex("syrup",40)<v.flowIndex("syrup",10));
assert.equal(v.compare("water",15,"syrup",20).fairTemperature,false);
const lake=H.lakeDensityCore;
assert.ok(lake.relativeDensity(4,"liquid")>lake.relativeDensity(20,"liquid"));
assert.ok(lake.relativeDensity(4,"liquid")>lake.relativeDensity(4,"ice"));
const ray=H.refractionCore;
assert.ok(ray.trace("air","water",45).refracted>32&&ray.trace("air","water",45).refracted<33);
assert.equal(ray.trace("water","air",60).totalInternalReflection,true);
assert.equal(ray.trace("air","glass",0).refracted,0);
assert.equal(H.seafloorCore.ageAt(100,2),5);
assert.equal(H.seafloorCore.evidence(120,3).oppositeAgeMyr,4);
assert.match(H.seafloorCore.svg(6,150),/Sample B/);
assert.equal(H.earthquakeCore.waveTravel(3,4).pathKm,5);
assert.equal(H.earthquakeCore.waveTravel(3,4).seconds,1);
assert.match(H.earthquakeCore.quakeSvg(50,100),/Epicentre/);
keys.forEach(key=>{
 const parent=mockElement();H.lessonTools[key](parent);
 assert.equal(parent.children.length,2,"Preserve previous lesson content for "+key);
 assert.ok(parent.children.some(x=>x.innerHTML.includes("Existing lesson tool: "+key)));
 const lab=parent.children.find(x=>!x.innerHTML.includes("Existing lesson tool: "+key));
 assert.ok(lab.innerHTML.length>200,key+" lesson render");
 if(key==="cells/systems"){
  lab.digestionExplorer.select(3);
  assert.match(lab.querySelector(".readout").innerHTML,/Small intestine/);
 }
 if(key==="cells/reproduction"){
  lab.cellDivisionLab.next();
  assert.equal(lab.cellDivisionLab.cycle,1);
 }
 if(key==="matter/viscosity"){
  lab.querySelector("#vl-record").onclick();
  assert.equal(lab.viscosityRace.records.length,1);
 }
 if(key==="matter/water"){
  lab.querySelector("#wl-record").onclick();
  assert.equal(lab.lakeLab.records.length,1);
 }
 if(key==="light/u3t2-refraction"){
  lab.querySelector("#rr-record").onclick();
  assert.equal(lab.rayLab.records.length,1);
 }
 if(key==="earth/e6-seafloor"){
  lab.querySelector("#sf-record").onclick();
  assert.equal(lab.seafloorLab.trials.length,1);
 }
 if(key==="earth/e11-quakes"){
  lab.querySelector("#eq-record").onclick();
  assert.equal(lab.earthquakeLab.records.length,1);
 }
});
const index=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
for(const name of names){
 const needle='src="'+name+'.js',i=index.indexOf(needle);
 assert.ok(i>=0,"Script included: "+name);
 assert.ok(i<index.indexOf('src="../assets/hub.js'),"Registered before hub: "+name);
}
const data=fs.readFileSync(path.join(root,"science","data.js"),"utf8");
assert.match(data,/id:"cells".*status:"now"/);
assert.match(data,/id:"matter".*status:"soon"/);
assert.match(data,/"id": "light"/);
assert.match(data,/"status": "soon"/);
console.log("Science expansion passed: 7 modules; models, controls, trials, older tools, lesson registration and release flags.");
