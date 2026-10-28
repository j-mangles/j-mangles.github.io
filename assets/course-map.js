/* Shared, data-driven course atlas for the four lesson-hub subjects.
   Uses existing HUB.units and registered lesson tools. No Drive documents or student data. */
(function(){
 "use strict";
 const escapeHTML=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const statuses={done:"Completed",now:"Current unit",ongoing:"All year",next:"Up next",soon:"Planned"};
 // Labels follow the existing, already-published tool names in each subject's tools.js.
 const unitToolNames={
  math:{fdp:"Percent & Decimal Practice",prob:"Probability Bag",fracops:"Fraction Strip Lab",int:"Integer Tiles & Number Line",eq:"Equation Balance Studio",area:"Circle Graph Construction Lab"},
  sci:{cells:"Cell Explorer & Organelle Games",skills:"Metric Converter",light:"Solar Spectrum & Albedo Explorer",earth:"Earth & Plate Tectonics Explorer"},
  ela:{grammar:"Grammar Quick-Fire",stories:"Plot Arc Explorer",film:"Camera Framing Studio"},
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
  const intro=u.intro||"";
  const status=statuses[u.status]||"Unit";
  return '<article class="atlas-unit" data-atlas-card data-filter="'+escapeHTML((u.name+" "+intro+" "+(u.lessons||[]).map(l=>l.title).join(" ")).toLowerCase())+'">'+
    '<div class="atlas-unit-top"><span class="atlas-unit-number" aria-label="Unit '+escapeHTML(chapter)+'">'+escapeHTML(chapter)+'</span>'+
      '<span class="atlas-unit-status '+escapeHTML(u.status||"")+'">'+escapeHTML(status)+'</span></div>'+
    '<h3>'+escapeHTML(u.name)+'</h3>'+
    (intro?'<p class="atlas-unit-description">'+escapeHTML(intro)+'</p>':"")+
    '<div class="atlas-unit-bottom"><span>'+count+' '+(count===1?"lesson":"lessons")+'</span>'+
      (modelCount?'<span>'+modelCount+' interactive '+(modelCount===1?"model":"models")+'</span>':"")+'</div>'+
    '<div class="atlas-unit-links"><a href="#'+encodeURIComponent(u.id)+'">Explore unit <span aria-hidden="true">↗</span></a>'+
      (count?'<a class="atlas-link-muted" href="#'+encodeURIComponent(u.id)+"/"+encodeURIComponent(u.lessons[0].id)+'">First lesson</a>':"")+'</div>'+
    '</article>';
 }
 function laterRow(u){
  return '<li data-atlas-card data-filter="'+escapeHTML((u.name+" "+(u.intro||"")).toLowerCase())+'">'+
   '<a href="#'+encodeURIComponent(u.id)+'"><span class="atlas-later-n">'+escapeHTML(u.n||"")+'</span>'+
   '<span class="atlas-later-name">'+escapeHTML(u.name)+'</span>'+
   (u.when&&u.when!=="Later this year"?'<span class="atlas-later-when">'+escapeHTML(u.when)+'</span>':"")+'</a></li>';
 }
 function createMarkup(H){
  const units=H.units||[], models=modelItems(H);
  const built=units.filter(u=>(u.lessons||[]).length), later=units.filter(u=>!(u.lessons||[]).length);
  const modelLinks=models.map(({unit,lesson,title})=>
    '<li><a href="#'+encodeURIComponent(unit.id)+(lesson?"/"+encodeURIComponent(lesson.id):"")+'">'+
      '<span class="atlas-model-unit">'+escapeHTML(unit.name)+'</span>'+
      '<strong>'+escapeHTML(title)+'</strong></a></li>').join("");
  return '<div class="wrap course-atlas" id="course-atlas">'+
    '<div class="atlas-content-head"><div><span class="eyebrow">Course map · 2026–27</span><h2 id="atlas-heading">The full year</h2></div>'+
      '<label class="atlas-filter-label">Find a topic <input id="atlas-filter" type="search" autocomplete="off" placeholder="Search units and lessons" aria-controls="atlas-unit-grid"></label></div>'+
    '<div class="atlas-result-count" id="atlas-result-count" role="status" aria-live="polite"></div>'+
    '<div class="atlas-grid" id="atlas-unit-grid">'+built.map((u,i)=>unitCard(u,i,H.lessonTools||{},H.tools||{})).join("")+'</div>'+
    (later.length?'<section class="atlas-later"><h3>Later this year</h3><ul>'+later.map(laterRow).join("")+'</ul></section>':"")+
    '<p id="atlas-empty" class="atlas-empty" hidden>No units match that search. Try another word.</p>'+
    (modelLinks?'<section id="atlas-tools" class="atlas-tools" aria-labelledby="atlas-tools-heading">'+
      '<div><h2 id="atlas-tools-heading">Interactive tools</h2>'+
      '<p class="atlas-disclaimer">Practice here isn\'t sent to your teacher. Checkmarks only save on this device.</p></div>'+
      '<ul>'+modelLinks+'</ul></section>':"")+
    '</div>';
 }
 function render(target,H){
  target.innerHTML=createMarkup(H);
  const search=target.querySelector("#atlas-filter"),cards=[...target.querySelectorAll("[data-atlas-card]")];
  const count=target.querySelector("#atlas-result-count"),empty=target.querySelector("#atlas-empty");
  if(search)search.addEventListener("input",()=>{
   const term=search.value.trim().toLowerCase();
   let visible=0;
   for(const card of cards){card.hidden=!!term&&!card.dataset.filter.includes(term);if(!card.hidden)visible++;}
   count.textContent=term?visible+" "+(visible===1?"unit":"units")+" found":"";
   empty.hidden=visible!==0;
  });
 }
 window.CourseAtlas={createMarkup,render,modelItems};
})();
