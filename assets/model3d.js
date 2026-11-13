/* Small 3D drawing kit shared by the class-site models (Egypt pyramids and temple, Science 8 matter models).
   No library and nothing external: faces and particles are projected and drawn as SVG, so colours follow each
   page's CSS variables in light and dark mode. Models pass their own colour map ("tones"). */
(function(){
"use strict";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const unit=a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return [a[0]/l,a[1]/l,a[2]/l];};
const mean=ps=>{const m=[0,0,0];ps.forEach(p=>{m[0]+=p[0];m[1]+=p[1];m[2]+=p[2];});return m.map(v=>v/ps.length);};
const LIGHT=unit([-.5,.75,.45]);
const BG="var(--panel, var(--paper))";   // atlas pages define --panel, hub pages define --paper

/* ---------- solids: each returns an object {f:[{p,n,tone}], c, part} ---------- */
function solid(faces,part){
  const c=mean(faces.flatMap(f=>f.p));
  faces.forEach(f=>{
    f.p=f.p.filter((p,i,a)=>{const q=a[(i+1)%a.length];return p[0]!==q[0]||p[1]!==q[1]||p[2]!==q[2];});
    let n=unit(cross(sub(f.p[1],f.p[0]),sub(f.p[2],f.p[0])));
    if(dot(n,sub(mean(f.p),c))<0){f.p.reverse();n=n.map(v=>-v);}
    f.n=n;});
  return {f:faces,c,part};
}
function box(x0,x1,y0,y1,z0,z1,tone,part){
  const P=(x,y,z)=>[x,y,z],f=p=>({p,tone});
  return solid([f([P(x0,y0,z0),P(x1,y0,z0),P(x1,y1,z0),P(x0,y1,z0)]),f([P(x0,y0,z1),P(x1,y0,z1),P(x1,y1,z1),P(x0,y1,z1)]),
    f([P(x0,y0,z0),P(x0,y0,z1),P(x0,y1,z1),P(x0,y1,z0)]),f([P(x1,y0,z0),P(x1,y0,z1),P(x1,y1,z1),P(x1,y1,z0)]),
    f([P(x0,y0,z0),P(x1,y0,z0),P(x1,y0,z1),P(x0,y0,z1)]),f([P(x0,y1,z0),P(x1,y1,z0),P(x1,y1,z1),P(x0,y1,z1)])],part);
}
// Four-sided block that narrows from (a0,b0) at y0 to (a1,b1) at y1. a1=b1=0 makes a point. half=true keeps the back half only.
function taper(cx,cz,y0,y1,a0,b0,a1,b1,tone,part,half){
  const B=[[cx-a0,y0,cz-b0],[cx+a0,y0,cz-b0],[cx+a0,y0,half?cz:cz+b0],[cx-a0,y0,half?cz:cz+b0]];
  const U=[[cx-a1,y1,cz-b1],[cx+a1,y1,cz-b1],[cx+a1,y1,half?cz:cz+b1],[cx-a1,y1,half?cz:cz+b1]];
  const fs=[0,1,2,3].map(i=>{const j=(i+1)%4;return {p:[B[i],B[j],U[j],U[i]],tone:half&&i===2?"cut":tone};});
  if(a1>0) fs.push({p:U.slice(),tone});
  return solid(fs,part);
}
function column(cx,cz,r,y0,y1,tone,part){
  const n=8,ring=y=>Array.from({length:n},(_,i)=>{const a=(i+.5)/n*Math.PI*2;return [cx+r*Math.cos(a),y,cz+r*Math.sin(a)];});
  const b=ring(y0),t=ring(y1),fs=b.map((_,i)=>{const j=(i+1)%n;return {p:[b[i],b[j],t[j],t[i]],tone};});
  fs.push({p:t,tone});
  return solid(fs,part);
}

/* ---------- camera and drawing ---------- */
function camera(v){
  const cy=Math.cos(v.yaw),sy=Math.sin(v.yaw),cp=Math.cos(v.pitch),sp=Math.sin(v.pitch);
  return p=>{const x=p[0]*cy+p[2]*sy,z=-p[0]*sy+p[2]*cy;return [x,p[1]*cp-z*sp,p[1]*sp+z*cp];};
}
// Scale and centre a set of points inside the frame (below the label band) at the current angle.
function fit(pts,cam,o){
  let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
  pts.forEach(p=>{const q=cam(p);x0=Math.min(x0,q[0]);x1=Math.max(x1,q[0]);y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1]);});
  const pad=o.pad||0,s=Math.min(o.s,(o.W-28-2*pad)/(x1-x0||1),(o.H-o.top-o.bottom-2*pad)/(y1-y0||1));
  const ox=o.W/2-s*(x0+x1)/2,oy=(o.top+o.H-o.bottom)/2+s*(y0+y1)/2;
  return {s,S:p=>{const q=cam(p);return [(ox+s*q[0]).toFixed(1),(oy-s*q[1]).toFixed(1)];}};
}
function paint(groups,v,o){
  // groups: arrays of objects, already in back-to-front order; inside a group, objects sort by depth unless group.keep
  const cam=camera(v);
  const {S}=fit(groups.flatMap(g=>g.flatMap(ob=>ob.f.flatMap(f=>f.p))),cam,o);
  let out="";
  groups.forEach(g=>{
    const objs=g.keep?g:g.slice().sort((a,b)=>cam(a.c)[2]-cam(b.c)[2]);
    objs.forEach(ob=>{
      const fs=ob.f.filter(f=>f.flat||cam(f.n)[2]>0);
      if(!ob.keep) fs.sort((a,b)=>cam(mean(a.p))[2]-cam(mean(b.p))[2]);
      fs.forEach(f=>{
        const k=f.flat?0:Math.round((1-(.38+.62*Math.max(0,dot(f.n,LIGHT))))*40);
        const pale=o.sel&&ob.part&&ob.part!==o.sel;   // the picked part keeps its colour, the rest fades back
        const fill=`color-mix(in srgb, var(--ink) ${k}%, ${o.tones[f.tone]})`;
        out+=`<polygon points="${f.p.map(p=>S(p).join(",")).join(" ")}" fill="${pale?`color-mix(in srgb, ${fill} 30%, ${BG})`:fill}" stroke="color-mix(in srgb, var(--ink) ${pale?12:32}%, transparent)" stroke-width=".7" stroke-linejoin="round"${ob.part?` data-part="${ob.part}" style="cursor:pointer"`:""}/>`;
      });
    });
  });
  return {html:out,S};
}
// Particle scenes: balls and thin rods, sorted by depth. Far balls fade toward the background so depth reads without shading.
// items: {ball:[x,y,z], r, tone, part} or {a:[x,y,z], b:[x,y,z], tone, w, dash}
function scatter(items,v,o){
  const cam=camera(v),{s,S}=fit(items.flatMap(i=>i.ball?[i.ball]:[i.a,i.b]),cam,o);
  const list=items.map(i=>({i,d:i.ball?cam(i.ball)[2]:(cam(i.a)[2]+cam(i.b)[2])/2})).sort((p,q)=>p.d-q.d);
  const lo=list.length?list[0].d:0,span=(list.length?list[list.length-1].d:1)-lo||1;
  let out="";
  list.forEach(({i,d})=>{
    const near=Math.round(62+38*(d-lo)/span),pale=o.sel&&i.part&&i.part!==o.sel?.35:1;
    const col=`color-mix(in srgb, ${o.tones[i.tone]} ${Math.round(near*pale)}%, ${BG})`;
    if(i.ball){const c=S(i.ball),r=(i.r*s).toFixed(1);
      out+=`<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="${col}" stroke="color-mix(in srgb, var(--ink) ${Math.round(34*pale)}%, transparent)" stroke-width=".7"${i.part?` data-part="${i.part}" style="cursor:pointer"`:""}/>`+
        `<circle cx="${(+c[0]-r*.32).toFixed(1)}" cy="${(+c[1]-r*.34).toFixed(1)}" r="${(r*.3).toFixed(1)}" fill="color-mix(in srgb, #fff 42%, ${col})" pointer-events="none"/>`;}
    else{const a=S(i.a),b=S(i.b);out+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${col}" stroke-width="${i.w||1}"${i.dash?` stroke-dasharray="${i.dash}"`:""} stroke-linecap="round"/>`;}
  });
  return {html:out,S,s};
}
// The twelve edges of a box, as rods.
function frame(x0,x1,y0,y1,z0,z1,tone,part){
  const P=(a,b,c)=>[a?x1:x0,b?y1:y0,c?z1:z0],out=[];
  for(let i=0;i<8;i++) for(const bit of [1,2,4]) if(!(i&bit)){const j=i|bit;out.push({a:P(i&1,i&2,i&4),b:P(j&1,j&2,j&4),tone,part,w:1});}
  return out;
}
function tag(x,y,lines,o={}){
  // text with a panel-coloured halo so it stays readable over the model
  return lines.map((t,i)=>`<text x="${x}" y="${y+i*15}" text-anchor="${o.a||"middle"}" font-family="Inter, system-ui, sans-serif" font-size="${i?11.5:13.5}" font-weight="${i?500:700}" fill="${i?"var(--muted)":"var(--ink)"}" stroke="${BG}" stroke-width="4" paint-order="stroke" stroke-linejoin="round"${o.part?` data-part="${o.part}" style="cursor:pointer"`:""}>${esc(t)}</text>`).join("");
}
const lead=(a,b)=>`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="var(--muted)" stroke-width="1"/>`;
const deg=d=>d*Math.PI/180,clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* Shared shell: svg, controls, drag/keys, part buttons, explanation line. model = {state, parts, toggles, scene, intro, aria, yawMax} */
function mount(el,model){
  const st=model.state;
  if(!document.getElementById("ix-3d-css")){const c=document.createElement("style");c.id="ix-3d-css";
    c.textContent=`.ix-3d .btn[aria-pressed="true"]{background:var(--accent);color:${BG};border-color:var(--accent)}.ix-3d svg:focus-visible{outline:3px solid var(--accent);outline-offset:2px}`;document.head.appendChild(c);}
  el.innerHTML=`<div class="ix-3d">
   <svg role="img" tabindex="0" aria-label="${esc(model.aria)}" style="display:block;width:100%;height:auto;min-width:0;touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none"></svg>
   <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px">
    ${model.parts.map(p=>`<button class="btn ghost" type="button" data-pick="${p.id}" aria-pressed="false">${esc(p.btn)}</button>`).join("")}
   </div>
   <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px">
    <button class="btn ghost" type="button" data-turn="-1" aria-label="Turn left">&larr; Turn</button>
    <button class="btn ghost" type="button" data-turn="1" aria-label="Turn right">Turn &rarr;</button>
    ${model.toggles.map(t=>`<button class="btn ghost" type="button" data-tog="${t.key}" aria-pressed="false">${esc(t.label)}</button>`).join("")}
   </div>
   <p data-say aria-live="polite" style="margin:10px 0 0;min-height:3.2em"></p>
  </div>`;
  const svg=el.querySelector("svg"),say=el.querySelector("[data-say]");
  function draw(){
    const cw=el.clientWidth||760,W=clamp(Math.round(cw),420,760),H=Math.max(310,Math.round(W*.56)),narrow=W<560;
    svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
    svg.innerHTML=model.scene(st,{W,H,narrow,k:W/760});
    el.querySelectorAll("[data-pick]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.pick===st.sel)));
    el.querySelectorAll("[data-tog]").forEach(b=>b.setAttribute("aria-pressed",String(!!st[b.dataset.tog])));
    const p=model.parts.find(q=>q.id===st.sel);
    say.innerHTML=p?`<strong>${esc(p.name)}.</strong> ${esc(typeof p.say==="function"?p.say(st):p.say)}`:esc(model.intro);
  }
  const pick=id=>{st.sel=st.sel===id?null:id;draw();};
  const turn=(dy,dp)=>{st.yaw=clamp(st.yaw+dy,-model.yawMax,model.yawMax);st.pitch=clamp(st.pitch+(dp||0),deg(8),model.pitchMax||deg(55));draw();};
  el.querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>pick(b.dataset.pick));
  el.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>{st[b.dataset.tog]=!st[b.dataset.tog];draw();});
  el.querySelectorAll("[data-turn]").forEach(b=>b.onclick=()=>turn(deg(15)*+b.dataset.turn));
  let drag=null;
  svg.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY,moved:false,part:e.target.dataset&&e.target.dataset.part,mouse:e.pointerType==="mouse"};svg.setPointerCapture(e.pointerId);svg.style.cursor="grabbing";});
  svg.addEventListener("pointermove",e=>{
    if(!drag) return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(!drag.moved&&Math.hypot(dx,dy)<5) return;
    drag.moved=true;drag.x=e.clientX;drag.y=e.clientY;
    turn(dx*.008,drag.mouse?dy*.006:0);
  });
  const end=()=>{if(drag&&!drag.moved&&drag.part) pick(drag.part);drag=null;svg.style.cursor="grab";};
  svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",()=>{drag=null;svg.style.cursor="grab";});
  svg.addEventListener("keydown",e=>{
    const m={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];
    if(m){e.preventDefault();turn(deg(8)*m[0],deg(5)*m[1]);}
  });
  if(window.ResizeObserver){let w=el.clientWidth;new ResizeObserver(()=>{if(el.clientWidth!==w){w=el.clientWidth;draw();}}).observe(el);}
  draw();
  // models with a "motion" toggle redraw about 20 times a second while it is on
  if(model.animate){let last=0;const loop=t=>{if(!el.isConnected) return;if(st.motion&&t-last>50){last=t;st.t=t/1000;draw();}requestAnimationFrame(loop);};requestAnimationFrame(loop);}
}

window.Model3D={esc,sub,dot,unit,mean,deg,clamp,solid,box,taper,column,camera,fit,paint,scatter,frame,tag,lead,mount,BG};
})();
