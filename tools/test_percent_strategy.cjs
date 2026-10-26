/* Deterministic smoke test for the Grade 7 Percent Strategy Studio. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const js=fs.readFileSync(path.join(root,"math","percent-strategy.js"),"utf8");
const fakeMath=Object.create(Math);fakeMath.random=()=>0;
const ctx={window:{HUB:{subject:"math",lessonTools:{}}},Math:fakeMath};
vm.runInNewContext(js,ctx,{timeout:2000});
const H=ctx.window.HUB,P=H.percentStrategy.makeProblem;
assert.equal(P("part",25,80).answer,20);
assert.equal(P("whole",30,60).answer,60);
assert.equal(P("whole",30,60).question,"18 is 30% of what number?");
assert.equal(P("discount",25,80).answer,60);
assert.match(P("discount",25,80).steps,/BEFORE tax/);
for(const id of ["fdp/l05","fdp/l06","fdp/l09"])assert.equal(typeof H.lessonTools[id],"function");
const index=fs.readFileSync(path.join(root,"math","index.html"),"utf8");
assert.ok(index.indexOf('src="percent-strategy.js"')>=0);
assert.ok(index.indexOf('src="percent-strategy.js"')<index.indexOf('src="../assets/hub.js"'));
const element=(dataset={})=>({value:"",innerHTML:"",textContent:"",hidden:false,dataset,attrs:{},setAttribute(k,v){this.attrs[k]=v;}});
const nodes=new Map(),levels=[element({level:"friendly"}),element({level:"stretch"})];
const el={
 innerHTML:"",
 querySelector(q){if(!nodes.has(q))nodes.set(q,element());return nodes.get(q);},
 querySelectorAll(q){assert.ok(q==="#ps-form"||q==="[data-level]","Unexpected selector "+q);return q==="#ps-form"?[this.querySelector(q)]:levels;}
};
H.lessonTools["fdp/l05"](el);
const get=q=>el.querySelector(q);
assert.match(el.innerHTML,/Percent Strategy Studio/);
assert.match(get("#ps-question").textContent,/10% of 40/);
assert.match(get("#ps-grid").innerHTML,/ps-square on/);
get("#ps-answer").value="4";
get("#ps-form").onsubmit({preventDefault(){}});
assert.match(get("#ps-feedback").textContent,/Correct/);
assert.match(get("#ps-score").textContent,/1 solved/);
get("#ps-form").onsubmit({preventDefault(){}});
assert.match(get("#ps-score").textContent,/1 solved/);
get("#ps-help").onclick();
assert.equal(get("#ps-hint").hidden,false);
levels[1].onclick();
assert.equal(levels[1].attrs["aria-pressed"],"true");
get("#ps-show").onclick();
assert.match(get("#ps-hint").textContent,/Worked solution/);
get("#ps-next").onclick();
assert.match(get("#ps-score").textContent,/questions shown/);
console.log("Percent Strategy Studio passed: maths, mounting, input, feedback, hints, levels and repeat practice.");