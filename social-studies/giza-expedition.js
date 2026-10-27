/* Giza Field Expedition. Three.js renderer with playable 2D fallback.
 * Geometry is illustrative, not a surveyed reconstruction.
 * No tracking, accounts, persistent data or teacher answer keys.
 */
const C=window.GizaExpeditionCore;
if(!C)throw Error("Missing Giza expedition content");
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const journal=C.makeJournal(),player={x:76,z:79},held=new Set(),touch=new Set();
let theta=.45,tilt=0,first=false,paused=false,modal=false,worldMode="loading";
let THREE,scene,camera,renderer,avatar,raycaster,figures=[],beacons=[],mapPainter=null,last=0,started=0,drag=null;
const world=$("#world"),holder=$("#render"),minimap=$("#minimap"),nearButton=$("#near-action");
let lastHint="";
const pDist=(p,m)=>C.distance(p,m);
function hint(s){if(lastHint!==s){lastHint=s;$("#status").textContent=s;}}
function report(){
 const out=["Giza Field Expedition | Grade 8","Fourth Dynasty composite c. 2550–2500 BCE; schematic, not to scale.","Investigations completed: "+journal.done.length+"/6"];
 C.MISSIONS.forEach(m=>out.push((journal.done.includes(m.id)?"[x] ":"[ ] ")+m.title+"\n"+m.fact));
 out.push("My field notes:\n"+$("#notes").value.trim(),"People and dialogue are fictional reconstructions.","Sources:",...Object.values(C.SOURCES).map(x=>x.name+" | "+x.url));
 return out.join("\n\n")+"\n";
}
function refresh(){
 $("#meter-fill").style.width=journal.done.length/6*100+"%";
 $("#counter").textContent=journal.done.length+" / 6 investigations completed";
 $("#endcap").classList.toggle("show",journal.done.length===6);
 $("#mission-list").innerHTML=C.MISSIONS.map((m,i)=>{
  const done=journal.done.includes(m.id);
  return '<li class="'+(done?"done":"")+'"><div class="m-head"><span class="m-icon">'+(done?"✓":i+1)+'</span><strong>'+escapeHTML(m.title)+'</strong></div>'+
    '<div class="m-meta">'+escapeHTML(m.tag)+" · "+escapeHTML(m.outcomes.join(" / "))+'</div><div class="m-row">'+
    '<span class="m-meta">'+(done?"Evidence recorded":"Investigation needed")+'</span>'+
    '<button type="button" class="mini" data-travel="'+m.id+'">Travel here</button></div></li>';
 }).join("");
 $("#mission-list").querySelectorAll("[data-travel]").forEach(b=>b.onclick=()=>{
  const m=C.byId(b.dataset.travel);
  const off=m.id==="khufu"?{x:49,z:24}:m.id==="menkaure"?{x:30,z:10}:{x:9,z:8};
  const loc=C.safeMove(player,m.x+off.x-player.x,m.z+off.z-player.z);
  player.x=loc.x;player.z=loc.z;
  theta=Math.atan2(m.x-player.x,player.z-m.z);
  updateNear();drawMini();
  if(window.innerWidth<751)world.scrollIntoView({block:"start"});
 });
}
function dialogOpen(title,kicker,body,questions){
 modal=true;$("#dialog-title").textContent=title;$("#dialog-kicker").textContent=kicker;
 $("#dialog-body").innerHTML=body;$("#dialog-questions").innerHTML=questions||"";
 $("#dialog-feedback").textContent="";$("#dialog-done").hidden=true;$("#dialog").hidden=false;
 $("#dialog-close").focus();
}
function dialogClose(){modal=false;$("#dialog").hidden=true;updateNear();nearButton.focus();}
function visit(m){
 const completed=journal.done.includes(m.id);
 const source=C.SOURCES[m.source];
 const body='<p class="evidence"><b>Historical evidence:</b> '+escapeHTML(m.fact)+'</p>'+
  '<p class="evidence infer"><b>Interpretation and limitations:</b> '+escapeHTML(m.inference)+'</p>'+
  '<p class="micro">Curriculum: '+escapeHTML(m.outcomes.join(", "))+' | <a href="'+escapeHTML(source.url)+'" rel="noopener noreferrer" target="_blank">'+escapeHTML(source.name)+'</a></p>';
 const questions=completed?"<p>Already investigated. Revisit the evidence any time.</p>":
  "<h3>Field question</h3><p>"+escapeHTML(m.question)+"</p>"+
  m.options.map((v,i)=>'<button type="button" class="option" data-answer="'+i+'">'+String.fromCharCode(65+i)+". "+escapeHTML(v)+"</button>").join("");
 dialogOpen(m.title,"Evidence investigation · "+m.tag,body,questions);
 if(completed)$("#dialog-done").hidden=false;
 $("#dialog-questions").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{
  const result=C.answer(journal,m.id,Number(b.dataset.answer));
  $("#dialog-feedback").textContent=(result.correct?"Evidence accepted. ":"Not quite. ")+result.why;
  if(result.correct){
   $("#dialog-questions").querySelectorAll("[data-answer]").forEach(x=>x.disabled=true);
   $("#dialog-done").hidden=false;refresh();drawMini();
  }
 });
}
function talk(person){
 let index=0;
 dialogOpen(person.name+" · "+person.role,"Fictional but historically informed character","","");
 function next(){
  $("#dialog-body").innerHTML='<p class="evidence">'+escapeHTML(person.lines[index])+'</p><p class="micro">This character and conversation are invented, not a primary-source quotation.</p>';
  $("#dialog-questions").innerHTML=index<person.lines.length-1?'<button type="button" class="btn" id="dialog-next">Ask another question →</button>':"";
  const b=$("#dialog-next");if(b)b.onclick=()=>{index++;next();};
  else $("#dialog-done").hidden=false;
 }
 next();
}
function nearestPerson(){return C.PEOPLE.map(p=>({p,d:pDist(player,p)})).sort((a,b)=>a.d-b.d)[0];}
function nearestMission(){return C.MISSIONS.map(m=>({m,d:pDist(player,m)})).sort((a,b)=>a.d-b.d)[0];}
function available(){
 const m=nearestMission(),p=nearestPerson();
 if(p&&p.d<8&&(!m||p.d<m.d*.6))return{type:"person",item:p.p};
 if(m&&m.d<m.m.range)return{type:"mission",item:m.m};
 if(p&&p.d<10)return{type:"person",item:p.p};
 return null;
}
function interact(){
 if(modal||paused)return;
 const n=available();
 if(n?.type==="person")talk(n.item);
 else if(n?.type==="mission")visit(n.item);
}
function updateNear(){
 if(modal)return;
 const n=available(),near=nearestMission();
 nearButton.disabled=!n;
 nearButton.textContent=n?(n.type==="person"?"Talk to "+n.item.name+" · E":"Investigate "+n.item.short+" · E"):"Move near a marker (or use Travel here)";
 $("#area").textContent=near&&near.d<55?near.m.title:"Giza Plateau";
 hint(n?"Nearby: "+nearButton.textContent:near?"Find "+near.m.title+" or choose Travel here in the journal.":"Explore the Giza Plateau.");
}
function toggleCamera(){
 if(worldMode!=="3d")return;
 first=!first;$("#view-mode").textContent=first?"First person":"Third person";
 $("#view-mode").setAttribute("aria-pressed",String(first));
 $("#crosshair").classList.toggle("show",first);
}
function download(){
 const url=URL.createObjectURL(new Blob([report()],{type:"text/plain;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="giza-expedition-report.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 $("#report-status").textContent="Downloaded. Submit through your teacher's approved method.";
}
$("#near-action").onclick=interact;
$("#dialog-close").onclick=dialogClose;$("#dialog-back").onclick=dialogClose;$("#dialog-done").onclick=dialogClose;
$("#view-mode").onclick=toggleCamera;
$("#pause-game").onclick=()=>{
 paused=!paused;$("#pause-game").textContent=paused?"Resume":"Pause";
 $("#pause-game").setAttribute("aria-pressed",String(paused));
 hint(paused?"Expedition paused.":"Resume exploring when ready.");
};
$("#instructions").onclick=()=>{
 dialogOpen("Controls and accessibility","How to play",
 "<p>Walk with W, A, S, D or arrow keys. Drag the 3D scene to turn the camera. E investigates nearby markers or talks with a nearby character. V switches first/third person. Hold Shift to move faster.</p>"+
 "<p>On iPad, hold the on-screen movement buttons, drag the scene to look around, and tap Investigate when close. Every site also has an accessible <b>Travel here</b> button.</p>"+
 "<p>No timer, combat or grades. Research evidence, not dexterity, is the challenge. All NPC names and dialogue are fictional.</p>","");
 $("#dialog-done").hidden=false;
};
$("#download-report").onclick=download;
$("#copy-report").onclick=()=>{
 if(!navigator.clipboard?.writeText){$("#report-status").textContent="Clipboard unavailable: choose Download report.";return;}
 navigator.clipboard.writeText(report()).then(()=>$("#report-status").textContent="Copied to clipboard.").catch(()=>$("#report-status").textContent="Clipboard blocked: choose Download report.");
};
document.addEventListener("keydown",e=>{
 if(["TEXTAREA","INPUT","SELECT"].includes(document.activeElement?.tagName))return;
 const k=e.key.toLowerCase();
 if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","e","v"].includes(k))e.preventDefault();
 held.add(k);
 if(e.repeat)return;
 if(k==="e")interact();if(k==="v"&&!modal)toggleCamera();
 if(k==="escape"&&modal)dialogClose();
});
document.addEventListener("keyup",e=>held.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>{held.clear();touch.clear();});
for(const btn of document.querySelectorAll("[data-move]")){
 btn.addEventListener("pointerdown",e=>{e.preventDefault();touch.add(btn.dataset.move);btn.setPointerCapture(e.pointerId);});
 for(const name of ["pointerup","pointercancel","lostpointercapture"])btn.addEventListener(name,()=>touch.delete(btn.dataset.move));
}
if(matchMedia("(pointer:coarse)").matches)$("#pad").hidden=false;
const range={x0:-175,x1:175,z0:-160,z1:160};
function point(loc,w,h){return{x:10+(loc.x-range.x0)/(range.x1-range.x0)*(w-20),y:10+(loc.z-range.z0)/(range.z1-range.z0)*(h-20)};}
function drawMini(){
 const ctx=minimap.getContext("2d"),w=minimap.width,h=minimap.height;
 if(!ctx)return;
 ctx.clearRect(0,0,w,h);ctx.fillStyle="#163639";ctx.fillRect(0,0,w,h);
 ctx.strokeStyle="#d9b37a";ctx.lineWidth=2;
 const a=point({x:-58,z:-10},w,h),b=point({x:70,z:59},w,h);
 ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
 C.MISSIONS.forEach(m=>{
  const p=point(m,w,h);ctx.beginPath();ctx.fillStyle=journal.done.includes(m.id)?"#85d6a3":"#e9b860";
  ctx.arc(p.x,p.y,6,0,Math.PI*2);ctx.fill();
 });
 const p=point(player,w,h);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(theta);
 ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(-6,7);ctx.lineTo(6,7);ctx.closePath();ctx.fillStyle="#fff";ctx.fill();ctx.restore();
 ctx.fillStyle="#fff";ctx.font="bold 14px sans-serif";ctx.fillText("N ↑",w-45,18);
}
function doMovement(dt){
 if(paused||modal)return;
 const forward=Number(held.has("w")||held.has("arrowup")||touch.has("forward"))-Number(held.has("s")||held.has("arrowdown")||touch.has("back"));
 const side=Number(held.has("d")||held.has("arrowright")||touch.has("right"))-Number(held.has("a")||held.has("arrowleft")||touch.has("left"));
 if(!forward&&!side)return;
 const unit=Math.hypot(forward,side)||1;
 const speed=Math.min(.055,dt)*(held.has("shift")?40:26);
 const dx=(Math.sin(theta)*forward+Math.cos(theta)*side)*speed/unit;
 const dz=(-Math.cos(theta)*forward+Math.sin(theta)*side)*speed/unit;
 Object.assign(player,C.safeMove(player,dx,dz));
}
function modelBox(parent,x,y,z,w,h,d,color){
 const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color}));
 o.position.set(x,y,z);parent.add(o);return o;
}
function makePerson(color){
 const p=new THREE.Group();
 modelBox(p,0,3,0,2,3,1.2,color);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.85,12,10),new THREE.MeshLambertMaterial({color:0xab734e}));
 head.position.y=5.3;p.add(head);
 modelBox(p,0,5.8,0,1.75,.6,1.4,0x2b241e);
 for(const x of [-.6,.6]){modelBox(p,x,1,0,.54,1.9,.6,0xd5c6a5);modelBox(p,x*2.2,3.1,0,.36,1.9,.45,0xab734e);}
 return p;
}
function makePyramid(x,z,r,h,color){
 const g=new THREE.ConeGeometry(r,h,4);
 const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color,flatShading:true}));
 m.rotation.y=Math.PI/4;m.position.set(x,h/2,z);scene.add(m);
 const cap=new THREE.Mesh(new THREE.ConeGeometry(r*.26,h*.25,4),new THREE.MeshLambertMaterial({color:0xf3e4bd}));
 cap.rotation.y=Math.PI/4;cap.position.set(x,h*.875,z);scene.add(cap);
}
function buildScene(){
 scene=new THREE.Scene();scene.background=new THREE.Color(0x83b8c3);
 scene.fog=new THREE.Fog(0xc3c3b1,160,540);
 scene.add(new THREE.HemisphereLight(0xffffff,0x96724c,2.7));
 const sun=new THREE.DirectionalLight(0xffeac0,2.3);sun.position.set(-120,160,-60);scene.add(sun);
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(490,440),new THREE.MeshLambertMaterial({color:0xd7b07a,side:THREE.DoubleSide}));
 ground.rotation.x=-Math.PI/2;ground.position.y=-.2;scene.add(ground);
 makePyramid(15,-89,55,74,0xd4c5a0);makePyramid(-58,-10,46,62,0xcfba91);makePyramid(-120,78,32,42,0xc8af86);
 // Khafre's causeway: a schematic ramp between temples, not surveyed distances.
 const start=new THREE.Vector3(-35,.15,1),end=new THREE.Vector3(66,.15,55);
 const delta=end.clone().sub(start),mid=start.clone().add(end).multiplyScalar(.5);
 const road=modelBox(scene,mid.x,.2,mid.z,9,.45,delta.length(),0xb4966e);
 road.rotation.y=-Math.atan2(delta.x,delta.z);
 for(let i=0;i<16;i++){const p=start.clone().lerp(end,i/15);const normal=new THREE.Vector3(delta.z,0,-delta.x).normalize().multiplyScalar(5);
  modelBox(scene,p.x+normal.x,.85,p.z+normal.z,1,1.5,1,0x99835f);modelBox(scene,p.x-normal.x,.85,p.z-normal.z,1,1.5,1,0x99835f);}
 // Valley temple and funerary temple: suggest columns, courtyards, precincts.
 for(const [tx,tz,w,d] of [[69,59,35,27],[-35,0,27,22]]){
  modelBox(scene,tx,.48,tz,w,.95,d,0xb49972);
  for(let i=0;i<4;i++)for(let j=0;j<2;j++){
   const x=tx-w/2+5+i*(w-10)/3,z=tz-d/2+5+j*(d-10);
   const col=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.6,7,10),new THREE.MeshLambertMaterial({color:0xcbb48d}));
   col.position.set(x,3.5,z);scene.add(col);modelBox(scene,x,7.3,z,3.5,.8,3.5,0xd8c19a);
  }
 }
 // The Sphinx is represented by a lion-bodied statue with a royal head, not as exact geometry.
 const sphinx=new THREE.Group();sphinx.position.set(44,0,33);
 modelBox(sphinx,0,2,0,6,4,15,0xc7a878);
 for(const x of [-2.1,2.1])modelBox(sphinx,x,1.3,-6.2,1.7,2.7,6.3,0xd3b282);
 modelBox(sphinx,0,6.1,-5.1,5,4,3,0xb39565);
 const face=new THREE.Mesh(new THREE.SphereGeometry(1.65,13,9),new THREE.MeshLambertMaterial({color:0xd5b686}));
 face.position.set(0,6.2,-7);face.scale.z=.46;sphinx.add(face);scene.add(sphinx);
 // Small mudbrick settlement: visual sketch of worker housing, not a measured reconstruction.
 for(const [x,z,w,d] of [[103,112,12,10],[120,111,12,10],[109,130,13,9],[127,129,12,12],[94,130,8,8]]){
  modelBox(scene,x,2,z,w,4,d,0xa87f54);modelBox(scene,x,4.2,z,w+.3,.4,d+.3,0xc5a273);
  modelBox(scene,x,1.3,z-d/2-.15,2.1,2.6,.25,0x4e3a2a);
 }
 // Small mastaba shapes and varied rocks.
 for(const [x,z] of [[93,-92],[110,-83],[86,-108]])modelBox(scene,x,1.5,z,8,3,11,0xbfa982);
 let seed=73251;function rand(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;}
 for(let i=0;i<90;i++){const x=(rand()-.5)*345,z=(rand()-.5)*300;
  if(C.MISSIONS.some(m=>Math.hypot(m.x-x,m.z-z)<20))continue;
  const size=.4+rand()*1.6;
  const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(size,0),new THREE.MeshLambertMaterial({color:rand()>.5?0xb2976d:0xc4aa7e}));
  rock.position.set(x,.35,z);rock.scale.y=.48;scene.add(rock);
 }
 for(const m of C.MISSIONS){
  const group=new THREE.Group();group.position.set(m.x,0,m.z);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(3.6,.32,7,30),new THREE.MeshLambertMaterial({color:0xffe29d,emissive:0x94672f}));
  ring.rotation.x=Math.PI/2;ring.position.y=.6;group.add(ring);
  const glow=new THREE.Mesh(new THREE.CylinderGeometry(.4,.55,10,8),new THREE.MeshLambertMaterial({color:0xf3d68c,emissive:0x8c6021,transparent:true,opacity:.42}));
  glow.position.y=5.8;group.add(glow);
  const diamond=new THREE.Mesh(new THREE.OctahedronGeometry(1.4),new THREE.MeshLambertMaterial({color:0xffdc77,emissive:0x94672f}));
  diamond.position.y=11;group.add(diamond);
  group.traverse(o=>{if(o.isMesh)o.userData.site=m.id;});
  scene.add(group);beacons.push(group);
 }
 figures=C.PEOPLE.map(p=>{
  const model=makePerson(0xe9d9ac);model.position.set(p.x,0,p.z);
  model.traverse(o=>{if(o.isMesh)o.userData.person=p.id;});
  scene.add(model);return{p,model};
 });
 avatar=makePerson(0x426d75);scene.add(avatar);
}
function handlePointer(canvas){
 canvas.addEventListener("pointerdown",e=>{if(modal||paused)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener("pointermove",e=>{
  if(!drag||drag.id!==e.pointerId||modal||paused)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(Math.abs(dx)+Math.abs(dy)>2)drag.moved=true;
  theta-=dx*.0053;tilt=Math.max(-.3,Math.min(.3,tilt+dy*.003));
  drag.x=e.clientX;drag.y=e.clientY;
 });
 canvas.addEventListener("pointerup",e=>{
  if(!drag)return;const moved=drag.moved;drag=null;if(moved||!raycaster)return;
  const rect=canvas.getBoundingClientRect();
  const mouse=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(mouse,camera);
  const hit=raycaster.intersectObjects(scene.children,true).find(o=>o.object.userData.site||o.object.userData.person);
  if(!hit)return;
  const person=C.PEOPLE.find(p=>p.id===hit.object.userData.person);
  const site=C.byId(hit.object.userData.site);
  if(person&&pDist(player,person)<12)talk(person);
  else if(site&&pDist(player,site)<site.range)visit(site);
  else if(site)hint("Move closer to "+site.short+" or use Travel here.");
 });
 canvas.addEventListener("pointercancel",()=>drag=null);
}
function setupThree(lib){
 THREE=lib;worldMode="3d";buildScene();
 camera=new THREE.PerspectiveCamera(68,1,.2,900);
 renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"default"});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 holder.replaceChildren(renderer.domElement);
 renderer.domElement.setAttribute("tabindex","0");
 renderer.domElement.setAttribute("aria-label","3D Giza world: drag to turn, WASD to walk, E to investigate.");
 raycaster=new THREE.Raycaster();handlePointer(renderer.domElement);
 function size(){const r=holder.getBoundingClientRect();renderer.setSize(Math.max(80,r.width),Math.max(150,r.height),false);camera.aspect=Math.max(80,r.width)/Math.max(150,r.height);camera.updateProjectionMatrix();}
 window.addEventListener("resize",size);size();
 $("#loading").hidden=true;hint("3D ready! Use WASD to walk, drag to turn, and E to investigate.");
}
function setupMap(){
 worldMode="map";$("#view-mode").disabled=true;$("#view-mode").textContent="Overhead mode";
 $("#loading").hidden=true;
 const canvas=document.createElement("canvas");canvas.width=1100;canvas.height=770;
 canvas.style.cssText="width:100%;height:100%;object-fit:contain;background:#d7b27d;touch-action:none";
 holder.replaceChildren(canvas);const ctx=canvas.getContext("2d");
 if(!ctx)return;
 const project=v=>point(v,canvas.width,canvas.height);
 canvas.addEventListener("pointerup",e=>{
  const rect=canvas.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width*canvas.width,y=(e.clientY-rect.top)/rect.height*canvas.height;
  const near=C.MISSIONS.map(m=>({m,d:Math.hypot(x-project(m).x,y-project(m).y)})).sort((a,b)=>a.d-b.d)[0];
  if(near?.d<44){const m=near.m,p=C.safeMove(player,m.x+8-player.x,m.z+8-player.z);Object.assign(player,p);updateNear();}
 });
 mapPainter=()=>{
  ctx.fillStyle="#d5ad74";ctx.fillRect(0,0,canvas.width,canvas.height);
  const start=project({x:-58,z:-10}),end=project({x:70,z:59});
  ctx.lineWidth=12;ctx.strokeStyle="#a18556";ctx.beginPath();ctx.moveTo(start.x,start.y);ctx.lineTo(end.x,end.y);ctx.stroke();
  for(const [p,r] of [[{x:15,z:-89},58],[{x:-58,z:-10},50],[{x:-120,z:78},31]]){
   const c=project(p);ctx.fillStyle="#b79361";ctx.beginPath();ctx.moveTo(c.x,c.y-r);ctx.lineTo(c.x+r,c.y+r);ctx.lineTo(c.x-r,c.y+r);ctx.closePath();ctx.fill();
  }
  C.MISSIONS.forEach(m=>{const p=project(m);ctx.fillStyle=journal.done.includes(m.id)?"#468862":"#855114";ctx.beginPath();ctx.arc(p.x,p.y,11,0,Math.PI*2);ctx.fill();ctx.fillStyle="#173038";ctx.font="bold 18px system-ui";ctx.fillText(m.short,p.x+15,p.y-9);});
  for(const person of C.PEOPLE){const p=project(person);ctx.fillStyle="#39708d";ctx.beginPath();ctx.arc(p.x,p.y,8,0,Math.PI*2);ctx.fill();}
  const me=project(player);ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(me.x,me.y,12,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#27505a";ctx.stroke();
 };
 hint("3D did not load here. Play the overhead version, or use Travel here to investigate all six sites.");
}
function tick(ms){
 const dt=last?Math.min(.06,(ms-last)/1000):0;last=ms;started+=dt;
 doMovement(dt);updateNear();if(Math.floor(started*7)%2===0)drawMini();
 if(worldMode==="3d"){
  const facing=new THREE.Vector3(Math.sin(theta),0,-Math.cos(theta));
  avatar.position.set(player.x,0,player.z);avatar.rotation.y=-theta;avatar.visible=!first;
  if(first){const eye=new THREE.Vector3(player.x,5.1,player.z);camera.position.copy(eye);camera.lookAt(eye.clone().add(facing.clone().multiplyScalar(35)).add(new THREE.Vector3(0,-tilt*38,0)));}
  else{const dest=new THREE.Vector3(player.x,10+tilt*15,player.z).sub(facing.clone().multiplyScalar(20));camera.position.lerp(dest,.2);camera.lookAt(new THREE.Vector3(player.x,5,player.z).add(facing.clone().multiplyScalar(9)));}
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
   figures.forEach(({p,model})=>{model.position.x=p.x+Math.sin(started*.6+p.x)*2;model.position.z=p.z+Math.cos(started*.5+p.z)*1.6;model.rotation.y=Math.sin(started*.4+p.z)*.35;});
   beacons.forEach((g,i)=>g.children[2].position.y=11+Math.sin(started*2+i)*.7);
  }
  renderer.render(scene,camera);
 }else if(mapPainter)mapPainter();
 requestAnimationFrame(tick);
}
async function begin(){
 refresh();drawMini();
 try{
  const lib=await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
  setupThree(lib);
 }catch(err){console.warn("Giza 3D unavailable, showing 2D fallback:",err?.message||err);setupMap();}
 requestAnimationFrame(tick);
}
begin();
