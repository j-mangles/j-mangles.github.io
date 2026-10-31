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
  function sugarInvestigation(root){
    const temps=[10,22,45,70], example=[142,88,51,24];
    let mode='example', graph='line';
    const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    root.innerHTML=style+`<section class="fts sugar-lab" aria-label="Sugar dissolving investigation">
      <div class="eyebrow">Class 5 · Mini investigation</div><h3>Sugar Dissolving Investigation</h3>
      <p class="fts-intro">Explore the class example data or enter results from your own fair test. The example values are from the Unit 0 lesson slides; they are not new measurements from your class.</p>
      <div class="fts-case" role="group" aria-label="Choose data set">
        <button type="button" data-mode="example" aria-pressed="true">Explore example data</button>
        <button type="button" data-mode="own" aria-pressed="false">Enter my own results</button>
      </div>
      <div class="sugar-notice" role="status"></div>
      <div class="sugar-data"></div>
      <div class="sugar-options">
        <fieldset><legend>Choose a graph type</legend>
          <label><input type="radio" name="sugar-graph" value="line" checked> Line graph</label>
          <label><input type="radio" name="sugar-graph" value="bar"> Bar graph</label>
        </fieldset>
        <p class="sugar-graph-feedback" aria-live="polite"></p>
      </div>
      <div class="sugar-chart" aria-live="polite"></div>
      <label class="sugar-conclusion-label" for="sugar-conclusion">Conclusion: What pattern do you see? Use numbers as evidence, then explain whether the data support your hypothesis.</label>
      <textarea id="sugar-conclusion" rows="4" placeholder="As water temperature increased from … °C to … °C, the dissolving time …"></textarea>
      <div class="fts-actions"><button type="button" class="sugar-download">Download my data and conclusion</button><button type="button" class="sugar-clear fts-secondary">Clear my results</button></div>
      <p class="fts-context">Your writing stays in this page. Download it if you need to keep or submit your work.</p>
    </section>`;
    const notice=root.querySelector('.sugar-notice'),data=root.querySelector('.sugar-data'),chart=root.querySelector('.sugar-chart'),feedback=root.querySelector('.sugar-graph-feedback'),conclusion=root.querySelector('#sugar-conclusion');
    const number=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?n:null;};
    function values(){
      return temps.map((temp,i)=>{
        const fields=[...root.querySelectorAll('[data-temp="'+temp+'"]')];
        const rawTimes=fields.map(el=>el.value);
        const nums=rawTimes.map(number).filter(v=>v!==null);
        return {temp,rawTimes,nums,mean:nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:null};
      });
    }
    function render(){
      root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
      if(mode==='example'){
        notice.textContent='Class example dataset · one reported time for each temperature. There are no repeat trials in this example.';
        data.innerHTML='<div class="tablewrap"><table class="data"><caption>Water temperature and time for sugar to dissolve</caption><thead><tr><th scope="col">Water temperature (°C)</th><th scope="col">Dissolving time (s)</th></tr></thead><tbody>'+temps.map((t,i)=>'<tr><th scope="row">'+t+'</th><td>'+example[i]+'</td></tr>').join('')+'</tbody></table></div>';
      }else{
        notice.textContent='Enter your measured times in seconds. Repeat each temperature if possible; leave a box blank if you did not run that trial.';
        data.innerHTML='<div class="tablewrap"><table class="data"><caption>Your results · time for sugar to dissolve</caption><thead><tr><th scope="col">Water temperature (°C)</th><th scope="col">Trial 1 (s)</th><th scope="col">Trial 2 (s)</th><th scope="col">Trial 3 (s)</th><th scope="col">Mean time (s)</th></tr></thead><tbody>'+temps.map(t=>'<tr><th scope="row">'+t+'</th>'+[1,2,3].map(n=>'<td><label class="visually-hidden" for="sugar-'+t+'-'+n+'">'+t+'°C trial '+n+' time in seconds</label><input id="sugar-'+t+'-'+n+'" data-temp="'+t+'" inputmode="decimal" type="number" min="0.1" step="any" aria-label="'+t+' degrees Celsius, trial '+n+' in seconds"></td>').join('')+'<td data-mean="'+t+'">—</td></tr>').join('')+'</tbody></table></div>';
        if(window._sugarDraft) Object.entries(window._sugarDraft).forEach(([id,v])=>{const el=root.querySelector('#'+id);if(el)el.value=v;});
        root.querySelectorAll('input[data-temp]').forEach(el=>el.addEventListener('input',()=>{window._sugarDraft=window._sugarDraft||{};window._sugarDraft[el.id]=el.value;update();}));
      }
      root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{if(mode===b.dataset.mode)return;mode=b.dataset.mode;render();});
      root.querySelectorAll('input[name="sugar-graph"]').forEach(el=>{el.checked=el.value===graph;el.onchange=()=>{graph=el.value;update();};});
      update();
    }
    function update(){
      const rows=mode==='example'?temps.map((temp,i)=>({temp,nums:[example[i]],mean:example[i]})):values();
      if(mode==='own') rows.forEach(r=>{const cell=root.querySelector('[data-mean="'+r.temp+'"]');if(cell)cell.textContent=r.mean===null?'—':r.mean.toFixed(1);});
      const ready=rows.filter(r=>r.mean!==null),maxX=Math.max(...temps),maxY=Math.max(10,...ready.map(r=>r.mean));
      if(!ready.length){chart.innerHTML='<p class="fts-context">Enter at least one positive time to see your graph.</p>';}
      else{
        const w=640,h=300,left=64,right=18,top=22,bottom=54,iw=w-left-right,ih=h-top-bottom;
        const x=t=>left+(t/maxX)*iw,y=v=>top+ih-(v/maxY)*ih;
        const ticks=4,grid=Array.from({length:ticks+1},(_,i)=>{const val=maxY*i/ticks,yy=y(val);return '<line x1="'+left+'" y1="'+yy+'" x2="'+(w-right)+'" y2="'+yy+'" stroke="var(--rule)"/><text x="'+(left-8)+'" y="'+(yy+4)+'" text-anchor="end" fill="var(--muted)" font-size="12">'+val.toFixed(0)+'</text>';}).join('');
        const marks=graph==='line'?'<polyline fill="none" stroke="var(--accent)" stroke-width="3" points="'+ready.map(r=>x(r.temp)+','+y(r.mean)).join(' ')+'"/>':ready.map(r=>'<rect x="'+(x(r.temp)-18)+'" y="'+y(r.mean)+'" width="36" height="'+(top+ih-y(r.mean))+'" rx="4" fill="var(--accent)"/>').join('');
        const dots=ready.map(r=>'<circle cx="'+x(r.temp)+'" cy="'+y(r.mean)+'" r="5" fill="var(--accent-ink)"><title>'+r.temp+'°C: '+r.mean.toFixed(1)+' seconds'+(mode==='own'?' from '+r.nums.length+' trial(s)':'')+'</title></circle><text x="'+x(r.temp)+'" y="'+(top+ih+23)+'" text-anchor="middle" fill="var(--ink)" font-size="12">'+r.temp+'°C</text>').join('');
        chart.innerHTML='<div class="sugar-svg-wrap"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+(graph==='line'?'Line':'Bar')+' graph of water temperature and sugar dissolving time"><text x="'+(w/2)+'" y="14" text-anchor="middle" fill="var(--ink)" font-size="14" font-weight="700">Water temperature and dissolving time</text>'+grid+marks+dots+'<text x="'+(left+iw/2)+'" y="'+(h-9)+'" text-anchor="middle" fill="var(--ink)" font-size="13">Water temperature (°C)</text><text transform="translate(16 '+(top+ih/2)+') rotate(-90)" text-anchor="middle" fill="var(--ink)" font-size="13">Dissolving time (s)</text></svg></div>';
      }
      feedback.textContent=graph==='line'?'A line graph fits these temperatures because temperature is a continuous scale.':'A bar graph can show the values, but a line graph better shows the trend across a continuous temperature scale.';
    }
    
    root.querySelector('.sugar-download').onclick=()=>{
      const rows=mode==='example'?temps.map((temp,i)=>({temp,nums:[example[i]],mean:example[i]})):values();
      const lines=['Mode,Water temperature (°C),Trial 1 time (s),Trial 2 time (s),Trial 3 time (s),Mean time (s)'];
      rows.forEach(r=>lines.push([mode==='example'?'Class example':'My results',r.temp,...[0,1,2].map(i=>r.rawTimes?.[i]??r.nums[i]??''),r.mean===null?'':r.mean.toFixed(1)].join(',')));
      lines.push('');lines.push('Conclusion');lines.push('"'+conclusion.value.replace(/"/g,'""').replace(/\r?\n/g,' ')+'"');
      const link=document.createElement('a'),url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'}));
      link.href=url;link.download='sugar-dissolving-investigation.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
    root.querySelector('.sugar-clear').onclick=()=>{if(!window.confirm('Clear your entered results and conclusion?'))return;window._sugarDraft={};conclusion.value='';mode='own';render();};
    render();
  }
  const sugarStyles=`<style>
    .sugar-lab .sugar-notice{margin:12px 0;padding:11px 13px;border-radius:10px;background:var(--soft);color:var(--ink)}
    .sugar-data input{width:95px;max-width:100%;min-height:40px;padding:6px 8px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink);font:inherit}
    .sugar-options{margin-top:16px}.sugar-options fieldset{display:flex;flex-wrap:wrap;gap:14px;border:1px solid var(--rule);border-radius:10px;padding:10px 14px}.sugar-options legend{font-weight:700;padding:0 5px}.sugar-options label{display:flex;gap:6px;align-items:center}
    .sugar-svg-wrap{max-width:100%;overflow-x:auto;margin:12px 0}.sugar-svg-wrap svg{width:100%;min-width:460px;height:auto;background:var(--paper);border:1px solid var(--rule);border-radius:10px}
    .sugar-conclusion-label{display:block;margin-top:16px;font-weight:700}.sugar-lab textarea{display:block;width:100%;margin-top:7px;padding:10px 12px;border:1px solid var(--rule);border-radius:10px;background:var(--paper);color:var(--ink);font:inherit;resize:vertical}
    .sugar-lab button:focus-visible,.sugar-lab input:focus-visible,.sugar-lab textarea:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 40%,transparent);outline-offset:2px}
    .sugar-lab .tablewrap{overflow:auto}.sugar-lab table{border-collapse:collapse;width:100%}.sugar-lab th,.sugar-lab td{padding:7px;border-bottom:1px solid var(--rule);text-align:left}
    @media(max-width:620px){.sugar-data input{width:72px}.sugar-options fieldset{display:grid;gap:8px}}
  </style>`;
  const sugarMount=root=>{sugarInvestigation(root);root.insertAdjacentHTML('afterbegin',sugarStyles);};
  H.lessonTools=Object.assign(H.lessonTools||{}, {'skills/fair':fairTestStudio,'skills/mini':sugarMount});
})();
