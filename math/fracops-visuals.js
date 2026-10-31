/* Grade 7 Math Unit 4 (Fraction Operations): one picture per lesson, drawn from the deck examples.
   Colours come from the site CSS variables so they follow light and dark mode. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const F='font-family="var(--f-body), system-ui, sans-serif"';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${F} font-size="${o.size||14}" ${o.w?`font-weight="${o.w}"`:""} fill="${o.fill||"var(--ink)"}" text-anchor="${o.a||"start"}">${esc(s)}</text>`;
const A="var(--accent)",B="color-mix(in srgb, var(--accent) 40%, var(--paper))",G="var(--good)",E="var(--paper)",S="var(--muted)";
const svg=(w,h,label,body)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="display:block;width:100%;height:auto;min-width:520px">${body}</svg>`;
const wrap=(title,svgStr,note)=>`<div class="eyebrow">${esc(title)}</div><div style="overflow-x:auto;margin-top:10px">${svgStr}</div>${note?`<p class="note" style="margin-top:8px">${esc(note)}</p>`:""}`;

/* A row of fraction bars. cells: one fill per piece, across as many wholes as needed. */
function strip(x,y,w,d,cells,o={}){
  const wholes=Math.max(1,Math.ceil(cells.length/d)),gap=o.gap??12,bw=(w-(wholes-1)*gap)/wholes,h=o.h||30;let b="";
  for(let k=0;k<wholes;k++){const bx=x+k*(bw+gap);
    for(let i=0;i<d;i++){const f=cells[k*d+i]||E;b+=`<rect x="${(bx+i*bw/d).toFixed(1)}" y="${y}" width="${(bw/d).toFixed(1)}" height="${h}" fill="${f}" stroke="${S}" stroke-width="1"/>`;}
    if(o.cross&&o.cross.includes(k))b+=`<line x1="${bx}" y1="${y}" x2="${bx+bw}" y2="${y+h}" stroke="var(--bad)" stroke-width="2.5"/>`;
  }
  (o.xpieces||[]).forEach(i=>{const k=Math.floor(i/d),px=x+k*(bw+gap)+(i%d)*bw/d;b+=`<line x1="${px+3}" y1="${y+3}" x2="${px+bw/d-3}" y2="${y+h-3}" stroke="var(--bad)" stroke-width="2.5"/><line x1="${px+bw/d-3}" y1="${y+3}" x2="${px+3}" y2="${y+h-3}" stroke="var(--bad)" stroke-width="2.5"/>`;});
  return b;
}
const fill=(n,c,from=0)=>Array.from({length:from+n},(_,i)=>i<from?undefined:c);

function gcfLcm(el){
  let b=T(20,24,"Multiples of 4 and 6",{w:700})+`<line x1="40" y1="96" x2="700" y2="96" stroke="${S}"/>`;
  const X=v=>40+v/26*660;
  for(let v=0;v<=26;v+=2)b+=`<line x1="${X(v)}" y1="92" x2="${X(v)}" y2="100" stroke="${S}"/>`+(v%4===0||v%6===0?T(X(v),116,v,{a:"middle",size:12,fill:S}):"");
  [12,24].forEach(v=>{b+=`<rect x="${X(v)-16}" y="42" width="32" height="62" rx="16" fill="none" stroke="${G}" stroke-width="2"/>`;});
  [4,8,12,16,20,24].forEach(v=>b+=`<circle cx="${X(v)}" cy="62" r="7" fill="${A}"/>`);
  [6,12,18,24].forEach(v=>b+=`<circle cx="${X(v)}" cy="84" r="7" fill="${B}" stroke="${A}"/>`);
  b+=T(40,66,"4",{size:12,w:700,a:"end"})+T(40,88,"6",{size:12,w:700,a:"end"})+T(X(12),36,"LCM = 12",{a:"middle",size:13,w:700,fill:G})+T(X(24),36,"also common",{a:"middle",size:12,fill:S});
  const row=(y,name,list)=>{let r=T(20,y+20,name,{w:700,size:13});list.forEach((v,i)=>{const cx=170+i*58,on=[1,2,3,6].includes(v),g=v===6;r+=`<rect x="${cx}" y="${y}" width="46" height="30" rx="6" fill="${g?G:on?B:E}" stroke="${on?A:S}"/>`+T(cx+23,y+20,v,{a:"middle",w:on?700:400,fill:g?"var(--paper)":"var(--ink)"});});return r;};
  b+=T(20,160,"Factors of 12 and 18",{w:700})+row(172,"12",[1,2,3,4,6,12])+row(212,"18",[1,2,3,6,9,18]);
  b+=T(530,205,"Common: 1, 2, 3, 6",{size:13,fill:S})+T(530,225,"GCF = 6",{size:13,w:700,fill:G});
  el.innerHTML=wrap("See it",svg(720,250,"Multiples of 4 and 6 meet at 12 and 24; factors of 12 and 18 share 1, 2, 3 and 6",b),"Multiples line up again and again, so the LCM is the first match. Factors run out, so the GCF is the biggest one on both lists.");
}

function like(el){
  let b=T(20,24,"3/8 + 2/8: same-size pieces, so just count them",{w:700});
  b+=T(20,62,"3/8",{w:700})+strip(90,42,600,8,fill(3,A));
  b+=T(20,112,"2/8",{w:700})+strip(90,92,600,8,fill(2,B));
  b+=T(20,172,"= 5/8",{w:700,fill:A})+strip(90,152,600,8,[A,A,A,B,B]);
  b+=T(90,212,"Still eighths. Only the count changes: 3 + 2 = 5 pieces.",{size:13,fill:S});
  el.innerHTML=wrap("See it",svg(720,226,"Fraction strips showing three eighths plus two eighths equals five eighths",b));
}

function unlike(el){
  let b=T(20,24,"1/2 + 1/3: different sizes, so cut both into sixths",{w:700});
  b+=T(20,62,"1/2",{w:700})+strip(90,42,280,2,[A])+T(395,62,"→",{size:18,fill:S})+T(430,62,"3/6",{w:700})+strip(480,42,220,6,fill(3,A));
  b+=T(20,112,"1/3",{w:700})+strip(90,92,280,3,[B])+T(395,112,"→",{size:18,fill:S})+T(430,112,"2/6",{w:700})+strip(480,92,220,6,fill(2,B));
  b+=T(370,172,"= 5/6",{w:700,fill:A,a:"end"})+strip(480,152,220,6,[A,A,A,B,B]);
  b+=T(90,212,"The LCD of 2 and 3 is 6. Once both are in sixths, it's a like-denominator question.",{size:13,fill:S});
  el.innerHTML=wrap("See it",svg(720,226,"One half and one third renamed as three sixths and two sixths, which make five sixths",b));
}

function borrow(el){
  const W=600,x=150;
  let b=T(20,24,"3 1/4 − 1 3/4: borrow one whole",{w:700});
  b+=T(20,62,"3 1/4",{w:700})+strip(x,42,W,4,[...fill(12,A),A]);
  b+=T(20,84,"Can't take 3/4 from 1/4",{size:12,fill:S});
  const r2=[...fill(8,A),G,G,G,G,A];
  b+=T(20,132,"= 2 5/4",{w:700})+strip(x,112,W,4,r2);
  b+=T(20,154,"Trade one whole for 4/4",{size:12,fill:S});
  b+=T(20,202,"− 1 3/4",{w:700})+strip(x,182,W,4,r2,{cross:[0],xpieces:[8,9,10]});
  b+=T(20,224,"Take 1 whole and 3/4",{size:12,fill:S});
  b+=T(x,262,"Left: 1 whole + 2/4 = 1 2/4 = 1 1/2",{w:700,fill:A});
  el.innerHTML=wrap("See it",svg(760,276,"Three and one quarter rewritten as two and five quarters, then one and three quarters crossed out, leaving one and a half",b),"Green is the whole that got traded for 4/4. 2 5/4 is the same amount as 3 1/4, just written so you can subtract.");
}

function flow(el){
  const box=(x,y,w,t,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="40" rx="${o.q?20:6}" fill="${o.q?"var(--soft)":o.end?A:E}" stroke="${o.end?A:S}"/>`+T(x+w/2,y+25,t,{a:"middle",size:13,w:o.q||o.end?700:400,fill:o.end?"var(--paper)":"var(--ink)"});
  const ln=(pts,mk)=>`<polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="${S}" stroke-width="1.4"${mk?' marker-end="url(#fo-ar)"':""}/>`;
  const lab=(x,y,t)=>T(x,y,t,{size:12,fill:S,w:600});
  let b=`<defs><marker id="fo-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${S}"/></marker></defs>`;
  const cx=280,w=340,x=cx-w/2,sx=520,sw=190;
  b+=box(x,10,w,"Are the denominators the same?",{q:1});
  b+=ln([[cx+w/2,30],[sx,30]],1)+lab(cx+w/2+8,24,"no")+box(sx,10,sw,"Find the LCD and rename");
  b+=ln([[cx,50],[cx,100]],1)+lab(cx+8,70,"yes")+ln([[sx+sw/2,50],[sx+sw/2,75],[cx,75]],0);
  b+=box(x,100,w,"Subtracting? Is the first fraction too small?",{q:1});
  b+=ln([[cx+w/2,120],[sx,120]],1)+lab(cx+w/2+8,114,"yes")+box(sx,100,sw,"Borrow a whole");
  b+=ln([[cx,140],[cx,190]],1)+lab(cx+8,160,"no")+ln([[sx+sw/2,140],[sx+sw/2,165],[cx,165]],0);
  b+=box(x,190,w,"Add or subtract the numerators");
  b+=ln([[cx,230],[cx,256]],1)+box(x,256,w,"Simplify (÷ GCF) and write as a mixed number",{end:1});
  el.innerHTML=wrap("Every question, same path",svg(720,306,"Flowchart for adding and subtracting fractions and mixed numbers",b),"Sense check at the end: adding makes it bigger, subtracting makes it smaller.");
}

H.lessonTools=Object.assign(H.lessonTools||{},{"fracops/l01":gcfLcm,"fracops/l02":like,"fracops/l03":unlike,"fracops/l04":borrow,"fracops/l05":flow});
})();
