/* Mr. Mangles' Class: lesson hub engine.
   Each subject page sets window.HUB = { subject, units:[...], tools:{unitId: (el)=>{...}} } before loading this file.
   Views: #unitId (unit list) and #unitId/lessonId (lesson page). */
(function(){
  const H = window.HUB; if(!H) return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const KEY = "hub-done-"+H.subject;
  const recentLesson = id => window.UnitReview&&window.UnitReview.lastLesson(H.subject,id,(unit(id)||{}).lessons||[]);
  const getDone = () => { try{ return new Set(JSON.parse(localStorage.getItem(KEY)||"[]")); }catch(e){ return new Set(); } };
  const markDone = k => { try{ const d=getDone(); d.add(k); localStorage.setItem(KEY,JSON.stringify([...d])); }catch(e){} };
  const units = H.units;
  const unit = id => units.find(u=>u.id===id);
  const defaultUnit = () => (units.find(u=>u.status==="now")||units.find(u=>u.lessons&&u.lessons.length)||units[0]).id;
  let answers = {};
  const exitDrafts = {};

  function route(){
    Object.keys(exitDrafts).forEach(k=>delete exitDrafts[k]);
    const h = decodeURIComponent((location.hash||"").slice(1));
    const mapView = h==="overview";
    const mapLink=$("#course-map-link");
    if(mapLink){
      if(mapView) mapLink.setAttribute("aria-current","page");
      else mapLink.removeAttribute("aria-current");
    }
    const resourceLink=$("#course-resources-link");
    if(resourceLink){
      if(h==="resources") resourceLink.setAttribute("aria-current","page");
      else resourceLink.removeAttribute("aria-current");
    }
    if(mapView && window.CourseAtlas){
      renderTabs("");
      window.CourseAtlas.render($("#main"),H);
      window.scrollTo(0,0);
      return;
    }
    if(h==="resources" && window.StudentResources){
      renderTabs("");
      window.StudentResources.render($("#main"),H);
      window.scrollTo(0,0);
      return;
    }
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

  function statusLabel(u){ return u.status==="now"?"We're here now":u.status==="done"?"Finished":u.status==="ongoing"?"All year":u.status==="next"?"Up next":"Coming up"; }

  function renderUnit(u){
    const done=getDone(); const ls=u.lessons||[]; const tool=H.tools&&H.tools[u.id];
    const left = `<div>
      <h2>${esc(u.name)}</h2><div class="span">Unit ${esc(u.n)}${u.when?` · ${esc(u.when)}`:""} <span class="status s-${esc(u.status||"soon")}">${statusLabel(u)}</span></div>
      ${u.intro?`<p>${esc(u.intro)}</p>`:""}
      ${ls.length>1?`<button class="reviewcard" id="openreview"><b>Review ${esc(u.name)}</b><span>Big ideas, ${ls.reduce((a,l)=>a+(l.terms||[]).length,0)} flashcards and a practice test from every lesson.</span><span class="go">Start &rarr;</span></button>`:""}
      ${ls.length?`<h3>Lessons</h3>
      <ol class="lessons">${ls.map(l=>{const ok=done.has(u.id+"/"+l.id);
        return `<li><button data-l="${l.id}"><span class="n">${esc(l.n)}</span><span class="t">${esc(l.title)}</span><span class="s ${ok?"ok":""}">${ok?"Checked ✓":""}</span></button></li>`;}).join("")}</ol>`
      :`<p class="note">Lessons for this unit get added when we start it.</p>`}
      ${ls.length?`<details class="last-review"><summary>Warm-up: review a past lesson</summary><p>${recentLesson(u.id)?`Last opened on this device: Lesson ${esc(recentLesson(u.id).n)} · ${esc(recentLesson(u.id).title)}`:"Pick a lesson from last class."}</p><p>Practise on your own, or lead three questions aloud with thinking time before each answer.</p><div class="last-review-controls"><label for="last-class-lesson">Lesson to review<select id="last-class-lesson">${ls.map(l=>`<option value="${esc(l.id)}" ${recentLesson(u.id)?.id===l.id?"selected":""}>Lesson ${esc(l.n)} · ${esc(l.title)}</option>`).join("")}</select></label><button class="btn" id="last-class-start">Practise individually</button><button class="btn ghost" id="last-class-class">Lead as a class</button></div><div id="last-class-round" aria-live="polite" aria-atomic="true"></div><p class="note">Only the lesson choice is remembered on this device. Answers stay on this page and clear when you leave.</p></details>`:""}
      ${u.after?`<p class="note" style="margin-top:16px">${esc(u.after)}</p>`:""}
    </div>`;
    const right = tool?`<div class="tool" id="tool"></div>`:"";
    $("#main").innerHTML = `<div class="wrap grid ${tool?"":"single"}">${left}${right}</div>`;
    $("#main").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{const t=b.querySelector(".t");if(t)t.style.viewTransitionName="lesson-title";go(u.id+"/"+b.dataset.l);});
    const rv=$("#openreview"); if(rv) rv.onclick=()=>go(u.id+"/review");
    const chosenLesson=()=>ls.find(x=>x.id===$("#last-class-lesson").value); const quick=$("#last-class-start"); if(quick) quick.onclick=()=>{const l=chosenLesson();if(l&&window.UnitReview)window.UnitReview.renderQuick($("#last-class-round"),l,{unitName:u.name,onLesson:()=>go(u.id+"/"+l.id)});}; const wholeClass=$("#last-class-class"); if(wholeClass) wholeClass.onclick=()=>{const l=chosenLesson();if(l&&window.UnitReview)window.UnitReview.renderWholeClass($("#last-class-round"),l,{onLesson:()=>go(u.id+"/"+l.id),onSolo:()=>window.UnitReview.renderQuick($("#last-class-round"),l,{unitName:u.name,onLesson:()=>go(u.id+"/"+l.id)})});};
    if(tool){ try{ tool($("#tool")); }catch(e){ $("#tool").textContent="This tool didn't load. Refresh the page to try again."; } }
  }

  function tableHTML(t){
    return `<div class="tablewrap"><table class="data"><thead><tr>${t.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  const activityDrafts = {};

  function activityHTML(u,l){
 const a=l.activity;if(!a?.prompts?.length)return "";
 const key=u.id+"/"+l.id, saved=activityDrafts[key]||{};
 const fields=a.prompts.map((p,i)=>`<div style="margin-top:16px">
  <label for="la-${i}" style="display:block;font-weight:700;margin-bottom:5px">${i+1}. ${esc(p.label)}</label>
  ${p.hint?`<p class="note" style="margin:0 0 6px">${esc(p.hint)}</p>`:""}
  <textarea id="la-${i}" data-field="${i}" rows="${Math.max(2,Math.min(8,p.rows||3))}" style="display:block;width:100%;min-height:78px;padding:10px 12px;background:var(--paper);color:var(--ink);font:inherit;border:1px solid var(--rule);border-radius:var(--btn-radius);resize:vertical" placeholder="Write your response here">${esc(saved[i]||"")}</textarea>
 </div>`).join("");
 return `<div class="task" id="lesson-activity" style="margin-top:10px">
  <p style="font-weight:700;font-size:19px;margin:0">${esc(a.title)}</p>
  <p style="margin-top:7px">${esc(a.context||"Use the lesson to support your response.")}</p>
  ${a.href?`<p style="margin:12px 0"><a class="btn ghost" href="${esc(a.href)}">${esc(a.linkTitle||"Open interactive activity")}</a></p>`:""}
  ${fields}
  ${a.checklist?.length?`<div style="margin-top:18px"><b>Before you finish</b><ul style="margin:6px 0 0;padding-left:20px">${a.checklist.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}
  <div style="display:flex;flex-wrap:wrap;gap:9px;margin-top:18px">
   <button class="btn" type="button" id="la-download">Download my responses</button>
   <button class="btn ghost" type="button" id="la-copy">Copy my responses</button>
   <button class="btn ghost" type="button" id="la-clear">Clear</button>
  </div>
  <p class="note" id="la-status" aria-live="polite" style="margin-top:10px">Not submitted or saved online. Download or copy your responses before leaving this page.</p>
 </div>`;
}

  function bindActivity(u,l){
 const root=$("#lesson-activity");if(!root||!l.activity)return;
 const key=u.id+"/"+l.id,a=l.activity,fields=[...root.querySelectorAll("textarea[data-field]")],status=root.querySelector("#la-status");
 fields.forEach((el,i)=>el.addEventListener("input",()=>{
  if(!activityDrafts[key])activityDrafts[key]={};
  activityDrafts[key][i]=el.value;
  status.textContent="Draft held on this page only. Download or copy it before closing the tab.";
 }));
 const contents=()=>[u.name+" — "+l.title,a.title,a.context||"",
   ...a.prompts.map((p,i)=>(i+1)+". "+p.label+"\n"+fields[i].value.trim()),
   ...(a.checklist?.length?["Self-check:\n"+a.checklist.map(x=>"- "+x).join("\n")]:[])
  ].filter(Boolean).join("\n\n")+"\n";
 root.querySelector("#la-download").onclick=()=>{
  const blob=new Blob([contents()],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob),link=document.createElement("a");
  link.href=url;link.download=(H.subject+"-"+u.id+"-"+l.id+"-activity").replace(/[^a-z0-9-]/gi,"-")+".txt";
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  status.textContent="Responses downloaded. Keep the file if this is assigned work.";
 };
 root.querySelector("#la-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){status.textContent="Copy isn't available in this browser. Use Download my responses instead.";return;}
  navigator.clipboard.writeText(contents()).then(()=>{status.textContent="Responses copied. Paste them into a document.";})
   .catch(()=>{status.textContent="Copy was blocked. Use Download my responses instead.";});
 };
 root.querySelector("#la-clear").onclick=()=>{
  if(!window.confirm("Clear all responses for this activity?"))return;
  fields.forEach(el=>el.value="");delete activityDrafts[key];
  status.textContent="Responses cleared.";
 };
}


  function exitTicketHTML(u,l){
    const key=u.id+"/"+l.id,saved=exitDrafts[key]||{};
    return `<details class="exit-ticket" id="exit-ticket">
      <summary>One-minute exit ticket · Before you go</summary>
      <p class="note">Use this as a quick reflection on Lesson ${esc(l.n)} · ${esc(l.title)} — responses are not submitted or saved online.</p>
      <label for="exit-recall">One idea from this lesson I can now explain</label>
      <textarea id="exit-recall" data-exit="recall" rows="2">${esc(saved.recall||"")}</textarea>
      <label for="exit-question">One question or idea I want to revisit</label>
      <textarea id="exit-question" data-exit="question" rows="2">${esc(saved.question||"")}</textarea>
      <div class="exit-ticket-actions">
        <button class="btn" type="button" id="exit-download">Download my ticket</button>
        <button class="btn ghost" type="button" id="exit-copy">Copy my ticket</button>
        <button class="btn ghost" type="button" id="exit-clear">Clear</button>
      </div>
      <p class="note" id="exit-status" aria-live="polite">Optional: copy or download your reflection before leaving.</p>
    </details>`;
  }

  function bindExitTicket(u,l){
    const root=$("#exit-ticket");if(!root)return;
    const key=u.id+"/"+l.id,fields=[...root.querySelectorAll("textarea[data-exit]")],status=root.querySelector("#exit-status");
    fields.forEach(el=>el.addEventListener("input",()=>{
      if(!exitDrafts[key])exitDrafts[key]={};
      exitDrafts[key][el.dataset.exit]=el.value;
      status.textContent="Draft held in this page only. Copy or download it before leaving if you want to keep it.";
    }));
    const contents=()=>[u.name+" — "+l.title,"One-minute exit ticket",
      "One idea I can now explain:\n"+root.querySelector('[data-exit="recall"]').value.trim(),
      "One question or idea I want to revisit:\n"+root.querySelector('[data-exit="question"]').value.trim()
    ].join("\n\n")+"\n";
    root.querySelector("#exit-download").onclick=()=>{
      const blob=new Blob([contents()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
      link.href=url;link.download=("exit-ticket-"+H.subject+"-"+u.id+"-"+l.id).replace(/[^a-z0-9-]/gi,"-")+".txt";
      document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
      status.textContent="Exit ticket downloaded.";
    };
    root.querySelector("#exit-copy").onclick=()=>{
      if(!navigator.clipboard?.writeText){status.textContent="Copy isn't available in this browser. Use Download my ticket instead.";return;}
      navigator.clipboard.writeText(contents()).then(()=>{status.textContent="Exit ticket copied.";}).catch(()=>{status.textContent="Copy was blocked. Use Download my ticket instead.";});
    };
    root.querySelector("#exit-clear").onclick=()=>{
      fields.forEach(el=>el.value="");delete exitDrafts[key];status.textContent="Exit ticket cleared.";
    };
  }

  function directLessonHTML(l){
 const d=l.directLesson;if(!d)return "";
 const steps=(d.steps||[]).map((s,i)=>'<li><span class="direct-step-num">'+(i+1)+'</span><div><b>'+esc(s.title)+'</b><p>'+esc(s.text)+'</p></div></li>').join("");
 const evidence=d.model?(d.model.evidence||[]).map(x=>'<li>'+esc(x)+'</li>').join(""):"";
 const model=d.model?'<section class="direct-model"><h4>Watch the thinking</h4><p><strong>'+esc(d.model.title)+':</strong> '+esc(d.model.prompt)+'</p><ul>'+evidence+'</ul><p><strong>Think-aloud:</strong> '+esc(d.model.thinking)+'</p><p class="direct-answer"><strong>Model response:</strong> '+esc(d.model.answer)+'</p></section>':"";
 const practice=d.practice?'<details class="direct-practice"><summary>Try it: '+esc(d.practice.prompt)+'</summary><p class="direct-hint">'+esc(d.practice.hint||"Try it before opening the sample.")+'</p><details class="direct-sample"><summary>Reveal one sample response</summary><p>'+esc(d.practice.sample)+'</p></details></details>':"";
 return '<section class="direct-lesson" aria-labelledby="direct-lesson-title"><h3 id="direct-lesson-title">'+esc(d.title)+'</h3><p class="direct-kicker">Direct lesson'+(d.time?' · '+esc(d.time):"")+'</p><p class="direct-goal"><strong>Learning target:</strong> '+esc(d.goal)+'</p><ol class="direct-steps">'+steps+'</ol>'+model+practice+'</section>';
}

  let justAnswered=-1;
  function renderLesson(u,l){
    const exitWasOpen=!!document.getElementById("exit-ticket")?.open;
    if(window.UnitReview)window.UnitReview.remember(H.subject,u.id,l.id);
    const ls=u.lessons, i=ls.indexOf(l), prev=ls[i-1], next=ls[i+1];
    const imgs=l.imgs||[];
    const qs=(l.check||[]).map((q,qi)=>{
      const a=answers[qi];
      return `<div class="q${qi===justAnswered?" just":""}" role="group" aria-label="Question ${qi+1}: ${esc(q.q)}"><div class="qt">${qi+1}. ${esc(q.q)}</div><div class="opts">${q.a.map((o,oi)=>{
        let c="opt"; if(a!==undefined){ if(oi===q.c) c+=" right"; else if(oi===a) c+=" wrong"; }
        return `<button class="${c}" data-q="${qi}" data-o="${oi}" ${a!==undefined?"disabled":""}>${esc(o)}</button>`;}).join("")}</div>
        ${a!==undefined?`<div class="why">${a===q.c?"Right. ":"Not quite. "}${esc(q.why)}</div>`:""}</div>`;}).join("");
    const n=Object.keys(answers).length, right=(l.check||[]).filter((q,qi)=>answers[qi]===q.c).length;
    const ltKey=u.id+"/"+l.id, LT=H.lessonTools&&H.lessonTools[ltKey], keep=document.getElementById("ltool");
    $("#main").innerHTML = `<div class="wrap"><article class="lesson">
      <button class="back" id="back">&larr; Unit ${esc(u.n)}: ${esc(u.name)}</button>
      <h2 class="lesson-title">${esc(l.title)}</h2><div class="span">Lesson ${esc(l.n)} of ${(u.lessons||[]).length}</div>
      ${imgs[0]?`<figure class="hero"><img src="${imgs[0].src}" alt="" data-cap="${esc(imgs[0].cap)}"><figcaption>${esc(imgs[0].cap)}</figcaption></figure>`:""}
      ${l.big?`<div class="big"><div class="eyebrow">The big idea</div><p>${esc(l.big)}</p></div>`:""}
      ${directLessonHTML(l)}
      ${LT?`<div id="ltool-slot"></div>`:""}
      ${(l.charts||[]).map((c,ci)=>`<div id="lc-${ci}"></div>`).join("")}
      ${l.notes&&l.notes.length?`<h3>What we covered</h3><ul class="notes">${l.notes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
      ${l.table?`<h3>${esc(l.table.title||"Reference")}</h3>${tableHTML(l.table)}`:""}
      ${l.html?`<div style="margin-top:18px">${l.html}</div>`:""}
      ${l.terms&&l.terms.length?`<h3>Key terms</h3><dl class="terms">${l.terms.map(t=>`<dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd>`).join("")}</dl>`:""}
      ${imgs.length>1?`<h3>Pictures from the lesson</h3><div class="gal">${imgs.slice(1).map(m=>`<figure><img src="${m.src}" alt="" loading="lazy" data-cap="${esc(m.cap)}"><figcaption>${esc(m.cap)}</figcaption></figure>`).join("")}</div>`:""}
      ${l.work?`<h3>Your work</h3><div class="task"><p>${esc(l.work)}</p><p class="note">Get the handout from Mr. Mangles if you don't have it.</p></div>`:""}
      ${l.activity?`<h3>Complete the activity</h3>${activityHTML(u,l)}`:""}
      ${qs?`<h3>Check yourself</h3>${qs}`:""}
      ${n&&n===l.check.length?`<div class="score">${right} out of ${l.check.length}${right===l.check.length?". Nice, you've got this lesson.":". Have another look at the notes, then try again."} <button class="btn ghost" id="retry" style="margin-left:8px">Try again</button></div>`:""}
      ${exitTicketHTML(u,l)}
      <div class="pager">${prev?`<button class="btn ghost" data-go="${u.id}/${prev.id}">&larr; Lesson ${esc(prev.n)}</button>`:"<span></span>"}${next?`<button class="btn ghost" data-go="${u.id}/${next.id}">Lesson ${esc(next.n)} &rarr;</button>`:(ls.length>1?`<button class="btn" data-go="${u.id}/review">Unit review &rarr;</button>`:"")}</div>
    </article></div>`;
    $("#back").onclick=()=>go(u.id);
    const exitPanel=$("#exit-ticket");if(exitPanel&&exitWasOpen)exitPanel.open=true;
    if(LT){ // a live model on the lesson page; reuse it on re-render so answering questions doesn't reset it
      const slot=$("#ltool-slot");
      if(keep&&keep.dataset.k===ltKey) slot.replaceWith(keep);
      else { const d=document.createElement("div"); d.className="tool ltool"; d.id="ltool"; d.dataset.k=ltKey; slot.replaceWith(d);
        try{ LT(d); }catch(e){ d.textContent="This model didn't load. Refresh the page to try again."; } }
    }
    (l.charts||[]).forEach((c,ci)=>{ if(window.LineChart) window.LineChart($("#lc-"+ci),c); });
    document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
    // Bind only lesson quiz choices; tool controls may also use the .opt style.
    document.querySelectorAll("article.lesson > .q .opts button[data-q][data-o]").forEach(b=>b.onclick=()=>{
      answers[+b.dataset.q]=+b.dataset.o; justAnswered=+b.dataset.q;
      if(l.check.every((q,qi)=>answers[qi]===q.c)) markDone(u.id+"/"+l.id);
      const y=window.scrollY; renderLesson(u,l); justAnswered=-1; window.scrollTo(0,y);
      const next=(l.check||[]).findIndex((q,qi)=>answers[qi]===undefined);
      const focusTarget=next>=0?document.querySelector(`article.lesson > .q .opts button[data-q="${next}"][data-o]`):document.querySelector("#retry");
      if(focusTarget) focusTarget.focus({preventScroll:true});
    });
    const r=$("#retry"); if(r) r.onclick=()=>{answers={}; const y=window.scrollY; renderLesson(u,l); window.scrollTo(0,y);};
    bindActivity(u,l);
    bindExitTicket(u,l);
  }

  function renderReview(u){
    $("#main").innerHTML=`<div class="wrap"><article class="lesson">
      <button class="back" id="back">&larr; Unit ${esc(u.n)}: ${esc(u.name)}</button>
      <h2>Unit review</h2><div class="span">${esc(u.name)}</div><div id="review"></div><div id="unit-practice-quiz"></div></article></div>`;
    $("#back").onclick=()=>go(u.id);
    if(window.UnitReview) window.UnitReview.render($("#review"),{name:u.name,lessons:u.lessons,onLesson:l=>go(u.id+"/"+l.id)});
    if(window.UnitPracticeQuiz) window.UnitPracticeQuiz.mount($("#unit-practice-quiz"),u,lessonId=>go(u.id+"/"+lessonId));
  }

  // lightbox for any lesson image
  document.addEventListener("click",e=>{
    const im=e.target.closest&&e.target.closest(".hero img,.gal img,img.zoom"); if(!im) return;
    $("#lbimg").src=im.src; $("#lbcap").textContent=im.dataset.cap||""; $("#lightbox").hidden=false;
  });
  $("#lightbox").addEventListener("click",()=>{$("#lightbox").hidden=true;});
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") $("#lightbox").hidden=true; });
  // Navigation continuity: the lesson title travels from the list to the lesson page (and back).
  const calm=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("hashchange",()=>{
    if(!document.startViewTransition||calm()){ route(); return; }
    document.startViewTransition(()=>{ route(); });
  });
  route();
})();
