/* Grade 8 Cells & Systems · Osmosis and cell response (Cells booklet Topic 2).
   Conceptual comparisons, not physiological measurements or time-dependent predictions. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
function outcome(internal,external,type){
 if(!["plant","animal"].includes(type)||![internal,external].every(Number.isFinite)||internal<0||external<0||internal>100||external>100)throw Error("Invalid osmosis controls");
 const delta=external-internal,dir=delta>3?"out":delta< -3?"in":"balanced";
 const shape=type==="plant"?(dir==="in"?"turgid":dir==="out"?"plasmolysed":"flaccid"):
  (dir==="in"?"swollen":dir==="out"?"shrunken":"typical");
 return {internal,external,delta,direction:dir,shape,waterIn:dir==="in",waterOut:dir==="out"};
}
const explanations={
 plant:{
  turgid:"Water enters overall. The vacuole fills and the cell contents push against the rigid cell wall (turgor pressure).",
  flaccid:"The two sides have similar solute concentrations in this model, so there is no strong net water movement. The cell is less firm than a turgid cell.",
  plasmolysed:"Water leaves overall. The vacuole becomes smaller and the cell membrane may pull away from the cell wall (plasmolysis)."
 },
 animal:{
  swollen:"Water enters overall. Without a rigid cell wall, the cell can swell; large changes can damage some cells.",
  typical:"The two sides have similar solute concentrations in this model, so there is no strong net water movement.",
  shrunken:"Water leaves overall. The cell becomes smaller as water moves out."
 }
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".osmo{color:var(--ink);line-height:1.5;min-width:0;margin:24px 0 5px;border-top:1px solid var(--rule);padding-top:22px}",
".osmo *{box-sizing:border-box}.osmo h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.osmo h3{font-size:1.05rem;margin:0 0 8px}",
".osmo .note{font-size:.87rem;color:var(--muted);max-width:72ch}.osmo .layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(255px,1fr);gap:19px;align-items:start}",
".osmo button,.osmo select,.osmo input{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 11px;min-height:39px}",
".osmo button{cursor:pointer}.osmo button[aria-pressed=true]{background:var(--btn);border-color:var(--btn);color:var(--on-btn)}",
".osmo button:focus-visible,.osmo select:focus-visible,.osmo textarea:focus-visible,.osmo input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".osmo .types,.osmo .actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.osmo .types button{flex:1 1 130px}",
".osmo .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:10px}",
".osmo svg{width:100%;height:auto;display:block}.osmo svg text{font:600 13px var(--f-body,system-ui);fill:var(--ink)}",
".osmo .controls{display:grid;gap:14px}.osmo .control label{display:flex;justify-content:space-between;gap:9px;font-weight:650;font-size:.89rem}",
".osmo input[type=range]{width:100%;accent-color:var(--accent);padding:0;border:0;margin-top:13px}",
".osmo select{width:100%;display:block;margin-top:6px}.osmo .readout{padding:14px;background:var(--soft);border-radius:var(--radius,12px);min-height:116px}",
".osmo .feedback{font-weight:700;min-height:38px}.osmo .tablewrap{max-width:100%;overflow-x:auto}.osmo table{width:100%;border-collapse:collapse;font-size:.85rem}",
".osmo th,.osmo td{border-bottom:1px solid var(--rule);padding:8px 6px;text-align:left}.osmo th{white-space:nowrap}",
".osmo textarea{box-sizing:border-box;width:100%;min-height:89px;resize:vertical;font:inherit;border:1px solid var(--rule);background:var(--paper);color:var(--ink);padding:10px;border-radius:8px}",
"@media(max-width:750px){.osmo .layout{grid-template-columns:1fr}}"
].join("\n");
function waterArrow(from,to,y,heavy){
 const sign=to>from?1:-1, width=heavy?5:2;
 return '<g fill="var(--accent-ink)" stroke="var(--accent-ink)"><path d="M'+from+' '+y+'H'+(to-sign*6)+'" stroke-width="'+width+'"/><path stroke="none" d="M'+to+' '+y+'l'+(-sign*11)+' -6v12Z"/></g>';
}
function drawing(type,r,show=true){
 const plant=type==="plant",cx=265,cy=163;
 const scale=!show?.9:r.direction==="out"?.67:r.direction==="in"?1:.86;
 const w=232*scale,h=166*scale;
 const wall=plant?'<rect x="145" y="76" width="240" height="174" rx="30" fill="var(--paper)" stroke="var(--accent)" stroke-width="9"/>':"";
 const membrane=plant?
  '<rect x="'+(cx-w/2)+'" y="'+(cy-h/2)+'" width="'+w+'" height="'+h+'" rx="25" fill="var(--accent-soft)" stroke="var(--ink)" stroke-width="3"/>':
  '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+w/2+'" ry="'+h/2+'" fill="var(--accent-soft)" stroke="var(--ink)" stroke-width="3"/>';
 const contents=plant?
  '<rect x="'+(cx-w*.31)+'" y="'+(cy-h*.35)+'" width="'+w*.62+'" height="'+h*.70+'" rx="18" fill="var(--paper)" stroke="var(--accent)" stroke-width="2"/><text x="265" y="167" text-anchor="middle">Vacuole</text>':
  '<ellipse cx="265" cy="160" rx="32" ry="24" fill="var(--paper)" stroke="var(--accent)" stroke-width="2"/><text x="265" y="165" text-anchor="middle">Nucleus</text>';
 const edge=cx-w/2;
 const arrows=show?waterArrow(62,edge+15,146,r.direction==="in")+waterArrow(edge+15,62,181,r.direction==="out"):"";
 const wallLabel=plant?'<path d="M380 106H397L409 93" fill="none" stroke="var(--accent)"/><text x="411" y="94">Cell wall</text>':"";
 const memX=plant?cx+w/2:cx+w*.46;
 const membraneLabel='<path d="M'+memX+' 188L394 214H406" fill="none" stroke="var(--ink)"/><text x="410" y="218">Membrane</text>';
 const description=show?(r.direction==="balanced"?"Equal arrows: no strong net water movement.":"Thicker arrow: net water movement "+(r.direction==="in"?"into":"out of")+" the cell."):"Starting conditions. Predict before revealing the cell response.";
 return '<svg viewBox="0 0 520 287" role="img" aria-label="'+esc(type)+' cell. '+esc(description)+'"><text x="24" y="38">Surrounding solution</text>'+wall+membrane+contents+wallLabel+membraneLabel+arrows+
 '<text x="260" y="275" text-anchor="middle">'+description+'</text></svg>';
}
function render(el){
 let type="plant",inside=30,outside=60,prediction="",records=[],challenge=false,revealed=false;
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="osmo"><style>'+css+'</style><h2>Osmosis: What Happens to a Cell?</h2>'+
 '<p class="note">Water can cross this membrane in both directions. The dissolved solute stays on its side. Set the starting concentrations, then compare a plant and an animal cell in the same solution.</p>'+
 '<label><input type="checkbox" id="osmo-challenge"> Predict before revealing the cell response</label>'+
 '<div class="types" role="group" aria-label="Choose cell type"><button data-cell="plant" aria-pressed="true">Plant cell</button>'+
 '<button data-cell="animal" aria-pressed="false">Animal cell</button></div>'+
 '<div class="layout"><div class="diagram" id="osmo-diagram"></div><div class="controls">'+
 '<div class="control"><label for="osmo-inside">Starting solute concentration inside <output id="osmo-inside-value">30</output></label>'+
 '<input type="range" id="osmo-inside" min="0" max="100" step="10" value="30"></div>'+
 '<div class="control"><label for="osmo-outside">Starting solute concentration outside <output id="osmo-outside-value">60</output></label>'+
 '<input type="range" id="osmo-outside" min="0" max="100" step="10" value="60"></div>'+
 '<div id="osmo-prompt" hidden><label for="osmo-predict"><b>Predict the overall movement of water</b></label>'+
 '<select id="osmo-predict"><option value="">Make a prediction</option><option value="in">Into the cell</option>'+
 '<option value="out">Out of the cell</option><option value="balanced">No strong net movement</option></select><button id="osmo-check" type="button">Reveal result</button></div>'+
 '<div class="readout" id="osmo-reading" aria-live="polite"></div><p class="feedback" id="osmo-feedback" aria-live="polite"></p></div></div>'+
 '<div class="actions"><button id="osmo-record" type="button">Record trial</button><button id="osmo-reset" type="button">Reset comparison</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Cell</th><th>Inside / outside</th><th>Prediction</th><th>Net movement</th><th>Effect</th></tr></thead>'+
 '<tbody id="osmo-trials"><tr><td colspan="6">No trials recorded.</td></tr></tbody></table></div>'+
 '<label for="osmo-explain"><b>Explain why two cells respond differently in the same surrounding solution.</b></label>'+
 '<textarea id="osmo-explain" placeholder="A plant cell has a cell wall, so... An animal cell..."></textarea>'+
 '<div class="actions"><button id="osmo-download" type="button">Download investigation</button><button id="osmo-clear" type="button">Clear trials</button></div>'+
 '<p class="note" id="osmo-notice" role="status"></p>'+
 '<p class="note">The sliders show relative solute concentration only, not percentages or actual cell measurements. The model predicts a direction, not a rate. Real membranes also contain transport proteins and regulate ions.</p></section>';
 function m(){return outcome(inside,outside,type);}
 function paint(){
  const r=m(),show=!challenge||revealed;
  $("#osmo-diagram").innerHTML=drawing(type,r,show);
  $("#osmo-prompt").hidden=!challenge;
  $("#osmo-record").disabled=!show;
  $("#osmo-check").disabled=!prediction||revealed;
  $("#osmo-predict").disabled=revealed;
  $("#osmo-inside").value=inside;$("#osmo-outside").value=outside;
  $("#osmo-inside-value").textContent=inside;$("#osmo-outside-value").textContent=outside;
  el.querySelectorAll("[data-cell]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cell===type)));
  $("#osmo-reading").innerHTML=show?'<h3>'+esc(r.shape[0].toUpperCase()+r.shape.slice(1))+' '+type+' cell</h3><p>'+esc(explanations[type][r.shape])+'</p>':'<p>Compare the two starting concentrations. Which way will more water move?</p>';
  $("#osmo-feedback").textContent=challenge&&revealed?(prediction===r.direction?"Your prediction matches the model.":"Your prediction differs. Water moves overall toward the side with more dissolved solute."):"";
 }
 function newConditions(){
  prediction="";revealed=false;$("#osmo-predict").value="";paint();
 }
 $("#osmo-challenge").onchange=ev=>{challenge=ev.target.checked;newConditions();};
 $("#osmo-check").onclick=()=>{if(challenge&&prediction){revealed=true;paint();}};
 function paintTrials(){
  $("#osmo-trials").innerHTML=records.length?records.map((x,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(x.type)+'</td><td>'+x.inside+' / '+x.outside+'</td>'+
   '<td>'+esc(x.prediction||'—')+'</td><td>'+esc(x.direction)+'</td><td>'+esc(x.shape)+'</td></tr>').join(""):'<tr><td colspan="6">No trials recorded.</td></tr>';
 }
 el.addEventListener("click",ev=>{const b=ev.target.closest("[data-cell]");if(!b||!el.contains(b))return;if(type!==b.dataset.cell){type=b.dataset.cell;newConditions();}});
 el.addEventListener("input",ev=>{
  if(ev.target.id==="osmo-inside")inside=Number(ev.target.value);
  else if(ev.target.id==="osmo-outside")outside=Number(ev.target.value);
  else return;
  newConditions();
 });
 $("#osmo-predict").addEventListener("change",ev=>{prediction=ev.target.value;paint();});
 $("#osmo-record").onclick=()=>{if(challenge&&!revealed)return;records.push({...m(),type,inside,outside,prediction:challenge?prediction:""});paintTrials();$("#osmo-notice").textContent="Trial "+records.length+" recorded.";};
 $("#osmo-reset").onclick=()=>{type="plant";inside=30;outside=60;prediction="";$("#osmo-inside").value=inside;$("#osmo-outside").value=outside;newConditions();};
 $("#osmo-clear").onclick=()=>{records=[];paintTrials();};
 $("#osmo-download").onclick=()=>{
  const lines=["Osmosis Cell Response — Science 8","Trials (conceptual relative concentrations):",...records.map((x,i)=>(i+1)+". "+x.type+" cell; inside "+x.inside+", outside "+x.outside+"; prediction "+(x.prediction||"not made")+"; water "+x.direction+"; "+x.shape),"Explanation:",$("#osmo-explain").value.trim()];
  const url=URL.createObjectURL(new Blob([lines.join("\n\n")],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="osmosis-cell-response.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#osmo-notice").textContent="Investigation downloaded.";
 };
 paint();paintTrials();
 el.osmosisLab={get type(){return type},get result(){return m()},get records(){return records.slice()},set(a,b,t){inside=a;outside=b;type=t||type;newConditions();}};
}
H.osmosisResponseCore={outcome,explanations,drawing};
H.lessonTools=H.lessonTools||{};const prev=H.lessonTools["cells/transport"];
H.lessonTools["cells/transport"]=function(root){if(prev){const old=document.createElement("div");root.appendChild(old);prev(old);}const el=document.createElement("div");root.appendChild(el);render(el);};
})();