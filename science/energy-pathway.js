/* Science 8 Energy Pathway Studio — five-topic Energy & Light unit, Topic 4.
   This is a conceptual energy pyramid, NOT an exact ecosystem prediction.
   No accounts, student identifiers, saved answers, backend requests or teacher keys.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const chains={
 prairie:["Prairie grass","Grasshopper","Frog","Hawk"],
 wetland:["Algae","Zooplankton","Small fish","Predatory fish"]
};
const fmt=n=>Math.round(n*100)/100;
const names=["Producer","Primary consumer","Secondary consumer","Tertiary consumer"];
function calculate(start,rate){
 if(!Number.isFinite(start)||start<=0||!Number.isFinite(rate)||rate<0||rate>100)throw Error("Invalid energy inputs");
 return Array.from({length:4},(_,i)=>fmt(start*Math.pow(rate/100,i)));
}
function studio(el){
 let environment="prairie",start=10000,rate=10;
 const $=s=>el.querySelector(s);
 el.innerHTML=`<section class="ep"><style>
 .ep{border:1px solid var(--rule);background:var(--paper);padding:clamp(14px,3vw,23px);border-radius:var(--radius);line-height:1.55;color:var(--ink)}
 .ep *{box-sizing:border-box}.ep h3{margin:8px 0;font-size:24px}
 .ep .ep-kicker{font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-ink)}
 .ep .ep-row{display:flex;align-items:center;flex-wrap:wrap;gap:11px;margin:12px 0}
 .ep .ep-controls{background:var(--soft);padding:13px;border-radius:var(--radius)}
 .ep label{display:block;font-weight:700;margin:10px 0 4px}
 .ep input,.ep select,.ep textarea{font:inherit;color:var(--ink);background:var(--paper);padding:9px;border:1px solid var(--rule);border-radius:6px;max-width:100%}
 .ep input[type=range]{accent-color:var(--accent-ink);min-width:180px;flex:1}
 .ep input[type=number]{width:135px}.ep textarea{display:block;width:100%;min-height:80px;resize:vertical}
 .ep button{min-height:42px;cursor:pointer}.ep button:focus-visible,.ep select:focus-visible,.ep input:focus-visible,.ep textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
 .ep .ep-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:16px}
 .ep .ep-level{position:relative;padding:10px 14px;background:var(--soft);border:1px solid var(--rule);border-left:7px solid var(--accent-ink);border-radius:8px;margin:8px 0;min-width:0}
 .ep .ep-level span{color:var(--muted);font-size:12px;font-weight:700}.ep .ep-level strong{display:block;font-size:17px}.ep .ep-level p{margin:2px 0}
 .ep .ep-arrow{text-align:center;color:var(--accent-ink);font-weight:750;font-size:14px}
 .ep .ep-note{font-size:13px;color:var(--muted)}
 .ep .ep-card{border:1px solid var(--rule);border-radius:var(--radius);padding:14px;margin:10px 0}
 .ep .ep-output{margin:12px 0;background:var(--soft);padding:12px;border-radius:8px}
 .ep .ep-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
 .ep table{width:100%;border-collapse:collapse}.ep td,.ep th{padding:7px;text-align:left;border-bottom:1px solid var(--rule)}
 @media(max-width:790px){.ep .ep-grid{grid-template-columns:1fr}}
 @media print{.ep button,.ep .ep-actions{display:none!important}}
 </style>
 <div class="ep-kicker">Grade 8 Science · SCI.8.E.16 · Evidence from a model</div>
 <h3>Energy Pathway Studio</h3>
 <p class="ep-note">Light energy helps plants and algae make sugars by photosynthesis. Explore what happens to <em>available chemical energy</em> at higher food-chain levels. The 10% rule is an approximate classroom model, not an exact measurement of real ecosystems.</p>
 <div class="ep-controls">
 <label for="ep-chain">Food chain</label><select id="ep-chain"><option value="prairie">Manitoba prairie (grass → grasshopper → frog → hawk)</option><option value="wetland">Freshwater system (algae → zooplankton → small fish → predatory fish)</option></select>
 <div class="ep-row"><label for="ep-start">Energy available in producers (J)</label><input type="number" id="ep-start" min="100" max="1000000" step="100" value="10000"></div>
 <div class="ep-row"><label for="ep-rate">Modelled transfer per level: <b id="ep-rate-value">10%</b></label><input type="range" id="ep-rate" min="5" max="25" step="1" value="10"></div>
 <p class="ep-note">Change one variable at a time. What do you think will happen to energy at the top?</p>
 </div>
 <div class="ep-grid"><div><h4>Follow the energy</h4><div id="ep-path" aria-live="polite"></div>
 <div class="ep-output" id="ep-summary" aria-live="polite"></div>
 <p class="ep-note">Transfers are not perfectly fixed in nature. Energy not passed to the next level can be used for life processes, released as heat, left in uneaten material or moved through other food-web pathways. None is destroyed.</p></div>
 <div>
 <div class="ep-card"><h4>Predict, then calculate</h4><label for="ep-guess">Before checking: how many joules are available to the tertiary consumer?</label>
 <input type="number" id="ep-guess" min="0" step="any" placeholder="Your prediction"><div class="ep-actions"><button type="button" class="btn" id="ep-check">Check prediction</button></div>
 <p id="ep-feedback" role="status" aria-live="polite">Use starting energy × (transfer fraction) three times.</p></div>
 <div class="ep-card"><h4>Photo­synthesis connection</h4>
 <p>Sunlight + carbon dioxide + water → glucose + oxygen</p>
 <p class="ep-note">Light energy is transferred into chemical energy stored in glucose; the organic matter can be eaten by consumers.</p>
 <label for="ep-claim">Your claim with evidence</label><textarea id="ep-claim" placeholder="When I changed… I observed… This supports the idea that…"></textarea>
 <div class="ep-actions"><button type="button" class="btn ghost" id="ep-copy">Copy investigation</button><button type="button" class="btn ghost" id="ep-download">Download</button></div>
 <p class="ep-note" id="ep-status" aria-live="polite">Nothing is submitted or saved. Copy or download before navigating away.</p></div>
 </div></div></section>`;
 function values(){return calculate(start,rate);}
 function show(){
  const chain=chains[environment],numbers=values();
  $("#ep-chain").value=environment;$("#ep-start").value=start;$("#ep-rate").value=rate;$("#ep-rate-value").textContent=rate+"%";
  $("#ep-path").innerHTML=numbers.map((n,i)=>`<div class="ep-level"><span>${names[i]}</span><strong>${chain[i]}</strong><p>${n.toLocaleString("en-CA")} J available</p></div>${i<3?`<div class="ep-arrow" aria-hidden="true">↓ ${rate}% transferred</div>`:""}`).join("");
  $("#ep-summary").textContent="Starting with "+start.toLocaleString("en-CA")+" J in producers, this model gives "+numbers[3].toLocaleString("en-CA")+" J to the tertiary consumer after 3 transfers.";
 }
 $("#ep-chain").onchange=e=>{environment=e.target.value;show();$("#ep-feedback").textContent="Predict again after changing the chain.";};
 $("#ep-rate").oninput=e=>{rate=Number(e.target.value);show();$("#ep-feedback").textContent="Transfer fraction changed. Check your prediction again.";};
 $("#ep-start").onchange=e=>{
  const n=Number(e.target.value);
  if(!Number.isInteger(n)||n<100||n>1000000){$("#ep-feedback").textContent="Enter whole-number starting energy from 100 to 1,000,000 J.";$("#ep-start").value=start;return;}
  start=n;show();$("#ep-feedback").textContent="Starting energy changed. Make a new prediction.";
 };
 $("#ep-check").onclick=()=>{
  const raw=$("#ep-guess").value.trim(),n=Number(raw),target=values()[3];
  if(raw===""||!Number.isFinite(n)||n<0){$("#ep-feedback").textContent="Enter a non-negative number first.";return;}
  $("#ep-feedback").textContent=(Math.abs(n-target)<0.011?"Correct! ":"Compare again. ")+
   "Calculated: "+start+" × ("+rate+"/100)³ = "+target+" J. This is an approximate model, not an exact ecosystem prediction.";
 };
 function report(){
  const nums=values(),labels=chains[environment];
  return ["Energy Pathway Studio | Grade 8 Science","Food chain: "+labels.join(" → "),"Producer energy: "+start+" J","Transfer model: "+rate+"% per level",
   ...nums.map((n,i)=>names[i]+": "+labels[i]+" | "+n+" J"),"My prediction: "+$("#ep-guess").value+" J",
   "My explanation: "+$("#ep-claim").value.trim(),"The 10% rule is an approximate model, not an exact ecosystem measurement."].join("\n")+"\n";
 }
 $("#ep-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){$("#ep-status").textContent="Copy unavailable. Use Download.";return;}
  navigator.clipboard.writeText(report()).then(()=>$("#ep-status").textContent="Copied. Paste into your own document.").catch(()=>$("#ep-status").textContent="Copy blocked. Use Download.");
 };
 $("#ep-download").onclick=()=>{
  const a=document.createElement("a"),url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
  a.href=url;a.download="energy-pathway-investigation.txt";document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);$("#ep-status").textContent="Downloaded. Submit only through your teacher's approved system.";
 };
 show();
}
H.lessonTools=Object.assign(H.lessonTools||{},{
 "light/u3t4-photosynthesis":studio,"light/u3t4-chains":studio
});
window.EnergyPathwayCore={calculate,chains,names};
})();
