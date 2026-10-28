/* Giza harbour investigation: exploration, clues, characters, reports and movement. */
const Q=window.HarbourQuest,W=window.HarbourWorld;
if(!Q||!W)throw Error("Harbour modules are missing");
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const state=Q.start(),player={x:4,z:0,pitch:0,moving:false},held=new Set(),touch=new Set();
const refs=[...Q.EVIDENCE.map(x=>Object.assign({label:x.short,type:"evidence"},x)),...Q.CHARACTERS.map(x=>Object.assign({label:x.name,type:"person"},x))];
let world=null,active=false,modal="",first=false,heading=-Math.PI/2,near=null,loaded=false,paintFallback=null,drag=null,last=0;
let toastTimer;
function toast(message){
 const el=$("#toast");el.textContent=message;el.hidden=false;clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>el.hidden=true,2100);
}
function show(id){$(id).hidden=false;modal=id;}
function hide(id){$(id).hidden=true;modal="";}
function updateJournal(){
 $("#progress").innerHTML=Q.EVIDENCE.map(e=>'<span class="'+(state.found.includes(e.id)?"ok":"")+'"></span>').join("");
 $("#badge-count").textContent=state.found.length+"/5";
 $("#clue-count").textContent=state.found.length+"/5";
 $("#talk-count").textContent=state.interviews.length+"/3";
 const ready=Q.canConclude(state),done=state.stage==="complete";
 $("#objective-title").textContent=done?"Case solved":ready?"Present your findings":state.found.length>=2?"Follow the evidence":"Find the missing limestone";
 $("#objective-detail").textContent=done?"Open the journal and export your explanation.":ready?"You've investigated enough to present a theory. Open your journal.":"Find at least three clues and speak to two workers. Compare records with physical evidence.";
 $("#clues").innerHTML=Q.EVIDENCE.map(e=>{const seen=state.found.includes(e.id);
   return '<li class="'+(seen?"seen":"")+'"><b>'+(seen?"✓ ":"◌ ")+esc(e.name)+'</b><small>'+
     (seen?esc(e.observation):"Not yet inspected")+'</small>'+
     (seen?'<small><em>Limitation:</em> '+esc(e.context)+'</small>':"")+'</li>';
 }).join("");
 $("#interviews").innerHTML=Q.CHARACTERS.map(p=>'<li>'+esc(p.name)+" · "+esc(p.title)+(state.interviews.includes(p.id)?" ✓":"")+'</li>').join("");
 $("#start-verdict").disabled=!ready;
 $("#start-verdict").textContent=done?"Review your solved case":"Present your findings";
}
function report(){
 const text=["THE MISSING STONE SHIPMENT — FIELD REPORT","Giza, Fourth Dynasty (c. 2550 BCE). Fictional mystery; grounded in the study of Old Kingdom transport and administration.",
 "Clues:",...Q.EVIDENCE.map(e=>(state.found.includes(e.id)?"[x] ":"[ ] ")+e.name+(state.found.includes(e.id)?" — "+e.observation:"")),
 "People interviewed: "+state.interviews.map(id=>Q.person(id)?.name).join(", "),
 "My explanation: "+(Q.VERDICTS.find(v=>v.id===state.verdict)?.label||"Not submitted"),
 "Evidence cited: "+state.selected.map(id=>Q.find(id)?.name).join(", "),
 "Reasoning: "+(state.reason||"Not submitted"),
 "Sledge hauling experiment: "+(state.haulCompleted?"Completed":"Not yet completed"),
 "My field notes: "+($("#field-notes").value||"None"),
 "Historical limitation: No dialogue, cargo record or day-of-shipment event in this simulation is an original ancient source.",
 ...Q.RESEARCH.map(r=>r.title+" — "+r.url)];
 return text.join("\n\n")+"\n";
}
$("#copy-notes").onclick=()=>{
 if(!navigator.clipboard?.writeText){$("#report-status").textContent="Clipboard unavailable; download the report instead.";return;}
 navigator.clipboard.writeText(report()).then(()=>$("#report-status").textContent="Report copied.").catch(()=>$("#report-status").textContent="Clipboard blocked; download instead.");
};
$("#download-notes").onclick=()=>{
 const url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="giza-stone-shipment-report.txt";document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1500);
 $("#report-status").textContent="Downloaded. Submit via your teacher's approved classroom method.";
};
function openJournal(){
 if(!active||modal)return;
 updateJournal();show("#journal");$("#journal-close").focus();
}
function closeJournal(){hide("#journal");$("#journal-open").focus();}
$("#journal-open").onclick=()=>$("#journal").hidden?openJournal():closeJournal();
$("#journal-close").onclick=closeJournal;
function closeDialogue(){hide("#conversation");$("#journal-open").focus();}
$("#dialog-exit").onclick=closeDialogue;
function inspect(e){
 Q.inspect(state,e.id);updateJournal();
 $("#dialog-tag").textContent="Material evidence · "+e.short;
 $("#dialog-title").textContent=e.name;
 $("#dialog-role").textContent="An observation in a fictional reconstruction";
 $("#dialog-portrait").style.background="radial-gradient(circle at center,#d0ae7e 0 30%,transparent 31%),linear-gradient(130deg,#345b59,#143038)";
 $("#dialog-copy").innerHTML='<div class="evidence-box"><span class="tag">What you find</span><p>'+esc(e.observation)+'</p></div>'+
 '<div class="evidence-box"><span class="tag">What history supports / cannot confirm</span><p>'+esc(e.context)+'</p></div><p><strong>Investigate:</strong> '+esc(e.question)+'</p>';
 $("#dialog-actions").innerHTML='<button type="button" class="choice" id="reflect">Consider an interpretation</button>';
 $("#reflect").onclick=()=>{
  $("#dialog-copy").insertAdjacentHTML("beforeend",'<div class="talk"><strong>Possible inference:</strong> '+esc(e.lead)+'</div>');
  $("#dialog-actions").innerHTML="";
 };
 if(e.id==="tracks"){
  const sledge=Q.newHaul();
  const html='<section class="evidence-box" id="haul-lab"><span class="tag">Playable engineering experiment · optional</span>'+
    '<h3>Help haul a limestone block</h3>'+
    '<p>Experiment with wetting the sand and pulling the sledge. Some water can reduce sliding resistance, but too much is not better. This is a <strong>qualitative game model</strong>, not a measurement from 2550 BCE.</p>'+
    '<label for="haul-water">Water added: <strong id="haul-reading">0%</strong></label>'+
    '<input style="display:block;width:100%;accent-color:#e7c58a" id="haul-water" type="range" min="0" max="100" step="1" value="0">'+
    '<p id="haul-progress" role="status">Sledge distance: 0 / 100 units</p>'+
    '<div style="height:16px;border:1px solid #8b9f92;border-radius:8px;overflow:hidden;background:#203d3e"><div id="haul-bar" style="height:100%;width:0;background:#ddb97b"></div></div>'+
    '<button type="button" id="haul-pull" class="btn primary" style="margin-top:12px">Pull the rope</button>'+
    '<p id="haul-feedback" class="small">Try dry sand first. How many pulls does it take?</p>'+
    '<p class="small"><a style="color:#efd39c" href="https://doi.org/10.1103/PhysRevLett.112.175502" target="_blank" rel="noopener noreferrer">Fall et al. (2014) — friction experiments on wet and dry sand</a></p></section>';
  $("#dialog-copy").insertAdjacentHTML("beforeend",html);
  $("#haul-water").oninput=e=>$("#haul-reading").textContent=e.target.value+"%";
  $("#haul-pull").onclick=()=>{
    const result=Q.haul(sledge,Number($("#haul-water").value));
    $("#haul-progress").textContent="Sledge distance: "+result.progress+" / 100 units after "+sledge.pulls+" pulls";
    $("#haul-bar").style.width=result.progress+"%";
    $("#haul-feedback").textContent=result.note;
    if(world?.setHaulProgress)world.setHaulProgress(result.progress/100);
    if(result.done){$("#haul-pull").disabled=true;$("#haul-pull").textContent="Sledge moved ✓";state.haulCompleted=true;toast("ENGINEERING CHALLENGE COMPLETE");}
  };
 }
 show("#conversation");$("#dialog-exit").focus();
}
function speak(p){
 Q.interview(state,p.id);updateJournal();
 $("#dialog-tag").textContent="Fictional historical-role character";
 $("#dialog-title").textContent=p.name;$("#dialog-role").textContent=p.title+" · fictional composite";
 $("#dialog-portrait").style.background="radial-gradient(circle at 50% 36%,#ad7755 0 18%,transparent 19%),linear-gradient(160deg,#bda683 48%,#24494f 49%)";
 $("#dialog-copy").innerHTML='<div class="talk">'+esc(p.first)+'</div><p class="small">Ask about their work and check what you hear against the evidence.</p>';
 $("#dialog-actions").innerHTML=p.options.map((o,i)=>'<button type="button" class="choice" data-ask="'+i+'">'+esc(o.text)+'</button>').join("");
 $("#dialog-actions").querySelectorAll("[data-ask]").forEach(button=>button.onclick=()=>{
  const o=p.options[Number(button.dataset.ask)];
  $("#dialog-copy").innerHTML='<div class="talk"><strong>You:</strong> '+esc(o.text)+'</div>'+
   '<div class="talk"><strong>'+esc(p.name)+':</strong> '+esc(o.reply)+'</div>'+
   (o.unlocks?'<p class="small">Lead: look near '+esc(Q.find(o.unlocks)?.name||"the harbour")+'.</p>':"");
  button.disabled=true;button.textContent="✓ "+o.text;
 });
 show("#conversation");$("#dialog-exit").focus();
}
function interact(target=near){
 if(!active||modal||!target)return;
 if(target.type==="person")speak(Q.person(target.id));
 else inspect(Q.find(target.id));
}
$("#prompt").onclick=()=>interact();
$("#interact-mobile").onclick=()=>interact();
function updateNear(){
 if(!active||modal)return;
 const nearby=refs.map(x=>({item:x,d:Q.distance(player,x)}))
  .filter(x=>x.d<=Math.min(x.range||9,x.type==="person"?11:12))
  .sort((a,b)=>a.d-b.d)[0];
 near=nearby?.item||null;
 $("#prompt").hidden=!near;
 $("#interact-mobile").disabled=!near;
 $("#interact-mobile").textContent=near?(near.type==="person"?"Talk":"Inspect"):"Inspect";
 if(near)$("#prompt-title").textContent=(near.type==="person"?"Speak with ":"Inspect ")+near.name;
}
function openVerdict(){
 if(!Q.canConclude(state)){toast("Find 3 clues and speak to 2 people first.");return;}
 $("#journal").hidden=true;
 $("#verdicts").innerHTML=Q.VERDICTS.map(v=>
  '<label><input type="radio" name="verdict" value="'+v.id+'"><span>'+esc(v.label)+'</span></label>').join("");
 $("#case-file").innerHTML=Q.EVIDENCE.filter(e=>state.found.includes(e.id)).map(e=>
  '<label><input type="checkbox" name="support" value="'+e.id+'"><span>'+esc(e.name)+'</span></label>').join("");
 $("#reason").value=state.reason||"";
 $("#feedback").hidden=true;
 $("#submit-case").disabled=false;$("#submit-case").textContent="Submit explanation";
 show("#conclude");$("#reason").focus();
}
$("#start-verdict").onclick=openVerdict;
$("#back-journal").onclick=()=>{hide("#conclude");openJournal();};
$("#submit-case").onclick=()=>{
 const verdict=$("#verdicts input:checked")?.value;
 if(!verdict){$("#feedback").textContent="Choose a possible explanation.";$("#feedback").hidden=false;return;}
 const selected=[...document.querySelectorAll("#case-file input:checked")].map(x=>x.value);
 const result=Q.conclude(state,verdict,selected,$("#reason").value);
 $("#feedback").textContent=result.message;$("#feedback").hidden=false;
 if(result.ok){
  $("#submit-case").disabled=true;$("#submit-case").textContent="Case solved ✓";
  updateJournal();toast("CASE SOLVED · EVIDENCE SUPPORTED");
 }else if(result.needsRevision)toast("Review the evidence and revise your conclusion.");
};
$("#travel-tools").onclick=()=>{
 const box=$("#travel-list");box.hidden=!box.hidden;
 if(box.hidden)return;
 box.innerHTML='<p>Fast travel is provided for accessible exploration. You still have to inspect evidence and speak with people.</p>'+
 refs.map(x=>'<button type="button" class="choice" data-fast="'+x.id+'">'+esc(x.name)+' · '+(x.type==="person"?"Interview":"Inspect")+'</button>').join("");
 box.querySelectorAll("[data-fast]").forEach(button=>button.onclick=()=>{
  const o=refs.find(x=>x.id===button.dataset.fast);
  const offset=o.id==="tracks"?{x:-4,z:0}:{x:4,z:4};
  const next=Q.safeMove(player,o.x+offset.x-player.x,o.z+offset.z-player.z);
  player.x=next.x;player.z=next.z;heading=Math.atan2(o.x-player.x,player.z-o.z);
  closeJournal();updateNear();toast("Arrived near "+o.name+". Use Inspect or Talk.");
 });
};
$("#camera").onclick=()=>{
 if(!world)return;
 first=!first;$("#camera").textContent=first?"First person":"Third person";
 $("#camera").setAttribute("aria-pressed",String(first));toast(first?"First-person view":"Third-person view");
};
function movement(dt){
 player.moving=false;if(!active||modal)return;
 const forward=Number(held.has("w")||held.has("arrowup")||touch.has("forward"))-
    Number(held.has("s")||held.has("arrowdown")||touch.has("back"));
 const side=Number(held.has("d")||held.has("arrowright")||touch.has("right"))-
    Number(held.has("a")||held.has("arrowleft")||touch.has("left"));
 if(!forward&&!side)return;
 const n=Math.hypot(forward,side)||1,speed=(held.has("shift")?27:15)*Math.min(.06,dt);
 const dx=(Math.sin(heading)*forward+Math.cos(heading)*side)/n*speed;
 const dz=(-Math.cos(heading)*forward+Math.sin(heading)*side)/n*speed;
 const next=Q.safeMove(player,dx,dz);
 player.moving=Math.hypot(next.x-player.x,next.z-player.z)>.00001;
 player.x=next.x;player.z=next.z;
}
document.addEventListener("keydown",e=>{
 if(["TEXTAREA","INPUT","SELECT"].includes(document.activeElement?.tagName))return;
 const key=e.key.toLowerCase();
 if(["w","a","s","d","e","j","v","arrowup","arrowdown","arrowleft","arrowright"].includes(key))e.preventDefault();
 if(key==="escape"&&modal){
  if(modal==="#journal")closeJournal();
  else if(modal==="#conversation")closeDialogue();
  else if(modal==="#conclude")hide("#conclude");
  return;
 }
 if(!active)return;
 held.add(key);
 if(e.repeat)return;
 if(key==="e")interact();
 if(key==="j"&&!modal)openJournal();
 if(key==="v"&&!modal)$("#camera").click();
});
document.addEventListener("keyup",e=>held.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>{held.clear();touch.clear();drag=null;});
if(matchMedia("(pointer:coarse)").matches){$("#touch").hidden=false;$("#interact-mobile").hidden=false;}
for(const button of document.querySelectorAll("[data-move]")){
 button.addEventListener("pointerdown",e=>{e.preventDefault();touch.add(button.dataset.move);button.setPointerCapture(e.pointerId);});
 for(const evt of ["pointerup","pointercancel","lostpointercapture"])button.addEventListener(evt,()=>touch.delete(button.dataset.move));
}
function bindScene(canvas){
 canvas.addEventListener("pointerdown",e=>{
  if(!active||modal)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};
  canvas.setPointerCapture(e.pointerId);
 });
 canvas.addEventListener("pointermove",e=>{
  if(!drag||drag.id!==e.pointerId||!active||modal)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(Math.abs(dx)+Math.abs(dy)>2)drag.moved=true;
  heading-=dx*.0044;
  player.pitch=Math.max(-.37,Math.min(.37,player.pitch+dy*.003));
  drag.x=e.clientX;drag.y=e.clientY;
 });
 canvas.addEventListener("pointerup",e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const moved=drag.moved;drag=null;
  if(moved||!world||!active||modal)return;
  const id=world.pick(e.clientX,e.clientY),target=refs.find(x=>x.id===id);
  if(target&&Q.distance(player,target)<=Math.min(target.range||9,target.type==="person"?11:12))interact(target);
  else if(target)toast("Walk closer or use accessible travel.");
 });
 canvas.addEventListener("pointercancel",()=>drag=null);
}
const map=$("#map"),ctx=map.getContext("2d");
function drawMap(){
 if(!ctx)return;
 const w=map.width,h=map.height,xx=x=>12+(x+60)/172*(w-24),zz=z=>12+(z+105)/214*(h-24);
 ctx.fillStyle="#b98d62";ctx.fillRect(0,0,w,h);
 ctx.fillStyle="#3a7a84";ctx.fillRect(0,0,xx(-57),h);
 for(const z of [-39,54]){ctx.fillStyle="#785338";ctx.fillRect(xx(-73),zz(z)-4,37,8);}
 for(const p of Q.EVIDENCE){
  ctx.beginPath();ctx.fillStyle=state.found.includes(p.id)?"#9bd8b0":"#ffe0a1";
  ctx.arc(xx(p.x),zz(p.z),5,0,Math.PI*2);ctx.fill();
 }
 for(const p of Q.CHARACTERS){ctx.beginPath();ctx.fillStyle="#81c8d4";ctx.arc(xx(p.x),zz(p.z),3,0,Math.PI*2);ctx.fill();}
 ctx.save();ctx.translate(xx(player.x),zz(player.z));ctx.rotate(heading);
 ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(-6,7);ctx.lineTo(6,7);ctx.closePath();ctx.fill();ctx.restore();
 ctx.font="bold 12px sans-serif";ctx.fillStyle="#fff";ctx.fillText("N ↑",w-38,15);
}
function fallback(){
 $("#camera").disabled=true;$("#camera").textContent="Overhead mode";
 const board=document.createElement("canvas");board.width=1100;board.height=760;
 board.style.cssText="width:100%;height:100%;object-fit:contain;display:block;background:#d3b081";
 $("#scene").replaceChildren(board);
 const paint=board.getContext("2d"),xy=p=>({x:(p.x+90)/220*board.width,y:(p.z+105)/210*board.height});
 board.addEventListener("pointerup",e=>{
  if(!active||modal)return;
  const r=board.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*board.width,y=(e.clientY-r.top)/r.height*board.height;
  const hit=refs.map(o=>({o,d:Math.hypot(x-xy(o).x,y-xy(o).y)})).sort((a,b)=>a.d-b.d)[0];
  if(hit?.d<35){
   const p=Q.safeMove(player,hit.o.x+3-player.x,hit.o.z+3-player.z);
   Object.assign(player,p);updateNear();
  }
 });
 paintFallback=()=>{
  if(!paint)return;
  paint.fillStyle="#d3aa79";paint.fillRect(0,0,board.width,board.height);
  paint.fillStyle="#3b7c88";paint.fillRect(0,0,xy({x:-58,z:0}).x,board.height);
  for(const z of [-39,54]){const p=xy({x:-73,z});paint.fillStyle="#8d6347";paint.fillRect(p.x-22,p.y-19,108,38);}
  for(const o of refs){
   const p=xy(o);paint.fillStyle=o.type==="person"?"#3e8192":state.found.includes(o.id)?"#468861":"#986b29";
   paint.beginPath();paint.arc(p.x,p.y,11,0,Math.PI*2);paint.fill();
   paint.fillStyle="#173039";paint.font="bold 20px sans-serif";paint.fillText(o.label,p.x+15,p.y-9);
  }
  const p=xy(player);paint.beginPath();paint.arc(p.x,p.y,11,0,Math.PI*2);paint.fillStyle="#fff";paint.fill();
 };
}
function frame(now){
 const dt=last?Math.min(.06,(now-last)/1000):0;last=now;
 movement(dt);updateNear();
 if(world&&active)world.render(dt,player,heading,first,!!modal);
 if(paintFallback)paintFallback();
 drawMap();requestAnimationFrame(frame);
}
$("#start-help").onclick=()=>{
 $("#start .teaser").innerHTML="<strong>Controls:</strong> WASD/arrow keys walk, mouse drag looks, E inspects, J opens journal, V switches first/third person, Shift runs. On mobile use arrow pad and Inspect. Accessible travel is in Journal. No combat or timers.";
};
$("#start-button").onclick=()=>{
 if(!loaded)return;$("#start").hidden=true;active=true;
 updateJournal();toast("GIZA · NORTH RIVER LANDING · c. 2550 BCE");
};
async function boot(){
 try{
  const THREE=await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
  world=W.create(THREE,$("#scene"),refs);bindScene(world.canvas);
  $("#ready").textContent="3D harbour ready · procedurally textured scene";
 }catch(e){
  console.warn("3D harbour unavailable, using overhead mode:",e?.message||e);
  fallback();$("#ready").textContent="Overhead mode ready · 3D not available on this connection";
 }
 loaded=true;$("#start-button").disabled=false;$("#start-button").textContent="Begin investigation";
}
updateJournal();drawMap();requestAnimationFrame(frame);boot();
