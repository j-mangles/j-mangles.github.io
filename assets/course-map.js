/* Shared, data-driven course atlas for the four lesson-hub subjects.
   Uses existing HUB.units and registered lesson tools. No Drive documents or student data. */
(function(){
 "use strict";
 const escapeHTML=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const statuses={done:"Completed",now:"Current unit",next:"Up next",soon:"Planned"};
 // Labels follow the existing, already-published tool names in each subject's tools.js.
 const unitToolNames={
  math:{fdp:"Percent & Decimal Practice",prob:"Probability Bag",fracops:"Fraction Strip Lab",int:"Integer Tiles & Number Line"},
  sci:{cells:"Cell Explorer & Organelle Games",skills:"Metric Converter",light:"Solar Spectrum & Albedo Explorer"},
  ela:{grammar:"Grammar Quick-Fire",stories:"Plot Arc Explorer"},
  ct:{lab:"Spot It Challenge",games:"Prisoner's Dilemma"}
 };
 function modelItems(H){
  const t=H.lessonTools||{},ut=H.tools||{},names=unitToolNames[H.subject]||{};
  return H.units.flatMap(unit=>[
   ...(typeof ut[unit.id]==="function"?[{unit,lesson:null,title:names[unit.id]||unit.name+" practice"}]:[]),
   ...(unit.lessons||[]).filter(lesson=>typeof t[unit.id+"/"+lesson.id]==="function")
    .map(lesson=>({unit,lesson,title:lesson.title}))
  ]);
 }
 function unitCard(u,index,lessonTools,unitTools){
  const count=(u.lessons||[]).length;
  const modelCount=(u.lessons||[]).filter(l=>typeof lessonTools[u.id+"/"+l.id]==="function").length+
    (typeof unitTools[u.id]==="function"?1:0);
  const chapter=String(u.n||index+1);
  const intro=u.intro||"Explore the lessons and key ideas in this unit.";
  const status=statuses[u.status]||"Unit";
  return '<article class="atlas-unit" data-atlas-card data-filter="'+escapeHTML((u.name+" "+intro+" "+(u.lessons||[]).map(l=>l.title).join(" ")).toLowerCase())+'">'+
    '<div class="atlas-unit-top"><span class="atlas-unit-number" aria-label="Unit '+escapeHTML(chapter)+'">'+escapeHTML(chapter)+'</span>'+
      '<span class="atlas-unit-status '+escapeHTML(u.status||"")+'">'+escapeHTML(status)+'</span></div>'+
    '<h3>'+escapeHTML(u.name)+'</h3>'+
    '<p class="atlas-unit-description">'+escapeHTML(intro)+'</p>'+
    '<div class="atlas-unit-bottom"><span>'+count+' '+(count===1?"lesson":"lessons")+'</span>'+
      (modelCount?'<span>'+modelCount+' interactive '+(modelCount===1?"model":"models")+'</span>':"")+'</div>'+
    '<div class="atlas-unit-links"><a href="#'+encodeURIComponent(u.id)+'">Explore unit <span aria-hidden="true">↗</span></a>'+
      (count?'<a class="atlas-link-muted" href="#'+encodeURIComponent(u.id)+"/"+encodeURIComponent(u.lessons[0].id)+'">First lesson</a>':"")+'</div>'+
    '</article>';
 }
 function createMarkup(H){
  const units=H.units||[], models=modelItems(H);
  const now=units.find(x=>x.status==="now")||units.find(x=>x.lessons&&x.lessons.length);
  const title=H.subject==="math"?"Your math pathway":H.subject==="sci"?"Explore the science lab":
   H.subject==="ela"?"The reading & writing library":"Your investigation board";
  const tagline=H.subject==="math"?"Build skills, investigate patterns and see how ideas connect.":
   H.subject==="sci"?"Investigate ideas through lessons, diagrams and models.":
   H.subject==="ela"?"Explore texts, writing strategies and evidence-based thinking.":
   "Explore puzzles, reasoning, strategy and real-world decisions.";
  const modelLinks=models.map(({unit,lesson,title})=>
    '<li><a href="#'+encodeURIComponent(unit.id)+(lesson?"/"+encodeURIComponent(lesson.id):"")+'">'+
      '<span class="atlas-model-unit">'+escapeHTML(unit.name)+'</span>'+
      '<strong>'+escapeHTML(title)+'</strong><span aria-hidden="true"> ↗</span></a></li>').join("");
  return '<div class="wrap course-atlas" id="course-atlas">'+
    '<section class="atlas-hero" aria-labelledby="atlas-heading"><div class="atlas-hero-copy">'+
      '<div class="eyebrow">Course guide · 2026–27</div><h2 id="atlas-heading">'+escapeHTML(title)+'</h2>'+
      '<p>'+escapeHTML(tagline)+'</p>'+
      '<div class="atlas-hero-actions">'+(now?'<a class="atlas-primary" href="#'+encodeURIComponent(now.id)+'">Go to current unit <span aria-hidden="true">↗</span></a>':"")+
      '<a class="atlas-secondary" href="#resources">Browse lesson resources <span aria-hidden="true">↗</span></a>'+
      '<button class="atlas-secondary" type="button" id="atlas-tools-jump">Find an interactive tool</button></div></div>'+
    '<div class="atlas-hero-art" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div></section>'+
    '<div class="atlas-content-head"><div><span class="eyebrow">The full year</span><h2>Units & lessons</h2>'+
      '<p>Choose a unit to find class notes, activities and self-checks.</p></div>'+
      '<label class="atlas-filter-label">Find a topic <input id="atlas-filter" type="search" autocomplete="off" placeholder="Search units and lessons" aria-controls="atlas-unit-grid"></label></div>'+
    '<div class="atlas-result-count" id="atlas-result-count" role="status" aria-live="polite">'+units.length+' units</div>'+
    '<div class="atlas-grid" id="atlas-unit-grid">'+units.map((u,i)=>unitCard(u,i,H.lessonTools||{},H.tools||{})).join("")+'</div>'+
    '<p id="atlas-empty" class="atlas-empty" hidden>No units match that search. Try another word.</p>'+
    '<section id="atlas-tools" class="atlas-tools" aria-labelledby="atlas-tools-heading">'+
      '<div><div class="eyebrow">Try something interactive</div><h2 id="atlas-tools-heading">Learning studios</h2>'+
      '<p>Find unit-level practice and lesson-specific investigations in one place. Open one to explore.</p>'+
      '<p class="atlas-disclaimer">Practice here is not submitted to your teacher. Any saved checkmarks belong only to this device.</p></div>'+
      '<ul>'+ (modelLinks||'<li>New interactive tools will appear here when they are added.</li>')+'</ul></section>'+
    '</div>';
 }
 function render(target,H){
  target.innerHTML=createMarkup(H);
  const search=target.querySelector("#atlas-filter"),cards=[...target.querySelectorAll("[data-atlas-card]")];
  const count=target.querySelector("#atlas-result-count"),empty=target.querySelector("#atlas-empty");
  const jump=target.querySelector("#atlas-tools-jump");
  if(jump)jump.addEventListener("click",()=>target.querySelector("#atlas-tools").scrollIntoView({behavior:"smooth",block:"start"}));
  if(search)search.addEventListener("input",()=>{
   const term=search.value.trim().toLowerCase();
   let visible=0;
   for(const card of cards){card.hidden=!!term&&!card.dataset.filter.includes(term);if(!card.hidden)visible++;}
   count.textContent=visible+" "+(visible===1?"unit":"units")+(term?" found":"");
   empty.hidden=visible!==0;
  });
 }
 window.CourseAtlas={createMarkup,render,modelItems};
})();
