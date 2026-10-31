/* Grade 8 Science Unit 2 (Matter, Density and Fluids): pictures for the lesson pages.
   Numbers follow the Sci8_MDF student booklet. Colours use the site CSS variables. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const F='font-family="var(--f-body), system-ui, sans-serif"';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${F} font-size="${o.size||14}" ${o.w?`font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}">${esc(s)}</text>`;
const A="var(--accent)",S="var(--muted)",W="color-mix(in srgb, #3b82c4 55%, var(--paper))";
const AR=`<defs><marker id="mv-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${S}"/></marker></defs>`;
const svg=(w,h,label,body)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="display:block;width:100%;height:auto;min-width:520px">${AR}${body}</svg>`;
const wrap=(title,s,note)=>`<div class="eyebrow">${esc(title)}</div><div style="overflow-x:auto;margin-top:10px">${s}</div>${note?`<p class="note" style="margin-top:8px">${esc(note)}</p>`:""}`;
const arrow=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${S}" stroke-width="1.4" marker-end="url(#mv-ar)"/>`;

function states(el){
  let b="";const box=(x,name,sub)=>`<rect x="${x}" y="20" width="200" height="170" rx="6" fill="var(--paper)" stroke="${S}"/>`+T(x+100,214,name,{a:"middle",w:700})+T(x+100,232,sub,{a:"middle",size:12,fill:S});
  b+=box(20,"Solid","packed in a pattern, vibrate in place")+box(260,"Liquid","close together, slide past each other")+box(500,"Gas","far apart, fast, every direction");
  for(let r=0;r<6;r++)for(let c=0;c<7;c++)b+=`<circle cx="${43+c*26}" cy="${45+r*27}" r="11" fill="${A}" stroke="var(--paper)"/>`;
  [[290,150],[312,160],[336,152],[360,162],[384,150],[408,160],[432,155],[300,172],[324,176],[348,174],[372,177],[396,173],[420,176],[444,174],[290,128],[316,136],[342,130],[368,138],[394,128],[420,134],[444,130],[302,108],[330,112],[358,104],[386,110]].forEach(([x,y])=>b+=`<circle cx="${x}" cy="${y}" r="11" fill="${A}" stroke="var(--paper)"/>`);
  b+=`<line x1="262" y1="96" x2="458" y2="96" stroke="${S}" stroke-dasharray="4 3"/>`;
  [[530,50,30,-14],[610,70,-26,10],[670,46,-20,22],[560,120,28,18],[650,140,24,-20],[590,168,-28,-8],[680,110,14,26],[540,170,24,-16]].forEach(([x,y,dx,dy])=>b+=`<circle cx="${x}" cy="${y}" r="11" fill="${A}"/>`+arrow(x+dx*.45,y+dy*.45,x+dx*1.25,y+dy*1.25));
  el.innerHTML=wrap("See it",svg(720,244,"Particle models of a solid, a liquid and a gas",b),"Same particles, different energy. Adding energy moves you from left to right: solid to liquid to gas.");
}

function density(el){
  const M=[["cork",0.24],["ice",0.92],["water",1.00],["maple syrup",1.32],["aluminum",2.70],["iron",7.87],["lead",11.3],["gold",19.3]];
  const x0=130,x1=560,X=v=>x0+v/20*(x1-x0);let b=T(20,22,"Mass of 1 cm³ of each substance (g)",{w:700});
  M.forEach(([n,d],i)=>{const y=40+i*26,fl=d<1,wat=d===1;b+=T(x0-10,y+14,n,{a:"end",size:13})+`<rect x="${x0}" y="${y}" width="${Math.max(X(d)-x0,2)}" height="18" rx="2" fill="${wat?W:fl?"color-mix(in srgb, var(--accent) 35%, var(--paper))":A}"/>`+T(Math.max(X(d),X(1)+2)+6,y+14,d.toFixed(d<1?2:d<10?2:1),{size:12,fill:S});});
  b+=`<line x1="${X(1)}" y1="34" x2="${X(1)}" y2="252" stroke="${W}" stroke-width="2" stroke-dasharray="4 3"/>`+T(X(1)+6,264,"water = 1.00: left of the line floats, right sinks",{size:12,fill:S});
  const cx=650,ty=60;b+=`<path d="M${cx},${ty} L${cx+64},${ty+120} L${cx-64},${ty+120} Z" fill="var(--paper)" stroke="${A}" stroke-width="2"/>`+`<line x1="${cx-40}" y1="${ty+76}" x2="${cx+40}" y2="${ty+76}" stroke="${A}" stroke-width="2"/><line x1="${cx}" y1="${ty+76}" x2="${cx}" y2="${ty+120}" stroke="${A}" stroke-width="2"/>`;
  b+=T(cx,ty+60,"m",{a:"middle",w:700,size:22})+T(cx-24,ty+106,"d",{a:"middle",w:700,size:20})+T(cx+24,ty+106,"v",{a:"middle",w:700,size:20})+T(cx,ty+146,"d = m ÷ v",{a:"middle",size:12})+T(cx,ty+162,"m = d × v",{a:"middle",size:12})+T(cx,ty+178,"v = m ÷ d",{a:"middle",size:12});
  el.innerHTML=wrap("See it",svg(720,276,"Bar chart of densities compared with water, and the density formula triangle",b),"Every bar is the same size cube, 1 cm³. Only the mass packed inside changes. Cover a letter on the triangle to see the formula for it.");
}

function displacement(el){
  const cyl=(x,level,label,obj)=>{let b=`<rect x="${x}" y="40" width="80" height="200" rx="4" fill="var(--paper)" stroke="${S}" stroke-width="1.5"/>`;
    const Y=v=>240-v/100*200;b+=`<rect x="${x+2}" y="${Y(level)}" width="76" height="${240-Y(level)-2}" fill="${W}" opacity=".6"/>`;
    for(let v=10;v<=90;v+=10)b+=`<line x1="${x+80}" y1="${Y(v)}" x2="${x+68}" y2="${Y(v)}" stroke="${S}"/>`+(v%20===0||v===50?T(x+86,Y(v)+4,v,{size:11,fill:S}):"");
    if(obj)b+=`<rect x="${x+24}" y="176" width="32" height="12" rx="2" fill="${A}"/><rect x="${x+34}" y="188" width="12" height="48" fill="${A}"/>`+[0,1,2,3,4].map(i=>`<line x1="${x+34}" y1="${196+i*8}" x2="${x+46}" y2="${200+i*8}" stroke="var(--paper)" stroke-width="1.2"/>`).join("");
    b+=T(x+40,262,label,{a:"middle",w:700,size:13});return b;};
  let b=T(20,22,"Finding the volume of a steel bolt",{w:700})+cyl(60,50,"Before: 50 mL",0)+cyl(260,56,"After: 56 mL",1);
  b+=`<line x1="250" y1="140" x2="360" y2="128" stroke="${S}" stroke-dasharray="3 3"/>`;
  b+=T(430,90,"Volume = 56 − 50 = 6 mL = 6 cm³",{w:700})+T(430,122,"Mass (weighed dry) = 47.2 g",{})+T(430,154,"Density = 47.2 ÷ 6 = 7.87 g/cm³",{w:700,fill:A})+T(430,186,"Matches iron, so it sinks.",{fill:S,size:13});
  b+=T(430,226,"Read the bottom of the curve",{size:12,fill:S})+T(430,242,"(the meniscus) at eye level.",{size:12,fill:S});
  el.innerHTML=wrap("See it",svg(720,276,"Graduated cylinder before and after adding a bolt, showing water displacement",b),"Tilt the cylinder and slide the object in. Dropping it can crack the glass.");
}

function heating(el){
  const x0=70,x1=690,y0=250,y1=30,Y=t=>y0-(t+40)/180*(y0-y1);
  let b=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${S}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="${S}"/>`;
  [-20,0,50,100,120].forEach(t=>b+=`<line x1="${x0-4}" y1="${Y(t)}" x2="${x0}" y2="${Y(t)}" stroke="${S}"/>`+T(x0-8,Y(t)+4,t+"°C",{a:"end",size:11,fill:S}));
  const P=[[x0,Y(-20)],[150,Y(0)],[260,Y(0)],[420,Y(100)],[600,Y(100)],[670,Y(125)]];
  b+=`<polyline points="${P.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${A}" stroke-width="3" stroke-linejoin="round"/>`;
  const lab=(x,y,t,sub)=>T(x,y,t,{a:"middle",w:700,size:13})+(sub?T(x,y+15,sub,{a:"middle",size:11,fill:S}):"");
  b+=T(96,Y(-10)-16,"ice warms",{w:700,size:13})+lab(205,Y(0)+26,"melting","flat: particles pulling apart")+T(330,Y(60),"water warms",{w:700,size:13,a:"end"})+lab(510,Y(100)-30,"boiling","flat again")+T(640,Y(100)+26,"steam warms",{w:700,size:13,a:"middle"});
  b+=`<rect x="150" y="${Y(0)-6}" width="110" height="12" fill="${A}" opacity=".15"/><rect x="420" y="${Y(100)-6}" width="180" height="12" fill="${A}" opacity=".15"/>`;
  b+=T((x0+x1)/2,y0+24,"Energy added over time →",{a:"middle",size:12,fill:S});
  el.innerHTML=wrap("See it",svg(720,284,"Heating curve for water from ice to steam with flat sections at melting and boiling",b),"Boiling takes much longer than melting because pulling particles all the way apart into a gas takes far more energy.");
}

H.lessonTools=Object.assign(H.lessonTools||{},{"matter/states":states,"matter/density":density,"matter/lab":displacement,"matter/phase":heating});
})();
