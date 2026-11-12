/* Classroom Mission Control · teacher-owned six-day cycle planner.
   Notes and choices stay only in this browser; projected URLs contain curated IDs only. */
(function(){
"use strict";
const root=document.getElementById("mc-root"),core=window.MissionCore,config=window.MissionResources;
if(!root||!core||!config)return;
const resources=core.catalog(),lookup=core.index(resources);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const groups=["math","sci","ss","ela","ct"];
let state=core.defaultPlan(),storageOK=true,lastSaved="",feedback="";
const pickerFilters={};
const pickerKey=n=>state.selectedDay+":"+n;
const currentFilter=n=>pickerFilters[pickerKey(n)]||{subject:"all",query:""};
try{
 const raw=localStorage.getItem(core.STORE_KEY);
 if(raw){state=core.sanitizePlan(JSON.parse(raw),resources);lastSaved="Previous plan restored from this browser.";}
}catch(e){storageOK=false;feedback="A previous plan could not be restored. Download a backup to keep a copy of your work.";}
const slotFor=n=>state.days[state.selectedDay-1].slots[n];
function save(){
 try{
  localStorage.setItem(core.STORE_KEY,JSON.stringify(state));
  storageOK=true;lastSaved="Saved on this device at "+new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})+".";
 }catch(e){
  storageOK=false;lastSaved="Browser saving is unavailable. Download a planner backup.";
 }
 const status=document.getElementById("mc-save-status");
 if(status)status.textContent=lastSaved;
}
function boardUrl(){
 return new URL("launch.html",location.href).href.split("#")[0]+
  core.boardHash(state.selectedDay,state.days[state.selectedDay-1].slots,resources);
}
function matchingResources(selected,filter){
 const query=String(filter.query||"").trim().toLocaleLowerCase();
 return resources.filter(item=>{
  if(item.id===selected)return true; // Preserve a previously selected activity during search.
  if(filter.subject!=="all"&&item.subject!==filter.subject)return false;
  if(!query)return true;
  return [item.title,item.description,item.kind,config.subjects[item.subject],item.grade||""]
   .some(value=>String(value||"").toLocaleLowerCase().includes(query));
 });
}
function optionGroups(selected,filter){
 const available=matchingResources(selected,filter);
 return '<option value="">Select an activity</option>'+groups.map(subject=>{
  const options=available.filter(x=>x.subject===subject);
  if(!options.length)return "";
  return '<optgroup label="'+esc(config.subjects[subject])+'">'+options.map(x=>
   '<option value="'+esc(x.id)+'" '+(selected===x.id?"selected":"")+'>'+
   esc((x.kind==="Digital assignment"?"Assignment · ":"")+x.title)+'</option>').join("")+'</optgroup>';
 }).join("");
}
function renderOptions(n){
 const filter=currentFilter(n),selected=slotFor(n).resourceId;
 const select=document.getElementById("mc-resource-"+n),status=document.getElementById("mc-filter-count-"+n);
 if(select){select.innerHTML=optionGroups(selected,filter);select.value=selected;}
 if(status){
  const count=matchingResources(selected,filter).length;
  status.textContent=count+" matching "+(count===1?"resource":"resources")+
   (selected&&(filter.subject!=="all"||filter.query)?" (selected lesson retained)":"");
 }
}

function blockHTML(n){
 const info=config.periods[n],slot=slotFor(n),selected=lookup.get(slot.resourceId),subject=selected?.subject||"",filter=currentFilter(n);
 return '<article class="mc-block" data-block="'+n+'"><div class="mc-period">'+
  '<strong>Period '+info.number+'</strong><span>'+esc(info.start+'–'+info.end)+'</span></div>'+
  '<div class="mc-block-body"><label class="mc-input-label" for="mc-search-'+n+'">Find a lesson or assignment</label>'+
  '<div class="mc-picker-filters"><select id="mc-filter-'+n+'" aria-label="Filter Period '+(n+1)+' by subject" data-field="subject-filter" data-slot="'+n+'">'+
  '<option value="all">All subjects</option>'+groups.map(key=>'<option value="'+key+'" '+(filter.subject===key?'selected':'')+'>'+esc(config.subjects[key])+'</option>').join("")+'</select>'+
  '<input id="mc-search-'+n+'" type="search" data-field="search" data-slot="'+n+'" autocomplete="off" placeholder="Search by lesson, topic or unit…" value="'+esc(filter.query)+'"></div>'+
  '<p class="mc-picker-count" id="mc-filter-count-'+n+'" role="status">'+matchingResources(slot.resourceId,filter).length+' matching resources</p>'+
  '<label class="mc-input-label" for="mc-resource-'+n+'">Choose an activity</label>'+
  '<select id="mc-resource-'+n+'" data-field="resource" data-slot="'+n+'">'+optionGroups(slot.resourceId,filter)+'</select>'+
  '<div class="mc-resource-summary" id="mc-info-'+n+'">'+(selected?
   '<span class="mc-subject-name">'+esc(config.subjects[subject])+' · '+esc(selected.kind)+'</span>'+
   '<p>'+esc(selected.description)+'</p><a href="'+esc(selected.href)+'" target="_blank" rel="noopener noreferrer">Open resource ↗</a>':
   '<p>Nothing assigned yet. Select a resource from the library.</p>')+'</div>'+
  '<label class="mc-input-label" for="mc-note-'+n+'">Teacher preparation <span>(not shared on the student board)</span></label>'+
  '<textarea id="mc-note-'+n+'" data-field="note" data-slot="'+n+'" rows="2" maxlength="350" placeholder="Materials, opening question, or your preparation reminder…">'+esc(slot.note)+'</textarea></div>'+
  '<div class="mc-taught"><label><input type="checkbox" data-field="taught" data-slot="'+n+'" '+(slot.taught?"checked":"")+'>'+
  '<span>Done</span></label></div></article>';
}
function show(){
 const day=state.selectedDay,stats=core.progress(state,day);
 document.title="Classroom Mission Control · Day "+day;
 root.innerHTML='<section class="mc-heading"><div class="mc-heading-top">'+
  '<a href="../" class="mc-back">← Class homepage</a><span class="mc-heading-meta">Local planning workspace · 2026–27</span></div>'+
  '<h1>Classroom Mission Control</h1>'+
  '<p>Organize lessons for your six-day cycle, then open a clean student-facing board. Only selected public lesson titles travel with the shared link.</p>'+
  '<div class="mc-progressline"><strong>Day '+day+'</strong><span>'+stats.assigned+' of 5 blocks assigned · '+stats.taught+' marked done</span></div></section>'+
  '<section class="mc-day-section" aria-label="Six-day timetable">'+
  '<div class="mc-section-title"><h2>Choose a cycle day</h2><span>Day selection is manual; the school cycle does not follow calendar weekdays.</span></div>'+
  '<div class="mc-days" role="group" aria-label="Choose day">'+state.days.map((d,i)=>{
   const p=core.progress(state,i+1);
   return '<button type="button" data-day="'+(i+1)+'" aria-pressed="'+(day===i+1)+'">'+
   '<strong>Day '+(i+1)+'</strong><small>'+p.assigned+'/5 planned</small></button>';
  }).join("")+'</div></section>'+
  '<div class="mc-work-layout"><div class="mc-main">'+
  '<div class="mc-section-title mc-period-title"><h2>Day '+day+' · Teaching blocks</h2><span>Five periods · Grade 7 Math preset for Period 1</span></div>'+
  '<div id="mc-blocks">'+config.periods.map((_,i)=>blockHTML(i)).join("")+'</div>'+
  '<div class="mc-day-actions"><div class="mc-day-copy"><label for="mc-copy-from">Copy plan from</label>'+
  '<select id="mc-copy-from" aria-label="Day to copy">'+state.days.filter(x=>x.day!==day).map(x=>
  '<option value="'+x.day+'">Day '+x.day+'</option>').join("")+'</select>'+
  '<button type="button" id="mc-copy-day">Copy to Day '+day+'</button></div>'+
  '<button type="button" id="mc-reset">Reset this day</button>'+
  '<a href="../computer-class/">Browse Computer Class assignments ↗</a></div></div>'+
  '<aside class="mc-side"><div class="mc-side-inner"><h2>Student board</h2>'+
  '<p>Project the chosen lessons or send students a link. The board includes the period and activity only—never your preparation notes.</p>'+
  '<a class="mc-primary" id="mc-launch" href="'+esc(boardUrl())+'" target="_blank" rel="noopener noreferrer">Open student board ↗</a>'+
  '<label for="mc-share">Student link</label><input id="mc-share" type="text" readonly value="'+esc(boardUrl())+'">'+
  '<button type="button" id="mc-copy">Copy student link</button><p id="mc-share-status" role="status" class="mc-status"></p>'+
  '<h3>Keep your plan</h3><p id="mc-save-status" role="status">'+esc(lastSaved||"Changes save automatically in this browser.")+'</p>'+
  '<button type="button" id="mc-export">Download six-day backup</button>'+
  '<label for="mc-import" class="mc-import-label">Restore a saved planner backup (.json)</label>'+
  '<input id="mc-import" type="file" accept=".json,application/json">'+
  '<p class="mc-warning">This page has no account or device syncing. On shared computers, others could open locally saved plans. Do not put student names, grades or sensitive details into preparation notes.</p>'+
  '<p class="mc-status" role="status" id="mc-action-status">'+esc(feedback)+'</p></div></aside></div>';
}
function updateShare(){
 const url=boardUrl(),input=document.getElementById("mc-share"),a=document.getElementById("mc-launch");
 if(input)input.value=url;
 if(a)a.href=url;
}
function download(name,body){
 const url=URL.createObjectURL(new Blob([body],{type:"application/json;charset=utf-8"})),a=document.createElement("a");
 a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function setAction(s){feedback=s;const el=document.getElementById("mc-action-status");if(el)el.textContent=s;}
root.addEventListener("click",event=>{
 const dayButton=event.target.closest("[data-day]");
 if(dayButton){state.selectedDay=Number(dayButton.dataset.day);save();feedback="";show();return;}
 if(event.target.id==="mc-copy-day"){
  const from=Number(document.getElementById("mc-copy-from")?.value),to=state.selectedDay;
  if(!Number.isInteger(from)||from<1||from>6||from===to)return;
  if(!window.confirm("Replace Day "+to+" with the lessons and teacher notes from Day "+from+"? Completed checkmarks will be cleared."))return;
  state.days[to-1].slots=state.days[from-1].slots.map(slot=>({...slot,taught:false}));
  for(let i=0;i<5;i++)delete pickerFilters[pickerKey(i)];
  save();feedback="Copied Day "+from+" into Day "+to+". Completion checkmarks have been reset.";show();return;
 }
 if(event.target.id==="mc-reset"){
  if(!window.confirm("Reset all five periods of Day "+state.selectedDay+"? Download a backup first if you need the previous plan."))return;
  state.days[state.selectedDay-1]=core.defaultPlan().days[state.selectedDay-1];
  save();feedback="Day "+state.selectedDay+" has been reset.";show();return;
 }
 if(event.target.id==="mc-export"){
  download("classroom-six-day-plan.json",JSON.stringify(core.backup(state),null,2));
  setAction("Planner backup downloaded. Store it somewhere you can find later.");return;
 }
 if(event.target.id==="mc-copy"){
  const url=boardUrl(),status=document.getElementById("mc-share-status");
  const copy=async()=>{
   try{
    if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
    await navigator.clipboard.writeText(url);
    status.textContent="Student link copied.";
   }catch(e){
    const input=document.getElementById("mc-share");input.select();
    status.textContent="Select and copy the highlighted link (Ctrl+C or ⌘C).";
   }
  };copy();
 }
});
root.addEventListener("change",async event=>{
 if(event.target.id==="mc-import"){
  const input=event.target,file=input.files?.[0];input.value="";
  if(!file||file.size>500000){setAction("Choose a planner JSON backup smaller than 500 KB.");return;}
  try{
   const next=core.sanitizePlan(JSON.parse(await file.text()),resources);
   if(!window.confirm("Replace all six locally saved day plans with this backup?"))return;
   state=next;save();feedback="Six-day plan restored from your backup.";show();
  }catch(e){setAction("Could not read that backup. Choose a Classroom Mission Control JSON file.");}
  return;
 }
 const target=event.target,field=target.dataset.field,slotIndex=Number(target.dataset.slot);
 if(field==="subject-filter"&&slotIndex>=0&&slotIndex<5){
  const filter=currentFilter(slotIndex);pickerFilters[pickerKey(slotIndex)]={...filter,subject:groups.includes(target.value)?target.value:"all"};
  renderOptions(slotIndex);return;
 }
 if(!["resource","taught"].includes(field)||slotIndex<0||slotIndex>4)return;
 const slot=slotFor(slotIndex);
 if(field==="resource"){
  slot.resourceId=lookup.has(target.value)?target.value:"";
  slot.taught=false;
 }else slot.taught=target.checked;
 save();feedback="";show();
});
root.addEventListener("input",event=>{
 const target=event.target;
 if(target.dataset.field==="search"){
  const n=Number(target.dataset.slot);
  if(n>=0&&n<5){
   const filter=currentFilter(n);pickerFilters[pickerKey(n)]={...filter,query:String(target.value).slice(0,90)};
   renderOptions(n);
  }
  return;
 }
 if(target.dataset.field!=="note")return;
 const n=Number(target.dataset.slot);if(n<0||n>4)return;
 slotFor(n).note=String(target.value).slice(0,350);
 save();
});
show();
window.MissionPlanner={get plan(){return state;},get resources(){return resources;},boardUrl};
})();