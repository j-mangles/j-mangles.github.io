/* Grade 8 Cells & Systems — Systems in Motion.
   Rebuilds the source handout's four everyday cases as a local, interactive
   systems map. It explains connections without scoring written reasoning. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const SYSTEMS={
 nervous:{name:"Nervous",organs:"Brain, spinal cord and nerves",job:"Detects information, processes it and coordinates responses.",color:"#76529a"},
 muscular:{name:"Muscular",organs:"Skeletal muscles and other muscle tissue",job:"Skeletal muscles contract to create pulling forces; smooth muscle also moves material inside organs.",color:"#b74d50"},
 skeletal:{name:"Skeletal",organs:"Bones, joints, cartilage and ligaments",job:"Supports and protects the body; joints allow movement.",color:"#8b7457"},
 respiratory:{name:"Respiratory",organs:"Airways and lungs",job:"Moves air and exchanges oxygen and carbon dioxide at the lungs.",color:"#317ca6"},
 circulatory:{name:"Circulatory",organs:"Heart, blood and blood vessels",job:"Transports oxygen, nutrients and wastes between organs and body cells.",color:"#a83f56"},
 digestive:{name:"Digestive",organs:"Mouth, stomach and intestines",job:"Breaks food down; the small intestine absorbs most digested nutrients.",color:"#a66a34"},
 integumentary:{name:"Integumentary",organs:"Skin, hair and nails",job:"Protects the body; skin receptors detect conditions such as temperature.",color:"#a56f61"}
};
const CASES=[
 {id:"sprint",title:"Sprint to catch the bus",text:"You notice your bus about to leave and sprint to catch it.",systems:["nervous","muscular","skeletal","respiratory","circulatory","digestive"],routes:[
  {title:"Control and movement",ids:["nervous","muscular","skeletal"],steps:["The brain notices the bus and sends motor signals.","Skeletal muscles contract and pull on bones through tendons.","Bones move at joints, producing the sprint."]},
  {title:"Oxygen delivery",ids:["respiratory","circulatory","muscular"],steps:["Breathing brings air to the lungs; oxygen enters nearby blood.","The heart pumps blood; vessels carry oxygen toward working muscles.","Muscle cells use oxygen and nutrients to release usable energy."]}
 ],extra:"Food eaten earlier has already been digested; absorbed nutrients can be carried in blood. Digestion does not suddenly start because you run."},
 {id:"lunch",title:"Eat lunch and walk back",text:"You eat a sandwich, drink water, then walk back to class.",systems:["digestive","nervous","muscular","skeletal","respiratory","circulatory"],routes:[
  {title:"Food to cells",ids:["digestive","circulatory","muscular"],steps:["Food is broken down; most nutrient absorption occurs in the small intestine.","Blood transports many absorbed nutrients to tissues.","Muscle cells use nutrients along with oxygen to release usable energy."]},
  {title:"Walking",ids:["nervous","muscular","skeletal"],steps:["The nervous system coordinates the planned movement.","Muscles contract and relax; tendons transfer pulling force.","Bones move around joints to produce steps."]}
 ],extra:"Water is absorbed along the digestive tract and is transported through the body. The pathway shown is simplified; digestion and transport involve many more structures."},
 {id:"cold",title:"Shiver on a cold morning",text:"You walk to school in cold air and start to shiver.",systems:["nervous","muscular","skeletal","respiratory","circulatory","digestive","integumentary"],routes:[
  {title:"Sense and respond",ids:["integumentary","nervous","muscular"],steps:["Temperature receptors in the skin detect the cold.","Nervous-system signals coordinate a response.","Repeated muscle contractions cause shivering and release heat."]},
  {title:"Support the response",ids:["respiratory","circulatory","muscular"],steps:["Breathing supplies oxygen to the blood.","The heart and vessels transport oxygen and nutrients.","Muscles use these materials while contracting."]}
 ],extra:"Skin is part of the integumentary system, which is an extra connection beyond the handout's six named systems. The model leaves out many temperature-control responses."},
 {id:"test",title:"Feel nervous before a test",text:"While waiting for a test, your heart pounds and you breathe quickly.",systems:["nervous","respiratory","circulatory","muscular","skeletal"],routes:[
  {title:"A coordinated body response",ids:["nervous","respiratory","circulatory"],steps:["The brain interprets the situation and coordinates an automatic response.","Breathing rate may increase, changing air movement through the lungs.","The heart may beat faster, moving blood around the body."]},
  {title:"Muscle tension",ids:["nervous","muscular","skeletal"],steps:["Nervous signals can increase muscle readiness or tension.","Skeletal muscles create force by contracting.","Muscles pull on bones through tendons; they do not push bones."]}
 ],extra:"The digestive system is not needed to explain the immediate signs described here. Real stress responses are more complex than this Grade 8 model."}
];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const CSS=[
".stl{margin:24px 0 34px;padding:clamp(14px,2.4vw,24px);border:1px solid var(--rule);border-radius:16px;background:var(--paper);color:var(--ink);line-height:1.5}",
".stl *{box-sizing:border-box}.stl h2{font:700 clamp(25px,3vw,32px) var(--f-title,Georgia,serif);margin:0 0 5px}.stl h3{font-size:1.05rem;margin:0 0 8px}.stl p{margin:6px 0 12px}.stl .muted{color:var(--muted);font-size:.9rem}",
".stl .casebar{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.stl button{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:9px;padding:9px 12px;min-height:42px;cursor:pointer}",
".stl button:hover{border-color:var(--accent)}.stl button:focus-visible,.stl textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}.stl .case[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700}",
".stl .scenario{padding:15px 17px;border-left:4px solid var(--accent);background:var(--soft);border-radius:0 10px 10px 0}.stl .scenario b{font-size:1.05rem}.stl .taskgrid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(220px,.9fr);gap:17px;margin-top:16px;align-items:start}",
".stl .sysgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.stl .sys{display:block;width:100%;text-align:left;padding:11px;border-left:5px solid var(--sys-color,var(--accent));min-height:78px;transition:background .15s,transform .15s}.stl .sys:hover{transform:translateY(-1px)}.stl .sys[aria-pressed=true]{background:color-mix(in srgb,var(--sys-color,var(--accent)) 12%,var(--paper));box-shadow:inset 0 0 0 1px var(--sys-color,var(--accent))}",
".stl .sys strong{display:block;font-size:.96rem}.stl .sys small{display:block;color:var(--muted);font-size:.79rem;line-height:1.35;margin-top:2px}.stl .sys .mark{float:right;color:var(--sys-color,var(--accent));font-size:1.15rem;font-weight:800}",
".stl .selection{padding:14px;border:1px solid var(--rule);border-radius:11px;background:var(--soft);position:sticky;top:10px}.stl .selection .count{font-weight:750;font-variant-numeric:tabular-nums}.stl .selection textarea{width:100%;min-height:78px;margin:6px 0 10px;padding:9px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink);font:inherit;resize:vertical}.stl .selection .primary{background:var(--ink);color:var(--paper);font-weight:700}.stl .status{min-height:28px;font-weight:650}",
".stl .model[hidden]{display:none}.stl .model{margin-top:20px;padding-top:17px;border-top:1px solid var(--rule)}.stl .route{margin:14px 0;padding:13px;border:1px solid var(--rule);border-radius:12px;background:var(--soft)}.stl .route h4{margin:0 0 11px;font-size:.96rem}",
".stl .steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;counter-reset:stage}.stl .step{position:relative;padding:12px 12px 12px 39px;min-height:82px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);font-size:.87rem}.stl .step:before{counter-increment:stage;content:counter(stage);position:absolute;left:10px;top:11px;width:22px;height:22px;display:grid;place-items:center;border-radius:50%;background:var(--step-color,var(--accent));color:white;font-size:.75rem;font-weight:800}.stl .step:not(:last-child):after{content:\"→\";position:absolute;right:-12px;top:29px;z-index:2;background:var(--soft);padding:0 3px;color:var(--muted);font-weight:800}",
".stl .step b{display:block;margin-bottom:3px}.stl .extra{margin-top:12px;padding:10px 12px;border-radius:8px;background:color-mix(in srgb,var(--accent) 9%,var(--paper));font-size:.88rem}.stl .limit{margin-top:9px;color:var(--muted);font-size:.82rem}",
".stl .actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.stl .actions button{flex:1 1 155px}.stl .report-status{min-height:22px;color:var(--muted);font-size:.84rem}",
"@media(max-width:700px){.stl .taskgrid{grid-template-columns:1fr}.stl .selection{position:static}.stl .steps{grid-template-columns:1fr}.stl .step{min-height:unset;padding:12px 12px 12px 42px}.stl .step:not(:last-child):after{content:\"↓\";top:auto;right:50%;bottom:-16px}.stl .route{padding:10px}}",
"@media(max-width:430px){.stl .sysgrid{grid-template-columns:1fr}.stl .casebar button{flex:1 1 145px}}",
"@media(prefers-reduced-motion:reduce){.stl .sys{transition:none}}"
].join("\\n");
function mount(el){
 let active=0,chosen=new Set(),revealed=false;
 el.innerHTML='<section class="stl"><style>'+CSS+'</style>'+
 '<h2>Systems in Motion</h2><p class="muted">A connected-systems investigation based on the “Systems Working Together” class handout. First decide which systems take part; then reveal one model pathway and compare it with your explanation.</p>'+
 '<div class="casebar" role="group" aria-label="Choose an everyday situation">'+CASES.map((c,i)=>'<button class="case" type="button" data-case="'+i+'" aria-pressed="'+(i===0)+'">'+esc(c.title)+'</button>').join("")+'</div>'+
 '<div class="scenario"><b id="stl-title"></b><p id="stl-situation"></p></div>'+
 '<div class="taskgrid"><div><h3>1 · Choose the systems involved</h3><p class="muted">Select at least four. Some are less direct than others; be ready to explain your choices.</p><div class="sysgrid" id="stl-systems"></div></div>'+
 '<div class="selection"><h3>Your reasoning</h3><div class="count" id="stl-count">0 systems selected</div><label for="stl-connection"><span class="muted">Choose one connection and explain how the systems depend on each other.</span></label><textarea id="stl-connection" placeholder="For example: the respiratory system…"></textarea><label for="stl-evidence"><span class="muted">What detail from the situation supports your explanation?</span></label><textarea id="stl-evidence" placeholder="The situation says…"></textarea><button class="primary" id="stl-reveal" type="button" disabled>Reveal a model pathway</button><p class="status" id="stl-status" role="status" aria-live="polite"></p><div class="actions"><button id="stl-download" type="button">Download my response</button><button id="stl-clear" type="button">Clear this response</button></div><p class="report-status" id="stl-report-status" role="status" aria-live="polite">Nothing is saved or sent. Download only if you want a copy.</p></div></div>'+
 '<div class="model" id="stl-model" hidden><h3>2 · Compare with one model pathway</h3><p class="muted">These pathways show selected connections, not every structure or response. Check whether your explanation is supported; written reasoning is for teacher review.</p><div id="stl-routes"></div><p class="limit" id="stl-extra"></p><p class="limit">Model limit: this is a simplified classroom explanation. The real body uses additional structures and feedback loops; arrows show a useful connection, not a complete biological sequence.</p></div></section>';
 const q=s=>el.querySelector(s),sc=CASES[active];
 function draw(){
  const c=CASES[active];q("#stl-title").textContent=c.title;q("#stl-situation").textContent=c.text;
  q("#stl-systems").innerHTML=Object.keys(SYSTEMS).map(k=>{
   const d=SYSTEMS[k],on=chosen.has(k),expected=c.systems.includes(k);
   const relevant=revealed&&expected;
   return '<button type="button" class="sys" data-system="'+k+'" aria-pressed="'+on+'" style="--sys-color:'+d.color+'"><span class="mark" aria-hidden="true">'+(on?"✓":"+")+'</span><strong>'+esc(d.name)+(relevant?' · in this model':"")+'</strong><small>'+esc(d.organs)+'</small><small>'+esc(d.job)+'</small></button>';
  }).join("");
  q("#stl-count").textContent=chosen.size+" system"+(chosen.size===1?"":"s")+" selected";
  q("#stl-reveal").disabled=chosen.size<4||revealed;
  q("#stl-reveal").textContent=revealed?"Pathway revealed":"Reveal a model pathway";
  q("#stl-model").hidden=!revealed;
  q("#stl-extra").textContent=c.extra;
  q("#stl-routes").innerHTML=c.routes.map(route=>'<div class="route"><h4>'+esc(route.title)+'</h4><div class="steps">'+route.steps.map((step,i)=>'<div class="step" style="--step-color:'+SYSTEMS[route.ids[i]].color+'"><b>'+esc(SYSTEMS[route.ids[i]].name)+'</b>'+esc(step)+'</div>').join("")+'</div></div>').join("");
 }
 el.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b||!el.contains(b))return;
  if(b.dataset.case!==undefined){active=Number(b.dataset.case);chosen.clear();revealed=false;q("#stl-connection").value="";q("#stl-evidence").value="";q("#stl-status").textContent="";q("#stl-report-status").textContent="Nothing is saved or sent. Download only if you want a copy.";el.querySelectorAll("[data-case]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));draw();}
  else if(b.dataset.system){const k=b.dataset.system;if(chosen.has(k))chosen.delete(k);else chosen.add(k);q("#stl-status").textContent="";draw();}
  else if(b.id==="stl-reveal"&&chosen.size>=4){revealed=true;q("#stl-status").textContent="Compare your choices with the pathway. This activity does not score your written explanation.";draw();}
  else if(b.id==="stl-clear"){chosen.clear();revealed=false;q("#stl-connection").value="";q("#stl-evidence").value="";q("#stl-status").textContent="";q("#stl-report-status").textContent="Your response is cleared from this page.";draw();}
  else if(b.id==="stl-download"){
   const c=CASES[active],names=Array.from(chosen).map(k=>SYSTEMS[k].name);
   const output=["Systems in Motion — Grade 8 Science",c.title,c.text,"Systems I considered:",names.length?names.join(", "):"None selected","My systems connection:",q("#stl-connection").value.trim(),"Evidence from the situation:",q("#stl-evidence").value.trim(),"Model pathway revealed: "+(revealed?"Yes":"No"),"Important: Student reasoning is not machine-scored. The pathway is a simplified model and does not show every body-system relationship.","No information was uploaded."].join("\\n\\n");
   const url=URL.createObjectURL(new Blob([output],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="systems-in-motion-response.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);q("#stl-report-status").textContent="Response downloaded to this device. Nothing was uploaded.";
  }
 });
 el.addEventListener("input",e=>{if(e.target.matches("textarea"))q("#stl-report-status").textContent="Draft is held on this page until you leave; download to keep a copy. Nothing is uploaded.";});
 el.querySelectorAll("[data-case]").forEach((b,i)=>b.setAttribute("aria-pressed",String(i===0)));
 draw();
}
const key="cells/systems",previous=H.lessonTools&&H.lessonTools[key];H.lessonTools=H.lessonTools||{};
H.lessonTools[key]=function(root){
 const old=document.createElement("div");if(previous){root.appendChild(old);previous(old);}
 const next=document.createElement("div");root.appendChild(next);mount(next);
};
H.systemsInMotion={cases:CASES,systems:SYSTEMS};
})();