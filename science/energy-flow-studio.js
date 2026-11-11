/* Grade 8 Energy & Light · energy conservation, transformations and potential/kinetic.
   Based on student booklet Topic 1. Displayed transfer percentages are illustrative. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const examples=[
 {id:"flashlight",name:"Flashlight",source:"Chemical energy in the battery",useful:"Light",other:"Thermal energy to surroundings",note:"A flashlight transfers chemical energy to light and thermal energy."},
 {id:"bike",name:"Bicycle rider",source:"Chemical energy in food",useful:"Movement of the rider and bicycle",other:"Thermal energy and sound",note:"Muscles transfer chemical energy into movement, heating and sound."},
 {id:"toaster",name:"Toaster",source:"Electrical energy supplied to the toaster",useful:"Thermal energy to toast the bread",other:"Heating surroundings and a little light",note:"Heating the bread is the intended output; energy also spreads into the surroundings."},
 {id:"speaker",name:"Speaker",source:"Electrical energy",useful:"Sound",other:"Thermal energy in the equipment",note:"Electrical energy becomes sound and thermal energy."}
];
const G=9.81;
function transfer(input,usefulPercent){
 if(!Number.isFinite(input)||input<0||input>10000||!Number.isFinite(usefulPercent)||usefulPercent<0||usefulPercent>100)throw Error("Energy controls out of range");
 const useful=Number((input*usefulPercent/100).toFixed(2)),other=Number((input-useful).toFixed(2));
 return {input,useful,other,total:useful+other,balanced:Math.abs(useful+other-input)<1e-8};
}
function fall(mass,topHeight,currentHeight){
 if(![mass,topHeight,currentHeight].every(Number.isFinite)||mass<=0||topHeight<=0||currentHeight<0||currentHeight>topHeight)throw Error("Invalid hill inputs");
 const potential=mass*G*currentHeight,kinetic=mass*G*(topHeight-currentHeight),total=mass*G*topHeight;
 return {mass,topHeight,currentHeight,potential,kinetic,total,speed:Math.sqrt(2*G*(topHeight-currentHeight))};
}
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".efs{color:var(--ink);line-height:1.5;min-width:0}.efs *{box-sizing:border-box}.efs h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.efs h3{font-size:1.05rem;margin:0 0 8px}",
".efs .hint{color:var(--muted);font-size:.87rem;max-width:72ch}.efs .tabs,.efs .examples,.efs .actions{display:flex;flex-wrap:wrap;gap:8px;margin:13px 0}",
".efs button,.efs select{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;min-height:40px;cursor:pointer}",
".efs button[aria-pressed=true]{color:var(--on-btn);background:var(--btn);border-color:var(--btn)}.efs button:focus-visible,.efs textarea:focus-visible,.efs input:focus-visible{outline:3px solid var(--accent);outline-offset:3px}",
".efs .examples button{flex:1 1 116px;font-size:.86rem}.efs .layout{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:start}",
".efs .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,14px);padding:12px;min-width:0}",
".efs svg{display:block;width:100%;height:auto}.efs svg text{font:600 13px var(--f-body,system-ui);fill:var(--ink)}",
".efs .bargrid{display:grid;gap:11px}.efs .barlabel{display:flex;justify-content:space-between;gap:12px;font-size:.88rem;font-weight:650}",
".efs .track{height:16px;overflow:hidden;border-radius:7px;background:var(--paper);border:1px solid var(--rule);margin-top:5px}",
".efs .fill{height:100%;background:var(--accent);transition:width .24s}.efs .fill.other{background:var(--muted)}",
".efs .controls{display:grid;gap:12px}.efs .controls label{display:flex;justify-content:space-between;gap:8px;font-weight:650;font-size:.88rem}",
".efs input[type=range]{width:100%;accent-color:var(--accent)}.efs .message{min-height:43px;font-size:.9rem}",
".efs .tablewrap{max-width:100%;overflow-x:auto}.efs table{width:100%;border-collapse:collapse;font-size:.85rem}.efs th,.efs td{padding:8px 6px;text-align:left;border-bottom:1px solid var(--rule)}.efs th{white-space:nowrap}",
".efs textarea{box-sizing:border-box;width:100%;min-height:92px;padding:11px;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;resize:vertical;font:inherit}",
".efs .writing{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0}.efs .output{font-size:1.45rem;font-weight:750;font-variant-numeric:tabular-nums}",
"@media(max-width:750px){.efs .layout,.efs .writing{grid-template-columns:1fr}}@media(max-width:460px){.efs .tabs button{flex:1 1 40%}}",
"@media(prefers-reduced-motion:reduce){.efs .fill{transition:none}}"
].join("\n");
function transferSvg(example,model){
 const w1=Math.max(0,model.useful/model.input*320)||0,w2=320-w1;
 return '<svg viewBox="0 0 540 260" role="img" aria-label="Energy enters a device and splits into useful and other outputs; total energy stays the same.">'+
 '<defs><marker id="efs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L9 5L0 10Z" fill="var(--accent)"/></marker></defs>'+
 '<rect x="30" y="35" width="192" height="72" rx="12" fill="var(--paper)" stroke="var(--rule)" stroke-width="2"/>'+
 '<text x="126" y="63" text-anchor="middle">Energy source</text><text x="126" y="83" text-anchor="middle">'+model.input.toFixed(0)+' J</text>'+
 '<path d="M222 71H296" stroke="var(--accent)" stroke-width="5" marker-end="url(#efs-arrow)"/>'+
 '<rect x="303" y="35" width="205" height="72" rx="12" fill="var(--paper)" stroke="var(--rule)" stroke-width="2"/>'+
 '<text x="404" y="63" text-anchor="middle">'+escape(example.name)+'</text><text x="404" y="84" text-anchor="middle">transforms energy</text>'+
 '<text x="30" y="147">Energy outputs (same total)</text>'+
 '<rect x="30" y="162" width="450" height="45" rx="8" fill="var(--paper)" stroke="var(--rule)"/>'+
 '<rect x="30" y="162" width="'+(450*model.useful/model.input).toFixed(2)+'" height="45" rx="5" fill="var(--accent)" />'+
 '<rect x="'+(30+450*model.useful/model.input).toFixed(2)+'" y="162" width="'+(450*model.other/model.input).toFixed(2)+'" height="45" fill="var(--muted)"/>'+
 '<text x="30" y="230">Useful '+model.useful.toFixed(0)+' J</text><text x="285" y="230">Other '+model.other.toFixed(0)+' J</text>'+
 '<text x="270" y="253" text-anchor="middle">A teaching model · illustrative output shares</text></svg>';
}
function hillSvg(model){
 const left=44,base=250,top=44,height=base-top;
 const x=55+(model.topHeight-model.currentHeight)/model.topHeight*380;
 const y=top+(model.topHeight-model.currentHeight)/model.topHeight*height;
 return '<svg viewBox="0 0 540 295" role="img" aria-label="An idealized ball descends a hill, with changing gravitational potential and kinetic energy.">'+
 '<path d="M45 45L435 250H500" stroke="var(--ink)" stroke-opacity=".5" stroke-width="7" fill="none" stroke-linecap="round"/>'+
 '<path d="M45 45V251" stroke="var(--rule)" stroke-width="2" stroke-dasharray="7 6"/>'+
 '<circle cx="'+x.toFixed(1)+'" cy="'+(y-17).toFixed(1)+'" r="17" fill="var(--accent)" stroke="var(--paper)" stroke-width="3"/>'+
 '<path d="M'+x.toFixed(1)+' '+(y-17).toFixed(1)+' V250" stroke="var(--muted)" stroke-dasharray="5 5" fill="none"/>'+
 '<text x="46" y="25">Top: '+model.topHeight.toFixed(1)+' m</text>'+
 '<text x="320" y="28">Height now: '+model.currentHeight.toFixed(1)+' m</text>'+
 '<text x="304" y="277">Bottom: 0 m</text>'+
 '<text x="270" y="293" text-anchor="middle" font-size="11">Idealized motion · ignoring air resistance and rolling friction</text></svg>';
}
function render(root){
 let tab="flow",example="flashlight",input=100,share=35,mass=2,top=5,height=5,trials=[];
 const $=s=>root.querySelector(s);
 root.innerHTML='<section class="efs"><style>'+css+'</style><h2>Energy Transfer Studio</h2>'+
 '<p class="hint">Explore conservation of energy and the change between gravitational potential and kinetic energy. Energy can move and change form, but the total is conserved.</p>'+
 '<div class="tabs" role="group" aria-label="Choose energy model"><button type="button" data-mode="flow" aria-pressed="true">Energy transformations</button><button type="button" data-mode="hill" aria-pressed="false">Potential → kinetic</button></div>'+
 '<div id="efs-mode" aria-live="polite"></div>'+
 '<div class="actions"><button type="button" id="efs-record">Record trial</button><button type="button" id="efs-reset">Reset model</button><button type="button" id="efs-clear">Clear trials</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Situation</th><th>Input / total</th><th>Useful / potential</th><th>Other / kinetic</th></tr></thead><tbody id="efs-trials"><tr><td colspan="5">No trials recorded.</td></tr></tbody></table></div>'+
 '<div class="writing"><label>Describe an energy transformation and its evidence.<textarea id="efs-explain" placeholder="Energy starts as... then changes to..."></textarea></label>'+
 '<label>What assumption makes this model simpler than real life?<textarea id="efs-limits" placeholder="This model assumes..."></textarea></label></div>'+
 '<div class="actions"><button id="efs-download" type="button">Download investigation</button></div><p id="efs-notice" role="status" class="hint"></p></section>';
 function modeHtml(){
  root.querySelectorAll("[data-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===tab)));
  if(tab==="flow"){
   $("#efs-mode").innerHTML='<h3>Explore a transformation</h3><div class="examples" role="group" aria-label="Choose device">'+examples.map(x=>'<button type="button" data-example="'+x.id+'" aria-pressed="'+(x.id===example)+'">'+x.name+'</button>').join("")+'</div>'+
    '<div class="layout"><div class="diagram" id="efs-diagram"></div><div class="controls">'+
    '<div><label for="efs-input">Energy entering: <output id="efs-input-val">100</output> J</label><input id="efs-input" type="range" min="20" max="200" step="10" value="'+input+'"></div>'+
    '<div><label for="efs-share">Useful output in this model: <output id="efs-share-val">35</output>%</label><input id="efs-share" type="range" min="10" max="90" step="5" value="'+share+'"></div>'+
    '<div class="bargrid"><div><div class="barlabel"><span>Useful output</span><output id="efs-useful">—</output></div><div class="track"><div class="fill" id="efs-useful-bar"></div></div></div>'+
    '<div><div class="barlabel"><span>Other outputs</span><output id="efs-other">—</output></div><div class="track"><div class="fill other" id="efs-other-bar"></div></div></div></div>'+
    '<p class="message" id="efs-message"></p></div></div>'+
    '<p class="hint" id="efs-source"></p><p class="hint">The percentages are chosen to explore the law of conservation, not measured efficiencies of these devices.</p>';
  }else{
   $("#efs-mode").innerHTML='<h3>Watch the energy change on a hill</h3>'+
    '<div class="layout"><div class="diagram" id="efs-diagram"></div><div class="controls">'+
    '<div><label for="efs-mass">Mass: <output id="efs-mass-val">2</output> kg</label><input id="efs-mass" type="range" min="1" max="5" step="0.5" value="'+mass+'"></div>'+
    '<div><label for="efs-height">Height above the bottom: <output id="efs-height-val">5</output> m</label><input id="efs-height" type="range" min="0" max="'+top+'" step="0.5" value="'+height+'"></div>'+
    '<div class="bargrid"><div><div class="barlabel"><span>Potential energy</span><output id="efs-useful">—</output></div><div class="track"><div class="fill" id="efs-useful-bar"></div></div></div>'+
    '<div><div class="barlabel"><span>Kinetic energy</span><output id="efs-other">—</output></div><div class="track"><div class="fill other" id="efs-other-bar"></div></div></div></div>'+
    '<p class="message" id="efs-message"></p></div></div>'+
    '<p class="hint">Idealized falling/rolling object: assumes no energy transfers to heat or sound. Real motion loses some mechanical energy to its surroundings, but total energy is still conserved.</p>';
  }
  paint();
 }
 function paint(){
  if(tab==="flow"){
   const source=examples.find(x=>x.id===example),m=transfer(input,share);
   $("#efs-diagram").innerHTML=transferSvg(source,m);
   $("#efs-input-val").textContent=input;$("#efs-share-val").textContent=share;
   $("#efs-useful").textContent=m.useful.toFixed(1)+" J";$("#efs-other").textContent=m.other.toFixed(1)+" J";
   $("#efs-useful-bar").style.width=share+"%";$("#efs-other-bar").style.width=(100-share)+"%";
   $("#efs-message").textContent=m.useful.toFixed(1)+" + "+m.other.toFixed(1)+" = "+m.total.toFixed(1)+" J. Total energy is accounted for.";
   $("#efs-source").textContent=source.source+" → "+source.useful+" and "+source.other+". "+source.note;
  }else{
   const m=fall(mass,top,height);
   $("#efs-diagram").innerHTML=hillSvg(m);
   $("#efs-mass-val").textContent=mass;$("#efs-height-val").textContent=height;
   $("#efs-useful").textContent=m.potential.toFixed(1)+" J";$("#efs-other").textContent=m.kinetic.toFixed(1)+" J";
   $("#efs-useful-bar").style.width=(100*m.potential/m.total)+"%";$("#efs-other-bar").style.width=(100*m.kinetic/m.total)+"%";
   $("#efs-message").textContent="Potential "+m.potential.toFixed(1)+" J + kinetic "+m.kinetic.toFixed(1)+" J = "+m.total.toFixed(1)+" J. Speed in this ideal model: "+m.speed.toFixed(1)+" m/s.";
  }
 }
 function showTrials(){
  $("#efs-trials").innerHTML=trials.length?trials.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+escape(t.context)+'</td><td>'+t.total.toFixed(1)+' J</td><td>'+t.a.toFixed(1)+' J</td><td>'+t.b.toFixed(1)+' J</td></tr>').join(""):'<tr><td colspan="5">No trials recorded.</td></tr>';
 }
 root.addEventListener("click",event=>{
  const button=event.target.closest("[data-mode],[data-example]");if(!button||!root.contains(button))return;
  if(button.dataset.mode){tab=button.dataset.mode;modeHtml();}
  if(button.dataset.example){example=button.dataset.example;modeHtml();}
 });
 root.addEventListener("input",event=>{
  const id=event.target.id,v=Number(event.target.value);
  if(id==="efs-input")input=v;
  else if(id==="efs-share")share=v;
  else if(id==="efs-mass")mass=v;
  else if(id==="efs-height")height=v;
  else return;
  paint();
 });
 $("#efs-record").onclick=()=>{
  if(tab==="flow"){const m=transfer(input,share);trials.push({context:examples.find(x=>x.id===example).name,total:m.total,a:m.useful,b:m.other});}
  else{const m=fall(mass,top,height);trials.push({context:"Hill at "+height+" m",total:m.total,a:m.potential,b:m.kinetic});}
  if(trials.length>8)trials.shift();showTrials();
 };
 $("#efs-reset").onclick=()=>{input=100;share=35;mass=2;height=top=5;modeHtml();};
 $("#efs-clear").onclick=()=>{trials=[];showTrials();};
 $("#efs-download").onclick=()=>{
  const lines=["Energy Transfer Studio — Science 8","Recorded trials (model numbers):",
   ...trials.map((t,i)=>(i+1)+". "+t.context+"; total "+t.total.toFixed(1)+" J; first output "+t.a.toFixed(1)+" J; second output "+t.b.toFixed(1)+" J"),
   "Explanation:",$("#efs-explain").value.trim(),"Model limitation:",$("#efs-limits").value.trim()];
  const blob=new Blob([lines.join("\n\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
  const link=document.createElement("a");link.href=url;link.download="energy-transfer-investigation.txt";document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1200);$("#efs-notice").textContent="Investigation downloaded.";
 };
 modeHtml();showTrials();
 root.energyFlowLab={get mode(){return tab},get records(){return trials.slice()},setFlow(next){if(next.input!==undefined)input=next.input;if(next.share!==undefined)share=next.share;tab="flow";modeHtml();},setHill(next){if(next.mass!==undefined)mass=next.mass;if(next.height!==undefined)height=next.height;tab="hill";modeHtml();}};
}
H.energyFlowCore={examples,transfer,fall,transferSvg,hillSvg};
H.lessonTools=H.lessonTools||{};
for(const key of ["light/u3t1-energy","light/u3t1-stores"]){
 const before=H.lessonTools[key];
 H.lessonTools[key]=function(el){
  const child=document.createElement("div");el.appendChild(child);render(child);
  if(before){const rest=document.createElement("div");el.appendChild(rest);before(rest);}
 };
}
})();