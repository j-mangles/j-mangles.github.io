/* Grade 8 Earth Science · Relative ages and radioactive decay.
   Illustrative layers and isotopes based on the geological time lesson. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const L=[
 {id:"A",name:"Sandstone A",why:"Topmost undisturbed sedimentary layer; it was deposited after the dike was already present."},
 {id:"B",name:"Shale B",why:"Younger than C and D, but older than the igneous dike that cuts through it."},
 {id:"C",name:"Siltstone C",why:"Above the lowest limestone, below shale; the dike cuts through this layer."},
 {id:"D",name:"Limestone D",why:"Lowest sedimentary layer in this undisturbed sequence; the oldest layer."},
 {id:"X",name:"Igneous intrusion X",why:"Cuts B, C and D but stops below A. It formed after B, C and D but before A."}
];
const Q=[
 ["Which sedimentary layer is oldest in this undisturbed section?",["A","B","D"],2,"The lowest undisturbed sedimentary layer is oldest."],
 ["Which evidence shows that intrusion X is younger than layer B?",["It cuts across B","It is a different colour","It is underground"],0,"A feature that cuts rock must be younger than the rock it cuts."],
 ["Why is A younger than X?",["A is sandstone","A covers the dike without being cut","A is near the sea"],1,"A lies above the dike, which does not extend into A."],
 ["What can relative dating tell us?",["An exact age in years","The order of events","The temperature of a rock"],1,"Relative ages order events without measuring years."]
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function halfLife(initial,n,duration){
 if(![initial,n,duration].every(Number.isFinite)||initial<=0||n<0||n>8||duration<=0)throw Error("Invalid half-life inputs");
 return {remaining:initial*Math.pow(.5,n),decayed:initial*(1-Math.pow(.5,n)),age:n*duration};
}
const css=[
".gdl{color:var(--ink);line-height:1.5;min-width:0}.gdl *{box-sizing:border-box}.gdl h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.gdl h3{font-size:1.06rem;margin:0 0 8px}",
".gdl p{margin:7px 0 13px}.gdl .hint{font-size:.87rem;color:var(--muted);max-width:70ch}",
".gdl button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;cursor:pointer;min-height:39px}",
".gdl button[aria-pressed=true]{background:var(--btn);color:var(--on-btn);border-color:var(--btn)}.gdl button:focus-visible,.gdl input:focus-visible,.gdl textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".gdl .tabs,.gdl .rocks,.gdl .options,.gdl .actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.gdl .rocks button,.gdl .options button{flex:1 1 110px}",
".gdl .layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:18px;align-items:start}.gdl .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,14px);padding:10px}",
".gdl svg{display:block;width:100%;height:auto}.gdl svg text{fill:var(--ink);font:600 13px var(--f-body,system-ui)}",
".gdl .rock{cursor:pointer;outline:none}.gdl .rock.selected rect,.gdl .rock.selected path{stroke:var(--ink);stroke-width:4}.gdl .rock:focus-visible rect,.gdl .rock:focus-visible path{stroke:var(--ink);stroke-width:5}",
".gdl .readout{padding:13px;background:var(--soft);border-radius:var(--radius,14px);min-height:115px}",
".gdl .quiz{padding-top:15px;border-top:1px solid var(--rule);margin:20px 0}.gdl .question{font-weight:700}.gdl .feedback{min-height:39px;font-weight:650}.gdl .next:disabled{opacity:.45}",
".gdl .controls{display:grid;gap:18px}.gdl label{font-weight:650;font-size:.9rem}.gdl input[type=range]{width:100%;accent-color:var(--accent);margin-top:12px}",
".gdl .numbers{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:15px 0}.gdl .numbers strong{display:block;font-size:1.35rem;font-variant-numeric:tabular-nums}.gdl .numbers small{font-size:.8rem;color:var(--muted)}",
".gdl .tablewrap{overflow-x:auto}.gdl table{border-collapse:collapse;width:100%;font-size:.85rem}.gdl td,.gdl th{border-bottom:1px solid var(--rule);padding:8px;text-align:left}.gdl th{white-space:nowrap}",
".gdl textarea{width:100%;min-height:88px;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;padding:10px;resize:vertical}",
"@media(max-width:700px){.gdl .layout{grid-template-columns:1fr}}@media(max-width:450px){.gdl .numbers{grid-template-columns:1fr 1fr}}"
].join("\n");
function rockSvg(current){
 const lower=[["D",254],["C",194],["B",134]];
 const strata=lower.map(([id,y],i)=>'<g data-rock="'+id+'" class="rock '+(current===id?'selected':'')+'" role="button" tabindex="0">'+
 '<rect x="40" y="'+y+'" width="420" height="60" fill="color-mix(in srgb,var(--accent) '+(43-i*9)+'%,var(--paper))" stroke="var(--rule)" stroke-width="2"/>'+
 '<text x="69" y="'+(y+34)+'">'+id+'</text></g>').join("");
 const dike='<g data-rock="X" class="rock '+(current==="X"?'selected':'')+'" role="button" tabindex="0">'+
 '<path d="M280 314L308 134L352 134L373 314Z" fill="color-mix(in srgb,var(--bad) 32%,var(--paper))" stroke="var(--bad)" stroke-width="3"/>'+
 '<text x="329" y="225" text-anchor="middle">X</text></g>';
 const top='<g data-rock="A" class="rock '+(current==="A"?'selected':'')+'" role="button" tabindex="0">'+
 '<rect x="40" y="74" width="420" height="60" fill="color-mix(in srgb,var(--accent) 12%,var(--paper))" stroke="var(--rule)" stroke-width="2"/>'+
 '<text x="69" y="108">A</text></g>';
 return '<svg viewBox="0 0 500 347" role="img" aria-label="Rock layers D, C, B, dike X cutting the lower layers, and layer A covering the intrusion">'+
 '<text x="250" y="26" text-anchor="middle">Youngest at top · oldest below</text>'+strata+dike+top+
 '<text x="250" y="336" text-anchor="middle" font-size="11">Conceptual stratigraphy · not a real rock sample</text></svg>';
}
function decaySvg(m){
 const full=410,remaining=full*m.remaining/24,used=full-remaining;
 return '<svg viewBox="0 0 500 244" role="img" aria-label="Remaining parent isotope after '+(m.age)+' million model years">'+
 '<text x="24" y="26">Remaining parent isotope</text>'+
 '<rect x="24" y="43" width="410" height="53" rx="7" fill="var(--paper)" stroke="var(--rule)"/>'+
 '<rect x="24" y="43" width="'+remaining.toFixed(2)+'" height="53" rx="5" fill="var(--accent)"/>'+
 '<text x="24" y="121">Original parent isotope that has decayed</text>'+
 '<rect x="24" y="138" width="410" height="53" rx="7" fill="var(--paper)" stroke="var(--rule)"/>'+
 '<rect x="24" y="138" width="'+used.toFixed(2)+'" height="53" rx="5" fill="var(--muted)"/>'+
 '<text x="24" y="229">One half-life: 50% remains · two: 25% · three: 12.5%</text></svg>';
}
function render(root){
 let mode="relative",rock="D",qi=0,answer=null,n=0,duration=25,records=[];
 const $=q=>root.querySelector(q);
 root.innerHTML='<section class="gdl"><style>'+css+'</style><h2>Geological Dating Lab</h2>'+
 '<p class="hint">Use rock-layer evidence to work out the order of geological events. Then try an isotope half-life model to estimate a numerical age.</p>'+
 '<div class="tabs" role="group" aria-label="Choose dating activity"><button data-mode="relative" type="button" aria-pressed="true">Rock layers</button>'+
 '<button data-mode="radiometric" type="button" aria-pressed="false">Half-life model</button></div><div id="gdl-mode"></div>'+
 '<div class="actions"><button id="gdl-record" type="button">Record observation</button><button id="gdl-clear" type="button">Clear observations</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Method</th><th>Observation</th></tr></thead>'+
 '<tbody id="gdl-trials"><tr><td colspan="3">No observations recorded.</td></tr></tbody></table></div>'+
 '<label for="gdl-explain">How are relative and numerical ages different?</label><textarea id="gdl-explain" placeholder="Relative dating can tell us... A half-life can help..."></textarea>'+
 '<div class="actions"><button id="gdl-download" type="button">Download investigation</button></div><p class="hint" id="gdl-notice" role="status"></p></section>';
 function drawRelative(){
  $("#gdl-mode").innerHTML='<div class="layout"><div class="diagram" id="gdl-diagram"></div>'+
   '<div><h3>Select a rock or intrusion</h3><div class="rocks" role="group" aria-label="Choose rock feature">'+L.map(x=>
    '<button type="button" data-rock="'+x.id+'" aria-pressed="'+(rock===x.id)+'">'+x.id+'</button>').join("")+'</div>'+
   '<div class="readout" id="gdl-readout" aria-live="polite"></div>'+
   '<p class="hint">Oldest → youngest in this example: D, C, B, intrusion X, A.</p></div></div>'+
   '<div class="quiz"><h3>Interpret the evidence</h3><p class="question" id="gdl-question"></p>'+
   '<div class="options" id="gdl-options"></div><p class="feedback" id="gdl-feedback" aria-live="polite"></p>'+
   '<button id="gdl-next" type="button" class="next" disabled>Next question</button></div>'+
   '<p class="hint">Superposition places lower undisturbed layers first. An intrusion is younger than the rocks it cuts. These clues do not establish an exact age.</p>';
  paintRock();paintQuiz();
 }
 function paintRock(){
  const feature=L.find(x=>x.id===rock);
  $("#gdl-diagram").innerHTML=rockSvg(rock);
  $("#gdl-readout").innerHTML='<b>'+escape(feature.name)+'</b><p>'+escape(feature.why)+'</p>';
  root.querySelectorAll(".rocks [data-rock]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.rock===rock)));
 }
 function paintQuiz(){
  const question=Q[qi];
  $("#gdl-question").textContent=(qi+1)+" of "+Q.length+": "+question[0];
  $("#gdl-options").innerHTML=question[1].map((t,i)=>'<button type="button" data-answer="'+i+'" '+(answer!==null?'disabled':'')+'>'+escape(t)+'</button>').join("");
  $("#gdl-feedback").textContent=answer===null?"":(answer===question[2]?"Correct. ":"Not quite. ")+question[3];
  $("#gdl-next").disabled=answer===null;$("#gdl-next").textContent=qi===Q.length-1?"Start again":"Next question";
 }
 function drawDecay(){
  $("#gdl-mode").innerHTML='<div class="layout"><div class="diagram" id="gdl-diagram"></div><div class="controls">'+
   '<div><label for="gdl-half">Half-lives elapsed: <output id="gdl-half-out">0</output></label>'+
   '<input id="gdl-half" type="range" min="0" max="5" step="0.5" value="'+n+'"></div>'+
   '<div><label for="gdl-duration">Length of a half-life: <output id="gdl-duration-out">25</output> million years</label>'+
   '<input id="gdl-duration" type="range" min="5" max="50" step="5" value="'+duration+'"></div>'+
   '<p class="hint">Start with 24 g of a parent isotope. Each half-life leaves half of what remained before.</p></div></div>'+
   '<div class="numbers"><div><strong id="gdl-parent">—</strong><small>Parent remaining (g)</small></div>'+
   '<div><strong id="gdl-used">—</strong><small>Parent decayed (g)</small></div>'+
   '<div><strong id="gdl-age">—</strong><small>Time elapsed (Myr)</small></div></div>'+
   '<p class="hint" id="gdl-summary" role="status"></p>'+
   '<p class="hint">This is an idealized closed-sample model. Real radiometric dates depend on the choice of mineral and isotope, initial conditions, daughter isotopes and measurement evidence.</p>';
  paintDecay();
 }
 function paintDecay(){
  const d=halfLife(24,n,duration);
  $("#gdl-diagram").innerHTML=decaySvg(d);
  $("#gdl-half-out").textContent=n;$("#gdl-duration-out").textContent=duration;
  $("#gdl-parent").textContent=d.remaining.toFixed(2);
  $("#gdl-used").textContent=d.decayed.toFixed(2);
  $("#gdl-age").textContent=d.age.toFixed(1);
  $("#gdl-summary").textContent="After "+n+" half-lives, "+(100*d.remaining/24).toFixed(1)+"% remains. The model time is "+d.age.toFixed(1)+" million years.";
 }
 function paintMode(){
  root.querySelectorAll("[data-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  if(mode==="relative")drawRelative();else drawDecay();
 }
 function paintTrials(){
  $("#gdl-trials").innerHTML=records.length?records.map((x,i)=>'<tr><td>'+(i+1)+'</td><td>'+escape(x.method)+'</td><td>'+escape(x.result)+'</td></tr>').join(""):
   '<tr><td colspan="3">No observations recorded.</td></tr>';
 }
 root.addEventListener("click",ev=>{
  const b=ev.target.closest("[data-mode],[data-rock],[data-answer],#gdl-next");if(!b||!root.contains(b))return;
  if(b.dataset.mode){mode=b.dataset.mode;paintMode();}
  else if(b.dataset.rock){rock=b.dataset.rock;paintRock();}
  else if(b.dataset.answer!==undefined&&answer===null){answer=Number(b.dataset.answer);paintQuiz();}
  else if(b.id==="gdl-next"&&answer!==null){qi=(qi+1)%Q.length;answer=null;paintQuiz();}
 });
 root.addEventListener("keydown",ev=>{
  const b=ev.target.closest("svg [data-rock]");
  if(b&&(ev.key==="Enter"||ev.key===" ")){ev.preventDefault();rock=b.dataset.rock;paintRock();}
 });
 root.addEventListener("input",ev=>{
  if(ev.target.id==="gdl-half"){n=Number(ev.target.value);paintDecay();}
  if(ev.target.id==="gdl-duration"){duration=Number(ev.target.value);paintDecay();}
 });
 $("#gdl-record").onclick=()=>{
  if(mode==="relative"){const x=L.find(x=>x.id===rock);records.push({method:"Relative",result:x.name+": "+x.why});}
  else{const d=halfLife(24,n,duration);records.push({method:"Half-life",result:n+" × "+duration+" Myr = "+d.age.toFixed(1)+" Myr, remaining "+d.remaining.toFixed(2)+" g of 24 g"});}
  if(records.length>8)records.shift();paintTrials();
 };
 $("#gdl-clear").onclick=()=>{records=[];paintTrials();};
 $("#gdl-download").onclick=()=>{
  const report=["Geological Dating Lab — Grade 8","Illustrative rock and isotope evidence:",...records.map((x,i)=>(i+1)+". "+x.method+": "+x.result),"Explanation:",$("#gdl-explain").value.trim()].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="geological-dating-investigation.txt";document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1200);$("#gdl-notice").textContent="Investigation downloaded.";
 };
 paintMode();paintTrials();
 root.datingLab={get mode(){return mode},get selectedRock(){return rock},get records(){return records.slice()},setHalf(value){n=value;mode="radiometric";paintMode();}};
}
H.geologicalDatingCore={layers:L,questions:Q,halfLife,rockSvg,decaySvg};
H.lessonTools=H.lessonTools||{};
const old=H.lessonTools["earth/e2-time"];
H.lessonTools["earth/e2-time"]=function(root){
 const el=document.createElement("div");root.appendChild(el);render(el);
 if(old){const after=document.createElement("div");root.appendChild(after);old(after);}
};
})();