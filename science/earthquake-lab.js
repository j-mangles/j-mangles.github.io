/* Science 8 Earth booklet Topic 3: earthquake focus, epicentre and waves. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
function waveTravel(depthKm,horizontalKm){
 if(!Number.isFinite(depthKm)||depthKm<0||depthKm>700||!Number.isFinite(horizontalKm)||horizontalKm<0||horizontalKm>1000)throw Error("Invalid positions");
 const path=Math.hypot(depthKm,horizontalKm),speed=5; // illustrative constant speed
 return {pathKm:path,seconds:path/speed,focusDepthKm:depthKm,horizontalKm,speedKmS:speed};
}
const STEPS=[
 ["Fault movement","Stress can build when rocks lock across a fault. Sudden movement releases seismic energy."],
 ["Undersea displacement","Some large undersea earthquakes cause movement of the seafloor that pushes the water above."],
 ["Deep-ocean travel","The resulting tsunami can travel far across deep ocean while its wave height is relatively small."],
 ["Approaching a coast","In shallower water, a tsunami can slow and grow higher, depending on local conditions."]
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".eq{color:var(--ink);line-height:1.5;padding:11px 0 26px;min-width:0}.eq *{box-sizing:border-box}",
".eq h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 6px}.eq h3{font-size:1.05rem;margin:0 0 8px}",
".eq p{margin:7px 0 12px}.eq .note{font-size:.87rem;color:var(--muted)}",
".eq .layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:20px;margin:15px 0}",
".eq .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:12px}.eq svg{display:block;width:100%;height:auto}",
".eq svg text{font:600 14px var(--f-body,system-ui);fill:var(--ink)}.eq .controls{display:grid;gap:13px}",
".eq label{font-weight:650;font-size:.9rem;display:block}.eq input[type=range]{accent-color:var(--accent);width:100%;margin-top:12px}",
".eq .values{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0}",
".eq .value strong{display:block;font-size:1.35rem;font-variant-numeric:tabular-nums}",
".eq button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;min-height:39px;cursor:pointer}",
".eq button[aria-pressed=true]{color:var(--paper);background:var(--accent);border-color:var(--accent)}",
".eq button:focus-visible,.eq input:focus-visible,.eq textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".eq .actions,.eq .step-buttons{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.eq .step-buttons button{flex:1 1 160px;text-align:left;font-size:.89rem}",
".eq .step-info{padding:12px 14px;background:var(--soft);min-height:90px;border-radius:var(--radius,12px)}",
".eq .tablewrap{overflow-x:auto}.eq table{border-collapse:collapse;width:100%;font-size:.85rem}.eq th,.eq td{padding:7px;text-align:left;border-bottom:1px solid var(--rule)}",
".eq .prompt{margin:17px 0}.eq textarea{box-sizing:border-box;width:100%;min-height:90px;font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:8px;padding:10px;resize:vertical}",
"@media(max-width:735px){.eq .layout{grid-template-columns:1fr}}"
].join("\n");
function quakeSvg(depth,horizontal){
 const W=750,H=340,surface=85,cx=200,scaleX=4.3,scaleY=3.8;
 const fx=cx,fy=surface+depth*scaleY,sx=cx+horizontal*scaleX;
 return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Cross-section: underground focus directly below the epicentre and seismic wave path to a station on the surface">'+
 '<rect x="0" y="'+surface+'" width="'+W+'" height="'+(H-surface)+'" fill="color-mix(in srgb,var(--accent) 13%,var(--paper))"/>'+
 '<path d="M0 '+surface+' H'+W+'" stroke="var(--ink)" stroke-width="3"/>'+
 '<path d="M80 310 L'+(fx+85)+' 125" stroke="var(--muted)" stroke-width="4" stroke-dasharray="10 7"/>'+
 '<path d="M'+fx+' '+surface+' V'+fy+'" stroke="var(--muted)" stroke-width="2" stroke-dasharray="7 5"/>'+
 '<path d="M'+fx+' '+fy+' L'+sx+' '+surface+'" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/>'+
 '<circle cx="'+fx+'" cy="'+fy+'" r="12" fill="var(--accent)" stroke="var(--paper)" stroke-width="4"/>'+
 '<circle cx="'+fx+'" cy="'+surface+'" r="7" fill="var(--ink)"/>'+
 '<path d="M'+(sx-14)+' '+(surface-2)+' L'+sx+' '+(surface-21)+' L'+(sx+14)+' '+(surface-2)+' Z" fill="var(--accent)"/>'+
 '<text x="'+fx+'" y="39" text-anchor="middle">Epicentre</text><text x="'+fx+'" y="'+(fy+30)+'" text-anchor="middle">Focus</text>'+
 '<text x="'+sx+'" y="39" text-anchor="middle">Station</text>'+
 '<text x="'+((fx+sx)/2)+'" y="'+((fy+surface)/2+24)+'" text-anchor="middle">Wave path</text>'+
 '<text x="40" y="116">Crust</text><text x="570" y="321">Schematic, not to scale</text>'+
 '</svg>';
}
function build(el){
 let depth=20,distance=60,records=[],tsunami=0;
 el.innerHTML='<section class="eq"><style>'+css+'</style><h2>Earthquake Origins Lab</h2>'+
 '<p class="note">Find the earthquake focus, epicentre and seismic-wave path. Change focus depth and a station’s distance from the epicentre to compare the model travel distance.</p>'+
 '<div class="layout"><div class="diagram" id="eq-diagram"></div><div class="controls"><div><label for="eq-depth">Focus depth: <output id="eq-depth-value">20</output> km</label><input id="eq-depth" type="range" min="5" max="50" step="5" value="20"></div>'+
 '<div><label for="eq-distance">Station from epicentre: <output id="eq-distance-value">60</output> km</label><input id="eq-distance" type="range" min="0" max="100" step="10" value="60"></div>'+
 '<div class="values"><div class="value"><strong id="eq-path">—</strong><span class="note">Wave travel distance</span></div><div class="value"><strong id="eq-time">—</strong><span class="note">Illustrative travel time</span></div></div><p id="eq-status" role="status" class="note"></p></div></div>'+
 '<div class="actions"><button type="button" id="eq-record">Record trial</button><button type="button" id="eq-reset">Reset</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Focus depth</th><th>Station distance</th><th>Path</th><th>Time</th></tr></thead><tbody id="eq-trials"><tr><td colspan="5">No trials recorded.</td></tr></tbody></table></div>'+
 '<h3>How a tsunami can form</h3><p class="note">Not every undersea earthquake creates a tsunami. Follow one possible sequence.</p>'+
 '<div class="step-buttons" role="group" aria-label="Tsunami formation steps">'+STEPS.map((v,i)=>'<button type="button" data-tsunami="'+i+'" aria-pressed="'+(i===0)+'">'+(i+1)+'. '+esc(v[0])+'</button>').join("")+'</div>'+
 '<div class="step-info" id="eq-tsunami-info" aria-live="polite"></div>'+
 '<div class="prompt"><label for="eq-answer">Explain the difference between the focus and epicentre, and what your trials showed.</label><textarea id="eq-answer" placeholder="The focus is...; the epicentre is...; moving the station..."></textarea></div>'+
 '<div class="actions"><button type="button" id="eq-download">Download investigation</button><button type="button" id="eq-clear">Clear trials</button></div>'+
 '<p class="note" id="eq-message" role="status"></p>'+
 '<p class="note">Travel times assume one constant model wave speed of 5 km/s; real seismic waves have different speeds, paths and wave types. The tsunami sequence is conceptual and does not predict coastal hazards.</p></section>';
 const $=q=>el.querySelector(q);
 function paint(){
  const r=waveTravel(depth,distance);
  $("#eq-diagram").innerHTML=quakeSvg(depth,distance);
  $("#eq-path").textContent=r.pathKm.toFixed(1)+" km";$("#eq-time").textContent=r.seconds.toFixed(1)+" s";
  $("#eq-depth-value").textContent=depth;$("#eq-distance-value").textContent=distance;
  $("#eq-status").textContent="A deeper focus or a farther station makes the straight-line travel path longer in this simplified model.";
 }
 function table(){
  $("#eq-trials").innerHTML=records.length?records.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+r.depth+' km</td><td>'+r.distance+' km</td><td>'+r.result.pathKm.toFixed(1)+' km</td><td>'+r.result.seconds.toFixed(1)+' s</td></tr>').join(""):'<tr><td colspan="5">No trials recorded.</td></tr>';
 }
 function step(){
  $("#eq-tsunami-info").innerHTML='<b>'+esc(STEPS[tsunami][0])+'</b><p>'+esc(STEPS[tsunami][1])+'</p>';
  el.querySelectorAll("[data-tsunami]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.tsunami)===tsunami)));
 }
 el.addEventListener("click",ev=>{const b=ev.target.closest("[data-tsunami]");if(b){tsunami=Number(b.dataset.tsunami);step();}});
 $("#eq-depth").oninput=ev=>{depth=Number(ev.target.value);paint();};
 $("#eq-distance").oninput=ev=>{distance=Number(ev.target.value);paint();};
 $("#eq-record").onclick=()=>{records.push({depth,distance,result:waveTravel(depth,distance)});if(records.length>8)records.shift();table();};
 $("#eq-reset").onclick=()=>{depth=20;distance=60;$("#eq-depth").value=20;$("#eq-distance").value=60;paint();};
 $("#eq-clear").onclick=()=>{records=[];table();$("#eq-message").textContent="Trial records cleared.";};
 $("#eq-download").onclick=()=>{
  const report=["Earthquake Origins Lab — Science 8","Illustrative model trials:",...records.map((r,i)=>(i+1)+". Focus "+r.depth+" km deep; station "+r.distance+" km away; wave path "+r.result.pathKm.toFixed(1)+" km; time "+r.result.seconds.toFixed(1)+" s"),"Explanation:",$("#eq-answer").value.trim(),"Travel time uses a constant illustrative wave speed, not an observed seismogram."].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="earthquake-origins-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1100);$("#eq-message").textContent="Investigation downloaded.";
 };
 paint();table();step();
 el.earthquakeLab={get depth(){return depth},get distance(){return distance},get records(){return records.slice()},set(d,x){depth=d;distance=x;paint();}};
}
H.earthquakeCore={waveTravel,quakeSvg,steps:STEPS};
H.lessonTools=H.lessonTools||{};const old=H.lessonTools["earth/e11-quakes"];
H.lessonTools["earth/e11-quakes"]=function(root){const el=document.createElement("div");root.appendChild(el);build(el);if(old){const prev=document.createElement("div");root.appendChild(prev);old(prev);}};
})();