/* Grade 8 Science Skills · Fair Test Studio. No accounts or saved answers. */
(() => {
  'use strict';
  const H=window.HUB;if(!H)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cases=[
    {title:'Sugar dissolving',question:'How does water temperature affect how quickly sugar dissolves?',iv:'Water temperature',dv:'Time for the sugar to dissolve',cv:'Amount of sugar',options:{iv:['Amount of sugar','Water temperature','Time for the sugar to dissolve'],dv:['Amount of sugar','Water temperature','Time for the sugar to dissolve'],cv:['Amount of sugar','Water temperature','Type of spoon']},why:{iv:'Water temperature is the one thing changed on purpose.',dv:'The time to dissolve is measured to see what happened.',cv:'Keeping the amount of sugar the same makes the water temperature a fair comparison.'}},
    {title:'Rose fertilizer',question:'How does the amount of fertilizer affect the number of flowers on rose bushes after two months?',iv:'Amount of fertilizer',dv:'Number of flowers',cv:'Amount of water',options:{iv:['Number of flowers','Amount of fertilizer','Two months'],dv:['Amount of water','Number of flowers','Amount of fertilizer'],cv:['Amount of fertilizer','Amount of water','Number of flowers']},why:{iv:'The amount of fertilizer is changed on purpose.',dv:'The number of flowers is counted as the result.',cv:'Keeping water amounts consistent helps make fertilizer the likely cause of differences.'}},
    {title:'Toy car ramp',question:'How does ramp height affect how far a toy car rolls?',iv:'Ramp height',dv:'Distance the car rolls',cv:'The toy car used',options:{iv:['Distance the car rolls','Ramp height','The toy car used'],dv:['Ramp height','Distance the car rolls','The floor colour'],cv:['Ramp height','The toy car used','Distance the car rolls']},why:{iv:'Ramp height is what the investigator changes.',dv:'Distance travelled is the measurement.',cv:'Using the same toy car removes car differences as another possible cause.'}}
  ];
  const style=`<style>
  .fts{padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius)}
  .fts h3{margin:0 0 6px}.fts-intro,.fts-context{color:var(--muted)}.fts-case{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0}.fts-case button{border:1px solid var(--rule);border-radius:999px;background:var(--paper);color:var(--ink);padding:7px 12px;font:inherit;cursor:pointer}.fts-case button[aria-pressed=true]{border-color:var(--accent);background:var(--accent-soft);color:var(--accent-ink)}
  .fts-question{padding:14px 16px;background:var(--soft);border-radius:var(--radius);font-weight:600}.fts-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}.fts-field label{display:block;font-size:13px;font-weight:700;margin-bottom:6px}.fts-field select{width:100%;min-height:44px;padding:8px 10px;border:1px solid var(--rule);border-radius:10px;background:var(--paper);color:var(--ink);font:inherit}.fts-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.fts-actions button{min-height:42px;padding:0 16px;border:0;border-radius:var(--btn-radius);background:var(--btn);color:var(--on-btn);font:inherit;font-weight:700;cursor:pointer}.fts-actions .fts-secondary{border:1px solid var(--rule);background:var(--paper);color:var(--ink)}.fts-feedback{margin-top:14px;padding:12px 14px;border-radius:10px;background:var(--soft)}.fts-feedback p{margin:6px 0}.fts-feedback .fts-right{color:var(--good)}.fts-feedback .fts-wrong{color:var(--bad)}.fts-summary{font-weight:700}.fts button:focus-visible,.fts select:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 40%,transparent);outline-offset:2px}
  @media(max-width:650px){.fts-grid{grid-template-columns:1fr}}
  </style>`;
  function fairTestStudio(root){
    let current=0;
    root.innerHTML=style+`<section class="fts" aria-label="Fair Test Studio"><div class="eyebrow">Interactive practice</div><h3>Fair Test Studio</h3><p class="fts-intro">Choose what changes, what you measure, and one thing to keep the same.</p><div class="fts-case" role="group" aria-label="Choose a test scenario"></div><div class="fts-body"></div></section>`;
    const tabs=root.querySelector('.fts-case'),body=root.querySelector('.fts-body');
    function draw(){
      const c=cases[current];
      tabs.innerHTML=cases.map((item,i)=>`<button type="button" data-case="${i}" aria-pressed="${i===current}">${esc(item.title)}</button>`).join('');
      tabs.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{current=Number(b.dataset.case);draw();}));
      const fields=[['iv','What will you change?'],['dv','What will you measure?'],['cv','Choose one thing to keep the same']];
      body.innerHTML=`<p class="fts-question">${esc(c.question)}</p><p class="fts-context">For each part of this test, choose the best answer.</p><div class="fts-grid">${fields.map(([key,label])=>`<div class="fts-field"><label for="fts-${key}">${label}</label><select id="fts-${key}"><option value="">Choose one…</option>${c.options[key].map(option=>`<option value="${esc(option)}">${esc(option)}</option>`).join('')}</select></div>`).join('')}</div><div class="fts-actions"><button type="button" class="fts-check">Check my plan</button><button type="button" class="fts-reset fts-secondary">Try again</button></div><div class="fts-feedback" role="status" hidden></div>`;
      body.querySelector('.fts-check').addEventListener('click',()=>check(c));
      body.querySelector('.fts-reset').addEventListener('click',()=>draw());
    }
    function check(c){
      const feedback=body.querySelector('.fts-feedback');
      const keys=['iv','dv','cv'];
      const labels={iv:'Independent variable',dv:'Dependent variable',cv:'Controlled variable'};
      const missing=keys.filter(k=>!body.querySelector(`#fts-${k}`).value);
      if(missing.length){feedback.hidden=false;feedback.innerHTML=`<strong>Finish your plan first.</strong><p>Choose an answer for each part of the test.</p>`;return;}
      const correct=keys.filter(k=>body.querySelector(`#fts-${k}`).value===c[k]).length;
      feedback.hidden=false;
      feedback.innerHTML=`<div class="fts-summary">${correct===3?'Strong plan':`${correct} of 3 correct`}</div>${keys.map(k=>{const value=body.querySelector(`#fts-${k}`).value,ok=value===c[k];return `<p class="${ok?'fts-right':'fts-wrong'}"><strong>${labels[k]}: ${ok?'correct':'review this'}</strong> — ${esc(c.why[k])}${ok?'':` Best choice: ${esc(c[k])}.`}</p>`;}).join('')}<p>Remember: change one main factor, measure one result, and keep other important factors consistent.</p>`;
      body.querySelectorAll('select').forEach(s=>s.disabled=true);
      body.querySelector('.fts-check').disabled=true;
    }
    draw();
  }
  H.lessonTools=Object.assign(H.lessonTools||{}, {'skills/fair':fairTestStudio});
})();
