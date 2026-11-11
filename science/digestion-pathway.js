/* Grade 8 Cells & Systems · Digestive pathway, based on Systems booklet Topic 6. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const stages=[
 ["Mouth","Chewing breaks food into smaller pieces and mixes it with saliva.","Swallowed food travels through the oesophagus."],
 ["Oesophagus","Muscles move swallowed food down toward the stomach.","Food reaches the stomach."],
 ["Stomach","Acid and muscular movement help break down food.","The mixture enters the small intestine."],
 ["Small intestine","Most digested nutrients are absorbed here.","Absorbed nutrients enter transport pathways including the bloodstream."],
 ["Bloodstream and body cells","Blood transports absorbed nutrients to tissues. Cells use nutrients for building materials and energy.","The nutrient has reached body cells."],
 ["Large intestine","Some water is absorbed from material that was not digested and absorbed. Remaining solid waste moves onward.","Undigested waste is eventually eliminated."]
];
const quiz=[
 ["Where are most digested nutrients absorbed?",["Stomach","Small intestine","Large intestine"],1,"The small intestine absorbs most nutrients."],
 ["Which system carries absorbed nutrients to body cells?",["Circulatory","Skeletal","Integumentary"],0,"Blood carries nutrients throughout the body."],
 ["What helps break food down in the stomach?",["Acid and muscular motion","Air in the lungs","Blood returning to the heart"],0,"Stomach acid and muscular motion help digest food."],
 ["Where does material that was not absorbed continue?",["Brain","Large intestine","Heart"],1,"The large intestine absorbs some water from remaining material."]
];
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const style=[
".dn{color:var(--ink);border-top:1px solid var(--rule);margin:23px 0 8px;padding-top:22px;line-height:1.5;min-width:0}",
".dn *{box-sizing:border-box}.dn h2{font:700 clamp(24px,3vw,31px) var(--f-title,Georgia,serif);margin:0 0 7px}",
".dn h3{font-size:1.03rem;margin:0 0 8px}.dn .note{font-size:.88rem;color:var(--muted)}",
".dn .layout{display:grid;grid-template-columns:minmax(0,310px) minmax(0,1fr);gap:17px;align-items:start}",
".dn .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:9px}",
".dn svg{display:block;width:100%;height:auto;max-height:370px}.dn svg .tract{fill:none;stroke:var(--accent);stroke-width:14;opacity:.45;stroke-linecap:round}",
".dn svg .body{fill:var(--paper);stroke:var(--rule);stroke-width:3}",
".dn svg .pin{cursor:pointer;outline:none}.dn svg .pin circle{fill:var(--paper);stroke:var(--accent);stroke-width:3}",
".dn svg .pin text{fill:var(--ink);font:700 15px system-ui}.dn svg .pin.active circle{fill:var(--accent)}.dn svg .pin.active text{fill:var(--paper)}",
".dn svg .pin:focus-visible circle{stroke:var(--ink);stroke-width:5}",
".dn .steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.dn button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 10px;cursor:pointer;min-height:39px}",
".dn button[aria-pressed=true]{background:var(--accent);color:var(--paper);border-color:var(--accent)}.dn button:focus-visible,.dn textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".dn .readout{background:var(--soft);padding:13px;border-radius:var(--radius,12px);min-height:139px;margin:12px 0}",
".dn .readout p{margin:6px 0}.dn .readout .next-step{color:var(--muted);font-size:.86rem}",
".dn .connections{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:18px 0}",
".dn .connections div{padding:10px;border:1px solid var(--rule);border-radius:9px;background:var(--soft)}",
".dn .connections div.active{outline:2px solid var(--accent)}.dn .connections b{display:block;font-size:.9rem}.dn .connections span{font-size:.84rem;color:var(--muted)}",
".dn .quiz{padding-top:15px;margin-top:18px;border-top:1px solid var(--rule)}.dn .answers{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}",
".dn .answers button{flex:1 1 135px;text-align:left}.dn .feedback{min-height:31px;font-weight:650}.dn .next:disabled{opacity:.45}",
".dn .prompts{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}.dn textarea{width:100%;min-height:85px;padding:10px;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:8px;font:inherit;resize:vertical}",
"@media(max-width:740px){.dn .layout{grid-template-columns:1fr}.dn .diagram{max-width:350px;margin:auto}}",
"@media(max-width:470px){.dn .steps,.dn .connections,.dn .prompts{grid-template-columns:1fr}}"
].join("\n");
function diagram(){
 const xy=[[160,63],[160,111],[185,177],[185,228],[264,228],[179,306]];
 return '<svg viewBox="0 0 350 360" role="img" aria-label="Simplified digestive system diagram with six numbered stops">'+
 '<path class="body" d="M160 22 Q125 45 126 92 L119 112 Q91 117 93 160 L113 284 Q113 325 160 336 L212 336 Q252 321 252 279 L266 145 Q265 116 242 103 L206 39 Q183 16 160 22Z"/>'+
 '<path class="tract" d="M160 63L160 110 Q164 143 184 177 Q204 192 181 213 Q170 231 185 229 Q217 253 179 271 L179 306"/>'+
 '<path d="M185 228L264 228" stroke="var(--accent)" stroke-width="4" stroke-dasharray="6 5" opacity=".6"/>'+
 xy.map((p,i)=>'<g class="pin" data-stage="'+i+'" role="button" tabindex="0" aria-label="'+escape(stages[i][0])+'"><circle cx="'+p[0]+'" cy="'+p[1]+'" r="19"/><text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle">'+(i+1)+'</text></g>').join("")+
 '</svg>';
}
function render(el){
 let current=0,q=0,answer=null;
 el.innerHTML='<section class="dn"><style>'+style+'</style><h2>Digestion: Follow a Nutrient</h2>'+
 '<p class="note">Trace food through the digestive tract, then follow an absorbed nutrient into the bloodstream. The nutrient pathway branches away from the remaining undigested material.</p>'+
 '<div class="layout"><div class="diagram">'+diagram()+'</div><div><h3>Choose a stop</h3><div class="steps"></div><div class="readout" aria-live="polite"></div>'+
 '<button class="forward" type="button">Next stop</button></div></div>'+
 '<div class="connections"><div data-phase="break"><b>Break down</b><span>Food is broken into smaller substances.</span></div><div data-phase="absorb"><b>Absorb</b><span>Nutrients move into the body.</span></div><div data-phase="transport"><b>Transport</b><span>Blood carries nutrients to cells.</span></div></div>'+
 '<div class="quiz"><h3>Check the pathway</h3><div class="question"></div><div class="answers"></div><div class="feedback" aria-live="polite"></div><button class="next" type="button" disabled>Next question</button></div>'+
 '<div class="prompts"><label>Where do most nutrients go after absorption?<textarea placeholder="Explain how the blood and body cells are connected."></textarea></label>'+
 '<label>What happens to material that was not absorbed?<textarea placeholder="Explain the role of the large intestine."></textarea></label></div>'+
 '<p class="note">Conceptual diagram, not to anatomical scale. Real digestion includes additional organs and chemical processes.</p></section>';
 const $=s=>el.querySelector(s);
 function paint(){
  const s=stages[current];
  $(".steps").innerHTML=stages.map((v,i)=>'<button type="button" data-stage="'+i+'" aria-pressed="'+(current===i)+'">'+(i+1)+'. '+escape(v[0])+'</button>').join("");
  $(".readout").innerHTML='<strong>'+escape(s[0])+'</strong><p>'+escape(s[1])+'</p><p class="next-step"><b>Next:</b> '+escape(s[2])+'</p>';
  el.querySelectorAll("svg [data-stage]").forEach(b=>b.classList.toggle("active",Number(b.dataset.stage)===current));
  el.querySelectorAll("[data-phase]").forEach(b=>b.classList.toggle("active",b.dataset.phase===(current<=2?"break":current===3?"absorb":"transport")));
  $(".forward").textContent=current===stages.length-1?"Start again":"Next stop";
 }
 function paintQuiz(){
  const a=quiz[q];$(".question").innerHTML='<b>'+(q+1)+' of '+quiz.length+'. '+escape(a[0])+'</b>';
  $(".answers").innerHTML=a[1].map((v,i)=>'<button type="button" data-answer="'+i+'" '+(answer!==null?'disabled':'')+'>'+escape(v)+'</button>').join("");
  $(".feedback").textContent=answer===null?"":(answer===a[2]?"Correct. ":"Not quite. ")+a[3];
  $(".next").disabled=answer===null;$(".next").textContent=q===quiz.length-1?"Start again":"Next question";
 }
 el.addEventListener("click",ev=>{
  const t=ev.target.closest("[data-stage],[data-answer],.forward,.next");if(!t||!el.contains(t))return;
  if(t.dataset.stage!==undefined){current=Number(t.dataset.stage);paint();}
  else if(t.classList.contains("forward")){current=(current+1)%stages.length;paint();}
  else if(t.dataset.answer!==undefined&&answer===null){answer=Number(t.dataset.answer);paintQuiz();}
  else if(t.classList.contains("next")&&answer!==null){q=(q+1)%quiz.length;answer=null;paintQuiz();}
 });
 el.addEventListener("keydown",ev=>{const b=ev.target.closest("svg [data-stage]");if(b&&(ev.key===" "||ev.key==="Enter")){ev.preventDefault();current=Number(b.dataset.stage);paint();}});
 paint();paintQuiz();
 el.digestionExplorer={get current(){return current},select(i){if(Number.isInteger(i)&&i>=0&&i<stages.length){current=i;paint();}}};
}
H.lessonTools=H.lessonTools||{};
const prior=H.lessonTools["cells/systems"];
H.lessonTools["cells/systems"]=function(root){
 if(prior){const old=document.createElement("div");root.appendChild(old);prior(old);}
 const section=document.createElement("div");root.appendChild(section);render(section);
};
H.digestionData={stages,quiz};
})();