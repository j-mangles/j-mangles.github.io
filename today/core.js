/* Classroom Mission Control · pure planning, catalog and safe board-link functions.
   No server requests or private student-data handling. */
(function(g){
"use strict";
const SCHEMA=1, STORE_KEY="eess-classroom-mission-control-v1";
const PUBLIC_BOARD_KEY="eess-last-public-class-board-v1";
const SUBJECTS=["math","sci","ss","ela","ct"];
function activityFormat(kind){
 const keys={"Simulation":"simulation","Story simulation":"simulation","Review game":"review","Team review":"review","Individual test":"test","Test":"test"};
 const key=keys[kind];
 return key?{key,label:{simulation:"Simulation",review:"Review game",test:"Test"}[key]}:null;
}
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
function defaultSlot(period){return {resourceId:period===1?"lesson:math-home":"",lastClassId:"",note:"",taught:false};}
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
    lastClassId:available.has(raw.lastClassId)?raw.lastClassId:"",
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
 const encode=id=>items.has(id)?encodeURIComponent(id):"-";
 const today=slots.map(slot=>encode(slot?.resourceId)).join(",");
 const previous=slots.map(slot=>encode(slot?.lastClassId));
 return previous.some(id=>id!=="-")?"#v2/"+day+"/"+today+"/"+previous.join(","):"#v1/"+day+"/"+today;
}
function parseBoardHash(hash,resources){
 const value=String(hash||"").replace(/^#/,"");
 if(value.length>1500)return null;
 const [version,day,...lists]=value.split("/");
 if(!/^[1-6]$/.test(day)||!((version==="v1"&&lists.length===1)||(version==="v2"&&lists.length===2)))return null;
 const available=index(resources);
 const decoded=[];
 for(const list of lists){
  const parts=list.split(",");
  if(parts.length!==5)return null;
  const ids=[];
  for(const part of parts){
   if(part==="-"){ids.push("");continue;}
   let key;
   try{key=decodeURIComponent(part);}catch(e){return null;}
   if(!available.has(key))return null;
   ids.push(key);
  }
  decoded.push(ids);
 }
 return {day:Number(day),slots:decoded[0],lastClass:decoded[1]||Array(5).fill("")};
}
function backup(plan){
 return {schema:SCHEMA,application:"classroom-mission-control",exportedAt:new Date().toISOString(),
  selectedDay:plan.selectedDay,days:plan.days};
}
// The homepage remembers only an opened public board. Planner drafts and notes use a separate key.
function rememberBoard(board,resources){
 const slots=board.slots.map((resourceId,i)=>({resourceId,lastClassId:board.lastClass[i]}));
 const hash=boardHash(board.day,slots,resources);
 try{g.localStorage.setItem(PUBLIC_BOARD_KEY,hash);}catch(e){/* The shared URL also works without storage. */}
 return hash;
}
function previousBoard(resources){
 try{return parseBoardHash(g.localStorage.getItem(PUBLIC_BOARD_KEY),resources);}catch(e){return null;}
}
g.MissionCore={activityFormat,SCHEMA,STORE_KEY,SUBJECTS,catalog,index,defaultPlan,sanitizePlan,progress,
 boardHash,parseBoardHash,backup,rememberBoard,previousBoard};
})(window);
