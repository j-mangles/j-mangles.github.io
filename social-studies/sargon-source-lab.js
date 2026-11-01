/* Sargon's Empire Source Lab: browser-local evidence activities. */
(function(){
  "use strict";
  const claims=[
    {id:"king-list",answer:"source",why:"The Sumerian King List says Sargon served Ur-Zababa before taking power. It was compiled at least 200 years later, and copies do not always agree."},
    {id:"ishtar",answer:"claim",why:"The legend says Ishtar chose Sargon. That tells us what the story claims, but it cannot independently verify a goddess's action."},
    {id:"akkad",answer:"uncertain",why:"Akkad's exact location has not been found. The site is still unknown."},
    {id:"stele",answer:"claim",why:"The victory stele presents the king as favoured by the gods. The image shows a royal message; it cannot prove the gods caused the victory."},
    {id:"head",answer:"uncertain",why:"The bronze head may be Sargon or his grandson Naram-Sin. Historians are not sure."}
  ];
  const empire=[
    {id:"army",answer:"tool"},
    {id:"governors",answer:"tool"},
    {id:"language",answer:"tool"},
    {id:"religion",answer:"tool"},
    {id:"trade",answer:"tool"},
    {id:"rebellion",answer:"pressure"},
    {id:"drought",answer:"pressure"},
    {id:"gutians",answer:"pressure"}
  ];
  const labels={tool:"A tool Sargon used",pressure:"A pressure or limit"};
  function score(items,answers){
    const chosen=answers||{};
    const done=items.filter(x=>chosen[x.id]);
    const correct=done.filter(x=>chosen[x.id]===x.answer).length;
    return {done:done.length,total:items.length,correct:correct,complete:done.length===items.length,allCorrect:done.length===items.length&&correct===items.length};
  }
  function claimFeedback(answers){
    const result=score(claims,answers);
    if(!result.complete)return {score:result,text:"Choose a reading for all five claims before checking."};
    const misses=claims.filter(x=>answers[x.id]!==x.answer).map(x=>x.id);
    return {score:result,misses:misses,details:claims.map(x=>x.why)};
  }
  function empireFeedback(answers){
    const result=score(empire,answers);
    if(!result.complete)return {score:result,text:"Classify all eight cards before checking."};
    return {score:result,details:"Sargon’s inscription says 5,400 men ate bread daily before him. Historians debate whether this means a standing army or a large royal court. Other tools included loyal governors, Akkadian as a government language, religious influence and trade. Revolts and the Gutians challenged his rule. Drought is a debated explanation for the empire’s decline, so the lesson labels it as probable rather than certain."};
  }
  function buildAdvice(tool,reason){
    if(!tool)return "Choose one of Sargon’s tools first.";
    const why=(reason||"").trim();
    if(why.length<8)return "Add a reason explaining how your choice might help hold the empire together.";
    const names={army:"a loyal army",governors:"trusted governors",language:"one language of government",religion:"religious influence",trade:"trade"};
    return "I would rely most on "+(names[tool]||tool)+". My reason: "+why+" One limit to my plan is that revolt, invasion or drought could still threaten the empire.";
  }
  function mount(root){
    if(!root)return;
    const readChoices=selector=>Object.fromEntries([...root.querySelectorAll(selector)].map(x=>[x.dataset.id,x.value]));
    const claimButton=root.querySelector("[data-check-claims]");
    if(claimButton)claimButton.addEventListener("click",function(){
      const result=claimFeedback(readChoices("select[data-claim]"));
      const out=root.querySelector("[data-claim-output]");
      if(!result.score.complete){out.textContent=result.text;return;}
      const mark=Object.fromEntries(claims.map(x=>[x.id,readChoices("select[data-claim]")[x.id]===x.answer]));
      out.textContent=result.score.correct+" of 5 supported readings are strong. "+claims.map(x=>(mark[x.id]?"Good reading: ":"Revisit: ")+x.why).join(" ");
    });
    const empireButton=root.querySelector("[data-check-empire]");
    if(empireButton)empireButton.addEventListener("click",function(){
      const result=empireFeedback(readChoices("select[data-empire]"));
      const out=root.querySelector("[data-empire-output]");
      if(!result.score.complete){out.textContent=result.text;return;}
      const answers=readChoices("select[data-empire]");
      const correct=empire.filter(x=>answers[x.id]===x.answer).length;
      out.textContent=correct+" of 8 classifications match the lesson. "+result.details;
    });
    const adviceButton=root.querySelector("[data-build-advice]");
    if(adviceButton)adviceButton.addEventListener("click",function(){
      const tool=root.querySelector("[data-advice-tool]").value;
      const reason=root.querySelector("[data-advice-reason]").value;
      root.querySelector("[data-advice-output]").textContent=buildAdvice(tool,reason);
    });
    const clear=root.querySelector("[data-clear]");
    if(clear)clear.addEventListener("click",function(){
      root.querySelectorAll("select").forEach(x=>x.selectedIndex=0);
      root.querySelectorAll("textarea").forEach(x=>x.value="");
      root.querySelectorAll("[data-claim-output],[data-empire-output],[data-advice-output]").forEach(x=>x.textContent="");
    });
  }
  window.SargonSourceLab={claims:claims,empire:empire,score:score,claimFeedback:claimFeedback,empireFeedback:empireFeedback,buildAdvice:buildAdvice,mount:mount};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>mount(document));
  else mount(document);
})();