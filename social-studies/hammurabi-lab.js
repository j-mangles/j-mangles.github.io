/* Hammurabi Court Lab: a source-first lesson activity. All responses stay in the current page. */
(function(){
  "use strict";
  const cases=[
    {id:"accuser",law:"Law 1",title:"The unproved accusation",short:"A person accuses a neighbour of a serious crime but cannot prove it.",source:"“If a man bring an accusation against a man, and charge him with a (capital) crime, but cannot prove it, he, the accuser, shall be put to death.”",translation:"Robert F. Harper, 1904",reading:"The law treats an unproved accusation as a serious threat to order. Its penalty is extreme by modern standards; the source does not tell us how often this sentence was carried out."},
    {id:"builder",law:"Law 229",title:"The fallen house",short:"A builder works carelessly. The house collapses and kills its owner.",source:"“If a builder build a house for some one, and does not construct it properly, and the house which he built fall in and kill its owner, then that builder shall be put to death.”",translation:"L. W. King, 1910",reading:"The builder is held responsible for a death caused by careless work. Ask whether a severe penalty could discourage unsafe building, and whether the law gives enough room for different circumstances."},
    {id:"doctor",law:"Law 218",title:"The failed surgery",short:"A doctor uses a bronze knife in surgery. The patient dies.",source:"“If a physician make a large incision with the operating knife, and kill him … his hands shall be cut off.”",translation:"L. W. King, 1910; ellipsis marks omitted words",reading:"The law threatens a severe punishment when surgery ends in death. It shows that professional work had consequences, but the text alone cannot tell us how courts judged a case or how often this penalty was used."}
  ];
  const classes=[
    {id:"landowner",victim:"Free landowner",law:"196",punishment:"The attacker’s own eye is put out.",recipient:"The punishment is bodily retaliation; no payment is listed."},
    {id:"commoner",victim:"Commoner (called a “freed man” in older translations)",law:"198",punishment:"The attacker pays one mina of silver.",recipient:"The law sets a payment amount instead of the same bodily punishment."},
    {id:"enslaved",victim:"Enslaved person",law:"199",punishment:"The attacker pays half the person’s price.",recipient:"The payment goes to the enslaved person’s owner, according to the law."}
  ];
  const evidence=[
    {id:"law1",label:"Law 1 · false accusation",point:"An accuser who cannot prove a capital charge faces death."},
    {id:"law229",label:"Laws 229–230 · builder",point:"The builder can be put to death; if the owner’s son dies, the builder’s son is punished."},
    {id:"laws196199",label:"Laws 196, 198 and 199 · eye injury",point:"The same injury brings different consequences depending on the victim’s social class."},
    {id:"prologue",label:"The Code’s prologue",point:"Hammurabi says his laws should stop “the strong” from harming “the weak.”"}
  ];
  const byId=(items,id)=>items.find(x=>x.id===id)||null;
  function buildArgument(position,ids){
    const selected=[...new Set(ids||[])].map(id=>byId(evidence,id)).filter(Boolean);
    if(!["order","fairness"].includes(position)||selected.length<2)return {ok:false,text:"Choose a position and at least two pieces of evidence."};
    return {ok:true,text:"I think the Code was more concerned with "+position+". "+selected.map((x,i)=>(i===0?"One example is ":"Another example is ")+x.label+": "+x.point).join(" ")+" This suggests…"};
  }
  function mount(root){
    if(!root)return;
    root.querySelectorAll("[data-reveal]").forEach(button=>button.addEventListener("click",function(){
      const card=button.closest("[data-case-card]");
      if(!card)return;
      card.querySelector("[data-case-outcome]").hidden=false;
      button.disabled=true;
      button.textContent="Historical decision revealed";
      card.querySelector("[data-case-status]").textContent="Now compare the source with your prediction.";
    }));
    root.querySelectorAll("[data-eye-check]").forEach(button=>button.addEventListener("click",function(){
      const card=button.closest("[data-eye-card]");
      const selected=card.querySelector("select").value;
      const feedback=card.querySelector("[data-eye-feedback]");
      const answer=byId(classes,selected);
      feedback.textContent=answer?answer.law+" · "+answer.punishment+" "+answer.recipient:"Choose a victim group first.";
      card.querySelector("[data-eye-details]").hidden=!answer;
    }));
    const form=root.querySelector("[data-argument]");
    if(form)form.addEventListener("click",function(event){
      if(!event.target.matches("[data-build-argument]"))return;
      const position=form.querySelector("[name=position]:checked");
      const ids=[...form.querySelectorAll("[name=evidence]:checked")].map(x=>x.value);
      const result=buildArgument(position?position.value:"",ids);
      form.querySelector("[data-argument-output]").textContent=result.text;
      form.querySelector("[data-argument-output]").classList.toggle("ready",result.ok);
    });
    const reset=root.querySelector("[data-clear]");
    if(reset)reset.addEventListener("click",function(){
      root.querySelectorAll("textarea").forEach(x=>x.value="");
      root.querySelectorAll("input[type=radio],input[type=checkbox]").forEach(x=>x.checked=false);
      root.querySelectorAll("select").forEach(x=>x.selectedIndex=0);
      root.querySelectorAll("[data-case-outcome],[data-eye-details]").forEach(x=>x.hidden=true);
      root.querySelectorAll("[data-reveal]").forEach(x=>{x.disabled=false;x.textContent="Reveal the historical decision";});
      root.querySelectorAll("[data-case-status],[data-eye-feedback],[data-argument-output]").forEach(x=>x.textContent="");
    });
  }
  window.HammurabiCourtLab={cases:cases,classes:classes,evidence:evidence,buildArgument:buildArgument,mount:mount};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>mount(document));
  else mount(document);
})();