/* Grade 8 Matter — idealized buoyancy comparison. Data is illustrative and no
   student information is collected. Real floating also depends on shape, surface
   tension, displaced volume and environmental conditions. */
(function(global){
"use strict";
const H=global.HUB;if(!H)return;
const model={
 liquids:{
  oil:{name:"Vegetable oil (approx.)",density:.92,color:"#c9ae6b"},
  water:{name:"Freshwater (approx.)",density:1,color:"#88b9d1"},
  salt:{name:"Salty water (approx.)",density:1.03,color:"#70a5c0"},
  glycerin:{name:"Glycerin (approx.)",density:1.26,color:"#99b2c8"}
 },
 objects:{
  wood:{name:"Light wood block",density:.7},
  wax:{name:"Wax block",density:.9},
  ice:{name:"Ice block (0°C)",density:.917},
  plastic:{name:"Dense plastic block",density:1.1},
  aluminium:{name:"Aluminium block",density:2.7},
  steel:{name:"Steel block",density:7.8},
  custom:{name:"Custom block",density:1}
 },
 result(mass,volume,liquid){
  if(!Number.isFinite(mass)||!Number.isFinite(volume)||mass<=0||volume<=0)throw Error("Mass and volume must be positive.");
  if(!this.liquids[liquid])throw Error("Unknown liquid");
  const objectDensity=mass/volume,liquidDensity=this.liquids[liquid].density;
  const ratio=objectDensity/liquidDensity;
  return {
   mass,volume,liquid,objectDensity,liquidDensity,
   state:Math.abs(ratio-1)<.00001?"neutral":ratio<1?"float":"sink",
   submerged:ratio<1?ratio:1,
   difference:objectDensity-liquidDensity
  };
 }
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const round=n=>Math.round(n*100)/100;
function mount(root){
 let object="wood",liquid="water",mass=70,volume=100,prediction="",observed=false,trials=[];
 root.innerHTML='<section class="bl"><h3>Buoyancy: Compare Four Liquids</h3>'+
 '<p>Choose a solid and a liquid. Predict whether the block floats, sinks or stays suspended. Then test the model and compare your observations.</p>'+
 '<div class="bl-layout"><div class="bl-graphic"><svg id="bl-diagram" viewBox="0 0 400 350" role="img" aria-label="Tank with liquid and a solid block"></svg></div>'+
 '<div class="bl-controls"><label>Block material<select id="bl-object">'+Object.entries(model.objects).map(([id,v])=>'<option value="'+id+'">'+esc(v.name)+'</option>').join("")+'</select></label>'+
 '<label>Liquid<select id="bl-liquid">'+Object.entries(model.liquids).map(([id,v])=>'<option value="'+id+'">'+esc(v.name)+'</option>').join("")+'</select></label>'+
 '<label>Mass (g)<input type="number" id="bl-mass" min="1" max="1000" step="0.1" value="70"></label>'+
 '<label>Volume (cm³)<input type="number" id="bl-volume" min="1" max="500" step="1" value="100"></label>'+
 '<div class="bl-measures"><span>Object density<br><b id="bl-rho-object">0.70</b> g/cm³</span>'+
 '<span>Liquid density<br><b id="bl-rho-liquid">1.00</b> g/cm³</span></div>'+
 '<p id="bl-result" class="bl-result" role="status">Choose a prediction before running the model.</p></div></div>'+
 '<section class="bl-section"><h4>1 · Predict, observe, explain</h4>'+
 '<div class="bl-prediction"><label>What will happen?<select id="bl-predict"><option value="">Choose a prediction</option>'+
 '<option value="float">Float</option><option value="sink">Sink</option><option value="neutral">Stay neutrally buoyant</option></select></label>'+
 '<button id="bl-test" type="button" class="primary">Test prediction</button></div><p id="bl-feedback" role="status" class="bl-notice"></p>'+
 '<button id="bl-record" type="button" disabled>Record this observation</button><p id="bl-record-status" role="status" class="bl-notice"></p></section>'+
 '<section class="bl-section"><h4>2 · Evidence table</h4><p>Record at least three different liquid/object combinations. Change only one factor at a time when making comparisons.</p>'+
 '<div class="bl-table"><table><thead><tr><th>Object</th><th>Liquid</th><th>Mass</th><th>Volume</th><th>Object density</th><th>Result</th><th>Submerged</th></tr></thead>'+
 '<tbody id="bl-rows"><tr><td colspan="7">No trials recorded.</td></tr></tbody></table></div>'+
 '<p id="bl-trials" role="status" class="bl-notice">0 trials recorded.</p></section>'+
 '<section class="bl-section"><h4>3 · Claim, evidence and reasoning</h4>'+
 '<label>Claim<textarea id="bl-claim" placeholder="For the same object, changing the liquid…"></textarea></label>'+
 '<label>Evidence<textarea id="bl-evidence" placeholder="Trial 1 shows… Trial 2 shows…"></textarea></label>'+
 '<label>Reasoning<textarea id="bl-reasoning" placeholder="This is because the relative densities…"></textarea></label>'+
 '<div class="bl-actions"><button id="bl-export" type="button" class="primary">Download investigation</button>'+
 '<button id="bl-reset" type="button">Clear all work</button></div><p id="bl-export-status" role="status" class="bl-notice"></p>'+
 '<p class="bl-fine">Model assumptions: uniform rigid block, no air pockets or surface tension, constant liquid density, and ideal floating equilibrium. A sinking block rests on the bottom. Real values vary by composition and temperature. Files are not automatically submitted.</p></section></section>';
 const $=q=>root.querySelector(q);
 let current=model.result(mass,volume,liquid);
 function diagram(){
  const color=model.liquids[liquid].color;
  const height=86,top=current.state==="float"?156-height*(1-current.submerged):
   current.state==="sink"?220:162;
  const visible=observed;
  $("#bl-diagram").innerHTML='<rect x="38" y="35" width="324" height="274" rx="10" fill="#f7faf9" stroke="#4d6762" stroke-width="4"/>'+
   '<rect x="41" y="156" width="318" height="151" fill="'+color+'" opacity=".65"/>'+
   '<path d="M41 156 H359" stroke="#496e7b" stroke-width="3"/>'+
   (visible?'<rect x="150" y="'+round(top)+'" width="100" height="'+height+'" rx="5" fill="#b68053" stroke="#694c36" stroke-width="3"/>':
   '<rect x="150" y="95" width="100" height="'+height+'" rx="5" fill="none" stroke="#566c61" stroke-width="3" stroke-dasharray="7,5"/>')+
   '<text x="55" y="28" font-size="14" fill="#365248">Idealized floating/sinking model</text>'+
   '<text x="55" y="337" font-size="14" fill="#365248">'+esc(model.liquids[liquid].name)+'</text>';
  $("#bl-diagram").setAttribute("aria-label",visible?("Block "+current.state+" in "+model.liquids[liquid].name+". "+Math.round(current.submerged*100)+" percent submerged if floating."):"Prediction view. Test to see the result.");
 }
 function update(){
  const valid=Number.isFinite(mass)&&Number.isFinite(volume)&&mass>0&&volume>0&&mass<=1000&&volume<=500;
  $("#bl-test").disabled=!valid;$("#bl-record").disabled=true;observed=false;
  if(!valid){$("#bl-result").textContent="Enter a mass of 1–1000 g and volume of 1–500 cm³.";return;}
  current=model.result(mass,volume,liquid);
  $("#bl-rho-object").textContent=round(current.objectDensity).toFixed(2);
  $("#bl-rho-liquid").textContent=current.liquidDensity.toFixed(2);
  $("#bl-result").textContent="Predict first; then test. Compare the two density values.";
  $("#bl-feedback").textContent="";diagram();
 }
 function writeTable(){
  $("#bl-rows").innerHTML=trials.length?trials.map(t=>'<tr><td>'+esc(model.objects[t.object].name)+'</td><td>'+esc(model.liquids[t.liquid].name)+'</td>'+
   '<td>'+t.mass+' g</td><td>'+t.volume+' cm³</td><td>'+round(t.objectDensity)+'</td><td>'+t.state+'</td><td>'+Math.round(t.submerged*100)+'%</td></tr>').join(""):
   '<tr><td colspan="7">No trials recorded.</td></tr>';
  $("#bl-trials").textContent=trials.length+" distinct observation(s) recorded.";
 }
 $("#bl-object").addEventListener("change",e=>{
  object=e.target.value;
  mass=Math.min(1000,Math.round(model.objects[object].density*1000)/10);volume=100;
  $("#bl-mass").value=mass;$("#bl-volume").value=volume;update();
 });
 $("#bl-liquid").addEventListener("change",e=>{liquid=e.target.value;update();});
 $("#bl-mass").addEventListener("input",e=>{mass=Number(e.target.value);object="custom";$("#bl-object").value="custom";update();});
 $("#bl-volume").addEventListener("input",e=>{volume=Number(e.target.value);object="custom";$("#bl-object").value="custom";update();});
 $("#bl-test").addEventListener("click",()=>{
  prediction=$("#bl-predict").value;
  if(!prediction){$("#bl-feedback").textContent="Make your prediction before revealing the model.";return;}
  observed=true;diagram();
  const result=current.state==="neutral"?"neutrally buoyant":current.state==="float"?"floating":"sinking";
  const reason=current.state==="float"?"The fraction submerged is approximately object density ÷ liquid density.":
   "An object with a higher density than the liquid sinks; equal densities give neutral buoyancy.";
  $("#bl-result").textContent="Result: "+result+". "+(current.state==="float"?Math.round(current.submerged*100)+"% submerged. ":"")+reason;
  $("#bl-feedback").textContent=prediction===current.state?"Prediction supported by the model.":"The model differs from your prediction. Compare the two densities.";
  $("#bl-record").disabled=false;
 });
 $("#bl-record").addEventListener("click",()=>{
  if(!observed)return;
  if(trials.some(t=>t.object===object&&t.liquid===liquid&&t.mass===mass&&t.volume===volume)){
   $("#bl-record-status").textContent="Already recorded. Change a material, liquid, mass or volume.";return;
  }
  trials.push({...current,object});
  writeTable();$("#bl-record-status").textContent="Observation "+trials.length+" recorded.";
 });
 $("#bl-export").addEventListener("click",()=>{
  if(trials.length<3){$("#bl-export-status").textContent="Record at least three different trials before exporting.";return;}
  const text=["#bl-claim","#bl-evidence","#bl-reasoning"].map(k=>$(k).value.trim());
  if(text.some(x=>x.split(/\s+/).filter(Boolean).length<6)){
   $("#bl-export-status").textContent="Write at least six words in every explanation field.";return;
  }
  const body=["Buoyancy Across Liquids — Grade 8 Science","Simplified rigid-block model; densities approximate.","",
   ...trials.flatMap((t,i)=>["Trial "+(i+1)+": "+model.objects[t.object].name+" in "+model.liquids[t.liquid].name,
    "Mass "+t.mass+" g; volume "+t.volume+" cm³; object density "+round(t.objectDensity)+" g/cm³",
    "Result "+t.state+"; submerged fraction "+Math.round(t.submerged*100)+"%",""]),
   "CLAIM:",text[0],"EVIDENCE:",text[1],"REASONING:",text[2],
   "LIMITATION: Buoyancy assumes ideal uniform blocks and constant liquid density."].join("\n");
  const url=URL.createObjectURL(new Blob([body],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.download="buoyancy-investigation.txt";a.href=url;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#bl-export-status").textContent="Investigation downloaded for hand-in.";
 });
 $("#bl-reset").addEventListener("click",()=>{
  if(!global.confirm("Clear recorded buoyancy trials and written explanations?"))return;
  trials=[];["#bl-claim","#bl-evidence","#bl-reasoning"].forEach(k=>$(k).value="");writeTable();
 });
 writeTable();update();
 root.buoyancyLab={get trials(){return trials.slice();},get current(){return current;}};
}
H.lessonTools=H.lessonTools||{};
const previous=H.lessonTools["matter/density"];
H.lessonTools["matter/density"]=root=>{
 const pane=document.createElement("div");root.appendChild(pane);mount(pane);
 if(previous){const old=document.createElement("div");root.appendChild(old);previous(old);}
};
global.BuoyancyModel=model;
})(window);