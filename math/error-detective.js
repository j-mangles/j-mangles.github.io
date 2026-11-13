/* Math 7 · Error Detective — original work, Grade 7 FDP unit review.
   Students identify the first wrong step, correct the numerical result,
   and write an explanation. All work lives in this tab until exported. */
(function(g){
"use strict";
const H=g.HUB;if(!H)return;
const CASES=[
 {id:"m1",title:"Percent place value",question:"A student changes 5% to a decimal.",steps:["5% means 5 out of 100.","5 ÷ 100 = 0.5.","Therefore, 5% equals 0.5."],wrong:1,answer:.05,unit:"",ask:"What is 5% as a decimal?",why:"Dividing 5 by 100 moves the decimal two places: 5 ÷ 100 = 0.05, not 0.5.",type:"hundred",pct:5},
 {id:"m2",title:"Negative-number comparison",question:"A student decides which of -0.40 and -0.35 is greater.",steps:["Write -0.4 as -0.40.","Because 40 > 35, -0.40 > -0.35.","So -0.40 is farther right on the number line."],wrong:1,answer:-.35,unit:"",ask:"What is the greater number: -0.40 or -0.35?",why:"For negative numbers, farther right is greater. -0.35 is to the right of -0.40.",type:"line"},
 {id:"m3",title:"Finding a quarter",question:"A student tries to find 25% of 80.",steps:["25% means one quarter.","80 ÷ 25 = 3.2.","Therefore 25% of 80 is 3.2."],wrong:1,answer:20,unit:"",ask:"What is 25% of 80?",why:"25% = 1/4, so 80 ÷ 4 = 20. Dividing by 25 is not the same as finding 25%.",type:"hundred",pct:25},
 {id:"m4",title:"A fraction as a percent",question:"A student converts 3/8 to a percent.",steps:["3 ÷ 8 = 0.375.","0.375 × 10 = 3.75%.","Thus 3/8 is 3.75%."],wrong:1,answer:37.5,unit:"%",ask:"What percent is 3/8?",why:"To convert a decimal to a percent, multiply by 100. 0.375 × 100 = 37.5%.",type:"bar",pct:37.5},
 {id:"m5",title:"Discount before tax",question:"An item costs $60, is 20% off, then has 12% practice sales tax added.",steps:["20% of $60 is $12 off.","12% tax on the original $60 is $7.20.","$60 − $12 + $7.20 = $55.20."],wrong:1,answer:53.76,unit:"$",ask:"What is the final price after discount, then tax?",why:"First pay $60 − $12 = $48. Tax is 12% of $48 = $5.76. Final price: $53.76.",type:"money"},
 {id:"m6",title:"Percents above 100",question:"A student solves 150% of 40.",steps:["150% = 1.5.","1.5 × 40 = 60.","A percent cannot exceed 100%, so cap the answer at 40."],wrong:2,answer:60,unit:"",ask:"What is 150% of 40?",why:"Percents above 100 are meaningful. 150% is one and a half times the whole, so 60 is correct.",type:"bar",pct:150},
 {id:"m7",title:"Comparing mixed forms",question:"A student compares 0.6 with 58%.",steps:["0.6 is the same as 6%.","6% is less than 58%.","Therefore 58% is greater than 0.6."],wrong:0,answer:.6,unit:"",ask:"Which is greater, as a decimal: 0.6 or 58%?",why:"0.6 = 60%, and 60% > 58%. The decimal 0.6 is greater.",type:"bar",pct:60},
 {id:"m8",title:"Find the missing whole",question:"A student solves: 15 is 30% of what number?",steps:["30% = 0.30.","15 ÷ 0.30 = 4.5.","The whole number is 4.5."],wrong:1,answer:50,unit:"",ask:"If 15 is 30%, what is the whole?",why:"Divide the part by the decimal percent: 15 ÷ 0.30 = 50. Check: 30% of 50 = 15.",type:"hundred",pct:30},
 {id:"m9",title:"Mixed number to percent",question:"A student converts 1 1/4 into a percent.",steps:["1 1/4 = 5/4.","5 ÷ 4 = 1.25.","1.25 × 100 = 12.5%."],wrong:2,answer:125,unit:"%",ask:"What percent is 1 1/4?",why:"1.25 × 100 = 125%. One and a quarter is larger than one whole.",type:"bar",pct:125}
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".ed{margin:18px 0;padding:20px;border:1px solid var(--rule);background:var(--paper);border-radius:12px;line-height:1.55;color:var(--ink)}",
".ed *{box-sizing:border-box}.ed h3{font-size:1.3rem;margin:0 0 6px}.ed h4{margin:0 0 8px;font-size:1.08rem}.ed p{margin:7px 0;color:var(--muted)}",
".ed .ed-cases{display:flex;gap:5px;flex-wrap:wrap;margin:15px 0}.ed button{font:inherit;border:1px solid var(--rule);border-radius:7px;min-height:42px;padding:9px 12px;color:var(--ink);background:var(--paper);cursor:pointer;font-weight:700}",
".ed button.primary{background:var(--btn);border-color:var(--btn);color:var(--on-btn)}.ed .ed-cases button{min-width:42px}.ed .ed-cases button[aria-pressed=true]{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}",
".ed button:focus-visible,.ed input:focus-visible,.ed textarea:focus-visible,.ed select:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".ed .ed-cols{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:17px;align-items:start}",
".ed .ed-work{border:1px solid var(--rule);padding:15px;border-radius:10px;background:var(--soft)}.ed .ed-work ol{margin:10px 0 0;padding-left:25px}.ed .ed-work li{padding:5px 0}",
".ed label{font-weight:700;font-size:.84rem;display:grid;gap:7px;margin:11px 0}.ed select,.ed input,.ed textarea{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:7px;min-height:43px;padding:9px 11px;width:100%}",
".ed textarea{min-height:82px;resize:vertical}.ed .ed-visual{padding:11px;border:1px solid var(--rule);border-radius:10px;background:var(--soft);margin:12px 0}.ed .ed-visual svg{display:block;width:100%;height:auto}",
".ed .ed-feedback{min-height:26px;color:var(--accent-ink);font-size:.86rem;font-weight:680}.ed .ed-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.ed .ed-progress{font-size:.84rem;color:var(--muted)}",
".ed .ed-note{font-size:.8rem!important}.ed .ed-summary{border-top:1px solid var(--rule);margin-top:18px;padding-top:16px}",
"@media(max-width:730px){.ed .ed-cols{grid-template-columns:1fr}}@media(max-width:500px){.ed{padding:12px}}"
].join("\n");
function diagram(q){
 let out='<svg viewBox="0 0 630 185" role="img" aria-label="Visual check for '+esc(q.title)+'">';
 if(q.type==="hundred"){
  const size=11,step=13,fill=Math.round(q.pct);
  for(let y=0;y<10;y++)for(let x=0;x<10;x++){
   const i=y*10+x;
   out+='<rect x="'+(46+x*step)+'" y="'+(18+y*step)+'" width="'+size+'" height="'+size+'" fill="'+(i<fill?"#428472":"#fff")+'" stroke="#749187" stroke-width="1"/>';
  }
  out+='<text x="202" y="57" fill="#244238" font-size="17">'+q.pct+' of 100 squares shaded</text>';
  out+='<text x="202" y="85" fill="#244238" font-size="14">Use 100 squares to check the decimal or percent.</text>';
 }else if(q.type==="line"){
  out+='<path d="M55 100H575" stroke="#244238" stroke-width="3"/>';
  for(let i=0;i<=10;i++){
   const x=55+i*52,n=(-1+i*.1).toFixed(1);
   out+='<path d="M'+x+' 93V108" stroke="#244238" stroke-width="2"/><text x="'+x+'" y="128" font-size="13" text-anchor="middle">'+n+'</text>';
  }
  for(const [value,label,color] of [[-.4,"−0.40","#ad6a38"],[-.35,"−0.35","#387ca6"]]){
   const x=55+(value+1)*520;out+='<circle cx="'+x+'" cy="100" r="7" fill="'+color+'"/><text x="'+x+'" y="'+(label==="−0.40"?65:155)+'" text-anchor="middle" font-size="15" fill="'+color+'">'+label+'</text>';
  }
 }else{
  const pct=q.type==="money"?80:q.pct;
  const scale=Math.max(100,pct),width=440*pct/scale,baseline=65+440*100/scale;
  out+='<rect x="65" y="50" width="440" height="35" fill="#e9eee9" stroke="#789083"/>';
  out+='<rect x="65" y="50" width="'+width+'" height="35" fill="#428472"/>';
  out+='<path d="M'+baseline+' 45V93" stroke="#244238" stroke-width="2" stroke-dasharray="4 3"/><text x="65" y="130" font-size="12">0%</text><text x="'+baseline+'" y="130" font-size="12" text-anchor="middle">100%</text>';
  out+='<text x="65" y="32" font-size="14">'+(q.type==="money"?"$48 sale price before tax, compared with $60 original":pct+"% of a whole")+'</text>';
  out+='<text x="65" y="113" font-size="13">A visual estimate helps check if the calculation is reasonable.</text>';
 }
 return out+'</svg>';
}
function mount(el){
 let index=0,attempts={},results={},reasons={};
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="ed"><style>'+css+'</style><h3>Worked-Solution Error Detective</h3>'+
 '<p>Each fictional student has made a mathematical mistake. Find the <b>first incorrect line</b>, calculate the correct value, and explain why the correction makes sense. This is a review activity, not a timed test.</p>'+
 '<div class="ed-cases" role="group" aria-label="Choose worked solution"></div>'+
 '<div class="ed-cols"><div><div class="ed-work"><h4 id="ed-title"></h4><p id="ed-question"></p><ol id="ed-steps"></ol></div>'+
 '<div class="ed-visual" id="ed-diagram"></div></div>'+
 '<div><label>Which line contains the first mathematical error?<select id="ed-step"><option value="">Select a line</option><option value="0">Line 1</option><option value="1">Line 2</option><option value="2">Line 3</option></select></label>'+
 '<label id="ed-answer-label"><span id="ed-question-ask"></span><input id="ed-value" inputmode="decimal" type="number" step="any" placeholder="Correct numerical value"></label>'+
 '<label>Explain the misunderstanding in your own words<textarea id="ed-reason" placeholder="The first error happens when… The correction works because…"></textarea></label>'+
 '<div class="ed-actions"><button type="button" class="primary" id="ed-check">Check my correction</button><button type="button" id="ed-hint">Show a hint</button></div>'+
 '<p id="ed-feedback" class="ed-feedback" role="status"></p>'+
 '<button type="button" id="ed-next">Next case</button></div></div>'+
 '<section class="ed-summary"><h4>Review record</h4><p id="ed-progress" class="ed-progress" role="status"></p>'+
 '<p class="ed-note">Correct calculations and error locations are checked automatically. Your written explanations are for teacher review, not machine grading. Your work remains in this browser tab until exported.</p>'+
 '<div class="ed-actions"><button type="button" class="primary" id="ed-export">Download review record</button><button type="button" id="ed-reset">Reset my work</button></div><p id="ed-export-status" class="ed-feedback" role="status"></p></section></section>';
 function draw(){
  const q=CASES[index];
  $(".ed-cases").innerHTML=CASES.map((item,i)=>'<button type="button" data-case="'+i+'" aria-label="Case '+(i+1)+': '+esc(item.title)+'" aria-pressed="'+(i===index)+'">'+(results[item.id]?"✓":i+1)+'</button>').join("");
  $("#ed-title").textContent="Case "+(index+1)+" · "+q.title;
  $("#ed-question").textContent=q.question;
  $("#ed-steps").innerHTML=q.steps.map(t=>'<li>'+esc(t)+'</li>').join("");
  $("#ed-diagram").innerHTML=diagram(q);
  $("#ed-question-ask").textContent=q.ask;
  $("#ed-step").value="";$("#ed-value").value="";$("#ed-reason").value=reasons[q.id]||"";
  $("#ed-feedback").textContent=results[q.id]?"This case is recorded as correct. You can still review it.":"";
  $("#ed-progress").textContent=Object.keys(results).length+" of "+CASES.length+" corrections checked; "+Object.values(attempts).reduce((a,b)=>a+b,0)+" total attempts.";
 }
 el.addEventListener("click",e=>{
  const b=e.target.closest("[data-case]");
  if(b&&el.contains(b)){reasons[CASES[index].id]=$("#ed-reason").value;index=Number(b.dataset.case);draw();}
 });
 $("#ed-check").addEventListener("click",()=>{
  const q=CASES[index],v=$("#ed-value").value.trim(),step=$("#ed-step").value;
  reasons[q.id]=$("#ed-reason").value;
  if(step===""||v===""||!Number.isFinite(Number(v))){
   $("#ed-feedback").textContent="Choose a line and enter your corrected numerical value.";return;
  }
  if(reasons[q.id].trim().split(/\s+/).filter(Boolean).length<9){
   $("#ed-feedback").textContent="Explain your reasoning in at least nine words before checking.";return;
  }
  attempts[q.id]=(attempts[q.id]||0)+1;
  const goodStep=Number(step)===q.wrong,goodValue=Math.abs(Number(v)-q.answer)<=.005;
  if(goodStep&&goodValue){results[q.id]={step:Number(step),value:Number(v)};$("#ed-feedback").textContent="Correct! "+q.why;}
  else $("#ed-feedback").textContent=(goodStep?"You found the first incorrect line. ":"Recheck which line first becomes incorrect. ")+(goodValue?"Your numerical correction is right. ":"Try recalculating the value. ")+"You can use the visual check.";
  $("#ed-progress").textContent=Object.keys(results).length+" of "+CASES.length+" corrections checked; "+Object.values(attempts).reduce((a,b)=>a+b,0)+" total attempts.";
  $(".ed-cases").querySelectorAll("[data-case]").forEach((b,i)=>{b.textContent=results[CASES[i].id]?"✓":String(i+1);});
 });
 $("#ed-hint").addEventListener("click",()=>{$("#ed-feedback").textContent="Hint: "+CASES[index].why.replace(/= [^.]+/, "= ...")+" Identify the first place the method stops matching the meaning of the number.";});
 $("#ed-next").addEventListener("click",()=>{reasons[CASES[index].id]=$("#ed-reason").value;index=(index+1)%CASES.length;draw();});
 $("#ed-export").addEventListener("click",()=>{
  reasons[CASES[index].id]=$("#ed-reason").value;
  if(Object.keys(results).length<5){$("#ed-export-status").textContent="Complete at least five different corrections before exporting.";return;}
  const report=["Math 7 · Worked-Solution Error Detective","Unit 1 Review: fractions, decimals and percents","Self-check covers numerical answers only; written reasoning needs teacher review.","",
   ...CASES.filter(q=>results[q.id]).flatMap(q=>["Case "+q.id+": "+q.title,"First wrong line: "+(q.wrong+1),
    "Correct value: "+q.answer+(q.unit||""),"Student explanation: "+(reasons[q.id]||""),""]),
    "Total correct cases: "+Object.keys(results).length,"Total attempts: "+Object.values(attempts).reduce((a,b)=>a+b,0)].join("\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="math-error-detective.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#ed-export-status").textContent="Review downloaded. Follow your teacher's hand-in instructions.";
 });
 $("#ed-reset").addEventListener("click",()=>{
  if(!g.confirm("Reset all nine error-detective cases and written explanations?"))return;
  index=0;attempts={};results={};reasons={};draw();
 });
 draw();el.errorDetective={get solved(){return Object.keys(results).length;},select(i){if(Number.isInteger(i)&&i>=0&&i<CASES.length){index=i;draw();}}};
}
H.lessonTools=H.lessonTools||{};
const previous=H.lessonTools["fdp/l21"];
H.lessonTools["fdp/l21"]=root=>{
 if(previous){const old=document.createElement("div");root.appendChild(old);previous(old);}
 const panel=document.createElement("div");root.appendChild(panel);mount(panel);
};
g.ErrorDetectiveData=CASES;
})(window);