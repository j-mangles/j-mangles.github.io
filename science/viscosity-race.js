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
".vl .drop{position:absolute;top:4px;left:4px;width:19px;height:19px;border-radius:65% 65% 65% 10%;transform:rotate(-45deg);background:var(--accent);transition:left 1.1s ease-out}",
".vl .lane:last-child .drop{background:var(--muted)}.vl .time{font-variant-numeric:tabular-nums;font-weight:750;text-align:right}",
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
 '<div class="diagram"><h3>Flow comparison</h3><p class="note">The droplet travelling farther along its track represents faster flow. Both tracks use the same ramp angle, distance, amount and starting time.</p>'+
 '<div class="lane"><b>A</b><div class="track"><span class="drop" id="vl-drop-a"></span></div><span class="time" id="vl-time-a">—</span></div>'+
 '<div class="lane"><b>B</b><div class="track"><span class="drop" id="vl-drop-b"></span></div><span class="time" id="vl-time-b">—</span></div>'+
 '<div class="status" id="vl-status" role="status"></div><p class="note" id="vl-fair"></p></div>'+
 '<div class="buttons"><button type="button" id="vl-run">Run comparison</button><button type="button" id="vl-record">Record trial</button><button type="button" id="vl-reset">Reset controls</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Fluid A · °C</th><th>Index A</th><th>Fluid B · °C</th><th>Index B</th><th>Faster</th></tr></thead>'+
 '<tbody id="vl-trials"><tr><td colspan="6">No trials yet.</td></tr></tbody></table></div>'+
 '<div class="write"><label>What did the trials show?<textarea id="vl-evidence" placeholder="When we changed..., fluid ... moved more quickly..."></textarea></label>'+
 '<label>How would you make this a fair real-world test?<textarea id="vl-method" placeholder="Keep the same amount, ramp and starting line..."></textarea></label></div>'+
 '<div class="buttons"><button type="button" id="vl-download">Download investigation</button><button type="button" id="vl-clear">Clear trials</button></div><p class="note" id="vl-message" aria-live="polite"></p>'+
 '<p class="note">Model times are illustrative relative indexes, not measured seconds. In real life, different liquids may respond differently to temperature; density and viscosity are different properties.</p></section>';
 const $=s=>el.querySelector(s);
 function outcome(){return compare(setting.a,setting.ta,setting.b,setting.tb);}
 function readout(){
  const r=outcome();
  $("#vl-time-a").textContent=r.a.toFixed(1)+" units";$("#vl-time-b").textContent=r.b.toFixed(1)+" units";
  $("#vl-drop-a").style.left=Math.round(4+Math.min(1,2.6/r.a)*78)+"%";
  $("#vl-drop-b").style.left=Math.round(4+Math.min(1,2.6/r.b)*78)+"%";
  const winner=r.faster==="tie"?"Both travel at the same rate in this model.":"Fluid "+r.faster+" flows faster in this model.";
  $("#vl-status").textContent=winner;
  $("#vl-fair").textContent=r.fairTemperature?"Both fluids have the same temperature. This makes a fairer comparison between liquids.":"Temperatures differ. To compare which liquid is more viscous, match the temperatures first.";
  $("#vl-ta-out").textContent=setting.ta;$("#vl-tb-out").textContent=setting.tb;
 }
 function trials(){
  $("#vl-trials").innerHTML=records.length?records.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+e(FLUIDS[r.a].name)+' · '+r.ta+'</td><td>'+r.result.a.toFixed(1)+'</td><td>'+e(FLUIDS[r.b].name)+' · '+r.tb+'</td><td>'+r.result.b.toFixed(1)+'</td><td>'+r.result.faster+'</td></tr>').join(""):'<tr><td colspan="6">No trials yet.</td></tr>';
 }
 el.addEventListener("change",ev=>{const k=ev.target.dataset.fluid;if(k&&FLUIDS[ev.target.value]){setting[k]=ev.target.value;readout();}});
 el.addEventListener("input",ev=>{const k=ev.target.dataset.temperature;if(k){setting["t"+k]=Number(ev.target.value);readout();}});
 $("#vl-run").onclick=()=>{readout();$("#vl-message").textContent="Compare the values and record the result if you want to keep it.";};
 $("#vl-record").onclick=()=>{records.push({a:setting.a,b:setting.b,ta:setting.ta,tb:setting.tb,result:outcome()});if(records.length>8)records.shift();trials();$("#vl-message").textContent="Comparison recorded. Change one variable for the next trial.";};
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