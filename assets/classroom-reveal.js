/* A board-sized view with the same reveal, replay and keyboard controls in both subjects. */
(() => {
  "use strict";
  function open({trigger,title,prompt,steps,nextLabel,draw,setup}){
    const dialog=document.createElement("dialog");
    dialog.className="classroom-reveal";
    dialog.setAttribute("aria-label",title);
    dialog.innerHTML='<header><h2></h2><button type="button" data-close>Back to activity</button></header><p class="reveal-prompt"></p><div data-settings></div><div class="reveal-stage"></div><div class="reveal-controls"><button type="button" data-next autofocus></button><button type="button" data-reset>Start over</button><p class="reveal-answer" role="status"></p></div>';
    const get=selector=>dialog.querySelector(selector);
    const next=get("[data-next]"),restart=get("[data-reset]"),stage=get(".reveal-stage");
    get("h2").textContent=title;get(".reveal-prompt").textContent=prompt;
    let step=0;
    function paint(){
      get(".reveal-answer").textContent=draw(stage,step)||"";
      next.textContent=nextLabel;next.disabled=step===steps;restart.disabled=step===0;
    }
    function reset(){step=0;paint();}
    if(setup)setup(get("[data-settings]"),reset);
    next.onclick=()=>{if(step<steps)step++;paint();if(step===steps)restart.focus({preventScroll:true});};
    restart.onclick=()=>{reset();next.focus({preventScroll:true});};
    get("[data-close]").onclick=()=>dialog.close();
    dialog.addEventListener("keydown",event=>{if(event.key==="Escape")event.stopPropagation();});
    dialog.onclose=()=>{
      dialog.remove();
      if(location.hash==="#project")history.replaceState(null,"",location.pathname+location.search);
      trigger.focus({preventScroll:true});
    };
    document.body.append(dialog);paint();dialog.showModal();
  }
  window.ClassroomReveal={open};
})();
