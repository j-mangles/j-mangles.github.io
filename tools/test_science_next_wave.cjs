/* Four more Grade 8 Science interactives: cell specialization, energy, rock dating, colour. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const names=["specialized-cell-explorer","energy-flow-studio","geological-dating-lab","prism-colour-lab"];
const keys=["cells/specialized","light/u3t1-energy","light/u3t1-stores","earth/e2-time","light/u3t3-colour"];
function mockElement(){
 const elements=new Map(),children=[],listeners={};
 const control=()=>({innerHTML:"",textContent:"",value:"",style:{},disabled:false,dataset:{},classList:{toggle(){},contains(){return false}},setAttribute(){},addEventListener(){}});
 return {innerHTML:"",textContent:"",style:{},value:"",disabled:false,dataset:{},children,listeners,
 appendChild(el){children.push(el)},addEventListener(k,fn){listeners[k]=fn},contains(){return true},
 querySelector(k){if(!elements.has(k))elements.set(k,control());return elements.get(k)},querySelectorAll(){return[];}};
}
const HUB={lessonTools:{}};
for(const key of keys)HUB.lessonTools[key]=root=>{root.innerHTML="Existing lesson model "+key;};
const ctx={window:{HUB},document:{createElement:mockElement},console};
for(const name of names){
 const src=fs.readFileSync(path.join(root,"science",name+".js"),"utf8");
 vm.runInNewContext(src,ctx,{filename:name+".js",timeout:3000});
}
assert.equal(HUB.specializedCellsCore.types.length,5);
assert.equal(HUB.specializedCellsCore.cases.length,5);
assert.match(HUB.specializedCellsCore.cellArt("nerve"),/svg/);
const E=HUB.energyFlowCore;
for(let amount=20;amount<=500;amount+=20){
 for(let pct=10;pct<=90;pct+=10){
  const r=E.transfer(amount,pct);
  assert.equal(r.total,amount,"Energy conservation "+amount+" "+pct);
  assert.equal(r.balanced,true);
 }
}
const hill=E.fall(3,6,2);
assert.ok(Math.abs(hill.potential+hill.kinetic-hill.total)<1e-8);
assert.equal(E.fall(2,5,5).kinetic,0);
assert.equal(E.fall(2,5,0).potential,0);
const G=HUB.geologicalDatingCore;
assert.equal(G.halfLife(24,2,25).remaining,6);
assert.equal(G.halfLife(24,3,25).age,75);
assert.throws(()=>G.halfLife(24,-1,25));
assert.match(G.rockSvg("X"),/Igneous|intrusion|dike|rock/i);
const C=HUB.prismColourCore;
for(const [lamp,surface,label] of [["white","white","white"],["green","red","dark"],["white","yellow","yellow"],["red","yellow","red"],["blue","white","blue"],["white","green","green"]]){
 assert.equal(C.observed(lamp,surface).label,label);
}
assert.throws(()=>C.observed("ultraviolet","red"));
for(const key of keys){
 const parent=mockElement();
 HUB.lessonTools[key](parent);
 assert.equal(parent.children.length,2,"Preserve earlier lesson activities for "+key);
 assert.ok(parent.children.some(c=>c.innerHTML.includes("Existing lesson model "+key)));
 const lab=parent.children.find(c=>!c.innerHTML.includes("Existing lesson model "+key));
 assert.ok(lab.innerHTML.length>700,"Rendered lab for "+key);
 if(key==="cells/specialized"){
  lab.specializedExplorer.select("nerve");
  assert.match(lab.querySelector("#scs-info").innerHTML,/Nerve/);
 }
 if(key==="light/u3t1-energy"){
  lab.querySelector("#efs-record").onclick();
  assert.equal(lab.energyFlowLab.records.length,1);
  lab.energyFlowLab.setHill({mass:3,height:1});
  assert.equal(lab.energyFlowLab.mode,"hill");
 }
 if(key==="earth/e2-time"){
  lab.datingLab.setHalf(2);
  assert.equal(lab.querySelector("#gdl-parent").textContent,"6.00");
  lab.querySelector("#gdl-record").onclick();
  assert.equal(lab.datingLab.records.length,1);
 }
 if(key==="light/u3t3-colour"){
  lab.prismLab.setObject({lamp:"red",surface:"yellow"});
  assert.match(lab.querySelector("#pc-reading").innerHTML,/red/);
  lab.querySelector("#pc-record").onclick();
  assert.equal(lab.prismLab.records.length,1);
 }
}
const index=fs.readFileSync(path.join(root,"science","index.html"),"utf8");
for(const name of names){
 const at=index.indexOf('src="'+name+'.js');
 assert.ok(at>=0,"Include script "+name);
 assert.ok(at<index.indexOf('src="../assets/hub.js'),"Register before hub "+name);
}
const labs=fs.readFileSync(path.join(root,"science","labs.html"),"utf8");
for(const label of ["Specialized Cell Explorer","Energy Transfer Studio","Energy on a Hill","Geological Dating Lab","Prism & Colour Lab"]){
 assert.ok(labs.includes(label),"New activity indexed "+label);
}
const d=fs.readFileSync(path.join(root,"science","data.js"),"utf8");
assert.match(d,/id:"cells".*status:"now"/);
assert.match(d,/id:"matter".*status:"soon"/);
console.log("Science additional 4 interactives pass: models, UI, old lesson tools, library, and release status.");
