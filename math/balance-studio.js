/* Grade 7 Math · Equation Balance Studio
 * Teacher Unit 6 L03 Preservation of Equality and L05 One-Step Equations.
 * Bag-of-marbles analogy only for positive unknowns with addition equations.
 * This is a conceptual balance model, not a literal weighing instrument.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const tasks=[
 {a:4,b:11,label:"x + 4 = 11",story:"A bag plus 4 marbles balances 11 marbles."},
 {a:2,b:6,label:"x + 2 = 6",story:"A bag and 2 marbles weigh the same as 6 marbles."},
 {a:7,b:10,label:"x + 7 = 10",story:"An unknown bag and 7 loose marbles balance 10."},
 {a:5,b:12,label:"x + 5 = 12",story:"A bag and 5 marbles balance a pan of 12."},
 {a:3,b:8,label:"x + 3 = 8",story:"One bag and 3 marbles balance 8 marbles."},
 {a:6,b:14,label:"x + 6 = 14",story:"One bag with 6 extra marbles balances 14."}
];
function value(p){return p.b-p.a;}
function shift(p,action){
 const n=action==="bothRemove"?-p.a:action==="leftRemove"?-p.a:action==="rightRemove"?-p.a:action==="bothAdd"?2:0;
 const dl=action==="rightRemove"?0:n,dr=action==="leftRemove"?0:n;
 return {leftConstant:p.a+dl,rightConstant:p.b+dr,leftTotal:value(p)+p.a+dl,rightTotal:p.b+dr,delta:dl-dr,
   balanced:dl===dr,isolated:p.a+dl===0 && dl===dr,changeLeft:dl,changeRight:dr};
}
function formatAddition(leftConstant,rightConstant){
 const left=leftConstant>0?"x + "+leftConstant:leftConstant<0?"x − "+(-leftConstant):"x";
 return left+" = "+rightConstant;
}
function balanceSVG(p,action){
 const s=shift(p,action);
 const dy=Math.max(-21,Math.min(21,(s.leftTotal-s.rightTotal)*4));
 const leftY=124+dy,rightY=124-dy,panLeft=leftY+90,panRight=rightY+90;
 const size=17;
 function token(x,y,fill,text){
  return '<circle cx="'+x+'" cy="'+y+'" r="12" fill="'+fill+'" stroke="#364055" stroke-width="1"/>'+
   '<text x="'+x+'" y="'+(y+4.5)+'" font-size="12" font-weight="700" text-anchor="middle" fill="#17222C">'+text+'</text>';
 }
 function tokens(total,cx,y,columns,spacing){
  let s="";
  for(let i=0;i<total;i++){
   const row=Math.floor(i/columns),col=i%columns;
   const count=Math.min(columns,total-row*columns);
   const offset=(count-1)*spacing/2;
   s+=token(cx-offset+col*spacing,y+row*25-18,"#F3C77E","•");
  }
  return s;
 }
 let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 350" role="img" aria-label="Conceptual balance scale: '+formatAddition(s.leftConstant,s.rightConstant)+
  '. '+(s.balanced?"Balanced, with equal amounts on both sides.":"Unbalanced, because the same change was not made to both sides.")+
  '" style="width:100%;height:auto;max-width:780px">';
 svg+='<rect width="780" height="350" rx="13" fill="#F8F7F1"/>';
 svg+='<path d="M 390 147 L 390 304 M 300 304 L 480 304" stroke="#626A7A" stroke-width="11" stroke-linecap="round"/>';
 svg+='<circle cx="390" cy="138" r="16" fill="#F3C77E" stroke="#2B3244" stroke-width="3"/>';
 svg+='<line x1="164" y1="'+leftY+'" x2="616" y2="'+rightY+'" stroke="#474E64" stroke-width="8" stroke-linecap="round"/>';
 svg+='<line x1="192" y1="'+leftY+'" x2="192" y2="'+panLeft+'" stroke="#646E85" stroke-width="2.5"/>';
 svg+='<line x1="588" y1="'+rightY+'" x2="588" y2="'+panRight+'" stroke="#646E85" stroke-width="2.5"/>';
 svg+='<path d="M 98 '+panLeft+' Q 192 '+(panLeft+54)+' 286 '+panLeft+'" fill="#D9DEEE" stroke="#4E5874" stroke-width="3"/>';
 svg+='<path d="M 494 '+panRight+' Q 588 '+(panRight+54)+' 682 '+panRight+'" fill="#D9DEEE" stroke="#4E5874" stroke-width="3"/>';
 svg+='<text x="192" y="65" fill="#20243C" text-anchor="middle" font-size="20" font-weight="700">'+
  (s.leftConstant===0?"x":("x + "+s.leftConstant))+'</text>';
 svg+='<text x="588" y="65" fill="#20243C" text-anchor="middle" font-size="20" font-weight="700">'+s.rightConstant+'</text>';
 svg+='<rect x="110" y="'+(panLeft-71)+'" width="64" height="55" rx="11" fill="#9DB9E8" stroke="#37425F" stroke-width="2"/>';
 svg+='<text x="142" y="'+(panLeft-38)+'" fill="#1B2D5B" font-size="29" font-weight="700" text-anchor="middle">x</text>';
 svg+=tokens(Math.max(0,s.leftConstant),220,panLeft-48,4,27);
 svg+=tokens(Math.max(0,s.rightConstant),588,panRight-48,7,27);
 svg+='<text x="390" y="333" text-anchor="middle" font-size="14" fill="#596171">'+
  (s.balanced?"The equation is still equal.":"The scale is no longer level.")+'</text>';
 svg+='</svg>';
 return svg;
}
function render(el){
 const $=s=>el.querySelector(s),all=s=>[...el.querySelectorAll(s)];
 let problem=0,action="start",answer="",hint=false,solved=new Set(),explain="";
 el.innerHTML='<section class="balance-studio"><style>'+
 '.balance-studio{font-family:var(--f-body);color:var(--ink);line-height:1.5;font-size:16px}'+
 '.balance-studio .bs-row,.balance-studio .bs-ops{display:flex;align-items:end;gap:10px;flex-wrap:wrap;margin:16px 0}'+
 '.balance-studio .bs-ops button{font:inherit;cursor:pointer;font-size:14px;background:var(--paper);border:1px solid var(--rule);padding:9px 11px;min-height:44px;border-radius:6px;color:var(--ink)}'+
 '.balance-studio .bs-ops button[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);font-weight:700}'+
 '.balance-studio button:focus-visible,.balance-studio input:focus-visible,.balance-studio select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.balance-studio label{display:grid;gap:5px;font-size:13px;font-weight:700}'+
 '.balance-studio select,.balance-studio input{font:inherit;font-size:15px;padding:10px;min-height:44px;max-width:100%;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:6px}'+
 '.balance-studio .bs-figure{overflow-x:auto;border:1px solid var(--rule);border-radius:10px;background:#F8F7F1;margin:12px 0}'+
 '.balance-studio .bs-note{padding:12px 15px;background:var(--soft);border:1px solid var(--rule);border-radius:9px;margin:13px 0}'+
 '.balance-studio .bs-status{font-weight:650;color:var(--accent-ink);min-height:26px}'+
 '</style><div class="eyebrow">Math 7 · Unit 6 · Patterns and Equations</div>'+
 '<h2 style="margin:8px 0">Equation Balance Studio</h2>'+
 '<p class="note">Why does an equation stay true when you do the same thing to both sides? Test what happens to a bag of unknown marbles.</p>'+
 '<div class="bs-row"><label>Choose an equation<select id="bs-problem"></select></label><span id="bs-score" class="note"></span></div>'+
 '<div class="bs-figure" id="bs-figure"></div>'+
 '<p id="bs-equation" class="bs-note" aria-live="polite"></p>'+
 '<div class="bs-ops" role="group" aria-label="Operations on a balanced equation">'+
 '<button type="button" data-op="start">Original balance</button>'+
 '<button type="button" data-op="bothRemove">Remove the extra marbles from BOTH sides</button>'+
 '<button type="button" data-op="leftRemove">Remove them from the LEFT only</button>'+
 '<button type="button" data-op="rightRemove">Remove them from the RIGHT only</button>'+
 '<button type="button" data-op="bothAdd">Add 2 marbles to BOTH sides</button></div>'+
 '<p id="bs-reason" class="bs-note" aria-live="polite"></p>'+
 '<form class="bs-row" id="bs-form"><label>How many marbles are in the bag?<input id="bs-answer" type="number" step="1" required placeholder="x = ?"></label>'+
 '<button class="btn" type="submit">Check x</button></form>'+
 '<p id="bs-feedback" class="bs-status" role="status" aria-live="polite"></p>'+
 '<div class="bs-row"><button id="bs-hint" type="button" class="btn ghost">Hint</button>'+
 '<button id="bs-next" type="button" class="btn ghost">Next balance</button></div>'+
 '<p class="note">This model uses positive numbers of marbles so the scale is intuitive. Negative-number equations are covered later with symbolic steps, not negative physical weights. Nothing is submitted or graded.</p></section>';
 const picker=$("#bs-problem");
 picker.innerHTML=tasks.map((p,i)=>'<option value="'+i+'">'+p.label+'</option>').join("");
 function draw(){
  const p=tasks[problem],s=shift(p,action);
  $("#bs-figure").innerHTML=balanceSVG(p,action);
  $("#bs-equation").textContent=action==="start"?p.label+"  ·  "+p.story:
   formatAddition(s.leftConstant,s.rightConstant)+"  ·  "+(s.balanced?"Both sides are equal.":"Equality was broken.");
  all("[data-op]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.op===action)));
  $("#bs-reason").textContent=action==="start"?"Predict which operation will keep the scale level AND isolate x.":
   s.isolated?"Removing "+p.a+" from both sides leaves x on one side and "+value(p)+" on the other.":
   s.balanced?"You changed both sides equally, so the equation stays true. But x is not isolated yet.":
   "You changed just one side. The equality is no longer true; notice how the scale tips.";
  $("#bs-score").textContent=solved.size+" of "+tasks.length+" examples solved";
  $("#bs-feedback").textContent=answer;
 }
 function choose(n){
  problem=n;action="start";answer="";hint=false;
  picker.value=String(n);$("#bs-answer").value="";draw();
 }
 picker.onchange=()=>choose(Number(picker.value));
 all("[data-op]").forEach(b=>b.onclick=()=>{action=b.dataset.op;draw();});
 $("#bs-form").onsubmit=e=>{
  e.preventDefault();
  const raw=$("#bs-answer").value.trim(),p=tasks[problem];
  if(!/^\d+$/.test(raw)){answer="Enter a whole number.";draw();return;}
  if(Number(raw)===value(p)){
   solved.add(problem);answer="Correct! x = "+value(p)+", because "+value(p)+" + "+p.a+" = "+p.b+".";
  }else answer="Not yet. Try removing "+p.a+" marbles from both sides.";
  draw();
 };
 $("#bs-hint").onclick=()=>{
  const p=tasks[problem];
  answer="Hint: x + "+p.a+" = "+p.b+". Subtract "+p.a+" from BOTH sides. What remains?";
  draw();
 };
 $("#bs-next").onclick=()=>choose((problem+1)%tasks.length);
 choose(0);
}
H.tools=H.tools||{};H.tools.eq=render;
window.BalanceStudioCore={tasks,value,shift,formatAddition,balanceSVG};
})();
