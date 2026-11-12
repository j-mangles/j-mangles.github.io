/* Computer Class Teacher Review Desk.
   Imported student JSON lives in browser memory only. No network calls, database or uploads. */
(function(){
"use strict";
const root=document.getElementById("tr-root"),cfg=window.ComputerClassData,lab=window.ComputerClassLabs;
if(!root||!cfg)return;
const assignments=new Map(cfg.activities.map(x=>[x.id,x])),entries=[],MAX_FILES=120,SESSION_SCHEMA="eess-computer-class-review-session-v1";
let selected=-1,activeFilter="all",dirty=false;
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const all=a=>a.sections.flatMap(s=>s.questions);
const isCorrect=(q,v)=>{
 if(q.type==="choice")return v!=null&&String(v)!==""&&Number(v)===q.correct;
 if(q.type==="number")return v!=null&&String(v).trim()!==""&&Number.isFinite(Number(v))&&Math.abs(Number(v)-q.answer)<=(q.tolerance??.0001);
 if(q.type==="order")return Array.isArray(v)&&v.length===q.items.length&&q.correct.every((x,i)=>Number(v[i])===x);
 return null;
};
const objective=a=>all(a).filter(q=>["choice","number","order"].includes(q.type));
const response=(q,v)=>{
 if(q.type==="choice")return q.options[Number(v)]??"(not answered)";
 if(q.type==="order")return Array.isArray(v)?v.map((id,i)=>(i+1)+". "+(q.items[Number(id)]??"(not answered)")).join("\n"):"(not answered)";
 if(q.type==="lab")return Array.isArray(v)?v.map((x,i)=>(i+1)+". "+(lab?.trialSummary?.(q.lab,x)||JSON.stringify(x))).join("\n"):"(no trials recorded)";
 if(q.type==="evidence")return v&&typeof v.content==="string"?"Imported investigation: "+String(v.fileName||"investigation.txt")+"\n\n"+v.content.slice(0,65536)+"\n\nEvidence reflection:\n"+String(v.reflection||""):"(no investigation report imported)";
 if(v==null||String(v).trim()==="")return "(not answered)";
 return String(v).slice(0,20000);
};
function sanitize(data){
 if(data?.schema!=="eess-computer-class-submission-v1"||data.version!==cfg.version||
   typeof data.activity_id!=="string"||!assignments.has(data.activity_id)||
   typeof data.student_name!=="string"||!data.student_name.trim()||data.student_name.length>100||
   !data.answers||typeof data.answers!=="object"||Array.isArray(data.answers))throw Error("Unrecognized or incomplete assignment file");
 const a=assignments.get(data.activity_id),safe={};
 for(const q of all(a)){
  const v=data.answers[q.id];
  if(v===undefined)continue;
  if(q.type==="text"&&typeof v==="string")safe[q.id]=v.slice(0,20000);
  else if(q.type==="number"&&(typeof v==="string"||typeof v==="number"))safe[q.id]=String(v).slice(0,60);
  else if(q.type==="choice"&&(typeof v==="string"||typeof v==="number"))safe[q.id]=String(v).slice(0,20);
  else if(q.type==="order"&&Array.isArray(v))safe[q.id]=v.slice(0,20).map(x=>String(x).slice(0,10));
  else if(q.type==="lab"&&Array.isArray(v))safe[q.id]=v.slice(0,12).filter(x=>x&&typeof x==="object"&&!Array.isArray(x));
  else if(q.type==="evidence"&&v&&typeof v.content==="string"&&v.content.length<=65536)safe[q.id]={fileName:String(v.fileName||"investigation.txt").slice(0,120),content:v.content,reflection:String(v.reflection||"").slice(0,4000)};
 }
 return {activity:a,student:data.student_name.trim(),exportedAt:String(data.exported_at||"").slice(0,35),
  answers:safe,review:{},overall:"",fileName:""};
}
function hasTeacherReview(entry){
 if(!entry)return false;
 if(typeof entry.overall==="string"&&entry.overall.trim())return true;
 return Object.values(entry.review||{}).some(x=>x&&typeof x==="object"&&(String(x.level||"").trim()||String(x.note||"").trim()));
}
function stats(entry){
 const qs=all(entry.activity),auto=objective(entry.activity);
 const correct=auto.filter(q=>isCorrect(q,entry.answers[q.id])===true).length;
 const answered=auto.filter(q=>entry.answers[q.id]!=null&&String(entry.answers[q.id]).trim()!=="").length;
 const written=qs.filter(q=>q.type==="text"||q.type==="evidence"),labs=qs.filter(q=>q.type==="lab");
 const writtenDone=written.filter(q=>{
  const value=entry.answers[q.id];
  if(q.type==="evidence")return value&&value.content&&String(value.reflection||"").trim().split(/\s+/).filter(Boolean).length>=(q.minWords||1);
  return typeof value==="string"&&value.trim().length>0;
 }).length;
 const labDone=labs.filter(q=>Array.isArray(entry.answers[q.id])&&entry.answers[q.id].length>=q.minTrials).length;
 return {correct,possible:auto.length,answered,writtenDone,written:written.length,labDone,labs:labs.length};
}
function csvEscape(value){
 let v=String(value??"").replace(/[\u0000-\u001f]/g," ").trim();
 if(/^[=+\-@]/.test(v))v="'"+v; // Prevent spreadsheet formula injection.
 return '"'+v.replace(/"/g,'""')+'"';
}
function download(name,type,content){
 const u=URL.createObjectURL(new Blob([content],{type})),a=document.createElement("a");
 a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1000);
}

const allowedLevels=new Set(["","meeting","developing","beginning","notyet"]);
function sanitizeReview(activity,review){
 const safe={};
 if(!review||typeof review!=="object"||Array.isArray(review))return safe;
 for(const q of all(activity)){
  const r=review[q.id];if(!r||typeof r!=="object"||Array.isArray(r))continue;
  const level=typeof r.level==="string"&&allowedLevels.has(r.level)?r.level:"";
  const note=typeof r.note==="string"?r.note.slice(0,1500):"";
  if(level||note)safe[q.id]={level,note};
 }
 return safe;
}
function sessionPayload(){
 return {schema:SESSION_SCHEMA,version:cfg.version,saved_at:new Date().toISOString(),
  entries:entries.map(x=>({schema:"eess-computer-class-submission-v1",version:cfg.version,
  activity_id:x.activity.id,student_name:x.student,exported_at:x.exportedAt,
  answers:x.answers,review:sanitizeReview(x.activity,x.review),
  overall:String(x.overall||"").slice(0,5000),file_name:String(x.fileName||"").slice(0,200)}))};
}
function parseSession(raw){
 if(raw?.schema!==SESSION_SCHEMA||raw.version!==cfg.version||!Array.isArray(raw.entries)||
 raw.entries.length>MAX_FILES)throw Error("Unsupported review session.");
 return raw.entries.map(item=>{
  const x=sanitize(item);x.review=sanitizeReview(x.activity,item.review);
  x.overall=typeof item.overall==="string"?item.overall.slice(0,5000):"";
  x.fileName=typeof item.file_name==="string"?item.file_name.slice(0,200):"";
  return x;
 });
}
function setDirty(value){
 dirty=value;
 const info=document.getElementById("tr-session-state");
 if(info)info.textContent=dirty?"Your latest review changes are not backed up. Download a session before leaving.":
  entries.length?"Session backed up. Save again after further changes.":"No review session is loaded.";
}
function saveSession(){
 if(!entries.length){document.getElementById("tr-file-message").textContent="Import student files before saving a review session.";return;}
 download("computer-class-review-session-"+new Date().toISOString().slice(0,10)+".json",
  "application/json;charset=utf-8",JSON.stringify(sessionPayload(),null,2));
 setDirty(false);
 document.getElementById("tr-file-message").textContent="Review-session backup downloaded. Store it securely in accordance with school privacy requirements.";
}
async function restoreSession(file){
 const message=document.getElementById("tr-file-message");
 if(!file||file.size>20*1024*1024){message.textContent="Choose a review session JSON under 20 MB.";return;}
 try{
  const recovered=parseSession(JSON.parse(await file.text()));
  if(entries.length&&!window.confirm("Replace the current student files and comments with this review-session backup?"))return;
  entries.splice(0,entries.length,...recovered);
  selected=entries.length?0:-1;activeFilter="all";document.getElementById("tr-filter").value="all";
  setDirty(false);updateCount();
  message.textContent="Restored "+entries.length+" student reviews and teacher comments. Nothing was uploaded.";
 }catch(err){message.textContent="Could not restore that file. Choose an exported Computer Class review session JSON.";}
}

function list(){
 const holder=document.getElementById("tr-list");
 const shown=entries.map((x,i)=>({x,i})).filter(({x})=>activeFilter==="all"||x.activity.subject===activeFilter);
 holder.innerHTML=shown.length?shown.map(({x,i})=>{
  const s=stats(x);
  return '<button class="tr-entry" data-entry="'+i+'" aria-pressed="'+(selected===i)+'"><strong>'+e(x.student)+'</strong>'+
   '<span>'+e(x.activity.subjectName)+' · '+e(x.activity.title)+'</span>'+
   '<small>Auto-check '+s.correct+'/'+s.possible+' · Written '+s.writtenDone+'/'+s.written+
   (s.labs?' · Labs '+s.labDone+'/'+s.labs:'')+'</small></button>';
 }).join(""):'<p class="tr-empty">No matching student files imported.</p>';
 document.getElementById("tr-count").textContent=entries.length+" file"+(entries.length===1?"":"s")+" loaded";
}
function renderEntry(){
 const panel=document.getElementById("tr-detail"),x=entries[selected];
 if(!x){panel.innerHTML='<div class="tr-welcome"><h2>Choose a student submission</h2>'+
  '<p>Import files exported from Computer Class and select a student to review their responses. Your files stay in this browser tab.</p></div>';return;}
 const s=stats(x),questions=all(x.activity);
 panel.innerHTML='<div class="tr-student-head"><span class="tr-kicker">STUDENT REVIEW</span><h2>'+e(x.student)+'</h2>'+
  '<p>'+e(x.activity.title)+' · '+e(x.activity.grade)+'</p>'+
  '<div class="tr-stats"><span>'+s.correct+' / '+s.possible+' objective answers correct</span>'+
  '<span>'+s.writtenDone+' / '+s.written+' written responses</span>'+
  (s.labs?'<span>'+s.labDone+' / '+s.labs+' labs recorded</span>':'')+'</div></div>'+
  x.activity.sections.map((section,i)=>'<section class="tr-review-section"><h3>Part '+(i+1)+' · '+e(section.title)+'</h3>'+
  section.questions.map(q=>{
   const auto=isCorrect(q,x.answers[q.id]),v=response(q,x.answers[q.id]),rating=x.review[q.id]?.level||"",note=x.review[q.id]?.note||"";
   return '<article class="tr-answer"><h4>'+e(q.prompt)+'</h4>'+
    '<div class="tr-answer-text">'+e(v)+'</div>'+
    (auto!==null?'<p class="tr-auto '+(auto?"tr-auto-right":"tr-auto-wrong")+'">'+
      (x.answers[q.id]==null||String(x.answers[q.id]).trim()===""?"No objective answer":auto?"Auto-check: correct":"Auto-check: review")+
      '</p>':
      '<div class="tr-mark"><label>Teacher assessment<select data-rating="'+q.id+'">'+
        [['',"Not assessed"],["meeting","Meeting expectations"],["developing","Developing"],["beginning","Beginning"],["notyet","Not yet demonstrated"]].map(([id,label])=>
          '<option value="'+id+'" '+(rating===id?"selected":"")+'>'+label+'</option>').join("")+'</select></label>'+
        '<label>Feedback<textarea data-feedback="'+q.id+'" placeholder="Strength, next step or feedback">'+e(note)+'</textarea></label></div>')+
   '</article>';
  }).join("")+'</section>').join("")+
  '<div class="tr-overall"><h3>Overall feedback</h3><label for="tr-overall-note">Strengths and next steps</label>'+
  '<textarea id="tr-overall-note" placeholder="Student demonstrates... Next, practise...">'+e(x.overall)+'</textarea>'+
  '<div class="tr-actions"><button type="button" id="tr-feedback-download">Download student feedback (.txt)</button>'+
  '<button type="button" id="tr-remove" class="tr-remove">Remove this file from review</button></div></div>';
}
function updateCount(){list();renderEntry();}
function filtered(){return entries.filter(x=>activeFilter==="all"||x.activity.subject===activeFilter);}
function csv(){
 const head=["Student","Assignment","Subject","Auto Correct","Auto Total","Objective Answered","Written Completed","Written Total","Labs Completed","Labs Total","Teacher Ratings","Overall Feedback"];
 const rows=filtered().map(x=>{
  const s=stats(x),ratings=Object.entries(x.review).filter(([,v])=>v.level||v.note).map(([id,v])=>id+": "+(v.level||"not rated")+" "+(v.note||"")).join(" | ");
  return [x.student,x.activity.title,x.activity.subjectName,s.correct,s.possible,s.answered,s.writtenDone,s.written,s.labDone,s.labs,ratings,x.overall];
 });
 download("computer-class-review-summary.csv","text/csv;charset=utf-8","\ufeff"+[head,...rows].map(r=>r.map(csvEscape).join(",")).join("\r\n"));
}
function feedbackText(x){
 const s=stats(x);
 const out=["Computer Class · Teacher feedback","Student: "+x.student,"Assignment: "+x.activity.title,
  "Objective questions: "+s.correct+" of "+s.possible+" correct","Written responses: "+s.writtenDone+" of "+s.written,"",
  ...all(x.activity).filter(q=>q.type==="text"||q.type==="lab"||q.type==="evidence").flatMap(q=>{
   const r=x.review[q.id]||{};return ["Question: "+q.prompt,"Assessment: "+(r.level||"Not assessed"),
    "Feedback: "+(r.note||"No written feedback"),""];
  }),"Overall feedback:",x.overall||"No overall feedback added."];
 return out.join("\n");
}
root.innerHTML='<div class="tr-header"><a href="./" class="tr-back">← Computer Class</a>'+
 '<span class="tr-kicker">TEACHER WORKSPACE · LOCAL ONLY</span><h1>Review Desk</h1>'+
 '<p>Review Computer Class files from your students. No account or server is connected: imported answers and comments live only in this browser tab until you export them.</p></div>'+
 '<div class="tr-import"><label for="tr-files">Import students’ teacher-copy (.json) files</label>'+
 '<input id="tr-files" type="file" accept=".json,application/json" multiple>'+
 '<p id="tr-file-message" role="status">Files are read locally, not uploaded. Use a trusted school computer and handle downloaded files under school privacy rules.</p></div>'+
 '<div class="tr-toolbar"><label for="tr-filter">Show subject <select id="tr-filter"><option value="all">All subjects</option>'+
 Object.entries({sci:"Science",ss:"Social Studies",math:"Math 7",ela:"ELA",ct:"Critical Thinking"}).map(([id,name])=>'<option value="'+id+'">'+name+'</option>').join("")+'</select></label>'+
 '<span id="tr-count">0 files loaded</span><button id="tr-csv" type="button">Export review CSV</button><button id="tr-session-save" type="button">Back up review session (.json)</button>'+
 '<button id="tr-clear" type="button">Clear imported files</button></div><div class="tr-session-controls"><label for="tr-session-file">Restore a saved review session (.json)</label><input id="tr-session-file" type="file" accept=".json,application/json"><p id="tr-session-state" role="status">No review session is loaded.</p><p>Reviews do not autosave. Download a review-session backup before closing the tab.</p></div>'+
 '<div class="tr-layout"><aside class="tr-list" id="tr-list"><p class="tr-empty">No student files imported.</p></aside>'+
 '<div id="tr-detail" class="tr-detail"></div></div>'+
 '<p class="tr-footer-note">This page is publicly accessible but contains no student data until you choose files. Never use it as a cloud submission portal.</p>';
list();renderEntry();
root.addEventListener("click",event=>{
 const entry=event.target.closest("[data-entry]");
 if(entry){selected=Number(entry.dataset.entry);updateCount();return;}
 if(event.target.id==="tr-csv"){if(filtered().length)csv();else document.getElementById("tr-file-message").textContent="Import student files before exporting.";return;}
 if(event.target.id==="tr-session-save"){saveSession();return;}
 if(event.target.id==="tr-clear"){
  if(!entries.length||window.confirm("Clear all imported student files and unsaved review comments from this tab?")){
   entries.length=0;selected=-1;setDirty(false);updateCount();
  }return;
 }
 if(event.target.id==="tr-remove"){
  if(window.confirm("Remove this student copy and its unsaved feedback from this tab?")){
   entries.splice(selected,1);selected=-1;setDirty(true);updateCount();
  }return;
 }
 if(event.target.id==="tr-feedback-download"&&entries[selected]){
  const x=entries[selected],filename=(x.activity.id+"-"+x.student+"-feedback").toLowerCase().normalize("NFKD").replace(/[^a-z0-9-]+/g,"-").slice(0,92)+".txt";
  download(filename,"text/plain;charset=utf-8",feedbackText(x));
 }
});
root.addEventListener("change",event=>{
 if(event.target.id==="tr-filter"){activeFilter=event.target.value;list();return;}
 const key=event.target.dataset.rating;if(key&&entries[selected]){
  entries[selected].review[key]=entries[selected].review[key]||{};
  entries[selected].review[key].level=event.target.value;setDirty(true);
 }
});
root.addEventListener("input",event=>{
 const key=event.target.dataset.feedback;
 if(key&&entries[selected]){entries[selected].review[key]=entries[selected].review[key]||{};entries[selected].review[key].note=event.target.value.slice(0,1500);setDirty(true);}
 if(event.target.id==="tr-overall-note"&&entries[selected])entries[selected].overall=event.target.value.slice(0,5000);setDirty(true);
});
document.getElementById("tr-files").addEventListener("change",async event=>{
 const files=[...event.target.files].slice(0,MAX_FILES),message=document.getElementById("tr-file-message");
 let good=0,bad=0,protectedReviews=0;
 for(const file of files){
  try{
   if(file.size>1024*1024)throw Error("oversize");
   const entry=sanitize(JSON.parse(await file.text()));entry.fileName=file.name;
   const existing=entries.findIndex(x=>x.student.toLocaleLowerCase()===entry.student.toLocaleLowerCase()&&x.activity.id===entry.activity.id);
   if(existing>=0&&hasTeacherReview(entries[existing])){
    protectedReviews++;continue;
   }
   if(existing>=0)entries[existing]=entry;else entries.push(entry);good++;
  }catch(err){bad++;}
 }
 if(good){selected=entries.length-1;setDirty(true);}
 message.textContent=good+" file"+(good===1?"":"s")+" loaded. "+
 (protectedReviews?protectedReviews+" existing reviewed submission(s) protected from replacement. Download your review backup before removing or replacing a graded copy. ":"")+
 (bad?bad+" unsupported or invalid file(s) skipped. ":"")+
 "No data was uploaded.";
 event.target.value="";updateCount();
});
document.getElementById("tr-session-file").addEventListener("change",async event=>{
 const file=event.target.files?.[0];if(file)await restoreSession(file);event.target.value="";
});
window.addEventListener("beforeunload",event=>{
 if(!dirty||!entries.length)return;
 event.preventDefault();event.returnValue="";
});
window.ComputerClassTeacher={sanitize,stats,csvEscape,objective,isCorrect,sanitizeReview,hasTeacherReview,sessionPayload,parseSession,
 get entries(){return entries.slice();},get hasUnsavedChanges(){return dirty;} };
})();
