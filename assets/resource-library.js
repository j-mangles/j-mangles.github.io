/* Student resource library. Index only material already published in the lesson hub.
   No Drive links, private classroom files, student records, or answer keys. */
(function(){
"use strict";
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normalize=v=>String(v||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"");
const trim=(v,max=148)=>{const s=String(v||"").replace(/\s+/g," ").trim();return s.length>max?s.slice(0,max-1).trimEnd()+"…":s;};
const path=(u,l)=>"#"+encodeURIComponent(u)+(l?"/"+encodeURIComponent(l):"");
const imgPath=s=>typeof s==="string" && /^img\/[a-zA-Z0-9/_ .-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(s) && !s.includes("..")?s:null;
const statuses={now:"Current",next:"Up next",done:"Completed",soon:"Planned"};
function collect(H){
 const tools=H.lessonTools||{}, unitTools=H.tools||{},result=[];
 for(const u of H.units||[]){
  const common={unitId:u.id,unitName:u.name,unitNumber:u.n,status:statuses[u.status]||"Unit"};
  if((u.lessons||[]).length>1)result.push({...common,type:"practice",title:"Unit Review: "+u.name,
   summary:"Review the big ideas, terms and self-check questions from this unit.",route:path(u.id,"review"),label:"Review & flashcards"});
  if(typeof unitTools[u.id]==="function"){
   const match=window.CourseAtlas&&window.CourseAtlas.modelItems(H).find(x=>x.unit.id===u.id&&!x.lesson);
   result.push({...common,type:"practice",title:match?.title||u.name+" interactive practice",
    summary:"Interactive practice available on this unit's overview page.",route:path(u.id),label:"Interactive unit tool"});
  }
  for(const l of u.lessons||[]){
   const lesson={...common,lessonId:l.id,lessonName:l.title,route:path(u.id,l.id)};
   if(l.big||(l.notes||[]).length||(l.terms||[]).length){
    result.push({...lesson,type:"notes",title:l.title,
     summary:trim(l.big||(l.notes||[])[0]||"Lesson notes and reference terms."),
     label:"Lesson notes"});
   }
   for(const im of l.imgs||[]){
    const src=imgPath(im.src);if(!src)continue;
    result.push({...lesson,type:"visual",title:trim(im.cap||"Diagram: "+l.title,88),
      summary:"Published lesson image for "+l.title+".",label:"Diagram or image",image:src,
      alt:trim(im.cap||"Lesson diagram",150)});
   }
   if(typeof tools[u.id+"/"+l.id]==="function")
    result.push({...lesson,type:"practice",title:"Interactive: "+l.title,
     summary:"Explore the live model or investigation attached to this lesson.",label:"Interactive investigation"});
   if(l.activity)
    result.push({...lesson,type:"practice",title:trim(l.activity.title||"Guided activity: "+l.title,90),
     summary:"Complete the student activity directly on the lesson page.",label:"Guided activity"});
   if(l.work)
    result.push({...lesson,type:"task",title:"Class task: "+l.title,
     summary:trim(l.work),label:"Assignment instructions"});
  }
 }
 return result;
}
function card(item,i){
 const img=item.image?'<figure class="resource-preview"><img src="'+esc(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy" decoding="async"></figure>':"";
 return '<article class="resource-card '+esc(item.type)+'" data-resource-card data-type="'+esc(item.type)+
  '" data-unit="'+esc(item.unitId)+'" data-search="'+esc(normalize([item.unitName,item.lessonName,item.title,item.summary,item.label].join(" ")))+'">'+
  img+'<div class="resource-card-body"><div class="resource-card-meta"><span>'+esc(item.label)+'</span>'+
  '<span>Unit '+esc(item.unitNumber)+'</span></div>'+
  '<h3>'+esc(item.title)+'</h3><p>'+esc(item.summary)+'</p>'+
  '<a href="'+esc(item.route)+'" aria-label="Open '+esc(item.title)+' in '+esc(item.unitName)+'">Open lesson <span aria-hidden="true">↗</span></a></div></article>';
}
function createMarkup(H){
 const items=collect(H),units=H.units||[];
 const filters=[["all","All resources"],["notes","Lesson notes"],["visual","Diagrams"],["practice","Interactive & review"],["task","Class tasks"]];
 return '<div class="wrap student-resources" id="student-resources">'+
  '<nav class="resource-breadcrumb" aria-label="Resource library navigation"><a href="#overview">← Back to course map</a></nav>'+
  '<header class="resource-banner"><div class="eyebrow">Student learning library · 2026–27</div>'+
  '<h2>Find a lesson resource</h2><p>Browse the notes, diagrams, practice and assignment instructions already available on this class website.</p>'+
  '<p class="resource-privacy">Paper handouts and Google Drive files are not downloadable here unless the teacher publishes an approved copy. This website does not collect or submit your work.</p></header>'+
  '<div class="resource-controls"><label>Search topics or titles<input type="search" id="resource-search" placeholder="e.g. percentages, cells, plot" autocomplete="off"></label>'+
  '<label>Unit<select id="resource-unit"><option value="all">All units</option>'+
  units.map(u=>'<option value="'+esc(u.id)+'">Unit '+esc(u.n)+' — '+esc(u.name)+'</option>').join("")+
  '</select></label><label>Type<select id="resource-type">'+
  filters.map(([v,n])=>'<option value="'+v+'">'+n+'</option>').join("")+'</select></label></div>'+
  '<p class="resource-count" role="status" aria-live="polite" id="resource-count">'+items.length+' resources available</p>'+
  '<section class="resource-grid" id="resource-grid" aria-label="Published lesson resources">'+items.map(card).join("")+'</section>'+
  '<p class="resource-none" id="resource-none" hidden>No matching published resources. Try another topic or filter.</p></div>';
}
function render(target,H){
 target.innerHTML=createMarkup(H);
 const cards=[...target.querySelectorAll("[data-resource-card]")],search=target.querySelector("#resource-search"),
  unit=target.querySelector("#resource-unit"),type=target.querySelector("#resource-type"),
  count=target.querySelector("#resource-count"),none=target.querySelector("#resource-none");
 function apply(){
  const q=normalize(search.value.trim()),selectedUnit=unit.value,selectedType=type.value;let shown=0;
  for(const c of cards){
   const match=(!q||c.dataset.search.includes(q)) &&
    (selectedUnit==="all"||c.dataset.unit===selectedUnit) &&
    (selectedType==="all"||c.dataset.type===selectedType);
   c.hidden=!match;if(match)shown++;
  }
  count.textContent=shown+" "+(shown===1?"resource":"resources")+" found";
  none.hidden=shown!==0;
 }
 search.addEventListener("input",apply);unit.addEventListener("change",apply);type.addEventListener("change",apply);
}
window.StudentResources={collect,createMarkup,render};
})();
