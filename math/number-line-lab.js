/* Interactive Number Line Lab for Math 7 Lesson 19–20.
   Based on existing Human Number Line and between-numbers handouts. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const cards=[
 {label:"65%",v:.65},{label:"−3/4",v:-.75},{label:"1 1/2",v:1.5},
 {label:"0.8",v:.8},{label:"−1/4",v:-.25},{label:"110%",v:1.1},
 {label:"0.1",v:.1},{label:"5/4",v:1.25},{label:"1/2",v:.5},{label:"30%",v:.3}
];
const gaps=[
 {a:"0.3",b:"0.4",lo:.3,hi:.4},
 {a:"1/2",b:"0.6",lo:.5,hi:.6},
 {a:"−0.5",b:"−0.4",lo:-.5,hi:-.4},
 {a:"3/8",b:"0.4",lo:.375,hi:.4},
 {a:"0.7",b:"71%",lo:.7,hi:.71}
];
const fmt=n=>Number(n.toFixed(4)).toString();
function parseValue(raw){
 const s=String(raw||"").trim().replace(/[−–]/g,"-").replace(/\s+/g," ");
 let m;
 if((m=s.match(/^([+-]?\d+)\s+(\d+)\/(\d+)$/))){
  const w=Number(m[1]),n=Number(m[2]),d=Number(m[3]);
  if(!d||n>=d)return null;
  return (w<0||/^-/.test(m[1])?-1:1)*(Math.abs(w)+n/d);
 }
 if((m=s.match(/^([+-]?\d+)\/(\d+)$/)))return +m[2]?Number(m[1])/Number(m[2]):null;
 if((m=s.match(/^([+-]?(?:\d+\.?\d*|\.\d+))%$/)))return Number(m[1])/100;
 if(/^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(s)){const n=Number(s);return Number.isFinite(n)?n:null;}
 return null;
}
H.numberLineModel={cards,gaps,parseValue};
function studio(el){
 let mode="place",chosen=0,estimate=.5,submitted=false,selectedGap=0,candidate=null;
 const solved=new Set(),$=q=>el.querySelector(q),$$=q=>[...el.querySelectorAll(q)];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const x=v=>60+(v+1)*200;
 el.innerHTML=`<section class="nl-lab">
 <style>
 .nl-lab{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.55}
 .nl-lab .nl-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
 .nl-lab .nl-actions button[aria-pressed="true"],.nl-lab .nl-cards button[aria-pressed="true"]{outline:2px solid var(--accent-ink);outline-offset:2px;font-weight:700}
 .nl-lab .nl-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(76px,1fr));gap:8px;margin:12px 0}
 .nl-lab .nl-cards button{min-height:43px}
 .nl-lab .nl-plot{display:block;max-width:100%;height:auto;margin:10px auto;background:var(--soft);border-radius:var(--radius)}
 .nl-lab .nl-slider{display:block;width:100%;min-height:30px;margin:12px 0;accent-color:var(--accent)}
 .nl-lab label{display:block;font-weight:650;margin:12px 0 5px}
 .nl-lab input[type=text],.nl-lab select{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius);padding:10px;max-width:260px;width:100%;box-sizing:border-box}
 .nl-lab button:focus-visible,.nl-lab input:focus-visible,.nl-lab select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
 .nl-lab .nl-msg{min-height:32px;font-weight:600}
 @media(max-width:600px){.nl-lab{padding:12px}.nl-lab .nl-cards{grid-template-columns:repeat(auto-fit,minmax(65px,1fr))}}
 </style>
 <div class="eyebrow">Number Workshop · Unit 1</div><h3>Number Line Lab</h3>
 <p class="note">Place mixed forms accurately, then find values strictly between two given numbers. Watch the spacing of the ticks.</p>
 <div class="nl-actions" role="group" aria-label="Activity">
 <button class="btn ghost" type="button" data-mode="place" aria-pressed="true">Human Number Line</button>
 <button class="btn ghost" type="button" data-mode="between" aria-pressed="false">Find Between</button>
 </div>
 <div id="nl-place">
  <p>Select a card from our class activity. Move the dot to where that number belongs between −1 and 2.</p>
  <div class="nl-cards" id="nl-cards"></div>
  <label for="nl-slider">Your placement for <strong id="nl-selected">65%</strong></label>
  <input class="nl-slider" id="nl-slider" type="range" min="-1" max="2" step="0.01" value="0.5" aria-describedby="nl-estimate">
  <p class="note" id="nl-estimate">Current estimate: 0.5</p>
  <div class="nl-actions"><button class="btn" type="button" id="nl-check">Check placement</button><button class="btn ghost" type="button" id="nl-reset">Reset cards</button></div>
  <p class="nl-msg" id="nl-feedback" role="status" aria-live="polite"></p>
  <p class="note" id="nl-score">0 of 10 correctly placed</p>
 </div>
 <div id="nl-between" hidden>
  <label for="nl-gap">Choose a gap from Lesson 20</label><select id="nl-gap"></select>
  <p id="nl-task"></p>
  <label for="nl-input">Give one number strictly between the endpoints</label>
  <input type="text" id="nl-input" autocomplete="off" placeholder="0.35, 35%, 7/20 or −1/4">
  <div class="nl-actions"><button type="button" class="btn" id="nl-verify">Check my number</button><button type="button" class="btn ghost" id="nl-next">Next gap</button></div>
  <p class="nl-msg" id="nl-gap-feedback" role="status" aria-live="polite"></p>
 </div>
 <svg class="nl-plot" id="nl-svg" role="img" viewBox="0 0 720 190" aria-label="Number line from negative one to positive two"></svg>
 <p class="note">Use the slider with arrow keys or touch. The graph uses equal-sized steps of 0.25. No work is saved or submitted.</p>
 </section>`;
 function line(){
  let body='<line x1="60" y1="112" x2="660" y2="112" stroke="var(--ink)" stroke-width="3"/>'+
    '<path d="M651 107 L662 112 L651 117" stroke="var(--ink)" stroke-width="2" fill="none"/>';
  for(let n=-1;n<=2.001;n+=.25){
   const v=Math.round(n*100)/100,p=x(v),isMajor=Math.abs(v*2-Math.round(v*2))<.001;
   body+='<line x1="'+p+'" y1="'+(isMajor?100:105)+'" x2="'+p+'" y2="'+(isMajor?122:119)+'" stroke="var(--ink)"/>';
   if(isMajor)body+='<text x="'+p+'" y="142" fill="var(--ink)" font-size="15" text-anchor="middle">'+fmt(v)+'</text>';
  }
  return body;
 }
 function marker(n,label,color,y){
  return '<line x1="'+x(n)+'" y1="108" x2="'+x(n)+'" y2="'+(y+4)+'" stroke="'+color+'" stroke-dasharray="3 3"/>'+
   '<circle cx="'+x(n)+'" cy="112" r="7" fill="'+color+'" stroke="var(--paper)" stroke-width="2"/>'+
   '<text x="'+x(n)+'" y="'+y+'" text-anchor="middle" font-size="13" font-weight="650" fill="var(--ink)">'+esc(label)+'</text>';
 }
 function draw(){
  let svg=line(),description="Number line from −1 to 2 with equally spaced quarter-unit ticks. ";
  if(mode==="place"){
   const c=cards[chosen];
   svg+=marker(estimate,"Your guess","var(--accent)",87);
   description+="Guessed "+fmt(estimate)+" for "+c.label+". ";
   if(submitted){svg+=marker(c.v,fmt(c.v),"var(--good)",30);description+="Actual value "+fmt(c.v)+".";}
  }else{
   const d=gaps[selectedGap];svg+='<rect x="'+x(d.lo)+'" y="101" width="'+Math.max(1,x(d.hi)-x(d.lo))+'" height="24" fill="var(--accent)" opacity=".3"/>';
   svg+=marker(d.lo,d.a,"var(--ink)",88);svg+=marker(d.hi,d.b,"var(--ink)",30);
   description+="Gap between "+d.a+" and "+d.b+".";
   if(candidate!==null&&candidate>d.lo&&candidate<d.hi){svg+=marker(candidate,fmt(candidate),"var(--accent)",178);description+=" Entered "+fmt(candidate)+".";}
  }
  $("#nl-svg").innerHTML=svg;$("#nl-svg").setAttribute("aria-label",description);
 }
 function cardButtons(){
  $("#nl-cards").innerHTML=cards.map((c,i)=>'<button class="btn ghost" type="button" data-card="'+i+'" aria-pressed="'+(chosen===i)+'">'+esc(c.label)+(solved.has(i)?' ✓':'')+'</button>').join("");
  $$("#nl-cards [data-card]").forEach(b=>b.onclick=()=>{chosen=Number(b.dataset.card);estimate=.5;submitted=false;$("#nl-selected").textContent=cards[chosen].label;$("#nl-slider").value="0.5";$("#nl-estimate").textContent="Current estimate: 0.5";$("#nl-feedback").textContent="";cardButtons();draw();});
  $("#nl-score").textContent=solved.size+" of 10 correctly placed";
 }
 function setGap(){
  const d=gaps[selectedGap];candidate=null;$("#nl-gap").value=String(selectedGap);$("#nl-task").textContent="Choose a number greater than "+d.a+" and less than "+d.b+".";
  $("#nl-input").value="";$("#nl-gap-feedback").textContent="";draw();
 }
 $("#nl-gap").innerHTML=gaps.map((g,i)=>'<option value="'+i+'">'+esc(g.a)+' to '+esc(g.b)+'</option>').join("");
 $$("[data-mode]").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;$$("[data-mode]").forEach(k=>k.setAttribute("aria-pressed",String(k.dataset.mode===mode)));$("#nl-place").hidden=mode!=="place";$("#nl-between").hidden=mode!=="between";draw();});
 $("#nl-slider").oninput=()=>{estimate=Number($("#nl-slider").value);submitted=false;$("#nl-feedback").textContent="";$("#nl-estimate").textContent="Current estimate: "+fmt(estimate);draw();};
 $("#nl-check").onclick=()=>{
  submitted=true;const c=cards[chosen],delta=Math.abs(estimate-c.v);
  if(delta<=.05+1e-9)solved.add(chosen);
  $("#nl-feedback").textContent=(delta<=.05+1e-9?"Good placement! ":"Try moving "+(estimate<c.v?"right":"left")+". ")+c.label+" = "+fmt(c.v)+". Check your spacing.";
  cardButtons();draw();
 };
 $("#nl-reset").onclick=()=>{solved.clear();chosen=0;estimate=.5;submitted=false;$("#nl-slider").value=".5";$("#nl-selected").textContent=cards[0].label;$("#nl-estimate").textContent="Current estimate: 0.5";$("#nl-feedback").textContent="";cardButtons();draw();};
 $("#nl-gap").onchange=()=>{selectedGap=Number($("#nl-gap").value);setGap();};
 $("#nl-next").onclick=()=>{selectedGap=(selectedGap+1)%gaps.length;setGap();};
 $("#nl-verify").onclick=()=>{
  const raw=$("#nl-input").value,v=parseValue(raw),d=gaps[selectedGap];
  candidate=Number.isFinite(v)?v:null;
  if(candidate===null){$("#nl-gap-feedback").textContent="Enter a valid decimal, fraction, mixed number or percent (not a calculation).";}
  else $("#nl-gap-feedback").textContent=(candidate>d.lo&&candidate<d.hi?"Yes! ":"Not quite. ")+
   esc(raw)+" = "+fmt(candidate)+". Your number must be strictly greater than "+fmt(d.lo)+" and less than "+fmt(d.hi)+".";
  draw();
 };
 cardButtons();setGap();
}
H.lessonTools=Object.assign(H.lessonTools||{},{"fdp/l19":studio});
})();