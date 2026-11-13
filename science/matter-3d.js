/* Grade 8 Science, Matter, Density and Fluids: rotatable models for Lessons 1, 4 and 8, drawn with assets/model3d.js.
   They replace three flat pictures from matter-visuals.js, which stay as the fallback if a model fails to draw.
   Numbers follow the Sci8_MDF student booklet (ice 0.92 g/cm³, water 1.00 g/mL, densest near 4°C).
   Each ball stands for one particle of the particle theory; sizes and spacing are simplified. */
(function(){
"use strict";
const H=window.HUB,M=window.Model3D;if(!H||!M)return;
const {esc,unit,solid,scatter,frame,paint,tag,lead,mount,deg}=M;
const WATER="color-mix(in srgb, #3b82c4 55%, var(--paper))";
const TONE={p:"color-mix(in srgb, var(--accent) 78%, var(--paper))",edge:"var(--muted)",link:"color-mix(in srgb, var(--ink) 70%, var(--paper))",
  board:"color-mix(in srgb, var(--ink) 9%, var(--paper))",line:"color-mix(in srgb, var(--ink) 60%, var(--paper))",
  water:WATER,oil:"color-mix(in srgb, #d6ad3c 70%, var(--paper))",syrup:"color-mix(in srgb, #7a4312 78%, var(--paper))"};
// Same "random" layout every time, so the picture on the board matches the one on a student's screen.
function rng(seed){return ()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
// n points in a box, none closer than gap (loosened a little if the box is too full to manage it)
function sprinkle(n,x0,x1,y0,y1,z0,z1,gap,seed){
  const r=rng(seed),pts=[];let tries=0;
  while(pts.length<n){
    const p=[x0+r()*(x1-x0),y0+r()*(y1-y0),z0+r()*(z1-z0)];
    if(pts.every(q=>Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])>=gap)) pts.push(p);
    if(++tries%4000===0) gap*=.96;
  }
  return pts;
}
const shell=(el,note)=>{el.innerHTML=`<div class="eyebrow">See it</div><div data-m style="margin-top:10px"></div><p class="note" style="margin-top:8px">${esc(note)}</p>`;return el.querySelector("[data-m]");};
const swap=(key,draw)=>{const old=H.lessonTools&&H.lessonTools[key];H.lessonTools=Object.assign(H.lessonTools||{},{[key]:el=>{try{draw(el);}catch(e){if(old) old(el);else throw e;}}});};

/* ================= Lesson 1: the same particles as a solid, a liquid and a gas ================= */
const ST={yaw:deg(-22),pitch:deg(16),sel:null,labels:true,motion:false,t:0};
const BOX=10,RB=1.08;
const STATES=[
  {id:"solid",x:-16,name:"Solid",note:"packed in a pattern",pts:(()=>{const a=[];for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)a.push([1.4+i*2.4,1.4+j*2.4,1.4+k*2.4]);return a;})()},
  {id:"liquid",x:0,name:"Liquid",note:"close, sliding past",pts:sprinkle(54,RB,BOX-RB,RB,7.2,RB,BOX-RB,2.12,11)},
  {id:"gas",x:16,name:"Gas",note:"far apart, fast",pts:sprinkle(7,RB,BOX-RB,RB,BOX-RB,RB,BOX-RB,3.4,5)}];
const bounce=(v,lo,hi)=>{const w=hi-lo,m=((v-lo)%(2*w)+2*w)%(2*w);return lo+(m>w?2*w-m:m);};
function statesScene(st,o){
  const items=[],t=st.motion?st.t:0;
  STATES.forEach(s=>{
    const x0=s.x-BOX/2;
    frame(x0,x0+BOX,0,BOX,0,BOX,"edge",s.id).forEach(l=>items.push(l));
    s.pts.forEach((p,i)=>{
      let q=p;
      if(t&&s.id==="solid") q=p.map((v,k)=>v+.13*Math.sin(t*11+i*1.7+k*2.1));                         // vibrate in place
      if(t&&s.id==="liquid") q=[bounce(p[0]+1.6*Math.sin(t*.9+i),RB,BOX-RB),bounce(p[1]+.5*Math.sin(t*1.1+i*2.3),RB,7.2),bounce(p[2]+1.6*Math.cos(t*.8+i*1.3),RB,BOX-RB)];   // wander past each other
      if(t&&s.id==="gas") q=p.map((v,k)=>bounce(v+t*(4.5+((i*7+k*3)%5))*(((i+k)%2)?1:-1),RB,BOX-RB));   // straight lines, bouncing off the walls
      items.push({ball:[x0+q[0],q[1],q[2]-BOX/2],r:RB,tone:"p",part:s.id});
    });
  });
  const pt=scatter(items,st,{W:o.W,H:o.H,top:o.narrow?30:52,bottom:10,s:17*o.k,sel:st.sel,tones:TONE});
  let h=pt.html;
  if(st.labels) STATES.forEach(s=>{const a=pt.S([s.x,BOX,0]),ly=+a[1]-(o.narrow?12:30);h+=tag(a[0],ly,o.narrow?[s.name]:[s.name,s.note],{part:s.id});});
  return h;
}
const statesModel={state:ST,yawMax:deg(50),animate:true,scene:statesScene,
  aria:"3D particle models of the same substance as a solid, a liquid and a gas. Use the buttons below to turn the models and read about each state.",
  intro:"The same particles in three states. Drag to turn the boxes, pick a state to read about it, and switch on Motion to see how the particles move.",
  toggles:[{key:"labels",label:"Labels"},{key:"motion",label:"Motion"}],
  parts:[
   {id:"solid",btn:"Solid",name:"Solid",say:"The particles are packed tightly in a fixed pattern and held there by strong attractions. They can't move around, but they always vibrate in place. That's why a solid keeps its shape and its volume."},
   {id:"liquid",btn:"Liquid",name:"Liquid",say:"The particles are still close together, but they can slide past each other. That's why a liquid keeps its volume but flows and takes the shape of its container."},
   {id:"gas",btn:"Gas",name:"Gas",say:"The particles are very far apart and move quickly in all directions, so a gas spreads out to fill its whole container. All that empty space is why a gas can be squeezed smaller."}]};
swap("matter/states",el=>mount(shell(el,"Each ball stands for one particle. Not to scale: in a real gas the particles are about ten times farther apart than shown."),statesModel));

/* ================= Lesson 8: why ice floats ================= */
const WA={yaw:deg(-9),pitch:deg(9),sel:null,labels:true,links:true};
// Ice: particles in the open six-sided pattern of real ice, seen down its six-sided rings.
const ICE=(()=>{
  const U=10,c=1.633,base=[[1/3,2/3,.375],[2/3,1/3,.5],[2/3,1/3,.875],[1/3,2/3,1]],pad=.07,Lx=4,Ly=2*Math.sqrt(3),Lz=.625*c+2*pad,pts=[];   // two puckered sheets of rings: deep enough to look 3D, shallow enough to read
  for(let i=0;i<12;i++)for(let j=0;j<8;j++)for(let k=0;k<1;k++)base.forEach(b=>{
    const u=i+b[0],v=j+b[1],x=u-v/2,   // hexagonal axes sit 120° apart
   y=v*Math.sqrt(3)/2,z=(b[2]-.375)*c+pad;
    if(x>=-1e-6&&x<Lx-1e-6&&y>=-1e-6&&y<Ly-1e-6) pts.push([x*U,y*U,z*U]);});
  const bonds=[];
  for(let a=0;a<pts.length;a++)for(let b=a+1;b<pts.length;b++){const d=Math.hypot(pts[a][0]-pts[b][0],pts[a][1]-pts[b][1],pts[a][2]-pts[b][2]);if(d<.66*U) bonds.push([a,b]);}
  return {pts,bonds,L:[Lx*U,Ly*U,Lz*U],bond:.612*U};
})();
const GAPX=9,RW=1.6;
// Liquid: the same number of particles in 92% of the space (0.92 g/cm³ ÷ 1.00 g/mL), no pattern.
const LIQ={h:ICE.L[1]*.92,pts:sprinkle(ICE.pts.length,RW,ICE.L[0]-RW,RW,ICE.L[1]*.92-RW,RW,ICE.L[2]-RW,ICE.bond*.86,23)};
function waterScene(st,o){
  const [Lx,Ly,Lz]=ICE.L,ix=-(Lx+GAPX/2),lx=GAPX/2,items=[];
  const at=(x0,p)=>[x0+p[0],p[1],p[2]-Lz/2];
  frame(ix-1,ix+Lx+1,-1,Ly+1,-Lz/2-1,Lz/2+1,"edge","ice").forEach(l=>items.push(l));
  frame(lx,lx+Lx,0,LIQ.h,-Lz/2,Lz/2,"edge","liquid").forEach(l=>items.push(l));
  ICE.pts.forEach(p=>items.push({ball:at(ix,p),r:RW,tone:"p",part:"ice"}));
  if(st.links) ICE.bonds.forEach(([a,b])=>items.push({a:at(ix,ICE.pts[a]),b:at(ix,ICE.pts[b]),tone:"link",w:2.4,part:"ice"}));
  LIQ.pts.forEach(p=>items.push({ball:at(lx,p),r:RW,tone:"p",part:"liquid"}));
  // dashed outline: how tall the liquid's box would be if it took up as much room as the ice
  [[0,0],[1,0],[1,1],[0,1]].forEach(([i,k],n,a)=>{const m=a[(n+1)%4],P=(q,y)=>[lx+q[0]*Lx,y,(q[1]-.5)*Lz];
    items.push({a:P([i,k],Ly),b:P(m,Ly),tone:"edge",dash:"3 4"},{a:P([i,k],LIQ.h),b:P([i,k],Ly),tone:"edge",dash:"3 4"});});
  const pt=scatter(items,st,{W:o.W,H:o.H,top:o.narrow?32:54,bottom:12,s:6.2*o.k,sel:st.sel,tones:TONE});
  let h=pt.html;
  if(st.labels){
    const a=pt.S([ix+Lx/2,Ly+1,0]),b=pt.S([lx+Lx/2,Ly,0]),up=o.narrow?12:30;
    h+=tag(a[0],+a[1]-up,o.narrow?["Ice"]:["Ice · 0.92 g/cm³","open six-sided pattern"],{part:"ice"});
    h+=tag(b[0],+b[1]-up,o.narrow?["Liquid water"]:["Liquid water · 1.00 g/mL","same particles, less space"],{part:"liquid"});
  }
  return h;
}
const waterModel={state:WA,yawMax:deg(60),scene:waterScene,
  aria:"3D particle models of ice and liquid water holding the same number of particles. The ice particles form an open six-sided pattern and take up more space. Use the buttons below to turn the models.",
  intro:"Both boxes hold the same number of water particles. Compare how much space they need. Drag to turn the models, or pick one to read about it.",
  toggles:[{key:"labels",label:"Labels"},{key:"links",label:"Links"}],
  parts:[
   {id:"ice",btn:"Ice",name:"Ice",say:"When water freezes, each particle locks onto its neighbours in an open six-sided pattern with empty space in the middle of every ring. That takes up more room, so ice is less dense than liquid water (0.92 g/cm³) and floats. The same pattern is why snowflakes have six sides."},
   {id:"liquid",btn:"Liquid water",name:"Liquid water",say:"The particles still attract each other, but they keep moving and sliding, so they fall into the gaps. The same number of particles fits into less space, which makes liquid water denser (1.00 g/mL). The dashed outline shows the room the ice needed."}]};
// Winter lake: a flat cross-section is the clearest way to show the layers.
function lakeSvg(){
  const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" font-family="var(--f-body), system-ui, sans-serif" font-size="${o.size||14}"${o.w?` font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}">${esc(s)}</text>`;
  const band=k=>`color-mix(in srgb, #2f6ea8 ${k}%, var(--paper))`,bed="M40 92 L40 150 C120 262 250 292 360 292 C470 292 600 262 680 150 L680 92 Z";
  const fish=(x,y,f)=>`<g transform="translate(${x} ${y}) scale(${f} 1)" fill="color-mix(in srgb, var(--ink) 55%, var(--paper))"><ellipse cx="0" cy="0" rx="17" ry="7"/><path d="M14 0 L27 -8 L27 8 Z"/></g>`;
  let b=`<defs><clipPath id="m3-lake"><path d="${bed}"/></clipPath></defs>`;
  b+=`<g clip-path="url(#m3-lake)">`+[[92,36,16],[128,40,25],[168,40,34],[208,40,43],[248,50,52]].map(([y,hh,k])=>`<rect x="40" y="${y}" width="640" height="${hh}" fill="${band(k)}"/>`).join("")+`</g>`;
  b+=`<path d="${bed}" fill="none" stroke="var(--muted)" stroke-width="1.5"/>`;
  b+=`<rect x="40" y="74" width="640" height="18" fill="color-mix(in srgb, #9cc9ed 40%, var(--paper))" stroke="var(--muted)"/>`;
  b+=`<path d="M12 74 H40 M680 74 H708" stroke="var(--muted)" stroke-width="1.5"/>`;
  b+=T(360,40,"Winter air: far below 0°C",{a:"middle",fill:"var(--muted)"});
  b+=T(360,88,"Ice · 0°C · least dense, so it floats",{a:"middle",w:700,size:13});
  [["0°C",112],["1°C",150],["2°C",190],["3°C",230],["4°C",274]].forEach(([s,y])=>b+=T(360,y,s,{a:"middle",w:700,size:13}));
  b+=T(64,112,"coldest water sits just under the ice",{size:12});
  b+=T(360,312,"4°C water is the densest, so it sinks to the bottom and stays liquid",{a:"middle",w:700,size:13});
  b+=fish(205,205,1)+fish(520,238,-1)+fish(455,186,1);
  return `<div style="overflow-x:auto;margin-top:14px"><svg viewBox="0 0 720 330" role="img" aria-label="Cross-section of a frozen lake in winter. Ice at zero degrees floats on top, the water gets warmer with depth, and the densest water at four degrees sits at the bottom where fish survive." style="display:block;width:100%;height:auto;min-width:520px">${b}</svg></div><p class="note" style="margin-top:8px">A frozen lake in winter, simplified and not to scale. The ice insulates the water below, so fish and other living things survive until spring.</p>`;
}
swap("matter/water",el=>{const m=shell(el,"Each ball stands for one water particle. Sizes and spacing are simplified.");mount(m,waterModel);el.insertAdjacentHTML("beforeend",lakeSvg());});

/* ================= Lesson 4: the ramp test ================= */
const VI={yaw:deg(-30),pitch:deg(30),sel:null,labels:true,warm:false};
const LANES=[["water","Water",-9,"Water"],["oil","Vegetable oil",0,"Oil"],["syrup","Syrup",9,"Syrup"]];
// Same model as the Viscosity Ramp Lab on this page (viscosity-race.js), so the picture and the lab agree.
function reach(f,T){
  const core=H.viscosityCore,fi=core?core.flowIndex:(k,t)=>1.25+({water:1,oil:2.15,syrup:5.6})[k]*Math.exp(-.022*(t-20))*1.25;
  return Math.min(1,fi("water",20)/fi(f,T));
}
function rampScene(st,o){
  const X=30,Y=20,Z=15,T=st.warm?50:20,P=(u,z,lift)=>[-X+2*X*u,Y-Y*u+(lift||0),z];
  const ramp=solid([{p:[P(0,-Z),P(1,-Z),P(1,Z),P(0,Z)],tone:"board"},{p:[[-X,-2,-Z],[X,-2,-Z],[X,-2,Z],[-X,-2,Z]],tone:"board"},
    {p:[[-X,-2,-Z],[-X,Y,-Z],[-X,Y,Z],[-X,-2,Z]],tone:"board"},{p:[[X,-2,-Z],[X,0,-Z],[X,0,Z],[X,-2,Z]],tone:"board"},
    {p:[[-X,-2,-Z],[X,-2,-Z],[X,0,-Z],[-X,Y,-Z]],tone:"board"},{p:[[-X,-2,Z],[X,-2,Z],[X,0,Z],[-X,Y,Z]],tone:"board"}]);
  const flat=(pts,tone)=>({p:pts,tone,flat:true}),u0=.05,u1=.95,marks={f:[flat([P(u0-.012,-Z,.15),P(u0,-Z,.15),P(u0,Z,.15),P(u0-.012,Z,.15)],"line"),flat([P(u1,-Z,.15),P(u1+.012,-Z,.15),P(u1+.012,Z,.15),P(u1,Z,.15)],"line")],c:[0,0,0],keep:true};
  const lanes=LANES.map(([id,,z])=>{
    const ue=u0+(u1-u0)*reach(id,T),w=3.2,pts=[P(u0,z-w,.3),P(ue-.03,z-w,.3)];
    for(let i=0;i<=8;i++){const a=-Math.PI/2+Math.PI*i/8;pts.push(P(ue-.03+.03*Math.cos(a),z+w*Math.sin(a),.3));}   // rounded front of the stream
    pts.push(P(u0,z+w,.3));
    return {f:[flat(pts,id)],c:[0,0,z],keep:true,part:id,ue,z};
  });
  const order=lanes.slice().sort((a,b)=>Math.cos(st.yaw)*(a.z-b.z));
  const ov=[marks,...order];ov.keep=true;
  const pt=paint([[ramp],ov],st,{W:o.W,H:o.H,top:o.narrow?34:50,bottom:22,s:8.2*o.k,sel:st.sel,tones:TONE});
  let h=pt.html;
  if(st.labels){
    lanes.forEach((l,i)=>{const a=pt.S(P(l.ue,l.z,.3)),ly=+a[1]-(o.narrow?16:22)-i*(o.narrow?0:4);
      h+=lead([a[0],+a[1]-2],[a[0],ly+5])+tag(a[0],ly,[LANES[i][o.narrow?3:1]],{part:l.part});});
    const s=pt.S(P(u0,-Z,0)),f=pt.S(P(u1,Z,0));
    if(!o.narrow) h+=tag(+s[0]-6,+s[1]-6,["Start"],{a:"end"})+tag(+f[0]+8,+f[1]+14,["Finish"],{a:"start"});
  }
  h+=`<text x="${o.W-10}" y="${o.H-8}" text-anchor="end" font-family="var(--f-body), system-ui, sans-serif" font-size="11.5" fill="var(--muted)">${st.warm?"All three warmed to 50°C":"All three at room temperature, 20°C"} · same time on the ramp</text>`;
  return h;
}
const rampModel={state:VI,yawMax:deg(50),scene:rampScene,
  aria:"3D model of three liquids released together down the same ramp. Water has travelled farthest, vegetable oil is behind it and syrup has moved least. Use the buttons below to turn the ramp and warm the liquids.",
  intro:"Three liquids, same ramp, same amount, same start. The picture shows how far each has flowed after the same time. Pick a liquid, then warm them up.",
  toggles:[{key:"labels",label:"Labels"},{key:"warm",label:"Warm to 50°C"}],
  parts:[
   {id:"water",btn:"Water",name:"Water",say:st=>"Low viscosity. Its particles slide past each other easily, so it flows fastest and reaches the finish first."+(st.warm?" Warming it makes little difference you could see on a ramp this short.":"")},
   {id:"oil",btn:"Vegetable oil",name:"Vegetable oil",say:st=>"Higher viscosity than water. Its particles are bigger and resist sliding past each other, so it flows more slowly. It is still less dense than water (0.92 g/mL) and floats on it: viscosity and density are different properties."+(st.warm?" Warmed up, it nearly keeps pace with the water.":"")},
   {id:"syrup",btn:"Syrup",name:"Syrup",say:st=>"High viscosity. Strong attractions between its particles make it resist flowing"+(st.warm?". Warmed up, it flows much more easily, because its particles have more energy to slide past each other. It is still the slowest of the three.":", so it has barely moved. Try warming it.")}]};
swap("matter/viscosity",el=>mount(shell(el,"A model for comparing, not measured data. A fair test keeps the ramp, amount, surface, starting line and temperature the same and changes only the liquid."),rampModel));
})();
