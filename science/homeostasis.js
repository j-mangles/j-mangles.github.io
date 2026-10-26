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
function render(el){
 let ambient=22,active=false,regulated=true,temperature=SET,minutes=0,trace=[[0,SET]],prediction=null;
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
   @media(max-width:580px){.hx-lab .hx-layout{grid-template-columns:1fr}.hx-lab .hx-temperature{font-size:36px}}
   @media(prefers-reduced-motion:reduce){.hx-lab *{scroll-behavior:auto!important}}
  </style>
  <div class="eyebrow">Virtual investigation · Systems of the Human Body</div>
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
   <b>4 · Explain your investigation</b>
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
 const start=()=>{temperature=SET;minutes=0;trace=[[0,SET]];prediction=null;paint();};
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
  $("#hx-plot").innerHTML=plot();$("#hx-reading").textContent=interpretation();
  $("#hx-one").disabled=minutes>=40;$("#hx-ten").disabled=minutes>=40;
  const actual=trace.length>1?(trace[1][1]>37.02?"rise":trace[1][1]<36.98?"fall":"steady"):null;
  $("#hx-hypothesis").textContent=minutes===0?"Choose a prediction before running a trial.":prediction?
    "Your prediction ("+prediction+") was "+(prediction===actual?"supported":"not supported")+" by the first simulated minute. Review the graph and explain why.":
    "No prediction was recorded for this trial. Try one on the next run.";
 }
 function advance(n){for(let i=0;i<n&&minutes<40;i++){const r=simulateStep(temperature,ambient,active,regulated);temperature=r.temperature;minutes++;trace.push([minutes,temperature]);}paint();}
 $$("#hx-env [data-env]").forEach(b=>b.onclick=()=>{ambient=+b.dataset.env;start();});
 $$("#hx-activity [data-active]").forEach(b=>b.onclick=()=>{active=b.dataset.active==="true";start();});
 $$("#hx-feedback [data-regulated]").forEach(b=>b.onclick=()=>{regulated=b.dataset.regulated==="true";start();});
 $$("#hx-pred [data-predict]").forEach(b=>b.onclick=()=>{if(minutes===0){prediction=b.dataset.predict;paint();}});
 $("#hx-one").onclick=()=>advance(1);
 $("#hx-ten").onclick=()=>advance(10);
 $("#hx-reset").onclick=start;
 function report(){
  return ["Homeostasis Lab — Investigation",
   "Environment: "+ambient+"°C; activity: "+(active?"exercising":"resting")+
   "; feedback: "+(regulated?"on":"off"),
   "Prediction: "+(prediction||"not selected"),
   "Simulated temperature after "+minutes+" minute(s): "+fmt(temperature),
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
H.lessonTools=Object.assign(H.lessonTools||{},{"cells/systems":render});
})();
