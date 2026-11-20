(function () {
 "use strict";
 const weeks = window.bellRingerWeeks;
 const select = document.getElementById("week");
 const preview = document.getElementById("preview");
 const frame = document.getElementById("slide-frame");
 const storageKey = "ela-bell-ringer-week";
 for (const week of weeks) {
  select.add(new Option("Week " + week.week + " · " + week.term, week.week));
 }
 const requested = new URLSearchParams(location.search).get("week");
 let saved;
 try { saved = localStorage.getItem(storageKey); } catch {}
 select.value = [requested, saved, "1"].find(value => weeks.some(week => String(week.week) === value));

 function showPreview() {
  frame.replaceChildren();
  if (!preview.open) return;
  const week = weeks[select.selectedIndex];
  const viewer = document.createElement("iframe");
  viewer.title = "Week " + week.week + " bell-ringer slides";
  viewer.className = "slide-preview";
  viewer.allowFullscreen = true;
  viewer.src = "https://drive.google.com/file/d/" + week.slides + "/preview";
  frame.append(viewer);
 }
 function showWeek() {
  const week = weeks[select.selectedIndex];
  document.getElementById("slides").href = "https://docs.google.com/presentation/d/" + week.slides + "/edit";
  document.getElementById("handout").href = "https://drive.google.com/file/d/" + week.handout + "/view";
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const activities = [week.term, "Discussion", "Quote", "Video response", "Silent reading"];
  const guide = days.map((day, i) => {
   const group = document.createElement("div");
   const title = document.createElement("dt");
   const detail = document.createElement("dd");
   const position = i === 0 && week.slideCount === 6 ? "Slides 1–2" : "Slide " + (i === 0 ? 1 : i + week.slideCount - 4);
   title.textContent = day;
   detail.textContent = activities[i] + " · " + position;
   group.append(title, detail);
   return group;
  });
  document.getElementById("slide-guide").replaceChildren(...guide);
  showPreview();
 }
 select.addEventListener("change", () => {
  try { localStorage.setItem(storageKey, select.value); } catch {}
  const url = new URL(location.href);
  url.searchParams.set("week", select.value);
  history.replaceState(null, "", url);
  showWeek();
 });
 preview.addEventListener("toggle", showPreview);
 showWeek();
})();

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
 if(lessons.has(requested))document.getElementById("lesson-review").open=true;
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
