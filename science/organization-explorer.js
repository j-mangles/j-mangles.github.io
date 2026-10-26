/* Science 8 Cells & Systems: Levels of Organization Explorer.
   Conceptual shapes, not microscopic or anatomical scale models. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const stages=[
 {name:"Cell",example:"Cardiac muscle cell",meaning:"One specialized living cell. Muscle cells can contract.",how:"Specialized cells cooperate in tissues."},
 {name:"Tissue",example:"Cardiac muscle tissue",meaning:"A group of specialized cells working together. Cardiac muscle tissue contracts.",how:"Different tissue types combine to form organs."},
 {name:"Organ",example:"Heart",meaning:"An organ made of several tissue types, including cardiac muscle, connective, epithelial and nervous tissues.",how:"The heart works with blood vessels as part of the circulatory system."},
 {name:"Organ system",example:"Circulatory system",meaning:"Organs and structures work together to move blood, deliver substances and remove some wastes.",how:"Organ systems cooperate in an individual organism."},
 {name:"Organism",example:"Human",meaning:"One whole living individual with interacting organ systems.",how:"Living systems depend on activity at every level."}
];
H.organizationModel={stages};
function explorer(el){
 let active=0;
 const $=q=>el.querySelector(q),$$=q=>[...el.querySelectorAll(q)];
 const escape=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 el.innerHTML=`<section class="org-explorer">
 <style>
 .org-explorer{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.5}
 .org-explorer .org-pills{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
 .org-explorer .org-pills button[aria-pressed="true"]{outline:2px solid var(--accent-ink);outline-offset:2px;font-weight:700}
 .org-explorer .org-svgwrap{overflow-x:auto;background:var(--soft);border-radius:var(--radius);padding:10px;margin:14px 0}
 .org-explorer .org-svg{width:100%;min-width:660px;height:auto;display:block}
 .org-explorer .org-panel{border-left:4px solid var(--accent);background:var(--soft);padding:13px 16px;border-radius:var(--radius);margin:14px 0}
 .org-explorer .org-check{display:grid;grid-template-columns:repeat(5,minmax(100px,1fr));gap:10px}
 .org-explorer .org-check label{display:block;font-weight:650;font-size:13px}
 .org-explorer select{width:100%;max-width:100%;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);padding:8px;border-radius:var(--btn-radius)}
 .org-explorer button:focus-visible,.org-explorer select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
 .org-explorer .org-feedback{min-height:26px;font-weight:650}
 @media(max-width:660px){.org-explorer{padding:12px}.org-explorer .org-check{grid-template-columns:repeat(2,minmax(0,1fr))}}
 </style>
 <div class="eyebrow">Grade 8 Science · Cells and Systems</div>
 <h3 style="margin:6px 0">Levels of Organization Explorer</h3>
 <p class="note">Explore how specialized cells build increasingly complex living systems. These are diagrams of <b>relationships</b>, not drawings to physical scale.</p>
 <div class="org-svgwrap"><svg id="org-svg" class="org-svg" viewBox="0 0 900 258" role="img" aria-label="Five levels of organization: cell, tissue, organ, organ system and organism"></svg></div>
 <div class="org-pills" id="org-pills" role="group" aria-label="Choose a level"></div>
 <div class="org-panel" aria-live="polite">
  <div class="eyebrow" id="org-level-name">Cell</div>
  <h4 id="org-example" style="margin:6px 0">Cardiac muscle cell</h4>
  <p id="org-meaning"></p><p id="org-next" class="note"></p>
 </div>
 <h4>Build the sequence</h4>
 <p class="note">Choose the five levels in order from the smallest living unit to the whole organism, then check. Repeat until your explanation makes sense.</p>
 <div class="org-check" id="org-order"></div>
 <div class="org-pills"><button type="button" class="btn" id="org-check">Check the sequence</button><button type="button" class="btn ghost" id="org-clear">Clear choices</button></div>
 <p id="org-feedback" class="org-feedback" role="status" aria-live="polite"></p>
 <p class="note">Think further: an organ isn't made of only one tissue type. Explain why the heart needs more than just muscle tissue.</p>
 </section>`;
 function shape(i,cx,cy){
  const stroke='stroke="var(--accent)" stroke-width="2"';
  if(i===0)return '<circle cx="'+cx+'" cy="'+cy+'" r="16" fill="var(--accent-soft)" '+stroke+'/>'+
   '<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="var(--accent)"/>';
  if(i===1)return [-18,0,18].map((d,j)=>'<circle cx="'+(cx+d)+'" cy="'+(cy+(j%2?0:10))+'" r="13" fill="var(--accent-soft)" '+stroke+'/>').join("")+
    '<circle cx="'+cx+'" cy="'+(cy-12)+'" r="13" fill="var(--accent-soft)" '+stroke+'/>';
  if(i===2)return '<path d="M'+cx+' '+(cy+32)+' C'+(cx-10)+' '+(cy+19)+' '+(cx-35)+' '+(cy+8)+' '+(cx-31)+' '+(cy-9)+
   ' C'+(cx-28)+' '+(cy-29)+' '+(cx-6)+' '+(cy-31)+' '+cx+' '+(cy-11)+' C'+(cx+12)+' '+(cy-34)+' '+(cx+32)+' '+(cy-27)+
   ' '+(cx+32)+' '+(cy-5)+' C'+(cx+31)+' '+(cy+12)+' '+cx+' '+(cy+32)+' '+cx+' '+(cy+32)+' Z" fill="var(--accent-soft)" '+stroke+'/>';
  if(i===3)return shape(2,cx,cy-7)+
   '<path d="M'+(cx-9)+' '+(cy+19)+' L'+(cx-35)+' '+(cy+33)+' M'+(cx+9)+' '+(cy+19)+' L'+(cx+35)+' '+(cy+33)+
   '" fill="none" stroke="var(--accent)" stroke-width="3"/>'+
   '<circle cx="'+(cx-35)+'" cy="'+(cy+33)+'" r="5" fill="var(--accent)"/><circle cx="'+(cx+35)+'" cy="'+(cy+33)+'" r="5" fill="var(--accent)"/>';
  return '<circle cx="'+cx+'" cy="'+(cy-35)+'" r="15" fill="var(--accent-soft)" '+stroke+'/>'+
   '<path d="M'+cx+' '+(cy-19)+' V'+(cy+25)+' M'+(cx-27)+' '+(cy-5)+' L'+(cx+27)+' '+(cy-5)+
   ' M'+cx+' '+(cy+25)+' L'+(cx-20)+' '+(cy+52)+' M'+cx+' '+(cy+25)+' L'+(cx+20)+' '+(cy+52)+'" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>';
 }
 function plot(){
  const centres=[90,270,450,630,810],names=["Cell","Tissue","Organ","Organ system","Organism"];
  let out='<text x="14" y="20" font-size="12" fill="var(--muted)">Conceptual pathway • not to scale</text>';
  centres.forEach((cx,i)=>{
   const highlighted=i===active;
   out+='<rect x="'+(cx-77)+'" y="32" width="154" height="196" rx="12" fill="'+(highlighted?'var(--accent-soft)':'var(--paper)')+'" stroke="'+(highlighted?'var(--accent)':'var(--rule)')+'" stroke-width="'+(highlighted?3:1)+'"/>'+
     shape(i,cx,127)+
     '<text x="'+cx+'" y="202" text-anchor="middle" font-size="16" font-weight="650" fill="var(--ink)">'+names[i]+'</text>';
   if(i<4)out+='<path d="M'+(cx+79)+' 124 h21 m-7 -7 l7 7 -7 7" fill="none" stroke="var(--muted)" stroke-width="2"/>';
  });
  $("#org-svg").innerHTML=out;
  $("#org-svg").setAttribute("aria-label","Organization pathway: "+names.join(" to ")+". Highlighted: "+names[active]+". Shapes are not to scale.");
 }
 function render(){
  $("#org-pills").innerHTML=stages.map((s,i)=>'<button type="button" class="btn ghost" data-level="'+i+'" aria-pressed="'+(active===i)+'">'+(i+1)+'. '+escape(s.name)+'</button>').join("");
  $$("#org-pills [data-level]").forEach(b=>b.onclick=()=>{active=Number(b.dataset.level);render();});
  const item=stages[active];
  $("#org-level-name").textContent="Level "+(active+1)+" · "+item.name;
  $("#org-example").textContent=item.example;
  $("#org-meaning").textContent=item.meaning;$("#org-next").textContent=item.how;
  plot();
 }
 function buildOrder(){
  const options='<option value="">Choose…</option>'+stages.map((s,i)=>'<option value="'+i+'">'+escape(s.name)+'</option>').join("");
  $("#org-order").innerHTML=stages.map((s,i)=>'<label>Position '+(i+1)+'<select data-place="'+i+'">'+options+'</select></label>').join("");
 }
 $("#org-check").onclick=()=>{
  const choices=$$("#org-order [data-place]").map(sel=>sel.value);
  if(choices.some(v=>v==="")){$("#org-feedback").textContent="Select a level for all five positions.";return;}
  const unique=new Set(choices);
  if(unique.size!==5){$("#org-feedback").textContent="Each level is used exactly once. Check for repeats.";return;}
  const correct=choices.every((v,i)=>Number(v)===i);
  $("#org-feedback").textContent=correct?"Correct: cell → tissue → organ → organ system → organism.":"Not yet. Ask which structures are built from which smaller parts, then try again.";
 };
 $("#org-clear").onclick=()=>{buildOrder();$("#org-feedback").textContent="Choices cleared.";};
 buildOrder();render();
}
H.lessonTools=Object.assign(H.lessonTools||{},{"cells/levels":explorer});
})();