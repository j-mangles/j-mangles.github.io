/* Computer Class · a local-first assignment workbook for five Grade 7/8 subjects.
   No accounts, tracking requests or remote submission. Drafts live in the browser. */
(function(){
"use strict";
const config=window.ComputerClassData,root=document.getElementById("cc-root");
if(!config||!root)return;
const ACT=config.activities,subjectLabels={ss:"Social Studies",sci:"Science",ela:"ELA",math:"Math 7",ct:"Critical Thinking"};
const STORAGE="eess-computer-class-v1:",draftCache={};
let current=null,answers={},checked={},name="",storageAvailable=true;
const escape=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function readDraft(id){
 try{
  const raw=localStorage.getItem(STORAGE+id);
  if(!raw)return{};
  const saved=JSON.parse(raw);
  return saved&&saved.version===config.version&&saved.answers&&typeof saved.answers==="object"&&!Array.isArray(saved.answers)?saved.answers:{};
 }catch(e){storageAvailable=false;return{};}
}
function saveDraft(){
 if(!current)return;
 draftCache[current.id]=answers;
 try{localStorage.setItem(STORAGE+current.id,JSON.stringify({version:config.version,answers}));storageAvailable=true;}
 catch(e){storageAvailable=false;}
 const el=document.getElementById("cc-save-state");
 if(el)el.textContent=storageAvailable?"Draft saved on this device":"Autosave unavailable; download your work to keep a copy.";
}
function allQuestions(activity){return activity.sections.flatMap(section=>section.questions);}
function words(s){return String(s||"").trim().split(/\s+/).filter(Boolean).length;}
function answered(q,value){
 if(q.type==="text")return words(value)>=(q.minWords||1);
 if(q.type==="lab")return Array.isArray(value)&&new Set(value.map(x=>JSON.stringify(x))).size>=(q.minTrials||1);
 if(q.type==="choice")return /^[0-9]+$/.test(String(value??""))&&Number(value)<q.options.length;
 if(q.type==="number")return String(value??"").trim()!==""&&Number.isFinite(Number(value));
 if(q.type==="order")return Array.isArray(value)&&value.length===q.items.length&&value.every(x=>/^[0-9]+$/.test(String(x??"")))&&new Set(value.map(String)).size===q.items.length;
 return false;
}
function grade(q,value){
 if(!answered(q,value))return null;
 if(q.type==="choice")return Number(value)===q.correct;
 if(q.type==="number")return Math.abs(Number(value)-q.answer)<=(q.tolerance??.0001);
 if(q.type==="order")return q.correct.every((x,i)=>Number(value[i])===x);
 return null;
}
function progress(activity,state){
 const qs=allQuestions(activity),complete=qs.filter(q=>answered(q,state[q.id])).length,checkables=qs.filter(q=>q.type!=="text"&&q.type!=="lab");
 return {complete,total:qs.length,percent:Math.round(100*complete/qs.length),checkables:checkables.length,
  accurate:checkables.filter(q=>grade(q,state[q.id])===true).length};
}
function navHash(){const hash=decodeURIComponent(location.hash.slice(1));return ACT.find(a=>a.id===hash)||null;}
function directoryCard(a){
 const p=progress(a,draftCache[a.id]||readDraft(a.id));
 return '<a class="cc-entry" href="#'+escape(a.id)+'" data-subject="'+a.subject+'">'+
 '<span class="cc-entry-info"><span class="cc-entry-overline">'+escape(a.grade)+' · '+escape(a.subjectName)+' · '+escape(a.time)+'</span>'+
 '<strong>'+escape(a.title)+'</strong><span>'+escape(a.summary)+'</span></span>'+
 '<span class="cc-entry-side"><span class="cc-pcount">'+p.complete+'/'+p.total+' done</span><span class="cc-open">Open assignment <span aria-hidden="true">↗</span></span></span></a>';
}
function showDirectory(){
 current=null;checked={};
 document.body.dataset.subject="sci";document.title="Computer Class · Mr. Mangles' Class";
 const groups=["sci","ss","math","ela","ct"];
 root.innerHTML='<div class="cc-head"><a class="cc-back" href="../">← Class homepage</a>'+
 '<h1>Computer Class</h1><p>Choose a subject. Read the instructions, complete each activity on this page, and save a copy of your answers when you finish.</p>'+
 '<div class="cc-intro-facts"><span>5 subjects</span><span>'+ACT.length+' complete assignments</span><span>Interactive trials, self-checks and written responses</span></div></div>'+
 '<div class="cc-directory">'+groups.map(s=>'<section class="cc-subject-section"><div class="cc-group-head"><h2>'+escape(subjectLabels[s])+'</h2><span>'+ACT.filter(a=>a.subject===s).length+' activities</span></div>'+
 '<div class="cc-entry-list">'+ACT.filter(a=>a.subject===s).map(directoryCard).join("")+'</div></section>').join("")+'</div>'+
 '<div class="cc-policy"><strong>How saving works</strong><p>Draft answers save in this browser only, not across different devices. Nothing is submitted to your teacher automatically. Download your work or print a copy to hand in as instructed. On a shared computer, clear your answers after saving your copy.</p></div>';
}
function inputFor(q,i){
 const id="cc-input-"+q.id,v=answers[q.id];
 if(q.type==="lab")return '<div class="cc-lab-mount" id="cc-lab-'+q.id+'">Loading investigation…</div>';
 if(q.type==="text"){
  return '<textarea id="'+id+'" data-id="'+q.id+'" rows="5" placeholder="'+escape(q.placeholder||"Write your response...")+'">'+escape(v||"")+'</textarea>'+
   '<p class="cc-word-count" id="cc-words-'+q.id+'">'+words(v)+' / '+(q.minWords||1)+' words minimum to mark complete</p>';
 }
 if(q.type==="number"){
  return '<div class="cc-number-wrap">'+(q.unit?'<span class="cc-unit">'+escape(q.unit)+'</span>':"")+
   '<input id="'+id+'" data-id="'+q.id+'" type="number" step="any" inputmode="decimal" placeholder="Your answer" value="'+escape(v??"")+'"></div>';
 }
 if(q.type==="order"){
  return '<div class="cc-order-list" role="group" aria-label="'+escape(q.prompt)+'">'+
   q.items.map((_,position)=>'<label for="'+id+'-'+position+'"><span>'+(position+1)+'</span>'+
   '<select id="'+id+'-'+position+'" data-id="'+q.id+'" data-position="'+position+'" aria-label="Event '+(position+1)+'">'+
   '<option value="">Choose an event</option>'+q.items.map((item,index)=>'<option value="'+index+'" '+(Array.isArray(v)&&String(v[position]??"")===String(index)?"selected":"")+'>'+escape(item)+'</option>').join("")+
   '</select></label>').join("")+'</div><p class="cc-helper">Choose each event once, starting with what happened first.</p>';
 }
 return '<fieldset class="cc-choices"><legend class="cc-sr-only">'+escape(q.prompt)+'</legend>'+
 q.options.map((label,index)=>'<label class="cc-radio"><input name="choice-'+q.id+'" type="radio" data-id="'+q.id+'" value="'+index+'" '+(String(v??"")===String(index)?"checked":"")+'><span>'+escape(label)+'</span></label>').join("")+'</fieldset>';
}
function renderQuestion(q,index){
 return '<article class="cc-question" id="cc-q-'+q.id+'" data-kind="'+q.type+'">'+
 '<div class="cc-question-heading"><span class="cc-question-no">'+String(index+1).padStart(2,"0")+'</span>'+
 '<h3>'+escape(q.prompt)+'</h3><span class="cc-q-status" id="cc-state-'+q.id+'"></span></div>'+
 '<div class="cc-response">'+inputFor(q,index)+'</div>'+
 (q.type!=="text"&&q.type!=="lab"?'<div class="cc-q-actions"><button type="button" class="cc-check" data-action="check" data-id="'+q.id+'">Check answer</button>'+
 '<p id="cc-feedback-'+q.id+'" class="cc-feedback" aria-live="polite"></p></div>':
 '<p class="cc-writing-tip">'+(q.type==="lab"?"Record different trials to complete this investigation.":"This response is reviewed by your teacher, not automatically graded.")+'</p>')+
 '</article>';
}
function showActivity(activity){
 current=activity;name="";checked={};answers=draftCache[activity.id]||readDraft(activity.id);draftCache[activity.id]=answers;
 document.body.dataset.subject=activity.subject;document.title=activity.title+" · Computer Class";
 const p=progress(activity,answers),n=allQuestions(activity);
 let idx=0;
 root.innerHTML='<div class="cc-head cc-activity-head"><a class="cc-back" href="#">← All computer-class assignments</a>'+
 '<div class="cc-subtitle">'+escape(activity.subjectName)+' · '+escape(activity.grade)+' · '+escape(activity.time)+'</div>'+
 '<h1>'+escape(activity.title)+'</h1><p>'+escape(activity.summary)+'</p>'+
 '<div class="cc-progress-wrap"><div class="cc-progress-top"><strong id="cc-progress-count">'+p.complete+' of '+p.total+' responses complete</strong>'+
 '<span id="cc-save-state">'+(storageAvailable?"Draft saved on this device":"Autosave unavailable; download your work to keep a copy.")+'</span></div>'+
 '<div class="cc-progress" role="progressbar" aria-label="Assignment completion" aria-valuemin="0" aria-valuemax="'+p.total+'" aria-valuenow="'+p.complete+'" id="cc-progress-bar"><span style="width:'+p.percent+'%"></span></div></div></div>'+
 '<div class="cc-work-layout"><div class="cc-main-col"><section class="cc-reading"><h2>Read first</h2>'+
 activity.reading.map((p,i)=>'<p '+(i===0&&activity.subject==="ela"?'class="cc-story-title"':"")+'>'+escape(p)+'</p>').join("")+
 '<p class="cc-reading-link"><a href="'+escape(activity.lesson)+'">↗ '+escape(activity.lessonText)+'</a></p></section>'+
 activity.sections.map((section,si)=>'<section class="cc-assignment-section" aria-labelledby="cc-section-'+si+'">'+
 '<div class="cc-section-heading"><span class="cc-section-index">Part '+(si+1)+'</span><h2 id="cc-section-'+si+'">'+escape(section.title)+'</h2>'+
 '<p>'+escape(section.intro)+'</p></div>'+section.questions.map(q=>renderQuestion(q,idx++)).join("")+'</section>').join("")+
 '<section class="cc-finish" id="cc-finish"><h2>Finish your assignment</h2>'+
 '<p>Review your responses before handing in a copy. Objective questions can be checked here, but written explanations are not automatically graded.</p>'+
 '<label class="cc-name-label" for="cc-student-name">Your name (included only on the downloaded or printed copy)</label>'+
 '<input id="cc-student-name" autocomplete="name" placeholder="First and last name" maxlength="100" value="">'+
 '<div class="cc-finish-actions"><button data-action="review" type="button" class="cc-primary">Review completion</button>'+
 '<button data-action="download" type="button">Download work (.txt)</button>'+
 '<button data-action="print" type="button">Print / Save PDF</button></div>'+
 '<p class="cc-finish-status" id="cc-finish-status" role="status"></p>'+
 '<button data-action="clear" type="button" class="cc-clear">Clear my answers on this device</button></section></div>'+
 '<aside class="cc-sidebar"><div class="cc-side-inner"><h2>Assignment guide</h2>'+
 '<p class="cc-side-focus">'+escape(activity.focus)+'</p><ol>'+activity.sections.map((s,i)=>'<li><a href="#cc-section-'+i+'" data-scroll="'+i+'">'+escape(s.title)+'</a></li>').join("")+'</ol>'+
 '<p><b>'+n.length+' responses</b> · '+n.filter(q=>q.type!=="text").length+' self-checks</p>'+
 '<div class="cc-side-divider"></div><h3>Before you leave</h3>'+
 '<p>Download your work. A draft on this device is not the same as handing it in.</p>'+
 '<a class="cc-side-lesson" href="'+escape(activity.lesson)+'">Review the related lesson ↗</a></div></aside></div>'+
 '<div class="cc-print-report" id="cc-print-report"></div>';
 mountLabs();
 updateProgress();
}
function mountLabs(){
 if(!current)return;
 const labs=window.ComputerClassLabs;
 for(const q of allQuestions(current).filter(q=>q.type==="lab")){
  const target=document.getElementById("cc-lab-"+q.id);
  if(!target||!labs)continue;
  labs.mount(target,q,answers[q.id],trials=>{
   answers[q.id]=trials;
   saveDraft();updateProgress();
  });
 }
}
function updateProgress(){
 if(!current)return;
 const p=progress(current,answers);
 const count=document.getElementById("cc-progress-count"),bar=document.getElementById("cc-progress-bar");
 if(count)count.textContent=p.complete+" of "+p.total+" responses complete";
 if(bar){bar.setAttribute("aria-valuenow",String(p.complete));bar.firstElementChild.style.width=p.percent+"%";}
 for(const q of allQuestions(current)){
  const status=document.getElementById("cc-state-"+q.id),wrap=document.getElementById("cc-q-"+q.id);
  const done=answered(q,answers[q.id]);
  if(status)status.textContent=done?"Complete":"To do";
  if(wrap)wrap.classList.toggle("cc-complete",done);
  if(q.type==="text"){const word=document.getElementById("cc-words-"+q.id);
   if(word)word.textContent=words(answers[q.id])+" / "+(q.minWords||1)+" words minimum to mark complete";}
 }
}
function getQuestion(id){return current&&allQuestions(current).find(q=>q.id===id);}
function updateField(target){
 if(!current)return;
 const id=target.dataset.id;if(!id)return;
 const q=getQuestion(id);if(!q)return;
 if(q.type==="order"){
  const position=Number(target.dataset.position),next=Array.isArray(answers[id])?answers[id].slice():Array(q.items.length).fill("");
  next[position]=target.value;answers[id]=next;
 }else answers[id]=target.value;
 delete checked[id];
 const fb=document.getElementById("cc-feedback-"+id);
 if(fb){fb.textContent="";fb.className="cc-feedback";}
 saveDraft();updateProgress();
 const s=document.getElementById("cc-finish-status");if(s)s.textContent="";
}
function feedbackFor(q){
 const value=answers[q.id],container=document.getElementById("cc-feedback-"+q.id);
 if(!container)return;
 if(!answered(q,value)){
  container.textContent=q.type==="order"?"Choose every event once before checking.":"Enter a complete answer first.";
  container.className="cc-feedback cc-warning";return;
 }
 const correct=grade(q,value);
 checked[q.id]=correct;
 container.textContent=(correct?"Correct. ":"Not quite. ")+q.why;
 container.className="cc-feedback "+(correct?"cc-correct":"cc-incorrect");
}
function getName(){return (document.getElementById("cc-student-name")?.value||name).trim();}
function printableAnswer(q,value){
 if(q.type==="choice")return q.options[Number(value)]||"(no answer)";
 if(q.type==="lab")return Array.isArray(value)&&value.length?value.map((trial,i)=>"Trial "+(i+1)+": "+window.ComputerClassLabs.trialSummary(q.lab,trial)).join("\n"):"(no trials recorded)";
 if(q.type==="order")return Array.isArray(value)?value.map((id,i)=>(i+1)+". "+(q.items[Number(id)]||"(not answered)")).join("\n"):"(not answered)";
 return String(value??"").trim()||"(not answered)";
}
function reportText(){
 if(!current)return"";
 const student=getName(),list=allQuestions(current),p=progress(current,answers);
 const lines=[current.title,"Computer Class · "+current.subjectName+" · "+current.grade,
  "Student: "+(student||"(name not entered)"),"Responses complete: "+p.complete+" of "+p.total,
  "This is an exported copy; work was not automatically submitted.","",
  ...current.sections.flatMap((section,si)=>["PART "+(si+1)+": "+section.title,
   ...section.questions.flatMap(q=>["","QUESTION: "+q.prompt,"RESPONSE:\n"+printableAnswer(q,answers[q.id])]),""]),
  "End of assignment."];
 return lines.join("\n");
}
function download(){
 const txt=reportText(),student=getName();
 const filename=(current.id+(student?"-"+student:"")).toLowerCase().normalize("NFKD").replace(/[^a-z0-9-]+/g,"-").replace(/-+/g,"-").slice(0,90)+".txt";
 const url=URL.createObjectURL(new Blob([txt],{type:"text/plain;charset=utf-8"})),anchor=document.createElement("a");
 anchor.href=url;anchor.download=filename;document.body.appendChild(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
 status("Downloaded a copy. Follow your teacher's instructions to submit it.");
}
function status(text){const el=document.getElementById("cc-finish-status");if(el)el.textContent=text;}
function buildPrintReport(){
 const el=document.getElementById("cc-print-report");if(!el)return;
 const p=progress(current,answers);
 el.innerHTML='<h1>'+escape(current.title)+'</h1><p>'+escape(current.subjectName)+' · '+escape(current.grade)+
 ' · Student: '+escape(getName()||"(name not entered)")+'</p><p>Completed '+p.complete+'/'+p.total+
 ' · Printed copy (not submitted automatically)</p>'+current.sections.map((s,i)=>'<section><h2>Part '+(i+1)+': '+escape(s.title)+'</h2>'+
 s.questions.map(q=>'<div class="cc-print-question"><h3>'+escape(q.prompt)+'</h3>'+
 '<div class="cc-print-answer">'+escape(printableAnswer(q,answers[q.id]))+'</div></div>').join("")+'</section>').join("");
}
function onAction(action,id){
 if(action==="check"){const q=getQuestion(id);if(q)feedbackFor(q);return;}
 if(action==="review"){
  const p=progress(current,answers),missing=allQuestions(current).filter(q=>!answered(q,answers[q.id]));
  if(missing.length){
   status("Almost there: "+missing.length+" response"+(missing.length===1?" needs":"s need")+" more work. Check the questions marked To do.");
   document.getElementById("cc-q-"+missing[0].id)?.scrollIntoView({behavior:"smooth",block:"center"});
  }else status("All "+p.total+" responses complete. Download or print your work and hand it in as instructed.");
  return;
 }
 if(action==="download"){download();return;}
 if(action==="print"){buildPrintReport();window.print();return;}
 if(action==="clear"){
  if(!window.confirm("Clear all saved responses for this assignment on this device? This cannot be undone. Download a copy first if you want to keep it."))return;
  answers={};draftCache[current.id]=answers;checked={};saveDraft();showActivity(current);status("Answers cleared. This device no longer has the previous draft.");
 }
}
root.addEventListener("input",event=>{
 if(event.target.id==="cc-student-name"){name=event.target.value;return;}
 if(event.target.dataset?.id)updateField(event.target);
});
root.addEventListener("change",event=>{if(event.target.dataset?.id)updateField(event.target);});
root.addEventListener("click",event=>{
 const btn=event.target.closest("[data-action]");if(btn&&root.contains(btn)){event.preventDefault();onAction(btn.dataset.action,btn.dataset.id);return;}
 const scroll=event.target.closest("[data-scroll]");if(scroll&&root.contains(scroll)){
  event.preventDefault();document.getElementById("cc-section-"+scroll.dataset.scroll)?.scrollIntoView({behavior:"smooth",block:"start"});
 }
});
function route(){
 const activity=navHash();if(activity)showActivity(activity);else showDirectory();
 window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);route();
window.ComputerClassEngine={progress,answered,grade,words,allQuestions,readDraft,reportText,version:config.version};
})();