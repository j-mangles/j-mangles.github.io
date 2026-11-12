/* Student-facing Classroom Board. Only catalog IDs are read from the URL.
   Teacher notes and private browser data are never loaded here. */
(function(){
"use strict";
const root=document.getElementById("mc-board-root"),core=window.MissionCore,config=window.MissionResources;
if(!root||!core||!config)return;
const resources=core.catalog(),available=core.index(resources);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let focused=0;
function card(day,period,id){
 const time=config.periods[period-1],item=available.get(id);
 if(!item)return "";
 const label=item.kind==="Digital assignment"?"Begin assignment":"Open lesson";
 return '<article class="mb-card" data-period="'+period+'">'+
 '<div class="mb-card-no"><strong>Period '+period+'</strong><span>'+esc(time.start+'–'+time.end)+'</span></div>'+
 '<div class="mb-card-content"><span class="mb-subject">'+esc(config.subjects[item.subject])+' · '+esc(item.kind)+'</span>'+
 '<h2>'+esc(item.title)+'</h2><p>'+esc(item.description)+'</p></div>'+
 '<div class="mb-card-actions"><a href="'+esc(item.href)+'" class="mb-open">'+label+' ↗</a>'+
 '<button type="button" class="mb-focus-button" data-focus="'+period+'">Present this period</button></div></article>';
}
function render(){
 const board=core.parseBoardHash(location.hash,resources);
 document.title=board?"Day "+board.day+" · Classroom Board":"Classroom Board";
 if(!board){
  root.innerHTML='<section class="mb-head"><a class="mb-home" href="../">← Class homepage</a>'+
  '<h1>Classroom Board</h1><p>This board opens from a class plan. Ask your teacher for the current link.</p>'+
  '<a href="../computer-class/" class="mb-open">Browse Computer Class assignments ↗</a></section>';
  return;
 }
 const assigned=board.slots.map((id,i)=>({id,period:i+1})).filter(x=>x.id);
 root.innerHTML='<section class="mb-head"><a class="mb-home" href="../">← Class homepage</a>'+
 '<div class="mb-head-row"><div><span class="mb-day">Six-day cycle · Day '+board.day+'</span>'+
 '<h1>Today in class</h1><p>Find your period, open the activity, and follow your teacher’s instructions.</p></div>'+
 '<div class="mb-counter">'+assigned.length+' posted '+(assigned.length===1?"activity":"activities")+'</div></div></section>'+
 '<div class="mb-board-tools"><p>Only lesson and assignment links appear here. Your work stays on your device until you hand it in.</p>'+
 '<button type="button" id="mb-all" '+(!focused?'hidden':'')+'>Show all periods</button></div>'+
 '<div id="mb-list">'+(assigned.length?assigned.map(x=>card(board.day,x.period,x.id)).join(""):
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