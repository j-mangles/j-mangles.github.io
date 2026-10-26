/* Comparative Chronology · matches broad historical periods in Societies of the Past Atlas.
 * This visualization compares studied time spans, not precise single-polity lifespans.
 * All data local, user notes session-only.
 */
(function(){
"use strict";
const PERIODS=[
 {id:"mesopotamia",name:"Mesopotamia",span:"c. 5400 – 539 BCE",start:-5400,end:-539,color:"#B87858",caution:"Mesopotamia is a region of many societies, not one continuous empire."},
 {id:"egypt",name:"Ancient Egypt",span:"c. 3100 – 30 BCE",start:-3100,end:-30,color:"#D2A149",caution:"Ancient Egypt had different dynasties and periods of change; this is a long teaching range."},
 {id:"greece",name:"Ancient Greece",span:"c. 800 – 146 BCE",start:-800,end:-146,color:"#7B8FA5",caution:"Greek cultures continued after this broad study period."},
 {id:"rome",name:"Ancient Rome",span:"753 BCE – 476 CE",start:-753,end:476,color:"#AD716A",caution:"476 CE conventionally marks the end of the Western Roman Empire. The Eastern Roman Empire continued."},
 {id:"middle-ages",name:"Middle Ages",span:"c. 500 – 1500 CE",start:500,end:1500,color:"#82966B",caution:"Middle Ages is mainly a European historical period label, not a worldwide starting date."}
];
const by=id=>PERIODS.find(p=>p.id===id);
const format=n=>n<0?Math.abs(n)+" BCE":n>0?n+" CE":"BCE/CE boundary";
function overlap(first,second){
 const a=by(first),b=by(second);
 if(!a||!b)throw Error("Unknown historical period");
 const start=Math.max(a.start,b.start),end=Math.min(a.end,b.end);
 return {exists:start<end,start,end,earlier:a.start<b.start?a.id:b.start<a.start?b.id:"same",approxYears:Math.max(0,end-start)};
}
function graph(first,second){
 const pair=overlap(first,second);
 const L=199,W=594,min=-5500,max=1600,x=n=>L+(n-min)/(max-min)*W;
 let svg='<svg viewBox="0 0 870 392" role="img" aria-label="Historical study period comparison. '+
  PERIODS.map(p=>p.name+": "+p.span).join("; ")+
  '. '+(pair.exists?"Selected periods overlap.":"Selected periods do not overlap.")+
  '" xmlns="http://www.w3.org/2000/svg">';
 svg+='<rect width="870" height="392" rx="8" fill="#FFFCF6"/>';
 if(pair.exists){
  const l=x(pair.start),r=x(pair.end);
  svg+='<rect x="'+l.toFixed(1)+'" y="34" width="'+(r-l).toFixed(1)+'" height="291" fill="#E2ECC5"/>';
 }
 const ticks=[[-5000,"5000 BCE"],[-4000,"4000 BCE"],[-3000,"3000 BCE"],[-2000,"2000 BCE"],[-1000,"1000 BCE"],[0,"BCE / CE"],[1000,"1000 CE"],[1500,"1500 CE"]];
 ticks.forEach(item=>{const xx=x(item[0]);svg+='<line x1="'+xx.toFixed(1)+'" y1="35" x2="'+xx.toFixed(1)+'" y2="326" stroke="#DED4C6" stroke-dasharray="3 5"/>';
  svg+='<text x="'+xx.toFixed(1)+'" y="348" text-anchor="middle" fill="#665D54" font-size="11">'+item[1]+'</text>';});
 svg+='<text x="198" y="20" fill="#51453B" font-size="13" font-weight="700">Earlier ← Study period timeline → Later</text>';
 PERIODS.forEach((p,i)=>{
  const yy=54+i*53,active=p.id===first||p.id===second;
  svg+='<text x="16" y="'+(yy+20)+'" fill="#38312A" font-size="14" font-weight="'+(active?"700":"400")+'">'+p.name+'</text>';
  svg+='<rect x="'+x(p.start).toFixed(1)+'" y="'+yy+'" width="'+(x(p.end)-x(p.start)).toFixed(1)+
   '" height="29" rx="5" fill="'+p.color+'" opacity="'+(active?"1":".32")+'" stroke="'+(active?"#372F27":"none")+'" stroke-width="2"/>';
 });
 svg+='<text x="199" y="376" fill="#665D54" font-size="12">Broad classroom date ranges · periods can overlap without direct contact</text></svg>';
 return svg;
}
function mount(doc){
 const $=s=>doc.querySelector(s);
 const a=$("#period-a"),b=$("#period-b");
 if(!a||!b)throw Error("Missing chronology controls");
 const options=PERIODS.map(p=>'<option value="'+p.id+'">'+p.name+'</option>').join("");
 a.innerHTML=options;b.innerHTML=options;a.value="mesopotamia";b.value="egypt";
 function draw(){
  const f=by(a.value),g=by(b.value),o=overlap(f.id,g.id);
  $("#timeline-graph").innerHTML=graph(f.id,g.id);
  $("#overlap-description").textContent=o.exists?
   f.name+" and "+g.name+" overlap from approximately "+format(o.start)+" to "+format(o.end)+
    ". The pale region highlights the shared years on the diagram.":
   "These selected study ranges do not overlap. "+f.name+" is "+f.span+"; "+g.name+" is "+g.span+".";
  $("#caveat").textContent=f.name+": "+f.caution+" "+g.name+": "+g.caution;
  $("#feedback").textContent="";
  const choices=f.id===g.id?[f]:[f,g];
  $("#guess").innerHTML=choices.map(p=>'<button type="button" data-answer="'+p.id+'">'+p.name+'</button>').join("");
  Array.from(doc.querySelectorAll("[data-answer]")).forEach(btn=>btn.onclick=()=>{
   const earlier=overlap(a.value,b.value).earlier,sel=btn.dataset.answer;
   $("#feedback").textContent=earlier==="same"?"They begin at the same date because this is the same period.":
    sel===earlier?"Correct. Its bar starts farther left, indicating an earlier starting period.":
    "Try again. Compare the left endpoints of both bars.";
   Array.from(doc.querySelectorAll("[data-answer]")).forEach(x=>x.setAttribute("aria-pressed",String(x===btn)));
  });
 }
 a.onchange=draw;b.onchange=draw;
 $("#copy-reason").onclick=()=>{
  const value=$("#student-reason").value.trim(),status=$("#copy-status");
  if(!value){status.textContent="Write your own historical claim before copying.";return;}
  const text="SOCIAL STUDIES · COMPARATIVE CHRONOLOGY\n"+by(a.value).name+": "+by(a.value).span+
   "\n"+by(b.value).name+": "+by(b.value).span+"\n\n"+value;
  if(typeof navigator!=="undefined"&&navigator.clipboard?.writeText){
   navigator.clipboard.writeText(text).then(()=>status.textContent="Explanation copied.").catch(()=>status.textContent="Clipboard unavailable; select and copy your text manually.");
  }else status.textContent="Clipboard unavailable; select and copy your text manually.";
 };
 draw();
}
window.ChronologyCore={PERIODS,overlap,graph,mount};
})();
