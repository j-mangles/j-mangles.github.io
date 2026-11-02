/* Grade 8 Science Unit 2: Particle Lab.
   A small molecular-dynamics model: particles attract when close and repel when squeezed (Lennard-Jones),
   with gravity, walls and a lid. Nothing is scripted; solid, liquid and gas come from the same rules at
   different temperatures. Four views sit above the existing Matter visuals:
     matter/states       temperature slider: solid, liquid, gas
     matter/temperature  gas under a free lid: heat it and the lid rises, density drops
     matter/pressure     sealed syringe: squeeze or heat it and watch the pressure gauge
     matter/phase        the same states model, so students can watch melting and boiling happen */
(function(){
"use strict";

/* ---------------- physics core ---------------- */
function Sim(o){
  const s=this;
  s.W=o.W||22; s.H=o.H||15; s.g=o.g??0.05; s.n=0;
  s.x=[];s.y=[];s.vx=[];s.vy=[];s.ax=[];s.ay=[];
  s.lid={mode:o.lid||"fixed",y:o.lidY||s.H,v:0,target:o.lidY||s.H,M:o.lidMass||40,F:o.lidForce||0};
  s.attract=o.attract??1;            // 1 = Lennard-Jones, 0 = repulsion only (an ideal-ish gas)
  s.dt=o.dt||0.004; s.time=0; s.impulse=0; s.wall=0; s.impT=0; s.energyIn=0;
  s.thermo=o.T??0.3; s.power=0; s.heating=false;
}
Sim.prototype.add=function(x,y,T){const s=this,a=Math.random()*Math.PI*2,v=Math.sqrt(2*T)*(0.6+Math.random()*0.8);s.x.push(x);s.y.push(y);s.vx.push(v*Math.cos(a));s.vy.push(v*Math.sin(a));s.ax.push(0);s.ay.push(0);s.n++;};
Sim.prototype.lattice=function(n,T,x0,y0,cols){const a=1.12;for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols;this.add(x0+c*a+(r%2)*a/2,y0+r*a*0.87,T);}};
Sim.prototype.scatter=function(n,T,top){const s=this;let tries=0;while(s.n<n&&tries<20000){tries++;const x=0.6+Math.random()*(s.W-1.2),y=0.6+Math.random()*((top||s.lid.y)-1.2);let ok=true;for(let i=0;i<s.n;i++){const dx=s.x[i]-x,dy=s.y[i]-y;if(dx*dx+dy*dy<1.1){ok=false;break;}}if(ok)s.add(x,y,T);}};
Sim.prototype.forces=function(){
  const s=this,n=s.n,rc2=s.attract?6.25:1.2599,X=s.x,Y=s.y,AX=s.ax,AY=s.ay;
  for(let i=0;i<n;i++){AX[i]=0;AY[i]=-s.g;}
  for(let i=0;i<n;i++){const xi=X[i],yi=Y[i];for(let j=i+1;j<n;j++){const dx=xi-X[j],dy=yi-Y[j],r2=dx*dx+dy*dy;if(r2>rc2)continue;
    const r2c=r2<0.64?0.64:r2,ir2=1/r2c,ir6=ir2*ir2*ir2,f=24*ir6*(2*ir6-1)*ir2;AX[i]+=f*dx;AY[i]+=f*dy;AX[j]-=f*dx;AY[j]-=f*dy;}}
};
Sim.prototype.temp=function(){let k=0;for(let i=0;i<this.n;i++)k+=this.vx[i]*this.vx[i]+this.vy[i]*this.vy[i];return k/(2*this.n);};
Sim.prototype.step=function(){
  const s=this,dt=s.dt,n=s.n,r=0.5,L=s.lid;
  for(let i=0;i<n;i++){s.vx[i]+=0.5*dt*s.ax[i];s.vy[i]+=0.5*dt*s.ay[i];s.x[i]+=dt*s.vx[i];s.y[i]+=dt*s.vy[i];}
  // lid
  if(L.mode==="free"){L.v+=dt*(-L.F/L.M);L.v*=0.999;L.y+=dt*L.v;if(L.y>s.H){L.y=s.H;L.v=Math.min(0,L.v);}if(L.y<3){L.y=3;L.v=Math.max(0,L.v);}}
  else if(L.mode==="driven"){const d=L.target-L.y;L.v=Math.max(-1.5,Math.min(1.5,d*2));L.y+=dt*L.v;}
  else L.v=0;
  for(let i=0;i<n;i++){
    if(s.x[i]<r){s.x[i]=2*r-s.x[i];if(s.vx[i]<0){s.wall-=2*s.vx[i];s.vx[i]=-s.vx[i];}}
    if(s.x[i]>s.W-r){s.x[i]=2*(s.W-r)-s.x[i];if(s.vx[i]>0){s.wall+=2*s.vx[i];s.vx[i]=-s.vx[i];}}
    if(s.y[i]<r){s.y[i]=2*r-s.y[i];if(s.vy[i]<0){s.wall-=2*s.vy[i];s.vy[i]=-s.vy[i];}}
    const top=L.y-r;
    if(s.y[i]>top){const rel=s.vy[i]-L.v;s.y[i]=top-(s.y[i]-top);if(rel>0){s.vy[i]=2*L.v-s.vy[i];s.impulse+=2*rel;s.wall+=2*rel;if(L.mode==="free")L.v+=2*rel/L.M;}if(s.y[i]>top)s.y[i]=top;}
  }
  s.forces();
  for(let i=0;i<n;i++){s.vx[i]+=0.5*dt*s.ax[i];s.vy[i]+=0.5*dt*s.ay[i];}
  // temperature control: a thermostat that eases toward a target, or a steady heater
  const T=s.temp();
  if(s.heating){const dE=s.power*n*dt,k=Math.sqrt(Math.max(0.05,(T*n+dE)/(T*n)));for(let i=0;i<n;i++){s.vx[i]*=k;s.vy[i]*=k;}s.energyIn+=dE;}
  else if(s.thermo!=null){const k=Math.sqrt(1+dt/0.4*(s.thermo/Math.max(T,1e-4)-1));for(let i=0;i<n;i++){s.vx[i]*=k;s.vy[i]*=k;}}
  s.time+=dt; s.impT+=dt;
};
/* Attraction energy between particles (Lennard-Jones, cut and shifted). More negative = more tightly held. */
Sim.prototype.pe=function(){const s=this,n=s.n;let u=0;const sh=4*(Math.pow(1/2.5,12)-Math.pow(1/2.5,6));for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const dx=s.x[i]-s.x[j],dy=s.y[i]-s.y[j],r2=dx*dx+dy*dy;if(r2>6.25)continue;const ir6=1/(r2*r2*r2);u+=4*ir6*(ir6-1)-sh;}return u/n;};
Sim.prototype.condensed=function(){const s=this,n=s.n;let c=0;for(let i=0;i<n;i++){let k=0;for(let j=0;j<n;j++){if(i===j)continue;const dx=s.x[i]-s.x[j],dy=s.y[i]-s.y[j];if(dx*dx+dy*dy<2.25&&++k>=3)break;}if(k>=3)c++;}return c/n;};
/* Rough mobility: how far particles drift from where they were a moment ago (solids only jiggle). */
Sim.prototype.snapshot=function(){return {x:this.x.slice(),y:this.y.slice(),t:this.time};};
Sim.prototype.drift=function(snap){let d=0;for(let i=0;i<this.n;i++){const dx=this.x[i]-snap.x[i],dy=this.y[i]-snap.y[i];d+=dx*dx+dy*dy;}return d/this.n;};

/* ---------------- drawing helpers ---------------- */
function colours(el){const cs=getComputedStyle(el),v=k=>cs.getPropertyValue(k).trim();return {ink:v("--ink")||"#222",muted:v("--muted")||"#777",accent:v("--accent")||"#c76",paper:v("--paper")||"#fff",rule:v("--rule")||"#ddd",good:v("--good")||"#2e7d4f",bad:v("--bad")||"#b23b2e",soft:v("--soft")||"#eef"};}
const CSS=`.plab{display:grid;gap:10px}.plab .pl-top{display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:12px;align-items:start}
.plab canvas{width:100%;height:auto;display:block;border-radius:6px;background:var(--soft);touch-action:none}
.plab .pl-side{display:grid;gap:8px;font-size:14px}.plab .pl-side b{display:block;font-size:20px;line-height:1.1}
.plab .pl-meter{height:10px;border-radius:5px;background:var(--rule);overflow:hidden}.plab .pl-meter i{display:block;height:100%;background:var(--accent);transition:width .2s}
.plab .pl-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.plab input[type=range]{flex:1;min-width:160px}
.plab .pl-say{margin:0;min-height:2.8em}
@media(max-width:560px){.plab .pl-row .pl-lab{flex-basis:100%}.plab input[type=range]{min-width:120px}}.plab .pl-lab{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
@media(max-width:560px){.plab .pl-top{grid-template-columns:1fr}.plab .pl-side{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
function frame(el,title,intro,aspect){
  const ASPECT=Math.round(880*(aspect||0.68));
  if(!document.getElementById("plab-css")){const st=document.createElement("style");st.id="plab-css";st.textContent=CSS;document.head.appendChild(st);}
  el.innerHTML=`<div class="plab"><div class="eyebrow">${title}</div><p class="note" style="margin:0">${intro}</p>
   <div class="pl-top"><canvas width="880" height="${ASPECT}" aria-label="Moving particle model"></canvas><div class="pl-side"></div></div>
   <div class="pl-ctrl"></div><p class="pl-say" aria-live="polite"></p></div>`;
  return {cv:el.querySelector("canvas"),side:el.querySelector(".pl-side"),ctrl:el.querySelector(".pl-ctrl"),say:el.querySelector(".pl-say")};
}
function draw(cv,s,C,opt={}){
  const ctx=cv.getContext("2d"),k=cv.width/s.W,H=cv.height,py=y=>H-y*k;
  ctx.clearRect(0,0,cv.width,H);
  if(opt.lid!==false&&s.lid.y<s.H-0.01){ctx.fillStyle=C.rule;ctx.fillRect(0,0,cv.width,py(s.lid.y));}
  if(opt.lid!==false){ctx.fillStyle=C.accent;ctx.fillRect(0,py(s.lid.y)-8,cv.width,8);if(opt.handle){ctx.fillStyle=C.muted;ctx.fillRect(cv.width/2-8,0,16,Math.max(0,py(s.lid.y)-8));}}
  const T=Math.max(0.05,s.temp());
  for(let i=0;i<s.n;i++){const sp=Math.sqrt(s.vx[i]*s.vx[i]+s.vy[i]*s.vy[i])/Math.sqrt(2*T);
    ctx.globalAlpha=0.55+Math.min(0.45,sp*0.3);ctx.beginPath();ctx.arc(s.x[i]*k,py(s.y[i]),0.5*k*1.05,0,Math.PI*2);ctx.fillStyle=C.accent;ctx.fill();}
  ctx.globalAlpha=1;
}
function runner(el,s,stepsPerFrame,onFrame){
  let alive=true,visible=true;
  const io="IntersectionObserver" in window?new IntersectionObserver(e=>{visible=e[0].isIntersecting;}):null; if(io)io.observe(el);
  function loop(){if(!el.isConnected){alive=false;if(io)io.disconnect();return;}
    if(visible&&!document.hidden){for(let i=0;i<stepsPerFrame;i++)s.step();onFrame();}
    requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
  return ()=>alive;
}
const keep={};   // simulations survive lesson re-renders
const tLabel=(T,lo=0.12,hi=1.2)=>{const f=(T-lo)/(hi-lo);return f<0.15?"Cold":f<0.35?"Cool":f<0.6?"Warm":f<0.85?"Hot":"Very hot";};

/* ---------------- 1. States of matter ---------------- */
function states(el,slot="states"){
  const S=keep[slot]||(keep[slot]=(()=>{const s=new Sim({W:28,H:20,g:0.03,T:0.2});s.lattice(64,0.2,9.5,0.6,8);return {s,target:0.2,snap:null,mob:0,cond:1,tick:0};})());
  const s=S.s,ui=frame(el,"Particle Lab · States of matter","The same 64 particles at every temperature. Particles pull on each other when they're close (point 4) and are always moving (point 3). Slide the temperature and watch what happens.",20/28);
  ui.ctrl.innerHTML=`<div class="pl-row"><span>Cold</span><input type="range" min="0.12" max="1.2" step="0.01" aria-label="Temperature"><span>Hot</span></div>`;
  const sl=ui.ctrl.querySelector("input");sl.value=S.target;
  ui.side.innerHTML=`<div><span class="pl-lab">Temperature</span><b class="t"></b><div class="pl-meter"><i class="tm"></i></div></div><div><span class="pl-lab">State</span><b class="st"></b></div><div><span class="pl-lab">Particle speed</span><b class="sp"></b></div>`;
  sl.oninput=()=>{S.target=+sl.value;s.thermo=S.target;};s.thermo=S.target;
  let C=colours(el);
  runner(el,s,16,()=>{
    draw(ui.cv,s,C,{lid:false});
    if(++S.tick%15===0){
      if(S.snap&&s.time-S.snap.t>0){S.mob=s.drift(S.snap)/(s.time-S.snap.t);}S.snap=s.snapshot();S.cond=s.condensed();C=colours(el);
      const T=s.temp(),st=S.cond<0.2?"Gas":S.cond<0.8?"Liquid + gas":S.mob<0.08?"Solid":"Liquid";
      ui.side.querySelector(".t").textContent=tLabel(T);ui.side.querySelector(".tm").style.width=Math.min(100,T/1.2*100)+"%";
      ui.side.querySelector(".st").textContent=st;ui.side.querySelector(".sp").textContent=(Math.sqrt(2*T)*10).toFixed(0)+" (relative)";
      ui.say.textContent=st==="Solid"?"Solid: the attractions win. Each particle is locked in place in a pattern and vibrates on the spot.":st==="Liquid"?"Liquid: the particles have enough energy to slide past each other, but they still stay close together. Notice the flat top, like a liquid in a cup.":st==="Gas"?"Gas: the particles move so fast that the attractions can't hold them. They spread out to fill the whole container, with lots of empty space between them (point 2).":"Some particles are escaping from the liquid into the space above it. That's evaporation.";
    }
  });
}

/* ---------------- 2. Heating a gas under a free lid ---------------- */
function expansion(el){
  const S=keep.exp||(keep.exp=(()=>{const s=new Sim({W:24,H:16,g:0,T:0.6,lid:"free",lidY:7.6,lidForce:5.3,lidMass:60,attract:0});s.scatter(40,0.6,7);return {s,target:0.6,tick:0,h:7.6};})());
  const s=S.s,ui=frame(el,"Particle Lab · Heating a gas","A gas trapped under a lid that can slide up and down. The lid's weight stays the same. Heat the gas and watch the lid, the volume and the density.",16/24);
  ui.ctrl.innerHTML=`<div class="pl-row"><span>Cool</span><input type="range" min="0.4" max="1.4" step="0.01" aria-label="Temperature"><span>Hot</span></div>`;
  const sl=ui.ctrl.querySelector("input");sl.value=S.target;s.thermo=S.target;
  sl.oninput=()=>{S.target=+sl.value;s.thermo=S.target;};
  ui.side.innerHTML=`<div><span class="pl-lab">Temperature</span><b class="t"></b><div class="pl-meter"><i class="tm"></i></div></div><div><span class="pl-lab">Mass</span><b>40 particles</b></div><div><span class="pl-lab">Volume</span><b class="v"></b></div><div><span class="pl-lab">Density</span><b class="d"></b></div>`;
  let C=colours(el);const V0=24*6.6;   // usable volume at the starting temperature
  runner(el,s,16,()=>{draw(ui.cv,s,C,{handle:false});S.h+=(s.lid.y-S.h)*0.05;
    if(++S.tick%12===0){C=colours(el);const T=s.temp(),V=24*(S.h-1),rel=V/V0;
      ui.side.querySelector(".t").textContent=tLabel(T,0.4,1.4);ui.side.querySelector(".tm").style.width=Math.min(100,T/1.4*100)+"%";
      ui.side.querySelector(".v").textContent=Math.round(rel*100)+"%";ui.side.querySelector(".d").textContent=Math.round(100/rel)+"%";
      ui.say.textContent=rel>1.08?"Hotter particles move faster and hit the lid harder, so they push it up. Same mass, more volume: the density goes down. This is why warm air rises.":rel<0.92?"Cooler particles move slower and hit the lid more gently, so the lid sinks. Same mass, less volume: the density goes up.":"Volume and density are shown compared with where we started (100%). Try heating it up.";}
  });
}

/* ---------------- 3. Pressure in a sealed syringe ---------------- */
function pressure(el){
  const S=keep.pr||(keep.pr=(()=>{const s=new Sim({W:24,H:16,g:0,T:0.8,lid:"driven",lidY:16,attract:0});s.scatter(36,0.8,15.5);return {s,target:0.8,vol:100,P:null,tick:0};})());
  const s=S.s,ui=frame(el,"Particle Lab · Pressure","A sealed syringe of gas, seen from the side. Pressure comes from particles hitting the walls. Squeeze the plunger or change the temperature and watch the gauge.",16/24);
  ui.ctrl.innerHTML=`<div class="pl-row"><span class="pl-lab" style="min-width:86px">Plunger</span><span>Out</span><input class="vol" type="range" min="35" max="100" step="1" aria-label="Volume (percent)"><span>In</span></div>
   <div class="pl-row" style="margin-top:6px"><span class="pl-lab" style="min-width:86px">Temperature</span><span>Cool</span><input class="tmp" type="range" min="0.4" max="1.6" step="0.01" aria-label="Temperature"><span>Hot</span></div>`;
  const sv=ui.ctrl.querySelector(".vol"),st=ui.ctrl.querySelector(".tmp");sv.value=135-S.vol;st.value=S.target;s.thermo=S.target;
  sv.oninput=()=>{S.vol=135-sv.value;s.lid.target=1+15*S.vol/100; /* volume = space particle centres can reach */};st.oninput=()=>{S.target=+st.value;s.thermo=S.target;};
  ui.side.innerHTML=`<div><span class="pl-lab">Volume</span><b class="v"></b></div><div><span class="pl-lab">Temperature</span><b class="t"></b></div><div><span class="pl-lab">Pressure</span><b class="p"></b><div class="pl-meter"><i class="pm"></i></div></div><div><span class="pl-lab">Hits on the plunger</span><b class="h"></b></div>`;
  let C=colours(el);const P0=0.100;   // measured pressure at the start (full volume, starting temperature)
  runner(el,s,16,()=>{draw(ui.cv,s,C,{handle:true});
    if(++S.tick%12===0){C=colours(el);const T=s.temp(),p=s.impT>0?s.wall/s.impT/(2*(24-1)+2*(s.lid.y-1)):0;S.P=S.P==null?P0:S.P+(p-S.P)*0.1;s.impulse=0;s.wall=0;s.impT=0;
      const rel=S.P/P0;ui.side.querySelector(".v").textContent=Math.round((s.lid.y-1)/15*100)+"%";ui.side.querySelector(".t").textContent=tLabel(T,0.4,1.6);
      ui.side.querySelector(".p").textContent=Math.round(rel*100)+"%";ui.side.querySelector(".pm").style.width=Math.min(100,rel*100/4)+"%";
      ui.side.querySelector(".h").textContent=rel>1.15?"More often":rel<0.87?"Less often":"Normal";
      ui.say.textContent=S.vol<90&&T<0.95?"Same particles, less space: they reach the plunger more often, so the pressure goes up. Gas squeezes easily because there's so much empty space between the particles.":T>0.95?"Hotter particles move faster, so they hit the walls harder and more often. In a sealed container, heating raises the pressure. That's why you never heat an aerosol can.":"Pressure is shown compared with where we started (100%). Push the plunger in, or heat the gas.";}
  });
}

/* ---------------- wire into the lessons, above the existing visuals ---------------- */
const H=window.HUB;
window.ParticleCore={Sim};
if(!H)return;
const sims={"matter/states":states,"matter/temperature":expansion,"matter/pressure":pressure,"matter/phase":el=>states(el,"phase")};
H.lessonTools=H.lessonTools||{};
Object.entries(sims).forEach(([k,fn])=>{const old=H.lessonTools[k];H.lessonTools[k]=root=>{const a=document.createElement("div"),b=document.createElement("div");b.style.marginTop="22px";root.append(a,b);fn(a);if(old)old(b);};});
})();
