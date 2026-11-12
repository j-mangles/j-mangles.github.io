/* Whose Golden Age? A Walk Through Athens: page behaviour.
 * All work stays in this page's memory. Nothing is stored or sent; writing leaves only by Copy or Download.
 */
(function(){
"use strict";
const C=window.GoldenAgeCore,$=s=>document.querySelector(s);
const state=C.makeState();
const SVG="http://www.w3.org/2000/svg";
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let view="intro",current=null,travelTimer=0;

function el(tag,attrs,...kids){
 const n=document.createElement(tag);
 for(const k in attrs||{}){if(k==="class")n.className=attrs[k];else if(k==="text")n.textContent=attrs[k];else n.setAttribute(k,attrs[k]);}
 for(const kid of kids)n.append(kid);
 return n;
}
function show(name,focus){
 view=name;
 for(const v of ["intro","map","place","notebook"])$("#view-"+v).hidden=v!==name;
 $("#open-notebook").hidden=name==="intro";
 window.scrollTo(0,0);
 const target=focus||$("#view-"+name+" h1")||$("#map");
 target.focus({preventScroll:true});
}

/* ---------- map ---------- */
function blob(cx,cy,rx,ry,k){
 let d="";
 for(let i=0;i<36;i++){
  const a=i/36*Math.PI*2,w=1+.08*Math.sin(3*a+k)+.05*Math.sin(5*a+k*2);
  d+=(i?"L":"M")+(cx+Math.cos(a)*rx*w).toFixed(1)+","+(cy+Math.sin(a)*ry*w).toFixed(1);
 }
 return d+"Z";
}
function drawMap(){
 const hills=[[480,285,[150,105,62]],[265,212,[105,62]],[870,455,[150,100,55]],[150,170,[120,80,42]],[790,90,[110,64]]];
 hills.forEach(([x,y,rings],h)=>rings.forEach((r,i)=>{
  const p=document.createElementNS(SVG,"path");p.setAttribute("class","contour");p.setAttribute("d",blob(x,y,r,r*.62,h*1.7+i*.4));$("#contours").append(p);
 }));
 for(const p of C.PLACES){
  const f=document.createElementNS(SVG,"ellipse");
  f.setAttribute("class","fog");f.setAttribute("cx",p.x);f.setAttribute("cy",p.y-28);f.setAttribute("rx",120);f.setAttribute("ry",95);f.dataset.place=p.id;
  $("#fog").append(f);
  const pinBtn=el("button",{class:"pin",type:"button","data-place":p.id,style:"left:"+p.x/10+"%;top:"+(p.y/C.MAP.h*100)+"%"},String(p.n),el("span",{text:p.short}));
  pinBtn.addEventListener("click",()=>travel(p.id));
  $("#pins").append(pinBtn);
  const row=el("button",{type:"button","data-place":p.id},el("b",{text:String(p.n)}),el("span",{text:p.title}),el("small"));
  row.addEventListener("click",()=>travel(p.id));
  $("#places").append(el("li",null,row));
 }
}
function placeState(p){return C.isComplete(state,p.id)?"done":C.isUnlocked(state,p.id)?"open":"locked";}
function renderMap(){
 for(const p of C.PLACES){
  const s=placeState(p);
  const pinBtn=$('.pin[data-place="'+p.id+'"]');
  pinBtn.className="pin "+s;
  pinBtn.setAttribute("aria-label",p.n+". "+p.title+", "+s);
  const row=$('#places button[data-place="'+p.id+'"]');
  row.querySelector("small").textContent=s==="done"?"Done":s==="open"?"Open":"Locked";
  row.setAttribute("aria-disabled",s==="locked"?"true":"false");
  $('.fog[data-place="'+p.id+'"]').classList.toggle("lift",s!=="locked");
 }
 const me=$("#me");me.style.left=state.pos.x/10+"%";me.style.top=(state.pos.y/C.MAP.h*100)+"%";
 $("#count").textContent=C.doneCount(state)+" of "+C.PLACES.length;
 const near=C.nearest(state.pos);
 let msg;
 if(!near){
  const atStart=Math.hypot(state.pos.x-C.MAP.start.x,state.pos.y-C.MAP.start.y)<40;
  msg=atStart?"The overlook. "+C.QUESTION+" Walk to the Acropolis, pin 1.":"Open ground. Walk to a numbered pin.";
 }else if(!C.isUnlocked(state,near.id))msg=near.title+". "+C.lockReason(state,near.id);
 else if(C.isComplete(state,near.id))msg=near.title+" is done. You can look again.";
 else msg="You are at "+near.title+". Press Enter or choose Inspect.";
 if(C.canWrite(state))msg+=" All five places are done. Open your notebook.";
 $("#status").textContent=msg;
 $("#inspect").disabled=!(near&&C.isUnlocked(state,near.id));
}
function travel(id){
 const p=C.byId(id);
 state.pos={x:p.x,y:p.y};
 renderMap();
 clearTimeout(travelTimer);
 if(C.isUnlocked(state,id))travelTimer=setTimeout(()=>openPlace(id),reduce?0:320);
}
function inspect(){
 const near=C.nearest(state.pos);
 if(near&&C.isUnlocked(state,near.id))openPlace(near.id);
}

/* ---------- evidence cards ---------- */
function card(item,placeId){
 const li=el("li",{class:"card"+(item.empty?" empty":"")},
  el("h3",{text:item.title}),
  el("p",{class:"meta",text:C.LABELS[item.kind]+" · Lesson "+item.lesson.slice(1)}),
  el("p",{text:item.text}),
  el("p",{class:"cite",text:item.cite}));
 if(placeId){
  const b=el("button",{class:"btn ghost",type:"button","data-item":item.id});
  b.addEventListener("click",()=>{C.pin(state,placeId,item.id);renderPins();placeStatus();});
  li.append(b);
 }
 return li;
}
function renderPins(){
 for(const b of document.querySelectorAll("#place-cards button")){
  const on=state.pins[current]===b.dataset.item;
  b.setAttribute("aria-pressed",on?"true":"false");
  b.textContent=on?"Pinned to notebook":"Pin to notebook";
 }
}
function placeStatus(){
 const p=C.byId(current),n=Object.keys(state.sorted[current]||{}).length;
 let msg="Sorted "+n+" of "+p.sort.length+". "+(state.pins[current]?"One card pinned.":"No card pinned yet.");
 if(C.isComplete(state,current))msg+=C.canWrite(state)?" That was the last place. Open your notebook.":" This place is done. Head back to the map.";
 $("#place-status").textContent=msg;
 $("#count").textContent=C.doneCount(state)+" of "+C.PLACES.length;
}
function sortRow(p,s){
 const fb=el("p",{class:"fb",role:"status"});
 const bins=el("div",{class:"bins",role:"group","aria-label":"Sort this statement"});
 const li=el("li",null,el("p",{class:"stmt",text:s.text}),bins,fb);
 const solved=()=>{
  for(const b of bins.children){b.disabled=true;b.setAttribute("aria-pressed",b.dataset.bin===s.bin?"true":"false");}
 };
 for(const bin of C.BINS){
  const b=el("button",{class:"btn ghost",type:"button","data-bin":bin.id,text:bin.title});
  b.addEventListener("click",()=>{
   const r=C.sortAnswer(state,p.id,s.id,bin.id);
   fb.className="fb "+(r.correct?"good":"bad");
   fb.replaceChildren(el("b",{text:r.correct?"Yes: "+r.bin.toLowerCase()+". ":"Not quite. "}),r.correct?r.why:"Think about where this knowledge comes from, then try again.");
   if(r.correct){solved();placeStatus();}
  });
  bins.append(b);
 }
 if((state.sorted[p.id]||{})[s.id]){solved();fb.className="fb good";fb.replaceChildren(el("b",{text:"Yes: "+C.BINS.find(b=>b.id===s.bin).title.toLowerCase()+". "}),s.why);}
 return li;
}
function openPlace(id){
 const p=C.byId(id);current=id;
 $("#place-title").textContent=p.title;
 $("#place-meta").textContent="Place "+p.n+" of "+C.PLACES.length+" · Lesson "+p.lesson.slice(1);
 $("#place-intro").textContent=p.intro;
 $("#place-cards").replaceChildren(...p.items.map(i=>card(i,id)));
 $("#place-sort").replaceChildren(...p.sort.map(s=>sortRow(p,s)));
 renderPins();placeStatus();
 show("place");
}

/* ---------- notebook ---------- */
function openNotebook(){
 const pins=C.pinned(state),ready=C.canWrite(state);
 $("#nb-meta").textContent=C.doneCount(state)+" of "+C.PLACES.length+" places done · "+pins.length+" cards pinned";
 $("#nb-cards").replaceChildren(...pins.map(x=>card(x.item)));
 $("#nb-locked").textContent=ready?"":"Your answer opens when all five places are done. Each place needs every statement sorted and one card pinned.";
 $("#nb-write").hidden=!ready;
 show("notebook");
}
function report(){return C.buildReport(state,$("#nb-name").value,$("#nb-text").value);}
function setupNotebook(){
 for(const c of C.CHECKLIST)$("#nb-checks").append(el("li",{text:c}));
 for(const s of C.STARTERS){
  const b=el("button",{class:"btn ghost",type:"button",text:s.trim()+" …"});
  b.addEventListener("click",()=>{
   const t=$("#nb-text"),at=t.selectionStart,before=t.value.slice(0,at);
   const add=(before&&!/\s$/.test(before)?" ":"")+s;
   t.value=before+add+t.value.slice(t.selectionEnd);
   t.focus();t.selectionStart=t.selectionEnd=at+add.length;
  });
  $("#nb-starters").append(b);
 }
 $("#copy").addEventListener("click",()=>{
  const say=m=>{$("#nb-status").textContent=m;};
  if(!navigator.clipboard||!navigator.clipboard.writeText){say("Copy isn't available here. Choose Download.");return;}
  navigator.clipboard.writeText(report()).then(()=>say("Copied. Paste it where your teacher asked."),()=>say("Copy isn't available here. Choose Download."));
 });
 $("#download").addEventListener("click",()=>{
  const url=URL.createObjectURL(new Blob([report()],{type:"text/plain"}));
  const a=el("a",{href:url,download:"whose-golden-age.txt"});
  document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1200);
  $("#nb-status").textContent="Downloaded whose-golden-age.txt.";
 });
}

/* ---------- controls ---------- */
const KEYS={arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1],arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0]};
document.addEventListener("keydown",e=>{
 if(e.metaKey||e.ctrlKey||e.altKey)return;
 if(e.key==="Escape"){if(view==="place"||view==="notebook"){renderMap();show("map",$("#map"));}return;}
 if(view!=="map")return;
 const tag=e.target.tagName,k=e.key.toLowerCase();
 if(tag==="INPUT"||tag==="TEXTAREA")return;
 if(KEYS[k]){
  e.preventDefault();clearTimeout(travelTimer);
  state.pos=C.move(state.pos,KEYS[k][0]*C.MAP.step,KEYS[k][1]*C.MAP.step);
  renderMap();
 }else if(k==="e"||(k==="enter"&&tag!=="BUTTON"&&tag!=="A")){e.preventDefault();inspect();}
});
$("#start").addEventListener("click",()=>{renderMap();show("map",$("#map"));});
$("#inspect").addEventListener("click",inspect);
$("#back-map").addEventListener("click",()=>{renderMap();show("map",$("#map"));});
$("#nb-back").addEventListener("click",()=>{renderMap();show("map",$("#map"));});
$("#open-notebook").addEventListener("click",openNotebook);
$("#big").addEventListener("click",e=>{
 const on=document.documentElement.classList.toggle("big");
 e.currentTarget.setAttribute("aria-pressed",on?"true":"false");
});
window.addEventListener("beforeunload",e=>{if($("#nb-text").value.trim())e.preventDefault();});
drawMap();setupNotebook();renderMap();
})();
