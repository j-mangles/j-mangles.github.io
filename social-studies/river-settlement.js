/* Egypt's Geography File, Unit 2 Lesson 1. The two field reports are classroom scenarios. */
(() => {
  "use strict";
  const factors = [
    ["Water source","Rains in the Ethiopian Highlands feed the Nile flood that travels north into Egypt.","The Tigris and Euphrates receive mountain snowmelt. Water flows towards the southern plains."],
    ["Flood timing","The annual flood usually came in a familiar season. Farmers could plan sowing for when the water receded.","Floods could arrive suddenly, sometimes when crops were already in the ground."],
    ["Flood height","A low flood could miss fields. A very high flood could damage villages and grain stores.","A powerful flood could break through banks, damage canals and wash away crops."],
    ["Soil and irrigation","The flood spread fertile silt across the narrow valley and delta. Land beyond the flood's reach still needed water.","The rivers also carried fertile silt. In the southern plains, farmers used canals to bring water to fields."],
    ["Natural barriers","Deserts lay on both sides of the valley. The sea to the north and cataracts to the south also affected travel.","The southern plain was flat and open, with few natural barriers between settlements."],
    ["Access and invasion","Deserts and cataracts made some approaches difficult. The Nile still offered a route for travel and trade.","Open approaches made travel between cities possible and offered fewer barriers to invading armies."],
    ["Political stability","Natural barriers helped protect a unified kingdom, although Egypt also went through periods of division.","Independent cities and later empires competed for land and waterways. Control of the region changed hands repeatedly."]
  ];
  const reports = [
    {title:"A low Nile flood",clue:"In this imagined year, a village records a lower Nile peak than it expected. Water retreats before it reaches the outer fields.",prompt:"Which families would be most affected? Would the timing evidence or the height evidence help you explain why?"},
    {title:"A shared canal silts up",clue:"In this imagined season, water is still flowing in the Euphrates, but silt blocks a shared canal before planting. Several farms lie beyond it.",prompt:"Would access to a river alone protect these farms? Which people would have to agree on a response?"}
  ];
  const by = id => document.getElementById("rv-"+id);
  const region = {egypt:"Nile Valley",mesopotamia:"Tigris–Euphrates"};
  const key = "river-valley-settlement-v1";
  const blank = () => ({first:"",factor:0,pins:[],readings:[],locked:false,report:0,revealed:false,last:"",reason:""});
  const state = blank();
  try {
    const s=JSON.parse(sessionStorage.getItem(key));
    if(s){
      for(const k of ["first","last"]) if(Object.hasOwn(region,s[k]))state[k]=s[k];
      if(Number.isInteger(s.factor)&&factors[s.factor])state.factor=s.factor;
      if(Array.isArray(s.pins))state.pins=[...new Set(s.pins.filter(i=>Number.isInteger(i)&&factors[i]))];
      if(Number.isInteger(s.report)&&reports[s.report])state.report=s.report;
      if(Array.isArray(s.readings))state.readings=s.readings.filter(r=>r && typeof r.month==="string" && typeof r.level==="string" && Number.isFinite(r.cubits)&&Number.isInteger(r.fields)&&Number.isInteger(r.total)&&typeof r.villageWet==="boolean").slice(0,2);
      state.locked=Boolean(state.first && (s.locked || s.revealed));
      state.revealed=Boolean(state.first && s.revealed);state.reason=typeof s.reason==="string"?s.reason:"";
    }
  } catch {}
  function save(){try{sessionStorage.setItem(key,JSON.stringify(state));}catch{}}
  for(const select of [by("first"),by("last")]){
    select.add(new Option("Choose a river valley",""));
    for(const [k,label] of Object.entries(region)) select.add(new Option(label,k));
  }
  factors.forEach(([name],i)=>by("factor").add(new Option(name,i)));
  reports.forEach((r,i)=>by("report").add(new Option(r.title,i)));
  function draw(){
    by("first").value=state.first;by("last").value=state.last;by("report").value=state.report;
    by("factor").value=state.factor;
    const [name,nile,tigris]=factors[state.factor],pinned=state.pins.includes(state.factor);
    by("nile").textContent=nile;by("tigris").textContent=tigris;
    by("pin").textContent=(pinned?"Remove":"Keep")+" evidence on "+name.toLowerCase();
    by("pin").setAttribute("aria-pressed",String(pinned));
    by("pinned").textContent=state.pins.length ? "Evidence kept ("+state.pins.length+"): "+state.pins.map(i=>factors[i][0]).join(", ")+".":"Choose at least three factors to use in your decision.";
    by("notebook").hidden=!state.pins.length;
    by("evidence").replaceChildren(...state.pins.map(i=>{
      const [factor,nile,tigris]=factors[i],li=document.createElement("li"),title=document.createElement("strong");
      title.textContent=factor;li.append(title," · Nile: "+nile+" Tigris–Euphrates: "+tigris);return li;
    }));
    by("reveal").disabled=!state.first||state.revealed;
    by("reveal").textContent=state.revealed?"Field report open":"Open field report";
    by("first").disabled=state.locked;
    by("field").hidden=!state.revealed;
    by("finding").textContent=state.revealed?reports[state.report].clue:"";
    by("question").textContent=state.revealed?reports[state.report].prompt:"";
    by("saved-choice").textContent=state.revealed?"Your original choice was the "+region[state.first]+".":"Choose a starting valley before opening a field report.";
    by("reason").value=state.reason;
    const missing=[];
    if(!state.first)missing.push("a starting valley");
    if(state.pins.length<3)missing.push((3-state.pins.length)+" more evidence factor"+(state.pins.length===2?"":"s"));
    if(!state.revealed)missing.push("a field report");
    if(!state.last)missing.push("a final valley");
    if(!state.reason.trim())missing.push("your argument");
    by("progress").textContent=missing.length?"Still needed: "+missing.join(", ")+".":"Your investigation is ready to hand in.";
  }
  let observed=null;
  function reading(r){
    return r.month+", "+r.level.toLowerCase()+" flood: "+r.cubits+" model cubits, "+r.fields+" of "+r.total+" field strips under water; "+(r.villageWet?"water reaches the village.":"village above water.");
  }
  function showReadings(){
    const [a,b]=state.readings;
    by("readings").replaceChildren(...state.readings.map(r=>{const li=document.createElement("li");li.textContent=reading(r);return li;}));
    by("record-flood").disabled=!observed || Boolean(b) || Boolean(a && a.month===observed.month && a.level===observed.level);
    by("clear-flood").hidden=!a;
    let message="";
    if(b){
      if(a.month===b.month){
        const delta=b.fields-a.fields;
        message="Same month, different flood heights. The second reading covers "+(delta===0?"the same number of field strips":Math.abs(delta)+(delta>0?" more":" fewer")+" field strips")+". Use the village reading to weigh the risk to homes.";
      }else if(a.level===b.level){
        message="Same flood setting, different months. Your readings show how water coverage changes during the year.";
      }else message="Both month and flood setting changed. Hold one steady before drawing a conclusion about the other.";
    }else if(a)message="First reading kept. Change the flood setting or month to keep a second reading.";
    by("flood-result").textContent=message;
  }
  by("flood-lab").ontoggle=()=>{
    if(by("flood-lab").open && !observed){
      window.EgyptInteractives.nileYear.mount(by("flood-model"),{},r=>{observed=r;showReadings();});
    }
  };
  by("record-flood").onclick=()=>{if(!by("record-flood").disabled){state.readings.push({...observed});save();showReadings();}};
  by("clear-flood").onclick=()=>{state.readings=[];save();showReadings();};
  function set(k,value){state[k]=value;save();draw();}
  by("first").onchange=e=>set("first",e.target.value);
  by("last").onchange=e=>set("last",e.target.value);
  by("factor").onchange=e=>set("factor",Number(e.target.value));
  by("pin").onclick=()=>{
    const i=state.factor;
    set("pins",state.pins.includes(i)?state.pins.filter(x=>x!==i):[...state.pins,i]);
  };
  by("report").onchange=e=>{state.revealed=false;set("report",Number(e.target.value));};
  by("reveal").onclick=()=>{if(state.first){state.locked=true;set("revealed",true);}};
  by("reason").oninput=e=>set("reason",e.target.value);
  by("download").onclick=()=>{
    const output=["Which river would you choose?","Initial settlement: "+(region[state.first]||"[Not chosen]"),
      ...state.pins.map(i=>factors[i][0]+"\nNile: "+factors[i][1]+"\nTigris–Euphrates: "+factors[i][2]),
      ...state.readings.map(r=>"Nile model reading: "+reading(r)),
      "Classroom field report: "+(state.revealed?reports[state.report].clue:"[Unopened]"),
      "Final settlement: "+(region[state.last]||"[Not chosen]"),"My argument:\n"+(state.reason.trim()||"[Unwritten]")];
    const a=document.createElement("a"),url=URL.createObjectURL(new Blob([output.join("\n\n")],{type:"text/plain;charset=utf-8"}));
    a.href=url;a.download="river-settlement-investigation.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  by("reset").onclick=()=>{if(window.confirm("Clear your settlement choice, evidence and argument?")){Object.assign(state,blank());save();draw();showReadings();by("first").focus();}};
  draw();showReadings();
})();
