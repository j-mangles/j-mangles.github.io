/* Human Systems Explorer + Oxygen Delivery Lab.
   Grade 8 Cells & Systems booklet lessons 9–10. Simplified diagrams and indexes. */
(function () {
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SYSTEMS={
 respiratory:{name:"Respiratory",organs:"Lungs",job:"Moves air in and out to bring oxygen in and remove carbon dioxide.",link:"The circulatory system carries oxygen from the lungs to cells.",path:[["Inhale","Air enters the lungs."],["Gas exchange","Oxygen enters the blood while carbon dioxide leaves it."],["Transport","Blood carries oxygen to body cells."],["Exhale","Carbon dioxide is breathed out."]]},
 circulatory:{name:"Circulatory",organs:"Heart and blood vessels",job:"Pumps blood to carry oxygen and nutrients to cells and take wastes away.",link:"The respiratory system supplies oxygen; the digestive system supplies absorbed nutrients.",path:[["Heart","Heart muscle pumps blood."],["Arteries","Carry blood away from the heart."],["Capillaries","Exchange materials with body cells."],["Veins","Carry blood back toward the heart."]]},
 digestive:{name:"Digestive",organs:"Stomach and intestines",job:"Breaks food into nutrients that the body can absorb.",link:"Blood transports nutrients absorbed by the small intestine.",path:[["Mouth","Food enters and begins to break down."],["Stomach","Acid and muscular movement break food down."],["Small intestine","Most nutrient absorption happens here."],["Transport","Nutrients can be carried to cells in the blood."]]},
 nervous:{name:"Nervous",organs:"Brain, spinal cord and nerves",job:"Sends electrical signals between the brain and the rest of the body.",link:"The brain and nerves coordinate responses involving other systems.",path:[["Brain","Processes information and directs responses."],["Spinal cord","Part of the central nervous system."],["Other nerves","Carry signals to and from the body."],["Response","The body responds to incoming information."]]},
 muscular:{name:"Muscular",organs:"Skeletal muscles, tendons and other muscle tissues",job:"Skeletal muscles contract to pull on bones and move joints. Muscle tissue also helps move blood and food through the body.",link:"The nervous system signals muscles to contract; the skeletal system provides support, and the circulatory system brings oxygen and nutrients.",path:[["Brain and nerves","Motor signals travel through nerves to skeletal muscles."],["Muscle contraction","Muscle fibres shorten and generate a pulling force."],["Tendon and bone","A tendon transmits the muscle force to a bone."],["Movement","Bones move around a joint, often with an opposing muscle relaxing."]]},
 skeletal:{name:"Skeletal",organs:"Bones, joints, cartilage and ligaments",job:"Bones provide support and protection, and joints allow movement. Bone marrow also produces blood cells.",link:"Muscles pull on bones at joints; the nervous system coordinates actions, while blood supplies living bone tissues.",path:[["Bones","Rigid bones provide a framework and protect important organs."],["Joint","Two or more bones meet at a joint, which can permit movement."],["Muscle and tendon","A contracting skeletal muscle pulls on a bone through a tendon."],["Coordinated motion","The joint moves as muscles are activated and other muscles relax."]]},
 integumentary:{name:"Integumentary",organs:"Skin, hair and nails",job:"Protects the body and helps regulate body temperature.",link:"Works with nervous and circulatory systems in homeostasis.",path:[["Skin","Creates a protective barrier."],["Conditions","Skin can detect conditions around the body."],["Temperature","The body can adjust heat loss through the skin."],["Homeostasis","Systems work together to maintain stable conditions."]]}
};
const QUIZ=[
 {q:"Where are most digested nutrients absorbed?",a:["Stomach","Small intestine","Large intestine"],c:1,why:"Most nutrient absorption takes place in the small intestine."},
 {q:"How does oxygen reach body cells after entering the lungs?",a:["In blood","In the stomach","Through skin"],c:0,why:"The respiratory and circulatory systems work together."},
 {q:"Which two organs form the central nervous system?",a:["Brain and spinal cord","Heart and lungs","Stomach and liver"],c:0,why:"The brain and spinal cord form the central nervous system."},
 {q:"Which vessels allow exchange with cells?",a:["Arteries","Capillaries","Veins"],c:1,why:"Capillaries exchange gases, nutrients and wastes with cells."},
 {q:"How do skeletal muscles move the bones of a joint?",a:["They push bones away using nerves","They contract and pull through tendons","They pump blood directly into joints"],c:1,why:"Skeletal muscles generate a pulling force, transmitted by tendons to bones."},
 {q:"Which system includes bones, joints and protective structures such as the rib cage?",a:["Skeletal","Digestive","Nervous"],c:0,why:"The skeletal system supports the body and protects organs."}
];
const STYLE=[
 ".hsi,.odi{color:var(--ink);min-width:0;line-height:1.5}",
 ".hsi{margin:0 0 30px}.odi{border-top:1px solid var(--rule);padding-top:23px;margin-top:23px}",
 ".hsi h2,.odi h2{font-family:var(--f-title);font-size:clamp(25px,3vw,31px);margin:0 0 6px}",
 ".hsi h3,.odi h3{font-size:1.08rem;margin:0 0 8px}",
 ".hsi p,.odi p{margin:7px 0 14px}.hsi .hint,.odi .hint{font-size:.88rem;color:var(--muted)}",
 ".hsi .layout{display:grid;grid-template-columns:minmax(0,310px) minmax(0,1fr);gap:22px;align-items:start}",
 ".hsi .diagram,.odi .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:10px;min-width:0}",
 ".hsi svg,.odi svg{display:block;width:100%;height:auto}.hsi svg{max-height:430px}",
 ".hsi .body{fill:color-mix(in srgb,var(--paper) 75%,var(--soft));stroke:var(--muted);stroke-width:2;stroke-opacity:.5}",
 ".hsi .organ{cursor:pointer;outline:none}.hsi .organ .part{fill:color-mix(in srgb,var(--accent) 27%,var(--paper));stroke:var(--accent);stroke-width:2;transition:fill .2s,stroke-width .2s}",
 ".hsi .organ.active .part,.hsi .organ:hover .part{fill:color-mix(in srgb,var(--accent) 65%,var(--paper));stroke-width:3}.hsi .organ:focus-visible .part{stroke:var(--ink);stroke-width:4}",
 ".hsi button,.odi button{cursor:pointer;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:var(--btn-radius,8px);padding:9px 11px;font:inherit;min-height:38px}",
 ".hsi button:focus-visible,.odi button:focus-visible,.odi select:focus-visible,.odi textarea:focus-visible,.odi input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
 ".hsi .tabs,.hsi .steps,.hsi .answers,.odi .actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}",
 ".hsi .tabs button,.hsi .steps button{flex:1 1 100px;font-size:.86rem}",
 ".hsi .tabs button[aria-pressed=true],.hsi .steps button[aria-current=step]{background:var(--accent);border-color:var(--accent);color:var(--paper)}",
 ".hsi .detail{min-height:154px}.hsi .step-detail{background:var(--soft);padding:12px;border-radius:var(--radius,12px);min-height:80px}",
 ".hsi .quiz{margin-top:22px;border-top:1px solid var(--rule);padding-top:16px}.hsi .answers button{flex:1 1 150px;text-align:left}",
 ".hsi .feedback{min-height:29px;font-weight:650}.hsi .next:disabled{opacity:.45}",
 ".odi .diagram svg text{font:600 15px var(--f-body,system-ui);fill:var(--ink)}.odi .diagram .box{fill:var(--paper);stroke:var(--rule);stroke-width:2}",
 ".odi .diagram .flow{fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:8 8;stroke-linecap:round}.odi .diagram .flow.limited{stroke:var(--bad)}",
 ".odi .controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:15px 0}",
 ".odi .controls label{display:flex;justify-content:space-between;gap:8px;font-weight:650;font-size:.88rem}",
 ".odi input[type=range]{accent-color:var(--accent);width:100%;margin-top:12px}",
 ".odi .bars{display:grid;grid-template-columns:1fr 1fr;gap:15px}.odi .bar-top{display:flex;justify-content:space-between;font-size:.9rem;font-weight:650}",
 ".odi .track{height:10px;margin:6px 0;background:var(--soft);border:1px solid var(--rule);border-radius:8px;overflow:hidden}",
 ".odi .fill{background:var(--accent);height:100%;transition:width .23s}.odi .fill.demand{background:var(--muted)}",
 ".odi .result{min-height:40px;font-weight:650}.odi .investigate{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}",
 ".odi select,.odi textarea{box-sizing:border-box;width:100%;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);font:inherit}",
 ".odi textarea{min-height:86px;resize:vertical}.odi .table-scroll{overflow-x:auto;max-width:100%}.odi table{border-collapse:collapse;width:100%;font-size:.84rem}",
 ".odi td,.odi th{padding:8px 5px;text-align:left;border-bottom:1px solid var(--rule)}.odi th{white-space:nowrap}",
 "@media(max-width:740px){.hsi .layout{grid-template-columns:1fr}.hsi .diagram{max-width:330px;margin:auto;width:100%}.odi .controls,.odi .investigate{grid-template-columns:1fr}}",
 "@media(max-width:450px){.odi .bars{grid-template-columns:1fr}}",
 "@media(prefers-reduced-motion:reduce){.hsi .organ .part,.odi .fill{transition:none}}"
].join("\n");
const body=[
 '<svg viewBox="0 0 430 530" role="img" aria-labelledby="body-title body-desc">',
 '<title id="body-title">Choose organs to explore body systems</title><desc id="body-desc">A simplified body silhouette with selectable skin, brain, lungs, heart, stomach, intestines, muscles and bones.</desc>',
 '<g class="organ" data-organ="integumentary" role="button" tabindex="0" aria-label="Skin, integumentary system">',
 '<ellipse class="body part" cx="215" cy="64" rx="53" ry="53"/><path class="body part" d="M164 137 Q132 141 112 178 L75 288 Q66 309 81 321 Q98 328 110 302 L146 229 L151 320 L162 443 L155 513 L200 513 L210 377 L222 377 L235 513 L279 513 L269 440 L281 319 L289 229 L323 302 Q338 327 353 320 Q369 309 355 284 L317 177 Q301 141 266 137 Z"/>',
 '</g>',
 '<g class="organ" data-organ="skeletal" role="button" tabindex="0" aria-label="Bones and joints, skeletal system">',
 '<rect class="part" x="112" y="192" width="15" height="75" rx="7" transform="rotate(20 119 230)"/><circle class="part" cx="105" cy="277" r="12"/>',
 '<rect class="part" x="183" y="423" width="15" height="78" rx="7" transform="rotate(5 190 460)"/><rect class="part" x="243" y="423" width="15" height="78" rx="7" transform="rotate(-5 250 460)"/>',
 '</g>',
 '<g class="organ" data-organ="muscular" role="button" tabindex="0" aria-label="Skeletal muscles, muscular system">',
 '<path class="part" d="M148 169 Q132 179 132 213 L145 241 Q161 206 167 176 Z"/><path class="part" d="M281 170 Q299 179 302 215 L288 241 Q274 201 265 177 Z"/>',
 '<path class="part" d="M166 365 Q158 391 170 431 L193 431 L203 365 Z"/><path class="part" d="M227 365 L237 431 L260 431 Q272 396 260 365 Z"/>',
 '</g>',
 '<g class="organ" data-organ="nervous" role="button" tabindex="0" aria-label="Brain and nerves, nervous system">',
 '<path class="part" d="M187 53 Q181 27 209 28 Q236 19 247 40 Q262 59 246 82 Q218 96 193 79 Z"/>',
 '<path d="M215 87 L215 320 M215 162 L189 188 M215 194 L245 216 M215 256 L191 282" fill="none" stroke="var(--accent)" stroke-width="4" stroke-dasharray="8 4"/></g>',
 '<g class="organ" data-organ="respiratory" role="button" tabindex="0" aria-label="Lungs, respiratory system">',
 '<path class="part" d="M202 168 Q163 142 153 195 Q143 232 166 258 Q187 269 202 250 Z"/><path class="part" d="M230 168 Q269 142 280 195 Q289 232 265 258 Q245 269 230 250 Z"/>',
 '<path d="M215 129 L215 171 L201 185 M215 171 L230 185" fill="none" stroke="var(--ink)" stroke-width="4"/></g>',
 '<g class="organ" data-organ="circulatory" role="button" tabindex="0" aria-label="Heart, circulatory system">',
 '<path class="part" d="M213 212 Q197 194 185 213 Q169 230 213 275 Q262 230 241 211 Q228 198 213 212 Z"/>',
 '</g>',
 '<g class="organ" data-organ="digestive" role="button" tabindex="0" aria-label="Stomach and intestines, digestive system">',
 '<path class="part" d="M226 284 Q264 267 273 303 Q280 326 249 332 Q225 330 226 284 Z"/>',
 '<rect class="part" x="174" y="340" width="87" height="83" rx="22"/>',
 '<path d="M195 355 Q243 346 244 370 Q245 392 193 384 Q187 397 205 401 Q248 416 243 405" fill="none" stroke="var(--ink)" stroke-width="4" opacity=".55"/></g>',
 '<text x="215" y="525" text-anchor="middle" font-size="12" fill="var(--muted)">Schematic — not to scale</text></svg>'
].join("");
function renderSystems(el){
 let chosen="respiratory",step=0,q=0,selected=null;
 el.innerHTML='<section class="hsi"><style>'+STYLE+'</style><h2>Human Systems Explorer</h2>'+
 '<p class="hint">Choose an organ, explore its role and trace how it works with other systems. Based on the Systems booklet.</p>'+
 '<div class="layout"><div class="diagram">'+body+'</div><div><div class="tabs" role="group" aria-label="Choose a body system"></div>'+
 '<div class="detail" aria-live="polite"></div><h3>Trace the pathway</h3><div class="steps" role="group" aria-label="Pathway stages"></div><div class="step-detail" aria-live="polite"></div></div></div>'+
 '<div class="quiz"><h3>Check the connections</h3><div class="question"></div><div class="answers"></div><p class="feedback" aria-live="polite"></p><button class="next" type="button" disabled>Next question</button></div>'+
 '<p class="hint">This diagram is simplified. Real systems include many more structures, and the shapes are not anatomically to scale.</p></section>';
 const get=k=>el.querySelector(k),keys=Object.keys(SYSTEMS);
 function draw(){
  const s=SYSTEMS[chosen];get(".tabs").innerHTML=keys.map(k=>'<button data-system="'+k+'" type="button" aria-pressed="'+(k===chosen)+'">'+SYSTEMS[k].name+'</button>').join("");
  get(".detail").innerHTML='<h3>'+esc(s.name)+' system</h3><p><b>Organs:</b> '+esc(s.organs)+'</p><p>'+esc(s.job)+'</p><p class="hint"><b>Connection:</b> '+esc(s.link)+'</p>';
  get(".steps").innerHTML=s.path.map((item,i)=>'<button type="button" data-step="'+i+'" aria-current="'+(step===i?'step':'false')+'">'+(i+1)+'. '+esc(item[0])+'</button>').join("");
  get(".step-detail").innerHTML='<b>'+esc(s.path[step][0])+'</b><p>'+esc(s.path[step][1])+'</p>';
  el.querySelectorAll("[data-organ]").forEach(g=>g.classList.toggle("active",g.dataset.organ===chosen));
 }
 function quiz(){
  const item=QUIZ[q];get(".question").innerHTML='<b>'+(q+1)+' / '+QUIZ.length+' · '+esc(item.q)+'</b>';
  get(".answers").innerHTML=item.a.map((v,i)=>'<button type="button" data-answer="'+i+'" '+(selected!==null?'disabled':'')+'>'+esc(v)+'</button>').join("");
  get(".feedback").textContent=selected===null?"":(selected===item.c?"Correct. ":"Not quite. ")+item.why;
  get(".next").disabled=selected===null;get(".next").textContent=q===QUIZ.length-1?"Start again":"Next question";
 }
 function choose(k){if(!SYSTEMS[k])return;chosen=k;step=0;draw();}
 el.addEventListener("click",e=>{
  const b=e.target.closest("[data-system],[data-organ],[data-step],[data-answer],.next");if(!b||!el.contains(b))return;
  if(b.dataset.system||b.dataset.organ)choose(b.dataset.system||b.dataset.organ);
  else if(b.dataset.step!==undefined){step=Number(b.dataset.step);draw();}
  else if(b.dataset.answer!==undefined&&selected===null){selected=Number(b.dataset.answer);quiz();}
  else if(b.classList.contains("next")&&selected!==null){q=(q+1)%QUIZ.length;selected=null;quiz();}
 });
 el.addEventListener("keydown",e=>{const a=e.target.closest("[data-organ]");if(a&&(e.key===" "||e.key==="Enter")){e.preventDefault();choose(a.dataset.organ);}});
 draw();quiz();
 el.systemsExplorer={select:choose,get current(){return chosen},get step(){return step}};
}
function oxygenModel(v){
 for(const k of ["breathing","circulation","activity"])if(!Number.isFinite(v[k])||v[k]<0||v[k]>100)throw Error("Values must be 0 to 100");
 const lung=Math.round(30+v.breathing*.7),pump=Math.round(30+v.circulation*.7),need=Math.round(30+v.activity*.65),delivered=Math.min(lung,pump);
 return {lung,pump,need,delivered,limit:lung<pump?"respiratory":pump<lung?"circulatory":"both",enough:delivered>=need};
}
function renderOxygen(el){
 let v={breathing:60,circulation:60,activity:30},trials=[];
 const controls=[["breathing","Breathing effectiveness"],["circulation","Circulation effectiveness"],["activity","Muscle activity"]];
 const diagram='<svg viewBox="0 0 750 192" role="img" aria-label="Simplified path from lungs to heart and blood to muscle cells.">'+
 '<defs><marker id="oxygen-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--accent)"/></marker></defs>'+
 '<path id="od-lung-flow" class="flow" d="M218 91H278" marker-end="url(#oxygen-arrow)"/><path id="od-pump-flow" class="flow" d="M458 91H515" marker-end="url(#oxygen-arrow)"/>'+
 '<rect class="box" x="10" y="28" width="208" height="124" rx="15"/><rect class="box" x="280" y="28" width="177" height="124" rx="15"/><rect class="box" x="518" y="28" width="223" height="124" rx="15"/>'+
 '<text x="114" y="53" text-anchor="middle">Lungs</text><text x="369" y="53" text-anchor="middle">Heart and blood</text><text x="629" y="53" text-anchor="middle">Muscle cells</text>'+
 '<text x="114" y="80" text-anchor="middle">Add oxygen</text><text x="369" y="80" text-anchor="middle">Carry oxygen</text><text x="629" y="80" text-anchor="middle">Use oxygen</text>'+
 '<text id="od-lung" x="114" y="121" text-anchor="middle">—</text><text id="od-pump" x="369" y="121" text-anchor="middle">—</text><text id="od-need" x="629" y="121" text-anchor="middle">—</text>'+
 '<text x="375" y="181" text-anchor="middle" font-size="12">Index values only · not a medical model</text></svg>';
 el.innerHTML='<section class="odi"><style>'+STYLE+'</style><h2>Oxygen Delivery Lab</h2>'+
 '<p class="hint">Change one condition at a time to model how the respiratory and circulatory systems work together to meet muscle-cell demand.</p>'+
 '<div class="diagram">'+diagram+'</div><div class="controls">'+controls.map(([key,label])=>'<div><label for="od-'+key+'">'+label+' <output id="od-'+key+'-value">'+v[key]+'</output></label><input id="od-'+key+'" type="range" data-control="'+key+'" min="0" max="100" step="10" value="'+v[key]+'"></div>').join("")+'</div>'+
 '<div class="bars"><div><div class="bar-top"><span>Oxygen delivered</span><output id="od-delivered">—</output></div><div class="track"><div id="od-supply" class="fill"></div></div></div>'+
 '<div><div class="bar-top"><span>Muscle need</span><output id="od-demand">—</output></div><div class="track"><div id="od-needbar" class="fill demand"></div></div></div></div>'+
 '<p class="result" id="od-result" role="status"></p><p class="hint">Teaching model: lungs supply oxygen, blood flow carries it, and the smaller capacity limits delivery. Activity changes the need. All values are illustrative indexes, not actual oxygen saturation, breathing rates or heart rates.</p>'+
 '<div class="investigate"><div><h3>Predict and test</h3><p class="hint">What happens if muscle activity rises but one delivery system stays less effective? Change only one slider at a time and record two trials.</p>'+
 '<div class="actions"><button id="od-record" type="button">Record trial</button><button id="od-reset" type="button">Reset controls</button></div></div>'+
 '<div><h3>Compare</h3><label for="od-predict">Which system is limiting delivery now?</label><select id="od-predict"><option value="">Make a prediction</option><option value="respiratory">Respiratory</option><option value="circulatory">Circulatory</option><option value="both">Both equally</option></select><p class="hint" id="od-pred-result" aria-live="polite"></p></div></div>'+
 '<div class="table-scroll"><table><thead><tr><th>Trial</th><th>Breathing</th><th>Flow</th><th>Activity</th><th>Delivered</th><th>Need</th><th>Limit</th></tr></thead><tbody id="od-trials"><tr><td colspan="7">No trials recorded.</td></tr></tbody></table></div>'+
 '<div class="investigate"><label>What evidence did the trials show?<textarea id="od-observe" placeholder="When I changed... the model showed..."></textarea></label>'+
 '<label>How do these systems work together?<textarea id="od-explain" placeholder="The lungs..., the blood..., and the muscle cells..."></textarea></label></div>'+
 '<div class="actions"><button id="od-download" type="button">Download investigation</button><button id="od-clear" type="button">Clear trials</button></div><p class="hint" id="od-message" role="status"></p></section>';
 const get=k=>el.querySelector(k),name=k=>k==="respiratory"?"respiratory system":k==="circulatory"?"circulatory system":"both systems";
 function draw(){
  const m=oxygenModel(v);
  controls.forEach(([key])=>{get("#od-"+key).value=v[key];get("#od-"+key+"-value").textContent=String(v[key]);});
  get("#od-lung").textContent=String(m.lung);get("#od-pump").textContent=String(m.pump);get("#od-need").textContent=String(m.need);
  get("#od-delivered").textContent=String(m.delivered);get("#od-demand").textContent=String(m.need);
  get("#od-supply").style.width=m.delivered+"%";get("#od-needbar").style.width=m.need+"%";
  get("#od-lung-flow").classList.toggle("limited",m.limit==="respiratory");
  get("#od-pump-flow").classList.toggle("limited",m.limit==="circulatory");
  get("#od-result").textContent=m.enough?"Model supply meets muscle demand. The current limit is the "+name(m.limit)+".":"Model supply is below muscle demand. The limiting factor is the "+name(m.limit)+".";
  const p=get("#od-predict").value;get("#od-pred-result").textContent=p?(p===m.limit?"Your prediction matches the model.":"The model's limiting factor is "+name(m.limit)+"."):"";
 }
 function showTrials(){
  get("#od-trials").innerHTML=trials.length?trials.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+t.breathing+'</td><td>'+t.circulation+'</td><td>'+t.activity+'</td><td>'+t.delivered+'</td><td>'+t.need+'</td><td>'+esc(name(t.limit))+'</td></tr>').join(""):'<tr><td colspan="7">No trials recorded.</td></tr>';
 }
 el.addEventListener("input",e=>{const key=e.target.dataset.control;if(Object.prototype.hasOwnProperty.call(v,key)){v[key]=Number(e.target.value);draw();}});
 get("#od-predict").addEventListener("change",draw);
 get("#od-record").onclick=()=>{trials.push(Object.assign({},v,oxygenModel(v)));if(trials.length>8)trials.shift();showTrials();get("#od-message").textContent="Trial recorded locally. Try a second condition.";};
 get("#od-reset").onclick=()=>{v={breathing:60,circulation:60,activity:30};draw();};
 get("#od-clear").onclick=()=>{trials=[];showTrials();get("#od-message").textContent="Trial table cleared.";};
 get("#od-download").onclick=()=>{
  const text=["Oxygen Delivery Lab — Grade 8 Science","Recorded trials (illustrative indexes):",trials.length?trials.map((t,i)=>(i+1)+". Breathing "+t.breathing+", flow "+t.circulation+", activity "+t.activity+"; delivered "+t.delivered+", need "+t.need+"; limit: "+name(t.limit)).join("\n"):"No trials recorded.","What evidence did the trials show?",get("#od-observe").value.trim(),"How do these systems work together?",get("#od-explain").value.trim(),"Model limitation: simplified comparison, not actual physiology."].join("\n\n");
  const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="oxygen-delivery-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);get("#od-message").textContent="Investigation downloaded.";
 };
 draw();showTrials();
 el.oxygenStudio={get values(){return Object.assign({},v)},get trials(){return trials.slice()},set(next){v=Object.assign({},v,next);draw();}};
}
H.systemInteractions={systems:SYSTEMS,questions:QUIZ,oxygenModel};
function extend(key,render,first){
 const previous=H.lessonTools&&H.lessonTools[key];H.lessonTools=H.lessonTools||{};
 H.lessonTools[key]=function(root){
  const fresh=document.createElement("div"),old=previous?document.createElement("div"):null;
  if(first){root.appendChild(fresh);render(fresh);if(old){root.appendChild(old);previous(old);}}
  else{if(old){root.appendChild(old);previous(old);}root.appendChild(fresh);render(fresh);}
 };
}
extend("cells/systems",renderSystems,true);
extend("cells/circulatory",renderOxygen,false);
H.systemExplorerData={systems:SYSTEMS,quiz:QUIZ};
})();