/* Grade 7 Math homepage: a transit map of the year's units.
   Each unit is a station. The four lines are the four strands of Manitoba Grade 7 math. Where two lines share a station
   ("change here"), a skill from one strand gets used in another. Station names, dates and status come from data.js;
   only the layout below is fixed. Drawn the Harry Beck way: lines run flat, straight up, or at 45 degrees, nothing else. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// Lines: the stations in travel order, and the path the line draws (H, V and 45-degree moves only).
const LINES=[
 {id:"number",name:"Number",colour:"#D9482B",stops:["fdp","div","fracops","int","dec"],path:"M140 110 H1060"},
 {id:"stats",name:"Statistics and Probability",colour:"#7046B8",stops:["fdp","prob","area","prob2"],path:"M140 110 V200 L200 260 H1060"},
 {id:"shape",name:"Shape and Space",colour:"#22914E",stops:["lin","circ","area","geo"],path:"M480 470 L600 350 H670 L760 260 L850 350 H1060"},
 {id:"patterns",name:"Patterns and Relations",colour:"#1F6FB2",stops:["eq","lin","pat2"],path:"M260 470 H1060"}];
// Stations: where each unit sits, and which side its name goes on.
const STATIONS={
 fdp:{x:140,y:110,side:"up"}, div:{x:370,y:110,side:"up"}, fracops:{x:600,y:110,side:"up"}, int:{x:830,y:110,side:"up"}, dec:{x:1060,y:110,side:"up"},
 prob:{x:400,y:260,side:"down"}, area:{x:760,y:260,side:"up"}, prob2:{x:1060,y:260,side:"up"},
 circ:{x:635,y:350,side:"down"}, geo:{x:1060,y:350,side:"down",anchor:"end"},
 eq:{x:260,y:470,side:"down"}, lin:{x:480,y:470,side:"down"}, pat2:{x:1060,y:470,side:"down",anchor:"end"}};
const linesOf=id=>LINES.filter(L=>L.stops.includes(id));
const split=name=>{if(name.length<=20)return[name];const w=name.split(" ");let best=1,gap=1e9;
  for(let i=1;i<w.length;i++){const d=Math.abs(w.slice(0,i).join(" ").length-name.length/2);if(d<gap){gap=d;best=i;}}
  return[w.slice(0,best).join(" "),w.slice(best).join(" ")];};
const dated=u=>u.when&&!/later/i.test(u.when)?u.when:"";
const done=()=>{try{return JSON.parse(localStorage.getItem("hub-done-"+H.subject)||"[]");}catch(e){return[];}};

function station(u,S){
  const lines=linesOf(u.id),c=lines[0]?lines[0].colour:"#15202B",x=S.x,y=S.y,change=lines.length>1,now=u.status==="now";
  const name=split(u.name),up=S.side==="up",anchor=S.anchor||"middle",tx=anchor==="end"?x+16:x;
  const sub=["Unit "+u.n,now?"":u.status==="next"?"next stop":u.status==="done"?"done":"",now?"":dated(u),change?"change here":""].filter(Boolean).join(" · ");
  const lh=20,gap=change||now?32:26;
  const nameY=i=>up?y-gap-(name.length-1-i)*lh:y+gap+12+i*lh+(change&&!up?0:0);
  const subY=up?y-gap-name.length*lh+1:y+gap+12+name.length*lh-1;
  const mark=now?`<circle class="mm-ring" cx="${x}" cy="${y}" r="16" fill="none" stroke="${c}" stroke-width="4"/><rect x="${x-20}" y="${y-18}" width="40" height="36" rx="18" fill="#15202B"/><circle cx="${x}" cy="${y}" r="9" fill="#fff"/>`
    :change?`<rect x="${x-24}" y="${y-17}" width="48" height="34" rx="17" fill="${u.status==="done"?"#15202B":"#fff"}" stroke="#15202B" stroke-width="5"/>`
    :`<circle cx="${x}" cy="${y}" r="12" fill="${u.status==="done"?c:"#fff"}" stroke="${c}" stroke-width="5"/>`;
  const tag=now?`<g transform="translate(${x+30} ${y+26})"><rect width="118" height="26" fill="${c}"/><text x="59" y="18" text-anchor="middle" class="mm-here">YOU ARE HERE</text></g>`:"";
  return `<a href="#${esc(u.id)}" data-go="${esc(u.id)}" class="mm-st s-${esc(u.status||"soon")}" aria-label="Unit ${esc(u.n)}: ${esc(u.name)}. ${esc(lines.map(l=>l.name+" line").join(" and "))}.${now?" You are here.":""}${dated(u)?" "+esc(dated(u))+".":""}">
   ${mark}${name.map((t,i)=>`<text x="${tx}" y="${nameY(i)}" text-anchor="${anchor}" class="mm-name">${esc(t)}</text>`).join("")}
   <text x="${tx}" y="${subY}" text-anchor="${anchor}" class="mm-sub">${esc(sub)}</text>${tag}</a>`;
}

function render(el,{go,units}){
  const now=units.find(u=>u.status==="now")||units.find(u=>u.status==="next")||units[0];
  const at=units.indexOf(now),next=units.slice(at+1,at+4),nl=linesOf(now.id),col=nl[0]?nl[0].colour:"#D9482B";
  const checked=done(),ls=now.lessons||[];
  const todo=ls.filter(l=>!checked.includes(now.id+"/"+l.id)),three=(todo.length?todo:ls).slice(0,3);
  const unplaced=units.filter(u=>!STATIONS[u.id]);
  el.innerHTML=`<div class="mm">
   <header class="mm-hero"><div>
     <p class="mm-kick">Mr. Mangles' Class · Grade 7 Mathematics · 2026–27</p>
     <h1>The Math 7 Line</h1>
     <p class="mm-lede">${units.length} stops, ${LINES.length} lines. Where two lines meet, you use a skill from one unit in another. Pick any station for its lessons.</p>
     <p class="mm-links"><a href="#overview" data-go="overview">Course map</a><a href="#resources" data-go="resources">Resource Library</a><a href="probability-investigation.html">Probability Investigation</a></p></div>
    <ul class="mm-legend" aria-label="Lines">${LINES.map(L=>`<li><span style="background:${L.colour}"></span>${esc(L.name)}</li>`).join("")}</ul></header>
   <div class="mm-map" tabindex="0" role="group" aria-label="Transit map of the Math 7 units. Scroll sideways to see every station.">
    <svg viewBox="0 0 1200 570" role="img" aria-label="${units.length} units on ${LINES.length} lines. ${esc(now.name)} is the current station.">
     <g fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">${LINES.map(L=>`<path d="${L.path}" stroke="${L.colour}"/>`).join("")}</g>
     ${units.filter(u=>STATIONS[u.id]).map(u=>station(u,STATIONS[u.id])).join("")}</svg></div>
   <p class="mm-swipe">Swipe the map sideways to ride the whole line.</p>
   ${unplaced.length?`<p class="mm-extra">Also this year: ${unplaced.map(u=>`<a href="#${esc(u.id)}" data-go="${esc(u.id)}">${esc(u.name)}</a>`).join(", ")}</p>`:""}
   <div class="mm-below">
    <section class="mm-now" style="--line:${col}">
     <p class="mm-kick">Current station · Unit ${esc(now.n)} · ${esc(nl.map(l=>l.name).join(" + "))}</p>
     <h2>${esc(now.name)}</h2>
     ${now.intro?`<p class="mm-intro">${esc(now.intro)}</p>`:""}
     ${three.length?`<div class="mm-lessons">${three.map(l=>`<a href="#${esc(now.id)}/${esc(l.id)}" data-go="${esc(now.id)}/${esc(l.id)}"><b>${esc(l.n)}</b>${esc(l.title)}</a>`).join("")}</div>`:""}
     <div class="mm-acts"><a class="mm-btn" href="#${esc(now.id)}" data-go="${esc(now.id)}">${ls.length?`All ${ls.length} lessons`:"Open the unit"}</a>${ls.length>1?`<a class="mm-btn mm-ghost" href="#${esc(now.id)}/review" data-go="${esc(now.id)}/review">Unit review</a>`:""}</div></section>
    ${next.length?`<section class="mm-next"><p class="mm-kick">Next stops</p><ol>${next.map(u=>{const n=(u.lessons||[]).length,l=linesOf(u.id)[0];
      return `<li><span class="mm-dot" style="border-color:${l?l.colour:"#15202B"}"></span><a href="#${esc(u.id)}" data-go="${esc(u.id)}"><b>${esc(u.name)}</b><span>${esc([dated(u)||"Later this year",n?n+(n===1?" lesson":" lessons"):""].filter(Boolean).join(" · "))}</span></a></li>`;}).join("")}</ol></section>`:""}
   </div></div>`;
  el.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.go);}));
  const map=el.querySelector(".mm-map"),S=STATIONS[now.id];
  if(S&&map.scrollWidth>map.clientWidth)map.scrollLeft=Math.max(0,S.x/1200*map.scrollWidth-map.clientWidth/2);
}
H.home=render;H.metro={LINES,STATIONS};
})();
