/* Human Systems · organ-level structure/function inspector.
   Adds factual annotations to the existing seven-system diagram. No user identity,
   analytics, remote storage or simulated physiological readings. */
(function(g){
"use strict";
const H=g.HUB;if(!H)return;
const PARTS=[
 {id:"brain",label:"Brain",system:"Nervous",x:215,y:59,job:"Receives information, makes decisions and sends instructions to the body.",partner:"Muscular",choices:["Muscular","Digestive","Skeletal"],why:"Nerves carry signals from the brain to skeletal muscles so you can move voluntarily."},
 {id:"cord",label:"Spinal cord",system:"Nervous",x:215,y:128,job:"Relays signals between the brain and much of the body and helps coordinate reflexes.",partner:"Muscular",choices:["Circulatory","Muscular","Integumentary"],why:"Motor signals travel through the spinal cord and nerves to the muscles."},
 {id:"trachea",label:"Trachea",system:"Respiratory",x:215,y:165,job:"A reinforced airway that carries air toward the bronchi and lungs.",partner:"Muscular",choices:["Skeletal","Digestive","Muscular"],why:"The diaphragm and chest muscles change chest volume to move air through the trachea."},
 {id:"lungs",label:"Lungs",system:"Respiratory",x:172,y:208,job:"In the air sacs, oxygen moves into nearby capillary blood while carbon dioxide moves into the air.",partner:"Circulatory",choices:["Circulatory","Nervous","Skeletal"],why:"Blood in lung capillaries carries exchanged gases toward or away from the heart."},
 {id:"heart",label:"Heart",system:"Circulatory",x:215,y:242,job:"Cardiac muscle contracts to pump blood through the pulmonary and systemic circuits.",partner:"Respiratory",choices:["Digestive","Respiratory","Skeletal"],why:"The heart pumps blood to the lungs for gas exchange and then to body tissues."},
 {id:"stomach",label:"Stomach",system:"Digestive",x:257,y:303,job:"Muscular contractions mix food with gastric juices and help produce chyme.",partner:"Muscular",choices:["Muscular","Skeletal","Integumentary"],why:"Smooth muscle in the stomach wall churns and moves food during digestion."},
 {id:"intestine",label:"Small intestine",system:"Digestive",x:213,y:376,job:"Most digested nutrients are absorbed through the intestinal lining.",partner:"Circulatory",choices:["Nervous","Circulatory","Skeletal"],why:"Many absorbed nutrients enter capillary blood and are transported to tissues."},
 {id:"skin",label:"Skin",system:"Integumentary",x:106,y:291,job:"Forms a protective barrier and contains sensory receptors for touch, pressure and temperature.",partner:"Nervous",choices:["Circulatory","Muscular","Nervous"],why:"Skin receptors send sensory information through nerves to the central nervous system."},
 {id:"arm",label:"Upper-arm muscle",system:"Muscular",x:144,y:201,job:"Skeletal muscle shortens to exert a pulling force through a tendon.",partner:"Skeletal",choices:["Skeletal","Digestive","Respiratory"],why:"The tendon transfers muscle force to bones to change joint position."},
 {id:"rib",label:"Rib cage",system:"Skeletal",x:254,y:185,job:"Protects organs in the chest and moves with breathing.",partner:"Respiratory",choices:["Digestive","Respiratory","Integumentary"],why:"Ribs and intercostal muscles help the thoracic cavity expand during inhalation."},
 {id:"femur",label:"Femur",system:"Skeletal",x:252,y:467,job:"A major weight-bearing bone that forms part of the hip and knee joints.",partner:"Muscular",choices:["Nervous","Muscular","Digestive"],why:"Skeletal muscles pull on the femur through tendons to move the hip or knee."},
 {id:"diaphragm",label:"Diaphragm",system:"Muscular",x:196,y:280,job:"A dome-shaped skeletal muscle that contracts and moves downward during inhalation.",partner:"Respiratory",choices:["Skeletal","Digestive","Respiratory"],why:"Its contraction increases chest volume so air flows into the lungs."}
];
const dict=Object.fromEntries(PARTS.map(p=>[p.id,p]));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".hsi .oi{margin:22px 0;padding:18px;border:1px solid var(--rule);border-radius:12px;background:var(--paper)}",
".hsi .oi h3{font-size:1.17rem;margin:0 0 6px}.hsi .oi p{color:var(--muted);margin:6px 0 12px}.hsi .oi .oi-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:18px}",
".hsi .oi .oi-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;align-content:start}.hsi .oi button{min-height:39px;text-align:left;font-size:.85rem;min-width:0}",
".hsi .oi button[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}",
".hsi .oi .oi-detail{border:1px solid var(--rule);border-radius:9px;padding:14px;background:var(--soft)}.hsi .oi .oi-detail h4{margin:2px 0 8px;font-size:1.08rem}",
".hsi .oi .oi-detail dt{font-weight:720;font-size:.78rem;color:var(--muted);margin-top:8px}.hsi .oi .oi-detail dd{margin:3px 0 8px;font-size:.88rem}",
".hsi .oi .oi-answer{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}.hsi .oi .oi-answer button{flex:1 1 125px;text-align:center}",
".hsi .oi .oi-feedback{min-height:22px;color:var(--accent-ink);font-weight:700;font-size:.86rem}",
".hsi .oi textarea{font:inherit;min-height:80px;width:100%;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:8px;padding:10px;resize:vertical}",
".hsi .oi label{display:grid;gap:7px;font-weight:700;font-size:.86rem;margin:13px 0}",
".hsi svg .oi-marker{cursor:pointer;outline:none}.hsi svg .oi-marker circle{fill:var(--paper);stroke:var(--ink);stroke-width:2.5}",
".hsi svg .oi-marker text{fill:var(--ink);font:700 13px var(--f-body,system-ui);pointer-events:none}",
".hsi svg .oi-marker[aria-pressed=true] circle,.hsi svg .oi-marker:hover circle{fill:var(--accent);stroke:var(--accent)}",
".hsi svg .oi-marker[aria-pressed=true] text,.hsi svg .oi-marker:hover text{fill:var(--on-accent)}",
".hsi svg .oi-marker:focus-visible circle{stroke:var(--ink);stroke-width:5}",
".hsi .oi .oi-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0}",
"@media(max-width:780px){.hsi .oi .oi-grid{grid-template-columns:1fr}}@media(max-width:490px){.hsi .oi{padding:12px}.hsi .oi .oi-list{grid-template-columns:1fr 1fr}}"
].join("\n");
function mount(hsi){
 if(hsi.querySelector(".oi"))return;
 const diagram=hsi.querySelector(".diagram svg");
 if(!diagram)return;
 const style=document.createElement("style");style.textContent=css;hsi.appendChild(style);
 const marker=PARTS.map((p,i)=>'<g class="oi-marker" data-part="'+p.id+'" tabindex="0" role="button" aria-pressed="false" aria-label="Inspect '+esc(p.label)+'">'+
  '<circle cx="'+p.x+'" cy="'+p.y+'" r="13"/><text x="'+p.x+'" y="'+(p.y+4)+'" text-anchor="middle">'+(i+1)+'</text></g>').join("");
 // Append annotated touch targets to the existing simplified SVG, without replacing other interactive layers.
 diagram.insertAdjacentHTML("beforeend",marker);
 const section=document.createElement("section");section.className="oi";
 section.innerHTML='<h3>Organ Inspector · Structure and function</h3>'+
 '<p>Choose a numbered dot on the body or a structure below. Explore its job, then check which other body system works alongside it.</p>'+
 '<div class="oi-grid"><div class="oi-list" role="group" aria-label="Structures to inspect">'+PARTS.map((p,i)=>
 '<button type="button" data-part="'+p.id+'" aria-pressed="false">'+(i+1)+'. '+esc(p.label)+'</button>').join("")+'</div>'+
 '<div class="oi-detail"><p class="small">Selected structure</p><h4 id="oi-name"></h4>'+
 '<dl><dt>Primary body system</dt><dd id="oi-system"></dd><dt>What the structure does</dt><dd id="oi-job"></dd></dl>'+
 '<h4>Check the connection</h4><p id="oi-prompt"></p><div class="oi-answer" role="group" aria-label="System connections"></div>'+
 '<p class="oi-feedback" id="oi-feedback" role="status"></p></div></div>'+
 '<p id="oi-progress" class="oi-feedback" role="status">0 of 12 structures connected correctly.</p>'+
 '<label>Explain: choose two structures from different systems and describe how they work together.'+
 '<textarea id="oi-explain" placeholder="The lungs... and the heart... cooperate because..."></textarea></label>'+
 '<div class="oi-actions"><button type="button" id="oi-export">Download my organ investigation</button></div>'+
 '<p id="oi-download-status" class="oi-feedback" role="status"></p>'+
 '<p class="hint">A simplified diagram for learning—not anatomically to scale. This activity records progress only within the current browser tab.</p>';
 const quiz=hsi.querySelector(".quiz");
 if(quiz)hsi.insertBefore(section,quiz);else hsi.appendChild(section);
 const $=q=>section.querySelector(q);
 const complete=new Set();
 let current=PARTS[0];
 function draw(){
  $("#oi-name").textContent=current.label;
  $("#oi-system").textContent=current.system;
  $("#oi-job").textContent=current.job;
  $("#oi-prompt").textContent="Which other system directly supports the work of the "+current.label.toLowerCase()+"?";
  $(".oi-answer").innerHTML=current.choices.map(c=>'<button type="button" data-answer="'+esc(c)+'">'+esc(c)+'</button>').join("");
  $("#oi-feedback").textContent=complete.has(current.id)?"Previously checked correctly. Choose another structure to continue.":"";
  hsi.querySelectorAll("[data-part]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.part===current.id)));
  $("#oi-progress").textContent=complete.size+" of "+PARTS.length+" structures connected correctly.";
 }
 function select(id){if(!dict[id])return;current=dict[id];draw();}
 function answer(picked){
  if(!current.choices.includes(picked))return;
  const correct=picked===current.partner;
  if(correct)complete.add(current.id);
  $("#oi-feedback").textContent=(correct?"Correct. ":"Not quite. ")+current.why;
  $("#oi-progress").textContent=complete.size+" of "+PARTS.length+" structures connected correctly.";
 }
 hsi.addEventListener("click",e=>{
  const part=e.target.closest("[data-part]");
  if(part&&hsi.contains(part)){select(part.dataset.part);return;}
  const option=e.target.closest("[data-answer]");
  if(option&&section.contains(option))answer(option.dataset.answer);
 });
 hsi.addEventListener("keydown",e=>{
  const m=e.target.closest(".oi-marker");if(m&&(e.key==="Enter"||e.key===" ")){
   e.preventDefault();select(m.dataset.part);
  }
 });
 $("#oi-export").addEventListener("click",()=>{
  if(complete.size<3){$("#oi-download-status").textContent="Check at least three structures correctly before downloading.";return;}
  const response=$("#oi-explain").value.trim();
  if(response.split(/\s+/).filter(Boolean).length<24){
   $("#oi-download-status").textContent="Explain how two structures work together in at least 24 words.";return;
  }
  const report=["Human Systems · Organ Inspector","Grade 8 Science · Cells & Systems","This is a simplified learning diagram.","",
   "Correct connections:",...PARTS.filter(p=>complete.has(p.id)).map(p=>p.label+" ("+p.system+") + "+p.partner+": "+p.why),
   "","MY EXPLANATION:",response,
   "","Model limitation: diagram schematic, not anatomical measurements."].join("\n");
  const url=URL.createObjectURL(new Blob([report],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="organ-systems-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#oi-download-status").textContent="Downloaded. Follow your teacher's hand-in instructions.";
 });
 draw();
 hsi.organInspector={get current(){return current.id;},get correct(){return Array.from(complete);},select,answer};
}
H.lessonTools=H.lessonTools||{};
const previous=H.lessonTools["cells/systems"];
H.lessonTools["cells/systems"]=function(root){
 if(previous)previous(root);
 const hsi=root.querySelector(".hsi");if(hsi)mount(hsi);
};
g.OrganInspectorData=PARTS;
})(window);