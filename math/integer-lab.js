/* Grade 7 Integer Lab: counters, zero pairs, and a signed number line.
   Based on the teacher's Unit 5 Lesson 1–2 student practice. Models are exact. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const EXAMPLES=[
 {a:4,b:-1,op:"+",tag:"Mixed signs"},
 {a:2,b:-5,op:"+",tag:"Mixed signs"},
 {a:-3,b:-3,op:"+",tag:"Same signs"},
 {a:6,b:-6,op:"+",tag:"Zero pairs"},
 {a:-7,b:4,op:"+",tag:"Mixed signs"},
 {a:3,b:5,op:"+",tag:"Same signs"},
 {a:-4,b:7,op:"+",tag:"Number line"},
 {a:5,b:-8,op:"+",tag:"Number line"},
 {a:3,b:8,op:"−",tag:"Remove positives"},
 {a:-2,b:5,op:"−",tag:"Remove positives"},
 {a:4,b:-3,op:"−",tag:"Remove negatives"},
 {a:-6,b:-4,op:"−",tag:"Remove negatives"},
 {a:-3,b:-5,op:"−",tag:"Adding the opposite"},
 {a:-8,b:-3,op:"−",tag:"Adding the opposite"},
 {a:0,b:4,op:"−",tag:"Start at zero"},
 {a:-1,b:-1,op:"−",tag:"Zero result"}
];
function sign(n){return n<0?"("+n+")":"(+"+n+")";}
function expression(p){return sign(p.a)+" "+p.op+" "+sign(p.b);}
function solve(p){return p.op==="+"?p.a+p.b:p.a-p.b;}
function count(n){return {plus:Math.max(0,n),minus:Math.max(0,-n)};}
function initial(p){return count(p.a);}
function process(p){
 const before=initial(p),correct=solve(p);
 if(p.op==="+"){
  const added=count(p.b),positive=before.plus+added.plus,negative=before.minus+added.minus;
  const pairs=Math.min(positive,negative);
  return {before,working:{plus:positive,minus:negative},after:count(correct),
   addedPairs:0,removedPairs:pairs,removedType:"",removed:0,
   explanation:"Put both sets together. Cross out "+pairs+" positive–negative zero "+(pairs===1?"pair":"pairs")+
    ". A zero pair has value 0, so the tiles left give the answer "+correct+"."};
 }
 const remove=count(p.b);
 const addedPairs=Math.max(0,remove.plus-before.plus,remove.minus-before.minus);
 const working={plus:before.plus+addedPairs,minus:before.minus+addedPairs};
 const after={plus:working.plus-remove.plus,minus:working.minus-remove.minus};
 if(after.plus-after.minus!==correct)throw Error("Invalid subtraction counters");
 return {before,working,after,addedPairs,removedPairs:0,
   removedType:p.b<0?"negative":"positive",removed:Math.abs(p.b),
   explanation:(addedPairs?"First add "+addedPairs+" positive–negative zero "+(addedPairs===1?"pair":"pairs")+
    " without changing the value. ":"There are enough tiles to subtract without adding zero pairs. ")+
    "Remove "+Math.abs(p.b)+" "+(p.b<0?"negative":"positive")+" "+(Math.abs(p.b)===1?"tile":"tiles")+
    ". The remaining tiles have value "+correct+"."};
}
function countersSVG(p,step){
 const proc=process(p);
 const sets=step===0?proc.before:step===1?proc.working:proc.after;
 const cols=10,spacing=33;
 const n=Math.max(sets.plus,sets.minus,1),rows=Math.ceil(n/cols),height=Math.max(116,75+rows*spacing);
 const out=['<svg role="img" aria-label="Counter model for '+expression(p)+' at stage '+(step+1)+
  ': '+sets.plus+' positive and '+sets.minus+' negative tiles" viewBox="0 0 740 '+height+
  '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:740px">'];
 out.push('<rect x="0" y="0" width="740" height="'+height+'" rx="10" fill="#F8F6F0"/>');
 function drawColumn(amount,startX,fill,symbol,title){
  out.push('<text x="'+startX+'" y="25" font-size="16" font-weight="700" fill="#242424">'+title+': '+amount+'</text>');
  for(let i=0;i<amount;i++){
   const x=startX+16+(i%cols)*spacing,y=56+Math.floor(i/cols)*spacing;
   const extra=step===1&&p.op==="−"&&i>=proc.before[symbol==="+"?"plus":"minus"];
   out.push('<circle cx="'+x+'" cy="'+y+'" r="14" fill="'+fill+'" stroke="'+(extra?"#1f1d3d":"none")+
    '" stroke-width="'+(extra?2:0)+'"/>');
   out.push('<text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-size="18" font-weight="700" fill="#171717">'+symbol+'</text>');
  }
 }
 drawColumn(sets.plus,18,"#B4DCAD","+","Positive");
 drawColumn(sets.minus,390,"#F1B0A3","−","Negative");
 out.push("</svg>");
 return out.join("");
}
function numberlineSVG(p,step){
 const start=p.a,delta=p.op==="+"?p.b:-p.b,end=solve(p);
 const low=Math.min(start,end,0)-2,high=Math.max(start,end,0)+2,span=high-low;
 const x=n=>40+(n-low)/span*690,arrowEnd=x(end),arrowStart=x(start);
 const ticks=[];
 for(let n=low;n<=high;n++)ticks.push(
  '<line x1="'+x(n).toFixed(1)+'" y1="68" x2="'+x(n).toFixed(1)+'" y2="80" stroke="#444" stroke-width="1"/>'+
  '<text x="'+x(n).toFixed(1)+'" y="99" text-anchor="middle" font-size="11" fill="#262626">'+n+'</text>');
 const zero='<line x1="'+x(0).toFixed(1)+'" y1="42" x2="'+x(0).toFixed(1)+'" y2="80" stroke="#7976A7" stroke-dasharray="4 3"/>';
 const directional=step>=1&&delta!==0?
  '<line x1="'+arrowStart.toFixed(1)+'" y1="40" x2="'+arrowEnd.toFixed(1)+'" y2="40" stroke="#B73569" stroke-width="4" marker-end="url(#il-arrow)"/>'+
  '<text x="'+((arrowStart+arrowEnd)/2).toFixed(1)+'" y="24" text-anchor="middle" fill="#8C164A" font-weight="700" font-size="13">'+
  (delta>0?"+":"")+delta+' '+(delta>0?"right":"left")+'</text>':"";
 return '<svg role="img" aria-label="Integer number line from '+start+
  (step>=1?" moving "+Math.abs(delta)+" units "+(delta>=0?"right":"left")+" to "+end:" at the starting position")+
  '" viewBox="0 0 760 112" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:330px">'+
  '<defs><marker id="il-arrow" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#B73569"/></marker></defs>'+
  '<rect x="0" y="0" width="760" height="112" rx="10" fill="#F8F6F0"/>'+
  '<line x1="40" y1="74" x2="730" y2="74" stroke="#292929" stroke-width="2"/>'+zero+ticks.join("")+
  directional+'<circle cx="'+arrowStart.toFixed(1)+'" cy="74" r="6" fill="#6562A5"/>'+
  (step===2?'<circle cx="'+arrowEnd.toFixed(1)+'" cy="74" r="7" fill="#B73569"/>'+
  '<text x="'+arrowEnd.toFixed(1)+'" y="57" text-anchor="middle" font-size="13" fill="#8C164A">result '+end+'</text>':"")+
  '</svg>';
}
function render(el){
 let selected=0,stage=0,mode="counters",correct=new Set(),feedback="";
 const $=s=>el.querySelector(s),all=s=>[...el.querySelectorAll(s)];
 el.innerHTML='<section class="integer-lab"><style>'+
 '.integer-lab{color:var(--ink);font-family:var(--f-body)}'+
 '.integer-lab .il-row{display:flex;flex-wrap:wrap;align-items:end;gap:12px;margin:13px 0}'+
 '.integer-lab label{display:grid;gap:5px;font-weight:700;font-size:13px}'+
 '.integer-lab select,.integer-lab input{font:inherit;font-size:15px;background:var(--paper);color:var(--ink);padding:10px 12px;min-height:44px;border-radius:5px;border:1px solid var(--rule);max-width:100%}'+
 '.integer-lab .il-mode,.integer-lab .il-steps{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}'+
 '.integer-lab .il-mode button,.integer-lab .il-steps button{font:inherit;font-size:13px;padding:9px 11px;min-height:42px;cursor:pointer;border:1px solid var(--rule);border-radius:5px;background:var(--paper);color:var(--ink)}'+
 '.integer-lab button[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-soft);font-weight:700}'+
 '.integer-lab button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '.integer-lab .il-visual{overflow-x:auto;background:#F8F6F0;border:1px solid var(--rule);border-radius:8px;padding:8px}'+
 '.integer-lab .il-note{border-left:3px solid var(--accent);padding:10px 12px;background:var(--paper);margin:12px 0;font-size:15px}'+
 '.integer-lab .il-input{width:150px}'+
 '.integer-lab .il-feedback{min-height:42px;margin:8px 0;font-weight:700}'+
 '</style><div class="eyebrow">Grade 7 · Integer Operations</div><h2 style="margin:7px 0 10px">Integer Tiles & Number Line</h2>'+
 '<p class="note">Use zero pairs or number-line jumps to explain <strong>why</strong> integer addition and subtraction work. Every green + and red − pair has a total value of zero.</p>'+
 '<div class="il-row"><label>Choose a problem<select id="il-problem"></select></label><span id="il-score" class="note" aria-live="polite"></span></div>'+
 '<div class="il-mode" role="group" aria-label="Choose model">'+
 '<button type="button" data-mode="counters">Positive & negative tiles</button>'+
 '<button type="button" data-mode="numberline">Number line</button></div>'+
 '<div class="il-steps" role="group" aria-label="Model steps"><button data-stage="0" type="button">1. Start</button>'+
 '<button data-stage="1" type="button">2. Add / prepare</button>'+
 '<button data-stage="2" type="button">3. Result</button></div>'+
 '<div id="il-visual" class="il-visual"></div><p id="il-explain" class="il-note" aria-live="polite"></p>'+
 '<form id="il-form" class="il-row"><label>Predict the answer <input class="il-input" id="il-answer" inputmode="numeric" pattern="-?[0-9]+" placeholder="e.g. -3" required></label>'+
 '<button class="btn" type="submit">Check answer</button></form>'+
 '<p id="il-feedback" class="il-feedback" role="status" aria-live="polite"></p>'+
 '<div class="il-row"><button class="btn ghost" id="il-hint" type="button">Show hint</button>'+
 '<button class="btn ghost" id="il-worked" type="button">Show explanation</button>'+
 '<button class="btn ghost" id="il-next" type="button">Next expression</button></div>'+
 '<p id="il-help" class="il-note" hidden></p>'+
 '<p class="note">Your answers stay in this page session only. They are not submitted or stored as grades.</p></section>';
 const picker=$("#il-problem");
 picker.innerHTML=EXAMPLES.map((p,i)=>'<option value="'+i+'">'+expression(p)+' · '+p.tag+'</option>').join("");
 function draw(){
  const p=EXAMPLES[selected],model=process(p),result=solve(p);
  $("#il-visual").innerHTML=mode==="counters"?countersSVG(p,stage):numberlineSVG(p,stage);
  all("[data-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  all("[data-stage]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.stage===stage)));
  const stepText=stage===0?
    "Start with "+Math.abs(p.a)+" "+(p.a<0?"negative":"positive")+" tiles, or start at "+p.a+" on the number line.":
    stage===1? (p.op==="+"?
      "Add "+Math.abs(p.b)+" "+(p.b<0?"negative":"positive")+" tiles. A + and − can cancel without changing the total.":
      (model.addedPairs?"Add "+model.addedPairs+" zero pairs so there are enough tiles to remove. ":"No extra zero pairs are needed. ")+
      "Subtracting "+p.b+" is the same as adding "+(-p.b)+"."):
      model.explanation;
  $("#il-explain").textContent=stepText;
  $("#il-score").textContent=correct.size+" of "+EXAMPLES.length+" expressions solved this session";
  $("#il-feedback").textContent=feedback;
 }
 function load(i){
  selected=i;stage=0;feedback="";picker.value=String(i);
  $("#il-answer").value="";$("#il-help").hidden=true;
  draw();
 }
 picker.onchange=()=>load(Number(picker.value));
 all("[data-mode]").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;draw();});
 all("[data-stage]").forEach(b=>b.onclick=()=>{stage=Number(b.dataset.stage);draw();});
 $("#il-form").onsubmit=e=>{
  e.preventDefault();const raw=$("#il-answer").value.trim(),p=EXAMPLES[selected];
  if(!/^-?\d{1,3}$/.test(raw)){feedback="Enter a whole number, such as −3 or 4.";draw();return;}
  if(Number(raw)===solve(p)){correct.add(selected);feedback="Correct! Now explain the movement or which zero pairs cancel.";}
  else feedback="Not quite. Check the direction of the jump or try the tiles at Step 2.";
  draw();
 };
 $("#il-hint").onclick=()=>{
  const p=EXAMPLES[selected],delta=p.op==="+"?p.b:-p.b;
  $("#il-help").hidden=false;
  $("#il-help").textContent=(p.op==="−"?"Rewrite as "+p.a+" + ("+(-p.b)+"). ":"")+
   "Start at "+p.a+". Move "+Math.abs(delta)+" units "+(delta<0?"left":delta>0?"right":"nowhere")+
   ". Then count the landing point.";
 };
 $("#il-worked").onclick=()=>{
  const p=EXAMPLES[selected],m=process(p);
  stage=2;draw();$("#il-help").hidden=false;
  $("#il-help").textContent=expression(p)+" = "+solve(p)+". "+m.explanation+
    " On a number line, start at "+p.a+" and move "+Math.abs(p.op==="+"?p.b:-p.b)+
    " units "+((p.op==="+"?p.b:-p.b)<0?"left":"right")+".";
 };
 $("#il-next").onclick=()=>load((selected+1)%EXAMPLES.length);
 load(0);
}
H.tools=H.tools||{};H.tools.int=render;
window.IntegerLabCore={EXAMPLES,process,solve,countersSVG,numberlineSVG};
})();
