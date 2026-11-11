/* Science 8 Earth booklet Topic 2: seafloor spreading evidence model.
   Illustrative magnetic reversal intervals, not a real ocean-floor map. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
function ageAt(distanceKm,rateCmYr){
 if(!Number.isFinite(distanceKm)||distanceKm<0||distanceKm>1000||!Number.isFinite(rateCmYr)||rateCmYr<=0||rateCmYr>20)throw Error("Invalid spreading inputs");
 return distanceKm/(rateCmYr*10); // 1 cm/yr = 10 km per million years.
}
function evidence(distanceKm,rateCmYr){
 const age=ageAt(distanceKm,rateCmYr);
 return {ageMyr:age,polarity:Math.floor(age)%2===0?"A":"B",oppositeAgeMyr:age,olderFarther:true};
}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".sf{color:var(--ink);line-height:1.5;padding:12px 0 25px;min-width:0}.sf *{box-sizing:border-box}",
".sf h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 6px}.sf h3{font-size:1.05rem;margin:0 0 9px}",
".sf .note{color:var(--muted);font-size:.86rem;max-width:72ch}",
".sf .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);overflow:hidden;margin:14px 0}",
".sf svg{display:block;width:100%;height:auto}.sf svg text{font:600 14px var(--f-body,system-ui);fill:var(--ink)}",
".sf .controls{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0}.sf label{display:block;font-weight:650;font-size:.9rem;margin:8px 0}",
".sf input[type=range]{width:100%;accent-color:var(--accent)}",
".sf .readouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:14px 0}",
".sf .reading{border-bottom:1px solid var(--rule);padding-bottom:10px}.sf .reading b{display:block;font-size:1.32rem;font-variant-numeric:tabular-nums}",
".sf .reading small{color:var(--muted);font-size:.83rem}.sf button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;min-height:39px;cursor:pointer}",
".sf button:focus-visible,.sf input:focus-visible,.sf textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".sf .actions{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}.sf .tablewrap{max-width:100%;overflow-x:auto}",
".sf table{width:100%;border-collapse:collapse;font-size:.86rem}.sf th,.sf td{border-bottom:1px solid var(--rule);padding:8px;text-align:left}.sf th{white-space:nowrap}",
".sf .questions{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:18px}.sf textarea{display:block;box-sizing:border-box;width:100%;min-height:88px;font:inherit;resize:vertical;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;padding:10px}",
"@media(max-width:640px){.sf .controls,.sf .questions{grid-template-columns:1fr}.sf .readouts{grid-template-columns:1fr 1fr}}"
].join("\n");
function svg(rate,distance){
 const W=800,H=265,centre=W/2,scale=3.3,extent=180,intervalKm=rate*10,selected=distance*scale,fragments=[];
 const background=rate?Math.ceil(extent/intervalKm):0;
 for(let i=0;i<background;i++){
  const start=i*intervalKm*scale,end=Math.min(extent*scale,(i+1)*intervalKm*scale),width=end-start;
  const fill=i%2===0?"color-mix(in srgb,var(--accent) 31%,var(--paper))":"color-mix(in srgb,var(--muted) 29%,var(--paper))";
  fragments.push('<rect x="'+(centre-end).toFixed(2)+'" y="93" width="'+width.toFixed(2)+'" height="105" fill="'+fill+'"/>');
  fragments.push('<rect x="'+(centre+start).toFixed(2)+'" y="93" width="'+width.toFixed(2)+'" height="105" fill="'+fill+'"/>');
 }
 const x1=centre-selected,x2=centre+selected;
 return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Symmetrical bands of young and old seafloor on each side of a mid-ocean ridge. Selected sites are equally far from the ridge.">'+
 '<rect x="0" y="93" width="800" height="105" fill="var(--paper)"/>'+fragments.join("")+
 '<path d="M400 78 L400 205" stroke="var(--ink)" stroke-width="4" stroke-dasharray="6 4"/>'+
 '<path d="M400 93 Q390 69 381 93 M400 93 Q410 69 419 93" fill="none" stroke="var(--accent)" stroke-width="5"/>'+
 '<path d="M384 50 L270 50 M416 50 L530 50" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>'+
 '<path d="M270 50 L283 43 L283 57 Z M530 50 L517 43 L517 57 Z" fill="var(--accent)"/>'+
 '<text x="400" y="27" text-anchor="middle">Mid-ocean ridge · youngest rock</text>'+
 '<text x="210" y="75" text-anchor="middle">Older ←</text><text x="590" y="75" text-anchor="middle">→ Older</text>'+
 '<path d="M'+x1.toFixed(1)+' 86 V206 M'+x2.toFixed(1)+' 86 V206" stroke="var(--ink)" stroke-width="3" stroke-dasharray="4 4"/>'+
 '<circle cx="'+x1.toFixed(1)+'" cy="146" r="9" fill="var(--accent)" stroke="var(--paper)" stroke-width="3"/>'+
 '<circle cx="'+x2.toFixed(1)+'" cy="146" r="9" fill="var(--accent)" stroke="var(--paper)" stroke-width="3"/>'+
 '<text x="'+x1.toFixed(1)+'" y="221" text-anchor="middle">Sample A</text>'+
 '<text x="'+x2.toFixed(1)+'" y="221" text-anchor="middle">Sample B</text>'+
 '<text x="400" y="253" text-anchor="middle" font-size="11">Illustrative magnetic polarity bands · not a real geological reversal chronology</text></svg>';
}
function build(el){
 let rate=3,distance=60,trials=[];
 el.innerHTML='<section class="sf"><style>'+css+'</style><h2>Seafloor Spreading Lab</h2>'+
 '<p class="note">At a mid-ocean ridge, new oceanic crust forms and moves away as plates separate. Explore why rock ages and matching magnetic stripes on both sides are evidence of spreading.</p>'+
 '<div class="diagram" id="sf-diagram"></div><div class="controls">'+
 '<div><label for="sf-rate">Plate movement: <output id="sf-rate-val">3</output> cm/year (each side)</label><input id="sf-rate" type="range" min="1" max="6" step="0.5" value="3"></div>'+
 '<div><label for="sf-distance">Distance from ridge: <output id="sf-distance-val">60</output> km</label><input id="sf-distance" type="range" min="0" max="150" step="10" value="60"></div></div>'+
 '<div class="readouts"><div class="reading"><b id="sf-age">—</b><small>Estimated age, each sample</small></div>'+
 '<div class="reading"><b id="sf-bands">—</b><small>Illustrative magnetic band</small></div>'+
 '<div class="reading"><b id="sf-comparison">—</b><small>Age comparison across ridge</small></div></div>'+
 '<p class="note" id="sf-explain" role="status"></p>'+
 '<div class="actions"><button id="sf-record" type="button">Record trial</button><button id="sf-reset" type="button">Reset</button></div>'+
 '<div class="tablewrap"><table><thead><tr><th>Trial</th><th>Rate (cm/yr)</th><th>Distance (km)</th><th>Age (Myr)</th><th>Stripe</th></tr></thead><tbody id="sf-trials"><tr><td colspan="5">No trials recorded.</td></tr></tbody></table></div>'+
 '<div class="questions"><label>Where is the youngest ocean-floor rock, and why?<textarea id="sf-answer1" placeholder="The youngest rocks are... because..."></textarea></label>'+
 '<label>How do matching magnetic patterns support seafloor spreading?<textarea id="sf-answer2" placeholder="Both sides show... This suggests..."></textarea></label></div>'+
 '<div class="actions"><button id="sf-download" type="button">Download investigation</button><button id="sf-clear" type="button">Clear trials</button></div>'+
 '<p class="note" id="sf-message" aria-live="polite"></p>'+
 '<p class="note">Calculation assumes a constant spreading rate: 1 cm/year corresponds to 10 km in one million years. Magnetic stripes alternate in this teaching model every model million years; actual reversals are irregular and would require a real ocean-floor dataset.</p></section>';
 const $=s=>el.querySelector(s);
 function model(){return evidence(distance,rate);}
 function paint(){
  const r=model();
  $("#sf-diagram").innerHTML=svg(rate,distance);
  $("#sf-rate-val").textContent=String(rate);$("#sf-distance-val").textContent=String(distance);
  $("#sf-age").textContent=r.ageMyr.toFixed(2)+" Myr";
  $("#sf-bands").textContent="Band "+r.polarity;
  $("#sf-comparison").textContent="Same age";
  $("#sf-explain").textContent="A rock "+distance+" km on either side is about "+r.ageMyr.toFixed(2)+" million years old at "+rate+" cm/year. Rocks near the ridge are younger; farther rocks are older.";
 }
 function showTrials(){
  $("#sf-trials").innerHTML=trials.length?trials.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+t.rate+'</td><td>'+t.distance+'</td><td>'+t.r.ageMyr.toFixed(2)+'</td><td>'+t.r.polarity+'</td></tr>').join(""):'<tr><td colspan="5">No trials recorded.</td></tr>';
 }
 $("#sf-rate").oninput=ev=>{rate=Number(ev.target.value);paint();};
 $("#sf-distance").oninput=ev=>{distance=Number(ev.target.value);paint();};
 $("#sf-record").onclick=()=>{trials.push({rate,distance,r:model()});if(trials.length>8)trials.shift();showTrials();};
 $("#sf-reset").onclick=()=>{rate=3;distance=60;$("#sf-rate").value=3;$("#sf-distance").value=60;paint();};
 $("#sf-clear").onclick=()=>{trials=[];showTrials();$("#sf-message").textContent="Trial records cleared.";};
 $("#sf-download").onclick=()=>{
  const report=["Seafloor Spreading Lab — Science 8","Illustrative constant-rate model:",...trials.map((t,i)=>(i+1)+". Rate "+t.rate+" cm/year, distance "+t.distance+" km, age "+t.r.ageMyr.toFixed(2)+" million years, band "+t.r.polarity),"Where is the youngest rock, and why?",$("#sf-answer1").value.trim(),"How do magnetic patterns support seafloor spreading?",$("#sf-answer2").value.trim(),"Bands are illustrative, not historical polarity data."].join("\n\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="seafloor-spreading-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$("#sf-message").textContent="Investigation downloaded.";
 };
 paint();showTrials();
 el.seafloorLab={model,get rate(){return rate},get distance(){return distance},get trials(){return trials.slice()},set(next){if(Number.isFinite(next.rate))rate=next.rate;if(Number.isFinite(next.distance))distance=next.distance;paint();}};
}
H.seafloorCore={ageAt,evidence,svg};
H.lessonTools=H.lessonTools||{};const old=H.lessonTools["earth/e6-seafloor"];
H.lessonTools["earth/e6-seafloor"]=function(root){const el=document.createElement("div");root.appendChild(el);build(el);if(old){const prev=document.createElement("div");root.appendChild(prev);old(prev);}};
})();