/* Whose Golden Age? A Walk Through Athens: the game page.
 * A tile world drawn as inline SVG. All work stays in this page's memory.
 * Nothing is stored or sent; writing leaves only by Copy or Download.
 */
(function(){
"use strict";
const C=window.GoldenAgeCore,$=s=>document.querySelector(s);
const state=C.makeState();
const NS="http://www.w3.org/2000/svg",TS=C.TILE;
const WALK=170,AUTO=380;
const announced=new Set();
let view="intro",current=null,slipDone=null;
let path=null,onArrive=null,last=0,near=null;
const held=new Set();

function el(tag,attrs,...kids){
 const n=document.createElement(tag);
 for(const k in attrs||{}){if(k==="class")n.className=attrs[k];else if(k==="text")n.textContent=attrs[k];else n.setAttribute(k,attrs[k]);}
 for(const kid of kids)n.append(kid);
 return n;
}
function svg(tag,attrs,parent){
 const n=document.createElementNS(NS,tag);
 for(const k in attrs||{}){if(k==="text")n.textContent=attrs[k];else n.setAttribute(k,attrs[k]);}
 if(parent)parent.append(n);
 return n;
}
function show(name,focus){
 view=name;held.clear();
 for(const v of ["intro","game","place","notebook"])$("#view-"+v).hidden=v!==name;
 $("#open-notebook").hidden=name==="intro";
 window.scrollTo(0,0);
 if(name==="game"){renderHud();camera();}
 (focus||$("#view-"+name+" h1")||$("#stage")).focus({preventScroll:true});
}
function toGame(){show("game",$("#stage"));}

/* ---------- drawing the world ---------- */
const world=$("#world");
function drawWorld(){
 const w=C.W*TS,h=C.H*TS;
 world.setAttribute("width",w);world.setAttribute("height",h);world.setAttribute("viewBox","0 0 "+w+" "+h);
 svg("rect",{class:"t-ground",width:w,height:h},world);
 const d={};
 C.GRID.forEach((row,y)=>row.forEach((t,x)=>{if(t!==C.T.ground&&t!==C.T.tree&&t!==C.T.gate)d[t]=(d[t]||"")+"M"+x*TS+","+y*TS+"h"+TS+"v"+TS+"h-"+TS+"z";}));
 for(const [t,cls] of [[C.T.sea,"t-sea"],[C.T.hill,"t-hill"],[C.T.plaza,"t-plaza"],[C.T.road,"t-road"]])svg("path",{class:cls,d:d[t]||""},world);
 svg("path",{class:"t-road",d:"M"+C.GATE.tx*TS+","+C.GATE.ty*TS+"h"+TS+"v"+TS+"h-"+TS+"z"},world);
 /* hatch marks on hills, waves on the sea, trees */
 let hatch="",waves="";
 C.GRID.forEach((row,y)=>row.forEach((t,x)=>{
  const px=x*TS,py=y*TS;
  if(t===C.T.hill&&(x+y)%2===0)hatch+="M"+(px+6)+","+(py+22)+"q10,-14 20,0";
  if(t===C.T.sea&&(x+y*2)%5===0)waves+="M"+(px+4)+","+(py+16)+"q6,-6 12,0t12,0";
  if(t===C.T.tree){svg("path",{class:"ink",d:"M"+(px+16)+","+(py+20)+"v10"},world);svg("circle",{class:"tree",cx:px+16,cy:py+13,r:11},world);}
 }));
 svg("path",{class:"contour",d:hatch},world);svg("path",{class:"wave",d:waves},world);
 /* buildings: tile rectangles */
 const box=(x0,y0,x1,y1)=>svg("rect",{class:"t-wall",x:x0*TS+3,y:y0*TS+3,width:(x1-x0+1)*TS-6,height:(y1-y0+1)*TS-6},world);
 const cols=(x0,y0,x1,y1)=>{let p="";for(let x=x0*TS+14;x<(x1+1)*TS-8;x+=14)p+="M"+x+","+(y0*TS+9)+"V"+((y1+1)*TS-9);svg("path",{class:"ink",d:p},world);};
 box(30,20,35,21);cols(30,20,35,21);box(30,16,31,17);cols(30,16,31,17);
 box(12,9,13,9);box(26,3,29,5);box(48,9,53,11);box(4,29,5,30);
 svg("path",{class:"ink",d:"M"+(26*TS+3)+","+(4*TS+16)+"H"+(30*TS-3)+"M"+(48*TS+3)+","+(10*TS+16)+"H"+(54*TS-3)},world);
 svg("path",{class:"ink",d:"M"+(4*TS+6)+","+(31*TS-6)+"L"+(5*TS)+","+(29*TS+8)+"L"+(6*TS-6)+","+(31*TS-6)},world);
 /* Assembly steps, the well, the gravestone, the mine entrance */
 svg("path",{class:"ink",d:[70,100,130].map(r=>"M"+(13*TS-r)+","+(10*TS+10)+"a"+r+","+(r*.7)+" 0 0 0 "+(2*r)+",0").join("")},world);
 svg("circle",{class:"inkfill",cx:16*TS+16,cy:14*TS+16,r:13},world);svg("circle",{class:"ink",cx:16*TS+16,cy:14*TS+16,r:6},world);
 svg("path",{class:"inkfill",d:"M"+(35*TS+6)+","+(5*TS-3)+"V"+(4*TS+10)+"l10,-8l10,8V"+(5*TS-3)+"z"},world);
 box(54,25,57,26);svg("path",{class:"ink",d:"M"+(55*TS+8)+","+(27*TS-3)+"v-22a24,22 0 0 1 48,0v22"},world);
 /* labels */
 const cap=(x,y,t,cls)=>svg("text",{class:cls||"cap",x:x*TS,y:y*TS,text:t},world);
 cap(30,22.75,"PARTHENON");cap(29.4,15.75,"ERECHTHEION");cap(3.6,28.6,"CAMP");cap(13.2,37.2,"THE SEA");cap(46.4,27.6,"MINE ROAD");
 for(const p of C.PLACES)cap(p.id==="laurion"?47:p.cx-p.rx+1,p.id==="laurion"?23.2:p.cy+p.ry+(p.id==="acropolis"?.2:1.2),p.n+". "+p.title,"capname");
 /* markers */
 for(const p of C.PLACES)for(const i of p.items){
  const g=svg("g",{class:"marker",transform:"translate("+(i.tx*TS+16)+" "+(i.ty*TS+16)+")"},world);g.dataset.item=i.id;g.dataset.place=p.id;
  svg("path",{class:"pole",d:"M-4,10V-14"},g);svg("path",{class:"flag",d:"M-4,-14H12L7,-9L12,-4H-4z"},g);svg("circle",{cx:-4,cy:10,r:2.2,fill:"var(--ink)"},g);
 }
 /* supervisor at the camp: a present-day figure in a brimmed hat */
 const s=svg("g",{transform:"translate("+(C.CAMP.tx*TS+16)+" "+(C.CAMP.ty*TS+16)+")"},world);
 svg("path",{class:"inkfill",d:"M-7,13V1a7,7 0 0 1 14,0V13z"},s);svg("circle",{class:"inkfill",cx:0,cy:-7,r:5.5},s);svg("path",{class:"ink",d:"M-10,-9H10M-5,-10q5,-8 10,0"},s);
 svg("path",{class:"gate",id:"gate",d:"M"+(C.GATE.tx*TS+16)+","+(C.GATE.ty*TS+2)+"v"+(TS-4)},world);
 /* fog over places that are not open yet */
 const defs=svg("defs",null,world),f=svg("filter",{id:"mist",x:"-30%",y:"-30%",width:"160%",height:"160%"},defs);svg("feGaussianBlur",{stdDeviation:"22"},f);
 const fog=svg("g",{filter:"url(#mist)"},world);
 for(const p of C.PLACES.slice(1)){const e=svg("ellipse",{class:"fog",cx:p.cx*TS+16,cy:p.cy*TS+16,rx:(p.rx+1.5)*TS,ry:(p.ry+1.5)*TS},fog);e.dataset.place=p.id;}
 /* player: a surveyor with a staff */
 const me=svg("g",{id:"me"},world);
 svg("path",{class:"pole",d:"M11,13V-13"},me);svg("path",{d:"M-7,13V2a7,7 0 0 1 14,0V13z",fill:"var(--route)",stroke:"var(--ink)","stroke-width":"1.6"},me);
 svg("circle",{class:"inkfill",cx:0,cy:-6,r:5.5},me);
}
function camera(){
 const st=$("#stage"),vw=st.clientWidth,vh=st.clientHeight,w=C.W*TS,h=C.H*TS;
 const x=vw>=w?(vw-w)/2:Math.min(0,Math.max(vw-w,vw/2-state.pos.x));
 const y=vh>=h?(vh-h)/2:Math.min(0,Math.max(vh-h,vh/2-state.pos.y));
 world.style.transform="translate("+Math.round(x)+"px,"+Math.round(y)+"px)";
 $("#me").setAttribute("transform","translate("+state.pos.x.toFixed(1)+" "+state.pos.y.toFixed(1)+")");
 return {x,y};
}

/* ---------- HUD and side panel ---------- */
function placeLabel(p){
 if(!C.isUnlocked(state,p.id))return "Locked";
 if(C.isComplete(state,p.id))return "Done";
 if(!C.allFound(state,p.id))return Object.keys(state.found[p.id]||{}).length+" of "+p.items.length+" found";
 return "Sort and pin";
}
function renderHud(){
 for(const p of C.PLACES){
  const open=C.isUnlocked(state,p.id),row=$('#places button[data-place="'+p.id+'"]');
  row.querySelector("small").textContent=placeLabel(p);
  row.setAttribute("aria-disabled",open?"false":"true");
  const fog=world.querySelector('.fog[data-place="'+p.id+'"]');if(fog)fog.classList.toggle("lift",open);
  for(const i of p.items){
   const m=world.querySelector('.marker[data-item="'+i.id+'"]');
   m.classList.toggle("found",!!(state.found[p.id]||{})[i.id]);m.classList.toggle("locked",!open);
  }
 }
 $("#gate").classList.toggle("open",C.gateOpen(state));
 $("#count").textContent=C.doneCount(state)+" of "+C.PLACES.length;
 $("#task").textContent=C.task(state);
 near=null;renderPrompt();
}
function target(){
 if(C.nearCamp(state.pos))return {camp:true,label:"Talk to the supervisor"};
 const n=C.nearestItem(state.pos);
 if(!n)return null;
 const found=(state.found[n.place.id]||{})[n.item.id];
 n.sort=!!found&&C.allFound(state,n.place.id)&&!C.isComplete(state,n.place.id);
 n.label=n.sort?"Sort the evidence here":found?"Read again: "+n.item.title:"Inspect the survey marker";
 return n;
}
function renderPrompt(){
 const t=view==="game"&&$("#slip").hidden?target():null,key=t?t.label:"";
 if(key===near)return;
 near=key;$("#act").hidden=!t;$("#act").textContent=key;
}

/* ---------- supervisor and marker cards ---------- */
function slip(title,meta,text,cite,empty,done){
 slipDone=done||null;path=null;held.clear();
 $("#slip-title").textContent=title;$("#slip-meta").textContent=meta;$("#slip-text").textContent=text;
 $("#slip-cite").textContent=cite||"";$("#slip-cite").hidden=!cite;
 $("#slip").classList.toggle("empty",!!empty);$("#slip").hidden=false;renderPrompt();
 $("#slip-ok").focus();
}
function closeSlip(){
 if($("#slip").hidden)return;
 $("#slip").hidden=true;
 const next=slipDone;slipDone=null;
 if(next)next();else if(view==="game")$("#stage").focus({preventScroll:true});
 renderPrompt();
}
function supervisor(line,done){
 const S=C.SUPERVISOR;$("#say").textContent="Supervisor: "+line;
 slip(S.title,S.label+" · "+S.role,line,"",false,done);
}
function act(){
 const t=target();if(!t)return;
 if(t.camp){
  const L=C.SUPERVISOR.lines,line=!state.briefed?L.start:C.canWrite(state)?L.laurion:L.idle;
  state.briefed=true;renderHud();supervisor(line);return;
 }
 const p=t.place,i=t.item;
 if(!C.isUnlocked(state,p.id)){supervisor(C.lockReason(state,p.id));return;}
 if(t.sort){openPlace(p.id);return;}
 const first=!(state.found[p.id]||{})[i.id],r=C.find(state,p.id,i.id);
 renderHud();
 slip(i.title,C.LABELS[i.kind]+" · Lesson "+i.lesson.slice(1)+" · marker "+r.found+" of "+r.of,i.text,i.cite,i.empty,
  first&&r.all?()=>supervisor(C.SUPERVISOR.lines.sort,()=>openPlace(p.id)):null);
}

/* ---------- movement ---------- */
function tileOf(pos){return {tx:Math.floor(pos.x/TS),ty:Math.floor(pos.y/TS)};}
function walkTo(tile,arrive){
 const p=C.findPath(tileOf(state.pos),tile,C.gateOpen(state));
 if(!p){$("#say").textContent=!C.gateOpen(state)&&C.findPath(tileOf(state.pos),tile,true)?"Supervisor: "+C.SUPERVISOR.lines.closed:"You can't walk there.";return false;}
 path=p.slice(1);onArrive=arrive||null;
 if(!path.length){path=null;onArrive=null;if(arrive)arrive();}
 return true;
}
const DIRS={arrowup:[0,-1],w:[0,-1],up:[0,-1],arrowdown:[0,1],s:[0,1],down:[0,1],arrowleft:[-1,0],a:[-1,0],left:[-1,0],arrowright:[1,0],d:[1,0],right:[1,0]};
function frame(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;
 if(view==="game"&&$("#slip").hidden){
  let dx=0,dy=0;
  for(const k of held){dx+=DIRS[k][0];dy+=DIRS[k][1];}
  if(dx||dy){
   path=null;onArrive=null;
   const n=Math.hypot(dx,dy),before=state.pos,g=C.centre(C.GATE);
   state.pos=C.step(state.pos,dx/n*WALK*dt,dy/n*WALK*dt,C.gateOpen(state));
   if(before.x===state.pos.x&&before.y===state.pos.y&&!C.gateOpen(state)&&Math.hypot(g.x-before.x,g.y-before.y)<TS*1.3)$("#say").textContent="Supervisor: "+C.SUPERVISOR.lines.closed;
  }else if(path){
   let budget=AUTO*dt;
   while(path&&budget>0){
    const c=C.centre(path[0]),d=Math.hypot(c.x-state.pos.x,c.y-state.pos.y);
    if(d<=budget){state.pos=c;budget-=d;path.shift();if(!path.length){path=null;const f=onArrive;onArrive=null;if(f)f();}}
    else{state.pos={x:state.pos.x+(c.x-state.pos.x)/d*budget,y:state.pos.y+(c.y-state.pos.y)/d*budget};budget=0;}
   }
  }
  camera();renderPrompt();
 }
 requestAnimationFrame(frame);
}

/* ---------- place view: cards, sort, pin ---------- */
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
function missing(item,n){
 const b=el("button",{class:"btn ghost",type:"button",text:"Walk there"});
 b.addEventListener("click",()=>{toGame();walkTo({tx:item.tx,ty:item.ty},act);});
 return el("li",{class:"card missing"},el("h3",{text:"Marker "+n}),el("p",{text:"Not found yet. It is somewhere at this place."}),b);
}
function renderPins(){
 for(const b of document.querySelectorAll("#place-cards button[data-item]")){
  const on=state.pins[current]===b.dataset.item;
  b.setAttribute("aria-pressed",on?"true":"false");
  b.textContent=on?"Pinned to notebook":"Pin to notebook";
 }
}
function placeStatus(){
 const p=C.byId(current),n=Object.keys(state.sorted[current]||{}).length,all=C.allFound(state,current);
 let msg=all?"Sorted "+n+" of "+p.sort.length+". "+(state.pins[current]?"One card pinned.":"No card pinned yet."):"Found "+Object.keys(state.found[current]||{}).length+" of "+p.items.length+" markers. Sorting opens when you have found them all.";
 if(C.isComplete(state,current))msg+=" This place is done.";
 $("#place-status").textContent=msg;
 $("#count").textContent=C.doneCount(state)+" of "+C.PLACES.length;
}
function sortRow(p,s){
 const fb=el("p",{class:"fb",role:"status"});
 const bins=el("div",{class:"bins",role:"group","aria-label":"Sort this statement"});
 const li=el("li",null,el("p",{class:"stmt",text:s.text}),bins,fb);
 const solved=()=>{for(const b of bins.children){b.disabled=true;b.setAttribute("aria-pressed",b.dataset.bin===s.bin?"true":"false");}};
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
 const p=C.byId(id),all=C.allFound(state,id);current=id;
 $("#place-title").textContent=p.title;
 $("#place-meta").textContent="Place "+p.n+" of "+C.PLACES.length+" · Lesson "+p.lesson.slice(1);
 $("#place-intro").textContent=p.intro;
 $("#place-help").textContent=all?"These are the cards you found. Pin the one you most want for your final answer.":"Find every survey marker at this place. Walk to them on the map, or choose Walk there.";
 $("#place-cards").replaceChildren(...p.items.map((i,n)=>(state.found[id]||{})[i.id]?card(i,all?id:null):missing(i,n+1)));
 $("#place-sortwrap").hidden=!all;
 $("#place-sort").replaceChildren(...(all?p.sort.map(s=>sortRow(p,s)):[]));
 renderPins();placeStatus();
 show("place");
}
function leavePlace(){
 const id=current;
 toGame();
 if(id&&C.isComplete(state,id)&&!announced.has(id)){announced.add(id);supervisor(C.afterPlace(state,id));}
}

/* ---------- notebook ---------- */
function openNotebook(){
 const pins=C.pinned(state),ready=C.canWrite(state);
 $("#nb-meta").textContent=C.doneCount(state)+" of "+C.PLACES.length+" places done · "+pins.length+" cards pinned";
 $("#nb-cards").replaceChildren(...pins.map(x=>card(x.item)));
 $("#nb-locked").textContent=ready?"":"Your answer opens when all five places are done. Each place needs every marker found, every statement sorted and one card pinned.";
 $("#nb-write").hidden=!ready;
 show("notebook");
}
function report(){return C.buildReport(state,$("#nb-name").value,$("#nb-text").value);}
function setup(){
 for(const p of C.PLACES){
  const row=el("button",{type:"button","data-place":p.id},el("b",{text:String(p.n)}),el("span",{text:p.title}),el("small"));
  row.addEventListener("click",()=>{if(C.isUnlocked(state,p.id))openPlace(p.id);else $("#say").textContent=p.title+". "+C.lockReason(state,p.id);});
  $("#places").append(el("li",null,row));
 }
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
document.addEventListener("keydown",e=>{
 if(e.metaKey||e.ctrlKey||e.altKey)return;
 const k=e.key.toLowerCase(),tag=e.target.tagName;
 if(k==="escape"){if(!$("#slip").hidden)closeSlip();else if(view==="place")leavePlace();else if(view==="notebook")toGame();return;}
 if(view!=="game"||!$("#slip").hidden||tag==="INPUT"||tag==="TEXTAREA")return;
 if(DIRS[k]){e.preventDefault();held.add(k);}
 else if(k==="e"||(k==="enter"&&tag!=="BUTTON"&&tag!=="A")){e.preventDefault();act();}
});
document.addEventListener("keyup",e=>held.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>held.clear());
for(const b of document.querySelectorAll("#pad button")){
 const k=b.dataset.dir;
 b.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();held.add(k);});
 for(const ev of ["pointerup","pointerleave","pointercancel"])b.addEventListener(ev,()=>held.delete(k));
}
$("#stage").addEventListener("pointerdown",e=>{
 if(e.target.closest("button")||!$("#slip").hidden)return;
 const r=$("#stage").getBoundingClientRect(),cam=camera();
 const spot={x:e.clientX-r.left-cam.x,y:e.clientY-r.top-cam.y},hit=C.nearestItem(spot,TS);
 if(hit)walkTo({tx:hit.item.tx,ty:hit.item.ty},act);
 else if(C.nearCamp(spot))walkTo({tx:C.CAMP.tx+1,ty:C.CAMP.ty},act);
 else walkTo(tileOf(spot));
});
$("#act").addEventListener("click",act);
$("#slip-ok").addEventListener("click",closeSlip);
$("#start").addEventListener("click",toGame);
$("#back-map").addEventListener("click",leavePlace);
$("#nb-back").addEventListener("click",toGame);
$("#open-notebook").addEventListener("click",openNotebook);
$("#big").addEventListener("click",e=>{
 const on=document.documentElement.classList.toggle("big");
 e.currentTarget.setAttribute("aria-pressed",on?"true":"false");camera();
});
window.addEventListener("resize",camera);
window.addEventListener("beforeunload",e=>{if($("#nb-text").value.trim())e.preventDefault();});
drawWorld();setup();renderHud();requestAnimationFrame(t=>{last=t;frame(t);});
})();
