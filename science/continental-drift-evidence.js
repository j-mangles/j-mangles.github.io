/* Grade 8 Earth Science · Wegener's Continental Drift Evidence (booklet Topic 2).
   Conceptual continent reconstruction, not a geographically accurate plate map. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const EVIDENCE=[
 {id:"fossil",label:"Fossil evidence",clue:"Fossils of Mesosaurus, a freshwater reptile, are found in rocks of similar age in South America and Africa.",
  reasoning:"Mesosaurus did not have an obvious way to cross a wide ocean. A former land connection helps explain the matching fossils.",
  caveat:"A fossil match alone cannot show exactly how continents moved."},
 {id:"rocks",label:"Rock and mountain evidence",clue:"Certain rock layers and mountain belts have matching age and structure on continents now separated by an ocean.",
  reasoning:"Similar rocks and mountain belts can line up when continents are reconstructed, suggesting they once formed a continuous region.",
  caveat:"Matching rock types need other evidence to rule out coincidence."},
 {id:"glacial",label:"Glacial evidence",clue:"Ancient glacial scratches and deposits appear in regions with very different climates today.",
  reasoning:"The directions of glacial movement make more sense when southern continents are reconstructed near one another.",
  caveat:"Past climate also changed, so geological context matters."},
 {id:"shape",label:"Continent-shape evidence",clue:"The continental margins of South America and Africa appear to fit together more closely when their submerged edges are compared.",
  reasoning:"A matching outline suggests a possible former connection, but shape alone does not prove drift.",
  caveat:"Coastlines change through erosion, deposition and sea level; the edges of continental shelves are more useful than modern coastlines."}
];
const ORDER=["fossil","rocks","glacial","shape"];
function evaluate(answers){
 const results=EVIDENCE.map(e=>({id:e.id,correct:answers[e.id]===e.id,answered:typeof answers[e.id]==="string"&&answers[e.id].length>0}));
 return {correct:results.filter(x=>x.correct).length,answered:results.filter(x=>x.answered).length,total:results.length,results};
}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const css=[
".wed{color:var(--ink);line-height:1.5;min-width:0}.wed *{box-sizing:border-box}.wed h2{font:700 clamp(24px,3vw,31px) var(--f-title,system-ui);margin:0 0 7px}.wed h3{font-size:1.06rem;margin:0 0 8px}",
".wed p{margin:7px 0 13px}.wed .note{font-size:.87rem;color:var(--muted);max-width:74ch}",
".wed .layout{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:start}",
".wed .diagram{border:1px solid var(--rule);background:var(--soft);border-radius:var(--radius,12px);padding:10px}.wed svg{width:100%;display:block;height:auto}",
".wed svg text{font:600 14px var(--f-body,system-ui);fill:var(--ink)}.wed .controls label{display:flex;justify-content:space-between;gap:10px;font-weight:700;font-size:.88rem}",
".wed input[type=range]{width:100%;accent-color:var(--accent);margin:12px 0}",
".wed button,.wed select{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:9px 12px;min-height:39px;cursor:pointer}",
".wed select{display:block;width:100%;margin:7px 0}.wed button:focus-visible,.wed select:focus-visible,.wed input:focus-visible,.wed textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
".wed .readout{border-left:3px solid var(--accent);background:var(--soft);padding:13px;border-radius:8px;min-height:125px}",
".wed .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:17px 0}.wed .card{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:13px}",
".wed .card h3{margin:0 0 7px}.wed .card p{font-size:.89rem}.wed .card label{font-size:.84rem;font-weight:700}",
".wed .feedback{font-weight:650;min-height:18px}.wed .actions{display:flex;flex-wrap:wrap;gap:8px;margin:13px 0}",
".wed .reasoning{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:17px 0}",
".wed textarea{display:block;width:100%;min-height:91px;box-sizing:border-box;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:8px;font:inherit;resize:vertical}",
"@media(max-width:760px){.wed .layout,.wed .cards,.wed .reasoning{grid-template-columns:1fr}}"
].join("\n");
function reconstruction(separation){
 if(!Number.isFinite(separation)||separation<0||separation>100)throw Error("Invalid reconstruction slider");
 const gap=18+separation*1.9,left=300-gap/2,right=300+gap/2;
 // Stylized continental regions, NOT accurate map silhouettes.
 const south='<g transform="translate('+(left-136).toFixed(1)+' 0)">'+
  '<path d="M38 71Q91 35 144 68L156 105L136 131L137 167L108 201L88 268L64 246L45 201L31 146Z" '+
  'fill="color-mix(in srgb,var(--accent) 40%,var(--paper))" stroke="var(--accent)" stroke-width="3"/>'+
  '<circle cx="130" cy="153" r="8" fill="var(--ink)"/>'+
  '<text x="81" y="311" text-anchor="middle">South America</text></g>';
 const africa='<g transform="translate('+(right-22).toFixed(1)+' 0)">'+
  '<path d="M20 87Q49 42 96 65L150 105L140 153L106 228L84 271L60 221L29 198L12 138Z" '+
  'fill="color-mix(in srgb,var(--accent) 22%,var(--paper))" stroke="var(--accent)" stroke-width="3"/>'+
  '<circle cx="33" cy="153" r="8" fill="var(--ink)"/>'+
  '<text x="84" y="311" text-anchor="middle">Africa</text></g>';
 return '<svg viewBox="0 0 620 345" role="img" aria-label="Conceptual reconstruction of two continents moving farther apart; fossil dots appear near opposite edges. Not a geographic map.">'+
 '<text x="310" y="30" text-anchor="middle">Reconstruction: '+(separation===0?"Joined":separation===100?"Apart":"Partly apart")+'</text>'+
 south+africa+
 '<text x="310" y="336" text-anchor="middle" font-size="11">Illustrative outlines and fossil markers · not to geographic scale</text></svg>';
}
function render(el){
 let separation=100,answers={},checked=false;
 const $=q=>el.querySelector(q);
 el.innerHTML='<section class="wed"><style>'+css+'</style><h2>Continental Drift Evidence Detective</h2>'+
 '<p class="note">Wegener used several kinds of evidence to argue that the continents were once joined. Reconstruct the pattern, classify the clues, and make a scientific claim.</p>'+
 '<div class="layout"><div class="diagram" id="wed-map"></div><div class="controls">'+
 '<h3>Reconstruct the continents</h3><label for="wed-distance">Move the continents <output id="wed-separation">Apart</output></label>'+
 '<input type="range" id="wed-distance" min="0" max="100" step="10" value="100">'+
 '<div class="readout"><b>What does this show?</b><p id="wed-reading" aria-live="polite"></p></div>'+
 '<p class="note">The shapes and positions are intentionally simplified. Compare evidence alongside the actual maps in the Earth Science booklet.</p></div></div>'+
 '<h3>Classify four lines of evidence</h3><p class="note">Match the observation to the kind of evidence it represents. Check your selections before writing your conclusion.</p>'+
 '<div class="cards" id="wed-cards"></div>'+
 '<div class="actions"><button type="button" id="wed-check">Check evidence</button><button type="button" id="wed-reset">Try again</button></div>'+
 '<p class="feedback" id="wed-total" role="status"></p>'+
 '<div class="reasoning"><label><b>Claim:</b> What do the clues suggest about the continents?'+
 '<textarea id="wed-claim" placeholder="The continents were once..."></textarea></label>'+
 '<label><b>Reasoning:</b> Choose two different observations and explain why they support your claim.'+
 '<textarea id="wed-reason" placeholder="Fossils show... Rocks show..."></textarea></label></div>'+
 '<label for="wed-limitation"><b>Model limitation:</b> What could not be concluded from this evidence alone?</label>'+
 '<textarea id="wed-limitation" placeholder="The matching clues did not yet explain..."></textarea>'+
 '<div class="actions"><button type="button" id="wed-download">Download evidence investigation</button></div>'+
 '<p class="note" id="wed-message" role="status"></p>'+
 '<p class="note">Continental drift evidence was strengthened by later seafloor spreading and plate tectonics research. A single clue is rarely enough for a strong scientific conclusion.</p></section>';
 function paintMap(){
  $("#wed-map").innerHTML=reconstruction(separation);
  $("#wed-separation").textContent=separation===0?"Joined":separation===100?"Apart":"Moving";
  $("#wed-reading").textContent=separation===0?
   "Imagine the continents closer together. The Mesosaurus fossil evidence becomes easier to explain with a former land connection.":
   separation===100?
   "The modern Atlantic separates fossil sites now found on different continents. How might the fossils have ended up on both sides?":
   "Compare this arrangement with the others. A map alone is a clue; matching fossils, rocks and glacial traces strengthen the idea.";
 }
 function paintCards(){
  $("#wed-cards").innerHTML=EVIDENCE.map((item,i)=>'<article class="card"><h3>Clue '+(i+1)+'</h3><p>'+esc(item.clue)+'</p>'+
   '<label for="wed-answer-'+item.id+'">Type of evidence</label>'+
   '<select id="wed-answer-'+item.id+'" data-evidence="'+item.id+'"><option value="">Choose a type</option>'+
   EVIDENCE.map(o=>'<option value="'+o.id+'" '+(answers[item.id]===o.id?'selected':'')+'>'+esc(o.label)+'</option>').join("")+'</select>'+
   '<p class="feedback" id="wed-feedback-'+item.id+'" aria-live="polite"></p></article>').join("");
  if(checked)showCheck();
 }
 function showCheck(){
  const score=evaluate(answers);
  $("#wed-total").textContent=score.answered+" of 4 matched · "+score.correct+" correct.";
  EVIDENCE.forEach(e=>{
   const result=score.results.find(x=>x.id===e.id);
   $("#wed-feedback-"+e.id).textContent=!result.answered?"Choose an answer before checking.":
    result.correct?"Correct. "+e.reasoning:"Review the clue. "+e.reasoning;
  });
 }
 el.addEventListener("input",ev=>{
  if(ev.target.id==="wed-distance"){separation=Number(ev.target.value);paintMap();}
 });
 el.addEventListener("change",ev=>{
  const id=ev.target.dataset.evidence;if(id){answers[id]=ev.target.value;checked=false;$("#wed-total").textContent="Selections updated. Check your evidence again.";
   EVIDENCE.forEach(x=>{$("#wed-feedback-"+x.id).textContent="";});}
 });
 $("#wed-check").onclick=()=>{checked=true;showCheck();};
 $("#wed-reset").onclick=()=>{answers={};checked=false;paintCards();$("#wed-total").textContent="Select the best evidence types to begin.";};
 $("#wed-download").onclick=()=>{
  const score=evaluate(answers);
  const lines=["Continental Drift Evidence Detective — Science 8","Evidence matches:",...EVIDENCE.map((e,i)=>(i+1)+". "+e.clue+"\n   Chosen: "+(EVIDENCE.find(x=>x.id===answers[e.id])?.label||"Not chosen")+
   "\n   "+(answers[e.id]===e.id?"Correct match":"Needs review")+"\n   Evidence limitation: "+e.caveat),
   "Evidence score: "+score.correct+" out of 4","Claim:",$("#wed-claim").value.trim(),"Reasoning:",$("#wed-reason").value.trim(),"Model limitation:",$("#wed-limitation").value.trim()];
  const url=URL.createObjectURL(new Blob([lines.join("\n\n")],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");
  a.href=url;a.download="continental-drift-evidence.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#wed-message").textContent="Evidence investigation downloaded.";
 };
 paintMap();paintCards();$("#wed-total").textContent="Select the best evidence types to begin.";
 el.evidenceLab={get separation(){return separation},get answers(){return {...answers}},get score(){return evaluate(answers)},setSeparation(value){separation=value;paintMap();}};
}
H.driftEvidenceCore={evidence:EVIDENCE,evaluate,reconstruction};
H.lessonTools=H.lessonTools||{};const previous=H.lessonTools["earth/e5-drift"];
H.lessonTools["earth/e5-drift"]=function(root){const first=document.createElement("div");root.appendChild(first);render(first);if(previous){const prior=document.createElement("div");root.appendChild(prior);previous(prior);}};
})();