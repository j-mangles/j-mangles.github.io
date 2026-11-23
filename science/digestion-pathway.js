/* Grade 8 Cells & Systems · Digestive pathway, based on Systems booklet Topic 6. */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const stages=[
 ["Mouth","Chewing breaks food into smaller pieces and mixes it with saliva.","Swallowed food travels through the oesophagus."],
 ["Oesophagus","Muscles move swallowed food down toward the stomach.","Food reaches the stomach."],
 ["Stomach","Acid and muscular movement help break down food.","The mixture enters the small intestine."],
 ["Small intestine","Digestion releases small molecules such as glucose. The lining separates the contents of the gut from blood in nearby capillaries.","Test what happens to two different parts of the same bite."],
 ["Bloodstream and body cells","Blood carries absorbed glucose to tissues. Muscle cells can use it to release energy.","This trace ends at a body cell."],
 ["Large intestine","The fibre you tracked is still inside the gut. The large intestine absorbs some water from the remaining contents.","Undigested waste is eventually eliminated."]
];
const quiz=[
 ["Where are most digested nutrients absorbed?",["Stomach","Small intestine","Large intestine"],1,"The small intestine absorbs most nutrients."],
 ["Which system carries absorbed nutrients to body cells?",["Circulatory","Skeletal","Integumentary"],0,"Blood carries nutrients throughout the body."],
 ["What helps break food down in the stomach?",["Acid and muscular motion","Air in the lungs","Blood returning to the heart"],0,"Stomach acid and muscular motion help digest food."],
 ["Where does material that was not absorbed continue?",["Brain","Large intestine","Heart"],1,"The large intestine absorbs some water from remaining material."]
];
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const traces = {
  glucose:{label:"Glucose from starch",end:4,observation:"Glucose crosses the small-intestine lining into a capillary. Blood carries it to body cells."},
  fibre:{label:"Undigested fibre",end:5,observation:"The fibre stays inside the gut and moves to the large intestine, where some water is absorbed from the remaining material."}
};
const destinations = {blood:"Across the lining into the blood",gut:"Along the gut to the large intestine"};
const expected = {glucose:"blood",fibre:"gut"};
const locations = [[45,17],[51,37],[60,57],[54,78],[54,78],[67,77]];
const storageKey = "science-digestion-traces-v1";

function wallDiagram(trace, revealed){
 const glucose = trace === "glucose";
 const particle = glucose ? '<circle r="8" fill="#f3bb39" stroke="#514011" stroke-width="2"/>' :
  '<path d="M-12 2q4-10 8-2t8-2t8 0" fill="none" stroke="#453562" stroke-width="4" stroke-linecap="round"/>';
 const x = !revealed ? 104 : glucose ? 239 : 282;
 const y = !revealed ? 48 : glucose ? 135 : 48;
 const route = !revealed ? '' : glucose ?
  '<path class="dn-route" d="M106 48C150 46 158 61 164 90S177 135 225 135"/><path d="m220 128 10 7-10 7" class="dn-tip"/>' :
  '<path class="dn-route" d="M119 48H260"/><path d="m254 41 10 7-10 7" class="dn-tip"/>';
 return '<svg class="dn-wall" viewBox="0 0 316 158" role="img" aria-label="'+escape(revealed?traces[trace].observation:traces[trace].label+' inside the small intestine, above the lining.')+'">'+
  '<rect width="316" height="158" fill="#fcf4dd"/><path d="M0 94Q23 91 37 91T74 90T118 88T166 92T217 90T269 87T316 89V158H0Z" fill="#f3d8c7"/>'+
  '<path d="M0 73Q23 70 37 70T74 69T118 67T166 71T217 69T269 66T316 68V88Q286 87 269 86T217 89T166 91T118 87T74 89T37 90T0 93Z" fill="#dd9d77" stroke="#784533" stroke-width="1.6"/>'+
  Array.from({length:16},(_,i)=>'<path d="M'+(i*20+8)+' 73l-2 14" stroke="#985c47" stroke-width="1.3"/>').join("")+
  '<path d="M0 123C57 113 91 126 135 122S243 116 316 121V148C247 141 186 146 138 148S55 139 0 148Z" fill="#eab1ab" stroke="#985451" stroke-width="2"/>'+
  '<g fill="#ad605d"><ellipse cx="77" cy="133" rx="6" ry="2.5"/><ellipse cx="182" cy="137" rx="6" ry="2.5"/><ellipse cx="277" cy="131" rx="6" ry="2.5"/></g>'+
  '<g font-family="system-ui,sans-serif" font-weight="600" font-size="13" fill="#332d29"><text x="10" y="21">Inside the gut</text><text x="9" y="84">Lining</text><text x="9" y="138">Capillary</text></g>'+route+
  '<g transform="translate('+x+' '+y+')">'+particle+'</g></svg>';
}

function render(el){
 let current=0,q=0,answer=null,trace="glucose",predictions={},notes=["",""];
 try{
  const saved=JSON.parse(window.sessionStorage.getItem(storageKey)||"null");
  if(saved){
   for(const key of Object.keys(traces)){
    if(Object.hasOwn(destinations,saved.predictions?.[key]))predictions[key]=saved.predictions[key];
   }
   if(Array.isArray(saved.notes))notes=notes.map((_,i)=>typeof saved.notes[i]==="string"?saved.notes[i]:"");
   if(Object.hasOwn(traces,saved.trace))trace=saved.trace;
   if(Number.isInteger(saved.current)&&stages[saved.current])current=saved.current;
  }
 }catch{}
 function save(){
  try{window.sessionStorage.setItem(storageKey,JSON.stringify({current,trace,predictions,notes}));}catch{}
 }
 el.innerHTML='<section class="dn"><h2 id="digestion-pathway" tabindex="-1">Digestion: Follow a Nutrient</h2>'+
 '<p class="dn-intro">Trace one bite of wholegrain bread. It contains starch that can be digested into glucose and fibre that can remain undigested. Where do their paths split?</p>'+
 '<div class="dn-layout"><figure class="dn-figure"><div class="dn-plate"><img src="img/digestive.jpg" width="707" height="1000" alt="Digestive tract. The oesophagus leads to the stomach. The small intestine coils inside the surrounding large intestine."><span class="dn-spot" aria-hidden="true"></span></div>'+
 '<figcaption><span class="dn-location"></span><small>Illustration by Mariana Ruiz · Public domain</small><a href="img/digestive.jpg" target="_blank" rel="noopener">Open full-size diagram</a></figcaption></figure>'+
 '<div class="dn-controls"><h3>Follow the bite</h3><div class="steps" role="group" aria-label="Inspect a stop">'+
 stages.map((s,i)=>'<button type="button" data-stage="'+i+'">'+escape(s[0])+'</button>').join("")+'</div>'+
 '<div class="readout" aria-live="polite"></div><button class="forward" type="button"></button>'+
 '<div class="dn-fork" hidden><h3>At the intestinal lining</h3><p>Choose one part of the bite to follow.</p>'+
 '<div class="dn-tracers" role="group" aria-label="Part of the bite"><button type="button" data-trace="glucose">Glucose from starch</button><button type="button" data-trace="fibre">Undigested fibre</button></div>'+
 '<div class="dn-window"></div><fieldset class="dn-predict"><legend>Where will this part go next?</legend>'+
 Object.entries(destinations).map(([k,d])=>'<label><input type="radio" name="dn-prediction" value="'+k+'"> '+d+'</label>').join("")+
 '</fieldset><button class="dn-test" type="button" disabled>Test my prediction</button><p class="dn-outcome" tabindex="-1" role="status"></p></div></div></div>'+
 '<section class="dn-record"><h3>My two traces</h3><div class="dn-observations" aria-live="polite"></div>'+
 '<div class="prompts"><label>How does glucose reach a muscle cell?<textarea data-note="0"></textarea></label>'+
 '<label>Where do the two routes separate? What happens to the fibre?<textarea data-note="1"></textarea></label></div>'+
 '<div class="dn-work-actions"><button class="dn-download" type="button">Download my traces</button><details class="dn-reset"><summary>Start a new investigation</summary><p>This clears the two predictions and both explanations in this tab.</p><button class="dn-clear" type="button">Clear and start again</button></details></div></section>'+
 '<div class="quiz"><h3>Check the pathway</h3><div class="question"></div><div class="answers"></div><div class="feedback" aria-live="polite"></div><button class="next" type="button" disabled>Next question</button></div></section>';
 const $=s=>el.querySelector(s);
 el.querySelectorAll("[data-note]").forEach(box=>{box.value=notes[Number(box.dataset.note)];});
 function paint(){
  const s=stages[current], fork=current===3, end=current===4||current===5;
  const tested=Object.hasOwn(predictions,trace);
  const visibleTrace=current===4?"glucose":current===5?"fibre":trace;
  el.querySelectorAll(".steps [data-stage]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.stage)===current)));
  $(".dn-spot").style.left=locations[current][0]+"%";$(".dn-spot").style.top=locations[current][1]+"%";
  $(".dn-location").textContent=current===4?"Where glucose entered the blood":s[0];
  $(".readout").innerHTML='<strong>'+escape(s[0])+'</strong><p>'+escape(s[1])+'</p>';
  $(".forward").hidden=fork;
  $(".forward").textContent=end?"Back to the intestinal lining":"Follow the bite to the "+stages[Math.min(current+1,3)][0].toLowerCase();
  $(".dn-fork").hidden=!(fork||end);
  $(".dn-window").innerHTML=wallDiagram(visibleTrace,end);
  el.querySelectorAll("[data-trace]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.trace===visibleTrace)));
  $(".dn-predict").hidden=end||tested;
  $(".dn-test").hidden=end;
  $(".dn-test").textContent=tested?"Replay this trace":"Test my prediction";
  el.querySelectorAll('[name="dn-prediction"]').forEach(r=>{r.checked=r.value===predictions[trace];});
  $(".dn-test").disabled=!tested;
  $(".dn-outcome").textContent=end?traces[visibleTrace].observation:tested?"Your first prediction is in the trace record.":"";
  const recorded=Object.keys(traces).filter(key=>Object.hasOwn(predictions,key));
  $(".dn-observations").innerHTML=recorded.length?'<dl>'+recorded.map(key=>'<dt>'+traces[key].label+'</dt><dd>My prediction: '+destinations[predictions[key]]+'.<br>Observed: '+traces[key].observation+'</dd>').join("")+'</dl>':'<p>Test both parts of the bite at the small intestine to collect their routes here.</p>';
 }

 function paintQuiz(){
  const a=quiz[q];$(".question").innerHTML='<b>'+(q+1)+' of '+quiz.length+'. '+escape(a[0])+'</b>';
  $(".answers").innerHTML=a[1].map((v,i)=>'<button type="button" data-answer="'+i+'" '+(answer!==null?'disabled':'')+'>'+escape(v)+'</button>').join("");
  $(".feedback").textContent=answer===null?"":(answer===a[2]?"Correct. ":"Not quite. ")+a[3];
  $(".next").disabled=answer===null;$(".next").textContent=q===quiz.length-1?"Start again":"Next question";
 }
 function go(i){
  current=i;
  if(i===4)trace="glucose";
  if(i===5)trace="fibre";
  save();paint();
 }
 function download(){
  const lines=["Digestion · Follow a Nutrient","One bite of wholegrain bread",""];
  for(const [k,t] of Object.entries(traces)){
   lines.push(t.label);
   if(Object.hasOwn(predictions,k))lines.push("My prediction: "+destinations[predictions[k]],"Observed: "+t.observation);
   else lines.push("Trace not yet tested.");
   lines.push("");
  }
  lines.push("How does glucose reach a muscle cell?",notes[0],"","Where do the routes separate? What happens to the fibre?",notes[1]);
  const url=URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="digestion-two-traces.txt";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 el.addEventListener("input",ev=>{
  const t=ev.target;
  if(t.dataset.note!==undefined){notes[Number(t.dataset.note)]=t.value;save();}
  if(t.name==="dn-prediction")$(".dn-test").disabled=false;
 });
 el.addEventListener("click",ev=>{
  const t=ev.target.closest("button");if(!t||!el.contains(t))return;
  if(t.dataset.stage!==undefined)go(Number(t.dataset.stage));
  else if(t.classList.contains("forward")){
   go(current>=4?3:current+1);
   (current===3?el.querySelector('[data-trace="'+trace+'"]'):$(".forward")).focus();
  }else if(t.dataset.trace!==undefined){trace=t.dataset.trace;go(3);}
  else if(t.classList.contains("dn-test")){
   const pick=el.querySelector('[name="dn-prediction"]:checked');
   if(!Object.hasOwn(predictions,trace)){if(!pick)return;predictions[trace]=pick.value;}
   go(traces[trace].end);
   const systemFeedback=predictions[trace]===expected[trace]?"Your prediction matched. ":"Compare your prediction with the route. ";
   $(".dn-outcome").textContent=systemFeedback+traces[trace].observation;
   $(".dn-outcome").focus();
  }else if(t.classList.contains("dn-clear")){
   predictions={};notes=["",""];trace="glucose";q=0;answer=null;
   el.querySelectorAll("[data-note]").forEach(box=>{box.value="";});
   $(".dn-reset").open=false;go(0);paintQuiz();$("#digestion-pathway").focus();
  }else if(t.classList.contains("dn-download"))download();
  else if(t.dataset.answer!==undefined&&answer===null){answer=Number(t.dataset.answer);paintQuiz();}
  else if(t.classList.contains("next")&&answer!==null){q=(q+1)%quiz.length;answer=null;paintQuiz();}
 });
 paint();paintQuiz();
 el.digestionExplorer={get current(){return current},select(i){if(Number.isInteger(i)&&stages[i])go(i);}};
}

H.lessonTools=H.lessonTools||{};
const prior=H.lessonTools["cells/systems"];
H.lessonTools["cells/systems"]=function(root){
 if(prior){const old=document.createElement("div");root.appendChild(old);prior(old);}
 const section=document.createElement("div");root.appendChild(section);render(section);
};
H.digestionData={stages,quiz};
})();