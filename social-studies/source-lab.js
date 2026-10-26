/* Social Studies 8 · Site 14 Evidence Desk.
 * Based on Lesson 1 'Artifact Detective: Site 14' STUDENT sheet.
 * Site 14 / Kestrel Valley is fictional. No teacher guide or key is used.
 * Illustrations are schematic icons, never archaeological photos.
 */
(function(){
"use strict";
const CARDS=[
 {id:"vessel",label:"1 · Painted Vessel",type:"Pottery",facts:"Several similar painted clay vessels were discovered together near a hearth. One wide bowl has a repeating red spiral motif.",prompt:"What does the object's location tell us directly? What does the spiral mean—or can we know?"},
 {id:"pouch",label:"2 · Tool Pouch",type:"Tools",facts:"A small leather pouch contained a sharp flint blade, a bone needle and a smooth stone disk with a hole through its centre.",prompt:"Which kinds of practical skills might these objects suggest? Which uses are still uncertain?"},
 {id:"burial",label:"3 · Burial",type:"Burial",facts:"A person was deliberately buried on one side with a painted vessel, shell beads and a trace left by a wooden staff.",prompt:"What might the deliberate arrangement suggest? What belief could you not confidently prove from these objects alone?"},
 {id:"figure",label:"4 · Carved Figure",type:"Carving",facts:"A small, roughly human-shaped carving with emphasized hips was found wrapped in cloth underneath a house floor.",prompt:"What do careful placement and wrapping suggest about the object? Why is its exact purpose uncertain?"},
 {id:"settlement",label:"5 · Settlement",type:"Foundations",facts:"Roughly twenty similar round house foundations surround one larger rectangular foundation with finer pottery and tools.",prompt:"What can you infer about where people lived? What evidence would you need to claim there was a ruler?"}
];
const LEVELS=[
 {id:"strong",name:"Well supported",meaning:"Several clear observations support this conclusion; alternatives are limited."},
 {id:"possible",name:"Plausible, but uncertain",meaning:"The evidence makes it possible, but other explanations still fit."},
 {id:"speculative",name:"Speculative",meaning:"A guess or big claim that the available observations cannot establish."}
];
function blank(){return {observation:"",inference:"",limits:"",followUp:"",level:"possible"};}
function newEntries(){return Object.fromEntries(CARDS.map(x=>[x.id,blank()]));}
const safe=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;',"'" :"&#39;"}[c]));
function artifactSVG(id){
 if(!CARDS.some(x=>x.id===id))throw Error("Unknown Site 14 artifact");
 let body="";
 if(id==="vessel")body='<path d="M250 75 L469 75 Q455 210 412 239 Q357 263 305 239 Q265 198 250 75Z" fill="#B87858" stroke="#664A3C" stroke-width="5"/>'+
  '<ellipse cx="359" cy="75" rx="109" ry="23" fill="#E8B28A" stroke="#664A3C" stroke-width="5"/>'+
  '<path d="M322 135 Q405 91 400 154 Q380 209 335 178 Q315 160 339 148 Q356 142 360 159" fill="none" stroke="#813A34" stroke-width="9" stroke-linecap="round"/>';
 if(id==="pouch")body='<path d="M261 111 Q322 84 434 112 L470 241 Q368 284 247 243Z" fill="#B9875F" stroke="#76543C" stroke-width="5"/>'+
  '<path d="M261 114 Q352 145 435 113" fill="none" stroke="#76543C" stroke-width="5"/>'+
  '<path d="M305 80 L324 197 M324 197 L331 207 L313 209Z" fill="#B1ABB0" stroke="#5C5862" stroke-width="4"/>'+
  '<path d="M381 81 L381 194 M379 96 L386 96 M375 89 L387 89" stroke="#DED6BA" stroke-width="6"/>'+
  '<circle cx="428" cy="212" r="28" fill="#BFC2AE" stroke="#6D745D" stroke-width="5"/><circle cx="428" cy="212" r="10" fill="#EFE7D1"/>';
 if(id==="burial")body='<ellipse cx="360" cy="180" rx="188" ry="91" fill="#DBC7AC" stroke="#AA9277" stroke-width="4"/>'+
  '<circle cx="315" cy="146" r="26" fill="none" stroke="#896E61" stroke-width="6"/>'+
  '<path d="M335 158 Q365 173 377 204 Q398 216 421 198 M360 185 L347 218 M362 192 L386 228" stroke="#896E61" fill="none" stroke-width="8" stroke-linecap="round"/>'+
  '<ellipse cx="245" cy="202" rx="26" ry="15" fill="#B87858"/><path d="M231 199 Q245 182 263 203" stroke="#713E3D" fill="none" stroke-width="4"/>'+
  '<circle cx="431" cy="139" r="9" fill="#EFE7D9"/><circle cx="449" cy="150" r="9" fill="#EFE7D9"/><circle cx="463" cy="162" r="9" fill="#EFE7D9"/>';
 if(id==="figure")body='<path d="M240 235 L468 235 L468 106 L240 106Z" fill="#E2D0B4" stroke="#947C65" stroke-width="4"/>'+
  '<path d="M265 124 L440 222 M440 122 L265 220" stroke="#B9A18A" stroke-width="14" opacity=".6"/>'+
  '<circle cx="353" cy="131" r="25" fill="#97796A"/>'+
  '<path d="M338 156 Q302 198 298 228 L411 228 Q399 187 368 156Z" fill="#9E7B69" stroke="#6D5348" stroke-width="4"/>'+
  '<path d="M321 184 L279 221 M390 184 L436 221" stroke="#7C5B50" stroke-width="14"/>';
 if(id==="settlement"){
  for(let i=0;i<20;i++){
   const ang=i/20*Math.PI*2,rx=155,ry=95,x=360+Math.cos(ang)*rx,y=175+Math.sin(ang)*ry;
   body+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="19" fill="#D3B890" stroke="#8D7659" stroke-width="4"/>';
  }
  body+='<rect x="312" y="138" width="96" height="73" rx="5" fill="#C28D68" stroke="#795A45" stroke-width="5"/>';
 }
 return '<svg viewBox="0 0 720 324" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic illustration of the fictional '+safe(CARDS.find(x=>x.id===id).type)+' evidence at Site 14; not a photograph or excavation record." style="display:block;width:100%;height:auto">'+
 '<rect width="720" height="324" fill="#F3E9D9" rx="13"/>'+
 '<path d="M0 45 H720 M0 142 H720 M0 241 H720 M75 0 V324 M241 0 V324 M480 0 V324 M644 0 V324" stroke="#DFD0BC" stroke-width="1" stroke-dasharray="6 10"/>'+
 body+'<text x="20" y="305" font-size="13" fill="#655A4A">Schematic only · fictional Site 14</text></svg>';
}
function exportNotes(records,conclusion){
 return "SOCIAL STUDIES 8 · ARTIFACT DETECTIVE · SITE 14\nFICTIONAL PRACTICE SITE\n\n"+
 CARDS.map(c=>{
  const r=records[c.id];
  return c.label+"\nEvidence: "+c.facts+"\nMy observation: "+(r.observation.trim()||"[not filled in]")+
   "\nMy inference + reasoning: "+(r.inference.trim()||"[not filled in]")+
   "\nWhat is uncertain: "+(r.limits.trim()||"[not filled in]")+
   "\nConfidence: "+LEVELS.find(x=>x.id===r.level).name+
   "\nWhat evidence would help next: "+(r.followUp.trim()||"[not filled in]");
 }).join("\n\n")+
 "\n\nACROSS ALL FIVE CLUES\n"+(conclusion.trim()||"[not filled in]");
}
function mount(doc){
 const $=s=>doc.querySelector(s),all=s=>[...doc.querySelectorAll(s)];
 let chosen=CARDS[0].id,records=newEntries(),conclusion="";
 const buttons=$("#artifact-list");
 buttons.innerHTML=CARDS.map((c,i)=>'<button data-artifact="'+c.id+'" type="button">'+c.label+'</button>').join("");
 $("#confidence").innerHTML=LEVELS.map(x=>'<option value="'+x.id+'">'+x.name+'</option>').join("");
 function save(){
  const r=records[chosen];
  r.observation=$("#observation").value;
  r.inference=$("#inference").value;
  r.limits=$("#limits").value;
  r.followUp=$("#next-clue").value;
  r.level=$("#confidence").value;
  conclusion=$("#synthesis").value;
 }
 function show(){
  const c=CARDS.find(x=>x.id===chosen),r=records[chosen];
  all("[data-artifact]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.artifact===chosen)));
  $("#artifact-name").textContent=c.label;
  $("#artifact-type").textContent="Recovered evidence · "+c.type;
  $("#artifact-art").innerHTML=artifactSVG(chosen);
  $("#artifact-facts").textContent=c.facts;
  $("#artifact-question").textContent=c.prompt;
  $("#observation").value=r.observation;$("#inference").value=r.inference;
  $("#limits").value=r.limits;$("#next-clue").value=r.followUp;$("#confidence").value=r.level;
  $("#confidence-help").textContent=LEVELS.find(x=>x.id===r.level).meaning;
  const ready=CARDS.filter(c=>records[c.id].observation.trim()&&records[c.id].inference.trim()).length;
  $("#progress").textContent=ready+" of 5 pieces have an observation and supported inference.";
  $("#copy-status").textContent="";
 }
 all("[data-artifact]").forEach(b=>b.onclick=()=>{save();chosen=b.dataset.artifact;show();});
 ["observation","inference","limits","next-clue","confidence","synthesis"].forEach(id=>{
  const t=$("#"+id);t.addEventListener(id==="confidence"?"change":"input",()=>{
   save();if(id==="confidence")$("#confidence-help").textContent=LEVELS.find(x=>x.id===t.value).meaning;
   if(id==="observation"||id==="inference"){
    const ready=CARDS.filter(c=>records[c.id].observation.trim()&&records[c.id].inference.trim()).length;
    $("#progress").textContent=ready+" of 5 pieces have an observation and supported inference.";
   }
  });
 });
 $("#copy-analysis").onclick=()=>{
  save();
  const ready=CARDS.filter(c=>records[c.id].observation.trim()&&records[c.id].inference.trim()).length;
  if(!ready){$("#copy-status").textContent="Write at least one observation and inference before copying.";return;}
  const text=exportNotes(records,conclusion),status=$("#copy-status");
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>status.textContent="Copied. Paste into your class document.").catch(()=>status.textContent="Clipboard blocked; select and copy your writing manually.");
  else status.textContent="Clipboard blocked; select and copy your writing manually.";
 };
 $("#synthesis").value=conclusion;
 show();
}
window.ArtifactEvidenceCore={CARDS,LEVELS,newEntries,artifactSVG,exportNotes,mount};
})();
