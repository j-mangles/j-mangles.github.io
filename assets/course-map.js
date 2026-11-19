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
 const lessonToolNames={
  sci:{"skills/fair":"Fair Test Studio","skills/graph":"Data & Graphing Studio","skills/si":"Measurement Challenge","cells/transport":"Membrane Lab","cells/reproduction":"Cell Division Studio","cells/specialized":"Specialized Cell Explorer","cells/systems":"Human Systems Explorer","cells/circulatory":"Oxygen Delivery Lab"},
  math:{"fdp/l05":"Percent Strategy Studio","fdp/l06":"Percent Strategy Studio","fdp/l08":"Percent in Context Studio","fdp/l09":"Percent Strategy Studio","fdp/l19":"Number Line Lab","div/d4":"Divisibility Detective","prob/p4":"Sample Space Lab"},
  ela:{"stories/plot":"Plot Evidence Board","stories/snack":"Plot Evidence Board","answering/day2":"Writer's Studio","film/l1":"Camera Framing Studio"},
  ct:{"lab/l4":"Evidence Inspector"}
 };
 function modelItems(H){
  const t=H.lessonTools||{},ut=H.tools||{},names=unitToolNames[H.subject]||{};
  return H.units.flatMap(unit=>[
   ...(typeof ut[unit.id]==="function"?[{unit,lesson:null,title:names[unit.id]||unit.name+" practice"}]:[]),
   ...(unit.lessons||[]).filter(lesson=>typeof t[unit.id+"/"+lesson.id]==="function")
    .map(lesson=>({unit,lesson,title:lesson.title}))
  ]);
 }
 const normalize=value=>String(value||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim();
 function modelLabel(H,u,l){
  return l?lessonToolNames[H.subject]?.[u.id+"/"+l.id]||"Interactive model":unitToolNames[H.subject]?.[u.id]||"Interactive practice";
 }
 function focusModel(container,H,u,l){
  const name=normalize(modelLabel(H,u,l));
  const headings=[...container.querySelectorAll("h2,h3,h4")];
  const heading=headings.find(el=>normalize(el.textContent)===name)||headings[0]||container;
  heading.tabIndex=-1;
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:"start"});
 }
 function searchEntries(H){
  const entries=[];
  for(const u of H.units){
   const href="#"+encodeURIComponent(u.id);
   const available=["done","now","ongoing"].includes(u.status);
   const unitModel=available&&typeof H.tools?.[u.id]==="function"?modelLabel(H,u):"";
   entries.push({title:u.name,href,model:unitModel,context:"Unit "+u.n+" · "+(statuses[u.status]||"Unit"),keywords:u.intro||""});
   if(!available)continue;
   for(const l of u.lessons||[]){
    if(l.released===false)continue;
    const key=u.id+"/"+l.id;
    const model=typeof H.lessonTools?.[key]==="function"?modelLabel(H,u,l):"";
    entries.push({title:l.title,href:href+"/"+encodeURIComponent(l.id),model,context:u.name+" · Lesson "+l.n,
     keywords:[u.name,l.activity?.title,l.big,...(l.terms||[]).map(t=>t[0])].join(" ")});
   }
  }
  return entries;
 }
 function findEntries(entries,query){
  const words=normalize(query).split(" ").filter(Boolean);
  if(!words.length)return [];
  return entries.map(entry=>{
   const title=normalize(entry.title+" "+entry.model);
   const all=title+" "+normalize(entry.keywords);
   return {entry,rank:words.every(word=>title.includes(word))?0:1,match:words.every(word=>all.includes(word))};
  }).filter(hit=>hit.match).sort((a,b)=>a.rank-b.rank).map(hit=>hit.entry);
 }
 function resultMarkup(entry){
  const href=escapeHTML(entry.href);
  return '<li><div><a class="atlas-result-title" href="'+href+'">'+escapeHTML(entry.title)+'</a>'+
   '<small>'+escapeHTML(entry.context)+'</small></div>'+
   (entry.model?'<a class="atlas-result-model" href="'+href+'/model">'+escapeHTML(entry.model)+'</a>':"")+'</li>';
 }
 function unitCard(u,index,lessonTools,unitTools){
  const count=(u.lessons||[]).length;
  const modelCount=(u.lessons||[]).filter(l=>typeof lessonTools[u.id+"/"+l.id]==="function").length+
    (typeof unitTools[u.id]==="function"?1:0);
  const chapter=String(u.n||index+1);
  const intro=u.intro||"";
  const status=statuses[u.status]||"Unit";
  return '<article class="atlas-unit" data-atlas-card>'+
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
  return '<li data-atlas-card>'+
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
      '<label class="atlas-filter-label">Find a topic <input id="atlas-filter" type="search" autocomplete="off" placeholder="Search lessons, models and units" aria-controls="atlas-results atlas-browse"></label></div>'+
    '<div class="atlas-result-count" id="atlas-result-count" role="status" aria-live="polite"></div>'+
    '<ul class="atlas-search-results" id="atlas-results" aria-label="Search results" hidden></ul><div id="atlas-browse">'+
    '<div class="atlas-grid" id="atlas-unit-grid">'+built.map((u,i)=>unitCard(u,i,H.lessonTools||{},H.tools||{})).join("")+'</div>'+
    (later.length?'<section class="atlas-later"><h3>Later this year</h3><ul>'+later.map(laterRow).join("")+'</ul></section>':"")+
    (modelLinks?'<section id="atlas-tools" class="atlas-tools" aria-labelledby="atlas-tools-heading">'+
      '<div><h2 id="atlas-tools-heading">Interactive tools</h2>'+
      '<p class="atlas-disclaimer">Practice here isn\'t sent to your teacher. Checkmarks only save on this device.</p></div>'+
      '<ul>'+modelLinks+'</ul></section>':"")+
    '</div></div>';
 }
 function render(target,H){
  target.innerHTML=createMarkup(H);
  const search=target.querySelector("#atlas-filter"),results=target.querySelector("#atlas-results"),browse=target.querySelector("#atlas-browse");
  const count=target.querySelector("#atlas-result-count"),entries=searchEntries(H);
  search.addEventListener("input",()=>{
   const query=search.value.trim(),hits=query?findEntries(entries,query):[];
   browse.hidden=Boolean(query);
   results.hidden=!hits.length;
   results.innerHTML=hits.map(resultMarkup).join("");
   count.textContent=!query?"":hits.length?hits.length+" "+(hits.length===1?"result":"results")+" found":"No matching lessons, models or units. Try another topic.";
  });
 }
 window.CourseAtlas={createMarkup,render,modelItems,focusModel};
})();
