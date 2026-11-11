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
function drawing(type,r){
 const shrink=r.direction==="out",expand=r.direction==="in",scale=shrink?.72:expand?1.04:.88;
 const cx=280,cy=180,shell=type==="plant"?
 '<rect x="150" y="66" width="260" height="216" rx="29" fill="color-mix(in srgb,var(--accent) 16%,var(--paper))" stroke="var(--accent)" stroke-width="12"/>':
 '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(126*scale).toFixed(1)+'" ry="'+(100*scale).toFixed(1)+'" fill="color-mix(in srgb,var(--accent) 17%,var(--paper))" stroke="var(--accent)" stroke-width="5"/>';
 const contents=type==="plant"?
 '<rect x="'+(cx-115*scale).toFixed(1)+'" y="'+(cy-87*scale).toFixed(1)+'" width="'+(230*scale).toFixed(1)+'" height="'+(174*scale).toFixed(1)+'" rx="24" fill="color-mix(in srgb,var(--accent) 22%,var(--paper))" stroke="var(--ink)" stroke-opacity=".55" stroke-width="3"/>'+
 '<rect x="'+(cx-83*scale).toFixed(1)+'" y="'+(cy-63*scale).toFixed(1)+'" width="'+(166*scale).toFixed(1)+'" height="'+(125*scale).toFixed(1)+'" rx="21" fill="color-mix(in srgb,var(--accent) 43%,var(--paper))" stroke="var(--accent)" stroke-width="3"/>'+
 '<text x="280" y="182" text-anchor="middle">Vacuole</text>':
 '<ellipse cx="'+(cx-21*scale).toFixed(1)+'" cy="'+(cy-10*scale).toFixed(1)+'" rx="'+(34*scale).toFixed(1)+'" ry="'+(30*scale).toFixed(1)+'" fill="color-mix(in srgb,var(--accent) 49%,var(--paper))" stroke="var(--accent)" stroke-width="3"/>'+
 '<text x="280" y="245" text-anchor="middle">Animal cell</text>';
 const left=type==="plant"?152:280-126*scale,right=type==="plant"?410:280+126*scale;
 const arrows=r.direction==="balanced"?'<text x="280" y="331" text-anchor="middle">Water moves both ways · no strong net movement</text>':
 r.direction==="in"?
 '<path d="M85 176H'+(left-12).toFixed(1)+' M475 176H'+(right+12).toFixed(1)+'" stroke="var(--accent)" stroke-width="5" stroke-dasharray="7 5"/>'+
 '<path d="M'+(left-13).toFixed(1)+' 176 l-14 -8 v16Z M'+(right+13).toFixed(1)+' 176 l14 -8 v16Z" fill="var(--accent)" transform="rotate(180 280 176)"/>':
 '<path d="M'+left.toFixed(1)+' 176H80 M'+right.toFixed(1)+' 176H480" stroke="var(--accent)" stroke-width="5" stroke-dasharray="7 5"/>'+
 '<path d="M80 176 l15 -8 v16Z M480 176 l-15 -8 v16Z" fill="var(--accent)"/>';
 return '<svg viewBox="0 0 560 370" role="img" aria-label="'+esc(type)+' cell, '+esc(r.shape)+'. Net water movement: '+esc(r.direction)+'.">'+
 '<text x="280" y="31" text-anchor="middle">Cell and surrounding solution</text>'+shell+contents+arrows+
 '<text x="280" y="353" text-anchor="middle">Conceptual volumes · not a scale drawing or measured flow rate</text></svg>';
}
function render(el){
 let type="plant",inside=30,outside=60,prediction="",records=[];
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="osmo"><style>'+css+'</style><h2>Osmosis: What Happens to a Cell?</h2>'+
 '<p class="note">Change the amount of dissolved material inside and outside a cell. Follow the overall movement of water and see how plant and animal cells respond differently.</p>'+
 '<div class="types" role="group" aria-label="Choose cell type"><button data-cell="plant" aria-pressed="true">Plant cell</button>'+
 '<button data-cell="animal" aria-pressed="false">Animal cell</button></div>'+
 '<div class="layout"><div class="diagram" id="osmo-diagram"></div><div class="controls">'+
 '<div class="control"><label for="osmo-inside">Dissolved material inside <output id="osmo-inside-value">30</output></label>'+
 '<input type="range" id="osmo-inside" min="0" max="100" step="10" value="30"></div>'+
 '<div class="control"><label for="osmo-outside">Dissolved material outside <output id="osmo-outside-value">60</output></label>'+
 '<input type="range" id="osmo-outside" min="0" max="100" step="10" value="60"></div>'+
 '<div><label for="osmo-predict"><b>Predict the overall movement of water</b></label>'+
 '<select id="osmo-predict"><option value="">Make a prediction</option><option value="in">Into the cell</option>'+
 '<option value="out">Out of the cell</option><option value="balanced">No strong net movement</option></select></div>'+
 '<div class="readout" id="osmo-reading" aria-live="polite"></div><p class="feedback" id="osmo-feedback" aria-live="polite"></p></div></div>'+
 '<div class="actions"><button id="osmo-record" type="button">Record trial</button><button id="osmo-reset" type="button">Reset comparison</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Cell</th><th>Inside / outside</th><th>Water moves</th><th>Effect</th></tr></thead>'+
 '<tbody id="osmo-trials"><tr><td colspan="5">No trials recorded.</td></tr></tbody></table></div>'+
 '<label for="osmo-explain"><b>Explain why two cells respond differently in the same surrounding solution.</b></label>'+
 '<textarea id="osmo-explain" placeholder="A plant cell has a cell wall, so... An animal cell..."></textarea>'+
 '<div class="actions"><button id="osmo-download" type="button">Download investigation</button><button id="osmo-clear" type="button">Clear trials</button></div>'+
 '<p class="note" id="osmo-notice" role="status"></p>'+
 '<p class="note">The sliders show relative solute concentration only, not percentages or actual cell measurements. The model predicts a direction, not a rate. Real membranes also contain transport proteins and regulate ions.</p></section>';
 function m(){return outcome(inside,outside,type);}
 function paint(){
  const r=m();$("#osmo-diagram").innerHTML=drawing(type,r);
  $("#osmo-inside-value").textContent=inside;$("#osmo-outside-value").textContent=outside;
  el.querySelectorAll("[data-cell]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cell===type)));
  $("#osmo-reading").innerHTML='<h3>'+esc(r.shape[0].toUpperCase()+r.shape.slice(1))+' '+type+' cell</h3><p>'+esc(explanations[type][r.shape])+'</p>';
  $("#osmo-feedback").textContent=prediction?(prediction===r.direction?"Your prediction matches the model.":"Your prediction differs. Water moves overall toward the side with more dissolved solute."):"Predict the direction, then compare with the model.";
 }
 function paintTrials(){
  $("#osmo-trials").innerHTML=records.length?records.map((x,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(x.type)+'</td><td>'+x.inside+' / '+x.outside+'</td>'+
   '<td>'+esc(x.direction)+'</td><td>'+esc(x.shape)+'</td></tr>').join(""):'<tr><td colspan="5">No trials recorded.</td></tr>';
 }
 el.addEventListener("click",ev=>{const b=ev.target.closest("[data-cell]");if(!b||!el.contains(b))return;type=b.dataset.cell;paint();});
 el.addEventListener("input",ev=>{
  if(ev.target.id==="osmo-inside")inside=Number(ev.target.value);
  else if(ev.target.id==="osmo-outside")outside=Number(ev.target.value);
  else return;
  paint();
 });
 $("#osmo-predict").addEventListener("change",ev=>{prediction=ev.target.value;paint();});
 $("#osmo-record").onclick=()=>{records.push({...m(),type,inside,outside});if(records.length>8)records.shift();paintTrials();};
 $("#osmo-reset").onclick=()=>{type="plant";inside=30;outside=60;prediction="";$("#osmo-inside").value=inside;$("#osmo-outside").value=outside;$("#osmo-predict").value="";paint();};
 $("#osmo-clear").onclick=()=>{records=[];paintTrials();};
 $("#osmo-download").onclick=()=>{
  const lines=["Osmosis Cell Response — Science 8","Trials (conceptual relative concentrations):",...records.map((x,i)=>(i+1)+". "+x.type+" cell; inside "+x.inside+", outside "+x.outside+"; water "+x.direction+"; "+x.shape),"Explanation:",$("#osmo-explain").value.trim()];
  const url=URL.createObjectURL(new Blob([lines.join("\n\n")],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="osmosis-cell-response.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#osmo-notice").textContent="Investigation downloaded.";
 };
 paint();paintTrials();
 el.osmosisLab={get type(){return type},get result(){return m()},get records(){return records.slice()},set(a,b,t){inside=a;outside=b;type=t||type;paint();}};
}
H.osmosisResponseCore={outcome,explanations,drawing};
H.lessonTools=H.lessonTools||{};const prev=H.lessonTools["cells/transport"];
H.lessonTools["cells/transport"]=function(root){if(prev){const old=document.createElement("div");root.appendChild(old);prev(old);}const el=document.createElement("div");root.appendChild(el);render(el);};
})();