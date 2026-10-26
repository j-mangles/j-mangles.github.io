/* Divisibility Detective — Manitoba Math 7 outcome 7.N.1. Standalone, no network or storage. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
H.tools=H.tools||{};
const divisors=[2,3,4,5,6,8,9,10,0];
const small=[2,5,10];
const pick=a=>a[Math.floor(Math.random()*a.length)];
const digitSum=n=>String(Math.abs(n)).split("").reduce((sum,ch)=>sum+Number(ch),0);
const divisible=(n,d)=>d!==0&&n%d===0;
function explain(n,d){
 const sum=digitSum(n),last=n%10,two=n%100,three=n%1000,yes=divisible(n,d);
 switch(d){
  case 0:return "Division by zero is undefined. Zero times any number is zero, so it cannot produce a nonzero dividend; 0 ÷ 0 also has no unique answer.";
  case 2:return "The last digit is "+last+". It "+(yes?"is":"is not")+" even, so "+n+(yes?" is":" is not")+" divisible by 2.";
  case 3:return "Digit sum: "+String(n).split("").join(" + ")+" = "+sum+". "+sum+(yes?" is":" is not")+" divisible by 3.";
  case 4:return "Look at the last two digits: "+two+". "+two+(yes?" is":" is not")+" divisible by 4.";
  case 5:return "The last digit is "+last+". A multiple of 5 must end in 0 or 5.";
  case 6:return "Two tests: "+n+(n%2===0?" is even":" is odd")+" and the digit sum "+sum+(sum%3===0?" is divisible by 3":" is not divisible by 3")+". BOTH tests must pass for 6.";
  case 8:return "Look at the last three digits: "+three+". "+three+(yes?" is":" is not")+" divisible by 8.";
  case 9:return "Digit sum: "+String(n).split("").join(" + ")+" = "+sum+". "+sum+(yes?" is":" is not")+" divisible by 9.";
  case 10:return "The last digit is "+last+". A multiple of 10 must end in 0.";
  default:return "";
 }
}
function newProblem(level){
 const d=pick(level==="starter"?small:divisors);
 let n= Math.random()<.5&&d>0?d*(2+Math.floor(Math.random()*170)):20+Math.floor(Math.random()*1980);
 if(d>0&&Math.random()<.45&&n%d===0)n++;
 return {n,d};
}
H.tools.div=function(el){
 let level="all",problem=newProblem(level),answered=false,chosen=null,correct=0,attempts=0,analyzed=null,customNumber="";
 const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
 const get=sel=>el.querySelector(sel);
 function render(focus){
  const verdict=problem.d===0?"Can you divide by zero?":`Is ${problem.n} divisible by ${problem.d}?`;
  const rows=analyzed===null?"":divisors.map(d=>`<tr><th scope="row">${d===0?"÷ 0":"÷ "+d}</th><td>${d===0?"Undefined":divisible(analyzed,d)?"Yes":"No"}</td><td>${esc(explain(analyzed,d))}</td></tr>`).join("");
  el.innerHTML=`<section class="div-detector"><style>
  .div-detector{background:var(--paper);border:1px solid var(--rule);padding:18px;border-radius:var(--radius);line-height:1.5}
  .div-detector h3,.div-detector h4{margin:8px 0}.div-detector .dd-question{font-size:21px;font-weight:700;margin:10px 0}
  .div-detector .dd-actions{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin:12px 0}
  .div-detector button{min-height:42px}.div-detector input,.div-detector select{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);padding:9px;border-radius:5px;min-height:42px;max-width:100%;box-sizing:border-box}
  .div-detector button:focus-visible,.div-detector select:focus-visible,.div-detector input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
  .div-detector .dd-feedback{background:var(--soft);padding:12px;border-radius:6px;min-height:2em}
  .div-detector .dd-scroller{overflow-x:auto}.div-detector table{border-collapse:collapse;width:100%;font-size:14px}
  .div-detector th,.div-detector td{border-bottom:1px solid var(--rule);padding:8px;text-align:left;vertical-align:top}
  .div-detector .dd-split{border-top:1px solid var(--rule);margin-top:18px;padding-top:16px}
  </style><div class="eyebrow">Math 7 · 7.N.1 · Interactive practice</div><h3>Divisibility Detective</h3>
  <p class="note">The goal is to explain WHY, not just get the right answer. No scores or responses are sent to anyone.</p>
  <label>Practice level <select id="dd-level"><option value="all" ${level==="all"?"selected":""}>All rules (2, 3, 4, 5, 6, 8, 9, 10, and zero)</option><option value="starter" ${level==="starter"?"selected":""}>Start here (2, 5, 10)</option></select></label>
  <div class="dd-question" id="dd-question">${esc(verdict)}</div>
  <div class="dd-actions" role="group" aria-label="Divisibility answer"><button class="btn" data-answer="yes" ${answered?"disabled":""}>Yes</button><button class="btn ghost" data-answer="no" ${answered?"disabled":""}>No</button><button class="btn ghost" id="dd-next">New number</button></div>
  <div class="dd-feedback" id="dd-feedback" aria-live="polite">${answered?`<strong>${chosen===divisible(problem.n,problem.d)?"Correct!":"Not quite."}</strong> ${problem.d===0?"Division by zero isn't defined.":divisible(problem.n,problem.d)?"Yes, it divides evenly.":"No, it does not divide evenly."} ${esc(explain(problem.n,problem.d))}`:"Choose Yes or No, then explain your thinking."}</div>
  <p class="note" id="dd-score">Correct on first try: ${correct} of ${attempts}</p>
  <div class="dd-split"><h4>Test your own number</h4><p class="note">Enter a whole number from 0 to 9,999 to inspect every divisibility rule and its explanation.</p>
  <div class="dd-actions"><label for="dd-own">Your number</label><input id="dd-own" type="number" min="0" max="9999" step="1" inputmode="numeric" value="${esc(customNumber)}"><button class="btn ghost" id="dd-test">Check all rules</button></div>
  <p id="dd-error" role="status"></p>
  ${analyzed===null?"":`<div class="dd-scroller"><table><caption>Divisibility rules for ${analyzed}</caption><thead><tr><th scope="col">Divisor</th><th scope="col">Result</th><th scope="col">Reason</th></tr></thead><tbody>${rows}</tbody></table></div>`}
  </div></section>`;
  get("#dd-level").onchange=function(){level=this.value;problem=newProblem(level);answered=false;chosen=null;render("#dd-question");};
  get("#dd-next").onclick=()=>{problem=newProblem(level);answered=false;chosen=null;render("#dd-question");};
  el.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{
   if(answered)return;
   chosen=b.dataset.answer==="yes";answered=true;attempts++;if(chosen===divisible(problem.n,problem.d))correct++;render("#dd-next");
  });
  get("#dd-test").onclick=()=>{
   customNumber=get("#dd-own").value.trim();const n=Number(customNumber);
   if(customNumber===""||!Number.isInteger(n)||n<0||n>9999){get("#dd-error").textContent="Enter a whole number between 0 and 9,999.";return;}
   analyzed=n;render("#dd-own");
  };
  get("#dd-own").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();get("#dd-test").click();}};
  if(focus){const next=get(focus);if(next)next.focus({preventScroll:true});}
 }
 render();
};
})();