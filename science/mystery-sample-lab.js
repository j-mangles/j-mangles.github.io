(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const materials = {metal: {name: 'Aluminium', density: 2.7}, plastic: {name: 'Dense plastic', density: 1.2}};
  function specimen(start, volume, material) {
    const density = materials[material].density;
    return {start, end: start + volume, volume, density, material, mass: Number((volume * density).toFixed(2))};
  }
  const samples = {A: specimen(35, 20, 'metal'), B: specimen(20, 45, 'plastic')};
  const records = Object.fromEntries(Object.keys(samples).map(id => [id, {
    tools: new Set(), volume: '', density: '', material: '', solved: false, feedback: '', observation: ''
  }]));
  const tickets = [specimen(34, 14, 'metal'), specimen(24, 28, 'plastic'), specimen(31, 16, 'plastic'), specimen(26, 18, 'metal')];
  const questions = [
    {claim: '“The balance reads 54 g and the final water level is 55 mL. I divided 54 by 55.”',
      context: 'The cylinder started at 35 mL.',
      replies: ['Use 35 mL because it was the first reading.', 'Use the 20 mL rise because only that water was displaced.', 'Average the two water levels before dividing.'], answer: 1,
      hint: 'Imagine starting over with more water in the cylinder. Which measurement would stay the same for this solid?',
      why: '55 − 35 = 20 mL displaced. The density is 54 ÷ 20 = 2.7 g/cm³.'},
    {claim: '“Both samples sank in fresh water. That proves both are aluminium.”',
      context: 'The possible materials have densities of 1.2 and 2.7 g/cm³. Fresh water is about 1.0 g/cm³.',
      replies: ['The heavier object always sinks first.', 'A second water test will tell us the material.', 'Either material can sink. Measure mass and displaced volume to distinguish them.'], answer: 2,
      hint: 'Compare each reference density with the density of fresh water.',
      why: 'Both reference densities exceed that of fresh water. Sinking alone cannot distinguish them.'},
    {claim: '“Both samples have a mass of 54 g, so their densities must match.”',
      context: 'One displaces 20 mL. The other displaces 45 mL.',
      replies: ['The same mass occupies different volumes. The 20 cm³ sample is denser.', 'The 45 cm³ sample is denser because it takes up more space.', 'Equal masses always give equal densities.'], answer: 0,
      hint: 'Imagine packing the same mass into two containers. Which has more mass in each cubic centimetre?',
      why: '54 ÷ 20 = 2.7 g/cm³, while 54 ÷ 45 = 1.2 g/cm³.'}
  ];
  const roundResults = [];
  let current = 'A', round = 0, ticket = 0, marked = null;
  function addButton(parent, label, action) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = label; b.addEventListener('click', action); parent.append(b);
    return b;
  }
  function showMode() {
    const mode = ['bench', 'partners', 'ticket'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'bench';
    document.querySelectorAll('.mode').forEach(section => { section.hidden = section.id !== mode; });
    document.querySelectorAll('.modes a').forEach(a => {
      if (a.hash === '#' + mode) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  function cylinder(x, reading, solidVolume, title) {
    const bottom = 183, top = 27, y = bottom - 1.85 * reading;
    const ticks = [];
    for (let n = 0; n <= 80; n += 5) {
      const at = bottom - 1.85 * n;
      ticks.push(`<path class="ticks" d="M52 ${at}h-${n % 10 ? 7 : 12}"/>`);
      if (n % 20 === 0) ticks.push(`<text x="57" y="${at + 4}" font-size="11">${n}</text>`);
    }
    const fluid = reading ? `<path class="water" d="M5 ${y - 2} Q28 ${y + 2} 51 ${y - 2}V${bottom}H5Z"/>` : '';
    const height = solidVolume * 1.85 * (23 / 20) ** 2;
    const solid = reading && solidVolume ? `<rect class="sample-piece" x="8" y="${bottom - height}" width="40" height="${height}" rx="2"/>` : '';
    return `<g transform="translate(${x} 0)">${fluid}${solid}<path class="glass" d="M4 ${top}V${bottom + 1}H52V${top}M0 189h56"/>${ticks.join('')}<text x="28" y="210" text-anchor="middle" font-size="14">${title}</text></g>`;
  }
  function instruments(sample, tools) {
    const weighed = tools.has('balance'), measured = tools.has('cylinder');
    const description = [
      weighed ? `Dry mass ${sample.mass} grams.` : 'Balance ready.',
      measured ? `Water before ${sample.start} millilitres. Water after ${sample.end} millilitres.` : 'Cylinders ready.'
    ].join(' ');
    const height = sample.volume * .72;
    const balancePiece = weighed ? `<rect class="sample-piece" x="34" y="${125 - height}" width="28" height="${height}" rx="2"/>` : '';
    $('instruments').innerHTML = `<svg viewBox="0 0 347 224" role="img" aria-label="${description}">
      <text x="48" y="32" text-anchor="middle" font-size="14">Balance</text>
      ${balancePiece}<path class="glass" d="M13 126h74m-39 1v12m-28 0h56l12 40H8Z"/>
      <rect x="18" y="147" width="60" height="24" rx="2" fill="var(--paper)" stroke="var(--muted)"/>
      <text x="48" y="164" text-anchor="middle" font-size="15" font-weight="700">${weighed ? sample.mass + ' g' : '—'}</text>
      <text x="48" y="210" text-anchor="middle" font-size="14">Dry mass</text>
      <text x="212" y="18" text-anchor="middle" font-size="13">Water level (mL)</text>
      ${cylinder(117, measured ? sample.start : 0, 0, 'Before')}${cylinder(228, measured ? sample.end : 0, sample.volume, 'After')}</svg>`;
  }
  const projector=$('project-samples');
  function projectSamples(){
    let selected=current;
    window.ClassroomReveal.open({
      trigger:projector,title:'How much water moved?',prompt:'Read both cylinders. Predict the volume of the solid before you reveal the rise.',
      steps:1,nextLabel:'Reveal the rise',
      setup(settings,reset){
        const label=document.createElement('label');label.textContent='Sample ';
        const select=$('sample').cloneNode(true);select.removeAttribute('id');select.value=selected;
        select.onchange=()=>{selected=select.value;reset();};
        label.append(select);settings.append(label);
      },
      draw(stage,step){
        const s=samples[selected],y1=183-1.85*s.start,y2=183-1.85*s.end;
        const rise=step?`<g class="rise"><path d="M79 ${y1}H183M181 ${y2}h28" stroke-dasharray="3 3"/><path d="M185 ${y2}v${y1-y2}m-4 0h8m-8 ${y2-y1}h8"/></g><text class="rise-label" x="179" y="${(y1+y2)/2+4}" text-anchor="end" font-size="13">${s.volume} mL</text>`:'';
        stage.innerHTML=`<svg class="reveal-cylinders" viewBox="0 0 296 217" role="img" aria-label="Sample ${selected}. Before ${s.start} millilitres. After ${s.end} millilitres.${step?' The rise is '+s.volume+' millilitres.':''}"><text x="148" y="16" text-anchor="middle" font-size="13">Water level (mL)</text>${cylinder(24,s.start,0,'Before')}${cylinder(203,s.end,s.volume,'After')}${rise}</svg>`;
        return step?`${s.end} mL − ${s.start} mL = ${s.volume} mL. The solid occupies ${s.volume} cm³.`:'';
      }
    });
  }
  projector.onclick=projectSamples;
  const labForm = $('identify');
  function readForm(form) {
    return Object.fromEntries(['volume', 'density', 'material'].map(key => [key, form.elements[key].value]));
  }
  function checkAnswers(values, sample) {
    return {
      volume: Number(values.volume) === sample.volume,
      density: Math.abs(Number(values.density) - sample.density) < 0.005,
      material: values.material === sample.material
    };
  }
  function errorHint(values, sample, checks) {
    if (Number(values.volume) === sample.end || Math.abs(Number(values.density) - sample.mass / sample.end) < .012) {
      return `The final reading includes the starting water. Find how far the level rose from ${sample.start} to ${sample.end} mL, then divide the mass by that rise.`;
    }
    if (!checks.volume) return 'Read the bottom of the water curve in each cylinder. Subtract the starting level from the final level. Each mL displaced equals 1 cm³.';
    if (!checks.density) return 'Your displaced volume is correct. Divide the dry mass in grams by that volume in cm³.';
    return 'Your calculations match the readings. Compare your density with the two material references.';
  }
  function drawBench() {
    const r = records[current], sample = samples[current];
    $('sample').value = current;
    $('progress').textContent = Object.values(records).filter(row => row.solved).length + ' of 2 identified';
    $('test-tools').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(r.tools.has(b.dataset.tool))));
    instruments(sample, r.tools);
    $('observation').textContent = r.observation;
    $('lab-response').textContent = r.feedback;
    for (const key of ['volume', 'density', 'material']) labForm.elements[key].value = r[key];
    for (const control of labForm.elements) control.disabled = r.solved;
    const next = $('next-sample'); next.replaceChildren();
    if (r.solved && Object.values(records).some(row => !row.solved)) addButton(next, 'Investigate the other sample', () => {
      current = current === 'A' ? 'B' : 'A'; drawBench(); $('sample').focus();
    });
    else if (r.solved) addButton(next, 'Start partner challenge', () => { location.hash = 'partners'; });
  }
  $('sample').onchange = event => { current = event.target.value; drawBench(); };
  $('test-tools').onclick = event => {
    const tool = event.target.dataset.tool;
    if (!tool) return;
    const r = records[current];
    r.tools.add(tool);
    r.observation = {float: `Sample ${current} sinks in fresh water. Could either reference material do that?`,
      balance: 'The balance is tared. Read the dry mass on the display.',
      cylinder: 'The solid is fully submerged. Read the bottom of each water curve. Small ticks are 5 mL apart.'}[tool];
    drawBench();
  };
  labForm.oninput = () => {
    Object.assign(records[current], readForm(labForm), {feedback: ''});
    $('lab-response').textContent = '';
  };
  labForm.onsubmit = event => {
    event.preventDefault();
    const r = records[current], s = samples[current];
    if (r.solved) return;
    Object.assign(r, readForm(labForm));
    if (!r.tools.has('balance') || !r.tools.has('cylinder')) r.feedback = 'Collect a dry mass and both water levels before you identify the sample.';
    else if ([r.volume, r.density, r.material].includes('')) r.feedback = 'Enter your displaced volume, density and material.';
    else {
      const checks = checkAnswers(r, s);
      r.solved = Object.values(checks).every(Boolean);
      r.feedback = r.solved ? `Sample ${current} is ${materials[s.material].name.toLowerCase()}. The water rises ${s.end} − ${s.start} = ${s.volume} mL. That gives a volume of ${s.volume} cm³, so ${s.mass} ÷ ${s.volume} = ${s.density} g/cm³.` : errorHint(r, s, checks);
    }
    drawBench();
  };
  function drawRound() {
    const area = $('partner-round'), next = $('partner-next');
    area.replaceChildren(); next.replaceChildren(); $('partner-feedback').textContent = '';
    const points = roundResults.filter(r => r.firstCorrect).length;
    if (round === questions.length) {
      area.innerHTML = `<h3>Partner result</h3><p>${points} of ${questions.length} first choices correct. Take the individual ticket with fresh readings.</p>`;
      addButton(next, 'Open individual exit ticket', () => { location.hash = 'ticket'; });
      return;
    }
    const q = questions[round], state = roundResults[round] || (roundResults[round] = {attempts: 0, solved: false});
    area.innerHTML = `<h3>Round ${round + 1} of ${questions.length}</h3><p>${q.context}</p><blockquote>${q.claim}</blockquote>`;
    q.replies.forEach((reply, index) => {
      const b = addButton(area, reply, () => {
        if (state.solved) return;
        if (state.attempts === 0) state.firstCorrect = index === q.answer;
        state.attempts++;
        state.solved = index === q.answer;
        if (state.solved) drawRound();
        else $('partner-feedback').textContent = q.hint + ' Discuss and try again.';
      });
      b.disabled = state.solved;
    });
    if (state.solved) {
      $('partner-feedback').textContent = q.why + (state.firstCorrect ? ' One point.' : ' Correct on a retry.');
      addButton(next, round === questions.length - 1 ? 'See partner result' : 'Next round', () => { round++; drawRound(); });
    }
  }
  const exitForm = $('exit-form');
  function drawTicket() {
    const s = tickets[ticket];
    $('ticket-readings').innerHTML = [['Dry mass', s.mass + ' g'], ['Water before', s.start + ' mL'], ['Water after', s.end + ' mL']]
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
    exitForm.reset();
    for (const control of exitForm.elements) control.disabled = false;
    $('ticket-result').textContent = ''; $('ticket-actions').hidden = true;
  }
  exitForm.onsubmit = event => {
    event.preventDefault();
    if (marked) return;
    const v = readForm(exitForm), s = tickets[ticket];
    if (Object.values(v).includes('')) { $('ticket-result').textContent = 'Complete all three parts before submitting.'; return; }
    const checks = checkAnswers(v, s), score = Object.values(checks).filter(Boolean).length;
    const solution = `${s.end} − ${s.start} = ${s.volume} cm³. ${s.mass} ÷ ${s.volume} = ${s.density} g/cm³, which matches ${materials[s.material].name.toLowerCase()}.`;
    const labels = {volume: 'Volume', density: 'Density', material: 'Material'};
    const marks = Object.entries(checks).map(([key, ok]) => labels[key] + ' ' + (ok ? '1/1' : '0/1')).join(' · ');
    $('ticket-result').textContent = `First submission: ${score}/3. ${marks}. ${solution}`;
    marked = ['MYSTERY SAMPLE LAB — INDIVIDUAL EXIT TICKET', `Readings: ${s.mass} g, water ${s.start} to ${s.end} mL.`,
      `My answers: ${v.volume} cm³, ${v.density} g/cm³, ${materials[v.material].name}.`, $('ticket-result').textContent].join('\n');
    for (const control of exitForm.elements) control.disabled = true;
    $('ticket-actions').hidden = false;
  };
  $('save-ticket').onclick = () => {
    const url = URL.createObjectURL(new Blob([marked], {type: 'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'mystery-sample-ticket.txt';
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1200);
  };
  $('new-ticket').onclick = () => { marked = null; ticket = (ticket + 1) % tickets.length; drawTicket(); exitForm.elements.volume.focus(); };
  window.addEventListener('hashchange', showMode);
  drawBench(); drawRound(); drawTicket(); showMode();
  if(location.hash==='#project')projectSamples();
})();
