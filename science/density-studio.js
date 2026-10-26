/* Grade 8 Density Studio. Simple solid block in freshwater; offline, no data collection. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
H.tools=H.tools||{};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const choose=a=>a[Math.floor(Math.random()*a.length)];
const fmt=n=>Number(n.toFixed(2)).toString();
const rhoWater=1; // Approximate freshwater density in g/cm^3, used for an illustrative model.
function challenge(){
 const volume=choose([20,40,60,80,100,120]),d=choose([.5,.75,1,1.2,1.5,2,2.5,3]);
 return {volume,mass:Math.round(volume*d),density:d};
}
H.tools.matter=function(el){
 let prediction=null,problem=challenge(),answered=false,correct=0,trials=0;
 el.innerHTML=`<section class="density-studio"><style>
 .density-studio{background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.5}
 .density-studio .ds-controls{display:grid;gap:12px;margin:10px 0 14px}
 .density-studio input[type=range]{width:100%;accent-color:var(--accent-ink)}
 .density-studio .ds-presets,.density-studio .ds-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0}
 .density-studio button{min-height:42px}
 .density-studio .ds-visual{max-width:340px;width:100%;height:auto;display:block}
 .density-studio .ds-result{padding:12px;background:var(--soft);border-radius:6px;min-height:2em;margin:9px 0}
 .density-studio .ds-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;align-items:center}
 .density-studio input[type=number]{padding:8px;border:1px solid var(--rule);border-radius:5px;font:inherit;width:110px;max-width:100%;background:var(--paper);color:var(--ink)}
 .density-studio button:focus-visible,.density-studio input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
 .density-studio .ds-check{border-top:1px solid var(--rule);padding-top:14px;margin-top:18px}
 </style>
 <div class="eyebrow">Grade 8 Science · SCI.8.E.1 · Interactive model</div><h3>Density Studio: Will it float?</h3>
 <p class="note">Adjust the mass or volume of a simplified solid block. Predict its behaviour in freshwater before revealing the result. This model uses approximately 1 g/cm³ for freshwater and assumes no trapped air or unusual shapes.</p>
 <div class="ds-presets" role="group" aria-label="Try a sample block"><button class="btn ghost" data-preset="light">Light block (60 g, 100 cm³)</button><button class="btn ghost" data-preset="equal">Equal-density block (100 g, 100 cm³)</button><button class="btn ghost" data-preset="heavy">Dense block (240 g, 80 cm³)</button></div>
 <div class="ds-controls"><label for="ds-mass">Mass: <strong id="ds-mass-value">60 g</strong></label><input id="ds-mass" type="range" min="20" max="300" step="5" value="60">
 <label for="ds-volume">Volume: <strong id="ds-volume-value">100 cm³</strong></label><input id="ds-volume" type="range" min="20" max="200" step="5" value="100"></div>
 <p class="ds-result" id="ds-equation" aria-live="polite"></p>
 <div class="ds-grid"><div>
 <svg class="ds-visual" viewBox="0 0 300 220" role="img" id="ds-water" aria-label="Block in a tank of freshwater">
  <rect x="18" y="108" width="264" height="96" fill="#91C9DE" opacity=".72"/>
  <path d="M18 18 V204 H282 V18" fill="none" stroke="var(--muted)" stroke-width="3"/>
  <line x1="18" y1="108" x2="282" y2="108" stroke="#246B89" stroke-width="2" stroke-dasharray="5 5"/>
  <rect id="ds-block" x="116" y="50" width="68" height="58" rx="3" fill="#B18040" stroke="#664315" stroke-width="2"/>
  <text id="ds-label" x="150" y="82" font-size="13" font-weight="700" text-anchor="middle" fill="#fff">block</text>
  <text x="27" y="196" font-size="12" fill="#154B65">freshwater</text>
 </svg></div>
 <div><p><strong>Make your prediction:</strong></p><div class="ds-actions" role="group" aria-label="Predict whether the block floats"><button class="btn" data-predict="float">Floats</button><button class="btn ghost" data-predict="neutral">Neither (same density)</button><button class="btn ghost" data-predict="sink">Sinks</button></div><p id="ds-feedback" class="ds-result" aria-live="polite">Change the block, then predict to reveal what the model shows.</p></div></div>
 <div class="ds-check"><h4>Try a calculation</h4><p id="ds-problem">A block has mass <b id="ds-qmass"></b> and volume <b id="ds-qvolume"></b>. What is its density in g/cm³?</p>
 <div class="ds-actions"><label for="ds-answer">Density <input id="ds-answer" type="number" step="any" inputmode="decimal" placeholder="e.g. 1.5"></label><button class="btn" id="ds-check">Check</button><button class="btn ghost" id="ds-next">New numbers</button></div>
 <p id="ds-qfeedback" aria-live="polite">Use density = mass ÷ volume. Score: 0/0.</p>
 <p class="note">Classroom challenge: choose three objects and measure their mass and volume. Calculate their densities, predict float/sink, and then test in water with teacher-approved materials.</p>
 </div></section>`;
 const get=id=>el.querySelector("#"+id);
 const mass=get("ds-mass"),volume=get("ds-volume"),block=get("ds-block"),label=get("ds-label");
 const situation=d=>d<rhoWater-1e-9?"float":d>rhoWater+1e-9?"sink":"neutral";
 const names={float:"float",sink:"sink",neutral:"have the same density as freshwater"};
 function update(){
  const m=Number(mass.value),v=Number(volume.value),d=m/v;
  get("ds-mass-value").textContent=m+" g";get("ds-volume-value").textContent=v+" cm³";
  get("ds-equation").textContent=`Density = ${m} g ÷ ${v} cm³ = ${fmt(d)} g/cm³. Freshwater ≈ 1 g/cm³.`;
  prediction=null;get("ds-feedback").textContent="Choose your prediction to reveal the result.";
  block.setAttribute("y","44");label.setAttribute("y","76");
  get("ds-water").setAttribute("aria-label","A model block above a freshwater tank; predict its behaviour before revealing.");
 }
 function reveal(choice){
  prediction=choice;
  const d=Number(mass.value)/Number(volume.value),caseId=situation(d);
  const y=caseId==="float"?108-58*(1-d/rhoWater):caseId==="sink"?146:116;
  block.setAttribute("y",String(Math.max(20,y)));label.setAttribute("y",String(Math.max(20,y)+32));
  const correct=choice===caseId;
  get("ds-feedback").textContent=(correct?"Correct. ":"Not this time. ")+`The block would ${names[caseId]}. Its density is ${fmt(d)} g/cm³, compared with water at about 1 g/cm³. `+(caseId==="float"?"Its lower density means it can float partially submerged.":caseId==="sink"?"It is denser than water, so this solid block sinks.":"Equal density means the block can remain suspended in the fluid.");
  get("ds-water").setAttribute("aria-label",`The solid block would ${names[caseId]} in freshwater. Density ${fmt(d)} g per cubic centimetre.`);
 }
 function renderQuestion(){
  get("ds-qmass").textContent=problem.mass+" g";get("ds-qvolume").textContent=problem.volume+" cm³";
  get("ds-answer").value="";get("ds-qfeedback").textContent=`Use density = mass ÷ volume. Score: ${correct}/${trials}.`;
  answered=false;
 }
 mass.addEventListener("input",update);volume.addEventListener("input",update);
 el.querySelectorAll("[data-preset]").forEach(b=>b.addEventListener("click",()=>{
  const values={light:[60,100],equal:[100,100],heavy:[240,80]}[b.dataset.preset];
  mass.value=String(values[0]);volume.value=String(values[1]);update();mass.focus({preventScroll:true});
 }));
 el.querySelectorAll("[data-predict]").forEach(b=>b.addEventListener("click",()=>reveal(b.dataset.predict)));
 get("ds-check").addEventListener("click",()=>{
  if(answered)return;
  const raw=get("ds-answer").value.trim(),n=Number(raw);
  if(raw===""||!Number.isFinite(n)||n<0){get("ds-qfeedback").textContent="Enter a non-negative number.";return;}
  trials++;answered=true;const good=Math.abs(n-problem.density)<0.011;if(good)correct++;
  get("ds-qfeedback").textContent=(good?"Correct. ":"Try the division again. ")+`${problem.mass} ÷ ${problem.volume} = ${fmt(problem.density)} g/cm³. Score: ${correct}/${trials}.`;
 });
 get("ds-next").addEventListener("click",()=>{problem=challenge();renderQuestion();get("ds-answer").focus({preventScroll:true});});
 get("ds-answer").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();get("ds-check").click();}});
 renderQuestion();update();
};
})();