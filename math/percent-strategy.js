/* Grade 7 Math: lesson-specific practice based on existing Unit 1 lessons.
   All questions are generated in the browser. Nothing is collected or submitted. */
(function installPercentStudio(){
"use strict";
const H=window.HUB;if(!H)return;
const randomInt=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[randomInt(0,a.length-1)];
const tidy=n=>String(Math.round(n*100)/100);
const money=n=>"$"+(Math.round(n*100)/100).toFixed(2);
function makeProblem(kind,p,whole){
 const part=p*whole/100;
 if(kind==="whole")return {
  kind,p,whole,answer:whole,
  question:tidy(part)+" is "+p+"% of what number?",
  unit:"",meaning:"The whole is missing. You know the part and its percent.",
  hint1:"If "+p+"% represents "+tidy(part)+", how could you find 100%?",
  hint2:"Divide "+tidy(part)+" by "+(p/100)+" to find the whole.",
  steps:"The part is "+tidy(part)+" and the percent is "+p+"%. "+tidy(part)+" ÷ "+(p/100)+" = "+tidy(whole)+". Check: "+p+"% of "+tidy(whole)+" = "+tidy(part)+"."
 };
 if(kind==="discount")return {
  kind,p,whole,answer:Math.round((whole-part)*100)/100,unit:"$",
  question:"An item costs "+money(whole)+". It is "+p+"% off. What is the sale price before tax?",
  meaning:"Find the discount, then subtract it from the regular price.",
  hint1:"A "+p+"% discount means you pay "+(100-p)+"% of the original price.",
  hint2:"Multiply "+money(whole)+" by "+((100-p)/100)+".",
  steps:p+"% of "+money(whole)+" is "+money(part)+". "+money(whole)+" − "+money(part)+" = "+money(whole-part)+". This is the sale price BEFORE tax."
 };
 return {
  kind:"part",p,whole,answer:Math.round(part*100)/100,unit:"",
  question:"Find "+p+"% of "+tidy(whole)+".",
  meaning:"The part is missing. You know the whole and the percent.",
  hint1:"Estimate first. Is "+p+"% less or greater than half?",
  hint2:"Convert "+p+"% to "+(p/100)+" and multiply by "+tidy(whole)+".",
  steps:p+"% = "+p+"/100 = "+(p/100)+". "+(p/100)+" × "+tidy(whole)+" = "+tidy(part)+"."
 };
}
H.percentStrategy={makeProblem};
const lessons=[["fdp/l05","part"],["fdp/l06","whole"],["fdp/l09","discount"]];
function studio(el,kind){
 let level="friendly",current=null,attempts=0,solved=0,questions=0,hint=0,feedback="";
 const friendly=[10,20,25,30,40,50,60,75],stretch=[12,15,18,35,42,45,62,85];
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 el.innerHTML='<section class="ps-lab">'+
 '<style>'+
 '.ps-lab{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.5}'+
 '.ps-lab .ps-top{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center}'+
 '.ps-lab .ps-choice,.ps-lab .ps-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}'+
 '.ps-lab .ps-choice button[aria-pressed="true"]{outline:2px solid var(--accent-ink);outline-offset:1px;font-weight:700}'+
 '.ps-lab .ps-layout{display:grid;grid-template-columns:minmax(0,1fr) 160px;gap:18px;align-items:start}'+
 '.ps-lab .ps-question{font-size:clamp(20px,3vw,26px);font-weight:650;margin:12px 0}'+
 '.ps-lab .ps-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:2px;width:150px;height:150px}'+
 '.ps-lab .ps-square{background:var(--soft);border:1px solid var(--rule)}'+
 '.ps-lab .ps-square.on{background:var(--accent)}'+
 '.ps-lab input{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius);padding:10px;width:100%;max-width:230px;box-sizing:border-box}'+
 '.ps-lab input:focus-visible,.ps-lab button:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.ps-lab .ps-feedback{min-height:30px;font-weight:600}'+
 '.ps-lab .ps-hint{margin:10px 0;padding:12px;background:var(--soft);border-left:3px solid var(--accent)}'+
 '@media(max-width:540px){.ps-lab .ps-layout{grid-template-columns:1fr}.ps-lab .ps-grid{width:130px;height:130px}}'+
 '</style>'+
 '<div class="eyebrow">Number Workshop · Unit 1</div>'+
 '<div class="ps-top"><div><h3 style="margin:4px 0">Percent Strategy Studio</h3><p class="note" style="margin:0">Estimate, solve, check, and explain your method. Practice is unlimited.</p></div><div class="note" id="ps-score">0 solved · 0 tried</div></div>'+
 '<div class="ps-choice" role="group" aria-label="Question difficulty"><button class="btn ghost" type="button" data-level="friendly" aria-pressed="true">Start with friendly numbers</button><button class="btn ghost" type="button" data-level="stretch" aria-pressed="false">Stretch my thinking</button></div>'+
 '<div class="ps-layout"><div><p id="ps-question" class="ps-question"></p><p id="ps-meaning" class="note"></p>'+
 '<form id="ps-form"><label for="ps-answer"><b>My answer</b> (round to the nearest hundredth if needed)</label><div class="ps-actions"><input id="ps-answer" type="text" inputmode="decimal" autocomplete="off" aria-describedby="ps-feedback" placeholder="Type a number"><button class="btn" type="submit">Check answer</button></div></form>'+
 '<div id="ps-feedback" class="ps-feedback" role="status" aria-live="polite"></div>'+
 '<div id="ps-hint" class="ps-hint" hidden></div>'+
 '<div class="ps-actions"><button class="btn ghost" type="button" id="ps-help">Give me a hint</button><button class="btn ghost" type="button" id="ps-show">Show worked solution</button><button class="btn" type="button" id="ps-next">New question</button></div></div>'+
 '<div><b class="eyebrow">Visual benchmark</b><div id="ps-grid" class="ps-grid" aria-hidden="true"></div><p class="note" id="ps-grid-label"></p></div></div>'+
 '<p class="note" style="margin-top:16px">Use scratch paper for your steps. This is practice, not a submitted assignment or a gradebook record.</p></section>';
 const $=s=>el.querySelector(s);
 const $$=s=>[...el.querySelectorAll(s)];
 const updateScore=()=>{$("#ps-score").textContent=solved+" solved · "+questions+" tried";};
 function next(){
  const options=level==="friendly"?friendly:stretch, p=pick(options);
  const whole=kind==="whole"?(level==="friendly"?pick([40,60,80,100,120,160]):pick([35,50,75,125,180])):(level==="friendly"?pick([40,60,80,100,120,160]):randomInt(20,170));
  current=makeProblem(kind,p,whole);attempts=0;hint=0;feedback="";questions++;
  $("#ps-question").textContent=current.question;
  $("#ps-meaning").textContent=current.meaning;
  $("#ps-answer").value="";$("#ps-feedback").textContent="";
  $("#ps-hint").hidden=true;$("#ps-hint").textContent="";
  $("#ps-grid").innerHTML=Array.from({length:100},(_,i)=>'<span class="ps-square'+(i<p?' on':'')+'"></span>').join("");
  $("#ps-grid-label").textContent=p+" shaded squares of 100 = "+p+"%. This grid shows the percent, not the number of objects.";
  updateScore();
 }
 $$("#ps-form").forEach(form=>form.onsubmit=e=>{
  e.preventDefault();
  const raw=$("#ps-answer").value.trim().replace(/[$,\s]/g,"");
  if(!raw||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)){ $("#ps-feedback").textContent="Enter a number, such as 12 or 12.5.";return;}
  const n=Number(raw);if(!Number.isFinite(n)){ $("#ps-feedback").textContent="That number could not be checked.";return;}
  attempts++;
  if(Math.abs(n-current.answer)<0.005){
   if(attempts===1)solved++;
   $("#ps-feedback").textContent="Correct. "+current.steps;
   updateScore();
  }else $("#ps-feedback").textContent="Not yet. Check whether you found the part, whole or sale price. You can request a hint.";
 });
 $("#ps-help").onclick=()=>{
  hint=Math.min(2,hint+1);$("#ps-hint").hidden=false;
  $("#ps-hint").textContent=hint===1?current.hint1:current.hint2;
 };
 $("#ps-show").onclick=()=>{$("#ps-hint").hidden=false;$("#ps-hint").textContent="Worked solution: "+current.steps;};
 $("#ps-next").onclick=next;
 $$("[data-level]").forEach(b=>b.onclick=()=>{
  level=b.dataset.level; $$("[data-level]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.level===level)));next();
 });
 next();
}
lessons.forEach(([id,kind])=>{H.lessonTools=H.lessonTools||{};H.lessonTools[id]=el=>studio(el,kind);});
})();