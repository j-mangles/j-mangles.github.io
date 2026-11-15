/* Grade 8 ELA homepage: a bookshelf that fills up over the year.
   Every story and film in the reading units is a spine on the shelf. Click one to pull it out and see its big idea and key words.
   Units that haven't started are dashed spaces. Skills we use with every text sit in the drawer below.
   Spine size and colour come from a hash of the lesson id, so the shelf looks the same on every visit. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const SHELF_UNITS=["stories","film","novel","essays"];   // reading units: their lessons are spines
const DRAWER_UNITS=["answering","grammar"];              // skill units: one drawer card each
const DRAWER_LESSONS=["stories/plot"];                   // skill lessons that sit inside a reading unit
const CLOTH=["#8E2F2A","#2C5D7C","#D79A2B","#5E3B6E","#3C4A2A","#A8562A","#24566B","#7A2E4A"]; // bookcloth colours
const LIGHT_CLOTH={"#D79A2B":1};                         // cloth that needs dark lettering
const FILM_TOPS=["#F2C14E","#8FD3C7","#E58A6A"];

const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;};
const isFilm=(u,l)=>u.id==="film"||/\(short film\)\s*$/i.test(l.title);
const cleanTitle=t=>t.replace(/\s*\(short film\)\s*$/i,"").replace(/:.*$/,"");
const started=u=>u.status==="now"||u.status==="done"||u.status==="ongoing";
const month=w=>(String(w||"").match(/[A-Z][a-z]+/)||[""])[0];

// Everything the page shows, worked out from data.js. Also used by the test.
function layout(units){
  const spines=[],spaces=[],drawer=[],tools=[];let last="";
  units.filter(u=>SHELF_UNITS.includes(u.id)).forEach(u=>{
    if(!started(u)){spaces.push({unit:u.id,name:u.name,when:month(u.when),w:52+hash(u.id)%34,h:220+hash(u.id+"h")%70});return;}
    (u.lessons||[]).forEach(l=>{
      const key=u.id+"/"+l.id;
      if(DRAWER_LESSONS.includes(key)){tools.push({go:key,label:"Story tools",title:l.title,sub:l.big||""});return;}
      const film=isFilm(u,l),h=hash(key),title=cleanTitle(l.title);
      let cloth=CLOTH[h%CLOTH.length];if(cloth===last)cloth=CLOTH[(h+3)%CLOTH.length];if(!film)last=cloth;
      spines.push({key,unit:u.id,lesson:l,film,title,author:l.author||"",
        w:film?46+h%6:58+h%16,h:Math.max(title.length*11+84,film?200+h%24:262+(h>>>4)%44),
        cloth:film?"#1F1F24":cloth,top:film?FILM_TOPS[h%FILM_TOPS.length]:"",dark:!film&&!!LIGHT_CLOTH[cloth]});
    });
  });
  units.filter(u=>DRAWER_UNITS.includes(u.id)).forEach(u=>{const n=(u.lessons||[]).length;
    drawer.push({go:u.id,label:u.name,title:(u.lessons||[]).map(l=>l.title).slice(-2).join(" · "),sub:n+(n===1?" lesson":" lessons")+(u.when?" · "+u.when:"")});});
  drawer.push(...tools);
  const nowUnit=units.find(u=>u.status==="now"&&SHELF_UNITS.includes(u.id));
  const open=nowUnit?[...spines].reverse().find(s=>s.unit===nowUnit.id):spines[spines.length-1];
  return {spines,spaces,drawer,open:open?open.key:""};
}

function panel(s,unit){
  const l=s.lesson,terms=(l.terms||[]).map(t=>t[0]);
  return `<p class="sh-kick">${s.key===panel.now?"Now reading":"From the shelf"} · Lesson ${esc(l.n)}</p>
   <h2>${esc(s.title)}</h2>
   <p class="sh-by">${esc([s.author,s.film?"short film":"short story",unit.name].filter(Boolean).join(" · "))}</p>
   ${l.big?`<p class="sh-big">${esc(l.big)}</p>`:""}
   ${terms.length?`<h3>Key words</h3><p class="sh-terms">${terms.map(esc).join(" · ")}</p>`:""}
   <div class="sh-acts"><a class="sh-btn" href="#${esc(s.key)}" data-go="${esc(s.key)}">Open the lesson</a>${(l.check||[]).length?`<a class="sh-btn sh-ghost" href="#${esc(s.key)}" data-go="${esc(s.key)}" data-check="1">Check yourself</a>`:""}</div>
   <p class="sh-miss">Missed class? The lesson has the notes, the questions and what to hand in.</p>`;
}

function render(el,{go,units}){
  const L=layout(units),unit=id=>units.find(u=>u.id===id)||{};
  const now=units.find(u=>u.status==="now"&&SHELF_UNITS.includes(u.id));
  panel.now=L.open;
  const books=L.spines.filter(s=>!s.film).length,films=L.spines.length-books;
  el.innerHTML=`<div class="sh">
   <header class="sh-hero"><div>
     <p class="sh-kick">Mr. Mangles' Class · Grade 8 English Language Arts · 2026–27</p>
     <h1>Our shelf so far</h1>
     <p class="sh-lede">Every story and film we read goes on the shelf. Pull one out to get its notes, key words and questions.</p>
     <p class="sh-links"><a href="#overview" data-go="overview">Course map</a><a href="#resources" data-go="resources">Resource Library</a><a href="media-framing.html">Headline Framing Lab</a></p></div>
    <dl class="sh-stats"><div><dd>${books}</dd><dt>${books===1?"story":"stories"} read</dt></div><div><dd>${films}</dd><dt>short ${films===1?"film":"films"}</dt></div><div class="sh-left"><dd>${L.spaces.length}</dd><dt>${L.spaces.length===1?"unit":"units"} still to come</dt></div></dl></header>
   <div class="sh-cols">
    <section class="sh-main" aria-label="The shelf">
     <p class="sh-cap"><span>${now?`Unit ${esc(now.n)} · ${esc(now.name)}`:"This year's reading"}</span><span>Read left to right</span></p>
     <div class="sh-scroll" tabindex="0" role="group" aria-label="Bookshelf. Scroll sideways to see every text.">
      <div class="sh-row">${L.spines.map(s=>`<button type="button" class="sh-spine${s.film?" sh-film":""}${s.dark?" sh-dark":""}" data-key="${esc(s.key)}" aria-pressed="${s.key===L.open}" style="--w:${s.w}px;--h:${s.h}px;--cloth:${s.cloth}${s.top?";--top:"+s.top:""}"><span class="sh-title">${esc(s.title)}</span><span class="sh-foot">${esc(s.film?"Film":(s.author.split(" ").pop()||"Story"))}</span></button>`).join("")}<span class="sh-gap" aria-hidden="true"></span>${L.spaces.map(p=>`<a class="sh-space" href="#${esc(p.unit)}" data-go="${esc(p.unit)}" style="--w:${p.w}px;--h:${p.h}px"><span>${esc(p.name)}${p.when?" · "+esc(p.when):""}</span></a>`).join("")}</div></div>
    </section>
    <section class="sh-skills" aria-label="The drawer">
     <h2 class="sh-h2">The drawer</h2>
     <p class="sh-sub">Skills we use with every text. Open one any time you need it.</p>
     <div class="sh-drawer">${L.drawer.map((d,i)=>`<a href="#${esc(d.go)}" data-go="${esc(d.go)}" style="--tab:${CLOTH[i%CLOTH.length]}"><span>${esc(d.label)}</span><b>${esc(d.title)}</b><i>${esc(d.sub)}</i></a>`).join("")}</div>
    </section>
    <aside class="sh-panel" id="sh-panel" aria-label="The text you pulled out" aria-live="polite"></aside>
   </div></div>`;
  const pane=el.querySelector("#sh-panel");
  const show=key=>{const s=L.spines.find(x=>x.key===key);if(!s)return;
    el.querySelectorAll(".sh-spine").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.key===key)));
    pane.style.setProperty("--cloth",s.film?s.top:s.cloth);pane.innerHTML=panel(s,unit(s.unit));wire(pane);};
  const wire=root=>root.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.go);
    if(a.dataset.check)setTimeout(()=>{const h=[...document.querySelectorAll("#main h3")].find(x=>x.textContent==="Check yourself");if(h)h.scrollIntoView();},60);}));
  wire(el);
  el.querySelectorAll(".sh-spine").forEach(b=>b.addEventListener("click",()=>show(b.dataset.key)));
  if(L.open)show(L.open);
  const sc=el.querySelector(".sh-scroll"),cur=el.querySelector('.sh-spine[aria-pressed="true"]');
  if(sc&&cur)sc.scrollLeft=Math.max(0,cur.offsetLeft-sc.clientWidth/2);   // on a phone, start with the open book in view
}
H.home=render;H.shelfLayout=layout;
})();
