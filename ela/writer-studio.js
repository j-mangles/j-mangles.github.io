(function installWriterStudio(){
"use strict";
/* Student-controlled writing scaffold. Local only; never collects or submits work. */
const H=window.HUB;if(!H)return;
const quote=[
 "She had read the room number at least ten times, but she checked it again anyway.",
 "When the bell rang, she still didn't go in.",
 "She adjusted her backpack straps, even though they were already tight enough.",
 "She pushed open the door and walked toward an empty desk in the third row, the same seat she always picked when she wanted to see the board but not be seen.",
 "Maya's shoulders relaxed a little.",
 "She still didn't know anyone else in the room, but at least she knew where room 108 was, and that felt like something."
];
const prompts=[
 "Why did Maya choose the desk in the third row?",
 "By the end of the passage, has Maya's nervousness completely disappeared?",
 "What does Ms. Alvarez's comment suggest about her classroom?"
];
function studio(el){
 let chosen=0, drafts=Object.create(null);
 const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 el.innerHTML=`<div class="ws">
 <style>
  .ws{font-family:var(--f-body,inherit);color:var(--ink);line-height:1.55}
  .ws .ws-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:18px;align-items:start}
  .ws .ws-paper{background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius,10px);padding:18px}
  .ws .ws-passage{font-family:var(--f-big,Georgia,serif);font-size:17px;line-height:1.75}
  .ws .ws-passage p{margin:12px 0}
  .ws .ws-quote-list{display:grid;gap:7px;margin:12px 0}
  .ws .ws-quote-list button{width:100%;text-align:left;line-height:1.5;font-size:14px}
  .ws label.ws-label{display:block;font-weight:700;margin:12px 0 5px}
  .ws textarea,.ws select{display:block;width:100%;box-sizing:border-box;background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);padding:10px 12px;color:var(--ink);font:inherit}
  .ws textarea{min-height:88px;resize:vertical;line-height:1.5}
  .ws textarea:focus-visible,.ws select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .ws .ws-lbl{font-family:var(--f-label,inherit);font-weight:650;text-transform:uppercase;letter-spacing:.03em;font-size:12px;color:var(--accent-ink,var(--accent))}
  .ws .ws-preview{min-height:90px;white-space:pre-wrap;overflow-wrap:anywhere;font-family:var(--f-big,Georgia,serif);font-size:18px;line-height:1.65}
  .ws .ws-actions{display:flex;gap:9px;flex-wrap:wrap;margin:12px 0}
  .ws .ws-check{display:grid;gap:8px;margin-top:12px}
  .ws .ws-check label{display:flex;gap:10px;align-items:flex-start;font-size:15px}
  .ws .ws-check input{accent-color:var(--accent);margin-top:5px}
  @media(max-width:800px){.ws .ws-grid{grid-template-columns:1fr}.ws .ws-paper{padding:13px}}
 </style>
 <div class="eyebrow">Answer · Evidence · Explain</div>
 <h2>Writer's Studio</h2>
 <p class="note">Read an original classroom passage. Choose a question, build your own answer, select useful evidence, and explain how it proves your point. There is no automatic grade: you decide whether your reasoning is convincing.</p>
 <div class="ws-grid">
  <div>
   <section class="ws-paper" aria-label="Reading passage">
    <div class="ws-lbl">Reading · New Room</div>
    <div class="ws-passage">
     <p>Maya stood outside room 108, her schedule already damp from being folded and unfolded so many times. She had read the room number at least ten times, but she checked it again anyway. Down the hall, lockers slammed and voices bounced off the tile floor, but Maya didn't move. She adjusted her backpack straps, even though they were already tight enough. When the bell rang, she still didn't go in.</p>
     <p>A boy from her old elementary school, Sam, spotted her from across the hall and waved. “Room 108? Ms. Alvarez is actually pretty chill,” he said, walking past. Maya let out a breath she didn't know she'd been holding. She pushed open the door and walked toward an empty desk in the third row, the same seat she always picked when she wanted to see the board but not be seen.</p>
     <p>Ms. Alvarez looked up from her desk and smiled. “You must be new. Grab any seat you like.” Maya's shoulders relaxed a little. She still didn't know anyone else in the room, but at least she knew where room 108 was, and that felt like something.</p>
    </div>
    <div class="ws-lbl" style="margin-top:18px">Evidence finder</div>
    <p class="note">Choose a line that supports <em>your specific answer</em>. Clicking a line fills the Evidence box; you can edit it.</p>
    <div class="ws-quote-list">
     ${quote.map((q,i)=>`<button class="opt" type="button" data-quote="${i}">${esc(q)}</button>`).join("")}
    </div>
   </section>
  </div>
  <div>
   <section class="ws-paper">
    <div class="ws-lbl">Step 1 · Choose your question</div>
    <label for="ws-q" class="ws-label">Question</label>
    <select id="ws-q">${prompts.map((q,i)=>`<option value="${i}">${esc(q)}</option>`).join("")}</select>
    <label class="ws-label" for="ws-answer"><span class="ws-lbl">A · Answer</span> — Make a clear claim</label>
    <textarea id="ws-answer" rows="3" placeholder="My answer is…"></textarea>
    <label class="ws-label" for="ws-evidence"><span class="ws-lbl">E · Evidence</span> — Quote or describe a specific detail</label>
    <textarea id="ws-evidence" rows="3" placeholder="For example, the passage says…"></textarea>
    <label class="ws-label" for="ws-explain"><span class="ws-lbl">E · Explain</span> — Show how that evidence supports the claim</label>
    <textarea id="ws-explain" rows="4" placeholder="This suggests… because…"></textarea>
    <p class="note"><b>Writer's tip:</b> If the Explanation could be replaced by “This proves my point,” dig deeper and say <em>how</em> it proves your point.</p>
   </section>
   <section class="ws-paper" style="margin-top:16px">
    <div class="ws-lbl">Step 2 · Read your paragraph</div>
    <div id="ws-preview" class="ws-preview" aria-live="polite">Your draft will appear here as you write.</div>
    <div class="note" id="ws-count">0 words</div>
    <div class="ws-check" role="group" aria-label="Writing self-check">
     <label><input type="checkbox" data-check="claim">My answer directly responds to the question.</label>
     <label><input type="checkbox" data-check="evidence">My evidence is specific and accurate.</label>
     <label><input type="checkbox" data-check="explanation">My explanation shows how the evidence supports the claim.</label>
     <label><input type="checkbox" data-check="revision">I reread the paragraph and revised anything unclear.</label>
    </div>
    <div class="ws-actions">
     <button class="btn" id="ws-download" type="button">Download draft</button>
     <button class="btn ghost" id="ws-copy" type="button">Copy draft</button>
     <button class="btn ghost" id="ws-clear" type="button">Start over</button>
    </div>
    <p class="note" id="ws-status" aria-live="polite">Your work is not collected or saved online. Download or copy it before leaving this page.</p>
   </section>
  </div>
 </div>
 </div>`;
 const $=q=>el.querySelector(q),$$=q=>[...el.querySelectorAll(q)];
 const inputs=[$("#ws-answer"),$("#ws-evidence"),$("#ws-explain")];
 const checks=$$("[data-check]");
 const qEl=$("#ws-q");
 function draft(){return {text:inputs.map(x=>x.value),checks:checks.map(x=>x.checked)};}
 function populate(d){inputs.forEach((x,i)=>{x.value=d?.text?.[i]||"";});checks.forEach((x,i)=>{x.checked=!!d?.checks?.[i];});renderPreview();}
 function paragraph(){return inputs.map(x=>x.value.trim()).filter(Boolean).join(" ");}
 function renderPreview(){
  const txt=paragraph();
  $("#ws-preview").textContent=txt||"Your draft will appear here as you write.";
  $("#ws-count").textContent=(txt?txt.split(/\s+/).length:0)+" words · "+inputs.filter(x=>x.value.trim()).length+" of 3 parts drafted";
 }
 function report(){
  return ["Writer's Studio · New Room",prompts[chosen],
    "Answer:\n"+inputs[0].value.trim(),
    "Evidence:\n"+inputs[1].value.trim(),
    "Explain:\n"+inputs[2].value.trim(),
    "Paragraph:\n"+paragraph(),
    "Self-check:\n"+checks.map((x,i)=>(x.checked?"[x] ":"[ ] ")+["Answer responds to question","Specific evidence","Explanation supports claim","Revised for clarity"][i]).join("\n")
  ].join("\n\n")+"\n";
 }
 qEl.onchange=()=>{
  const next=Number(qEl.value);
  if(next===chosen)return;
  drafts[chosen]=draft();chosen=next;populate(drafts[chosen]);
  $("#ws-status").textContent="Question changed. The previous question's draft is kept while you stay on this page.";
 };
 inputs.forEach(x=>x.addEventListener("input",renderPreview));
 $$("[data-quote]").forEach(b=>b.onclick=()=>{
  $("#ws-evidence").value="“"+quote[Number(b.dataset.quote)]+"”";
  renderPreview();
  $("#ws-evidence").focus();
  $("#ws-status").textContent="Quotation added to Evidence. Check that it actually supports the answer you wrote.";
 });
 $("#ws-clear").onclick=()=>{
  if(!window.confirm("Clear this question's draft and checkboxes?"))return;
  delete drafts[chosen];populate(null);
  $("#ws-status").textContent="Current draft cleared.";
 };
 $("#ws-download").onclick=()=>{
  const blob=new Blob([report()],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob),link=document.createElement("a");
  link.href=url;link.download="writers-studio-new-room.txt";
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#ws-status").textContent="Draft downloaded. Submit it only through your teacher's approved system.";
 };
 $("#ws-copy").onclick=()=>{
  if(!navigator.clipboard?.writeText){$("#ws-status").textContent="Copy isn't supported here. Download your draft instead.";return;}
  navigator.clipboard.writeText(report()).then(()=>{$("#ws-status").textContent="Draft copied. Paste it into your own document.";})
  .catch(()=>{$("#ws-status").textContent="Copy failed. Download your draft instead.";});
 };
 populate(null);
}
H.lessonTools=Object.assign(H.lessonTools||{},{"answering/day2":studio});
})();
