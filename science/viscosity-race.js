/* Science 8 · Matter booklet Lesson 4: comparative viscosity race.
   Illustration only: model times are not laboratory measurements. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const FLUIDS={
 water:{name:"Water",resistance:1.0},
 oil:{name:"Vegetable oil",resistance:2.15},
 syrup:{name:"Syrup",resistance:5.6}
};
function flowIndex(fluid,temperature){
 if(!FLUIDS[fluid]||!Number.isFinite(temperature)||temperature<0||temperature>100)throw Error("Invalid model controls");
 // Illustrative: most liquids flow more readily when warmed.
 return Math.round((1.25+FLUIDS[fluid].resistance*Math.exp(-0.022*(temperature-20))*1.25)*10)/10;
}
function compare(f1,t1,f2,t2){
 const a=flowIndex(f1,t1),b=flowIndex(f2,t2);
 return {a,b,faster:a<b?"A":b<a?"B":"tie",fairTemperature:t1===t2};
}
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const style=[
".vl{border-top:1px solid var(--rule);padding-top:22px;margin:24px 0 10px;color:var(--ink);line-height:1.5;min-width:0}",
".vl *{box-sizing:border-box}.vl h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 6px}.vl h3{font-size:1.05rem;margin:0 0 10px}.vl p{margin:7px 0 14px}",
".vl .note{color:var(--muted);font-size:.86rem}.vl .controls{display:grid;grid-template-columns:1fr 1fr;gap:16px}",
".vl .control{padding:0 0 12px}.vl .control h3{margin-bottom:8px}",
".vl label{display:block;font-weight:650;font-size:.9rem;margin:11px 0 6px}",
".vl select,.vl textarea{width:100%;background:var(--paper);color:var(--ink);border:1px solid var(--rule);padding:10px;font:inherit;border-radius:var(--btn-radius,8px)}",
".vl input[type=range]{width:100%;accent-color:var(--accent)}",
".vl button{font:inherit;cursor:pointer;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 13px;min-height:40px}",
".vl button:focus-visible,.vl select:focus-visible,.vl input:focus-visible,.vl textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".vl .diagram{padding:17px;background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);margin:12px 0}",
".vl .lane{display:grid;grid-template-columns:80px minmax(0,1fr) 95px;gap:9px;align-items:center;margin:15px 0}",
".vl .track{height:27px;border:1px solid var(--rule);border-radius:999px;background:var(--paper);position:relative;overflow:hidden}",
".vl .track::after{content:'';position:absolute;right:9px;top:5px;bottom:5px;border-right:2px dashed var(--muted)}",
".vl .drop{position:absolute;top:4px;left:4px;width:19px;height:19px;border-radius:65% 65% 65% 10%;transform:rotate(-45deg);background:var(--accent);}",
".vl .course{position:absolute;inset:0 20px 0 3px}.vl .lane small{display:block;font-weight:400}.vl .lane:nth-of-type(2) .drop{background:var(--muted)}.vl .time{font-variant-numeric:tabular-nums;font-weight:750;text-align:right}",
".vl .buttons{display:flex;gap:9px;flex-wrap:wrap;margin:13px 0}.vl .status{min-height:42px;font-weight:650}",
".vl .tablewrap{overflow-x:auto;max-width:100%}.vl table{border-collapse:collapse;width:100%;font-size:.86rem}",
".vl th,.vl td{padding:8px;text-align:left;border-bottom:1px solid var(--rule)}.vl th{white-space:nowrap}",
".vl .write{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}.vl textarea{min-height:80px;resize:vertical}",
"@media(max-width:650px){.vl .controls,.vl .write{grid-template-columns:1fr}.vl .lane{grid-template-columns:36px minmax(0,1fr) 75px}}",
"@media(prefers-reduced-motion:reduce){.vl .drop{transition:none}}"
].join("\n");
function build(el){
 let setting={a:"water",b:"syrup",ta:20,tb:20},records=[];
 const select=(which)=>Object.entries(FLUIDS).map(([k,v])=>'<option value="'+k+'" '+(setting[which]===k?'selected':'')+'>'+e(v.name)+'</option>').join("");
 el.innerHTML='<section class="vl"><style>'+style+'</style><h2>Viscosity Ramp Lab</h2>'+
 '<p class="note">Compare how quickly two liquids flow down the same imaginary ramp. Change the liquid or its temperature. Use the results to plan a fair real-world test.</p>'+
 '<div class="controls">'+[["a","Fluid A"],["b","Fluid B"]].map(([k,label])=>'<div class="control"><h3>'+label+'</h3><label for="vl-'+k+'">Liquid</label><select id="vl-'+k+'" data-fluid="'+k+'">'+select(k)+'</select>'+
 '<label for="vl-t'+k+'">Temperature: <output id="vl-t'+k+'-out">20</output>°C</label><input type="range" id="vl-t'+k+'" data-temperature="'+k+'" min="5" max="55" step="5" value="20"></div>').join("")+'</div>'+
 '<div class="diagram"><h3>Flow comparison</h3><p class="note">Both drops start together on identical ramps. Move the clock to compare their positions at the same instant, or run the race from the start.</p>'+
 '<div class="lane"><b>A</b><div class="track"><span class="course"><span class="drop" id="vl-drop-a"></span></span></div><span class="time"><span id="vl-time-a">—</span><small id="vl-distance-a"></small></span></div>'+
 '<div class="lane"><b>B</b><div class="track"><span class="course"><span class="drop" id="vl-drop-b"></span></span></div><span class="time"><span id="vl-time-b">—</span><small id="vl-distance-b"></small></span></div>'+
 '<label for="vl-clock">Race clock · <output id="vl-clock-out"></output></label><input id="vl-clock" type="range" min="0" step="0.1" value="0">'+
 '<div class="status" id="vl-status" role="status"></div><p class="note" id="vl-fair"></p></div>'+
 '<div class="buttons"><button type="button" id="vl-run">Run comparison</button><button type="button" id="vl-pause" disabled>Pause</button><button type="button" id="vl-record">Record trial</button><button type="button" id="vl-reset">Reset controls</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Fluid A · °C</th><th>Index A</th><th>Fluid B · °C</th><th>Index B</th><th>Faster</th></tr></thead>'+
 '<tbody id="vl-trials"><tr><td colspan="6">No trials yet.</td></tr></tbody></table></div>'+
 '<div class="write"><label>What did the trials show?<textarea id="vl-evidence" placeholder="When we changed..., fluid ... moved more quickly..."></textarea></label>'+
 '<label>How would you make this a fair real-world test?<textarea id="vl-method" placeholder="Keep the same amount, ramp and starting line..."></textarea></label></div>'+
 '<div class="buttons"><button type="button" id="vl-download">Download investigation</button><button type="button" id="vl-clear">Clear trials</button></div><p class="note" id="vl-message" aria-live="polite"></p>'+
 '<p class="note">Model times are illustrative relative indexes, not measured seconds. In real life, different liquids may respond differently to temperature; density and viscosity are different properties.</p></section>';
 const $=s=>el.querySelector(s);
 function outcome(){return compare(setting.a,setting.ta,setting.b,setting.tb);}
 let frame=null, elapsed=0;
 function stop(){
  if(frame!==null)cancelAnimationFrame(frame);
  frame=null;
  $("#vl-pause").disabled=true;
 }
 function placeDrops(time,r){
  elapsed=time;
  $("#vl-clock").value=time;
  $("#vl-clock-out").textContent=time.toFixed(1)+" model units";
  for(const key of ["a","b"]){
   const progress=Math.min(1,time/r[key]);
   $("#vl-drop-"+key).style.left=(progress*100)+"%";
   $("#vl-distance-"+key).textContent=Math.round(progress*100)+"% of ramp";
  }
 }
 function replay(){
  stop();
  const r=outcome(),end=Math.max(r.a,r.b);
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
   placeDrops(Math.min(r.a,r.b),r);
   $("#vl-message").textContent="Showing the first finish. Use the clock to inspect both drops.";
   return;
  }
  placeDrops(0,r);
  $("#vl-message").textContent="Both drops start together.";
  $("#vl-pause").disabled=false;
  const start=performance.now();
  function tick(now){
   if(!el.isConnected){stop();return;}
   placeDrops(Math.min(end,(now-start)*end/3500),r);
   if(elapsed<end)frame=requestAnimationFrame(tick);
   else{stop();$("#vl-message").textContent="Both drops reached the line. Move the clock back to compare their positions.";}
  }
  frame=requestAnimationFrame(tick);
 }
 function readout(){
  const r=outcome();
  $("#vl-time-a").textContent=r.a.toFixed(1)+" units";$("#vl-time-b").textContent=r.b.toFixed(1)+" units";
  stop();
  $("#vl-clock").max=Math.max(r.a,r.b);
  placeDrops(Math.min(r.a,r.b),r);
  const winner=r.faster==="tie"?"Both travel at the same rate in this model.":"Fluid "+r.faster+" flows faster in this model.";
  $("#vl-status").textContent=winner;
  const sameLiquid=setting.a===setting.b;
  $("#vl-fair").textContent=r.fairTemperature
   ? (sameLiquid?"Both samples are identical. Use this as a control.":"Temperature is held constant. This pair isolates the effect of liquid type.")
   : (sameLiquid?"Temperatures differ for the same liquid. This pair isolates the effect of temperature.":"Temperatures differ and the liquids differ. Change only one to isolate its effect.");
  $("#vl-message").textContent="Clock set to the first finish.";
  $("#vl-ta-out").textContent=setting.ta;$("#vl-tb-out").textContent=setting.tb;
 }
 function trials(){
  $("#vl-trials").innerHTML=records.length?records.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+e(FLUIDS[r.a].name)+' · '+r.ta+'</td><td>'+r.result.a.toFixed(1)+'</td><td>'+e(FLUIDS[r.b].name)+' · '+r.tb+'</td><td>'+r.result.b.toFixed(1)+'</td><td>'+r.result.faster+'</td></tr>').join(""):'<tr><td colspan="6">No trials yet.</td></tr>';
 }
 el.addEventListener("change",ev=>{const k=ev.target.dataset.fluid;if(k&&FLUIDS[ev.target.value]){setting[k]=ev.target.value;readout();}});
 el.addEventListener("input",ev=>{const k=ev.target.dataset.temperature;if(k){setting["t"+k]=Number(ev.target.value);readout();}});
 $("#vl-run").onclick=replay;
 $("#vl-pause").onclick=()=>{stop();$("#vl-message").textContent="Race paused. Move the clock to inspect another instant.";};
 $("#vl-clock").oninput=ev=>{stop();placeDrops(Number(ev.target.value),outcome());$("#vl-message").textContent="Comparing both drops at the selected instant.";};
 $("#vl-record").onclick=()=>{records.push({a:setting.a,b:setting.b,ta:setting.ta,tb:setting.tb,result:outcome()});trials();$("#vl-message").textContent="Comparison recorded. Change one variable for the next trial.";};
 $("#vl-reset").onclick=()=>{setting={a:"water",b:"syrup",ta:20,tb:20};$("#vl-a").value=setting.a;$("#vl-b").value=setting.b;$("#vl-ta").value=20;$("#vl-tb").value=20;readout();};
 $("#vl-clear").onclick=()=>{records=[];trials();$("#vl-message").textContent="Trial records cleared.";};
 $("#vl-download").onclick=()=>{
  const report=["Viscosity Ramp Lab — Grade 8 Science","Illustrative comparison indexes:",...records.map((r,i)=>(i+1)+". "+FLUIDS[r.a].name+" "+r.ta+"°C: "+r.result.a+"; "+FLUIDS[r.b].name+" "+r.tb+"°C: "+r.result.b+"; faster "+r.result.faster),"Evidence:",$("#vl-evidence").value.trim(),"Fair test method:",$("#vl-method").value.trim(),"These values are teaching indexes, not measured seconds."].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="viscosity-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);$("#vl-message").textContent="Investigation downloaded.";
 };
 readout();trials();
 el.viscosityRace={get setting(){return {...setting}},get records(){return records.slice()},set(next){Object.assign(setting,next);readout();}};
}
H.viscosityCore={fluids:FLUIDS,flowIndex,compare};
H.lessonTools=H.lessonTools||{};const previous=H.lessonTools["matter/viscosity"];
H.lessonTools["matter/viscosity"]=function(root){const head=document.createElement("div");root.appendChild(head);build(head);if(previous){const below=document.createElement("div");root.appendChild(below);previous(below);}};
})();