/* The atlas and the longer investigations share these primary-source and map views.
   Atlas mounts receive the current lesson's state when a self-check redraws the sheet. */
(function () {
  "use strict";
  const registry = window.EgyptInteractives ||= {};
  const photo = "img/rosetta-stone.webp";

  function buttonGroup(label, items, active, attribute) {
    return `<div class="eg-options" role="group" aria-label="${label}">${items.map((name, i) =>
      `<button type="button" ${attribute}="${i}" aria-pressed="${i === active}">${name}</button>`).join("")}</div>`;
  }

  function selectButton(el, attribute, selected) {
    el.querySelectorAll(`[${attribute}]`).forEach(b => {
      b.setAttribute("aria-pressed", Number(b.getAttribute(attribute)) === selected);
    });
  }

  // Coordinates use the same equirectangular projection as each local Natural Earth base map.
  function project(kind, [lon, lat]) {
    const [west, north, scaleX, scaleY] = kind === "trade" ? [19.5, 39, 13, 14.5] : [21, 33, 16.8, 18.6];
    return [(lon - west) * scaleX, (north - lat) * scaleY];
  }

  function point(kind, location) {
    return project(kind, location).map(n => n.toFixed(1)).join(",");
  }

  function mapLabel(kind, lon, lat, label, sea = false, angle = 0) {
    const [x, y] = project(kind, [lon, lat]);
    return `<text x="${x}" y="${y}" transform="rotate(${angle} ${x} ${y})" class="eg-place${sea ? " eg-sea" : ""}">${label}</text>`;
  }

  function mapSvg(kind, label, overlay) {
    return `<svg class="eg-map" viewBox="0 0 420 350" role="${kind==="trade"?"group":"img"}" aria-label="${label}">
      <image href="img/egypt-${kind}-base.svg" width="420" height="350"/>
      ${overlay}
      <g transform="translate(20 18)" aria-hidden="true"><path d="M0 18V1m-4 7 4-7 4 7" stroke="#22180c" fill="none" stroke-width="2"/><text x="0" y="33" text-anchor="middle" class="eg-place">N</text></g>
    </svg>`;
  }

  const cargoOrder = [0,4,1,3,2];
  const delta = [31.24, 30.04];
  const partners = [
    {name:"Byblos", region:"Byblos and the Levant", goods:"Cedar, olive oil and wine", location:[35.65,34.12], route:[[34.5,34],[33.2,33],[31.4,31.55]], journey:"Follow the Mediterranean coast to Byblos. Its cedar supplied long timbers for construction.", order:"A temple needs cedar for its doors."},
    {name:"Cyprus", region:"Cyprus and the Aegean", goods:"Copper, pottery and olive oil", location:[33,35.1], route:[[32,34.6],[30.9,33.3],[31.1,31.55]], journey:"Sail across the eastern Mediterranean. Copper from Cyprus could be combined with tin to make bronze.", order:"A metalworker has tin and needs copper to make bronze."},
    {name:"Mesopotamia", region:"Mesopotamian trading centres", goods:"Silver and lapis lazuli", location:[44,33.1], route:[[40,35.5],[36.8,36],[35.3,34],[34.4,31.5],[32.4,31]], journey:"Lapis passed through several partners on its way west. A merchant who supplied the blue stone could live far from its mine.", order:"A jeweller needs deep-blue lapis lazuli."},
    {name:"Nubia", region:"Nubia", goods:"Gold, ivory and ebony", location:[30.41,19.6], route:[[30.6,20.7],[31.6,22.4],[32.9,24.09],[32.64,25.7],[31.18,27.18],[30.9,27.7]], journey:"Follow the Nile south from Egypt. Cargo moving north from Nubia travelled downstream, past rocky cataracts.", order:"A scribe wants ivory from Egypt’s southern Nile neighbour."},
    {name:"Punt", region:"Punt, near the southern Red Sea", goods:"Incense, ebony and live animals", location:[40.1,16.3], route:[[39,18],[37.4,21],[35.5,24.3],[34.2,26.1],[32.75,26.16],[31.18,27.18]], journey:"An expedition could cross the desert to the Red Sea and sail south. Hatshepsut’s expedition returned with live incense trees. Punt’s exact location is debated.", order:"A temple wants live incense trees like those on Hatshepsut’s expedition."}
  ];

  function trade(el, state = {}) {
    state.partner ??= 0;
    state.order ??= null;
    state.answer ??= null;
    el.classList.add("eg-work");
    const coast = mapLabel("trade",24.5,34.8,"Mediterranean",true) + mapLabel("trade",27.9,26,"Egypt") + mapLabel("trade",41.5,24,"Arabia");
    const nodes = partners.map((p,i) => {
      const [x,y] = project("trade",p.location);
      const off = [[8,18],[-8,-9],[0,-9],[-10,4],[15,3]][i];
      const anchor = ["start","end","middle","end","start"][i];
      return `<g transform="translate(${x} ${y})" class="eg-location" role="button" tabindex="0" data-map-partner="${i}" aria-label="Trace cargo from ${p.name}"><circle r="16" fill="transparent"/><circle r="${i===4?9:4}" class="eg-pin${i===4?" eg-uncertain":""}"/><text x="${off[0]}" y="${off[1]}" text-anchor="${anchor}" class="eg-place">${p.name}</text></g>`;
    }).join("");
    el.innerHTML = `<h4>Trace a cargo to Egypt</h4><p class="eg-lede">Pick a partner on the map or list to follow its cargo back to Egypt.</p>
      <div class="eg-layout"><div>${mapSvg("trade","Trade routes into Egypt",`${coast}<path class="eg-route" data-route-line/>${nodes}<circle r="4" transform="translate(${point("trade",delta)})" class="eg-port"/>`)}
      <p class="eg-caption">Lines show possible connections. The dashed circle marks the uncertain location of Punt.</p></div>
      <div class="eg-reading">${buttonGroup("Trading partners",partners.map(p=>p.name),state.partner,"data-partner-choice")}
      <div data-cargo aria-live="polite"></div></div></div>
      <div class="eg-task"><div data-order aria-live="polite"></div><button type="button" data-trade-task></button></div>`;
    const taskButton = el.querySelector("[data-trade-task]");
    function draw() {
      const p = partners[state.partner];
      const path = el.querySelector("[data-route-line]");
      path.setAttribute("d","M"+[p.location,...p.route,delta].map(loc=>point("trade",loc)).join(" L"));
      el.querySelector(".eg-map").setAttribute("aria-label",`Possible route from ${p.name} to Egypt. ${p.journey}`);
      selectButton(el,"data-partner-choice",state.partner);
      selectButton(el,"data-map-partner",state.partner);
      el.querySelector("[data-cargo]").innerHTML = `<h5>${p.region}</h5><p class="eg-goods">${p.goods}</p><p>${p.journey}</p>`;
      const order = el.querySelector("[data-order]");
      if (state.order === null) {
        order.textContent = "Can you find a supplier from a cargo request?";
        taskButton.textContent = "Try a cargo request";
      } else {
        const target=cargoOrder[state.order];
        const solved = state.answer === target;
        const feedback = state.answer === null ? "Choose the partner that can fill the request." : solved ? `That fits. ${partners[target].goods} came through this network.` : `That partner supplied ${partners[state.answer].goods.toLowerCase()}. Try another partner for this order.`;
        order.innerHTML = `<strong>Request ${state.order+1} of ${partners.length}</strong><p>${partners[target].order}</p><p class="eg-response">${feedback}</p>`;
        taskButton.textContent = solved ? state.order===partners.length-1 ? "Finish cargo requests" : "Next request" : "Return to exploring";
      }
    }
    el.querySelectorAll("[data-partner-choice],[data-map-partner]").forEach(b => b.onclick = () => {
      state.partner = Number(b.dataset.partnerChoice ?? b.dataset.mapPartner);
      if (state.order !== null) state.answer = state.partner;
      draw();
    });
    el.querySelectorAll("[data-map-partner]").forEach(b=>b.onkeydown=e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();b.onclick();}
    });
    taskButton.onclick = () => {
      if (state.order === null) state.order = 0;
      else if (state.answer === cargoOrder[state.order] && state.order < partners.length - 1) state.order++;
      else state.order = null;
      state.answer = null;
      draw();
    };
    draw();
  }

  const phases = [
    {name:"Kerma", date:"c. 2500–1500 BCE", site:"Kerma", location:[30.41,19.6], evidence:"A huge mudbrick temple still stands at Kerma. This Nubian centre controlled trade and could send armies deep into Egypt.", reading:"A rival kingdom with resources of its own could bargain with Egypt or challenge it."},
    {name:"Border forts", date:"c. 1860 BCE", site:"Buhen", location:[31.29,21.91], evidence:"Egypt built thick walls and a moat at Buhen near the Second Cataract. A royal boundary inscription belittled the Nubians.", reading:"Compare the walls with the king’s words. Egypt spent heavily on defence against the people he dismissed."},
    {name:"Egypt in Nubia", date:"c. 1500–1070 BCE", site:"Abu Simbel", location:[31.63,22.34], evidence:"Egypt placed a governor in Nubia and took gold north. At Abu Simbel, Ramesses II had enormous images of himself cut into the cliff.", reading:"Egyptian officials and royal monuments are two kinds of evidence for Egyptian rule in Nubia."},
    {name:"Kush in Egypt", date:"c. 744–656 BCE", site:"Napata", location:[31.83,18.53], evidence:"Piye marched north from the Kushite kingdom. He and his successors ruled Egypt as pharaohs and restored Egyptian temples.", reading:"Power moved north from Kush. Egyptian-style temples could now be evidence of a Kushite ruler’s decisions."},
    {name:"Meroë", date:"During the Roman era", site:"Meroë", location:[33.75,16.94], evidence:"At Meroë, a bronze head of the Roman emperor Augustus lay buried beneath a temple step. People entering the temple walked over it.", reading:"Its placement suggests defiance. The object alone cannot tell us what every visitor thought."}
  ];

  function nubiaMap(i) {
    const phase = phases[i], [x,y] = project("nubia",phase.location);
    const dots = phases.map(p=>`<circle r="2.6" transform="translate(${point("nubia",p.location)})" class="eg-port"/>`).join("");
    const movement = i===2 || i===3;
    const direction = i===2 ? "Egypt extended rule south" : "Kushite kings ruled north";
    const arrow = movement ? `<defs><marker id="eg-rule-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5 0 10Z" fill="#973a1f"/></marker></defs>
      <path d="${i===2?"M154 65Q221 102 169 186":"M168 253Q217 187 197 138T170 66"}" fill="none" stroke="#973a1f" stroke-width="3" stroke-dasharray="6 3" marker-end="url(#eg-rule-arrow)"/>      <text x="14" y="333" class="eg-place">${direction}</text>` : "";
    return mapSvg("nubia",`${phase.site} along the Nile. ${phase.date}.`,
      mapLabel("nubia",26,28.7,"Egypt") + mapLabel("nubia",25,21,"Nubia") + mapLabel("nubia",34.6,27.8,"Red Sea",true,58) +
      dots + arrow + `<circle cx="${x}" cy="${y}" r="8" class="eg-ring"/><path d="M${x+8} ${y}h16" class="eg-leader"/><text x="${x+28}" y="${y+4}" class="eg-place">${phase.site}</text>`);
  }

  function nubia(el, state = {}) {
    state.phase ??= 0;
    state.pin ??= null;
    el.classList.add("eg-work");
    el.innerHTML = `<h4>Who held power on the Nile?</h4><p class="eg-lede">Choose a period. Pin its evidence, then compare it with another period.</p>
      ${buttonGroup("Periods along the Nile",phases.map(p=>p.name),state.phase,"data-nubia-phase")}
      <div class="eg-layout"><div data-phase-map></div><div class="eg-reading"><div data-phase-text aria-live="polite"></div>
      <button type="button" data-pin></button></div></div><div data-comparison aria-live="polite"></div>`;
    const pin = el.querySelector("[data-pin]");
    function draw() {
      const p = phases[state.phase];
      selectButton(el,"data-nubia-phase",state.phase);
      el.querySelector("[data-phase-map]").innerHTML = nubiaMap(state.phase);
      el.querySelector("[data-phase-text]").innerHTML = `<h5>${p.site}</h5><p class="eg-goods">${p.date}</p><p>${p.evidence}</p>`;
      pin.textContent = state.pin===state.phase ? "Unpin this period" : state.pin===null ? "Pin for comparison" : "Pin this period instead";
      const out=el.querySelector("[data-comparison]");
      if (state.pin===null) { out.innerHTML=""; return; }
      const saved = phases[state.pin];
      if (state.pin===state.phase) out.innerHTML=`<p class="eg-note">${saved.site} is pinned. Select another period to compare the evidence.</p>`;
      else out.innerHTML=`<div class="eg-pair"><div><h5>${saved.name}</h5><p>${saved.reading}</p></div><div><h5>${p.name}</h5><p>${p.reading}</p></div></div><p class="eg-note">What changed between these periods? Use one piece of evidence from each.</p>`;
    }
    el.querySelectorAll("[data-nubia-phase]").forEach(b=>b.onclick=()=>{state.phase=Number(b.dataset.nubiaPhase);draw();});
    pin.onclick=()=>{state.pin=state.pin===state.phase?null:state.phase;draw();};
    draw();
  }

  const scripts = [
    {label:"Upper",name:"Hieroglyphs",x:54,y:13,lines:14,look:"Look for the separate picture signs. The broken top edge cuts through this inscription.",use:"Names in oval frames, called cartouches, gave scholars groups of signs to compare with names in Greek."},
    {label:"Middle",name:"Demotic",x:50,y:43,lines:32,look:"The signs join into fast, flowing strokes. Compare their shapes with the picture signs above.",use:"This is Egyptian written in another script. Seeing different marks does not always mean seeing a different language."},
    {label:"Lower",name:"Greek",x:48,y:73,lines:54,look:"The letters sit in close, even rows. The broken lower corner cuts some lines short.",use:"Scholars could already read Greek. It told them what the decree said and gave them a royal name to look for in the Egyptian text."}
  ];

  function rosetta(el, state = {}) {
    state.band ??= 0;
    state.reason ??= null;
    el.classList.add("eg-work");
    el.innerHTML=`<h4>Read the Rosetta Stone up close</h4><p class="eg-lede">Inspect three bands of writing on one decree from 196 BCE.</p>
      <div class="eg-stone-layout"><div class="eg-stone"><div class="eg-specimen"><img src="${photo}" alt="The Rosetta Stone has a broken top and three bands of carved writing.">
      ${scripts.map((s,i)=>`<button type="button" class="eg-lens" data-band="${i}" style="left:${s.x}%;top:${s.y}%" aria-label="Inspect ${s.label.toLowerCase()} band"></button>`).join("")}</div></div>
      <div class="eg-reading">${buttonGroup("Inscription band",scripts.map(s=>s.label+" band"),state.band,"data-script")}
      <div class="eg-detail" aria-hidden="true"><img src="${photo}" alt=""></div><div data-inscription aria-live="polite"></div></div></div>
      <p class="eg-caption">Photograph by Donald Macbeth, published in 1922. <a href="https://commons.wikimedia.org/wiki/File:The_Rosetta_Stone.jpg">View the original plate</a></p>
      <div class="eg-task"><strong>Where would you start deciphering the decree?</strong>
      ${buttonGroup("Choose a starting script",scripts.map(s=>s.name),state.reason,"data-start-script")}<p data-reason aria-live="polite"></p></div>`;
    const detail=el.querySelector(".eg-detail img");
    function inspect(i) {
      state.band=i;
      const s=scripts[i];
      selectButton(el,"data-band",i);
      selectButton(el,"data-script",i);
      detail.style.left=(50-s.x*2.8)+"%";
      // Both axes use the image's own dimensions, so each lens lands on the same spot at every width.
      detail.style.top="50%";
      detail.style.transform=`translateY(-${s.y}%)`;
      el.querySelector("[data-inscription]").innerHTML=`<h5>${s.name}</h5><p class="eg-goods">${s.lines} surviving lines</p><p>${s.look} ${s.use}</p>`;
    }
    function explain() {
      const replies=["The cartouches can help you spot a royal name. Which band could a scholar already read to find that name?","Demotic gives you another Egyptian version to compare. Which band first gives you the meaning of the decree?","Yes. Greek gives you the decree’s meaning and the name Ptolemy. You can then look for that name in a cartouche and test which signs stand for its sounds."];
      selectButton(el,"data-start-script",state.reason);
      el.querySelector("[data-reason]").textContent=replies[state.reason]||"";
    }
    el.querySelectorAll("[data-band],[data-script]").forEach(b=>b.onclick=()=>inspect(Number(b.dataset.band??b.dataset.script)));
    el.querySelectorAll("[data-start-script]").forEach(b=>b.onclick=()=>{state.reason=Number(b.dataset.startScript);explain();});
    inspect(state.band);explain();
  }

  Object.assign(registry,{trade:{mount:trade},nubia:{mount:nubia,showEvidence(el,i){
    const p=phases[i];
    el.innerHTML=nubiaMap(i)+`<div><h5>${p.site}</h5><p>${p.evidence}</p></div>`;
  }},rosetta:{mount:rosetta}});
  // Standalone investigations use the same specimen and route views as their atlas lessons.
  document.querySelectorAll("[data-eg-exhibit]").forEach(el=>{
    const mount=registry[el.dataset.egExhibit].mount;
    mount(el);
    document.querySelector("[data-clear]")?.addEventListener("click",()=>mount(el));
  });
})();
