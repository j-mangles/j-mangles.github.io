/* Science 8 conceptual greenhouse-effect model. Illustrates energy pathways, not exact climate calculations. */
(() => {
  'use strict';
  const H=window.HUB;if(!H)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style=`<style>
  .ghe{padding:18px;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius)}
  .ghe h3{margin:0 0 6px}.ghe p{color:var(--muted)}.ghe-control{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;margin:12px 0}.ghe-control label{font-weight:650}.ghe-control input{width:100%;accent-color:var(--accent)}.ghe-level{color:var(--accent-ink);font-weight:700;white-space:nowrap}.ghe-legend{display:flex;gap:14px;flex-wrap:wrap;margin:10px 0;color:var(--muted);font-size:13px}.ghe-key{display:inline-flex;align-items:center;gap:6px}.ghe-dot{width:10px;height:10px;border-radius:50%;background:#5573d9}.ghe-swatch{width:18px;height:3px;background:#e9ad27}.ghe-swatch.ir{background:#d45b67}.ghe-svg{display:block;width:100%;height:auto;border-radius:12px;background:linear-gradient(180deg,#f0f4ff,#fff 76%)}.ghe-svg text{font:13px var(--f-body,system-ui);fill:var(--ink)}.ghe-caption{margin:8px 0 0!important;font-size:13px}.ghe-explain{padding:12px 14px;border-radius:10px;background:var(--soft);color:var(--ink)!important}.ghe:focus-within input:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 38%,transparent);outline-offset:3px}@media(max-width:580px){.ghe-control{grid-template-columns:1fr}.ghe-level{white-space:normal}}
  </style>`;
  function greenhouseExplorer(root){
    root.innerHTML=style+`<section class="ghe" aria-label="Greenhouse Effect Explorer"><div class="eyebrow">Interactive model</div><h3>Greenhouse Effect Explorer</h3><p>Change the relative amount of greenhouse gases and trace what happens to sunlight and infrared energy.</p>
      <div class="ghe-control"><label for="ghe-slider">Relative greenhouse gas level <input id="ghe-slider" type="range" min="0" max="100" value="45" step="1" aria-valuetext="Moderate in this conceptual model"></label><output class="ghe-level" id="ghe-level" for="ghe-slider">Moderate</output></div>
      <div class="ghe-legend"><span class="ghe-key"><i class="ghe-swatch"></i>Incoming sunlight</span><span class="ghe-key"><i class="ghe-swatch ir"></i>Infrared radiation</span><span class="ghe-key"><i class="ghe-dot"></i>Greenhouse gas molecules</span></div>
      <svg class="ghe-svg" viewBox="0 0 640 300" role="img" aria-labelledby="ghe-title ghe-desc"><title id="ghe-title">Conceptual greenhouse effect</title><desc id="ghe-desc">Sunlight passes through the atmosphere and warms Earth's surface. The surface emits infrared radiation. Greenhouse gases absorb and re-emit some infrared radiation upward and downward, while some energy continues to escape to space.</desc>
        <defs><marker id="ghe-sun-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e9ad27"/></marker><marker id="ghe-ir-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d45b67"/></marker><linearGradient id="ghe-atmosphere" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#b9c9ff" stop-opacity=".1"/><stop offset="1" stop-color="#8ea5ed" stop-opacity=".25"/></linearGradient></defs>
        <path d="M25 195 Q320 155 615 195 L615 255 Q320 278 25 255Z" fill="url(#ghe-atmosphere)" stroke="#91a5df" stroke-dasharray="5 5"/><text x="500" y="184">Atmosphere</text>
        <path d="M30 238 Q320 200 610 238 L610 300 L30 300Z" fill="#dcebdc"/><text x="278" y="281" text-anchor="middle">Earth’s surface</text>
        <g class="ghe-sun-rays" stroke="#e9ad27" stroke-width="4" marker-end="url(#ghe-sun-arrow)"><path d="M180 25L205 205"/><path d="M320 18L320 196"/><path d="M460 25L435 205"/></g>
        <g fill="#5573d9" class="ghe-molecules"></g>
        <g class="ghe-ir-rays" fill="none" stroke="#d45b67" stroke-width="4" marker-end="url(#ghe-ir-arrow)"><path class="ghe-direct" d="M270 220L270 40"/><path class="ghe-up" d="M352 165L352 30"/><path class="ghe-down" d="M386 65L386 217"/><path class="ghe-down2" d="M300 93L300 217"/></g>
        <text x="37" y="25">Space</text><text x="34" y="166" fill="#a2760c">Sunlight</text><text x="460" y="80" fill="#ae4651">Infrared</text>
      </svg><p class="ghe-caption">Conceptual pathway only. The drawing does not show exact amounts or temperatures.</p>
      <p class="ghe-explain" id="ghe-explain" role="status" aria-live="polite"></p>
    </section>`;
    const slider=root.querySelector('#ghe-slider'),level=root.querySelector('#ghe-level');
    const direct=root.querySelector('.ghe-direct'),up=root.querySelector('.ghe-up'),down=root.querySelector('.ghe-down'),down2=root.querySelector('.ghe-down2'),molecules=root.querySelector('.ghe-molecules'),explain=root.querySelector('#ghe-explain');
    function update(){
      const amount=Number(slider.value),name=amount<30?'Lower':amount<70?'Moderate':'Higher';
      level.textContent=name;slider.setAttribute('aria-valuetext',`${name} relative greenhouse gas level in this conceptual model`);
      const absorption=amount/100;
      direct.style.opacity=String(0.9-absorption*.72);
      up.style.opacity=String(.18+absorption*.72);
      down.style.opacity=String(absorption*.9);
      down2.style.opacity=String(absorption*.48);
      const coords=[[135,187],[210,173],[290,181],[370,171],[450,186],[515,171],[170,122],[250,113],[330,122],[410,111],[490,124],[300,63],[420,69]];
      const n=Math.round(2+amount/9);
      molecules.innerHTML=coords.slice(0,n).map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3===0?7:5}"/>`).join('');
      explain.textContent=amount<30?'With fewer greenhouse gases in this illustration, more surface-emitted infrared radiation travels directly toward space. Some is still absorbed and re-emitted.':amount<70?'Greenhouse gases absorb and re-emit some infrared radiation in different directions. Some energy continues to escape to space.':'With more greenhouse gases in this illustration, a larger share of outgoing infrared is absorbed and re-emitted, including back toward the surface. Energy still escapes to space.';
    }
    slider.addEventListener('input',update);update();
  }
  H.lessonTools=Object.assign(H.lessonTools||{}, {'light/u3t5-greenhouse':greenhouseExplorer});
})();
