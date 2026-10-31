/* Grade 8 Cells · Plant conditions model investigation. Results are session-only. */
(() => {
  'use strict';
  const H = window.HUB;
  if (!H) return;

  const style = `<style>
  .ccm{margin:18px 0;padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);color:var(--ink)}
  .ccm h3,.ccm h4{margin:0 0 7px}.ccm p{color:var(--muted)}
  .ccm-note{padding:12px 14px;border-radius:10px;background:var(--soft);color:var(--ink)!important}
  .ccm-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(240px,.85fr);gap:16px;align-items:start}
  .ccm-controls{display:grid;gap:14px}.ccm-control label{display:flex;justify-content:space-between;gap:10px;font-weight:700}
  .ccm-control input{width:100%;accent-color:var(--accent)}.ccm-control output{font-variant-numeric:tabular-nums}
  .ccm-meter{height:14px;background:var(--soft);border-radius:99px;overflow:hidden;margin:12px 0}
  .ccm-meter span{display:block;height:100%;width:0;background:var(--accent);transition:width .2s ease}
  .ccm-result{padding:12px 14px;background:var(--soft);border-radius:10px;margin:12px 0;color:var(--ink)!important}
  .ccm-diagram{border:1px solid var(--rule);border-radius:12px;padding:14px;text-align:center}
  .ccm-cell{margin:12px auto;max-width:260px;padding:20px 12px;border-radius:50%;background:#e7f2d9;border:3px solid #76965a}
  .ccm-chloro{margin:auto;padding:12px 8px;width:112px;border-radius:50%;background:#c6e4a3;border:2px solid #5c8b43;font-weight:700}
  .ccm-equation{font-size:14px;font-weight:700;line-height:1.7}
  .ccm-table-wrap{overflow-x:auto;margin:12px 0}.ccm table{border-collapse:collapse;width:100%;min-width:520px}
  .ccm th,.ccm td{padding:8px;border-bottom:1px solid var(--rule);text-align:left}
  .ccm th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
  .ccm-button{min-height:40px;padding:8px 14px;border:0;border-radius:var(--btn-radius);background:var(--btn);color:var(--on-btn);font:inherit;font-weight:700;cursor:pointer}
  .ccm-button.secondary{background:var(--soft);color:var(--ink);border:1px solid var(--rule)}
  .ccm-reflection{display:grid;gap:8px;margin-top:18px}
  .ccm-reflection label{font-weight:700}.ccm-reflection textarea{width:100%;min-height:76px;padding:10px;border:1px solid var(--rule);border-radius:9px;background:var(--paper);color:var(--ink);font:inherit}
  .ccm button:focus-visible,.ccm input:focus-visible,.ccm textarea:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 40%,transparent);outline-offset:2px}
  @media(max-width:700px){.ccm-grid{grid-template-columns:1fr}}
  </style>`;

  function render(root) {
    root.innerHTML = style + `
      <section class="ccm" aria-label="Plant cell conditions investigation">
        <div class="eyebrow">Interactive model · SCI.8.E.19</div>
        <h3>Plant Cell Conditions: Find the Limiting Resource</h3>
        <p>Plants need light, water and carbon dioxide for photosynthesis. Change one condition at a time, then use the model's output as evidence.</p>
        <p class="ccm-note"><strong>Model rule:</strong> the scarcest resource limits the model's relative photosynthesis rate. The percentages are made-up model values, not real measurements of a plant.</p>
        <div class="ccm-grid">
          <div>
            <div class="ccm-controls">
              <div class="ccm-control"><label for="ccm-light">Light available <output id="ccm-light-out">80%</output></label><input id="ccm-light" type="range" min="0" max="100" value="80"></div>
              <div class="ccm-control"><label for="ccm-water">Water available <output id="ccm-water-out">80%</output></label><input id="ccm-water" type="range" min="0" max="100" value="80"></div>
              <div class="ccm-control"><label for="ccm-co2">Carbon dioxide available <output id="ccm-co2-out">80%</output></label><input id="ccm-co2" type="range" min="0" max="100" value="80"></div>
            </div>
            <div class="ccm-meter" role="img" aria-label="Relative photosynthesis rate"><span id="ccm-meter-fill"></span></div>
            <p class="ccm-result" id="ccm-result" role="status" aria-live="polite">Relative rate: 80%. All three resources are set equally.</p>
          </div>
          <div class="ccm-diagram">
            <strong>Inside a plant cell</strong>
            <div class="ccm-cell"><div class="ccm-chloro">Chloroplast</div></div>
            <div class="ccm-equation">light + water + carbon dioxide<br>↓ photosynthesis ↓<br>sugar + oxygen</div>
          </div>
        </div>
        <h4>Record your investigation</h4>
        <p>Start with all three resources high. Predict which one will limit the model, then lower only that slider and record the result. Restore the setting before testing another condition.</p>
        <button class="ccm-button" id="ccm-record" type="button">Record this trial</button>
        <button class="ccm-button secondary" id="ccm-reset" type="button">Clear trials</button>
        <div class="ccm-table-wrap"><table><thead><tr><th>Trial</th><th>Light</th><th>Water</th><th>CO₂</th><th>Model rate</th><th>Limiting resource</th></tr></thead><tbody id="ccm-trials"><tr><td colspan="6">No trials recorded yet.</td></tr></tbody></table></div>
        <div class="ccm-reflection">
          <label for="ccm-claim">Conclusion: What does your evidence suggest about the condition you changed?</label>
          <textarea id="ccm-claim" placeholder="Use one recorded trial as evidence."></textarea>
          <label for="ccm-limit">Model check: What does this simplified model leave out?</label>
          <textarea id="ccm-limit" placeholder="Think about real plants, changing conditions or how measurements would be collected."></textarea>
        </div>
        <p class="ccm-note">Your trials and notes stay in this browser tab. Copy your conclusion into your class notes before leaving.</p>
      </section>`;

    const $ = s => root.querySelector(s);
    const sliders = {light:$('#ccm-light'), water:$('#ccm-water'), co2:$('#ccm-co2')};
    const titles = {light:'Light', water:'Water', co2:'Carbon dioxide'};
    const table = $('#ccm-trials');
    let trials = [];

    function values() {
      return Object.fromEntries(Object.entries(sliders).map(([key,el])=>[key,Number(el.value)]));
    }
    function update() {
      const v=values(), rate=Math.min(v.light,v.water,v.co2);
      Object.entries(v).forEach(([key,value])=>$('#ccm-'+key+'-out').textContent=value+'%');
      $('#ccm-meter-fill').style.width=rate+'%';
      const low=Object.keys(v).filter(key=>v[key]===rate).map(key=>titles[key]);
      $('#ccm-result').textContent='Relative rate: '+rate+'%. '+(rate===100?'All three resources are plentiful in this model.':low.join(' and ')+' '+(low.length===1?'is':'are')+' limiting the model right now.');
      return {v,rate,low};
    }
    function drawTrials() {
      table.innerHTML=trials.length?trials.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+t.v.light+'%</td><td>'+t.v.water+'%</td><td>'+t.v.co2+'%</td><td>'+t.rate+'%</td><td>'+t.limiting+'</td></tr>').join('':'<tr><td colspan="6">No trials recorded yet.</td></tr>';
    }
    Object.values(sliders).forEach(el=>el.addEventListener('input',update));
    $('#ccm-record').addEventListener('click',()=>{const result=update();trials.push({v:result.v,rate:result.rate,limiting:result.low.join(', ')});drawTrials();});
    $('#ccm-reset').addEventListener('click',()=>{trials=[];drawTrials();});
    update();
  }

  H.lessonTools=H.lessonTools||{};
  const existing=H.lessonTools['cells/plant'];
  H.lessonTools['cells/plant']=function(root){
    if(existing){const prior=document.createElement('div');root.appendChild(prior);existing(prior);}
    const tool=document.createElement('div');root.appendChild(tool);render(tool);
  };
})();