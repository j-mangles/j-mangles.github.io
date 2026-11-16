/* Math 7 Probability Lesson 4: Sample Space Lab. Checks the sample spaces, the answers, the number formats and the page wiring. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const keepP2=()=>{};
const h={window:{HUB:{lessonTools:{"prob/p2":keepP2}}}};
vm.runInNewContext(read("math/sample-space-lab.js"),h,{filename:"math/sample-space-lab.js"});
const M=h.window.HUB.sampleSpaceModel,LT=h.window.HUB.lessonTools;
assert.equal(typeof LT["prob/p4"],"function","Mounts on Lesson 4");
assert.equal(LT["prob/p2"],keepP2,"Leaves the Chance Lab alone");
// The lesson exists and says what the lab shows.
const d={window:{}};vm.runInNewContext(read("math/data.js"),d);
const p4=d.window.HUB.units.find(u=>u.id==="prob").lessons.find(l=>l.id==="p4");
assert.ok(p4&&/6 × 2 = 12/.test(p4.notes.join(" "))&&/6 × 6 = 36/.test(p4.notes.join(" ")));
const S=M.SETUPS,size=k=>M.space(S[k]).length,fav=(k,e)=>Array.from(M.favourable(S[k],e));
assert.deepEqual([size("coins"),size("coindie"),size("dice")],[4,12,36]);
assert.equal(Array.from(M.space(S.coins),c=>c.a+c.b).join(" "),"HH HT TH TT");
// Answers, counted by hand.
assert.equal(fav("coins","hh").length,1);assert.equal(fav("coins","one").length,2);assert.equal(fav("coins","tail").length,3);assert.equal(fav("coins","same").length,2);
assert.equal(fav("coindie","h6").length,1);assert.equal(fav("coindie","teven").length,3);assert.equal(fav("coindie","hbig").length,2);assert.equal(fav("coindie","odd").length,6);
assert.equal(fav("dice","s7").length,6);assert.equal(fav("dice","dbl").length,6);assert.equal(fav("dice","s10").length,6);assert.equal(fav("dice","six").length,11);assert.equal(fav("dice","s2").length,1);
assert.deepEqual(fav("coins","one"),[1,2],"HT and TH are separate outcomes");
assert.throws(()=>M.favourable(S.dice,"nope"));
// Fractions and percents the way the unit writes them.
assert.equal(M.fraction(2,4),"1/2");assert.equal(M.fraction(6,36),"1/6");assert.equal(M.fraction(11,36),"11/36");assert.equal(M.fraction(0,12),"0");assert.equal(M.fraction(4,4),"1");
assert.equal(M.percent(1,4),"25%");assert.equal(M.percent(1,8),"12.5%");assert.equal(M.percent(1,6),"about 17%");assert.equal(M.percent(1,3),"about 33%");assert.equal(M.percent(1,36),"about 2.8%");assert.equal(M.percent(1,12),"about 8.3%");assert.equal(M.percent(3,4),"75%");
assert.equal(M.probability(1,4),"1/4 = 25%");assert.equal(M.probability(2,4),"2/4 = 1/2 = 50%");assert.equal(M.probability(6,36),"6/36 = 1/6 ≈ 17%");assert.equal(M.probability(11,36),"11/36 ≈ 31%");
// Checking a student's marking.
const chk=(marked,k,e)=>M.compare(marked,size(k))(M.favourable(S[k],e));
assert.equal(chk([1,2],"coins","one").right,true);
const part=chk([1,3],"coins","one");assert.equal(part.right,false);assert.equal(part.extra,1);assert.equal(part.missing,1);
assert.equal(chk([],"dice","s7").missing,6);
// Trials: every trial lands in exactly one box, and with a fixed generator the result repeats.
let seed=7;const rng=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const c=M.simulate(S.dice,3600,rng);
assert.equal(c.length,36);assert.equal(c.reduce((a,b)=>a+b,0),3600);
assert.ok(Math.min(...c)>55&&Math.max(...c)<150,"Each of the 36 outcomes comes up roughly 100 times in 3600 trials");
assert.throws(()=>M.simulate(S.dice,0));assert.throws(()=>M.simulate(S.dice,M.MAX_TRIALS+1));
// Page wiring.
const html=read("math/index.html"),order=[...html.matchAll(/<script src="([^"?]+)/g)].map(x=>x[1]);
assert.ok(order.indexOf("sample-space-lab.js")>order.indexOf("data.js")&&order.indexOf("sample-space-lab.js")<order.indexOf("../assets/hub.js"));
const src=read("math/sample-space-lab.js");
assert.ok(!/https?:\/\//.test(src)&&!/localStorage|sessionStorage/.test(src)&&!/—/.test(src));
assert.ok(/prefers-reduced-motion/.test(read("math/math.css")));
console.log("sample space lab ok");
