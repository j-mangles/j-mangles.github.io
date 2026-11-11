/* Matter Unit Topic 5 · Freshwater lake density.
   Quantities illustrate a relationship, not measured lake water. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
function relativeDensity(temperature,phase){
 if(!Number.isFinite(temperature)||temperature<0||temperature>30||!["liquid","ice"].includes(phase))throw Error("Invalid lake model input");
 if(phase==="ice")return 0.92;
 return Math.round((1-0.000015*(temperature-4)*(temperature-4))*10000)/10000;
}
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".wl{color:var(--ink);line-height:1.5;padding:12px 0 24px;min-width:0}.wl *{box-sizing:border-box}",
".wl h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 6px}.wl h3{font-size:1.05rem;margin:0 0 8px}",
".wl p{margin:6px 0 12px}.wl .note{color:var(--muted);font-size:.86rem}",
".wl .layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px;align-items:start}",
".wl .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:12px}",
".wl svg{display:block;width:100%;height:auto}.wl svg text{fill:var(--ink);font:600 14px var(--f-body,system-ui)}",
".wl .controls{display:grid;gap:12px}.wl input[type=range]{width:100%;accent-color:var(--accent)}",
".wl label{display:block;font-size:.9rem;font-weight:650}.wl button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;min-height:39px;cursor:pointer}",
".wl button[aria-pressed=true]{background:var(--accent);color:var(--paper);border-color:var(--accent)}",
".wl button:focus-visible,.wl textarea:focus-visible,.wl input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".wl .choices,.wl .actions{display:flex;flex-wrap:wrap;gap:8px}.wl .read{font-size:1.6rem;font-weight:800;font-variant-numeric:tabular-nums}",
".wl .tablewrap{overflow-x:auto}.wl table{border-collapse:collapse;width:100%;font-size:.86rem}.wl th,.wl td{padding:8px;border-bottom:1px solid var(--rule);text-align:left}",
".wl textarea{box-sizing:border-box;width:100%;min-height:88px;font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);padding:10px;border-radius:8px;resize:vertical}",
"@media(max-width:740px){.wl .layout{grid-template-columns:1fr}}"
].join("\n");
function lakeSvg(t,phase){
 const density=relativeDensity(t,phase),ice=phase==="ice",y=ice?72:180+(1-density)*10000;
 return '<svg viewBox="0 0 640 370" role="img" aria-label="Simplified winter lake cross-section with surface ice and colder and denser water below">'+
 '<rect x="35" y="66" width="570" height="273" rx="16" fill="color-mix(in srgb,var(--accent) 10%,var(--paper))" stroke="var(--rule)" stroke-width="2"/>'+
 '<rect x="36" y="67" width="568" height="49" rx="15" fill="color-mix(in srgb,var(--accent) 29%,var(--paper))"/>'+
 '<path d="M36 116H604" stroke="var(--accent)" stroke-width="3"/>'+
 '<text x="54" y="96">Surface ice · 0°C · less dense</text>'+
 '<text x="54" y="159">Cold water near surface</text>'+
 '<text x="54" y="282">Denser liquid water · near 4°C</text>'+
 '<rect x="390" y="'+Math.min(300,Math.max(70,y)).toFixed(0)+'" width="128" height="39" rx="12" fill="var(--paper)" stroke="var(--accent)" stroke-width="3"/>'+
 '<text x="454" y="'+(Math.min(300,Math.max(70,y))+25).toFixed(0)+'" text-anchor="middle">Sample</text>'+
 '<text x="320" y="29" text-anchor="middle">'+(ice?"Ice sample":t+"°C liquid sample")+' · density index '+density.toFixed(4)+'</text>'+
 '<text x="320" y="359" text-anchor="middle" font-size="11">Layer positions are symbolic and not a physical sinking-speed simulation.</text></svg>';
}
function render(el){
 let temperature=10,phase="liquid",trials=[];
 el.innerHTML='<section class="wl"><style>'+css+'</style><h2>Why Ice Floats: Lake Layers</h2>'+
 '<p class="note">Liquid freshwater is densest near 4°C. Ice is less dense than liquid water, so it can form an insulating layer at the surface while liquid water remains below.</p>'+
 '<div class="layout"><div class="diagram" id="wl-diagram"></div><div class="controls">'+
 '<div><h3>Sample state</h3><div class="choices"><button type="button" data-phase="liquid" aria-pressed="true">Liquid water</button><button type="button" data-phase="ice" aria-pressed="false">Ice</button></div></div>'+
 '<div><label for="wl-temp">Liquid temperature: <output id="wl-temp-value">10°C</output></label><input type="range" id="wl-temp" min="0" max="30" step="2" value="10"></div>'+
 '<div><h3>Compare density</h3><div class="read" id="wl-density">—</div><p id="wl-explain" role="status"></p></div></div></div>'+
 '<div class="actions"><button id="wl-record" type="button">Record sample</button><button id="wl-reset" type="button">Reset</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Sample</th><th>Temperature</th><th>Density index</th></tr></thead><tbody id="wl-trials"><tr><td colspan="4">No trials recorded.</td></tr></tbody></table></div>'+
 '<h3>Explain the lake</h3><label for="wl-answer">What happens to fish and other organisms below the ice in winter?</label>'+
 '<textarea id="wl-answer" placeholder="Explain what the ice layer does and why water stays beneath it."></textarea>'+
 '<div class="actions"><button type="button" id="wl-download">Download investigation</button><button type="button" id="wl-clear">Clear trials</button></div>'+
 '<p id="wl-message" class="note" role="status"></p>'+
 '<p class="note">Relative density values use a deliberately simplified model, not laboratory measurements. Real water density also depends on substances dissolved in it. This model covers freshwater near normal classroom conditions.</p></section>';
 const $=s=>el.querySelector(s);
 function paint(){
  const d=relativeDensity(temperature,phase);
  $("#wl-diagram").innerHTML=lakeSvg(temperature,phase);$("#wl-density").textContent=d.toFixed(4);
  $("#wl-temp-value").textContent=temperature+"°C";$("#wl-temp").disabled=phase==="ice";
  el.querySelectorAll("[data-phase]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.phase===phase)));
  $("#wl-explain").textContent=phase==="ice"?"Ice's more open structure lowers its density compared with liquid water. Surface ice floats.":
   temperature===4?"In this model, liquid freshwater is at its greatest density near 4°C.":
   "At "+temperature+"°C, this liquid-water sample is slightly less dense than 4°C water. Water near 4°C tends to stay deeper in a winter lake.";
 }
 function history(){
  $("#wl-trials").innerHTML=trials.length?trials.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+e(r.phase)+'</td><td>'+r.temperature+'°C</td><td>'+r.density.toFixed(4)+'</td></tr>').join(""):'<tr><td colspan="4">No trials recorded.</td></tr>';
 }
 el.addEventListener("click",event=>{const b=event.target.closest("[data-phase]");if(b){phase=b.dataset.phase;paint();}});
 $("#wl-temp").oninput=ev=>{temperature=Number(ev.target.value);paint();};
 $("#wl-record").onclick=()=>{trials.push({phase,temperature:phase==="ice"?0:temperature,density:relativeDensity(temperature,phase)});if(trials.length>8)trials.shift();history();};
 $("#wl-reset").onclick=()=>{phase="liquid";temperature=10;$("#wl-temp").value=10;paint();};
 $("#wl-clear").onclick=()=>{trials=[];history();$("#wl-message").textContent="Recorded samples cleared.";};
 $("#wl-download").onclick=()=>{
  const report=["Why Ice Floats — Freshwater Lake Lab","Illustrative model trials:",...trials.map((r,i)=>(i+1)+". "+r.phase+" "+r.temperature+"°C, density index "+r.density.toFixed(4)),"Why can living things remain below lake ice?",$("#wl-answer").value.trim(),"Relative density indexes are simplified, not measured values."].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="lake-density-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$("#wl-message").textContent="Investigation downloaded.";
 };
 paint();history();
 el.lakeLab={get temperature(){return temperature},get phase(){return phase},get records(){return trials.slice()},set(t,p){temperature=t;phase=p;paint();}};
}
H.lakeDensityCore={relativeDensity,lakeSvg};
H.lessonTools=H.lessonTools||{};const old=H.lessonTools["matter/water"];
H.lessonTools["matter/water"]=function(root){const first=document.createElement("div");root.appendChild(first);render(first);if(old){const below=document.createElement("div");root.appendChild(below);old(below);}};
})();