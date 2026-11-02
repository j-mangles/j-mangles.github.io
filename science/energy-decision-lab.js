/* Grade 8 Energy & Light · student-built energy trade-off comparison. */
(() => {
  'use strict';
  const H=window.HUB;if(!H)return;
  const sources=[["fossil","Fossil fuels"],["nuclear","Nuclear"],["hydro","Hydroelectric"],["wind","Wind"],["solar","Solar"]];
  const criteria=[
    {id:"reliability",name:"Reliability",scale:"1 = less reliable · 5 = more reliable"},
    {id:"cost",name:"Affordability",scale:"1 = more costly · 5 = more affordable"},
    {id:"local",name:"Local land and water impact",scale:"1 = greater impact · 5 = lower impact"},
    {id:"emissions",name:"Operating emissions",scale:"1 = higher emissions · 5 = lower emissions"}
  ];
  const style=`<style>
  .etl{margin:18px 0;padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);color:var(--ink)}
  .etl h3,.etl h4{margin:0 0 8px}.etl p{color:var(--muted)}
  .etl-note{padding:12px 14px;background:var(--soft);border-radius:10px;color:var(--ink)!important}
  .etl-source-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0}
  .etl-field label{display:block;font-size:13px;font-weight:700;margin-bottom:5px}
  .etl-field select,.etl-field textarea,.etl-table input,.etl-table select{width:100%;min-height:40px;padding:8px 10px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink);font:inherit}
  .etl-table-wrap{overflow-x:auto;margin:14px 0}.etl-table{border-collapse:collapse;width:100%;min-width:760px}
  .etl-table th,.etl-table td{padding:8px;border-bottom:1px solid var(--rule);text-align:left;vertical-align:middle}
  .etl-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
  .etl-table td:first-child{font-weight:700}.etl-scale{display:block;font-size:12px;color:var(--muted);font-weight:400;margin-top:3px}
  .etl-button{min-height:42px;padding:8px 15px;border:0;border-radius:var(--btn-radius);background:var(--btn);color:var(--on-btn);font:inherit;font-weight:700;cursor:pointer}
  .etl-result{padding:13px 15px;border-radius:10px;background:var(--soft);margin:13px 0;color:var(--ink)!important}.etl-revisit{margin-top:18px;padding:14px;border:1px solid var(--rule);border-radius:10px}.etl-revisit textarea{display:block;width:100%;min-height:82px;padding:8px 10px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink);font:inherit}.etl-revisit label{display:block;font-weight:700;margin:10px 0 5px}
  .etl-result strong{font-size:1.05em}.etl-writing{display:grid;gap:8px;margin-top:18px}
  .etl-writing label{font-weight:700}.etl-writing textarea{min-height:85px}
  .etl button:focus-visible,.etl select:focus-visible,.etl input:focus-visible,.etl textarea:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 40%,transparent);outline-offset:2px}
  @media(max-width:680px){.etl-source-pair{grid-template-columns:1fr}}
  </style>`;

  function render(root){
    root.innerHTML=style+`
    <section class="etl" aria-label="Energy resource decision lab">
      
      <h3>Energy Resources: Make a Manitoba Recommendation</h3>
      <p>A fictional Manitoba community is comparing two electricity sources. Use evidence from booklet pages 4–5 and class materials to rate each option, then write a recommendation that explains a benefit and a trade-off.</p>
      <p class="etl-note"><strong>There is no preset winner.</strong> Your ratings and importance weights are your choices. Use evidence to explain them; a higher total only means an option better matches the priorities you selected.</p>
      <div class="etl-source-pair">
        <div class="etl-field"><label for="etl-source-a">Option A</label><select id="etl-source-a"></select></div>
        <div class="etl-field"><label for="etl-source-b">Option B</label><select id="etl-source-b"></select></div>
      </div>
      <h4>Choose priorities and rate the evidence</h4>
      <p>Set each priority weight: 1 = less important, 2 = important, 3 = most important. Rate the source from 1 to 5 using the scale shown. Avoid guessing: check the booklet or class slides first.</p>
      <div class="etl-table-wrap"><table class="etl-table">
        <thead><tr><th>Criterion</th><th>Priority weight</th><th id="etl-a-head">Option A rating</th><th id="etl-b-head">Option B rating</th></tr></thead>
        <tbody id="etl-rows"></tbody>
      </table></div>
      <button class="etl-button" id="etl-compare" type="button">Calculate initial comparison</button>
      <p class="etl-result" id="etl-result" role="status" aria-live="polite">Complete all four rows, then compare the weighted totals.</p>
      <section class="etl-revisit" aria-label="Reconsider the recommendation with new evidence">
        <h4>Reconsider with new evidence</h4>
        <p>After your first comparison, find another useful detail in the booklet or class slides—or reconsider which priority matters most. Do not invent data. Update the ratings above if the evidence warrants it; a rating can stay the same if you explain why.</p>
        <label for="etl-new-evidence">New evidence or priority to consider</label>
        <textarea id="etl-new-evidence" placeholder="A detail I had not considered is…"></textarea>
        <button class="etl-button" id="etl-reconsider" type="button">Re-evaluate after review</button>
        <p class="etl-result" id="etl-review-result" role="status" aria-live="polite">Save your initial comparison first.</p>
        <label for="etl-revision">Would you change your recommendation? Explain what changed or why it stayed the same.</label>
        <textarea id="etl-revision" placeholder="After considering the new evidence, I would…"></textarea>
      </section>
      <div class="etl-writing">
        <label for="etl-recommendation">Recommendation to the community council</label>
        <textarea id="etl-recommendation" placeholder="Which option would you recommend for this community, and which priority mattered most?"></textarea>
        <label for="etl-evidence">Evidence and trade-off</label>
        <textarea id="etl-evidence" placeholder="Use two details from the booklet or class materials. Include one benefit and one cost or limitation."></textarea>
      </div>
      <p class="etl-note">This is a classroom decision model, not a real energy forecast. Scores and notes stay in this browser tab; copy your recommendation into your class notes before leaving.</p>
    </section>`;
    const $=s=>root.querySelector(s);
    let initialComparison=null;
    const selectOptions=sources.map(s=>'<option value="'+s[0]+'">'+s[1]+'</option>').join('');
    $('#etl-source-a').innerHTML=selectOptions;
    $('#etl-source-b').innerHTML=selectOptions;
    $('#etl-source-b').value='wind';
    $('#etl-rows').innerHTML=criteria.map(c=>'<tr><td>'+c.name+'<span class="etl-scale">'+c.scale+'</span></td><td><select id="etl-weight-'+c.id+'" aria-label="'+c.name+' priority weight"><option value="1">1 · lower</option><option value="2" selected>2 · medium</option><option value="3">3 · highest</option></select></td><td><input id="etl-a-'+c.id+'" type="number" min="1" max="5" step="1" inputmode="numeric" aria-label="Option A '+c.name+' rating, 1 to 5" placeholder="1–5"></td><td><input id="etl-b-'+c.id+'" type="number" min="1" max="5" step="1" inputmode="numeric" aria-label="Option B '+c.name+' rating, 1 to 5" placeholder="1–5"></td></tr>').join('');
    function sourceName(id){return sources.find(s=>s[0]===id)?.[1]||id;}
    function updateLabels(){
      $('#etl-a-head').textContent=sourceName($('#etl-source-a').value)+' rating';
      $('#etl-b-head').textContent=sourceName($('#etl-source-b').value)+' rating';
      criteria.forEach(c=>{
        $('#etl-a-'+c.id).setAttribute('aria-label',sourceName($('#etl-source-a').value)+' '+c.name+' rating, 1 to 5');
        $('#etl-b-'+c.id).setAttribute('aria-label',sourceName($('#etl-source-b').value)+' '+c.name+' rating, 1 to 5');
      });
    }
    function sourceChanged(prefix){initialComparison=null;criteria.forEach(c=>$('#etl-'+prefix+'-'+c.id).value='');updateLabels();$('#etl-result').textContent='Source changed. Re-rate that option using evidence before comparing.';$('#etl-review-result').textContent='Choose sources and save a new initial comparison first.';}
    $('#etl-source-a').addEventListener('change',()=>sourceChanged('a'));
    $('#etl-source-b').addEventListener('change',()=>sourceChanged('b'));
    $('#etl-compare').addEventListener('click',()=>{
      const a=$('#etl-source-a').value,b=$('#etl-source-b').value,out=$('#etl-result');
      if(a===b){out.textContent='Choose two different energy sources to compare.';return;}
      let totalA=0,totalB=0;
      for(const c of criteria){
        const weight=Number($('#etl-weight-'+c.id).value),ratingA=Number($('#etl-a-'+c.id).value),ratingB=Number($('#etl-b-'+c.id).value);
        if(!Number.isInteger(ratingA)||ratingA<1||ratingA>5||!Number.isInteger(ratingB)||ratingB<1||ratingB>5){
          out.textContent='Enter a 1–5 evidence-based rating for both options in all four rows.';return;
        }
        totalA+=weight*ratingA;totalB+=weight*ratingB;
      }
      const result=totalA===totalB?'The weighted totals are tied.':totalA>totalB?sourceName(a)+' has the higher weighted total.':sourceName(b)+' has the higher weighted total.';
      initialComparison={a,b,totalA,totalB};
      $('#etl-review-result').textContent='Initial comparison saved. Add new evidence, then revise the ratings if it changes your judgement.';
      out.innerHTML='<strong>'+result+'</strong><br>'+sourceName(a)+': '+totalA+' points · '+sourceName(b)+': '+totalB+' points. Explain the evidence behind your ratings and identify at least one trade-off.';
    });
    $('#etl-reconsider').addEventListener('click',()=>{
      const out=$('#etl-review-result'),evidence=$('#etl-new-evidence').value.trim();
      if(!initialComparison){out.textContent='Calculate the initial comparison first.';return;}
      if(!evidence||evidence.length<12){out.textContent='Add a specific detail from your class materials or explain which priority you are reconsidering.';return;}
      if($('#etl-source-a').value!==initialComparison.a||$('#etl-source-b').value!==initialComparison.b){initialComparison=null;out.textContent='The options changed. Calculate a new initial comparison first.';return;}
      let totalA=0,totalB=0;
      for(const c of criteria){
        const weight=Number($('#etl-weight-'+c.id).value),ratingA=Number($('#etl-a-'+c.id).value),ratingB=Number($('#etl-b-'+c.id).value);
        if(!Number.isInteger(ratingA)||ratingA<1||ratingA>5||!Number.isInteger(ratingB)||ratingB<1||ratingB>5){out.textContent='Enter a 1–5 evidence-based rating for both options in all four rows before re-evaluating.';return;}
        totalA+=weight*ratingA;totalB+=weight*ratingB;
      }
      const winner=(a,b)=>a===b?'a tie':a>b?sourceName(initialComparison.a):sourceName(initialComparison.b);
      const before=winner(initialComparison.totalA,initialComparison.totalB),after=winner(totalA,totalB);
      const movement=before===after?'Your weighted result stayed with '+after+'.':'Your weighted result shifted from '+before+' to '+after+'.';
      out.innerHTML='<strong>Initial:</strong> '+sourceName(initialComparison.a)+' '+initialComparison.totalA+' · '+sourceName(initialComparison.b)+' '+initialComparison.totalB+' points.<br><strong>After review:</strong> '+sourceName(initialComparison.a)+' '+totalA+' · '+sourceName(initialComparison.b)+' '+totalB+' points.<br>'+movement+' Explain how the new evidence affected your ratings—or why it did not change them.';
    });
    updateLabels();
  }

  H.lessonTools=H.lessonTools||{};
  const prior=H.lessonTools['light/u3t1-resources'];
  H.lessonTools['light/u3t1-resources']=function(root){
    if(prior){const wrap=document.createElement('div');root.appendChild(wrap);prior(wrap);}
    const tool=document.createElement('div');root.appendChild(tool);render(tool);
  };
})();