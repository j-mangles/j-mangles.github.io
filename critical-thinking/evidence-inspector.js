/* Evidence Inspector: original practice scenarios for Think Lab Lesson 4.
   Source credibility is a judgement, not a score assigned by software. */
(function installEvidenceInspector(){
"use strict";
const H=window.HUB;if(!H)return;
const cases=[
 {name:"Lunch survey",claim:"Most students want a new cafeteria menu.",
  evidence:"A student-run online poll reports that 84% of 50 respondents prefer the proposed menu.",
  reveal:"The poll link was shared mainly in a food club's group chat. Students outside that club may not have had the same chance to answer.",
  question:"Does this evidence show what the whole school thinks, or only something about people who responded?"},
 {name:"Attendance change",claim:"An assembly caused more students to miss afternoon classes.",
  evidence:"The school office's verified log shows that afternoon attendance was 8% lower than usual on assembly day.",
  reveal:"Two bus routes were also cancelled that afternoon. The log records who attended, but not each student's reason for being absent.",
  question:"What does a trustworthy record establish here, and what cause does it NOT establish?"},
 {name:"Study claim",claim:"A study app helps students remember vocabulary.",
  evidence:"A company website quotes one student saying the app helped them remember twice as many new words.",
  reveal:"Two independent classes also tried the app and used the same vocabulary quiz before and after. The results differed between classes; no comparison group was used.",
  question:"Does additional evidence make this stronger? What uncertainty remains about cause and effect?"}
];
const rung=[
 "1 · Rumour or anecdote",
 "2 · Opinion or one subjective review",
 "3 · Reported statistic, source unclear",
 "4 · Verified record or expert measurement",
 "5 · Several independent checks agreeing"
];
function inspector(el){
 let chosen=0, drafts=Object.create(null);
 el.innerHTML='<section class="ei">'+
  '<style>'+
  '.ei{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);padding:18px}'+
  '.ei .ei-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}'+
  '.ei .ei-panel{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius);padding:14px;margin:10px 0}'+
  '.ei label{display:block;font-weight:650;margin:13px 0 5px}.ei textarea,.ei select{color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius);font:inherit;padding:9px;width:100%;box-sizing:border-box}'+
  '.ei textarea{min-height:98px;resize:vertical}.ei .ei-controls{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}'+
  '.ei button:focus-visible,.ei textarea:focus-visible,.ei select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
  '.ei .ei-levels{list-style:none;margin:8px 0;padding:0;display:grid;gap:5px}'+
  '.ei .ei-levels li{padding:6px 9px;border-left:3px solid var(--rule);font-size:13px}'+
  '.ei .ei-levels li.chosen{border-color:var(--accent);font-weight:700;background:var(--accent-soft)}'+
  '.ei .ei-reveal{border-left:4px solid var(--accent);padding:12px;margin-top:10px;background:var(--accent-soft)}'+
  '@media(max-width:680px){.ei .ei-two{grid-template-columns:1fr}}'+
  '</style>'+
  '<div class="eyebrow">Think Lab · Evidence Ladder</div><h2 style="margin:6px 0">Evidence Inspector</h2>'+
  '<p class="note">Use the five-rung ladder to judge how well a claim is supported—not whether you personally agree. Make an initial judgement, uncover another detail, then reconsider.</p>'+
  '<label for="ei-case">Choose a practice case</label><select id="ei-case"></select>'+
  '<div class="ei-two"><div><div class="ei-panel"><div class="eyebrow">The claim</div><p id="ei-claim"></p><div class="eyebrow">Evidence currently available</div><p id="ei-evidence"></p></div>'+
  '<ol class="ei-levels" id="ei-ladder" aria-label="Evidence ladder"></ol></div>'+
  '<div><label for="ei-first">My initial evidence rung</label><select id="ei-first"></select>'+
  '<label for="ei-reason">Why? Refer to the source, method and limitations.</label><textarea id="ei-reason" placeholder="I chose this rung because…"></textarea>'+
  '<div class="ei-controls"><button type="button" class="btn" id="ei-new">Reveal new information</button></div>'+
  '<div class="ei-reveal" id="ei-reveal" hidden><b>New information</b><p id="ei-detail"></p><p id="ei-question" class="note"></p></div>'+
  '<div id="ei-revision" hidden><label for="ei-second">My revised rung</label><select id="ei-second"></select>'+
  '<label for="ei-why">What changed in your thinking? What do you still need to verify?</label><textarea id="ei-why" placeholder="I moved the claim because… / I kept it here because…"></textarea></div>'+
  '</div></div>'+
  '<div class="ei-controls"><button type="button" class="btn" id="ei-download">Download reasoning</button><button type="button" class="btn ghost" id="ei-copy">Copy reasoning</button><button type="button" class="btn ghost" id="ei-reset">Reset this case</button></div>'+
  '<p class="note" role="status" aria-live="polite" id="ei-status">Responses stay only in this open page. Nothing is graded or submitted. Save your work before closing.</p>'+
  '<p class="note">A lower rung does not prove a claim false. A higher rung does not guarantee it is true. Ask whether the evidence supports the specific conclusion.</p></section>';
 const $=q=>el.querySelector(q);
 const opts=rung.map((s,i)=>'<option value="'+(i+1)+'">'+s+'</option>').join("");
 $("#ei-case").innerHTML=cases.map((x,i)=>'<option value="'+i+'">'+x.name+'</option>').join("");
 $("#ei-first").innerHTML='<option value="">Select a rung</option>'+opts;
 $("#ei-second").innerHTML='<option value="">Select a rung</option>'+opts;
 function current(){return {first:$("#ei-first").value,reason:$("#ei-reason").value,shown:!$("#ei-reveal").hidden,second:$("#ei-second").value,why:$("#ei-why").value};}
 function save(){drafts[chosen]=current();}
 function ladder(){
  const selected=$("#ei-reveal").hidden?$("#ei-first").value:$("#ei-second").value||$("#ei-first").value;
  $("#ei-ladder").innerHTML=rung.map((s,i)=>'<li'+(selected===String(i+1)?' class="chosen"':'')+'>'+s+'</li>').join("");
 }
 function display(){
  const a=cases[chosen],d=drafts[chosen]||{};
  $("#ei-case").value=String(chosen);
  $("#ei-claim").textContent=a.claim;$("#ei-evidence").textContent=a.evidence;
  $("#ei-detail").textContent=a.reveal;$("#ei-question").textContent=a.question;
  $("#ei-first").value=d.first||"";$("#ei-reason").value=d.reason||"";
  $("#ei-reveal").hidden=!d.shown;$("#ei-revision").hidden=!d.shown;
  $("#ei-second").value=d.second||"";$("#ei-why").value=d.why||"";
  $("#ei-new").textContent=d.shown?"New information shown":"Reveal new information";
  $("#ei-new").disabled=!!d.shown;
  ladder();
 }
 $("#ei-case").onchange=()=>{save();chosen=Number($("#ei-case").value);display();$("#ei-status").textContent="Case switched. Other drafts remain while this page is open.";};
 $("#ei-first").onchange=ladder;$("#ei-second").onchange=ladder;
 $("#ei-new").onclick=()=>{$("#ei-reveal").hidden=false;$("#ei-revision").hidden=false;$("#ei-new").disabled=true;$("#ei-new").textContent="New information shown";ladder();};
 $("#ei-reset").onclick=()=>{if(!window.confirm("Clear your work for this case?"))return;delete drafts[chosen];display();$("#ei-status").textContent="This case was reset.";};
 function report(){
  const a=cases[chosen],v=current();
  return ["Evidence Inspector · "+a.name,"Claim: "+a.claim,"Initial evidence: "+a.evidence,
   "Initial rung: "+(v.first||"not selected"),"Initial reasoning:\n"+v.reason,
   v.shown?"New information: "+a.reveal:"New information not yet revealed",
   "Revised rung: "+(v.second||"not selected"),"Revision and remaining questions:\n"+v.why,
   "A rung is a judgement of evidence strength, not an automatic truth rating."].join("\n\n")+"\n";
 }
 $("#ei-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){$("#ei-status").textContent="Copy isn't available here; use Download.";return;}
  navigator.clipboard.writeText(report()).then(()=>{$("#ei-status").textContent="Reasoning copied. Paste it into your own document.";})
   .catch(()=>{$("#ei-status").textContent="Copy failed; try Download.";});
 };
 $("#ei-download").onclick=()=>{
  const blob=new Blob([report()],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="evidence-inspector.txt";
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#ei-status").textContent="Reasoning downloaded. Submit only through a teacher-approved system.";
 };
 display();
}
H.lessonTools=Object.assign(H.lessonTools||{},{"lab/l4":inspector});
})();