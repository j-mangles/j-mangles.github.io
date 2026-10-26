/* English 8 · Every Shot Is a Choice: The Present
 * Guided by the student's original viewing guide (shot toolkit + practice A-D).
 * Original diagrams use an invented field scene, NOT film footage or spoilers.
 * Student selections and explanations are ephemeral; no account or assessment data.
 */
(function(){
"use strict";
const H=window.HUB;if(!H)return;
const SHOTS=[
 {id:"extreme-long",name:"Extreme long shot",feature:"A huge space; a character can look tiny or isolated.",intent:"Establish the location or emphasize a person's place in a large environment."},
 {id:"long",name:"Long shot",feature:"Usually shows a whole character with some of their surroundings.",intent:"Show action, body language, and the relationship between a character and the setting."},
 {id:"medium",name:"Medium shot",feature:"Shows roughly the waist up.",intent:"Make conversation, gestures, and relationships easier to read."},
 {id:"close",name:"Close-up",feature:"Highlights a face, perhaps including the shoulders.",intent:"Draw attention to emotion and a character's reaction."},
 {id:"extreme-close",name:"Extreme close-up",feature:"Isolates a small detail such as eyes, a hand, or an object.",intent:"Force viewers to notice a clue or significant detail."}
];
const SCENES=[
 {id:"alone",title:"Scene A · Alone on the field",prompt:"Everyone has left. You want viewers to feel how alone one character is."},
 {id:"text",title:"Scene B · A life-changing message",prompt:"A character reads a text that changes everything, and you want viewers to read it too."},
 {id:"lockers",title:"Scene C · Arguing at lockers",prompt:"Two friends argue. You want viewers to see both students' body language."},
 {id:"reaction",title:"Scene D · The news sinks in",prompt:"A character learns her best friend is moving away. You want us to notice her reaction."}
];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function shotSVG(id){
 if(!SHOTS.some(x=>x.id===id))throw Error("Unknown camera shot");
 const w=720,h=334,center=345;
 let scene='<rect width="'+w+'" height="'+h+'" fill="#AFC4DB"/>'+
  '<path d="M0 174 Q140 147 290 180 T720 170 L720 334 L0 334Z" fill="#96B79B"/>'+
  '<path d="M0 246 L720 233 L720 334 L0 334Z" fill="#719D7D"/>'+
  '<path d="M52 245 L101 190 L118 245 M612 229 L645 183 L661 229" stroke="#4D7B70" stroke-width="3" fill="none"/>';
 function person(x,y,scale){
  return '<g transform="translate('+x+' '+y+') scale('+scale+')" stroke-linecap="round" stroke-linejoin="round">'+
   '<circle cx="0" cy="-120" r="20" fill="#E1B48C" stroke="#534D5A" stroke-width="2"/>'+
   '<path d="M-14 -141 Q0 -160 16 -140" stroke="#393446" fill="none" stroke-width="10"/>'+
   '<path d="M-25 -93 L25 -93 L28 -22 L-28 -22Z" fill="#B67775" stroke="#554052" stroke-width="2"/>'+
   '<path d="M-25 -83 L-43 -33 M25 -83 L40 -32 M-13 -20 L-16 40 M13 -20 L16 40" fill="none" stroke="#39394F" stroke-width="12"/>'+
   '<path d="M-16 40 L-33 42 M16 40 L33 42" stroke="#454450" stroke-width="8"/>'+
   '</g>';
 }
 if(id==="extreme-long")scene+=person(center,273,.28);
 if(id==="long")scene+=person(center,258,1.06);
 if(id==="medium")scene+='<g transform="translate(0 0)">'+person(center,403,2.15)+'</g>';
 if(id==="close")scene+=person(center,751,5.3);
 if(id==="extreme-close"){
   scene='<rect width="'+w+'" height="'+h+'" fill="#E1B48C"/>'+
    '<path d="M-30 15 Q360 -92 754 11 L754 84 Q350 19 -30 91Z" fill="#44374B"/>'+
    '<path d="M120 145 Q230 93 342 145 Q230 215 120 145Z M386 145 Q506 93 619 145 Q506 215 386 145Z" fill="#F8F4EE" stroke="#55414B" stroke-width="9"/>'+
    '<circle cx="238" cy="153" r="31" fill="#6D858D"/><circle cx="504" cy="153" r="31" fill="#6D858D"/>'+
    '<circle cx="238" cy="153" r="16" fill="#282E3C"/><circle cx="504" cy="153" r="16" fill="#282E3C"/>'+
    '<path d="M358 164 Q337 230 365 240" fill="none" stroke="#BA836E" stroke-width="11"/>';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 334" role="img" aria-label="Original, fictional scene demonstrating a '+esc(SHOTS.find(x=>x.id===id).name)+
  '. Framing illustration; not a frame from The Present." style="display:block;width:100%;height:auto;max-width:720px">'+
  scene+'<rect x="7" y="7" width="706" height="320" rx="8" stroke="#F7F0E6" stroke-width="12" fill="none"/>'+
  '<rect x="20" y="278" width="680" height="34" rx="5" fill="#24314A" opacity=".92"/>'+
  '<text x="33" y="300" fill="#FFFFFF" font-size="17" font-weight="700">'+esc(SHOTS.find(x=>x.id===id).name)+'</text></svg>';
}
function exportResponse(answers){
 return "ENGLISH 8 · EVERY SHOT IS A CHOICE\nPractice: You're the Director\n\n"+
  SCENES.map((s,i)=>s.title+"\nShot: "+(SHOTS.find(x=>x.id===answers[i].shot)?.name||"[choose a shot]")+
   "\nWhy: "+(answers[i].reason.trim()||"[add your reason]")).join("\n\n")+
  "\n\nFilm follow-up: Describe one moment when the director controls what viewers can see and explain its effect.";
}
function render(el){
 let selected=SHOTS[0].id,active=0,answers=SCENES.map(()=>({shot:"",reason:""}));
 const $=q=>el.querySelector(q),all=q=>[...el.querySelectorAll(q)];
 el.innerHTML='<section class="shot-studio"><style>'+
 '.shot-studio{color:var(--ink);font:inherit;line-height:1.55}'+
 '.shot-studio .ss-choice{display:flex;gap:7px;flex-wrap:wrap;margin:15px 0}'+
 '.shot-studio .ss-choice button,.shot-studio .ss-scene-buttons button{font:inherit;cursor:pointer;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:7px;min-height:44px;padding:8px 13px}'+
 '.shot-studio button[aria-pressed=true]{background:var(--accent-soft);border-color:var(--accent);font-weight:750}'+
 '.shot-studio button:focus-visible,.shot-studio select:focus-visible,.shot-studio textarea:focus-visible{outline:3px solid var(--accent);outline-offset:3px}'+
 '.shot-studio .ss-visual{background:#E1E7EE;border:1px solid var(--rule);border-radius:9px;overflow:hidden;max-width:720px}'+
 '.shot-studio .ss-notes{max-width:720px;padding:15px;background:var(--soft);border-radius:9px;margin:12px 0}'+
 '.shot-studio .ss-practice{border:1px solid var(--rule);background:var(--paper);border-radius:11px;padding:19px;margin-top:24px}'+
 '.shot-studio .ss-scene-buttons{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}'+
 '.shot-studio label{display:grid;gap:6px;font-size:14px;font-weight:700;margin:12px 0}'+
 '.shot-studio select,.shot-studio textarea{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:7px;padding:9px;max-width:100%}'+
 '.shot-studio select{min-height:44px}.shot-studio textarea{width:100%;min-height:100px}'+
 '.shot-studio .ss-status{font-weight:700;color:var(--accent-ink);min-height:25px}'+
 '</style><div class="eyebrow">English 8 · Media & Film</div>'+
 '<h2>Every Shot Is a Choice</h2>'+
 '<p>Compare how a director changes what you see. These are <strong>original practice drawings, not film frames.</strong> Use this before or after viewing <em>The Present</em>.</p>'+
 '<div class="ss-choice" role="group" aria-label="Choose camera shot distance" id="ss-shots"></div>'+
 '<div class="ss-visual" id="ss-image"></div>'+
 '<div class="ss-notes" id="ss-explain" aria-live="polite"></div>'+
 '<section class="ss-practice"><h3>You’re the director</h3><p>Choose the shot for each situation. <strong>More than one shot may work.</strong> Defend your choice by describing what viewers can see and what remains outside the frame.</p>'+
 '<div class="ss-scene-buttons" role="group" aria-label="Choose directing situation" id="ss-scenes"></div>'+
 '<p id="ss-situation"></p><label>Shot distance<select id="ss-choice"></select></label>'+
 '<label>What would the viewer notice? Why choose this shot?<textarea id="ss-reason" placeholder="I would use this shot because… The audience would see…"></textarea></label>'+
 '<button id="ss-copy" class="btn" type="button">Copy my four responses</button><p class="ss-status" id="ss-status" role="status" aria-live="polite"></p>'+
 '<p class="note">You can revisit each situation. Your responses stay only on this page—copy them before leaving.</p></section>'+
 '<p class="note">Viewing reflection: In <em>The Present</em>, what information does the director keep out of the frame? Describe a specific moment without inventing dialogue.</p></section>';
 $("#ss-shots").innerHTML=SHOTS.map(x=>'<button type="button" data-shot="'+x.id+'">'+x.name+'</button>').join("");
 $("#ss-scenes").innerHTML=SCENES.map((x,i)=>'<button type="button" data-scene="'+i+'">Scene '+String.fromCharCode(65+i)+'</button>').join("");
 $("#ss-choice").innerHTML='<option value="">Choose a shot</option>'+SHOTS.map(x=>'<option value="'+x.id+'">'+x.name+'</option>').join("");
 function updateVisual(){
  const s=SHOTS.find(x=>x.id===selected);
  $("#ss-image").innerHTML=shotSVG(selected);
  $("#ss-explain").textContent=s.feature+" Why a director might use it: "+s.intent;
  all("[data-shot]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.shot===selected)));
 }
 function showScene(){
  const s=SCENES[active];
  $("#ss-situation").textContent=s.title+". "+s.prompt;
  $("#ss-choice").value=answers[active].shot;
  $("#ss-reason").value=answers[active].reason;
  all("[data-scene]").forEach(x=>x.setAttribute("aria-pressed",String(Number(x.dataset.scene)===active)));
  const done=answers.filter(x=>x.shot&&x.reason.trim()).length;
  $("#ss-status").textContent=done+" of 4 situations explained.";
 }
 all("[data-shot]").forEach(btn=>btn.onclick=()=>{selected=btn.dataset.shot;updateVisual();});
 all("[data-scene]").forEach(btn=>btn.onclick=()=>{active=Number(btn.dataset.scene);showScene();});
 $("#ss-choice").onchange=e=>{
  answers[active].shot=e.target.value;
  if(e.target.value){selected=e.target.value;updateVisual();}
  showScene();
 };
 $("#ss-reason").oninput=e=>{answers[active].reason=e.target.value;};
 $("#ss-copy").onclick=()=>{
  if(!answers.some(x=>x.shot&&x.reason.trim())){$("#ss-status").textContent="Choose a shot and write one explanation first.";return;}
  const content=exportResponse(answers),status=$("#ss-status");
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(content).then(()=>status.textContent="Copied—paste into your class document.").catch(()=>status.textContent="Clipboard unavailable. Select and copy your writing manually.");
  else status.textContent="Clipboard unavailable. Select and copy your writing manually.";
 };
 updateVisual();showScene();
}
H.tools=H.tools||{};H.tools.film=render;
window.CameraStudioCore={SHOTS,SCENES,shotSVG,exportResponse};
})();
