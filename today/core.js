/* Classroom Mission Control · pure planning, catalog and safe board-link functions.
   No server requests or private student-data handling. */
(function(g){
"use strict";
const SCHEMA=1, STORE_KEY="eess-classroom-mission-control-v1";
const SUBJECTS=["math","sci","ss","ela","ct"];
function catalog(){
 const configured=g.MissionResources||{lessons:[],subjects:{}};
 const lessonEntries=[...(configured.lessons||[]).map(x=>({
  id:"lesson:"+x.id,subject:x.subject,kind:x.kind,title:x.title,
  description:x.description||"",href:x.href
 })),...(g.MissionReleasedLessons||[]).map(x=>({
  id:"lesson:"+x.id,subject:x.subject,kind:x.kind,title:x.title,
  description:x.description||"",href:x.href
 }))];
 // Prefer curated labels for featured lessons; never display the same lesson twice.
 const usedPaths=new Set();
 const lessons=lessonEntries.filter(x=>{
  if(usedPaths.has(x.href))return false;
  usedPaths.add(x.href);return true;
 });
 const assignments=(g.ComputerClassData?.activities||[]).map(x=>({
  id:"assignment:"+x.id,subject:x.subject,kind:"Digital assignment",title:x.title,
  description:x.summary||"",href:"../computer-class/#"+encodeURIComponent(x.id),
  grade:x.grade,time:x.time
 }));
 return [...lessons,...assignments].filter(x=>
  SUBJECTS.includes(x.subject)&&
  /^[a-z]+:[a-z0-9-]+$/.test(x.id)&&
  typeof x.title==="string"&&
  typeof x.href==="string"&&
  x.href.startsWith("../")&&!x.href.includes("..\/..\/")
 );
}
function index(resources){return new Map(resources.map(item=>[item.id,item]));}
function defaultSlot(period){return {resourceId:period===1?"lesson:math-home":"",note:"",taught:false};}
function defaultPlan(){
 return {schema:SCHEMA,selectedDay:1,days:Array.from({length:6},(_,day)=>({
  day:day+1,slots:Array.from({length:5},(_,period)=>defaultSlot(period+1))
 }))};
}
function sanitizePlan(input,resources){
 if(!input||input.schema!==SCHEMA||!Array.isArray(input.days)||input.days.length!==6)throw Error("Not a supported six-day planner backup.");
 const available=index(resources),plan=defaultPlan();
 plan.selectedDay=Number.isInteger(input.selectedDay)&&input.selectedDay>=1&&input.selectedDay<=6?input.selectedDay:1;
 for(let d=0;d<6;d++){
  if(!input.days[d]||!Array.isArray(input.days[d].slots)||input.days[d].slots.length!==5)
   throw Error("The backup contains an invalid day or timetable.");
  for(let p=0;p<5;p++){
   const raw=input.days[d].slots[p]||{};
   const id=typeof raw.resourceId==="string"&&available.has(raw.resourceId)?raw.resourceId:"";
   plan.days[d].slots[p]={
    resourceId:id,
    note:typeof raw.note==="string"?raw.note.slice(0,350):"",
    taught:raw.taught===true
   };
  }
 }
 return plan;
}
function progress(plan,day){
 const slots=plan.days[day-1]?.slots||[];
 return {assigned:slots.filter(x=>x.resourceId).length,
  taught:slots.filter(x=>x.resourceId&&x.taught).length};
}
function boardHash(day,slots,resources){
 if(!Number.isInteger(day)||day<1||day>6||!Array.isArray(slots)||slots.length!==5)throw Error("Invalid classroom day.");
 const items=index(resources);
 const ids=slots.map(slot=>slot?.resourceId&&items.has(slot.resourceId)?encodeURIComponent(slot.resourceId):"-");
 return "#v1/"+day+"/"+ids.join(",");
}
function parseBoardHash(hash,resources){
 const value=String(hash||"").replace(/^#/,"");
 if(value.length>500)return null;
 const m=/^v1\/([1-6])\/([A-Za-z0-9,:_%.~!\-]+)$/.exec(value);
 if(!m)return null;
 const parts=m[2].split(",");
 if(parts.length!==5)return null;
 const available=index(resources),ids=[];
 for(const part of parts){
  if(part==="-"){ids.push("");continue;}
  let key;
  try{key=decodeURIComponent(part);}catch(e){return null;}
  if(!available.has(key))return null;
  ids.push(key);
 }
 return {day:Number(m[1]),slots:ids};
}
function backup(plan){
 return {schema:SCHEMA,application:"classroom-mission-control",exportedAt:new Date().toISOString(),
  selectedDay:plan.selectedDay,days:plan.days};
}
g.MissionCore={SCHEMA,STORE_KEY,SUBJECTS,catalog,index,defaultPlan,sanitizePlan,progress,
 boardHash,parseBoardHash,backup};
})(window);