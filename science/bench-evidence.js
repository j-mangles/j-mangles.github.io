/* The same exhibit moves into the larger view so readings and keyboard state survive. */
(() => {
  const slot = document.getElementById('evidence-slot');
  const dialog = document.getElementById('evidence-view');
  const enlarged = document.getElementById('enlarged-slot');
  const open = document.getElementById('enlarge-evidence');
  const close = document.getElementById('close-evidence');

  open.addEventListener('click', () => {
    enlarged.append(slot.firstElementChild);
    dialog.showModal();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (enlarged.firstElementChild) slot.append(enlarged.firstElementChild);
    if (open.getClientRects().length) open.focus();
  });
  window.addEventListener('hashchange', () => {
    if (dialog.open) dialog.close();
  });

  window.UnitPrep.showEvidence = card => {
    const template = document.getElementById(card.visual);
    slot.replaceChildren(template.content.cloneNode(true));
    const figure = slot.firstElementChild;
    const slider = figure.querySelector('input[type=range]');
    if (!slider) return;

    const output = figure.querySelector('output');
    const clocks = figure.querySelectorAll('.trial-clock');
    const pressure = figure.querySelector('#syringe-pressure');
    function updateReading() {
      const value = Number(slider.value);
      if (clocks.length) {
        output.value = value + ' s';
        slider.setAttribute('aria-valuetext', value + ' seconds');
        clocks.forEach(clock => {
          const stop = Number(clock.dataset.stop);
          const elapsed = Math.min(value, stop);
          clock.querySelector('span').textContent = elapsed + ' s · ' + (value >= stop ? 'finished' : value === 0 ? 'ready' : 'running');
          clock.querySelector('i').style.width = (100 * elapsed / Number(slider.max)) + '%';
        });
      } else {
        output.value = value + ' mL';
        pressure.value = (Number(slider.max) / value).toFixed(2) + '×';
        slider.setAttribute('aria-valuetext', value + ' millilitres');
        figure.style.setProperty('--air-width', (100 * value / 20) + '%');
      }
    }
    slider.addEventListener('input', updateReading);
    updateReading();
  };

  window.UnitPrep.revealEvidence = card => {
    if (card.visual !== 'barrel') return;
    const air = slot.querySelector('.air');
    // Compress the space between dots while keeping their count and diameter fixed.
    const positions = [[7,32],[12,68],[24,16],[29,70],[39,42],[46,80],
      [52,22],[61,54],[68,78],[73,30],[83,61],[93,26]];
    for (const [x,y] of positions) {
      const dot = document.createElement('i');
      dot.className = 'gas-particle';
      dot.style.left = x + '%';
      dot.style.top = y + '%';
      air.append(dot);
    }
    slot.querySelector('#pressure-model').hidden = false;
  };
})();
