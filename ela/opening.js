/* Use the released lesson questions until the teacher's bell-ringer collection is supplied. */
(function(){
 "use strict";
 const lessons=new Map(), topic=document.getElementById("topic");
 for(const unit of window.HUB.units){
  if(unit.status==="soon")continue;
  for(const lesson of unit.lessons||[]){
   if(!lesson.check?.length)continue;
   const key=unit.id+"/"+lesson.id;
   lessons.set(key,lesson);
   topic.add(new Option(lesson.title,key));
  }
 }
 const today=new Date();
 const day=Math.floor(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())/86400000);
 const requested=new URLSearchParams(location.search).get("lesson");
 const defaults=["answering/day1","grammar/apostrophes","answering/day2","grammar/confused","stories/plot"];
 topic.value=lessons.has(requested)?requested:defaults[day%defaults.length];
 let index=day%lessons.get(topic.value).check.length;
 function show(){
  const item=lessons.get(topic.value).check[index];
  document.getElementById("question").textContent=item.q;
  document.getElementById("choices").replaceChildren(...item.a.map(choice=>{
   const li=document.createElement("li");li.textContent=choice;return li;
  }));
  document.getElementById("answer").open=false;
  document.getElementById("reason").textContent=item.a[item.c]+". "+item.why;
 }
 topic.addEventListener("change",()=>{index=0;show();});
 document.getElementById("next").addEventListener("click",()=>{index=(index+1)%lessons.get(topic.value).check.length;show();});
 show();
})();
