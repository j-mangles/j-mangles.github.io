/* Ancient Egypt lesson diagrams. Each returns {svg, cap}. Colours come from the atlas CSS variables,
   so they work in light and dark mode. Facts and dates follow the Unit 2 class slides. */
(function(){
"use strict";
const F='font-family="Inter, system-ui, sans-serif"';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${F} font-size="${o.size||12}" ${o.w?`font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}"${o.it?' font-style="italic"':""}>${esc(s)}</text>`;
const R=(x,y,w,h,fill,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx??4}" fill="${fill}" ${o.stroke?`stroke="${o.stroke}" stroke-width="${o.sw||1.2}"`:""} ${o.op?`opacity="${o.op}"`:""}/>`;
const L=(x1,y1,x2,y2,c="var(--muted)",o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${o.sw||1.2}" ${o.dash?`stroke-dasharray="${o.dash}"`:""} ${o.mk?'marker-end="url(#eg-ar)"':""}/>`;
const svg=(w,h,label,body)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><defs><marker id="eg-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>${body}</svg>`;
const SAND="color-mix(in srgb, var(--accent) 22%, var(--panel))", SILT="color-mix(in srgb, var(--farm) 55%, var(--panel))", NILE="var(--river)";
const EG="var(--river)", NU="var(--accent)", BAD="color-mix(in srgb, var(--bad) 30%, var(--panel))";
const yearLabel=y=>y<0?`${-y} BCE`:`${y} CE`;

function flood(){
  const W=720,H=250,x0=60,x1=690,mw=(x1-x0)/12,M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const lv=[.12,.1,.08,.07,.07,.12,.5,.72,.78,.95,.6,.25]; const Y=v=>190-v*120;
  let b=T(x0,22,"Height of the Nile through one year (before the Aswan dams)",{w:600,size:13});
  b+=L(x0,190,x1,190,"var(--muted)");
  M.forEach((m,i)=>{b+=T(x0+mw*i+mw/2,206,m,{a:"middle",size:11,fill:"var(--muted)"});});
  const pts=lv.map((v,i)=>[x0+mw*i+mw/2,Y(v)]);
  b+=`<path d="M${x0},190 L${pts.map(p=>p.join(",")).join(" L")} L${x1},190 Z" fill="color-mix(in srgb, var(--river) 22%, transparent)"/>`;
  b+=`<polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${NILE}" stroke-width="3" stroke-linejoin="round"/>`;
  const note=(i,txt,lx,ly,a)=>{const [x,y]=pts[i];b+=`<circle cx="${x}" cy="${y}" r="4" fill="${NILE}"/>`+L(x,y-5,lx,ly+4,"var(--muted)",{sw:1})+T(lx,ly,txt,{a,size:11.5,w:600});};
  note(5,"June: first rise at Aswan",250,120,"middle"); note(6,"July: rising fastest",330,84,"end"); note(8,"Sept: levels off ~3 weeks",470,56,"end"); note(9,"Oct: peak",600,48,"start");
  [["Flood season",6,10,NILE],["Growing season",10,14,"var(--farm)"],["Harvest season",2,6,"var(--accent)"]].forEach(([n,a,z,c])=>{
    const segs=z>12?[[a,12],[0,z-12]]:[[a,z]];
    segs.forEach(([s,e],k)=>{b+=R(x0+mw*s+1,222,mw*(e-s)-2,8,c,{rx:3,op:.85});if(k===0)b+=T(x0+mw*s+4,244,n,{size:11,fill:"var(--muted)"});});
  });
  return {svg:svg(W,H,"The Nile's yearly flood from June to October",b),cap:"The timing was reliable every year. The height was not: too high wrecked villages, too low meant famine."};
}

function kemet(){
  const W=720,H=210;let b=T(20,22,"Cross-section of the Nile Valley",{w:600,size:13});
  b+=`<path d="M20,70 L170,96 L270,118 L360,124 L450,118 L550,96 L700,70 L700,180 L20,180 Z" fill="${SAND}"/>`;
  b+=`<path d="M190,104 L270,118 L320,122 L400,122 L450,118 L530,104 L530,122 L190,122 Z" fill="${SILT}"/>`;
  b+=`<path d="M320,122 Q360,142 400,122 Z" fill="${NILE}"/>`;
  b+=T(85,64,"DESHRET",{w:700,size:12.5,fill:"var(--accent)",a:"middle"})+T(85,80,"Red Land: desert",{size:11,fill:"var(--muted)",a:"middle"});
  b+=T(635,64,"DESHRET",{w:700,size:12.5,fill:"var(--accent)",a:"middle"})+T(635,80,"Red Land: desert",{size:11,fill:"var(--muted)",a:"middle"});
  b+=T(250,150,"KEMET",{w:700,size:12.5,fill:"var(--farm)",a:"middle"})+T(250,166,"Black Land: silt fields",{size:11,fill:"var(--muted)",a:"middle"});
  b+=T(470,150,"KEMET",{w:700,size:12.5,fill:"var(--farm)",a:"middle"})+T(470,166,"Black Land: silt fields",{size:11,fill:"var(--muted)",a:"middle"});
  b+=L(360,132,360,188,"var(--muted)",{sw:1})+T(360,202,"The Nile",{a:"middle",w:600,size:11.5,fill:NILE});
  return {svg:svg(W,H,"Kemet, the black farmland, between the red desert on both sides",b),cap:"About 96% of Egypt is desert. Almost everyone lived on the strip of black, silt-rich soil the flood left behind."};
}

function timelineAxis(x0,x1,a,z,y,ticks){let b=L(x0,y,x1,y,"var(--muted)");const X=v=>x0+(v-a)/(z-a)*(x1-x0);ticks.forEach(t=>{b+=L(X(t),y-4,X(t),y+4,"var(--muted)",{sw:1})+T(X(t),y+17,yearLabel(t),{a:"middle",size:10.5,fill:"var(--muted)"});});return {b,X};}

function kingdoms(){
  const W=740,H=220,x0=30,x1=715,{b:ax,X}=timelineAxis(x0,x1,-3150,0,150,[-3000,-2500,-2000,-1500,-1000,-500,0]);
  let b=T(x0,22,"3,000 years of Egypt: kingdoms and breakdowns",{w:600,size:13})+ax;
  const P=[["Early kings",-3100,-2650,0],["Old Kingdom",-2650,-2150,1],["1st Int.",-2150,-2050,2],["Middle Kingdom",-2050,-1700,1],["2nd Int.",-1700,-1550,2],["New Kingdom",-1550,-1070,1],["Divided, then foreign rule",-1070,-332,3],["Ptolemies",-332,-30,0]];
  P.forEach(([n,a,z,k])=>{const x=X(a),w=X(z)-X(a),fill=k===1?NILE:k===2?BAD:k===3?"color-mix(in srgb, var(--muted) 25%, var(--panel))":"color-mix(in srgb, var(--river) 35%, var(--panel))";
    const parts=k===1?n.split(" "):[n];b+=R(x,98,w,40,fill,{rx:3});
    if(w>52)parts.forEach((t,j)=>{b+=T(x+w/2,(parts.length>1?115:123)+j*14,t,{a:"middle",size:k===1?11.5:10.5,w:k===1?700:500,fill:k===1?"#fff":"var(--ink)"});});});
  [["1st Int.",-2100],["2nd Int.",-1625]].forEach(([n,y])=>{b+=T(X(y),88,n,{a:"middle",size:10.5,fill:"var(--bad)",w:600});});
  [[-3100,"Unification c. 3100"],[-2560,"Great Pyramid"],[-30,"Cleopatra dies, 30 BCE"]].forEach(([y,t],i)=>{b+=L(X(y),58,X(y),98,"var(--accent)",{dash:"3 3"})+T(X(y)+(i===2?-4:4),52,t,{size:11,w:600,fill:"var(--accent)",a:i===2?"end":"start"});});
  b+=T(x0,200,"Solid blue = Egypt united and strong. Red = Intermediate Periods, when Egypt split into rival regions.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Timeline of the Old, Middle and New Kingdoms",b),cap:"Egypt kept breaking apart and pulling itself back together as one kingdom."};
}

function pyramids(){
  const W=720,H=240,g=190;let b=T(20,22,"From mastaba to true pyramid",{w:600,size:13})+L(20,g,700,g,"var(--muted)");
  const fill="color-mix(in srgb, var(--accent) 45%, var(--panel))",st="var(--accent)";
  b+=`<path d="M60,${g} L75,${g-34} L185,${g-34} L200,${g} Z" fill="${fill}" stroke="${st}"/>`;
  b+=T(130,g+20,"Mastaba",{a:"middle",w:700})+T(130,g+36,"Flat-roofed tomb for early kings",{a:"middle",size:11,fill:"var(--muted)"});
  [[0,180],[1,150],[2,122],[3,96],[4,72],[5,50]].forEach(([i,w])=>{b+=R(360-w/2,g-22*(i+1),w,22,fill,{rx:1,stroke:st,sw:1});});
  b+=T(360,g+20,"Step Pyramid of Djoser",{a:"middle",w:700})+T(360,g+36,"c. 2670 BCE · designed by Imhotep",{a:"middle",size:11,fill:"var(--muted)"});
  b+=`<path d="M510,${g} L600,${g-150} L690,${g} Z" fill="${fill}" stroke="${st}"/>`;
  b+=T(600,g+20,"Great Pyramid of Khufu",{a:"middle",w:700})+T(600,g+36,"c. 2560 BCE · about 146 m tall",{a:"middle",size:11,fill:"var(--muted)"});
  b+=L(210,g-50,265,g-70,"var(--muted)",{mk:1})+L(455,g-80,515,g-100,"var(--muted)",{mk:1});
  b+=T(238,g-80,"stack them",{a:"middle",size:11,it:1,fill:"var(--muted)"})+T(486,g-112,"smooth the steps",{a:"middle",size:11,it:1,fill:"var(--muted)"});
  return {svg:svg(W,H,"Mastaba, step pyramid and true pyramid compared",b),cap:"Not to scale. Each design built on the one before it."};
}

function mummy(){
  const W=740,H=210;let b=T(20,22,"Making a mummy: about 70 days, start to finish",{w:600,size:13});
  const S=[["1","Brain out","Through the nose with a hook. Thought to be useless."],["2","Organs out","A cut in the left side. Lungs, liver, stomach, intestines."],["3","Heart stays","You will need it at the weighing of the heart."],["4","Dry in natron","Packed in natural salt for about 40 days."],["5","Canopic jars","The four dried organs go into four jars."],["6","Wrap in linen","Hundreds of metres, with amulets and spells."]];
  const w=110,gap=8,x0=12;
  S.forEach(([n,t,d],i)=>{const x=x0+i*(w+gap);
    b+=R(x,44,w,140,"var(--panel)",{stroke:i===2?"var(--accent)":"var(--rule)",sw:i===2?2:1.2,rx:8});
    b+=`<circle cx="${x+20}" cy="66" r="12" fill="${i===2?"var(--accent)":NILE}"/>`+T(x+20,70.5,n,{a:"middle",w:700,fill:"#fff"});
    b+=T(x+37,71,t,{w:700,size:11.5});
    const words=d.split(" ");let line="",ly=96;words.forEach(wd=>{if((line+" "+wd).trim().length>17){b+=T(x+10,ly,line.trim(),{size:11,fill:"var(--muted)"});ly+=15;line=wd;}else line+=" "+wd;});b+=T(x+10,ly,line.trim(),{size:11,fill:"var(--muted)"});
    if(i<5)b+=L(x+w+1,114,x+w+gap-1,114,"var(--muted)",{mk:1});});
  b+=T(20,202,"Why keep the body? The ka (life force) and ba (personality) needed somewhere to come back to.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Six steps of mummification",b),cap:"Herodotus described these steps around 450 BCE. CT scans of mummies back up most of what he said."};
}

function temple(){
  const W=740,H=250;let b=T(20,22,"Walking into an Egyptian temple",{w:600,size:13});
  const fill="color-mix(in srgb, var(--accent) 35%, var(--panel))",st="var(--accent)";
  b+=`<path d="M30,190 L44,60 L96,60 L110,190 Z" fill="${fill}" stroke="${st}"/>`;
  b+=`<path d="M110,190 L300,186 L300,186" fill="none"/>`+L(110,190,300,186,"var(--muted)",{sw:2});
  b+=`<path d="M300,186 L300,104 L490,110 L490,180 Z" fill="color-mix(in srgb, var(--muted) 22%, var(--panel))" stroke="var(--muted)"/>`;
  for(let i=0;i<6;i++){const x=318+i*30;b+=R(x,112+i*.6,10,72-i*1.2,fill,{rx:2});}
  b+=`<path d="M490,180 L490,128 L640,134 L640,176 Z" fill="color-mix(in srgb, var(--ink) 55%, var(--panel))" stroke="var(--ink)"/>`;
  b+=R(552,146,18,28,"var(--accent)",{rx:2})+T(561,140,"god",{a:"middle",size:10,fill:"var(--panel)"});
  b+=`<circle cx="200" cy="70" r="16" fill="color-mix(in srgb, #f2c14e 80%, var(--panel))"/>`;
  const col=[[70,"Pylon","Huge gateway","Everyone sees it"],[205,"Open court","Sunlit","Some people, on festival days"],[395,"Hypostyle hall","Forest of columns · dim","Priests only"],[565,"Sanctuary","Small and dark","The god's statue"]];
  col.forEach(([x,n,d,who])=>{b+=T(x,212,n,{a:"middle",w:700})+T(x,227,d,{a:"middle",size:10.5,fill:"var(--muted)"})+T(x,242,who,{a:"middle",size:10.5,fill:"var(--accent)",w:600});});
  b+=L(120,40,640,40,"var(--muted)",{mk:1})+T(380,34,"Further in: floor rises, ceiling drops, light fades, fewer people allowed",{a:"middle",size:11,it:1,fill:"var(--muted)"});
  return {svg:svg(W,H,"Cross-section of an Egyptian temple from pylon to sanctuary",b),cap:"A temple was a house for a god, not a place for crowds. Simplified, not a real floor plan."};
}

function scripts(){
  const W=740,H=208,x0=130,x1=715,{b:ax,X}=timelineAxis(x0,x1,-3300,500,160,[-3000,-2000,-1000,1,500]);
  let b=T(20,22,"Egypt's three scripts (dates approximate)",{w:600,size:13})+ax;
  [["Hieroglyphic",-3200,394,"Temples, tombs, monuments · last carved 394 CE",NILE,0],["Hieratic",-3000,200,"Fast everyday writing on papyrus","var(--farm)",0],["Demotic",-650,450,"Even faster, for daily life in late Egypt","var(--accent)",1]].forEach(([n,a,z,d,c,out],i)=>{const y=48+i*34;
    b+=T(20,y+15,n,{w:700,size:12})+R(X(a),y,X(z)-X(a),22,c,{rx:3,op:.85})+(out?T(X(a)-6,y+15,d,{size:10.5,a:"end",fill:"var(--muted)"}):T(X(a)+6,y+15,d,{size:10.5,fill:"#fff",w:600}));});
  b+=L(X(-196),40,X(-196),152,"var(--ink)",{dash:"3 3"})+T(X(-196)-6,198,"Rosetta Stone carved, 196 BCE",{size:11,w:600,a:"end"});
  return {svg:svg(W,H,"Timeline of hieroglyphic, hieratic and demotic writing",b),cap:"Hieroglyphic and demotic both appear on the Rosetta Stone (Lesson 12)."};
}

function social(){
  const W=720,H=290;let b=T(20,22,"Egypt's social pyramid",{w:600,size:13});
  const tiers=[["Pharaoh","god-king, owner of the land in theory"],["Vizier, nobles, high priests","ran the government and temples"],["Scribes and officials","kept records, collected taxes"],["Craftspeople and artisans","builders, painters, potters, weavers"],["Farmers","the great majority of Egyptians"],["Servants and enslaved people","household workers, war captives"]];
  const top=40,h=36,cx=225,base=360;
  tiers.forEach(([n,d],i)=>{const y=top+i*h,wt=base*(i)/6+40,wb=base*(i+1)/6+40;
    b+=`<path d="M${cx-wt/2},${y} L${cx+wt/2},${y} L${cx+wb/2},${y+h-2} L${cx-wb/2},${y+h-2} Z" fill="color-mix(in srgb, var(--accent) ${70-i*9}%, var(--panel))"/>`;
    b+=L(cx+wb/2+6,y+h/2,412,y+h/2,"var(--rule)",{sw:1})+T(420,y+h/2-2,n,{w:700,size:12})+T(420,y+h/2+13,d,{size:11,fill:"var(--muted)"});});
  b+=T(20,282,"Wider = more people. Farmers' harvests fed everyone above them.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Egyptian social pyramid from pharaoh to servants",b),cap:"Most people stayed in the class they were born into. Scribe school and the army were rare ways up."};
}

function trade(){
  const W=740,H=310,cx=370,cy=160;let b=T(20,22,"Who traded with Egypt, and for what (not to scale)",{w:600,size:13});
  b+=`<circle cx="${cx}" cy="${cy}" r="40" fill="${NILE}"/>`+T(cx,cy+5,"EGYPT",{a:"middle",w:800,fill:"#fff",size:14});
  const P=[["Cyprus and the Aegean","copper, pottery, olive oil",170,60,200,82],["The Levant (Byblos)","cedar wood, olive oil, wine",560,60,530,82],["Mesopotamia and Hatti","silver, horses, lapis lazuli",620,166,535,162],["Punt","incense, ebony, exotic animals",560,265,530,244],["Nubia","gold, ivory, ebony",180,265,210,244]];
  P.forEach(([n,g,x,y,ex,ey])=>{const dx=ex-cx,dy=ey-cy,d=Math.hypot(dx,dy),sx=cx+dx/d*44,sy=cy+dy/d*44;
    b+=L(ex,ey,sx,sy,"var(--muted)",{mk:1,sw:1.4})+T(x,y-4,n,{a:"middle",w:700,size:12})+T(x,y+12,g,{a:"middle",size:11,fill:"var(--muted)"});});
  b+=T(370,302,"Egypt sent back grain, linen, papyrus and gold. Long-distance trade was run by the pharaoh and the temples.",{a:"middle",size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Egypt's trading partners and goods",b),cap:"Prices were measured in deben, a weight of copper, even when no copper changed hands."};
}

function nubia(){
  const W=740,H=230,x0=30,x1=715,{b:ax,X}=timelineAxis(x0,x1,-2600,400,190,[-2500,-2000,-1500,-1000,-500,1]);
  let b=T(x0,22,"Egypt and Nubia: who had the upper hand?",{w:600,size:13})+ax;
  const S=[["Kerma, a rival kingdom",-2500,-1500,NU,0],["Egyptian forts",-1950,-1750,EG,1],["Egypt rules Nubia",-1500,-1070,EG,1],["Kush rules Egypt",-744,-656,NU,0],["Meroe",-300,350,NU,0]];
  S.forEach(([n,a,z,c,lane])=>{const y=lane?120:60,x=X(a),w=Math.max(X(z)-X(a),8),wide=w>110;b+=R(x,y,w,30,c,{rx:3,op:.9})+T(x+w/2,wide?y+19:y+46,n,{a:"middle",size:11.5,w:700,fill:wide?"#fff":"var(--ink)"});});
  b+=T(x0,52,"Nubia stronger",{size:11,fill:NU,w:700})+T(x0,112,"Egypt stronger",{size:11,fill:EG,w:700});
  b+=T(x0,224,"The stronger side switched more than once over 2,000+ years.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Five stages of the Egypt and Nubia relationship",b),cap:"Most written sources come from the Egyptian side, so archaeology matters for hearing Nubia directly."};
}

function pharaohs(){
  const W=740,H=250,x0=30,x1=715,{b:ax,X}=timelineAxis(x0,x1,-1550,0,120,[-1500,-1250,-1000,-750,-500,-250,0]);
  let b=T(x0,22,"Four pharaohs, fourteen centuries",{w:600,size:13})+ax;
  [["Hatshepsut",-1479,-1458],["Akhenaten",-1353,-1336],["Ramesses II",-1279,-1213],["Cleopatra VII",-51,-30]].forEach(([n,a,z],i)=>{const x=X(a),w=Math.max(X(z)-X(a),5),y=i%2?72:46;
    b+=R(x,98,w,18,"var(--accent)",{rx:2})+L(x+w/2,y+6,x+w/2,98,"var(--muted)",{sw:1})+T(x+w/2,y,n,{a:i===3?"end":"middle",w:700,size:12});});
  b+=`<path d="M${X(-1213)+8},140 L${X(-1213)+8},148 L${X(-51)-8},148 L${X(-51)-8},140" fill="none" stroke="var(--muted)"/>`+T((X(-1213)+X(-51))/2,164,"about 1,200 years with none of these four",{a:"middle",size:11,it:1,fill:"var(--muted)"});
  const y2=212,a=-2560,z=2026,P=v=>x0+(v-a)/(z-a)*(x1-x0);
  b+=L(x0,y2,x1,y2,"var(--muted)",{sw:2});
  [[-2560,"Great Pyramid built"],[-69,"Cleopatra born"],[2026,"You"]].forEach(([y,t],i)=>{b+=`<circle cx="${P(y)}" cy="${y2}" r="5" fill="${i===1?"var(--accent)":NILE}"/>`+T(P(y),y2-10,t,{a:i===0?"start":i===2?"end":"middle",size:11,w:600});});
  b+=T(x0,y2+22,"Cleopatra lived closer in time to you than to the people who built the Great Pyramid.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Timeline of Hatshepsut, Akhenaten, Ramesses II and Cleopatra",b),cap:"Ramesses II carved his victories onto monuments all over Egypt, which is a big part of why he is remembered as “the Great.”"};
}

function conquerors(){
  const W=740,H=210,x0=30,x1=715,{b:ax,X}=timelineAxis(x0,x1,-1100,0,165,[-1000,-800,-600,-400,-200,0]);
  let b=T(x0,22,"A thousand years of other people's pharaohs",{w:600,size:13})+ax;
  const E=[["Egypt splits",-1070,-1050,"var(--bad)"],["Kush",-744,-656,NU],["Assyria",-671,-663,"var(--muted)"],["Persia",-525,-404,"var(--muted)"],["Persia again",-343,-332,"var(--muted)"],["Alexander",-332,-323,EG],["Ptolemies (Greek)",-305,-30,EG]];
  E.forEach(([n,a,z,c],i)=>{const x=X(a),w=Math.max(X(z)-X(a),6),y=i%2?110:72,wide=w>150;b+=R(x,y,w,24,c,{rx:3,op:.9})+(wide?T(x+w/2,y+16,n,{a:"middle",size:11,w:700,fill:"#fff"}):T(x,y-6,n,{size:11,w:700}));});
  b+=L(X(-30),56,X(-30),160,"var(--ink)",{dash:"3 3"})+T(X(-30),50,"Rome, 30 BCE",{a:"end",size:11,w:700});
  b+=T(x0,200,"Egypt lost its independence long before it lost its culture: many conquerors ruled as pharaohs.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"Timeline of foreign rulers of Egypt from 1070 to 30 BCE",b),cap:"Dates are approximate. Egyptians won their country back more than once in between."};
}

function rosetta(){
  const W=740,H=290;let b=T(20,22,"How the Rosetta Stone was cracked",{w:600,size:13});
  b+=`<path d="M40,60 L70,44 L200,40 L240,58 L250,250 L30,250 Z" fill="color-mix(in srgb, var(--muted) 30%, var(--panel))" stroke="var(--muted)"/>`;
  [[62,110,"Hieroglyphs","14 lines survive",NILE],[118,170,"Demotic","32 lines","var(--farm)"],[176,244,"Greek","54 lines","var(--accent)"]].forEach(([y0,y1,n,d,c])=>{
    for(let y=y0+8;y<y1-4;y+=7)b+=L(48,y,232,y,c,{sw:2});
    b+=T(268,(y0+y1)/2-2,n,{w:700,fill:c})+T(268,(y0+y1)/2+13,d,{size:11,fill:"var(--muted)"});});
  const steps=[["Start with the Greek","Scholars could read it. It names King Ptolemy."],["Find the ovals","Royal names sit inside cartouches."],["Match the sounds","Ptolemy is spelled out sound by sound."],["Check a second name","Cleopatra shares P, O and L in the right places."]];
  steps.forEach(([t,d],i)=>{const y=72+i*46;b+=`<circle cx="${430}" cy="${y}" r="12" fill="${NILE}"/>`+T(430,y+4.5,String(i+1),{a:"middle",w:700,fill:"#fff"})+T(452,y,t,{w:700,size:12})+T(452,y+15,d,{size:11,fill:"var(--muted)"});});
  b+=T(20,280,"Champollion cracked it in 1822, using Coptic, the last form of Egyptian.",{size:11,fill:"var(--muted)"});
  return {svg:svg(W,H,"The Rosetta Stone's three scripts and the four decoding steps",b),cap:"Same decree, three scripts, 196 BCE. The stone has been in the British Museum since 1802."};
}

window.EgyptDiagrams={flood,kemet,kingdoms,pyramids,mummy,temple,scripts,social,trade,nubia,pharaohs,conquerors,rosetta};
})();
