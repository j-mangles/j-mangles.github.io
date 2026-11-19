/* Nile flood model for the Grade 8 atlas. Water heights are illustrative cubits.
   The same land profile determines the waterline, silt coverage and village flooding. */
(function () {
  "use strict";
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const rise = [.06,.04,.02,0,0,.06,.4,.7,.82,1,.55,.18];
  const floods = {low:{label:"Low",peak:12},normal:{label:"Typical",peak:16},high:{label:"High",peak:21}};
  const work = ["Farmers water the growing wheat and barley.","Farmers weed the fields and clear the canals.","Grain begins to ripen.","Farmers cut and thresh the grain. Scribes measure the crop.","The last grain goes into the granaries.","Farmers repair canals and banks before the river rises.","The water begins to spread beyond the channel.","The rising water covers some of the farmland.","Officials watch the Nilometer as the river stays high.","Officials read the peak and estimate how much land received floodwater.","Farmers sow the wet soil as the water retreats.","Seedlings sprout on the land that received silt."];
  const ground = [[0,63],[35,82],[77,103],[145,103],[155,109],[275,153],[304,194],[345,194],[374,153],[484,109],[502,97],[540,80]];
  const waterY = cubits => 182 - cubits*4.3;
  function surface(x) {
    const i=ground.findIndex(p=>p[0]>=x);
    if(i<1) return ground[0][1];
    const [a,b]=ground[i-1],[c,d]=ground[i];
    return b+(d-b)*(x-a)/(c-a);
  }
  const plots = [165,178,191,204,217,230,243,256,269,379,392,405,418,431,444,457,470,481];
  function landscape(m,c,peak) {
    const y=waterY(c), peakY=waterY(peak);
    const wet=plots.filter(x=>surface(x)>=y).length;
    const reached=plots.filter(x=>surface(x)>=peakY).length;
    const houses=[82,100,119].map((x,i)=>`<g fill="#c99758" stroke="#705338" stroke-width="1.5"><path d="M${x} 103v-${14+i*3}h16v${14+i*3}Z"/><path d="M${x+6} 103v-8h4v8" fill="#71563b"/></g>`).join("");
    const field=plots.map(x=>{
      const gy=surface(x), silt=gy>=peakY;
      if(gy>=y)return "";
      let marks=`<path d="M${x-4} ${surface(x-4)}L${x+4} ${surface(x+4)}" stroke="${silt?'#584731':'#a27f4f'}" stroke-width="4"/>`;
      if(silt && (m<4 || m===11)) {
        const h=[11,15,18,18][m]||6;
        marks+=`<path d="M${x} ${gy}v-${h}m0 5-4-4m4 6 4-4" fill="none" stroke="${m>=2&&m<=3?'#a47818':'#526532'}" stroke-width="2"/>`;
      }
      return marks;
    }).join("");
    // Water sits above the bank profile only where the surface exceeds the land.
    const earth="M"+ground.map(p=>p.join(",")).join(" L")+" L540,202 L0,202Z";
    return {wet,reached,svg:`<svg viewBox="0 0 540 202" role="img" aria-label="Nile Valley cross-section in ${months[m]}. Water covers ${wet} of ${plots.length} model field strips.">
      <rect width="540" height="202" fill="#e8e5cf"/>
      <path d="M0 67L28 45 43 59 65 54 104 87 138 91 166 107H0Z M432 111l46-32 25 5 37-41v70Z" fill="#dabb84"/>
      <path d="${earth}" fill="#c9a775"/><path d="M0 126q70 9 126-2t109 11m137 38q80-26 168-20M0 156q76 7 136 0t100 7" stroke="#b28d60" fill="none" stroke-width="2"/>
      ${houses}<clipPath id="eg-nile-basin"><path d="M0 0H540V80 ${ground.slice().reverse().map(p=>"L"+p.join(",")).join(" ")} Z"/></clipPath>
      <g clip-path="url(#eg-nile-basin)"><rect x="0" y="${y}" width="540" height="${202-y}" fill="#328595" opacity=".88"/>
      <path d="M0 ${y}H540" stroke="#1d616c" stroke-width="3"/></g>${field}
      <g class="eg-section-label"><text x="107" y="26" text-anchor="middle">Village</text><path d="M107 32v37"/><text x="233" y="61" text-anchor="middle">Fields</text><path d="M233 66v32"/><text x="325" y="186" text-anchor="middle" fill="#fff">Nile</text></g>
    </svg>`};
  }

  function nileYear(el,state={},onObservation) {
    state.month ??= 9;
    state.flood ??= "normal";
    let timer=null;
    el.classList.add("eg-work");
    el.innerHTML=`<h4>How high will the Nile rise?</h4><p class="eg-lede">Hold the month steady and change the flood. Watch where the water reaches.</p>
      <div class="eg-nile-view"><div data-valley></div><div class="eg-gauge"><span>Nilometer</span><strong data-cubits></strong><span>cubits</span></div></div>
      <div class="eg-nile-controls"><div><label for="nx-slider">Month <strong data-month></strong></label>
        <div class="eg-month-control"><button type="button" data-play>Play year</button><input id="nx-slider" type="range" min="0" max="11" step="1"></div></div>
        <div><span class="eg-control-label">Flood height</span><div class="eg-options" role="group" aria-label="Flood height">${Object.entries(floods).map(([k,f])=>`<button type="button" data-flood="${k}">${f.label}</button>`).join("")}</div></div></div>
      <div class="eg-season" aria-live="polite"></div>
      <details class="eg-compare"><summary>Compare the three floods at their October peak</summary>
      <table><thead><tr><th>Flood</th><th>Model peak</th><th>Effect</th></tr></thead><tbody>
      <tr><th>Low</th><td>12 cubits</td><td>Outer fields miss the water and silt.</td></tr><tr><th>Typical</th><td>16 cubits</td><td>Much of the farmland receives silt.</td></tr><tr><th>High</th><td>21 cubits</td><td>Water reaches houses and stored grain.</td></tr></tbody></table></details>`;
    const get=s=>el.querySelector(s), slider=get("input"),play=get("[data-play]"), compare=get("details");
    compare.open=!!state.compare;
    compare.ontoggle=()=>{state.compare=compare.open;};
    function draw() {
      const m=state.month,peak=floods[state.flood].peak,c=2+rise[m]*(peak-2),land=landscape(m,c,peak);
      const season=m>=6&&m<=9?"Akhet · Flood season":m>=10||m<=1?"Peret · Growing season":"Shemu · Harvest season";
      get("[data-valley]").innerHTML=land.svg;
      get("[data-month]").textContent=months[m];
      get("[data-cubits]").textContent=Math.round(c);
      slider.value=m;slider.setAttribute("aria-valuetext",months[m]);
      const villageWet=waterY(c)<=103;
      const effect=villageWet?`Water covers ${land.wet} of the ${plots.length} field strips. Floodwater reaches the village and threatens stored grain.`:
        land.wet ? `Water covers ${land.wet} of the ${plots.length} field strips. The village is above the waterline.` :
        m>=10||m<5 ? `The last flood left silt on ${land.reached} of the ${plots.length} field strips.` : "The river is still inside its channel.";
      get(".eg-season").innerHTML=`<h5>${season}</h5><p>${work[m]} ${effect}</p>`;
      el.querySelectorAll("[data-flood]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.flood===state.flood));
      if(onObservation)onObservation({month:months[m],level:floods[state.flood].label,cubits:Math.round(c),fields:land.wet,total:plots.length,villageWet});
    }
    function stop() { clearTimeout(timer);timer=null;play.textContent="Play year";get(".eg-season").setAttribute("aria-live","polite"); }
    function advance() {
      if(!el.isConnected || el.closest("[hidden]") || document.hidden) {stop();return;}
      state.month=(state.month+1)%12;draw();timer=setTimeout(advance,1300);
    }
    play.onclick=()=>{
      if(timer!==null){stop();return;}
      play.textContent="Pause";get(".eg-season").setAttribute("aria-live","off");advance();
    };
    slider.oninput=()=>{stop();state.month=Number(slider.value);draw();};
    el.querySelectorAll("[data-flood]").forEach(b=>b.onclick=()=>{stop();state.flood=b.dataset.flood;draw();});
    draw();
  }

  window.EgyptInteractives={nileYear:{mount:nileYear,cap:"This model uses illustrative water levels and field strips. The flood season returned each year, but its height varied."}};
})();
