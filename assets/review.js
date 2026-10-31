/* Unit review: big ideas, flashcards from every key term, and a mixed practice test from every lesson's self-check.
   UnitReview.render(el, {name, lessons:[{n,title,big,terms:[[t,d]],check:[{q,a,c,why}]}], onLesson:(lesson)=>{}}) */
(function(){
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const shuffle=a=>{a=a.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]];}return a;};

  const LAST_KEY="class-last-lesson-v1";
  function recentMap(){try{return JSON.parse(localStorage.getItem(LAST_KEY)||"{}");}catch(e){return {};}}
  function remember(subject,unitId,lessonId){
    try{const map=recentMap();map[String(subject)+":"+String(unitId)]=String(lessonId);localStorage.setItem(LAST_KEY,JSON.stringify(map));}catch(e){}
  }
  function lastLesson(subject,unitId,lessons){
    const id=recentMap()[String(subject)+":"+String(unitId)];
    return id?(lessons||[]).find(l=>l.id===id)||null:null;
  }
  function renderQuick(el,lesson,options={}){
    const bank=(lesson.check||[]).filter(q=>Array.isArray(q.a)&&q.a.length>1&&Number.isInteger(q.c)&&q.c>=0&&q.c<q.a.length&&!/^Use the graph/.test(q.q));
    let qs=shuffle(bank).slice(0,Math.min(3,bank.length)),i=0,answers=[];
    function draw(){
      if(!qs.length){
        el.innerHTML='<div class="rv-quick"><p class="rv-lede">This lesson does not have a quick-check question yet.</p>'+(lesson.big?'<p><strong>Recall the big idea:</strong> '+esc(lesson.big)+'</p>':'')+'<button class="btn" id="rvq-open">Open the lesson</button></div>';
        const open=el.querySelector("#rvq-open");if(open&&options.onLesson)open.onclick=options.onLesson;return;
      }
      if(i>=qs.length){
        const score=answers.filter((a,j)=>a===qs[j].c).length,missed=qs.filter((q,j)=>answers[j]!==q.c);
        el.innerHTML='<div class="rv-quick"><div class="rv-score"><span>'+score+'</span> / '+qs.length+'</div><p role="status">'+(score===qs.length?"Nice recall. You're ready to build on this.":score/qs.length>=.67?"Good start. Review the one you missed.":"Open the lesson notes, then try those questions again.")+'</p>'+
          (missed.length?'<button class="btn" id="rvq-missed">Retry missed ('+missed.length+')</button> ':"")+
          '<button class="btn ghost" id="rvq-again">New 3-question round</button> <button class="btn ghost" id="rvq-open">Open the full lesson</button></div>';
        const retry=el.querySelector("#rvq-missed");if(retry)retry.onclick=()=>{qs=shuffle(missed);i=0;answers=[];draw();};
        const again=el.querySelector("#rvq-again");if(again)again.onclick=()=>{qs=shuffle(bank).slice(0,Math.min(3,bank.length));i=0;answers=[];draw();};
        const open=el.querySelector("#rvq-open");if(open&&options.onLesson)open.onclick=options.onLesson;return;
      }
      const q=qs[i],a=answers[i];
      el.innerHTML='<div class="rv-quick"><div class="rv-prog"><span style="width:'+Math.round(i/qs.length*100)+'%"></span></div><p class="rv-qn">Question '+(i+1)+' of '+qs.length+' · '+esc(options.unitName||"")+ ' · Lesson '+esc(lesson.n)+'</p><p class="rv-q">'+esc(q.q)+'</p><div class="opts">'+q.a.map((o,k)=>{let cls="opt";if(a!==undefined){if(k===q.c)cls+=" right";else if(k===a)cls+=" wrong";}return '<button class="'+cls+'" data-rvq="'+k+'" '+(a!==undefined?"disabled":"")+'>'+esc(o)+'</button>';}).join("")+'</div>'+
        (a!==undefined?'<p class="why" role="status">'+(a===q.c?"Right. ":"Not quite. ")+esc(q.why)+'</p><button class="btn" id="rvq-next">'+(i+1<qs.length?"Next question":"See my score")+'</button>':"")+'</div>';
      el.querySelectorAll("[data-rvq]").forEach(b=>b.onclick=()=>{answers[i]=Number(b.dataset.rvq);draw();});
      const next=el.querySelector("#rvq-next");if(next)next.onclick=()=>{i++;draw();};
    }
    draw();
  }

  function renderWholeClass(el,lesson,options={}){
    const bank=(lesson.check||[]).filter(q=>Array.isArray(q.a)&&q.a.length>1&&Number.isInteger(q.c)&&q.c>=0&&q.c<q.a.length&&!/^Use the graph/.test(q.q));
    let qs=shuffle(bank).slice(0,Math.min(3,bank.length)),i=0,revealed=false,projecting=false;
    function draw(){
      if(!qs.length){
        el.classList.remove("rv-projector");
        el.innerHTML='<div class="rv-quick"><p class="rv-lede">This lesson does not have a quick-check question yet.</p>'+(lesson.big?'<p><strong>Recall the big idea:</strong> '+esc(lesson.big)+'</p>':'')+'<button class="btn" id="rvc-open">Open the lesson</button></div>';
        const open=el.querySelector("#rvc-open");if(open&&options.onLesson)open.onclick=options.onLesson;return;
      }
      if(i>=qs.length){
        el.innerHTML='<div class="rv-quick"><div class="rv-score"><span>'+qs.length+'</span> prompts</div><p role="status">Whole-class review complete. Invite students to name one idea they can now explain.</p><button class="btn" id="rvc-again">New question set</button> <button class="btn ghost" id="rvc-solo">Try it individually</button> <button class="btn ghost" id="rvc-open">Open the full lesson</button> <button class="btn ghost" id="rvc-project">'+(projecting?'Exit board view':'Project this question')+'</button></div>';
        el.classList.toggle("rv-projector",projecting);
        const again=el.querySelector("#rvc-again");if(again)again.onclick=()=>{qs=shuffle(bank).slice(0,Math.min(3,bank.length));i=0;revealed=false;draw();};
        const solo=el.querySelector("#rvc-solo");if(solo&&options.onSolo)solo.onclick=()=>{projecting=false;el.classList.remove("rv-projector");options.onSolo();};
        const open=el.querySelector("#rvc-open");if(open&&options.onLesson)open.onclick=()=>{projecting=false;el.classList.remove("rv-projector");options.onLesson();};
        const project=el.querySelector("#rvc-project");if(project)project.onclick=()=>{projecting=!projecting;draw();};return;
      }
      const q=qs[i];
      el.innerHTML='<div class="rv-quick"><div class="rv-prog"><span style="width:'+Math.round(i/qs.length*100)+'%"></span></div><p class="rv-qn">Whole-class question '+(i+1)+' of '+qs.length+' · Lesson '+esc(lesson.n)+'</p><p class="rv-q">'+esc(q.q)+'</p><p class="rv-lede">Think, turn-and-talk or write a response before revealing.</p>'+
        (revealed?'<div class="why" role="status"><strong>Answer:</strong> '+esc(q.a[q.c])+'<br><strong>Why:</strong> '+esc(q.why)+'</div><button class="btn" id="rvc-next">'+(i+1<qs.length?'Next question':'Finish review')+'</button>':'<button class="btn" id="rvc-reveal">Reveal explanation</button>')+
        ' <button class="btn ghost" id="rvc-solo">Switch to individual practice</button> <button class="btn ghost" id="rvc-project">'+(projecting?'Exit board view':'Project this question')+'</button></div>';
      el.classList.toggle("rv-projector",projecting);
      const reveal=el.querySelector("#rvc-reveal");if(reveal)reveal.onclick=()=>{revealed=true;draw();};
      const next=el.querySelector("#rvc-next");if(next)next.onclick=()=>{i++;revealed=false;draw();};
      const solo=el.querySelector("#rvc-solo");if(solo&&options.onSolo)solo.onclick=()=>{projecting=false;el.classList.remove("rv-projector");options.onSolo();};
      const project=el.querySelector("#rvc-project");if(project)project.onclick=()=>{projecting=!projecting;draw();};
    }
    draw();
  }

  window.UnitReview={remember,lastLesson,renderQuick,renderWholeClass,render(el,unit){
    const ls=unit.lessons.filter(l=>l.big||l.terms||l.check);
    const cards=[]; ls.forEach(l=>(l.terms||[]).forEach(t=>cards.push({t:t[0],d:t[1],l})));
    const bank=[]; ls.forEach(l=>(l.check||[]).forEach(q=>{ if(!/^Use the graph/.test(q.q)) bank.push({...q,l}); }));
    let tab="ideas", deck=cards.slice(), ci=0, flipped=false, defFirst=false, known=new Set();
    let test=null;

    function newTest(){ test={qs:shuffle(bank).slice(0,Math.min(12,bank.length)),i:0,ans:[]}; }
    // Focused practice reuses the questions the student just missed, with fresh answers.
    // Repeating this action narrows the round again until every question is correct.
    function retryMissed(){
      if(!test) return;
      const missed=test.qs.filter((q,i)=>test.ans[i]!==q.c);
      if(missed.length) test={qs:shuffle(missed),i:0,ans:[]};
    }
    function shell(inner){
      return `<div class="rv">
        <div class="rv-tabs" role="tablist">
          ${[["ideas","Big ideas"],["cards",`Flashcards · ${cards.length}`],["test","Practice test"]].map(([k,t])=>`<button role="tab" aria-selected="${tab===k}" data-tab="${k}">${t}</button>`).join("")}
        </div>${inner}</div>`;
    }
    function ideas(){
      return `<p class="rv-lede">Every lesson in this unit in one line. If one doesn't make sense any more, open that lesson again.</p>
        <ol class="rv-ideas">${ls.map(l=>`<li><button class="rv-open" data-l="${esc(l.id)}"><span class="rv-n">${esc(l.n)}</span><span><b>${esc(l.title)}</b>${l.big?`<span class="rv-big">${esc(l.big)}</span>`:""}</span></button></li>`).join("")}</ol>`;
    }
    function flash(){
      if(!deck.length) return `<p class="rv-lede">This unit doesn't have key terms yet.</p>`;
      const c=deck[ci], front=defFirst?c.d:c.t, back=defFirst?c.t:c.d;
      return `<div class="rv-cardwrap"><button class="rv-card${flipped?" flipped":""}" id="rv-flip" aria-label="Flip card">
          <span class="rv-side">${flipped?(defFirst?"Term":"Meaning"):(defFirst?"Meaning":"Term")}</span>
          <span class="rv-face ${(!flipped&&!defFirst)||(flipped&&defFirst)?"term":"def"}">${esc(flipped?back:front)}</span>
          <span class="rv-from">Lesson ${esc(c.l.n)} · ${esc(c.l.title)}</span></button></div>
        <div class="rv-row"><button class="btn ghost" id="rv-prev" ${ci===0?"disabled":""}>&larr;</button>
          <span class="rv-count">${ci+1} / ${deck.length}${known.size?` · ${known.size} known`:""}</span>
          <button class="btn ghost" id="rv-next" ${ci===deck.length-1?"disabled":""}>&rarr;</button></div>
        <div class="rv-row"><button class="btn" id="rv-know">${known.has(c.t)?"Marked as known ✓":"I know this one"}</button>
          <button class="btn ghost" id="rv-shuffle">Shuffle</button>
          <button class="btn ghost" id="rv-mode">${defFirst?"Show term first":"Show meaning first"}</button>
          ${known.size?`<button class="btn ghost" id="rv-left">Only ones I don't know</button>`:""}</div>
        <p class="rv-lede" style="margin-top:10px">Tap the card to flip it. Say the answer out loud before you flip.</p>`;
    }
    function testView(){
      if(!bank.length) return `<p class="rv-lede">No practice questions for this unit yet.</p>`;
      if(!test) newTest();
      if(test.i>=test.qs.length){
        const right=test.ans.filter((a,i)=>a===test.qs[i].c).length, n=test.qs.length;
        const missedQs=test.qs.filter((q,i)=>test.ans[i]!==q.c);
        const missed=[...new Map(missedQs.map(q=>[q.l.id,q.l])).values()];
        return `<div class="rv-score"><span>${right}</span> / ${n}</div>
          <p>${right===n?"Perfect. You're ready.":right/n>=.75?"Strong. Look over what you missed.":"Worth another look before the test."}</p>
          ${missed.length?`<h4 class="rv-h">Go back to</h4><ol class="rv-ideas">${missed.map(l=>`<li><button class="rv-open" data-l="${esc(l.id)}"><span class="rv-n">${esc(l.n)}</span><span><b>${esc(l.title)}</b></span></button></li>`).join("")}</ol>`:""}
          <div class="rv-row">
            ${missedQs.length?`<button class="btn" id="rv-missed">Practice missed questions (${missedQs.length})</button>`:""}
            <button class="btn ghost" id="rv-again">New practice test</button>
          </div>`;
      }
      const q=test.qs[test.i], a=test.ans[test.i];
      return `<div class="rv-prog"><span style="width:${test.i/test.qs.length*100}%"></span></div>
        <p class="rv-qn">Question ${test.i+1} of ${test.qs.length} · from Lesson ${esc(q.l.n)}</p>
        <p class="rv-q">${esc(q.q)}</p>
        <div class="opts">${q.a.map((o,k)=>{let c="opt";if(a!==undefined){if(k===q.c)c+=" right";else if(k===a)c+=" wrong";}return `<button class="${c}" data-o="${k}" ${a!==undefined?"disabled":""}>${esc(o)}</button>`;}).join("")}</div>
        ${a!==undefined?`<p class="why">${a===q.c?"Right. ":"Not quite. "}${esc(q.why)}</p><button class="btn" id="rv-nq" style="margin-top:10px">${test.i+1<test.qs.length?"Next question":"See my score"}</button>`:""}`;
    }
    function draw(){
      el.innerHTML=shell(tab==="ideas"?ideas():tab==="cards"?flash():testView());
      el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;draw();});
      el.querySelectorAll(".rv-open").forEach(b=>b.onclick=()=>{const l=ls.find(x=>x.id===b.dataset.l); if(l&&unit.onLesson) unit.onLesson(l);});
      const $=id=>el.querySelector("#"+id);
      if($("rv-flip")) $("rv-flip").onclick=()=>{flipped=!flipped;draw();};
      if($("rv-prev")) $("rv-prev").onclick=()=>{ci--;flipped=false;draw();};
      if($("rv-next")) $("rv-next").onclick=()=>{ci++;flipped=false;draw();};
      if($("rv-know")) $("rv-know").onclick=()=>{const t=deck[ci].t; known.has(t)?known.delete(t):known.add(t); if(ci<deck.length-1){ci++;flipped=false;} draw();};
      if($("rv-shuffle")) $("rv-shuffle").onclick=()=>{deck=shuffle(deck);ci=0;flipped=false;draw();};
      if($("rv-mode")) $("rv-mode").onclick=()=>{defFirst=!defFirst;flipped=false;draw();};
      if($("rv-left")) $("rv-left").onclick=()=>{const left=cards.filter(c=>!known.has(c.t)); deck=left.length?shuffle(left):cards.slice(); ci=0;flipped=false;draw();};
      el.querySelectorAll(".rv [data-o]").forEach(b=>b.onclick=()=>{test.ans[test.i]=+b.dataset.o;draw();});
      if($("rv-nq")) $("rv-nq").onclick=()=>{test.i++;draw();};
      if($("rv-missed")) $("rv-missed").onclick=()=>{retryMissed();draw();};
      if($("rv-again")) $("rv-again").onclick=()=>{newTest();draw();};
    }
    draw();
  }};

  const css=`.rv-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:14px 0 18px}
  .rv-tabs button{background:none;border:1px solid var(--rule);border-radius:999px;padding:7px 15px;font-size:15px;cursor:pointer;color:var(--muted)}
  .rv-tabs button[aria-selected="true"]{background:var(--btn,var(--ink));color:var(--on-btn,var(--panel));border-color:transparent}
  .rv-lede{color:var(--muted);font-size:15.5px;margin:0 0 10px}
  .rv-ideas{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule)}
  .rv-ideas li{border-bottom:1px solid var(--rule)}
  .rv-open{display:grid;grid-template-columns:40px 1fr;gap:10px;width:100%;text-align:left;background:none;border:0;padding:12px 2px;cursor:pointer;color:var(--ink)}
  .rv-open:hover b{text-decoration:underline;text-underline-offset:3px}
  .rv-n{font-weight:700;color:var(--accent-ink,var(--accent));font-variant-numeric:tabular-nums}
  .rv-big{display:block;color:var(--muted);font-size:15.5px;margin-top:2px}
  .rv-cardwrap{perspective:1200px}
  .rv-card{display:flex;flex-direction:column;justify-content:center;gap:10px;width:100%;min-height:230px;padding:26px 28px;border:1px solid var(--rule);border-radius:var(--radius,12px);background:var(--paper,var(--panel));cursor:pointer;text-align:center;color:var(--ink);transition:transform .35s ease, background .2s}
  .rv-card.flipped{background:var(--task,var(--accent-soft,var(--bg)));transform:rotateX(360deg)}
  .rv-side{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .rv-face.term{font-family:var(--f-title,var(--f-display));font-weight:var(--title-w,600);font-size:34px;line-height:1.15;text-transform:var(--title-tt,none)}
  .rv-face.def{font-size:20px;line-height:1.45;max-width:46ch;margin:0 auto}
  .rv-from{font-size:13px;color:var(--muted)}
  .rv-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;margin-top:12px}
  .rv-count{font-variant-numeric:tabular-nums;color:var(--muted);min-width:110px;text-align:center}
  .rv-prog{height:6px;background:var(--rule);border-radius:3px;overflow:hidden}.rv-prog span{display:block;height:100%;background:var(--accent)}
  .rv-qn{color:var(--muted);font-size:14px;margin:12px 0 2px}
  .rv-q{font-size:21px;line-height:1.35;margin:0 0 6px}
  .rv-score{font-family:var(--f-title,var(--f-display));font-size:64px;line-height:1;margin-top:6px}.rv-score span{color:var(--accent-ink,var(--accent))}
  .rv-h{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:18px 0 6px}
  .rv .btn:disabled{opacity:.35;cursor:default}
  .last-review{margin:18px 0;padding:16px;border:1px solid var(--rule,#d6d6d6);border-radius:var(--radius,12px);background:var(--soft,var(--panel,#f7f5ee));color:var(--ink)}
  .last-review h3{margin:4px 0 7px}.last-review p{margin:7px 0 12px;color:var(--muted)}
  .last-review-controls{display:flex;align-items:end;gap:9px;flex-wrap:wrap;margin:10px 0}
  .last-review-controls label{display:grid;gap:5px;flex:1;min-width:220px;font-weight:700}
  .last-review-controls select{width:100%;min-height:42px;padding:7px 10px;border:1px solid var(--rule,#aaa);border-radius:8px;background:var(--paper,#fff);color:var(--ink);font:inherit}
  .rv-quick{margin-top:14px;padding:14px;border:1px solid var(--rule,#d6d6d6);border-radius:var(--radius,12px);background:var(--paper,var(--panel,#fff))}
  .rv-quick .opts{display:grid;gap:7px;margin:10px 0}
  .rv-quick .opts .opt{text-align:left}
  .rv-projector{position:fixed;inset:0;z-index:2147483000;overflow:auto;display:grid;align-items:center;padding:clamp(18px,6vh,72px) clamp(16px,6vw,96px);background:var(--bg,#fff)}
  .rv-projector .rv-quick{width:min(100%,1200px);margin:auto;padding:clamp(22px,4vw,52px);border-width:2px;box-shadow:0 18px 60px rgba(0,0,0,.16)}
  .rv-projector .rv-q{font-size:clamp(30px,5vw,64px);line-height:1.2;margin:10px 0 18px}
  .rv-projector .rv-qn{font-size:clamp(17px,2vw,24px)}
  .rv-projector .rv-lede{font-size:clamp(17px,1.7vw,22px)}
  .rv-projector .why{font-size:clamp(20px,2.7vw,34px);line-height:1.35}
  .rv-projector .btn{min-height:48px;font-size:18px}
  .exit-ticket{margin:22px 0;padding:16px;border:1px solid var(--rule,#d6d6d6);border-radius:var(--radius,12px);background:var(--soft,var(--panel,#f7f5ee));color:var(--ink)}
  .exit-ticket summary{cursor:pointer;font-weight:700;font-size:18px}
  .exit-ticket[open] summary{margin-bottom:10px}
  .exit-ticket label{display:block;margin:13px 0 5px;font-weight:700}
  .exit-ticket textarea{display:block;width:100%;min-height:60px;padding:10px 12px;border:1px solid var(--rule,#aaa);border-radius:var(--btn-radius,8px);background:var(--paper,#fff);color:var(--ink);font:inherit;resize:vertical}
  .exit-ticket textarea:focus-visible,.exit-ticket summary:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
  .exit-ticket-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
  @media(max-width:600px){.last-review-controls{align-items:stretch}.last-review-controls label{min-width:100%}}`;
  const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
})();
