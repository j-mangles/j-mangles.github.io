/* Render the same public timetable as the projector. The homepage never reads the planner. */
(function(){
 "use strict";
 const core=window.MissionCore,section=document.getElementById("home-board");
 if(!core||!section)return;
 const resources=core.catalog(),byId=core.index(resources);
 const heading=section.querySelector("h2"),message=section.querySelector("p");
 const list=section.querySelector("ul"),open=section.querySelector(".home-board-open");
 function link(label,id){
  const item=byId.get(id),entry=document.createElement("div"),name=document.createElement("strong"),a=document.createElement("a");
  name.textContent=label;
  a.textContent=item.title;
  a.href=new URL(item.href,new URL("today/",document.baseURI)).href;
  entry.append(name,a);return entry;
 }
 function render(){
  const shared=/^#v[0-9]+\//.test(location.hash);
  const board=shared?core.parseBoardHash(location.hash,resources):core.previousBoard(resources);
  list.replaceChildren();open.hidden=true;
  if(!board){
   section.hidden=!shared;
   if(shared){heading.textContent="Class board";message.textContent="This link could not be opened. Ask for the latest class board link.";}
   return;
  }
  section.hidden=false;
  const hash=core.rememberBoard(board,resources);
  heading.textContent="Class board · Day "+board.day;
  message.textContent=shared?"Lessons from the board your teacher shared.":"Last board opened on this device. Open your teacher’s latest link for changes.";
  board.slots.forEach((id,i)=>{
   const previous=board.lastClass[i];
   if(!id&&!previous)return;
   const row=document.createElement("li"),period=document.createElement("span"),lessons=document.createElement("div");
   period.textContent="Period "+(i+1)+" · "+window.MissionResources.subjects[byId.get(id||previous).subject];
   if(id)lessons.append(link("Today",id));
   if(previous)lessons.append(link("Last class",previous));
   row.append(period,lessons);list.append(row);
  });
  if(!list.children.length)message.textContent="No lessons were posted on this board.";
  open.href="today/launch.html"+hash;open.hidden=false;
 }
 window.addEventListener("hashchange",render);
 window.addEventListener("pageshow",render);
 window.addEventListener("storage",render);
 render();
})();
