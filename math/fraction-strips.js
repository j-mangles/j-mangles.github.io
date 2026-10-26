/* Grade 7 Math 7.N.5 · Fraction Strip Lab (Unit 4)
   Supports like/unlike denominators and positive mixed-number sums/differences.
   Based on existing teacher Unit 4 lessons 2–4. No student data is stored. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const gcd=(a,b)=>{while(b){const t=a%b;a=b;b=t;}return a;};
const lcm=(a,b)=>a/gcd(a,b)*b;
const format=(n,d)=>{
 const g=gcd(n,d),a=n/g,b=d/g,whole=Math.floor(a/b),rest=a%b;
 return (whole?(whole+(rest?" ":"")):"")+(rest?rest+"/"+b:whole?"":"0");
};
const fracInput=text=>{
 const s=String(text||"").trim().replace(/\s+/g," ");
 const m=s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
 const f=s.match(/^(\d+)\/(\d+)$/),i=s.match(/^(\d+)$/);
 let n,d;
 if(m){d=Number(m[3]);n=Number(m[1])*d+Number(m[2]);}
 else if(f){n=Number(f[1]);d=Number(f[2]);}
 else if(i){n=Number(i[1]);d=1;}
 else return null;
 if(!(Number.isSafeInteger(n)&&Number.isSafeInteger(d))||d<1||n<0||n>1000000||d>1000000)return null;
 const g=gcd(n,d);return {n:n/g,d:d/g};
};
const scenarios=[
 {label:"1/4 + 2/4",a:[1,4],b:[2,4],op:"+"},
 {label:"2/3 + 1/6",a:[2,3],b:[1,6],op:"+"},
 {label:"3/4 − 1/2",a:[3,4],b:[1,2],op:"−"},
 {label:"1/2 + 1/3",a:[1,2],b:[1,3],op:"+"},
 {label:"5/6 − 1/3",a:[5,6],b:[1,3],op:"−"},
 {label:"1 1/4 + 1/2",a:[5,4],b:[1,2],op:"+"},
 {label:"2 1/4 − 3/4",a:[9,4],b:[3,4],op:"−"},
 {label:"2 1/3 − 1 2/3",a:[7,3],b:[5,3],op:"−"},
 {label:"1 1/6 + 2/3",a:[7,6],b:[2,3],op:"+"},
 {label:"1 1/3 + 2/5",a:[4,3],b:[2,5],op:"+"}
];
const solve=p=>{
 const d=lcm(p.a[1],p.b[1]),a=p.a[0]*(d/p.a[1]),b=p.b[0]*(d/p.b[1]);
 const numerator=p.op==="+"?a+b:a-b;
 return {d,a,b,n:numerator,sign:p.op,positive:numerator>0};
};
function fractionStripSVG(p,stage){
 const v=solve(p),d=stage===0?0:v.d;
 const aIn=stage===0?p.a[0]:v.a,bIn=stage===0?p.b[0]:v.b;
 const aDen=stage===0?p.a[1]:d,bDen=stage===0?p.b[1]:d;
 const maxVal=Math.max(p.a[0]/p.a[1],p.b[0]/p.b[1],v.n/v.d);
 const wholes=Math.max(1,Math.ceil(maxVal)),width=Math.min(550/wholes,190),gap=14;
 const left=130,total=wholes*(width+gap)-gap,ht=33;
 const cell=(x,y,w,h,fill,stroke)=>'<rect x="'+x.toFixed(2)+'" y="'+y+'" width="'+w.toFixed(2)+'" height="'+h+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1"/>';
 function row(name,numerator,denom,y,fill,split=0){
  const cells=[];const nFilled=numerator;
  for(let whole=0;whole<wholes;whole++){
   const startX=left+whole*(width+gap);
   for(let k=0;k<denom;k++){
    const index=whole*denom+k;
    const x=startX+k*(width/denom),w=width/denom;
    let color="#fff";
    if(index<nFilled)color=split&&index>=split?"#F5B775":fill;
    cells.push(cell(x,y,w,ht,color,"#454b67"));
   }
  }
  return '<text x="12" y="'+(y+22)+'" fill="currentColor" font-size="15" font-weight="700">'+name+'</text>'+cells.join("");
 }
 const aColor="#8D97F0",bColor="#BBACE6",sumColor="#95CFAC";
 let shapes=row("A: "+format(...p.a),aIn,aDen,50,aColor);
 shapes+=row("B: "+format(...p.b),bIn,bDen,113,bColor);
 if(stage===2){
  if(p.op==="+") shapes+=row("Combine",v.n,d,194,aColor,v.a);
  else shapes+=row("Remove",v.a,d,194,sumColor,v.n);
  shapes+=row("Result",v.n,d,257,sumColor);
 }
 return '<svg role="img" aria-label="Fraction strips for '+p.label.replace(/[&<>"]/g,"")+' at stage '+(stage+1)+
 '" viewBox="0 0 730 '+(stage===2?"318":"190")+'" style="width:100%;height:auto;min-width:315px;max-width:730px" xmlns="http://www.w3.org/2000/svg">'+
  '<rect x="0" y="0" width="730" height="'+(stage===2?"318":"190")+'" rx="12" fill="#F7F7FC"/>'+
  shapes+'</svg>';
}
function render(el){
 let current=0,stage=0,feedback="",attempts=0,solved=0,credited=new Set();
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&quot;"}[c]));
 el.innerHTML='<section class="fraction-lab"><style>'+
 '.fraction-lab{color:var(--ink);font-family:var(--f-body);line-height:1.5}'+
 '.fraction-lab .fl-bar{display:flex;flex-wrap:wrap;gap:12px;align-items:end;margin:10px 0 15px}'+
 '.fraction-lab label{display:grid;gap:5px;font-size:13px;font-weight:700}'+
 '.fraction-lab select,.fraction-lab input{font:inherit;font-size:16px;min-height:42px;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:5px;padding:7px 10px;max-width:100%}'+
 '.fraction-lab .fl-steps{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}'+
 '.fraction-lab .fl-steps button{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:6px;padding:8px 12px;font:inherit;font-size:13px;cursor:pointer}'+
 '.fraction-lab .fl-steps button[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-soft);color:var(--accent-ink);font-weight:700}'+
 '.fraction-lab .fl-visual{overflow-x:auto;padding:8px;border:1px solid var(--rule);border-radius:8px;background:#F7F7FC}'+
 '.fraction-lab .fl-feedback{min-height:38px;margin-top:14px;font-weight:600}'+
 '.fraction-lab .fl-fields{display:flex;flex-wrap:wrap;gap:10px;align-items:end;margin:14px 0}'+
 '.fraction-lab .fl-fields input{width:160px}'+
 '.fraction-lab .fl-hint{font-size:14px;border-left:3px solid var(--accent);padding-left:12px;margin:12px 0}'+
 '.fraction-lab .fl-action{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}'+
 '.fraction-lab button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
 '</style>'+
 '<div class="eyebrow">Manitoba 7.N.5 · Fraction operations</div>'+
 '<h2 style="margin:8px 0 8px">Fraction Strip Lab</h2>'+
 '<p class="note">See how fractions change into equivalent pieces before adding or taking away. Use the pictures to explain your answer.</p>'+
 '<div class="fl-bar"><label>Choose a problem<select id="fl-case"></select></label>'+
 '<span class="note" id="fl-progress" aria-live="polite"></span></div>'+
 '<div class="fl-steps" role="group" aria-label="Diagram steps">'+
 '<button type="button" data-step="0">1. Original pieces</button>'+
 '<button type="button" data-step="1">2. Equivalent pieces</button>'+
 '<button type="button" data-step="2">3. Combine or remove</button></div>'+
 '<div class="fl-visual" id="fl-visual"></div>'+
 '<p class="note" id="fl-explain" aria-live="polite"></p>'+
 '<form id="fl-form"><div class="fl-fields"><label>Common denominator<input id="fl-denominator" inputmode="numeric" placeholder="e.g. 12" required></label>'+
 '<label>Your final answer<input id="fl-answer" placeholder="e.g. 1 1/2" required></label>'+
 '<button class="btn" type="submit">Check both</button></div></form>'+
 '<div id="fl-feedback" class="fl-feedback" role="status" aria-live="polite"></div>'+
 '<div class="fl-action"><button type="button" class="btn ghost" id="fl-hint-button">Show a hint</button>'+
 '<button type="button" class="btn ghost" id="fl-solution-button">Show worked solution</button>'+
 '<button type="button" class="btn ghost" id="fl-next">Next problem</button></div>'+
 '<p id="fl-hint" class="fl-hint" hidden></p>'+
 '<p class="note">Models are pictorial and not physically to scale. Practice stays in this browser session and is not submitted or graded.</p></section>';
 const $=id=>el.querySelector(id),selector=$("#fl-case");
 selector.innerHTML=scenarios.map((p,i)=>'<option value="'+i+'">'+esc(p.label)+'</option>').join("");
 function draw(){
  const p=scenarios[current],v=solve(p);
  $("#fl-visual").innerHTML=fractionStripSVG(p,stage);
  el.querySelectorAll("[data-step]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.step===stage)));
  $("#fl-explain").textContent=stage===0?
   "Notice: each whole is partitioned by the denominator in that fraction.":
   stage===1?"Both rows now show "+v.d+" equal parts per whole. The shaded amount has not changed.":
   p.op==="+"?"Combine "+v.a+" and "+v.b+" equal-size pieces in wholes of "+v.d+" parts.":
   "Start with "+v.a+" equal-size pieces, remove "+v.b+" pieces and count the green pieces left.";
  $("#fl-progress").textContent=solved+" of "+scenarios.length+" examples solved this session";
  $("#fl-feedback").textContent=feedback;
 }
 function select(n){
  current=n;stage=0;feedback="";
  $("#fl-denominator").value="";$("#fl-answer").value="";$("#fl-hint").hidden=true;
  selector.value=String(n);draw();
 }
 selector.onchange=()=>select(Number(selector.value));
 el.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{stage=+b.dataset.step;draw();});
 $("#fl-form").onsubmit=e=>{
  e.preventDefault();const p=scenarios[current],v=solve(p),given=Number($("#fl-denominator").value.trim()),
   ans=fracInput($("#fl-answer").value);
  attempts++;
  const dOk=Number.isSafeInteger(given)&&given===v.d,answerOk=!!ans&&ans.n*v.d===v.n*ans.d;
  if(dOk&&answerOk){
    if(!credited.has(current)){credited.add(current);solved++;}
    feedback="Correct! "+p.label+" = "+format(v.n,v.d)+". Explain how the diagram proves it.";
  }else{
    feedback=(dOk?"Common denominator correct. ":"Check the least common denominator. ")+
      (answerOk?"Final answer correct. ":"Check how many equal pieces remain or are combined.");
  }
  draw();
 };
 $("#fl-hint-button").onclick=()=>{
  const p=scenarios[current],v=solve(p);
  $("#fl-hint").hidden=false;$("#fl-hint").textContent=
  "Try dividing "+v.d+" by each original denominator: "+v.d+" ÷ "+p.a[1]+" and "+v.d+" ÷ "+p.b[1]+
  ". Multiply each numerator by the same factor as its denominator.";
 };
 $("#fl-solution-button").onclick=()=>{
  const p=scenarios[current],v=solve(p);stage=2;
  $("#fl-hint").hidden=false;$("#fl-hint").textContent=
   format(...p.a)+" = "+v.a+"/"+v.d+" and "+format(...p.b)+" = "+v.b+"/"+v.d+
   ". "+v.a+" "+p.op+" "+v.b+" = "+v.n+" parts out of "+v.d+
   ". Final answer: "+format(v.n,v.d)+".";
  draw();
 };
 $("#fl-next").onclick=()=>select((current+1)%scenarios.length);
 select(0);
}
H.tools=H.tools||{};
H.tools.fracops=render;
window.FractionStripCore={gcd,lcm,format,fracInput,solve,scenarios,fractionStripSVG};
})();
