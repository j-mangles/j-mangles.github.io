/* Grade 8 ELA Core Writing Workshop: matches the STUDENT writing organizers in Drive.
 * Never contains story passages, teacher answers, names, network requests or saved data.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const TASKS={
 thankyou:{title:"Thank You, Ma'am",question:"How does Langston Hughes show that compassion can influence a person more powerfully than punishment?",length:"One developed paragraph",kind:["Moment 1","Different moment 2"],hint:["Select a specific moment involving Roger or Mrs. Jones.","Use a different moment to support your claim."],context:"Compare Roger's choices and Mrs. Jones's responses. Do not claim certainty about Roger's future.",checks:["A clear answer about compassion versus punishment","Two distinct specific story details","An explanation after each detail","A concluding statement","One complete developed paragraph"]},
 summer:{title:"All Summer in a Day",question:"How does Bradbury use both setting and group behaviour to develop a message about exclusion?",length:"One developed paragraph, or two if needed",kind:["Setting evidence","Group-behaviour evidence"],hint:["Use a detail about Venus, the rain or the sun.","Use a detail about the children's actions toward Margot."],context:"Evidence 1 must be about SETTING. Evidence 2 must be about GROUP BEHAVIOUR.",checks:["A claim about exclusion","One setting detail","One group-behaviour detail","Why each detail matters to the message","A conclusion"]},
 landlady:{title:"The Landlady",question:"How does Roald Dahl transform an ordinary act of hospitality into a threatening situation?",length:"Two or three developed paragraphs",kind:["Technique 1","Technique 2"],hint:["Name a technique and select evidence.","Name a genuinely different technique and select evidence."],context:"Try foreshadowing, word choice, setting, dramatic irony or characterization. Do not pick the same technique twice.",tech:true,checks:["A clear claim about how Dahl builds unease","Two genuinely different named techniques","One specific detail for each technique","An explanation of the effect of each technique","Two or three developed paragraphs and a conclusion"]},
 paw:{title:"The Monkey's Paw",question:"Is the tragedy in The Monkey's Paw caused more by supernatural fate or by human choice?",length:"Three or four developed paragraphs",kind:["Supporting moment 1","Supporting moment 2"],hint:["Select a moment that supports your view.","Choose a different moment with another reason for your view."],context:"You can argue for fate, human choice, or a defended combination. Address a fair opposing interpretation.",opposing:true,checks:["A clear, defended position","Two pieces of supporting evidence","One detail supporting an opposing interpretation","A direct reply to the opposing view","A conclusion in three or four developed paragraphs"]}
};
const safe=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>c==="&"?"&amp;":c==="<"?"&lt;":c===">"?"&gt;":c==='"'?"&quot;":"&#39;");
function openTask(el,key){
 const task=TASKS[key];if(!task)return;
 const section=(id,title,hint,rows=3)=>`<label class="cw-label" for="cw-${id}">${safe(title)}</label><p class="cw-help">${safe(hint)}</p><textarea id="cw-${id}" data-cw-field="${id}" rows="${rows}" placeholder="Write in your own words…"></textarea>`;
 const evidence=(n)=>`<section class="cw-evidence"><h4>${safe(task.kind[n-1])}</h4>${task.tech?`<label class="cw-label" for="cw-tech${n}">Name technique ${n}</label><input type="text" id="cw-tech${n}" data-cw-field="tech${n}" maxlength="90" placeholder="e.g. setting">`:""}${section("ev"+n,"Story evidence "+n,task.hint[n-1])}${section("why"+n,"Explain why it matters","How does this specific detail strengthen your claim?")}</section>`;
 let baseline="";
 el.innerHTML=`<div class="cw"><style>
 .cw{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:clamp(14px,3vw,24px);line-height:1.55}
 .cw *{box-sizing:border-box}.cw .cw-top{background:var(--soft);border-radius:var(--radius);padding:18px;margin:14px 0}
 .cw h3{margin:4px 0 10px;font-size:24px}.cw h4{margin:8px 0 10px;font-size:18px}.cw .cw-kicker{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-ink)}
 .cw .cw-question{font:20px/1.5 var(--f-big,Georgia,serif);margin:8px 0}
 .cw .cw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.cw .cw-pane{min-width:0;border:1px solid var(--rule);border-radius:var(--radius);padding:16px}
 .cw .cw-label{display:block;font-weight:700;margin:16px 0 5px}.cw .cw-help{font-size:13px;color:var(--muted);margin:2px 0 7px}
 .cw textarea,.cw input[type=text]{width:100%;max-width:100%;font:inherit;background:var(--paper);color:var(--ink);padding:10px;line-height:1.5;border:1px solid var(--rule);border-radius:var(--btn-radius)}
 .cw textarea{resize:vertical;min-height:80px}.cw input[type=text]{min-height:44px}
 .cw textarea:focus-visible,.cw input:focus-visible,.cw button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
 .cw .cw-evidence{border-top:1px solid var(--rule);margin-top:18px;padding-top:12px}.cw .cw-progress{font-size:13px;color:var(--muted);margin:12px 0}
 .cw .cw-meter{height:9px;background:var(--rule);border-radius:8px;overflow:hidden}.cw .cw-meter div{height:100%;width:0;background:var(--accent-ink)}
 .cw .cw-checks{margin:18px 0;background:var(--soft);padding:13px;border-radius:var(--radius)}.cw .cw-checks label{display:flex;gap:9px;align-items:flex-start;margin:9px 0;font-size:14px}
 .cw .cw-checks input{margin-top:3px;accent-color:var(--accent-ink)}.cw .cw-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}
 .cw .cw-diff{display:grid;grid-template-columns:1fr 1fr;gap:12px}.cw .cw-paper{background:var(--soft);border-radius:6px;padding:12px;min-height:70px;white-space:pre-wrap;overflow-wrap:anywhere}
 .cw .cw-status{min-height:1.5em;font-size:13px;color:var(--muted)}
 @media(max-width:780px){.cw .cw-grid,.cw .cw-diff{grid-template-columns:1fr}.cw .cw-pane{padding:12px}}
 @media print{.cw .cw-actions{display:none!important}.cw{border:0}}
 </style>
 <div class="cw-kicker">Grade 8 ELA · Short Stories · Structured writing</div><h3>Core Writing Workshop</h3>
 <p class="cw-help">Based on your class writing task for <strong>${safe(task.title)}</strong>. Find quotations or accurate details from your assigned reading copy. Nothing is sent to your teacher or saved online.</p>
 <div class="cw-top"><div class="cw-kicker">The prompt</div><p class="cw-question">${safe(task.question)}</p><p><b>Length:</b> ${safe(task.length)}</p><p class="cw-help">${safe(task.context)}</p></div>
 <div class="cw-grid"><section class="cw-pane"><div class="cw-kicker">Step 1 · Plan</div>
 ${section("claim","Claim","Answer the actual question and take a clear position.")}
 ${evidence(1)}${evidence(2)}
 ${task.opposing?`<section class="cw-evidence"><h4>Counterargument</h4>${section("other","The opposing view and its evidence","What would a reader on the other side argue? Identify a specific detail.")}${section("reply","Your response","Explain why your argument still holds even considering that other evidence.")}</section>`:""}
 ${section("end","Concluding statement","Return to the message of your argument without simply copying your first sentence.")}
 </section>
 <section class="cw-pane"><div class="cw-kicker">Step 2 · Draft and revise</div>
 <p class="cw-help">Turn your organizer into connected writing. This workshop does not write the response for you.</p>
 ${section("draft","Your developed response","Integrate your claim, story evidence, explanations and conclusion.",9)}
 <p id="cw-progress" class="cw-progress" role="status" aria-live="polite"></p><div class="cw-meter" aria-hidden="true"><div id="cw-meter-fill"></div></div>
 <div class="cw-checks"><h4>Self-review: the actual assignment</h4>
 ${task.checks.map((x,i)=>`<label><input type="checkbox" data-cw-check="${i}"><span>${safe(x)}</span></label>`).join("")}
 <p class="cw-help">These checkboxes are your own reflection, not an automatic grade.</p></div>
 <h4>Step 3 · Make it stronger</h4><p class="cw-help">Save an early draft temporarily. Revise a weak explanation or make your claim more specific.</p>
 <div class="cw-actions"><button type="button" class="btn ghost" id="cw-save">Save earlier draft</button></div>
 <div class="cw-diff"><div><b>Before</b><div class="cw-paper" id="cw-before">No earlier draft saved.</div></div><div><b>Now</b><div class="cw-paper" id="cw-now">Draft appears here as you type.</div></div></div>
 ${section("reflect","Revision reflection","Which sentence or idea did you strengthen? How does that improve your answer?")}
 <div class="cw-top"><b>Peer conference (optional)</b><p class="cw-help">Ask a classmate: 'Can you find BOTH pieces of evidence? Which explanation shows WHY the evidence supports the claim?' For The Monkey's Paw, ask whether the opposing view gets a fair response.</p></div>
 <div class="cw-actions"><button type="button" class="btn" id="cw-download">Download my work</button><button type="button" class="btn ghost" id="cw-copy">Copy my work</button><button type="button" class="btn ghost" id="cw-clear">Clear</button></div>
 <p class="cw-status" id="cw-status" aria-live="polite">Your writing is only held in this open page. Download or copy it before leaving.</p>
 </section></div></div>`;
 const $=s=>el.querySelector(s),fields=[...el.querySelectorAll("[data-cw-field]")],checks=[...el.querySelectorAll("[data-cw-check]")];
 const value=id=>($("#cw-"+id)?.value||"").trim();
 function report(){
  const out=[task.title+" · Core Writing Workshop",task.question,"Claim:\n"+value("claim")];
  for(let i=1;i<=2;i++)out.push(task.kind[i-1]+(task.tech?" ["+value("tech"+i)+"]":"")+":\n"+value("ev"+i),"Explanation "+i+":\n"+value("why"+i));
  if(task.opposing)out.push("Opposing view and evidence:\n"+value("other"),"My reply:\n"+value("reply"));
  out.push("Conclusion:\n"+value("end"),"My developed response:\n"+value("draft"),"Before revision:\n"+(baseline||"(not saved)"),"Revision reflection:\n"+value("reflect"));
  out.push("Student self-check:\n"+checks.map((c,i)=>(c.checked?"[x] ":"[ ] ")+task.checks[i]).join("\n"));
  return out.join("\n\n")+"\n";
 }
 function update(){
  const needed=["claim","ev1","why1","ev2","why2","end","draft"].concat(task.tech?["tech1","tech2"]:[]).concat(task.opposing?["other","reply"]:[]);
  const done=needed.filter(x=>value(x)).length,words=value("draft")?value("draft").split(/\s+/).length:0;
  $("#cw-progress").textContent=done+" of "+needed.length+" organizer/draft parts started · "+words+" draft words. Review evidence quality yourself.";
  $("#cw-meter-fill").style.width=(100*done/needed.length)+"%";
  $("#cw-now").textContent=value("draft")||"Draft appears here as you type.";
 }
 fields.forEach(x=>x.addEventListener("input",update));
 $("#cw-save").onclick=()=>{if(!value("draft")){$("#cw-status").textContent="Write a draft first.";return;}baseline=value("draft");$("#cw-before").textContent=baseline;$("#cw-status").textContent="Earlier draft saved temporarily. Make a meaningful revision.";};
 $("#cw-copy").onclick=()=>{if(!navigator.clipboard?.writeText){$("#cw-status").textContent="Clipboard unavailable; use Download.";return;}navigator.clipboard.writeText(report()).then(()=>$("#cw-status").textContent="Copied. Paste into your own class document.").catch(()=>$("#cw-status").textContent="Copy blocked; use Download.");};
 $("#cw-download").onclick=()=>{const blob=new Blob([report()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="ela-core-writing-"+key+".txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);$("#cw-status").textContent="Work downloaded. Submit only through your teacher's approved system.";};
 $("#cw-clear").onclick=()=>{if(!window.confirm("Clear this writing, self-check and comparison draft?"))return;fields.forEach(x=>x.value="");checks.forEach(x=>x.checked=false);baseline="";$("#cw-before").textContent="No earlier draft saved.";$("#cw-status").textContent="Writing cleared.";update();};
 update();
}
H.lessonTools=Object.assign(H.lessonTools||{},{
 "stories/thankyou":el=>openTask(el,"thankyou"),
 "stories/summer":el=>openTask(el,"summer"),
 "stories/landlady":el=>openTask(el,"landlady"),
 "stories/paw":el=>openTask(el,"paw")
});
window.CoreWritingWorkshop={tasks:TASKS};
})();