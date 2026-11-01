/* Grade 7 Math · Unit 1 · Lesson 8
   A low-stakes, in-browser routine for reading and solving contextual percent problems.
   Nothing is saved or submitted. */
(function installPercentContextStudio(){
  "use strict";
  const H=window.HUB;
  if(!H)return;

  const choose=list=>list[Math.floor(Math.random()*list.length)];
  const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

  function makeProblem(){
    const kind=choose(["percent","part","whole","sequence"]);
    if(kind==="percent"){
      const attempts=choose([20,40,60,80,100]);
      const rate=choose([55,60,65,70,75,80]);
      const made=attempts*rate/100;
      return {
        prompt:"A player made "+made+" of "+attempts+" free throws. The team scored 512 points and played 10 games. What percent of the player's free throws were made?",
        details:[{label:"Free throws made",value:made,needed:true},{label:"Free throws attempted",value:attempts,needed:true},{label:"Team points scored",value:512,needed:false},{label:"Games played",value:10,needed:false}],
        answer:rate,unit:"%",hint:"To find what percent, compare the part with the whole: part ÷ whole, then convert the decimal to a percent.",
        steps:"Part = "+made+" and whole = "+attempts+". Divide: "+made+" ÷ "+attempts+" = "+(made/attempts).toFixed(2)+". Convert to a percent: "+rate+"%."
      };
    }
    if(kind==="part"){
      const whole=choose([120,160,200,240,280,320]);
      const rate=choose([15,20,25,30,35,40,45,50,60,75]);
      const distractor=choose([18,24,36,48]);
      const answer=whole*rate/100;
      return {
        prompt:"At a school event, "+rate+"% of the "+whole+" students chose soccer. Another "+distractor+" students chose basketball. How many students chose soccer?",
        details:[{label:"Soccer",value:rate+"% of students",needed:true},{label:"Students at the event",value:whole,needed:true},{label:"Basketball votes",value:distractor,needed:false}],
        answer,unit:"students",hint:"The total number of students is 100%. Change the percent to a decimal, then multiply by the whole.",
        steps:rate+"% = "+(rate/100)+". Multiply: "+(rate/100)+" × "+whole+" = "+answer+". So "+answer+" students chose soccer."
      };
    }
    if(kind==="whole"){
      const rate=choose([20,25,30,40,50,60]);
      const whole=choose([40,50,60,80,100,120]);
      const part=whole*rate/100;
      const other=choose([7,11,14,16]);
      return {
        prompt:part+" students are "+rate+"% of the Grade 7 group. The school also has "+other+" student clubs. How many students are in Grade 7?",
        details:[{label:"Students in the described group",value:part,needed:true},{label:"Percent of Grade 7",value:rate+"%",needed:true},{label:"Student clubs",value:other,needed:false}],
        answer:whole,unit:"students",hint:"The part and its percent are known. Divide the part by the percent written as a decimal to find 100%.",
        steps:part+" students represent "+rate+"% = "+(rate/100)+" of the whole. Divide: "+part+" ÷ "+(rate/100)+" = "+whole+". There are "+whole+" students in Grade 7."
      };
    }
    const start=choose([160,200,240,280,320]);
    const first=choose([25,30,40,50]);
    const second=choose([20,25,40,50]);
    const afterFirst=start*(1-first/100);
    const secondSold=afterFirst*second/100;
    const answer=afterFirst-secondSold;
    const delivery=choose([12,18,24,32]);
    return {
      prompt:"A shop starts with "+start+" hockey sticks. It sells "+first+"% of the starting stock in week one, then "+second+"% of the sticks left in week two. How many sticks remain? The shop also received "+delivery+" boxes of pucks.",
      details:[{label:"Starting hockey sticks",value:start,needed:true},{label:"Sold in week one",value:first+"% of starting stock",needed:true},{label:"Sold in week two",value:second+"% of the remaining stock",needed:true},{label:"Boxes of pucks",value:delivery,needed:false}],
      answer,unit:"sticks",hint:"The second percent uses a new whole: first find how many sticks remain after week one, then find the second week's sales from that amount.",
      steps:"Week one: "+first+"% of "+start+" = "+(start*first/100)+" sold, leaving "+afterFirst+". Week two: "+second+"% of "+afterFirst+" = "+secondSold+" sold. Then "+afterFirst+" − "+secondSold+" = "+answer+" sticks remain."
    };
  }

  function mount(element){
    let problem=null,selected=new Set(),attempted=false,credited=false,solved=0,shown=0;
    element.innerHTML='<section class="pc-studio">'+
      '<style>'+
      '.pc-studio{color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius);padding:18px;line-height:1.5}'+
      '.pc-studio h3{margin:4px 0 6px}.pc-studio .pc-head{display:flex;justify-content:space-between;gap:12px;align-items:start;flex-wrap:wrap}'+
      '.pc-studio .pc-stats{font-size:13px;color:var(--muted)}.pc-studio .pc-panel{background:var(--soft);padding:14px;border-radius:var(--radius);margin:12px 0}'+
      '.pc-studio .pc-prompt{font-size:clamp(19px,2.6vw,24px);font-weight:650;margin:8px 0 14px}'+
      '.pc-studio .pc-data{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}'+
      '.pc-studio .pc-data button{background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:8px;padding:9px 12px;font:inherit;text-align:left;min-height:44px;cursor:pointer}'+
      '.pc-studio .pc-data button[aria-pressed="true"]{border:2px solid var(--accent-ink);background:var(--accent-soft);font-weight:700}'+
      '.pc-studio .pc-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:14px 0}'+
      '.pc-studio .pc-step{border-top:3px solid var(--accent);padding:7px 4px;font-size:12px;font-weight:700}'+
      '.pc-studio label{display:grid;gap:5px;font-weight:650;max-width:380px}.pc-studio input,.pc-studio textarea{box-sizing:border-box;width:100%;max-width:380px;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--rule);border-radius:var(--btn-radius);padding:10px;min-height:44px}'+
      '.pc-studio textarea{max-width:100%;min-height:66px}.pc-studio button:focus-visible,.pc-studio input:focus-visible,.pc-studio textarea:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
      '.pc-studio .pc-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.pc-studio .pc-feedback{min-height:1.5em;font-weight:650}.pc-studio .pc-solution{border-left:4px solid var(--accent);padding:10px 13px;background:var(--soft);margin:12px 0}'+
      '.pc-studio .pc-snapshot{border-top:1px solid var(--rule);margin-top:16px;padding-top:14px}'+
      '.pc-studio .pc-snapshot summary{font-weight:750;cursor:pointer;padding:8px 0}'+
      '.pc-studio .pc-snapshot-controls{display:flex;flex-wrap:wrap;align-items:end;gap:10px;margin:12px 0}'+
      '.pc-studio .pc-snapshot-controls label{flex:1 1 150px}'+
      '.pc-studio .pc-snapshot-controls input{max-width:180px}'+
      '.pc-studio .pc-snapshot-rows{display:grid;gap:10px;margin:12px 0}'+
      '.pc-studio .pc-snapshot-row{display:grid;grid-template-columns:minmax(180px,1.1fr) minmax(100px,1fr) minmax(170px,1fr);gap:12px;align-items:center;border:1px solid var(--rule);border-radius:8px;padding:10px}'+
      '.pc-studio .pc-snapshot-row label{font-size:14px}'+
      '.pc-studio .pc-snapshot-row input{max-width:110px}'+
      '.pc-studio .pc-track{height:16px;background:var(--soft);border-radius:999px;overflow:hidden}'+
      '.pc-studio .pc-track span{display:block;height:100%;width:0;background:var(--accent);transition:width .2s ease}'+
      '.pc-studio .pc-snapshot-result{font-size:13px}'+
      '.pc-studio .pc-snapshot-status{min-height:1.5em;font-weight:650}'+
      '@media(max-width:560px){.pc-studio{padding:12px}.pc-studio .pc-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.pc-studio .pc-step:last-child{grid-column:1/-1}}'+
      '</style>'+
      '<div class="pc-head"><div><div class="eyebrow">Number Workshop · Unit 1 · Lesson 8</div><h3>Percent in Context Studio</h3><p class="note" style="margin:0">Read carefully, choose the useful data, solve, check, and state your answer.</p></div><p class="pc-stats" id="pc-stats" aria-live="polite"></p></div>'+
      '<div class="pc-steps" aria-label="Five-step problem routine"><div class="pc-step">1 · Read</div><div class="pc-step">2 · Represent</div><div class="pc-step">3 · Solve</div><div class="pc-step">4 · Check</div><div class="pc-step">5 · State</div></div>'+
      '<div class="pc-panel"><p id="pc-prompt" class="pc-prompt"></p><p><strong>Represent:</strong> Select every piece of information you need. Leave out details that do not help answer the question.</p><div class="pc-data" id="pc-data" role="group" aria-label="Choose the information needed"></div></div>'+
      '<form id="pc-form"><label for="pc-answer">Your numerical answer <span class="note" id="pc-unit"></span></label><div class="pc-actions"><input id="pc-answer" inputmode="decimal" autocomplete="off" placeholder="Estimate first, then calculate"><button class="btn" type="submit">Check my setup and answer</button></div></form>'+
      '<p class="pc-feedback" id="pc-feedback" role="status" aria-live="polite"></p><p class="note" id="pc-hint" hidden></p>'+
      '<div class="pc-actions"><button class="btn ghost" type="button" id="pc-hint-button">Give me a hint</button><button class="btn ghost" type="button" id="pc-solution-button" disabled>Show worked model after an attempt</button><button class="btn" type="button" id="pc-next">New problem</button></div>'+
      '<div class="pc-solution" id="pc-solution" hidden></div>'+
      '<label for="pc-sentence">State your answer in a sentence with units <span class="note">(optional; stays on this page)</span></label><textarea id="pc-sentence" placeholder="For example: ___ students chose soccer."></textarea>'+
      '<p class="note">Practice is not graded or submitted. Your response clears when you leave this lesson.</p>'+
      '<details class="pc-snapshot"><summary>Class Snapshot Data Lab · count, convert, predict</summary>'+
      '<p class="note">Use your class tally to convert a sample into a fraction, decimal, and percent. A sample prediction is an estimate, not a guarantee.</p>'+
      '<div class="pc-snapshot-controls"><label for="pc-class-size">Class size<input id="pc-class-size" type="number" min="1" step="1" inputmode="numeric" placeholder="e.g. 26"></label>'+
      '<label for="pc-grade-size">Grade 7 group size<input id="pc-grade-size" type="number" min="1" step="1" inputmode="numeric" placeholder="optional"></label>'+
      '<button class="btn" type="button" id="pc-snapshot-calc">Calculate snapshot</button><button class="btn ghost" type="button" id="pc-snapshot-reset">Clear counts</button></div>'+
      '<div class="pc-snapshot-rows">'+
      '<div class="pc-snapshot-row"><label for="pc-count-0">I have at least one sibling · yes count<input id="pc-count-0" data-snapshot-count type="number" min="0" step="1" inputmode="numeric"></label><div class="pc-track" aria-hidden="true"><span id="pc-bar-0"></span></div><div class="pc-snapshot-result" id="pc-result-0"></div></div>'+
      '<div class="pc-snapshot-row"><label for="pc-count-1">I have a pet at home · yes count<input id="pc-count-1" data-snapshot-count type="number" min="0" step="1" inputmode="numeric"></label><div class="pc-track" aria-hidden="true"><span id="pc-bar-1"></span></div><div class="pc-snapshot-result" id="pc-result-1"></div></div>'+
      '<div class="pc-snapshot-row"><label for="pc-count-2">I walk or bike to school · yes count<input id="pc-count-2" data-snapshot-count type="number" min="0" step="1" inputmode="numeric"></label><div class="pc-track" aria-hidden="true"><span id="pc-bar-2"></span></div><div class="pc-snapshot-result" id="pc-result-2"></div></div>'+
      '<div class="pc-snapshot-row"><label for="pc-count-3">I play a musical instrument · yes count<input id="pc-count-3" data-snapshot-count type="number" min="0" step="1" inputmode="numeric"></label><div class="pc-track" aria-hidden="true"><span id="pc-bar-3"></span></div><div class="pc-snapshot-result" id="pc-result-3"></div></div>'+
      '<div class="pc-snapshot-row"><label for="pc-count-4">I prefer summer to winter · yes count<input id="pc-count-4" data-snapshot-count type="number" min="0" step="1" inputmode="numeric"></label><div class="pc-track" aria-hidden="true"><span id="pc-bar-4"></span></div><div class="pc-snapshot-result" id="pc-result-4"></div></div>'+
      '</div><p class="pc-snapshot-status" id="pc-snapshot-status" role="status" aria-live="polite">Enter class size and tally counts to begin.</p>'+
      '<p class="note">No student names are entered. Counts stay on this page and clear when you leave the lesson.</p></details></section>';
    const $=selector=>element.querySelector(selector);
    function draw(){
      problem=makeProblem();selected=new Set();attempted=false;credited=false;shown++;$("#pc-prompt").textContent=problem.prompt;
      $("#pc-data").innerHTML=problem.details.map((item,index)=>'<button type="button" data-item="'+index+'" aria-pressed="false">'+escapeHTML(item.label)+': <strong>'+escapeHTML(item.value)+'</strong></button>').join("");
      $("#pc-data").querySelectorAll("button").forEach(button=>button.onclick=()=>{
        const index=Number(button.dataset.item);
        if(selected.has(index))selected.delete(index);else selected.add(index);
        button.setAttribute("aria-pressed",String(selected.has(index)));
      });
      $("#pc-unit").textContent=problem.unit==="%"?"(enter a percent number, such as 65)":problem.unit?"("+problem.unit+")":"";
      $("#pc-answer").value="";$("#pc-sentence").value="";$("#pc-feedback").textContent="";
      $("#pc-hint").hidden=true;$("#pc-hint").textContent="";
      $("#pc-solution").hidden=true;$("#pc-solution").textContent="";
      $("#pc-solution-button").disabled=true;$("#pc-solution-button").textContent="Show worked model after an attempt";
      $("#pc-stats").textContent=solved+" solved · "+shown+" problems tried";
    }
    $("#pc-form").onsubmit=event=>{
      event.preventDefault();
      const raw=$("#pc-answer").value.trim().replace(/[%,$\s]/g,"");
      if(!raw||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)){ $("#pc-feedback").textContent="Enter a number, then check your work.";return;}
      const answer=Number(raw);
      if(!Number.isFinite(answer)){ $("#pc-feedback").textContent="That number could not be checked.";return;}
      attempted=true;$("#pc-solution-button").disabled=false;$("#pc-solution-button").textContent="Show worked model";
      const correct=Math.abs(answer-problem.answer)<0.01;
      const needed=problem.details.map((item,index)=>item.needed?index:-1).filter(index=>index>=0);
      const setup=needed.length===selected.size&&needed.every(index=>selected.has(index));
      if(correct){if(!credited){solved++;credited=true;}$("#pc-feedback").textContent=(setup?"Good setup and answer. ":"Your answer is right; review which details were needed. ")+"Estimate check: does the result fit the size of the whole?";}
      else $("#pc-feedback").textContent=(setup?"Your data selection is sound. ":"Review the data you selected. ")+"Check whether you found the part, whole, percent, or a new remainder.";
      $("#pc-stats").textContent=solved+" solved · "+shown+" problems tried";
    };
    $("#pc-hint-button").onclick=()=>{$("#pc-hint").hidden=false;$("#pc-hint").textContent=problem.hint;};
    $("#pc-solution-button").onclick=()=>{
      if(!attempted)return;
      $("#pc-solution").hidden=false;$("#pc-solution").innerHTML="<strong>Worked model:</strong> "+escapeHTML(problem.steps);
    };
    $("#pc-next").onclick=()=>{draw();$("#pc-answer").focus({preventScroll:true});};
    draw();
  }
  H.lessonTools=Object.assign(H.lessonTools||{},{"fdp/l08":mount});
})();
