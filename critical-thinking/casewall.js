/* Critical Thinking homepage: a detective's case wall.
   Every lesson is an index card pinned to the board. Thread joins cards that use the same kind of thinking, and every thread
   leads to the open case in the middle. Card titles, numbers and status come from data.js; only the groups and pin positions
   below are fixed. Card tilt comes from a hash of the lesson id, so the wall is the same on every visit. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const W=1184,HT=720;   // board size the positions below are measured on

// Groups: which cards go together, the thread colour, and where the label tape sits. A bare unit id is one stacked card for that unit.
const GROUPS=[
 {id:"evidence",name:"Evidence",thread:"mint",tape:[46,16],cards:["lab/l1","lab/l2","lab/l3","lab/l4"]},
 {id:"persuasion",name:"Persuasion",thread:"violet",tape:[800,6],cards:["lab/l5","lab/l6","lab/l7"]},
 {id:"strategy",name:"Strategy",thread:"violet",tape:[806,430],cards:["lab/l8","lab/l9","games"]},
 {id:"hard",name:"Hard calls",thread:"mint",tape:[496,522],cards:["lab/l10"]}];
// Pin positions: [left, top, width] on the 1184 x 720 board.
const POS={"lab/l1":[50,68,200],"lab/l2":[290,54,190],"lab/l3":[50,322,200],"lab/l4":[250,500,200],
 "lab/l5":[790,58,190],"lab/l6":[1010,112,150],"lab/l7":[880,298,200],
 "lab/l8":[790,488,190],"lab/l9":[1020,458,150],"games":[990,604,176],"lab/l10":[520,566,180]};
const OPEN=[462,232,260];
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}h^=h>>>13;h=Math.imul(h,0x5bd1e995);h^=h>>>15;return h>>>0;};
const tilt=k=>(((hash(k)%41)-20)/8).toFixed(2);   // -2.5 to 2.5 degrees: enough to look pinned, still easy to read
const done=()=>{try{return JSON.parse(localStorage.getItem("hub-done-"+H.subject)||"[]");}catch(e){return[];}};

// Everything on the wall, worked out from data.js. Also used by the test.
function layout(units){
  const all=[];units.forEach(u=>(u.lessons||[]).forEach(l=>all.push({key:u.id+"/"+l.id,unit:u,lesson:l})));
  const nowUnit=units.find(u=>u.status==="now"&&(u.lessons||[]).length);
  const open=nowUnit?all.filter(c=>c.unit===nowUnit).pop():all[all.length-1];
  const used=new Set(open?[open.key]:[]);
  const groups=GROUPS.map(g=>({...g,cards:g.cards.map(k=>{
    if(!k.includes("/")){const u=units.find(x=>x.id===k);if(!u)return null;(u.lessons||[]).forEach(l=>used.add(u.id+"/"+l.id));return {key:k,stack:u};}
    const c=all.find(x=>x.key===k);if(!c||used.has(k))return null;used.add(k);return c;}).filter(Boolean)}));
  const unsorted=all.filter(c=>!used.has(c.key));
  return {open,groups,unsorted,total:all.length};
}

function card(c,checked){
  const p=POS[c.key],style=p?` style="--x:${(p[0]/W*100).toFixed(2)}%;--y:${p[1]}px;--w:${(p[2]/W*100).toFixed(2)}%;--r:${tilt(c.key)}deg"`:"";
  if(c.stack){const u=c.stack,ls=u.lessons||[];
    return `<a class="cw-card cw-stack" href="#${esc(u.id)}" data-go="${esc(u.id)}"${style}><span class="cw-no">Unit ${esc(u.n)} · ${ls.length} ${ls.length===1?"case":"cases"}</span><b>${esc(u.name)}</b>${u.status==="done"?'<span class="cw-stamp">Solved</span>':""}</a>`;}
  return `<a class="cw-card" href="#${esc(c.key)}" data-go="${esc(c.key)}"${style}><span class="cw-no">Lesson ${esc(c.lesson.n)}</span><b>${esc(c.lesson.title)}</b>${checked.includes(c.key)?'<span class="cw-stamp cw-small">Checked</span>':""}</a>`;
}
const pin=p=>[p[0]+p[2]/2,p[1]+6];
function threads(L){
  const out={mint:[],violet:[]},o=pin(OPEN);
  L.groups.forEach(g=>{const pts=g.cards.map(c=>POS[c.key]).filter(Boolean).map(pin);
    pts.forEach((p,i)=>{const mx=(p[0]+o[0])/2,my=(p[1]+o[1])/2+26;   // a little sag, like real string
      out[g.thread].push(`M${p[0]} ${p[1]} Q${mx} ${my} ${o[0]} ${o[1]}`);
      if(i)out[g.thread].push(`M${pts[i-1][0]} ${pts[i-1][1]} L${p[0]} ${p[1]}`);});});
  return out;
}

function render(el,{go,units}){
  const L=layout(units),checked=done(),t=threads(L),o=L.open;
  el.innerHTML=`<div class="cw">
   <header class="cw-hero"><div>
     <p class="cw-kick">Mr. Mangles' Class · Grade 7/8 Enrichment · Critical Thinking</p>
     <h1>The Case Wall</h1>
     <p class="cw-lede">Every puzzle, trick and mystery we crack goes up here. The thread shows which ideas help you solve which cases.</p>
     <p class="cw-links"><a href="#overview" data-go="overview">Course map</a><a href="#resources" data-go="resources">Resource Library</a></p></div>
    <dl class="cw-stats"><div><dd>${L.total}</dd><dt>cases on file</dt></div>${o?`<div class="cw-violet"><dd>1</dd><dt>open case</dt></div>`:""}</dl></header>
   <div class="cw-board">
    <svg class="cw-thread" viewBox="0 0 ${W} ${HT}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
     <g class="cw-mint">${t.mint.map(d=>`<path d="${d}"/>`).join("")}</g><g class="cw-violet">${t.violet.map(d=>`<path d="${d}"/>`).join("")}</g></svg>
    ${o?`<section class="cw-group cw-open-group" aria-label="Open case"><a class="cw-card cw-open" href="#${esc(o.key)}" data-go="${esc(o.key)}" style="--x:${(OPEN[0]/W*100).toFixed(2)}%;--y:${OPEN[1]}px;--w:${(OPEN[2]/W*100).toFixed(2)}%;--r:0deg"><span class="cw-no">Lesson ${esc(o.lesson.n)} · ${esc(o.unit.name)}</span><b>${esc(o.lesson.title)}</b>${o.lesson.big?`<span class="cw-brief">${esc(o.lesson.big)}</span>`:""}<span class="cw-crack">Open case · crack it</span></a></section>`:""}
    ${L.groups.filter(g=>g.cards.length).map(g=>`<section class="cw-group" aria-label="${esc(g.name)}"><h2 class="cw-tape t-${g.thread}" style="--x:${(g.tape[0]/W*100).toFixed(2)}%;--y:${g.tape[1]}px;--r:${tilt(g.id)}deg">${esc(g.name)}</h2>${g.cards.map(c=>card(c,checked)).join("")}</section>`).join("")}
   </div>
   ${L.unsorted.length?`<section class="cw-unsorted" aria-label="Unsorted"><h2 class="cw-tape t-plain">Unsorted</h2><div>${L.unsorted.map(c=>card(c,checked)).join("")}</div></section>`:""}
   <p class="cw-key"><span><b class="k-mint">Green thread</b> · evidence, and what we can really know</span><span><b class="k-violet">Purple thread</b> · persuasion and strategy</span><span>Get every Check yourself question right and that card gets a stamp. Stamps are only saved on this device.</span></p></div>`;
  el.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.go);}));
}
H.home=render;H.caseWall={layout,GROUPS,POS,tilt};
})();
