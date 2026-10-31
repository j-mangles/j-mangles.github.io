/* Grade 8 Matter · Density Lab Companion. Calculations stay in this browser tab. */
(() => {
  'use strict';
  const H=window.HUB;if(!H)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const objects=[
    {id:'wood',name:'Wood block',method:'ruler'},
    {id:'eraser',name:'Rubber eraser',method:'ruler'},
    {id:'rock',name:'Rock',method:'displacement'},
    {id:'bolt',name:'Steel bolt',method:'displacement'},
    {id:'clay',name:'Clay ball',method:'displacement'}
  ];
  const style=`<style>
  .dlc{padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius)}
  .dlc h3{margin:0 0 6px}.dlc p{color:var(--muted)}.dlc-safety{padding:12px 14px;border-radius:10px;background:var(--soft);color:var(--ink)!important}.dlc-form{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:14px 0}.dlc-field label{display:block;font-size:13px;font-weight:700;margin-bottom:5px}.dlc-field input,.dlc-field select{width:100%;min-height:42px;padding:8px 10px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);color:var(--ink);font:inherit}.dlc-button{min-height:42px;padding:0 16px;border:0;border-radius:var(--btn-radius);background:var(--btn);color:var(--on-btn);font:inherit;font-weight:700;cursor:pointer}.dlc-button:disabled{opacity:.5;cursor:not-allowed}.dlc-result{padding:12px 14px;background:var(--soft);border-radius:10px;margin:12px 0;color:var(--ink)!important}.dlc-error{color:var(--bad)!important}.dlc-table-wrap{overflow-x:auto;margin-top:14px}.dlc-table{width:100%;border-collapse:collapse;min-width:650px}.dlc-table th,.dlc-table td{padding:9px 10px;border-bottom:1px solid var(--rule);text-align:left}.dlc-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}.dlc-table select{padding:6px 8px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink);font:inherit}.dlc-half{margin-top:22px;padding-top:18px;border-top:1px solid var(--rule)}.dlc-half[hidden]{display:none}.dlc-half-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.dlc-foot{font-size:13px}.dlc button:focus-visible,.dlc input:focus-visible,.dlc select:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 40%,transparent);outline-offset:2px}@media(max-width:680px){.dlc-form{grid-template-columns:repeat(2,minmax(0,1fr))}.dlc-half-grid{grid-template-columns:1fr}}
  </style>`;
  function densityLabCompanion(root){
    const records=new Map();let lastCalculation=null;
    root.innerHTML=style+`<section class="dlc" aria-label="Density Lab Companion"><div class="eyebrow">Interactive lab companion</div><h3>Record, calculate, compare</h3><p>Enter your group's real measurements from the Density Lab. The tool calculates volume and density, then helps you compare your prediction with the water test.</p>
      <p class="dlc-safety"><strong>Lab reminders:</strong> weigh objects while dry and keep water away from the scale. For displacement, start at 50 mL, read the cylinder at eye level, and slide objects in gently.</p>
      <div class="dlc-form"><div class="dlc-field"><label for="dlc-object">Object</label><select id="dlc-object">${objects.map(o=>`<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></div><div class="dlc-field"><label for="dlc-mass">Mass (g)</label><input id="dlc-mass" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 24.6"></div><div class="dlc-field dlc-dim" data-dim="length"><label for="dlc-length">Length (cm)</label><input id="dlc-length" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 4.0"></div><div class="dlc-field dlc-dim" data-dim="width"><label for="dlc-width">Width (cm)</label><input id="dlc-width" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 2.5"></div><div class="dlc-field dlc-dim" data-dim="height"><label for="dlc-height">Height (cm)</label><input id="dlc-height" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 1.2"></div><div class="dlc-field dlc-displacement" data-displacement="start" hidden><label for="dlc-start">Starting water (mL)</label><input id="dlc-start" type="number" min="0" step="any" inputmode="decimal" value="50"></div><div class="dlc-field dlc-displacement" data-displacement="end" hidden><label for="dlc-end">Final water level (mL)</label><input id="dlc-end" type="number" min="0" step="any" inputmode="decimal" placeholder="e.g. 58"></div></div>
      <button class="dlc-button" id="dlc-calculate" type="button">Calculate and add result</button><p class="dlc-result" id="dlc-feedback" role="status" aria-live="polite">Volume is length × width × height for box-shaped objects, or final water level − starting water level for displacement.</p>
      <h4>Your group's data</h4><p class="dlc-foot">Compare density with water at 1.00 g/cm³. A lower density usually predicts floating; a higher density predicts sinking. Record the result of your actual tub test in the last column.</p>
      <div class="dlc-table-wrap"><table class="dlc-table"><thead><tr><th>Object</th><th>Mass (g)</th><th>Volume (cm³)</th><th>Density (g/cm³)</th><th>Prediction</th><th>Water test</th></tr></thead><tbody id="dlc-rows"></tbody></table></div>
      <section class="dlc-half" id="dlc-half" hidden><h4>Part E · Half the clay</h4><p>Measure one half of the clay ball. Its mass and volume should both decrease, while its density should stay close to the whole ball's density.</p><div class="dlc-half-grid"><div class="dlc-field"><label for="dlc-half-mass">Half-clay mass (g)</label><input id="dlc-half-mass" type="number" min="0.01" step="any" inputmode="decimal" placeholder="Measure the half"></div><div class="dlc-field"><label for="dlc-half-volume">Half-clay volume (cm³)</label><input id="dlc-half-volume" type="number" min="0.01" step="any" inputmode="decimal" placeholder="Measure the half"></div><div><button class="dlc-button" id="dlc-half-calc" type="button">Compare clay density</button></div></div><p class="dlc-result" id="dlc-half-result" role="status" aria-live="polite">The density may differ slightly because of measurement and rounding error.</p></section>
    </section>`;
    const $=s=>root.querySelector(s),objectSelect=$('#dlc-object'),feedback=$('#dlc-feedback');
    function updateMethod(){const ruler=objectSelect.selectedOptions[0].value==='wood'||objectSelect.selectedOptions[0].value==='eraser';root.querySelectorAll('.dlc-dim').forEach(x=>x.hidden=!ruler);root.querySelectorAll('.dlc-displacement').forEach(x=>x.hidden=ruler);}
    function renderRows(){
      $('#dlc-rows').innerHTML=objects.map(o=>{const r=records.get(o.id);return `<tr><th scope="row">${esc(o.name)}</th><td>${r?esc(r.mass.toFixed(2)):'—'}</td><td>${r?esc(r.volume.toFixed(2)):'—'}</td><td>${r?esc(r.density.toFixed(2)):'—'}</td><td>${r?esc(r.prediction):'—'}</td><td>${r?`<select aria-label="Water test for ${esc(o.name)}" data-observed="${o.id}"><option value="">Choose…</option><option value="Floated" ${r.observed==='Floated'?'selected':''}>Floated</option><option value="Sank" ${r.observed==='Sank'?'selected':''}>Sank</option></select>`:'—'}</td></tr>`;}).join('');
      $('#dlc-rows').querySelectorAll('[data-observed]').forEach(sel=>sel.addEventListener('change',()=>{const r=records.get(sel.dataset.observed);if(r){r.observed=sel.value;updateObservedFeedback(sel.dataset.observed);}}));
      $('#dlc-half').hidden=!records.has('clay');
    }
    function updateObservedFeedback(id){const r=records.get(id);if(!r||!r.observed)return;const agrees=(r.prediction==='Floats'&&r.observed==='Floated')||(r.prediction==='Sinks'&&r.observed==='Sank');feedback.textContent=agrees?'Your density prediction matches the water test.':'The measured result differs from the prediction. Check the measurements, then consider trapped air, object shape, and reading error.';feedback.className='dlc-result'+(agrees?'':' dlc-error');}
    function calculate(){
      const o=objects.find(x=>x.id===objectSelect.value),mass=Number($('#dlc-mass').value);let volume;
      if(!Number.isFinite(mass)||mass<=0){feedback.textContent='Enter a positive mass in grams.';feedback.className='dlc-result dlc-error';return;}
      if(o.method==='ruler'){
        const dims=['length','width','height'].map(k=>Number($(`#dlc-${k}`).value));
        if(dims.some(x=>!Number.isFinite(x)||x<=0)){feedback.textContent='Enter positive length, width, and height measurements in centimetres.';feedback.className='dlc-result dlc-error';return;}
        volume=dims.reduce((a,b)=>a*b,1);
      }else{
        const start=Number($('#dlc-start').value),end=Number($('#dlc-end').value);
        if(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<=start){feedback.textContent='Enter a final water level greater than the starting level.';feedback.className='dlc-result dlc-error';return;}
        volume=end-start;
      }
      const density=mass/volume,prediction=density<1?'Floats':density>1?'Sinks':'May remain suspended';
      const prior=records.get(o.id);records.set(o.id,{mass,volume,density,prediction,observed:prior?.observed||''});lastCalculation={density};
      feedback.textContent=`${o.name}: volume ${volume.toFixed(2)} cm³; density ${density.toFixed(2)} g/cm³. Compared with water at 1.00 g/cm³, this predicts ${prediction.toLowerCase()}.`;feedback.className='dlc-result';renderRows();
    }
    function compareClay(){
      const whole=records.get('clay'),mass=Number($('#dlc-half-mass').value),volume=Number($('#dlc-half-volume').value),out=$('#dlc-half-result');
      if(!whole){out.textContent='First measure and calculate the whole clay ball.';return;}
      if(!Number.isFinite(mass)||mass<=0||!Number.isFinite(volume)||volume<=0){out.textContent='Enter positive mass and volume measurements for half the clay.';return;}
      const halfDensity=mass/volume,diff=Math.abs(halfDensity-whole.density);
      out.textContent=`Whole clay: ${whole.density.toFixed(2)} g/cm³. Half clay: ${halfDensity.toFixed(2)} g/cm³. ${diff<=.15?'The values are close: changing the sample size did not meaningfully change its density.':'The values differ. Check the mass, volume, and water-level readings; measurement error can change the calculated density.'}`;
    }
    objectSelect.addEventListener('change',updateMethod);$('#dlc-calculate').addEventListener('click',calculate);$('#dlc-half-calc').addEventListener('click',compareClay);updateMethod();renderRows();
  }
  H.lessonTools=H.lessonTools||{};
  const displacementDiagram=H.lessonTools['matter/lab'];
  H.lessonTools['matter/lab']=function(root){
    if(displacementDiagram){
      const diagram=document.createElement('div');
      diagram.className='density-lab-existing-diagram';
      root.appendChild(diagram);
      displacementDiagram(diagram);
    }
    const companion=document.createElement('div');
    root.appendChild(companion);
    densityLabCompanion(companion);
  };
})();
