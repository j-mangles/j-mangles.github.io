(function installHomeostasis() {
"use strict";
/* Temperature homeostasis: an intentionally simplified Grade 8 feedback model.
   Not a clinical or physiological prediction; all simulated rates are illustrative. */
const H=window.HUB;if(!H)return;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const SET=37;
function simulateStep(temperature, ambient, active, regulated){
  const external=(ambient-22)*0.012;
  const exertion=active?0.12:0;
  const regulation=regulated?clamp(-0.65*(temperature-SET),-0.25,0.25):0;
  return {temperature:clamp(temperature+external+exertion+regulation,35,40),external,exertion,regulation};
}
H.thermoModel={simulateStep,setPoint:SET}; // pure function for regression tests
function setupComparison(el, currentTrial, history){
 const $=id=>el.querySelector("#"+id);
 const presets={
  cold:{ambient:8,active:false,minutes:20},
  warm:{ambient:35,active:true,minutes:20},
  room:{ambient:22,active:false,minutes:20}
 };
 const report=[], minute=$("hx-pair-minute"), guess=$("hx-guess"), reason=$("hx-justification");
 let pair=null, onLetter="", same=false, revealed=false;
 function run(source,feedback){
  if(source.trace && source.regulated===feedback)return source.trace.map(point=>point[1]);
  const temps=[SET];
  for(let i=1;i<=source.minutes;i++)temps.push(simulateStep(temps[i-1],source.ambient,source.active,feedback).temperature);
  return temps;
 }
 function reading(){
  const t=Number(minute.value);
  return "Minute "+t+" · Curve A "+pair.A[t].toFixed(2)+"°C · Curve B "+pair.B[t].toFixed(2)+"°C";
 }
 function draw(){
  const t=Number(minute.value), end=pair.A.length-1;
  const x=m=>48+352*m/end, y=v=>175-(v-35)*30;
  const ticks=[...new Set([0,Math.round(end/2),end])];
  const line=values=>values.map((v,i)=>(i?"L":"M")+x(i).toFixed(2)+" "+y(v).toFixed(2)).join(" ");
  const axisLabels=[35,36,37,38,39,40].map(v=>'<path d="M48 '+y(v)+'H400" stroke="var(--rule)"/><text x="40" y="'+(y(v)+4)+'" text-anchor="end">'+v+'</text>').join("");
  const timeLabels=ticks.map(v=>'<text x="'+x(v)+'" y="196" text-anchor="middle">'+v+'</text>').join("");
  $("hx-pair-plot").innerHTML='<svg viewBox="0 0 424 216" role="img" aria-label="Model core temperature in degrees Celsius against simulated minutes. '+reading()+'."><g fill="var(--ink)" font-family="system-ui,sans-serif" font-size="13">'+
   axisLabels+timeLabels+'<text x="25" y="16">°C</text><text x="222" y="212" text-anchor="middle">Simulated minutes</text></g>'+
   '<path d="M48 '+y(SET)+'H400" stroke="var(--muted)" stroke-dasharray="2 3"/>'+
   '<path d="M'+x(t)+' 25V175" stroke="var(--muted)"/>'+
   '<path d="'+line(pair.A)+'" stroke="var(--accent)" fill="none" stroke-width="4"/>'+
   '<path d="'+line(pair.B)+'" stroke="var(--ink)" fill="none" stroke-dasharray="7 5" stroke-width="2.5"/>'+
   '<circle cx="'+x(t)+'" cy="'+y(pair.A[t])+'" r="5" fill="var(--paper)" stroke="var(--accent)" stroke-width="2"/>'+
   '<rect x="'+(x(t)-3)+'" y="'+(y(pair.B[t])-3)+'" width="6" height="6" fill="var(--ink)"/></svg>';
  $("hx-pair-reading").textContent=reading();
  minute.setAttribute("aria-valuetext",reading());
 }
 $("hx-make-pair").onclick=()=>{
  const key=$("hx-pair-source").value;
  const source=key==="current"?currentTrial():key.startsWith("trial-")?history[Number(key.slice(6))]:presets[key];
  if(!source || !source.minutes){
   $("hx-pair-status").textContent="Run at least one minute of your trial above, or choose one of the three ready-made pairs.";
   return;
  }
  const on=run(source,true), off=run(source,false);
  onLetter=Math.random()<.5?"A":"B";
  pair=onLetter==="A"?{A:on,B:off}:{A:off,B:on};
  same=on.every((v,i)=>v.toFixed(2)===off[i].toFixed(2));
  revealed=false;
  $("hx-pair-settings").textContent=source.ambient+"°C air · "+(source.active?"exercising":"resting")+" · "+source.minutes+" simulated minutes · both start at 37°C";
  minute.max=source.minutes;minute.value=source.minutes;
  guess.value="";reason.value="";reason.setCustomValidity("");
  $("hx-identify").hidden=false;$("hx-pair-work").hidden=false;$("hx-pair-result").textContent="";
  $("hx-pair-status").textContent="";
  $("hx-make-pair").disabled=true;$("hx-pair-source").disabled=true;
  draw();minute.focus();
 };
 minute.oninput=draw;
 reason.oninput=()=>reason.setCustomValidity("");
 $("hx-identify").onsubmit=event=>{
  event.preventDefault();
  if(!pair||revealed)return;
  if(!reason.value.trim()){reason.setCustomValidity("Explain what your two readings show.");reason.reportValidity();return;}
  const correct=guess.value===(same?"same":onLetter);
  const labels="Feedback on: curve "+onLetter+". Feedback off: curve "+(onLetter==="A"?"B":"A")+".";
  const why=same?"The readings coincide at every plotted minute. These data alone cannot distinguish the settings.":
   "Over the run, the feedback-on curve stays closer to the 37°C set point.";
  const note=(correct?"Your interpretation is supported. ":"Compare your interpretation with the curves. ")+labels+" "+why;
  const pick=guess.options[guess.selectedIndex].textContent, cited=reading();
  report.push(["Matched trial · "+$("hx-pair-settings").textContent,"First prediction: "+pick,cited,"My reasoning: "+reason.value.trim(),labels,why].join("\n"));
  revealed=true;$("hx-identify").hidden=true;
  $("hx-pair-result").textContent=note+" Your prediction: "+pick+". Your evidence: "+cited+". Your explanation: "+reason.value.trim();
  $("hx-make-pair").disabled=false;$("hx-make-pair").textContent="Plot another pair";$("hx-pair-source").disabled=false;
  $("hx-pair-result").focus();
 };
 return report;
}
function render(el){
 let ambient=22,active=false,regulated=true,temperature=SET,minutes=0,trace=[[0,SET]],prediction=null;
 const history=[];
 const scenarios=[[8,"Cold air"],[22,"Room temperature"],[35,"Hot air"]];
 el.innerHTML=`<div class="hx-lab">
  <style>
   .hx-lab{font-family:var(--f-body,inherit);color:var(--ink);line-height:1.5}
   .hx-lab .hx-controls{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
   .hx-lab .hx-controls .opt{font-size:14px;padding:7px 12px}
   .hx-lab .hx-controls [aria-pressed="true"]{border-color:var(--accent);color:var(--accent-ink,var(--accent));font-weight:700}
   .hx-lab .hx-panel{background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:14px;margin-top:14px}
   .hx-lab .hx-layout{display:grid;grid-template-columns:180px minmax(0,1fr);gap:14px;align-items:start}
   .hx-lab .hx-temperature{font-size:43px;font-weight:750;font-variant-numeric:tabular-nums;line-height:1.1;color:var(--ink)}
   .hx-lab .hx-caption{font-size:13px;color:var(--muted)}
   .hx-lab .hx-plot svg{display:block;width:100%;height:auto}
   .hx-lab .hx-reading{min-height:50px;font-size:15px}
   .hx-lab .hx-pred button{font-size:14px}
   .hx-lab .hx-pred button[aria-pressed="true"]{border-color:var(--accent);font-weight:700}
   .hx-lab textarea{width:100%;font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:10px;resize:vertical;min-height:85px}
   .hx-lab textarea:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
   .hx-compare{margin:1.5rem 0;border-block:1px solid var(--rule);padding:1.2rem 0}.hx-compare h3{font:700 clamp(1.4rem,4vw,2rem)/1.12 var(--f-title);margin:0 0 .5rem;scroll-margin-top:1rem}
   .hx-compare p{max-width:66ch;overflow-wrap:anywhere}.hx-compare label,.hx-compare output{display:block;margin:.8rem 0 .3rem}.hx-compare label{font-weight:650}.hx-compare select{max-width:100%;min-height:44px;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);padding:.45rem}.hx-compare button{margin:.45rem 0;min-height:44px}
   .hx-compare [hidden]{display:none!important}.hx-compare figure{margin:1rem 0}.hx-compare figcaption{font-size:.94rem}.hx-compare input[type=range]{width:min(100%,30rem);accent-color:var(--accent);min-height:36px}
   .hx-compare output{font-weight:650;font-variant-numeric:tabular-nums}.hx-compare :focus-visible{outline:2px solid var(--accent);outline-offset:3px}.hx-compare [role=status]:empty{display:none}
   @media(max-width:580px){.hx-lab .hx-layout{grid-template-columns:1fr}.hx-lab .hx-temperature{font-size:36px}}
   @media(prefers-reduced-motion:reduce){.hx-lab *{scroll-behavior:auto!important}}
  </style>
  
  <h2>Homeostasis Lab</h2>
  <p class="note">Change the environment, make a prediction, and compare core temperature with normal negative feedback versus feedback turned off.</p>
  <div class="hx-panel">
   <b>1 · Set the conditions</b>
   <div class="hx-controls" id="hx-env" role="group" aria-label="Air temperature">
    ${scenarios.map(([v,name])=>`<button type="button" class="opt" data-env="${v}">${name} · ${v}°C</button>`).join("")}
   </div>
   <div class="hx-controls" id="hx-activity" role="group" aria-label="Activity level">
    <button type="button" class="opt" data-active="false">Resting</button>
    <button type="button" class="opt" data-active="true">Exercising</button>
   </div>
   <div class="hx-controls" id="hx-feedback" role="group" aria-label="Feedback condition">
    <button type="button" class="opt" data-regulated="true">Normal negative feedback</button>
    <button type="button" class="opt" data-regulated="false">Feedback off (comparison)</button>
   </div>
   <p class="hx-caption">Every change starts a new trial at the same starting temperature (37°C). Turning feedback off is a thought experiment, not something to try on yourself.</p>
  </div>
  <div class="hx-panel">
   <b>2 · Predict</b>
   <p class="note" style="margin:4px 0 8px">During the first minute, will the simulated core temperature rise, fall or stay near 37°C?</p>
   <div class="hx-controls hx-pred" id="hx-pred">
    <button class="opt" type="button" data-predict="rise">Rise</button>
    <button class="opt" type="button" data-predict="fall">Fall</button>
    <button class="opt" type="button" data-predict="steady">Stay near 37°C</button>
   </div>
  </div>
  <div class="hx-panel">
   <b>3 · Run and observe</b>
   <div class="hx-layout" style="margin-top:10px">
    <div><div class="hx-temperature" id="hx-temp">37.00°C</div><div class="hx-caption" id="hx-time">Minute 0</div><div class="hx-caption" style="margin-top:10px">Reference set point: 37°C</div></div>
    <div class="hx-plot" id="hx-plot"></div>
   </div>
   <div class="hx-controls">
    <button type="button" class="btn" id="hx-one">Advance 1 minute</button>
    <button type="button" class="btn ghost" id="hx-ten">Run 10 minutes</button>
    <button type="button" class="btn ghost" id="hx-reset">Reset trial</button>
   </div>
   <div class="hx-reading" aria-live="polite" id="hx-reading"></div>
   <div class="hx-caption" id="hx-hypothesis" aria-live="polite"></div>
  </div>
  <div class="hx-panel">
   <b>4 · Compare previous trials</b>
   <p class="note">Changing conditions after a run records that trial here. Compare the same air temperature and activity with feedback on and off.</p>
   <div id="hx-history" aria-live="polite"></div>
   <button type="button" class="btn ghost" id="hx-clear-history">Clear trial records</button>
  </div>
  <section class="hx-compare" aria-labelledby="compare-feedback"><h3 id="compare-feedback" tabindex="-1">Which curve shows negative feedback?</h3>
   <p>Follow the same body in two model runs. Air temperature, activity and starting temperature match. Only the feedback setting changes.</p>
   <label for="hx-pair-source">Choose conditions for the two runs</label>
   <select id="hx-pair-source"><option value="cold">Cold air · 8°C · resting · 20 min</option><option value="warm">Hot air · 35°C · exercising · 20 min</option><option value="room">Room temperature · 22°C · resting · 20 min</option><option value="current">My current trial</option></select>
   <button type="button" class="btn" id="hx-make-pair">Plot two curves</button>
   <div id="hx-pair-work" hidden><p id="hx-pair-settings"></p><figure><div class="hx-plot" id="hx-pair-plot"></div><figcaption>Curve A is solid. Curve B is dashed. The reference temperature is 37°C.</figcaption></figure>
   <label for="hx-pair-minute">Choose a minute to cite</label><input type="range" id="hx-pair-minute" min="0" step="1"><output for="hx-pair-minute" id="hx-pair-reading" aria-live="polite"></output>
   <form id="hx-identify"><label for="hx-guess">Which curve shows feedback switched on?</label><select required id="hx-guess"><option value="">Choose an interpretation</option><option value="A">Curve A</option><option value="B">Curve B</option><option value="same">The curves are indistinguishable</option></select>
   <label for="hx-justification">Use the two readings at your chosen minute to explain your prediction.</label><textarea id="hx-justification" required rows="2"></textarea>
   <button class="btn">Record prediction and reveal labels</button></form>
   <p id="hx-pair-result" role="status" tabindex="-1"></p></div><p id="hx-pair-status" role="status"></p></section>
  <div class="hx-panel">
   <b>5 · Explain your investigation</b>
   <p class="note">Repeat the experiment with feedback off while keeping the other conditions the same. Describe the difference.</p>
   <label for="hx-observation"><b>Observation</b> — What happened in your trial and comparison?</label>
   <textarea id="hx-observation" rows="3" placeholder="Record the conditions and temperature changes for both trials."></textarea>
   <label for="hx-explanation" style="display:block;margin-top:12px"><b>Explanation</b> — How do body systems resist changes in temperature?</label>
   <textarea id="hx-explanation" rows="3" placeholder="Explain sweating or shivering, changes in skin blood flow, and negative feedback."></textarea>
   <div class="hx-controls">
    <button type="button" class="btn" id="hx-download">Download investigation</button>
    <button type="button" class="btn ghost" id="hx-copy">Copy investigation</button>
   </div>
   <p class="hx-caption" aria-live="polite" id="hx-export-status">Your writing stays on this page. Nothing is sent or submitted. Download or copy before you leave.</p>
  </div>
  <p class="hx-caption" style="margin-top:12px"><b>Important:</b> The temperatures and rates are invented for learning how feedback works. This simple model cannot predict real human temperature changes, diagnose illness or represent every environmental factor.</p>
 </div>`;
 const $=q=>el.querySelector(q);
 const $$=q=>[...el.querySelectorAll(q)];
 const fmt=t=>t.toFixed(2)+"°C";
 const record=()=>{if(minutes>0){history.push({ambient,active,regulated,temperature,minutes,prediction,trace});if(history.length>12)history.shift();}};
 const start=(changes={})=>{record();if(Object.prototype.hasOwnProperty.call(changes,"ambient"))ambient=changes.ambient;
  if(Object.prototype.hasOwnProperty.call(changes,"active"))active=changes.active;
  if(Object.prototype.hasOwnProperty.call(changes,"regulated"))regulated=changes.regulated;
  temperature=SET;minutes=0;trace=[[0,SET]];prediction=null;paint();};
 function renderHistory(){
  const menu=$("#hx-pair-source"), selected=menu.value;
  if(menu.options){
   const options=history.map((t,i)=>new Option("Recorded trial "+(i+1)+" · "+t.ambient+"°C · "+(t.active?"exercise":"rest")+" · "+t.minutes+" min","trial-"+i));
   for(const item of Array.from(menu.options).slice(4))item.remove();
   menu.append(...options);
   if(Array.from(menu.options).some(option=>option.value===selected))menu.value=selected;
  }
  if(!history.length){$("#hx-history").innerHTML='<p class="note">No completed trials recorded yet. Run a trial, then change one setting to save it.</p>';return;}
  $("#hx-history").innerHTML='<div class="tablewrap"><table class="data"><caption>Up to twelve recent simulated trials</caption><thead><tr><th scope="col">Air</th><th scope="col">Activity</th><th scope="col">Feedback</th><th scope="col">Minutes</th><th scope="col">Final core temp.</th></tr></thead><tbody>'+
  history.map(t=>'<tr><td>'+t.ambient+'°C</td><td>'+(t.active?'Exercise':'Rest')+'</td><td>'+(t.regulated?'On':'Off')+'</td><td>'+t.minutes+'</td><td>'+fmt(t.temperature)+'</td></tr>').join("")+'</tbody></table></div>';
 }
 function plot(){
  const W=600,H=245,L=48,R=582,T=16,B=205;
  const x=t=>L+(R-L)*t/40,y=v=>B-(v-35)/5*(B-T);
  const line=trace.map(([t,v],i)=>(i?"L":"M")+x(t).toFixed(1)+" "+y(v).toFixed(1)).join(" ");
  const lines=[35,36,37,38,39,40].map(v=>`<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)"/><text x="${L-7}" y="${y(v)+4}" text-anchor="end" fill="var(--muted)" font-size="12">${v}</text>`).join("");
  const mins=[0,10,20,30,40].map(v=>`<text x="${x(v)}" y="${B+18}" text-anchor="middle" fill="var(--muted)" font-size="12">${v}</text>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Simplified core temperature over time. Minute ${minutes}: ${fmt(temperature)}. A dotted horizontal line marks the 37 degree set point.">
   <rect x="${L}" y="${y(37.5)}" width="${R-L}" height="${y(36.5)-y(37.5)}" fill="var(--accent)" opacity=".08"/>
   ${lines}
   <line x1="${L}" x2="${R}" y1="${y(37)}" y2="${y(37)}" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 5" opacity=".8"/>
   <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
   <circle cx="${x(minutes)}" cy="${y(temperature)}" r="5" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>
   ${mins}
   <text x="${(L+R)/2}" y="${H-5}" fill="var(--muted)" text-anchor="middle" font-size="12">Simulated minutes</text>
  </svg>`;
 }
 function interpretation(){
  const diff=temperature-SET;
  const trend=diff>0.05?"above":diff<-.05?"below":"near";
  const response=!regulated?"Negative feedback is disabled in this comparison trial.":
    trend==="above"?"Cooling response: sweating and widening blood vessels near the skin help release heat.":
    trend==="below"?"Warming response: shivering creates heat and narrower skin blood vessels help conserve it.":
    "Temperature is near the set point. The body adjusts its responses as conditions change.";
  return (minutes?"After "+minutes+" simulated minute"+(minutes===1?"":"s")+", temperature is "+fmt(temperature)+". ":"Ready to investigate. ")+response+
    (Math.abs(diff)>0.5?" This trial is outside the shaded reference range; feedback is not unlimited.":"");
 }
 function paint(){
  $$("#hx-env [data-env]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.env===ambient)));
  $$("#hx-activity [data-active]").forEach(b=>b.setAttribute("aria-pressed",String((b.dataset.active==="true")===active)));
  $$("#hx-feedback [data-regulated]").forEach(b=>b.setAttribute("aria-pressed",String((b.dataset.regulated==="true")===regulated)));
  $$("#hx-pred [data-predict]").forEach(b=>{b.setAttribute("aria-pressed",String(b.dataset.predict===prediction));b.disabled=minutes>0;});
  $("#hx-temp").textContent=fmt(temperature);$("#hx-time").textContent="Minute "+minutes;
  $("#hx-plot").innerHTML=plot();$("#hx-reading").textContent=interpretation();renderHistory();
  $("#hx-one").disabled=minutes>=40;$("#hx-ten").disabled=minutes>=40;
  const actual=trace.length>1?(trace[1][1]>37.02?"rise":trace[1][1]<36.98?"fall":"steady"):null;
  $("#hx-hypothesis").textContent=minutes===0?"Choose a prediction before running a trial.":prediction?
    "Your prediction ("+prediction+") was "+(prediction===actual?"supported":"not supported")+" by the first simulated minute. Review the graph and explain why.":
    "No prediction was recorded for this trial. Try one on the next run.";
 }
 function advance(n){for(let i=0;i<n&&minutes<40;i++){const r=simulateStep(temperature,ambient,active,regulated);temperature=r.temperature;minutes++;trace.push([minutes,temperature]);}paint();}
 $$("#hx-env [data-env]").forEach(b=>b.onclick=()=>{start({ambient:+b.dataset.env});});
 $$("#hx-activity [data-active]").forEach(b=>b.onclick=()=>{start({active:b.dataset.active==="true"});});
 $$("#hx-feedback [data-regulated]").forEach(b=>b.onclick=()=>{start({regulated:b.dataset.regulated==="true"});});
 $$("#hx-pred [data-predict]").forEach(b=>b.onclick=()=>{if(minutes===0){prediction=b.dataset.predict;paint();}});
 $("#hx-one").onclick=()=>advance(1);
 $("#hx-ten").onclick=()=>advance(10);
 $("#hx-reset").onclick=()=>start();
 $("#hx-clear-history").onclick=()=>{history.length=0;renderHistory();};
 const comparisonReport=setupComparison(el,()=>({ambient,active,regulated,minutes,trace}),history);
 function report(){
  return ["Homeostasis Lab — Investigation",
   "Environment: "+ambient+"°C; activity: "+(active?"exercising":"resting")+
   "; feedback: "+(regulated?"on":"off"),
   "Prediction: "+(prediction||"not selected"),
   "Simulated temperature after "+minutes+" minute(s): "+fmt(temperature),
   "Previous trial records (illustrative, not actual physiology):\n"+
    (history.length?history.map((t,i)=>(i+1)+". Air "+t.ambient+"°C, "+(t.active?"exercise":"rest")+", feedback "+(t.regulated?"on":"off")+", "+t.minutes+" minutes, "+fmt(t.temperature)).join("\n"):"No prior trials recorded"),
   ...comparisonReport,
   "Observation:\n"+$("#hx-observation").value.trim(),
   "Explanation:\n"+$("#hx-explanation").value.trim(),
   "Model limitation: simplified teaching illustration; not actual physiology."
  ].join("\n\n")+"\n";
 }
 $("#hx-download").onclick=()=>{
  const url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="homeostasis-investigation.txt";
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#hx-export-status").textContent="Investigation downloaded. Keep the text file to submit using your teacher's approved method.";
 };
 $("#hx-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){$("#hx-export-status").textContent="Copy isn't available here. Use Download investigation instead.";return;}
  navigator.clipboard.writeText(report()).then(()=>{$("#hx-export-status").textContent="Investigation copied. Paste into a document.";})
  .catch(()=>{$("#hx-export-status").textContent="Copy was blocked. Use Download investigation instead.";});
 };
 paint();
}
/* Several Science modules share the cells/systems lesson. Preserve anything
   already registered so loading order cannot silently remove a tool. */
H.lessonTools=H.lessonTools||{};
const previous=H.lessonTools["cells/systems"];
H.lessonTools["cells/systems"]=function(root){
 if(previous){const existing=document.createElement("div");root.appendChild(existing);previous(existing);}
 const section=document.createElement("div");root.appendChild(section);render(section);
};
})();
