/* Interactive human systems model and digital assignment for the Science Cells & Systems lesson.
   The simplified body map is a teaching diagram, not an anatomical reference. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const systems=[
 {id:"digestive",name:"Digestive",job:"Breaks food into nutrients to be absorbed.",organs:[
  {id:"mouth",name:"Mouth",job:"Food enters the body here. Chewing breaks it into smaller pieces."},
  {id:"esophagus",name:"Esophagus",job:"Passes swallowed food from the mouth to the stomach."},
  {id:"stomach",name:"Stomach",job:"Muscle movement and acid help break food down."},
  {id:"liver",name:"Liver",job:"Makes bile, which helps break down food."},
  {id:"small-intestine",name:"Small intestine",job:"Most nutrient absorption takes place here."},
  {id:"large-intestine",name:"Large intestine",job:"Some absorption happens here; solid waste passes toward the rectum and anus."}
 ]},
 {id:"integumentary",name:"Integumentary",job:"The body's outer covering protects it and helps regulate temperature.",organs:[
  {id:"skin",name:"Skin",job:"Protects the body and helps control temperature. Skin is the body's largest organ."},
  {id:"hair",name:"Hair",job:"Hair is part of the body's outer covering."},
  {id:"nails",name:"Nails",job:"Nails are part of the integumentary system."}
 ]},
 {id:"nervous",name:"Nervous",job:"Coordinates activities by sending electrical signals between the brain and the body.",organs:[
  {id:"brain",name:"Brain",job:"Works with the spinal cord as part of the central nervous system."},
  {id:"spinal-cord",name:"Spinal cord",job:"Carries signals and, with the brain, forms the central nervous system."},
  {id:"nerves",name:"Nerves",job:"The peripheral nervous system is a network of nerves connecting the central nervous system to the rest of the body."}
 ]},
 {id:"respiratory",name:"Respiratory",job:"Moves air in and out, supplying oxygen to cells and removing carbon dioxide.",organs:[
  {id:"trachea",name:"Trachea",job:"Carries air between the throat and the lungs."},
  {id:"lungs",name:"Lungs",job:"The major organs of the respiratory system. They move air in and out of the body."}
 ]},
 {id:"circulatory",name:"Circulatory",job:"Moves blood around the body, delivering nutrients and oxygen and carrying away wastes.",bridge:true,organs:[
  {id:"heart",name:"Heart",job:"A muscular organ that pumps blood through the body's blood vessels."},
  {id:"blood-vessels",name:"Blood vessels",job:"Arteries, veins and capillaries carry blood through the body; capillaries exchange materials with cells."}
 ]}
];
const nodes=[
 {id:"mouth",system:"digestive",x:218,y:122},
 {id:"esophagus",system:"digestive",x:218,y:167},
 {id:"liver",system:"digestive",x:188,y:222},
 {id:"stomach",system:"digestive",x:244,y:230},
 {id:"small-intestine",system:"digestive",x:219,y:277},
 {id:"large-intestine",system:"digestive",x:219,y:317},
 {id:"skin",system:"integumentary",x:139,y:218},
 {id:"hair",system:"integumentary",x:219,y:40},
 {id:"nails",system:"integumentary",x:169,y:558},
 {id:"brain",system:"nervous",x:218,y:73},
 {id:"spinal-cord",system:"nervous",x:218,y:178},
 {id:"nerves",system:"nervous",x:163,y:270},
 {id:"trachea",system:"respiratory",x:218,y:143},
 {id:"lungs",system:"respiratory",x:218,y:193},
 {id:"heart",system:"circulatory",x:218,y:226},
 {id:"blood-vessels",system:"circulatory",x:276,y:278}
];
const paths={
 digestive:'<path d="M218 128 C216 151 219 165 218 178" class="bs-path"/><path d="M213 178 C200 187 193 198 190 211 C185 230 199 242 213 237 C225 234 229 219 221 211 C215 203 206 211 208 219" class="bs-path"/><path d="M230 219 C252 213 258 226 251 238 C246 247 233 247 229 257" class="bs-path"/><path d="M196 260 C183 270 185 292 198 298 C210 304 228 299 239 300 C253 301 258 315 247 325 C236 335 207 329 197 337" class="bs-path"/>',
 integumentary:'<path d="M218 39 C196 39 184 54 184 76 C184 94 194 105 181 112 C159 118 149 130 150 158 L158 211 L143 290 Q141 303 152 306 L164 303 L174 260 L178 337 L171 517 Q170 533 184 535 Q197 536 199 520 L218 366 L237 520 Q239 536 252 535 Q266 533 265 517 L258 337 L262 260 L275 303 L287 306 Q299 303 293 290 L278 211 L286 158 C287 130 277 118 255 112 C242 105 252 94 252 76 C252 54 240 39 218 39 Z" class="bs-outline-highlight"/>',
 nervous:'<path d="M218 79 L218 341 M218 132 L186 164 L168 202 M218 132 L250 164 L268 202 M218 198 L184 232 L167 267 M218 198 L251 233 L270 269 M218 252 L190 296 L177 329 M218 252 L247 296 L260 329" class="bs-path"/>',
 respiratory:'<path d="M218 128 L218 171 M218 158 L202 177 M218 158 L234 177" class="bs-path"/><path d="M200 174 C179 167 171 187 175 210 C178 228 190 241 202 234 C211 229 210 200 200 174 Z" class="bs-organ"/><path d="M236 174 C257 167 265 187 261 210 C258 228 246 241 234 234 C225 229 226 200 236 174 Z" class="bs-organ"/>',
 circulatory:'<path d="M218 225 C208 202 191 208 193 226 C194 239 207 246 218 256 C229 246 242 239 243 226 C245 208 228 202 218 225 Z" class="bs-heart"/><path d="M218 229 C216 196 218 176 218 152 M218 239 C198 258 184 279 180 307 M220 239 C242 258 257 280 261 307 M218 255 L218 340" class="bs-vessel"/>'
};
function mount(el){
 if(!el)return;
 el.innerHTML='<section class="bs-model" aria-labelledby="bs-title"><style>'+
 '.bs-model{--bs-line:var(--rule);color:var(--ink);line-height:1.5}'+
 '.bs-model h2{margin:4px 0 8px;font-family:var(--f-title);font-size:clamp(22px,3vw,30px)}'+
 '.bs-model h3{margin:0 0 7px;font-size:18px}'+
 '.bs-model p{max-width:70ch}'+
 '.bs-intro{color:var(--muted);margin:0 0 14px}'+
 '.bs-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0}'+
 '.bs-tabs button,.bs-organ-list button{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:8px 12px;min-height:42px;cursor:pointer}'+
 '.bs-tabs button[aria-pressed="true"],.bs-organ-list button[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--accent);font-weight:700}'+
 '.bs-model button:focus-visible,.bs-model select:focus-visible,.bs-model textarea:focus-visible,.bs-model input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}'+
 '.bs-layout{display:grid;grid-template-columns:minmax(300px,1.05fr) minmax(240px,.95fr);gap:18px;align-items:start}'+
 '.bs-figure{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius);padding:10px;min-width:0}'+
 '.bs-svg{display:block;width:100%;max-width:440px;height:auto;margin:0 auto}'+
 '.bs-body{fill:var(--paper);stroke:var(--rule);stroke-width:2}'+
 '.bs-limb{fill:none;stroke:var(--paper);stroke-width:25;stroke-linecap:round}'+
 '.bs-limb-edge{fill:none;stroke:var(--rule);stroke-width:27;stroke-linecap:round;opacity:.7}'+
 '.bs-path{fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}'+
 '.bs-vessel{fill:none;stroke:var(--accent-ink,var(--accent));stroke-width:4;stroke-linecap:round;stroke-linejoin:round}'+
 '.bs-organ{fill:var(--accent-soft);stroke:var(--accent);stroke-width:3}'+
 '.bs-heart{fill:var(--accent);stroke:var(--accent-ink,var(--accent));stroke-width:2}'+
 '.bs-outline-highlight{fill:var(--accent-soft);fill-opacity:.45;stroke:var(--accent);stroke-width:5}'+
 '.bs-marker{cursor:pointer}'+
 '.bs-marker circle{fill:var(--paper);stroke:var(--accent);stroke-width:3}'+
 '.bs-marker text{fill:var(--accent-ink,var(--ink));font-size:11px;font-weight:750;text-anchor:middle;dominant-baseline:central;pointer-events:none}'+
 '.bs-marker[aria-pressed="true"] circle{fill:var(--accent);stroke:var(--paper);stroke-width:2}'+
 '.bs-marker[aria-pressed="true"] text{fill:var(--paper)}'+
 '.bs-marker:focus-visible{outline:none} .bs-marker:focus-visible circle{stroke:var(--ink);stroke-width:4}'+
 '.bs-caption{font-size:12px;color:var(--muted);margin:7px 0 0}'+
 '.bs-side{min-width:0}'+
 '.bs-summary{padding:12px 14px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);margin-bottom:12px}'+
 '.bs-summary p{margin:4px 0}'+
 '.bs-organ-list{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 14px}'+
 '.bs-organ-detail{min-height:88px;padding:12px 14px;border-radius:var(--radius);background:var(--soft)}'+
 '.bs-organ-detail p{margin:4px 0}'+
 '.bs-bridge{font-size:13px;color:var(--muted);margin-top:8px}'+
 '.bs-assignment{margin-top:22px;padding-top:19px;border-top:1px solid var(--rule)}'+
 '.bs-assignment-intro{color:var(--muted);max-width:70ch}'+
 '.bs-assignment label{display:block;font-weight:650;margin:14px 0 6px}'+
 '.bs-assignment input,.bs-assignment select,.bs-assignment textarea{width:100%;max-width:100%;min-height:42px;padding:9px 11px;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px)}'+
 '.bs-assignment textarea{min-height:92px;resize:vertical}'+
 '.bs-task{border-top:1px solid var(--rule);padding-top:14px;margin-top:15px}'+
 '.bs-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}'+
 '.bs-status{min-height:24px;font-size:13px;color:var(--muted);margin:8px 0}'+
 '.bs-footnote{font-size:12px;color:var(--muted);margin-top:12px}'+
 '.bs-homeostasis-intro{border-top:1px solid var(--rule);margin-top:22px;padding-top:20px}'+
 '@media(max-width:720px){.bs-layout{grid-template-columns:1fr}.bs-figure{max-width:520px;margin:0 auto;width:100%}}'+
 '@media(prefers-reduced-motion:reduce){.bs-model *{scroll-behavior:auto!important}}'+
 '@media print{.bs-tabs,.bs-actions,.bs-organ-list,.bs-marker{display:none!important}.bs-layout{grid-template-columns:1fr 1fr}.bs-figure{background:white;border:1px solid #777}.bs-assignment textarea{min-height:75px;border:0;border-bottom:1px solid #555}.bs-homeostasis-intro{display:none}}'+
 '</style>'+
 '<h2 id="bs-title">Interactive Human Body Systems Model</h2>'+
 '<p class="bs-intro">Choose a system, then select an organ in the model or its list. The diagram shows approximate positions and relationships; it is not to scale.</p>'+
 '<div class="bs-tabs" id="bs-tabs" role="group" aria-label="Choose a body system"></div>'+
 '<div class="bs-layout"><figure class="bs-figure"><svg class="bs-svg" id="bs-svg" viewBox="0 0 440 590" role="group" aria-label="Interactive simplified human body diagram"></svg><figcaption class="bs-caption">Select a numbered marker or an organ name. The same choices are available by keyboard.</figcaption></figure>'+
 '<div class="bs-side"><div class="bs-summary" aria-live="polite"><h3 id="bs-system-name">Choose a system</h3><p id="bs-system-job">Its organs work together to do a job.</p></div>'+
 '<h3>Organs in this system</h3><div class="bs-organ-list" id="bs-organs" role="group" aria-label="Organs"></div>'+
 '<div class="bs-organ-detail" id="bs-organ-detail" aria-live="polite"><b>Select an organ</b><p>Its job will appear here.</p></div>'+
 '<p class="bs-bridge" id="bs-bridge"></p></div></div>'+
 '<div class="bs-assignment"><h2>Digital assignment: Systems at work</h2>'+
 '<p class="bs-assignment-intro">Use the model and your booklet to answer. Your writing saves in this browser on this device. It is not sent to your teacher; download or print your answers to submit using the class directions.</p>'+
 '<label for="bs-student-name">Name (optional)</label><input id="bs-student-name" type="text" autocomplete="name">'+
 '<div class="bs-task"><h3>1 · Explore and describe</h3><label for="bs-system-choice">Choose one system from the model</label><select id="bs-system-choice"><option value="">Choose a system</option>'+systems.map(s=>'<option value="'+escape(s.id)+'">'+escape(s.name)+' system</option>').join("")+'</select>'+
 '<label for="bs-organ-answer">Name two organs in that system and describe one job each</label><textarea id="bs-organ-answer" rows="3"></textarea></div>'+
 '<div class="bs-task"><h3>2 · Explain a connection</h3><label for="bs-connection-answer">How do the respiratory and circulatory systems work together to deliver oxygen to body cells and remove carbon dioxide?</label><textarea id="bs-connection-answer" rows="4"></textarea></div>'+
 '<div class="bs-task"><h3>3 · Think about the whole body</h3><label for="bs-homeostasis-answer">Choose one system in the model. How could its work help the body keep its internal conditions stable?</label><textarea id="bs-homeostasis-answer" rows="4"></textarea>'+
 '<p class="bs-footnote">Use examples from the model. Explain the system's job and name an organ that helps it do that job.</p></div>'+
 '<div class="bs-actions"><button type="button" class="btn" id="bs-download">Download assignment</button><button type="button" class="btn ghost" id="bs-print">Print assignment</button><button type="button" class="btn ghost" id="bs-clear">Clear saved answers</button></div>'+
 '<p class="bs-status" id="bs-status" role="status" aria-live="polite"></p></div>'+
 '<p class="bs-footnote">The interactive diagrams simplify anatomy for Grade 8 learning. Use the Systems booklet and class diagrams for the full set of details.</p>'+
 '<div class="bs-homeostasis-intro" id="bs-homeostasis-intro"><p class="bs-intro"><b>Continue with the Homeostasis Lab:</b> make a prediction, change a condition, and compare how feedback helps keep body temperature near its set point.</p></div>'+
 '</section>';
 let active="all",selected=null;
 const byId=id=>systems.find(s=>s.id===id);
 const visibleSystems=()=>active==="all"?systems:systems.filter(s=>s.id===active);
 const visibleOrgans=()=>visibleSystems().flatMap(s=>s.organs.map(o=>({system:s,organ:o})));
 const svg=el.querySelector("#bs-svg");
 function diagram(){
  const people='<circle cx="218" cy="68" r="32" class="bs-body"/>'+
   '<path d="M187 106 Q169 108 155 121 Q145 134 149 166 L158 218 L143 286 Q141 297 151 300 L161 300 L177 251 L178 337 L169 518 Q168 534 182 536 Q196 537 198 520 L218 369 L238 520 Q240 537 254 536 Q268 534 267 518 L258 337 L259 251 L275 300 L285 300 Q296 297 293 286 L278 218 L287 166 Q291 134 281 121 Q267 108 249 106 Z" class="bs-body"/>'+
   '<path d="M157 126 Q142 178 132 224 L116 280 M281 126 Q296 178 306 224 L322 280" class="bs-limb-edge"/>'+
   '<path d="M157 126 Q142 178 132 224 L116 280 M281 126 Q296 178 306 224 L322 280" class="bs-limb"/>';
  let overlays="";
  if(active==="all")overlays=Object.values(paths).join("");
  else overlays=paths[active]||"";
  const visible=visibleOrgans();
  const markers=visible.map((entry,i)=>{
   const n=nodes.find(x=>x.id===entry.organ.id);
   if(!n)return "";
   const on=selected===entry.organ.id;
   return '<g class="bs-marker" role="button" tabindex="0" data-organ-id="'+escape(n.id)+'" aria-label="'+escape(entry.organ.name)+', '+escape(entry.system.name)+' system" aria-pressed="'+on+'"><circle cx="'+n.x+'" cy="'+n.y+'" r="12"/><text x="'+n.x+'" y="'+n.y+'">'+(i+1)+'</text></g>';
  }).join("");
  svg.innerHTML=people+overlays+markers;
  svg.setAttribute("aria-label","Simplified human body diagram. "+(active==="all"?"Choose a system to filter the organ markers.":byId(active).name+" system selected.")+" Positions are approximate.");
 }
 function renderDetail(){
  const system=active==="all"?null:byId(active);
  el.querySelector("#bs-system-name").textContent=system?system.name+" system":"All systems";
  el.querySelector("#bs-system-job").textContent=system?system.job:"Choose a system to see its job and organs. The circulatory system is included as a bridge to the next lesson.";
  el.querySelector("#bs-bridge").textContent=system&&system.bridge?"Bridge to Topic 7: the heart and blood vessels move blood, carrying oxygen and nutrients to cells and carrying wastes away.":"";
  const detail=selected?visibleOrgans().find(x=>x.organ.id===selected):null;
  const detailEl=el.querySelector("#bs-organ-detail");
  detailEl.innerHTML=detail?'<b>'+escape(detail.organ.name)+'</b><p>'+escape(detail.organ.job)+'</p><p class="bs-footnote">'+escape(detail.system.name)+' system</p>':'<b>Select an organ</b><p>Its job will appear here.</p>';
  const list=el.querySelector("#bs-organs");
  list.innerHTML=visibleOrgans().map((entry,i)=>'<button type="button" data-organ-id="'+escape(entry.organ.id)+'" aria-pressed="'+(selected===entry.organ.id)+'">'+(active==="all"?escape(entry.system.name)+": ":"")+(i+1)+". "+escape(entry.organ.name)+'</button>').join("");
  list.querySelectorAll("[data-organ-id]").forEach(b=>b.addEventListener("click",()=>chooseOrgan(b.dataset.organId)));
  svg.querySelectorAll("[data-organ-id]").forEach(g=>{
   g.addEventListener("click",()=>chooseOrgan(g.dataset.organId));
   g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();chooseOrgan(g.dataset.organId);}});
  });
 }
 function chooseOrgan(id){selected=id;diagram();renderDetail();}
 function chooseSystem(id){
  active=id;
  const pool=visibleOrgans();
  if(!pool.some(x=>x.organ.id===selected))selected=pool.length?pool[0].organ.id:null;
  el.querySelectorAll("#bs-tabs [data-system]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.system===active)));
  diagram();renderDetail();
 }
 const tabs=el.querySelector("#bs-tabs");
 tabs.innerHTML='<button type="button" data-system="all" aria-pressed="true">All</button>'+systems.map(s=>'<button type="button" data-system="'+escape(s.id)+'" aria-pressed="false">'+escape(s.name)+(s.bridge?' · Topic 7':'')+'</button>').join("");
 tabs.querySelectorAll("[data-system]").forEach(b=>b.addEventListener("click",()=>chooseSystem(b.dataset.system)));
 
 const storageKey="science-body-systems-assignment-v1";
 const fields=["bs-student-name","bs-system-choice","bs-organ-answer","bs-connection-answer","bs-homeostasis-answer"];
 function load(){
  try{const raw=localStorage.getItem(storageKey);if(raw){const data=JSON.parse(raw);fields.forEach(id=>{if(typeof data[id]==="string")el.querySelector("#"+id).value=data[id];});return true;}}
  catch(e){}
  return false;
 }
 function save(){
  const data={};fields.forEach(id=>data[id]=el.querySelector("#"+id).value);
  try{localStorage.setItem(storageKey,JSON.stringify(data));el.querySelector("#bs-status").textContent="Saved on this device.";return true;}
  catch(e){el.querySelector("#bs-status").textContent="Autosave is unavailable here. Download or print before leaving.";return false;}
 }
 function report(){
  const systemId=el.querySelector("#bs-system-choice").value;
  const choice=byId(systemId);
  return ["Science · Cells & Systems — Digital Assignment","Systems at work","Name: "+(el.querySelector("#bs-student-name").value.trim()||"________________"),
   "1. System: "+(choice?choice.name+" system":"not selected"),
   "Two organs and one job each:\\n"+(el.querySelector("#bs-organ-answer").value.trim()||""),
   "2. How respiratory and circulatory systems work together:\\n"+(el.querySelector("#bs-connection-answer").value.trim()||""),
   "3. How a system helps keep the body stable:\\n"+(el.querySelector("#bs-homeostasis-answer").value.trim()||"")
  ].join("\\n\\n")+"\\n";
 }
 function download(){
  const blob=new Blob([report()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
  const link=document.createElement("a");link.href=url;link.download="systems-at-work-assignment.txt";
  document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  el.querySelector("#bs-status").textContent="Assignment downloaded. Submit it using your teacher's class directions.";
 }
 load();
 fields.forEach(id=>el.querySelector("#"+id).addEventListener("input",save));
 el.querySelector("#bs-download").addEventListener("click",()=>{save();download();});
 el.querySelector("#bs-print").addEventListener("click",()=>window.print());
 el.querySelector("#bs-clear").addEventListener("click",()=>{
  fields.forEach(id=>el.querySelector("#"+id).value="");
  try{localStorage.removeItem(storageKey);}catch(e){}
  el.querySelector("#bs-status").textContent="Saved answers cleared from this device.";
 });
 chooseSystem("all");
 const status=el.querySelector("#bs-status");
 if(status.textContent==="")status.textContent="Your answers stay in this browser. No online submission occurs.";
}
const original=H.lessonTools&&H.lessonTools["cells/systems"];
H.bodySystemsModel={systems:systems.map(s=>({id:s.id,name:s.name,organs:s.organs.map(o=>o.name)})),mount};
if(original){
 H.lessonTools["cells/systems"]=function(el){
  el.innerHTML='<div id="bs-integrated-model"></div><div id="bs-integrated-homeostasis"></div>';
  mount(el.querySelector("#bs-integrated-model"));
  original(el.querySelector("#bs-integrated-homeostasis"));
 };
}else H.lessonTools=Object.assign(H.lessonTools||{},{"cells/systems":mount});
})();