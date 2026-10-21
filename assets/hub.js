/* Mr. Mangles' Class: lesson hub engine.
   Each subject page sets window.HUB = { subject, units:[...], tools:{unitId: (el)=>{...}} } before loading this file.
   Views: #unitId (unit list) and #unitId/lessonId (lesson page). */
(function(){
  const H = window.HUB; if(!H) return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const KEY = "hub-done-"+H.subject;
  const getDone = () => { try{ return new Set(JSON.parse(localStorage.getItem(KEY)||"[]")); }catch(e){ return new Set(); } };
  const markDone = k => { try{ const d=getDone(); d.add(k); localStorage.setItem(KEY,JSON.stringify([...d])); }catch(e){} };
  const units = H.units;
  const unit = id => units.find(u=>u.id===id);
  const defaultUnit = () => (units.find(u=>u.status==="now")||units.find(u=>u.lessons&&u.lessons.length)||units[0]).id;
  let answers = {};

  function route(){
    const h = decodeURIComponent((location.hash||"").slice(1));
    const [uid, lid] = h.split("/");
    const u = unit(uid) || unit(defaultUnit());
    const l = u && lid && (u.lessons||[]).find(x=>x.id===lid);
    renderTabs(u.id);
    if(lid==="review" && (u.lessons||[]).length){ renderReview(u); window.scrollTo(0,0); }
    else if(l){ answers={}; renderLesson(u,l); window.scrollTo(0,0); }
    else renderUnit(u);
  }
  function go(h){ if(location.hash.slice(1)===h) route(); else location.hash=h; }

  function renderTabs(active){
    $("#units").innerHTML = units.map(u=>`<button role="tab" data-u="${u.id}" aria-selected="${u.id===active}" class="${u.status==="soon"?"soon":""}"><b>${esc(u.n)}</b>${esc(u.name)}</button>`).join("");
    $("#units").querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.u));
    const cur=$("#units").querySelector('[aria-selected="true"]'); if(cur) cur.scrollIntoView({block:"nearest",inline:"nearest"});
  }

  function statusLabel(u){ return u.status==="now"?"We're here now":u.status==="done"?"Finished":u.status==="next"?"Up next":"Coming up"; }

  function renderUnit(u){
    const done=getDone(); const ls=u.lessons||[]; const tool=H.tools&&H.tools[u.id];
    const left = `<div>
      <div class="eyebrow">Unit ${esc(u.n)} · ${statusLabel(u)}</div>
      <h2>${esc(u.name)}</h2>${u.when?`<div class="span">${esc(u.when)}</div>`:""}
      ${u.intro?`<p>${esc(u.intro)}</p>`:""}
      ${ls.length>1?`<button class="reviewcard" id="openreview"><span class="eyebrow">Unit review</span><b>Review ${esc(u.name)}</b><span>Big ideas, ${ls.reduce((a,l)=>a+(l.terms||[]).length,0)} flashcards and a practice test from every lesson.</span><span class="go">Start &rarr;</span></button>`:""}
      ${ls.length?`<h3>Lessons</h3><p class="note">Missed a class? Open the lesson, read the notes, try the self-check, then get the handout from Mr. Mangles.</p>
      <ol class="lessons">${ls.map(l=>{const ok=done.has(u.id+"/"+l.id);
        return `<li><button data-l="${l.id}"><span class="n">${esc(l.n)}</span><span class="t">${esc(l.title)}</span><span class="s ${ok?"ok":""}">${ok?"Checked ✓":""}</span></button></li>`;}).join("")}</ol>`
      :`<p class="note">Lessons for this unit get added when we start it.</p>`}
      ${u.after?`<p class="note" style="margin-top:16px">${esc(u.after)}</p>`:""}
    </div>`;
    const right = tool?`<div class="tool" id="tool"></div>`:"";
    $("#main").innerHTML = `<div class="wrap grid ${tool?"":"single"}">${left}${right}</div>`;
    $("#main").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>go(u.id+"/"+b.dataset.l));
    const rv=$("#openreview"); if(rv) rv.onclick=()=>go(u.id+"/review");
    if(tool){ try{ tool($("#tool")); }catch(e){ $("#tool").textContent="This tool didn't load. Refresh the page to try again."; } }
  }

  function tableHTML(t){
    return `<div class="tablewrap"><table class="data"><thead><tr>${t.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function renderLesson(u,l){
    const ls=u.lessons, i=ls.indexOf(l), prev=ls[i-1], next=ls[i+1];
    const imgs=l.imgs||[];
    const qs=(l.check||[]).map((q,qi)=>{
      const a=answers[qi];
      return `<div class="q"><div class="qt">${qi+1}. ${esc(q.q)}</div><div class="opts">${q.a.map((o,oi)=>{
        let c="opt"; if(a!==undefined){ if(oi===q.c) c+=" right"; else if(oi===a) c+=" wrong"; }
        return `<button class="${c}" data-q="${qi}" data-o="${oi}" ${a!==undefined?"disabled":""}>${esc(o)}</button>`;}).join("")}</div>
        ${a!==undefined?`<div class="why">${a===q.c?"Right. ":"Not quite. "}${esc(q.why)}</div>`:""}</div>`;}).join("");
    const n=Object.keys(answers).length, right=(l.check||[]).filter((q,qi)=>answers[qi]===q.c).length;
    const ltKey=u.id+"/"+l.id, LT=H.lessonTools&&H.lessonTools[ltKey], keep=document.getElementById("ltool");
    $("#main").innerHTML = `<div class="wrap"><article class="lesson">
      <button class="back" id="back">&larr; ${esc(u.name)} lessons</button>
      <div class="eyebrow" style="margin-top:18px">Unit ${esc(u.n)} · Lesson ${esc(l.n)}</div>
      <h2>${esc(l.title)}</h2>
      ${imgs[0]?`<figure class="hero"><img src="${imgs[0].src}" alt="" data-cap="${esc(imgs[0].cap)}"><figcaption>${esc(imgs[0].cap)}</figcaption></figure>`:""}
      ${l.big?`<div class="big"><div class="eyebrow">The big idea</div><p>${esc(l.big)}</p></div>`:""}
      ${LT?`<div id="ltool-slot"></div>`:""}
      ${(l.charts||[]).map((c,ci)=>`<div id="lc-${ci}"></div>`).join("")}
      ${l.notes&&l.notes.length?`<h3>What we covered</h3><ul class="notes">${l.notes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
      ${l.table?`<h3>${esc(l.table.title||"Reference")}</h3>${tableHTML(l.table)}`:""}
      ${l.html?`<div style="margin-top:18px">${l.html}</div>`:""}
      ${l.terms&&l.terms.length?`<h3>Key terms</h3><dl class="terms">${l.terms.map(t=>`<dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd>`).join("")}</dl>`:""}
      ${imgs.length>1?`<h3>Pictures from the lesson</h3><div class="gal">${imgs.slice(1).map(m=>`<figure><img src="${m.src}" alt="" loading="lazy" data-cap="${esc(m.cap)}"><figcaption>${esc(m.cap)}</figcaption></figure>`).join("")}</div>`:""}
      ${l.work?`<h3>Your work</h3><div class="task"><p>${esc(l.work)}</p><p class="note">Get the handout from Mr. Mangles if you don't have it.</p></div>`:""}
      ${qs?`<h3>Check yourself</h3>${qs}`:""}
      ${n&&n===l.check.length?`<div class="score">${right} out of ${l.check.length}${right===l.check.length?". Nice, you've got this lesson.":". Have another look at the notes, then try again."} <button class="btn ghost" id="retry" style="margin-left:8px">Try again</button></div>`:""}
      <div class="pager">${prev?`<button class="btn ghost" data-go="${u.id}/${prev.id}">&larr; Lesson ${esc(prev.n)}</button>`:"<span></span>"}${next?`<button class="btn ghost" data-go="${u.id}/${next.id}">Lesson ${esc(next.n)} &rarr;</button>`:(ls.length>1?`<button class="btn" data-go="${u.id}/review">Unit review &rarr;</button>`:"")}</div>
    </article></div>`;
    $("#back").onclick=()=>go(u.id);
    if(LT){ // a live model on the lesson page; reuse it on re-render so answering questions doesn't reset it
      const slot=$("#ltool-slot");
      if(keep&&keep.dataset.k===ltKey) slot.replaceWith(keep);
      else { const d=document.createElement("div"); d.className="tool ltool"; d.id="ltool"; d.dataset.k=ltKey; slot.replaceWith(d);
        try{ LT(d); }catch(e){ d.textContent="This model didn't load. Refresh the page to try again."; } }
    }
    (l.charts||[]).forEach((c,ci)=>{ if(window.LineChart) window.LineChart($("#lc-"+ci),c); });
    document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
    document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      answers[+b.dataset.q]=+b.dataset.o;
      if(l.check.every((q,qi)=>answers[qi]===q.c)) markDone(u.id+"/"+l.id);
      const y=window.scrollY; renderLesson(u,l); window.scrollTo(0,y);
    });
    const r=$("#retry"); if(r) r.onclick=()=>{answers={}; const y=window.scrollY; renderLesson(u,l); window.scrollTo(0,y);};
  }

  function renderReview(u){
    $("#main").innerHTML=`<div class="wrap"><article class="lesson">
      <button class="back" id="back">&larr; ${esc(u.name)} lessons</button>
      <div class="eyebrow" style="margin-top:18px">Unit ${esc(u.n)} · Review</div>
      <h2>${esc(u.name)}</h2><div id="review"></div></article></div>`;
    $("#back").onclick=()=>go(u.id);
    if(window.UnitReview) window.UnitReview.render($("#review"),{name:u.name,lessons:u.lessons,onLesson:l=>go(u.id+"/"+l.id)});
  }

  // lightbox for any lesson image
  document.addEventListener("click",e=>{
    const im=e.target.closest&&e.target.closest(".hero img,.gal img,img.zoom"); if(!im) return;
    $("#lbimg").src=im.src; $("#lbcap").textContent=im.dataset.cap||""; $("#lightbox").hidden=false;
  });
  $("#lightbox").addEventListener("click",()=>{$("#lightbox").hidden=true;});
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") $("#lightbox").hidden=true; });
  window.addEventListener("hashchange",route);
  route();
})();
