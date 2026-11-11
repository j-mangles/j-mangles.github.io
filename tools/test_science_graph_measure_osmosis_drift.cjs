/* Grade 8 Science: graphing, measurement, osmosis response and drift evidence. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const names=["graphing-studio","measurement-challenge","osmosis-cell-response","continental-drift-evidence"];
const keys=["skills/graph","skills/si","cells/transport","earth/e5-drift"];
function fakeElement(){
 const cache=new Map(),children=[],events={};
 function control(){return {innerHTML:"",textContent:"",value:"",disabled:false,style:{},dataset:{},classList:{toggle(){},contains(){return false;}},setAttribute(){},addEventListener(k,fn){this.events=this.events||{};this.events[k]=fn;},onclick:null};}
 return {innerHTML:"",textContent:"",value:"",style:{},disabled:false,children,events,appendChild(x){children.push(x);},addEventListener(k,fn){events[k]=fn;},contains(){return true;},
 querySelector(q){if(!cache.has(q))cache.set(q,control());return cache.get(q);},querySelectorAll(){return [];}}
}
const H={lessonTools:{}};
keys.forEach(k=>{H.lessonTools[k]=el=>{el.innerHTML="Earlier tool: "+k;};});
const ctx={window:{HUB:H},document:{createElement:fakeElement},console};
for(const name of names){
 const code=fs.readFileSync(path.join(root,"science",name+".js"),"utf8");
 vm.runInNewContext(code,ctx,{filename:name+".js",timeout:3000});
}
const graph=H.graphingCore;
assert.equal(graph.datasets.length,3);
assert.equal(graph.model("spruce",[9,18,29,41,54],"line").correctType,true);
assert.equal(graph.model("liquids",[4,10,23,14],"line").correctType,false);
assert.ok(graph.niceMaximum(58)>=58);
assert.ok(graph.svgGraph(graph.model("spruce",[9,18,29,41,54],"line"),"Graph title","Time (years)","Height (cm)").includes("Height (cm)"));
assert.throws(()=>graph.model("spruce",[-1,0,0,0,0],"line"));
const measurement=H.measurementCore;
assert.equal(measurement.samples.ruler.length,5);
assert.equal(measurement.checkReading("ruler",3.4,3.4,"cm").correct,true);
assert.equal(measurement.checkReading("cylinder",17,17,"mL").correct,true);
assert.equal(measurement.checkReading("cylinder",17,17,"cm").correct,false);
assert.equal(measurement.checkReading("ruler",3.4,3.2,"cm").correct,false);
assert.equal(measurement.checkReading("ruler",3.4,NaN,"cm").correct,false);
assert.match(measurement.rulerSvg(3.4),/Ruler/);
assert.match(measurement.cylinderSvg(17),/meniscus/);
const osmosis=H.osmosisResponseCore;
assert.equal(osmosis.outcome(30,60,"plant").direction,"out");
assert.equal(osmosis.outcome(30,60,"plant").shape,"plasmolysed");
assert.equal(osmosis.outcome(60,30,"plant").shape,"turgid");
assert.equal(osmosis.outcome(60,30,"animal").shape,"swollen");
assert.equal(osmosis.outcome(30,60,"animal").shape,"shrunken");
assert.equal(osmosis.outcome(50,50,"animal").direction,"balanced");
assert.throws(()=>osmosis.outcome(40,150,"plant"));
assert.match(osmosis.drawing("plant",osmosis.outcome(30,60,"plant")),/svg/);
const drift=H.driftEvidenceCore;
assert.equal(drift.evidence.length,4);
assert.equal(drift.evaluate({fossil:"fossil",rocks:"rocks",glacial:"glacial",shape:"shape"}).correct,4);
assert.equal(drift.evaluate({fossil:"rocks",rocks:"rocks",glacial:"",shape:""}).correct,1);
assert.equal(drift.evaluate({}).answered,0);
assert.match(drift.reconstruction(0),/Joined/);
assert.match(drift.reconstruction(100),/Apart/);
assert.throws(()=>drift.reconstruction(-1));
for(const key of keys){
 const container=fakeElement();
 H.lessonTools[key](container);
 assert.equal(container.children.length,2,key+" preserved existing lesson tool");
 assert.ok(container.children.some(x=>x.innerHTML.includes("Earlier tool: "+key)));
 const current=container.children.find(x=>!x.innerHTML.includes("Earlier tool: "+key));
 assert.ok(current.innerHTML.length>500,key+" rendered");
 if(key==="skills/graph"){
  assert.equal(current.graphLab.dataset,"spruce");
  current.graphLab.setDataset("liquids");
  assert.equal(current.graphLab.kind,"bar");
  assert.ok(current.querySelector("#glab-chart").innerHTML.includes("rect"));
 }
 if(key==="skills/si"){
  assert.equal(current.measurementLab.actual,3.4);
  current.measurementLab.next();
  assert.equal(current.measurementLab.actual,6.7);
 }
 if(key==="cells/transport"){
  current.osmosisLab.set(60,30,"animal");
  assert.equal(current.osmosisLab.result.shape,"swollen");
  current.querySelector("#osmo-record").onclick();
  assert.equal(current.osmosisLab.records.length,1);
 }
 if(key==="earth/e5-drift"){
  current.evidenceLab.setSeparation(0);
  assert.equal(current.evidenceLab.separation,0);
 }
}
const index=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
const hub=index.indexOf('src="../assets/hub.js');
for(const name of names){
 const i=index.indexOf('src="'+name+'.js');
 assert.ok(i>=0&&i<hub,name+" must load before hub");
}
const library=fs.readFileSync(path.join(root,"science","labs.html"),"utf8");
for(const label of ["Data & Graphing Studio","Measurement Challenge","Osmosis Cell Response","Continental Drift Evidence Detective"])
 assert.ok(library.includes(label));
const data=fs.readFileSync(path.join(root,"science","data.js"),"utf8");
assert.match(data,/id:"skills".*status:"done"/);
assert.match(data,/id:"cells".*status:"now"/);
assert.match(data,/id:"matter".*status:"soon"/);
console.log("Science graphing, measurement, osmosis and continental-drift tests passed.");
