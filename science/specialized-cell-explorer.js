/* Science 8 · Specialized Cells and Stem Cells — Cells booklet, Topic 4.
   Interactive examples are conceptual, not microscope images or medical guidance. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const types=[
 {id:"muscle",name:"Muscle cell",job:"Contracts to produce movement",adapt:"Long fibres contain proteins that shorten to generate force.",system:"Muscular system",shape:"Fibre",answer:"Contracts"},
 {id:"skin",name:"Skin cell",job:"Forms a protective barrier",adapt:"Many epithelial cells fit tightly together in layers.",system:"Integumentary system",shape:"Layer",answer:"Protects"},
 {id:"nerve",name:"Nerve cell",job:"Carries electrical signals",adapt:"Long extensions help transmit information across distances.",system:"Nervous system",shape:"Branches",answer:"Signals"},
 {id:"red",name:"Red blood cell",job:"Transports oxygen in blood",adapt:"A flexible biconcave disc has a large surface area and contains hemoglobin. Mature human red blood cells lack a nucleus.",system:"Circulatory system",shape:"Disc",answer:"Oxygen"},
 {id:"white",name:"White blood cell",job:"Helps defend against infection",adapt:"Different white blood cells detect or respond to threats to the body.",system:"Immune system",shape:"Defence",answer:"Immune"}
];
const cases=[
 {q:"A tissue needs a cell that can send a signal from the spinal cord to a leg muscle. Which fits best?",c:"nerve",why:"Nerve cells are specialized to carry electrical signals."},
 {q:"Which specialized cell carries oxygen to muscle tissue?",c:"red",why:"Hemoglobin in red blood cells helps transport oxygen."},
 {q:"A surface needs a layer of tightly packed protective cells. Which would you choose?",c:"skin",why:"Epithelial skin cells form protective layers."},
 {q:"An injured body needs cells that can shorten to move a joint. Which type performs that task?",c:"muscle",why:"Muscle cells contract to create movement."},
 {q:"Which group of cells helps the body defend against infection?",c:"white",why:"White blood cells participate in immune responses."}
];
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const style=[
".scs{color:var(--ink);line-height:1.5;min-width:0}.scs *{box-sizing:border-box}.scs h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.scs h3{font-size:1.05rem;margin:0 0 9px}",
".scs .hint{font-size:.87rem;color:var(--muted);max-width:70ch}.scs .layout{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:18px;align-items:start}",
".scs .diagram{border:1px solid var(--rule);background:var(--soft);padding:12px;border-radius:var(--radius,14px)}.scs svg{display:block;width:100%;height:auto}.scs svg text{font:600 13px var(--f-body,system-ui);fill:var(--ink)}",
".scs .cell-tabs{display:flex;gap:7px;flex-wrap:wrap;margin:0 0 13px}.scs button,.scs select{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 11px;cursor:pointer}",
".scs button[aria-pressed=true]{color:var(--on-btn);background:var(--btn);border-color:var(--btn)}.scs button:focus-visible,.scs select:focus-visible,.scs textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".scs .cell-tabs button{font-size:.83rem;flex:1 1 120px}.scs .readout{background:var(--soft);padding:14px;border-radius:var(--radius,14px);min-height:172px}.scs .readout p{margin:8px 0 10px}",
".scs .compare{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:15px 0}.scs .compare label{display:block;font-weight:650;font-size:.87rem}.scs select{display:block;width:100%;margin:6px 0}.scs .compare-answer{padding:12px;border-left:3px solid var(--accent);background:var(--soft);min-height:75px}",
".scs .stem{border-top:1px solid var(--rule);padding-top:17px;margin-top:20px}.scs .stem-visual{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,14px);padding:13px;overflow:hidden}",
".scs .stem-visual svg{height:auto;width:100%}.scs .stem-buttons{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.scs .stem-note{min-height:53px}",
".scs .question{font-weight:700;margin:7px 0}.scs .options{display:flex;gap:8px;flex-wrap:wrap;margin:11px 0}.scs .options button{flex:1 1 125px;text-align:left;font-size:.85rem}",
".scs .feedback{min-height:48px;font-weight:650}.scs .quiz{border-top:1px solid var(--rule);padding-top:17px;margin-top:20px}.scs .next:disabled{opacity:.45}",
".scs .explain{display:block;margin-top:17px;font-weight:650;font-size:.88rem}.scs textarea{display:block;width:100%;min-height:86px;margin-top:7px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:8px;padding:10px;font:inherit;resize:vertical}",
"@media(max-width:750px){.scs .layout{grid-template-columns:1fr}}@media(max-width:500px){.scs .compare{grid-template-columns:1fr}}"
].join("\n");
function cellArt(id){
 const common='fill="color-mix(in srgb,var(--accent) 28%,var(--paper))" stroke="var(--accent)" stroke-width="3"';
 const n='fill="color-mix(in srgb,var(--accent) 64%,var(--paper))" stroke="var(--accent)" stroke-width="2"';
 let shapes="";
 if(id==="muscle"){
  shapes=Array.from({length:3},(_,i)=>'<rect x="32" y="'+(40+i*68)+'" width="374" height="49" rx="25" '+common+'/>'+
   Array.from({length:8},(_,j)=>'<path d="M'+(69+j*38)+' '+(44+i*68)+' v40" stroke="var(--accent)" stroke-width="3" opacity=".35"/>').join("")).join("");
 }else if(id==="skin"){
  shapes=Array.from({length:3},(_,r)=>Array.from({length:7},(_,c)=>'<rect x="'+(18+c*58+(r%2)*13)+'" y="'+(26+r*75)+'" width="57" height="66" rx="12" '+common+'/>'+
   '<ellipse cx="'+(44+c*58+(r%2)*13)+'" cy="'+(55+r*75)+'" rx="12" ry="10" '+n+'/>').join("")).join("");
 }else if(id==="nerve"){
  shapes='<circle cx="205" cy="127" r="43" '+common+'/><ellipse cx="205" cy="127" rx="16" ry="17" '+n+'/>'+
  '<path d="M205 87 L198 24 M171 107 L84 51 M163 127 L43 127 M173 153 L94 218 M242 127 L411 127" stroke="var(--accent)" stroke-width="9" stroke-linecap="round" fill="none"/>'+
  '<path d="M195 37 L153 19 M92 55 L65 22 M96 215 L68 226 M411 127 L433 105 M410 127 L433 150" stroke="var(--accent)" stroke-width="5" fill="none"/>';
 }else if(id==="red"){
  shapes=Array.from({length:6},(_,i)=>{let x=55+(i%3)*150,y=62+Math.floor(i/3)*126;return '<ellipse cx="'+x+'" cy="'+y+'" rx="45" ry="30" '+common+'/><ellipse cx="'+x+'" cy="'+y+'" rx="26" ry="13" fill="var(--soft)" stroke="var(--accent)" stroke-width="3"/>';}).join("");
 }else{
  shapes=Array.from({length:3},(_,i)=>{let x=81+i*144,y=130+(i%2?27:-18);return '<path d="M'+(x-46)+' '+y+' q-18 -53 40 -52 q60 -23 59 37 q19 53 -42 64 q-39 19 -53 -49Z" '+common+'/>'+
   '<path d="M'+(x-15)+' '+(y-19)+'q45 -16 29 19q-21 25 -42 0Z" '+n+'/>';}).join("");
 }
 return '<svg viewBox="0 0 450 270" role="img" aria-label="Simplified conceptual drawing of '+escape(types.find(t=>t.id===id).name)+'">'+
 shapes+'<text x="225" y="259" text-anchor="middle">Simplified cell shapes · not to scale</text></svg>';
}
function stemArt(which){
 const all=which==="embryonic";
 const targets=all?["Muscle","Nerve","Blood","Skin"]:["Red blood","White blood","Platelets"];
 const xs=targets.length===4?[78,205,330,450]:[104,260,413];
 return '<svg viewBox="0 0 520 200" role="img" aria-label="Conceptual differentiation diagram: '+(all?"embryonic stem cells can become many types":"blood-forming stem cells produce blood cell types")+'">'+
 '<circle cx="260" cy="42" r="25" fill="var(--accent)" opacity=".55" stroke="var(--accent)" stroke-width="3"/>'+
 '<text x="260" y="14" text-anchor="middle">'+(all?"Embryonic stem cell":"Blood-forming stem cell")+'</text>'+
 targets.map((name,i)=>'<path d="M260 69 L'+xs[i]+' 135" stroke="var(--accent)" stroke-width="2" stroke-dasharray="7 4" fill="none"/>'+
 '<circle cx="'+xs[i]+'" cy="149" r="18" fill="color-mix(in srgb,var(--accent) 25%,var(--paper))" stroke="var(--accent)" stroke-width="2"/>'+
 '<text x="'+xs[i]+'" y="185" text-anchor="middle">'+name+'</text>').join("")+'</svg>';
}
function render(root){
 let selected="muscle",compA="muscle",compB="nerve",stem="embryonic",q=0,answer=null,correct=0;
 root.innerHTML='<section class="scs"><style>'+style+'</style><h2>Specialized Cell Explorer</h2>'+
 '<p class="hint">A cell’s structure helps it do its job. Compare examples from the Cells booklet, then practise choosing the right cell for a particular task.</p>'+
 '<div class="cell-tabs" role="group" aria-label="Choose a specialized cell"></div>'+
 '<div class="layout"><div class="diagram" id="scs-art"></div><div class="readout" id="scs-info" aria-live="polite"></div></div>'+
 '<div class="compare"><div><label for="scs-a">Compare cell A</label><select id="scs-a"></select></div><div><label for="scs-b">Compare cell B</label><select id="scs-b"></select></div></div>'+
 '<p class="compare-answer" id="scs-compare" aria-live="polite"></p>'+
 '<div class="stem"><h3>How do stem cells differ?</h3><p class="hint">Choose a stem-cell type to see examples of what it can develop into. These are examples, not complete pathways.</p>'+
 '<div class="stem-buttons" role="group" aria-label="Stem cell type"><button data-stem="embryonic" aria-pressed="true">Embryonic stem cell</button><button data-stem="blood" aria-pressed="false">Blood-forming stem cell</button></div>'+
 '<div class="stem-visual" id="scs-stem-art"></div><p class="stem-note" id="scs-stem-note" aria-live="polite"></p></div>'+
 '<div class="quiz"><h3>Choose the best cell</h3><p class="question" id="scs-question"></p><div class="options" id="scs-options"></div>'+
 '<p class="feedback" id="scs-feedback" aria-live="polite"></p><button type="button" class="next" id="scs-next" disabled>Next question</button></div>'+
 '<label class="explain" for="scs-reason">Explain: How does one specialized cell’s structure suit its function?<textarea id="scs-reason" placeholder="The ... cell can ... because its structure ..."></textarea></label>'+
 '<p class="hint">Diagrams show the idea, not real cell sizes. Many stem cells have more restricted potential than embryonic stem cells.</p></section>';
 const $=q=>root.querySelector(q);
 const optionHtml=choice=>types.map(t=>'<option value="'+t.id+'" '+(choice===t.id?'selected':'')+'>'+escape(t.name)+'</option>').join("");
 function paintCell(){
  $(".cell-tabs").innerHTML=types.map(t=>'<button type="button" data-cell="'+t.id+'" aria-pressed="'+(selected===t.id)+'">'+t.name+'</button>').join("");
  const t=types.find(x=>x.id===selected);
  $("#scs-art").innerHTML=cellArt(selected);
  $("#scs-info").innerHTML='<h3>'+escape(t.name)+'</h3><p><b>Job:</b> '+escape(t.job)+'</p><p><b>Adaptation:</b> '+escape(t.adapt)+'</p><p class="hint"><b>Related body system:</b> '+escape(t.system)+'</p>';
 }
 function paintCompare(){
  const a=types.find(t=>t.id===compA),b=types.find(t=>t.id===compB);
  $("#scs-a").innerHTML=optionHtml(compA);$("#scs-b").innerHTML=optionHtml(compB);
  $("#scs-compare").textContent=compA===compB?"Choose two different cells to compare their roles.":
   a.name+": "+a.job+". "+b.name+": "+b.job+". Their different structures help them carry out different tasks.";
 }
 function paintStem(){
  $("#scs-stem-art").innerHTML=stemArt(stem);
  root.querySelectorAll("[data-stem]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.stem===stem)));
  $("#scs-stem-note").textContent=stem==="embryonic"?
   "Embryonic stem cells can differentiate into a very wide range of body cell types. They cannot form an entire organism on their own.":
   "Blood-forming stem cells are tissue-specific. They produce different blood cell types, not nerve or muscle cells.";
 }
 function paintQuiz(){
  const item=cases[q];
  $("#scs-question").textContent=(q+1)+" of "+cases.length+": "+item.q;
  $("#scs-options").innerHTML=types.map(t=>'<button type="button" data-answer="'+t.id+'" '+(answer!==null?'disabled':'')+'>'+t.name+'</button>').join("");
  $("#scs-feedback").textContent=answer===null?"":(answer===item.c?"Correct. ":"Not quite. ")+item.why;
  $("#scs-next").disabled=answer===null;
  $("#scs-next").textContent=q===cases.length-1?"Start again ("+correct+"/"+cases.length+" correct)":"Next question";
 }
 root.addEventListener("click",event=>{
  const btn=event.target.closest("[data-cell],[data-stem],[data-answer],#scs-next");if(!btn||!root.contains(btn))return;
  if(btn.dataset.cell){selected=btn.dataset.cell;paintCell();}
  else if(btn.dataset.stem){stem=btn.dataset.stem;paintStem();}
  else if(btn.dataset.answer&&answer===null){answer=btn.dataset.answer;if(answer===cases[q].c)correct++;paintQuiz();}
  else if(btn.id==="scs-next"&&answer!==null){q=(q+1)%cases.length;if(q===0)correct=0;answer=null;paintQuiz();}
 });
 $("#scs-a").addEventListener("change",e=>{compA=e.target.value;paintCompare();});
 $("#scs-b").addEventListener("change",e=>{compB=e.target.value;paintCompare();});
 paintCell();paintCompare();paintStem();paintQuiz();
 root.specializedExplorer={select(id){if(types.some(t=>t.id===id)){selected=id;paintCell();}},get selected(){return selected},get stem(){return stem},get question(){return q}};
}
H.specializedCellsCore={types,cases,cellArt,stemArt};
H.lessonTools=H.lessonTools||{};const old=H.lessonTools["cells/specialized"];
H.lessonTools["cells/specialized"]=function(el){
 const tool=document.createElement("div");el.appendChild(tool);render(tool);
 if(old){const original=document.createElement("div");el.appendChild(original);old(original);}
};
})();