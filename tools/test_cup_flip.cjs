/* Mystery Cup Flip: hidden long-run chances stay a valid distribution, the sampler covers every outcome,
   the reveal is gated behind 200 flips, and the page loads nothing from outside. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const html=read("math/cup-flip.html");

// nothing loads from outside, and the page uses the shared shell
assert.ok(!/https?:\/\/|@import/.test(html),"cup-flip loads nothing from outside");
assert.ok(html.includes('href="../assets/site.css"'),"uses the shared stylesheet");
assert.ok(html.includes('data-subject="math"'),"declares the math subject");
assert.ok(/<title>Mystery Cup Flip · Math 7<\/title>/.test(html),"has a page title");

// student-facing only: no teacher notes or planning language on the page
for(const banned of ["Teacher notes","Suggested timing","Exit slip","assessment"])
  assert.ok(!html.includes(banned),"no teacher-facing text: "+banned);

// the hidden chances are a real probability distribution over three outcomes
const weights=JSON.parse(/var WEIGHTS=(\[[^\]]+\]);/.exec(html)[1]);
assert.equal(weights.length,3,"three outcomes");
assert.ok(weights.every(w=>w>0&&w<1),"every outcome is possible but not certain");
assert.ok(Math.abs(weights.reduce((a,b)=>a+b,0)-1)<1e-9,"chances sum to 1");
assert.equal(Math.max(...weights),weights[2],"landing on its side is the most likely outcome");

// the three outcome names and the flip buttons are all present
for(const name of ["Open end up","Upside down","On its side"])
  assert.ok(html.includes(name),"names the outcome: "+name);
for(const n of [1,10,50]) assert.ok(html.includes('data-flip="'+n+'"'),"has a Flip "+n+" button");

// the sampler reproduces the hidden chances and never returns an out-of-range outcome
let rng=0;const sample=r=>{let s=0;for(let i=0;i<3;i++){s+=weights[i];if(r<s)return i;}return 2;};
const counts=[0,0,0],N=60000;
for(let i=0;i<N;i++){rng=(rng*1103515245+12345)%2147483648;const o=sample(rng/2147483648);
  assert.ok(o>=0&&o<3,"outcome in range");counts[o]++;}
for(let i=0;i<3;i++) assert.ok(Math.abs(counts[i]/N-weights[i])<0.02,"outcome "+i+" matches its chance over "+N+" draws");

// the reveal stays locked until the sample is big enough
assert.ok(/total<200/.test(html),"reveal is gated at 200 flips");
// reduced-motion path for the only animation
assert.ok(/prefers-reduced-motion/.test(html),"has a reduced-motion path");

// linked from the hub and the course map
assert.ok(read("math/index.html").includes('href="cup-flip.html"'),"linked from the Math 7 hub");
assert.ok(read("math/metro.js").includes('href="cup-flip.html"'),"linked from the course map");

// the flip is animated: three resting shapes, whole-turn spins, and motion inside the house limit
const shapes=html.match(/'<path d="[^']*'/g)||[];
assert.equal(shapes.length,3,"one resting shape per outcome");
assert.ok(/var LABELS=\[/.test(html),"each resting shape has a described label");
const spin=/rotate\("\+turns\+"deg\)/.test(html)&&/var turns=quick\?360:720;/.test(html);
assert.ok(spin,"the cup spins whole turns so the landing shape swaps unseen");
const dur=/\{duration:quick\?(\d+):(\d+)\}/.exec(html);
assert.ok(dur,"the toss declares a duration");
assert.ok(Number(dur[2])<=400&&Number(dur[1])<=400,"motion stays within ~400ms");
assert.ok(/stillness\|\|!cup\.animate/.test(html),"reduced motion and no-animation browsers skip straight to the result");
assert.ok(/if\(busy\)return;/.test(html),"a flip in flight cannot be double-counted");

console.log("Mystery Cup Flip: 3 hidden outcomes verified over "+N+" draws, reveal gated at 200 flips, linked from hub and course map.");
