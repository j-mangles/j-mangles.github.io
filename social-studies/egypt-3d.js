/* Rotatable 3D models for Egypt lessons 3 (pyramids) and 5 (temple), drawn with assets/model3d.js.
   Each model registers in EgyptInteractives under the same key as the flat diagram in
   egypt-diagrams.js, which stays as the fallback if a model fails to draw.
   Facts and dates follow the Unit 2 lesson notes. */
(function(){
"use strict";
const M=window.Model3D||{},{unit,box,taper,column,camera,paint,tag,lead,mount,deg}=M;
const STONE="color-mix(in srgb, var(--accent) 44%, var(--panel))";
const TONE={stone:STONE,
  sand:"color-mix(in srgb, var(--accent) 15%, var(--panel))",
  soil:"color-mix(in srgb, var(--accent) 27%, var(--panel))",
  cut:"color-mix(in srgb, var(--accent) 31%, var(--panel))",
  dim:`color-mix(in srgb, var(--ink) 26%, ${STONE})`,
  dark:`color-mix(in srgb, var(--ink) 54%, ${STONE})`,
  hollow:"color-mix(in srgb, var(--ink) 82%, var(--panel))",
  gold:"var(--accent)"};

/* ================= Lesson 3: mastaba, step pyramid, true pyramid ================= */
const PYR={yaw:deg(-24),pitch:deg(20),sel:null,labels:true,cut:false,scale:false};
const TOMBS=[
  {id:"mastaba",w:25,d:12.5,h:9,k:2.2,name:"Mastaba",short:"Mastaba",note:"flat-roofed tomb"},
  {id:"step",w:60.5,d:54.5,h:62,k:1.3,name:"Step Pyramid of Djoser",short:"Step Pyramid",note:"c. 2670 BCE · about 60 m tall"},
  {id:"great",w:115,d:115,h:146.6,k:.72,name:"Great Pyramid of Khufu",short:"Great Pyramid",note:"c. 2560 BCE · about 146 m tall"}];
function pyramidScene(st,o){
  const gap=42,ks=TOMBS.map(t=>st.scale?1:t.k),total=TOMBS.reduce((a,t,i)=>a+2*t.w*ks[i],0)+gap*2;
  let x=-total/2;const cx=TOMBS.map((t,i)=>{const c=x+t.w*ks[i];x+=2*t.w*ks[i]+gap;return c;});
  const half=st.cut,models=[],over=[],marks=[];
  const flat=(pts,tone)=>({p:pts.map(p=>[p[0],p[1],.4]),tone,flat:true});
  const rect=(x0,x1,y0,y1,tone)=>flat([[x0,y0],[x1,y0],[x1,y1],[x0,y1]],tone);
  const run=(a,b,w,tone)=>{const d=unit([b[0]-a[0],b[1]-a[1],0]),n=[-d[1]*w/2,d[0]*w/2];return flat([[a[0]+n[0],a[1]+n[1]],[b[0]+n[0],b[1]+n[1]],[b[0]-n[0],b[1]-n[1]],[a[0]-n[0],a[1]-n[1]]],tone);};
  TOMBS.forEach((t,i)=>{
    const k=ks[i],c=cx[i],X=v=>c+v*k,Y=v=>v*k,g=[];g.keep=true;
    if(t.id==="mastaba") g.push(taper(c,0,0,Y(9),25*k,12.5*k,22*k,10*k,"stone",t.id,half));
    if(t.id==="step") for(let s=0;s<6;s++){const a=60.5-s*8.6,b=54.5-s*7.7;g.push(taper(c,0,Y(s*62/6),Y((s+1)*62/6),a*k,b*k,(a-1.6)*k,(b-1.6)*k,"stone",t.id,half));}
    if(t.id==="great") g.push(taper(c,0,0,Y(146.6),115*k,115*k,0,0,"stone",t.id,half));
    models.push({g,c});
    if(half){
      if(t.id==="mastaba"){over.push(rect(X(-1.6),X(1.6),Y(-15),Y(9),"hollow"),rect(X(-1.6),X(9),Y(-20),Y(-15),"gold"));marks.push([X(4),Y(-17.5)]);}
      if(t.id==="step"){over.push(rect(X(-3.5),X(3.5),Y(-28),Y(0),"hollow"),rect(X(-3.5),X(3.5),Y(-28),Y(-23),"gold"));marks.push([X(0),Y(-25.5)]);}
      if(t.id==="great"){
        over.push(run([X(-101.7),Y(17)],[X(-8),Y(-29.8)],3*k+1,"hollow"),rect(X(-8),X(6),Y(-34),Y(-29),"hollow"),
          run([X(-75.7),Y(4)],[X(-41.7),Y(21)],3*k+1,"hollow"),run([X(-41.7),Y(21)],[X(5),Y(44.5)],7*k,"hollow"),rect(X(5),X(13),Y(42.5),Y(49),"gold"));
        marks.push([X(9),Y(49),1]);
      }
    }
  });
  const gx=total/2+18,gz=TOMBS[2].d*ks[2]+16,ground=box(-gx,gx,half?-42:-4,0,-gz,half?0:gz,"sand");
  if(half) ground.f.forEach(f=>{if(f.n[2]>.9) f.tone="soil";});
  const near=Math.sin(st.yaw)>0;                 // which end of the row is closer to the viewer
  const order=models.slice().sort((a,b)=>near?b.c-a.c:a.c-b.c).map(m=>m.g);
  const ov=[{f:over,c:[0,0,0],keep:true}];ov.keep=true;
  const view={W:o.W,H:o.H,top:o.narrow?34:58,bottom:half?34:24,s:1.6*o.k,sel:st.sel,tones:TONE};
  const pt=paint([[ground],...order,ov],st,view);
  let h=pt.html;
  if(st.labels){
    TOMBS.forEach((t,i)=>{const a=pt.S([cx[i],t.h*ks[i],0]),ly=+a[1]-(o.narrow?14:30);
      h+=lead([a[0],+a[1]-3],[a[0],ly+ (o.narrow?4:19)])+tag(a[0],ly,o.narrow?[t.short]:[t.name,t.note],{part:t.id});});
    marks.forEach(([x,y,side],i)=>{if(o.narrow&&st.scale&&i===0) return;   // no room beside the tiny true-scale mastaba on a phone
      const a=pt.S([x,y,.4]);   // the Great Pyramid's label sits above its chamber, the others below
      h+=side?lead([a[0],+a[1]-2],[a[0],+a[1]-10])+tag(a[0],+a[1]-14,["Burial chamber"]):lead([a[0],+a[1]+4],[a[0],+a[1]+14])+tag(a[0],+a[1]+27,["Burial chamber"]);});
  }
  h+=`<text x="${o.W-10}" y="${o.H-10}" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="var(--muted)">${st.scale?"Shown to scale":"Not to scale"}</text>`;
  return h;
}
const pyramidModel={state:PYR,yawMax:deg(50),aria:"3D models of a mastaba, the Step Pyramid of Djoser and the Great Pyramid of Khufu. Use the buttons below to turn the models and read about each one.",
  intro:"Drag to turn the models. Pick a tomb to read about it, then cut them open to find the burial chamber.",
  toggles:[{key:"labels",label:"Labels"},{key:"cut",label:"Cut open"},{key:"scale",label:"True scale"}],
  parts:[
   {id:"mastaba",btn:"Mastaba",name:"Mastaba",say:st=>"A flat-roofed tomb that came before the pyramid."+(st.cut?" The body was not inside the building. It lay in a chamber cut into the rock underneath.":"")},
   {id:"step",btn:"Step Pyramid",name:"Step Pyramid of Djoser",say:st=>"Built around 2670 BCE. Imhotep designed it by stacking mastabas, each smaller than the one below. He is the first architect we know by name."+(st.cut?" The burial chamber is still underground, at the bottom of a deep shaft.":"")},
   {id:"great",btn:"Great Pyramid",name:"Great Pyramid of Khufu",say:st=>"Built around 2560 BCE, about 146 m tall, with smooth sides, a base almost perfectly square and lined up to true north."+(st.cut?" Here the burial chamber is high up inside the pyramid, reached by sloping passages.":"")}],
  scene:pyramidScene};

/* ================= Lesson 5: walking into a temple ================= */
const TEM={yaw:deg(30),pitch:deg(24),sel:null,labels:true,roof:false};
const OFF=71;   // model is built from x=-12 (obelisks) to x=155 (back wall); OFF centres it
function templeScene(st,o){
  const far=(n)=>camera(st)(n)[2]<0;              // a wall is drawn only when it is on the far side
  const B=(x0,x1,y0,y1,z0,z1,tone,part)=>box(x0-OFF,x1-OFF,y0,y1,z0,z1,tone,part);
  const room=()=>({floor:[],walls:[],things:[],roof:[]});
  const R={ob:room(),py:room(),co:room(),pa:room(),ha:room(),pb:room(),sa:room()};
  // obelisks
  [-10,10].forEach(z=>{R.ob.things.push(taper(-9-OFF,z,0,26,1.7,1.7,1.1,1.1,"stone","obelisk"),taper(-9-OFF,z,26,29.5,1.1,1.1,0,0,"gold","obelisk"));});
  // pylon: two sloping towers and the gateway between them
  [-17,17].forEach(z=>R.py.things.push(taper(7-OFF,z,0,44,7,13,5.4,12,"stone","pylon")));
  R.py.things.push(B(2.5,11.5,21,31,-4.6,4.6,"stone","pylon"));
  // open court
  [-1,1].forEach(sd=>{if(far([0,0,sd])) R.co.walls.push(B(14,74,0,22,sd>0?30:-31.5,sd>0?31.5:-30,"stone","court"));
    [22,33.5,45,56.5,68].forEach(x=>R.co.things.push(column(x-OFF,sd*24,1.8,0,16,"stone","court")));});
  // wall between court and hall, with a doorway
  R.pa.things.push(B(74,75.5,0,30,-31.5,-5,"stone","hall"),B(74,75.5,0,30,5,31.5,"stone","hall"),B(74,75.5,20,30,-5,5,"stone","hall"));
  // hypostyle hall
  R.ha.floor.push(B(75.5,124,0,3,-30,30,"dim","hall"));
  [-1,1].forEach(sd=>{if(far([0,0,sd])) R.ha.walls.push(B(75.5,124,3,30,sd>0?30:-31.5,sd>0?31.5:-30,"dim","hall"));});
  [83,93.5,104,114.5].forEach(x=>[-23,-13,13,23].forEach(z=>R.ha.things.push(column(x-OFF,z,2.6,3,28,"dim","hall"))));
  if(st.roof) R.ha.roof.push(B(75.5,124,28,30,-31.5,31.5,"stone","hall"));
  // wall between hall and sanctuary
  R.pb.things.push(B(124,125.5,3,30,-31.5,-4,"dim","sanctuary"),B(124,125.5,3,30,4,31.5,"dim","sanctuary"),B(124,125.5,17,30,-4,4,"dim","sanctuary"));
  // sanctuary
  R.sa.floor.push(B(125.5,155.5,0,6,-15.5,15.5,"dark","sanctuary"));
  [-1,1].forEach(sd=>{if(far([0,0,sd])) R.sa.walls.push(B(125.5,155.5,6,22,sd>0?14:-15.5,sd>0?15.5:-14,"dark","sanctuary"));});
  if(far([1,0,0])) R.sa.walls.push(B(154,155.5,6,22,-14,14,"dark","sanctuary"));
  R.sa.things.push(B(142,149,6,17,-4,4,"hollow","sanctuary"),B(137.5,140,6,13.5,-1.4,1.4,"gold","sanctuary"));
  if(st.roof) R.sa.roof.push(B(125.5,155.5,22,23.5,-15.5,15.5,"stone","sanctuary"));
  const ground=B(-26,168,-3,0,-44,44,"sand");
  // rooms are separated by walls across the path, so draw them from the far end to the near end
  let rooms=Object.values(R); if(Math.sin(st.yaw)<=0) rooms=rooms.slice(); else rooms=rooms.slice().reverse();
  const groups=[[ground]];rooms.forEach(r=>{groups.push(r.floor,r.walls,r.things,r.roof);});
  const view={W:o.W,H:o.H,top:o.narrow?30:40,bottom:14,s:3.9*o.k,sel:st.sel,tones:TONE};
  const pt=paint(groups,st,view);
  let h=pt.html;
  if(st.labels){
    const top=o.narrow?20:26;
    [["pylon","1","Pylon",[7,44,0]],["court","2","Open court",[44,16,0]],["hall","3","Hypostyle hall",[99,30,0]],["sanctuary","4","Sanctuary",[140,22,0]]].forEach(([id,n,t,p])=>{
      const a=pt.S([p[0]-OFF,p[1],p[2]]);
      h+=lead([a[0],+a[1]-2],[a[0],top+6])+tag(a[0],top,[o.narrow?n:`${n} ${t}`],{part:id});});
    if(!o.narrow&&Math.sin(st.yaw)>-.05){const b=pt.S([-11-OFF,15,Math.sin(st.yaw)>0?10:-10]);h+=tag(+b[0]-6,+b[1],["Obelisks"],{part:"obelisk",a:"end"});}
  }
  return h;
}
const templeModel={state:TEM,yawMax:deg(50),aria:"3D model of an Egyptian temple: obelisks, pylon gateway, open court, hypostyle hall and sanctuary. Use the buttons below to turn the model and read about each part.",
  intro:"Walk in from the left. The floor rises, the ceiling drops, the light fades and fewer people are allowed. Drag to turn the temple, or pick a part.",
  toggles:[{key:"labels",label:"Labels"},{key:"roof",label:"Roof on"}],
  parts:[
   {id:"pylon",btn:"1 Pylon",name:"Pylon",say:"The huge gateway at the front of the temple. Everyone could see it, and for most people this was as close as they came."},
   {id:"court",btn:"2 Open court",name:"Open court",say:"Open to the sky and full of sunlight. Some people were let in, on festival days."},
   {id:"hall",btn:"3 Hypostyle hall",name:"Hypostyle hall",say:"A hall filled with columns holding up the roof, so it was dim inside. Priests only. The Great Hypostyle Hall at Karnak has 134 columns."},
   {id:"sanctuary",btn:"4 Sanctuary",name:"Sanctuary",say:"The small, dark room at the very back, where the god lived in a statue. The fewest people of all were allowed here."},
   {id:"obelisk",btn:"Obelisks",name:"Obelisk",say:"A tall, four-sided stone with a pointed top. They often stood in pairs in front of the pylon."}],
  scene:templeScene};

function safe(key,model){
  return el=>{try{mount(el,model);}catch(e){const f=window.EgyptDiagrams&&window.EgyptDiagrams[key];if(!f) throw e;el.innerHTML=f().svg;}};
}
window.EgyptInteractives=Object.assign(window.EgyptInteractives||{},{
  pyramids:{mount:safe("pyramids",pyramidModel),cap:"Each design built on the one before it."},
  temple:{mount:safe("temple",templeModel),cap:"A temple was a house for a god, not a place for crowds. Simplified model, not a real floor plan."}});
})();
