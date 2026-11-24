/* Student-facing Classroom Board. Only catalog IDs are read from the URL.
   Teacher notes and private browser data are never loaded here. */
(function(){
"use strict";
const root=document.getElementById("mc-board-root"),core=window.MissionCore,config=window.MissionResources;
if(!root||!core||!config)return;
const resources=core.catalog(),available=core.index(resources);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let focused=0;
function formatTag(item){
 const format=core.activityFormat(item.kind);
 return format?'<span class="activity-format" data-format="'+format.key+'">'+format.label+'</span> · ':"";
}
function card(period,id,lastId){
 const time=config.periods[period-1],item=available.get(id),last=available.get(lastId);
 if(!item&&!last)return "";
 const subject=config.subjects[(item||last).subject];
 const format=item&&core.activityFormat(item.kind);
 const label=format?"Open "+format.label.toLowerCase():item?.kind==="Digital assignment"?"Begin assignment":"Open lesson";
 const title=item?item.title:"Catch up from last class";
 const ela=(item||last).subject==="ela";
 const lesson=last?.subject==="ela"&&last.href.startsWith("../ela/#")?last.href.split("#")[1]:"";
 const opening=ela&&item?.id!=="lesson:ela-opening"?'<p><a href="../ela/opening.html'+(lesson?'?lesson='+encodeURIComponent(lesson):'')+'">ELA bell ringer, Wordle &amp; Connections</a></p>':"";
 const warmup=window.ClassWarmups?.render(last)||"";
 const previous=last?'<p class="mb-last"><strong>Last class</strong> <a href="'+esc(last.href)+'">'+formatTag(last)+esc(last.title)+'</a></p>':"";
 return '<article class="mb-card" data-period="'+period+'">'+
 '<div class="mb-card-no"><strong>Period '+period+'</strong><span>'+esc(time.start+'–'+time.end)+'</span></div>'+
 '<div class="mb-card-content"><span class="mb-subject">'+(item?formatTag(item):"")+esc(subject)+'</span>'+
 '<h2>'+esc(title)+'</h2>'+(item?'<p>'+esc(item.description)+'</p>':"")+previous+opening+warmup+'</div>'+
 '<div class="mb-card-actions">'+(item?'<a href="'+esc(item.href)+'" class="mb-open">'+label+'</a>':"")+
 '<button type="button" class="mb-focus-button" data-focus="'+period+'">Present this period</button></div></article>';
}
function render(){
 const board=core.parseBoardHash(location.hash,resources);
 document.title=board?"Day "+board.day+" · Classroom Board":"Classroom Board";
 if(!board){
  document.querySelectorAll("[data-board-home]").forEach(a=>a.href="../");
  root.innerHTML='<section class="mb-head"><a class="mb-home" href="../">← Class homepage</a>'+
  '<h1>Classroom Board</h1><p>This board opens from a class plan. Ask your teacher for the current link.</p>'+
  '<a href="../computer-class/" class="mb-open">Browse Computer Class assignments ↗</a></section>';
  return;
 }
 const hash=core.rememberBoard(board,resources);
 document.querySelectorAll("[data-board-home]").forEach(a=>a.href="../"+hash);
 const assigned=board.slots.map((id,i)=>({id,lastId:board.lastClass[i],period:i+1})).filter(x=>x.id||x.lastId);
 root.innerHTML='<section class="mb-head"><a class="mb-home" href="../'+esc(hash)+'">Class homepage</a>'+
 '<div class="mb-head-row"><div><span class="mb-day">Six-day cycle · Day '+board.day+'</span>'+
 '<h1>Today in class</h1><p>Find your period, open the activity, and follow your teacher’s instructions.</p></div>'+
 '<div class="mb-counter">'+assigned.length+' posted '+(assigned.length===1?"period":"periods")+'</div></div></section>'+
 '<div class="mb-board-tools"><p>Only lesson and assignment links appear here. Your work stays on your device until you hand it in.</p>'+
 '<button type="button" id="mb-all" '+(!focused?'hidden':'')+'>Show all periods</button></div>'+
 '<div id="mb-list">'+(assigned.length?assigned.map(x=>card(x.period,x.id,x.lastId)).join(""):
 '<p class="mb-empty">No activities have been posted for this day yet.</p>')+'</div>'+
 '<p class="mb-foot">This is a snapshot of the selected plan. If your teacher changes the plan, open the updated link.</p>';
 applyFocus();
}
function applyFocus(){
 document.body.classList.toggle("mb-focus-mode",focused!==0);
 root.querySelectorAll("[data-period]").forEach(el=>{
  el.hidden=focused!==0&&Number(el.dataset.period)!==focused;
 });
 const button=document.getElementById("mb-all");
 if(button)button.hidden=focused===0;
}
root.addEventListener("click",event=>{
 const pressed=event.target.closest("[data-focus]");
 if(pressed&&root.contains(pressed)){focused=Number(pressed.dataset.focus);applyFocus();window.scrollTo(0,0);return;}
 if(event.target.id==="mb-all"){focused=0;applyFocus();}
});
window.addEventListener("hashchange",()=>{focused=0;render();});
render();
window.MissionBoard={get focus(){return focused;}};
})();