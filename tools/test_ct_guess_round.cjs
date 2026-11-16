/* Game Theory Lesson 2: Run a Round. Checks the parsing, the target maths and the page wiring. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const h={window:{HUB:{tools:{games:()=>{}},lessonTools:{"games/g1":()=>{},"lab/l8":()=>{}}}}};
const keep=Object.assign({},h.window.HUB.lessonTools);
vm.runInNewContext(read("critical-thinking/guess-round.js"),h,{filename:"critical-thinking/guess-round.js"});
const G=h.window.GuessRoundCore,LT=h.window.HUB.lessonTools;
assert.equal(typeof LT["games/g2"],"function","Mounts on Guess 2/3 of the Average");
assert.equal(LT["games/g1"],keep["games/g1"]);assert.equal(LT["lab/l8"],keep["lab/l8"]);
const vals=t=>Array.from(G.parseGuesses(t).guesses,g=>g.value),names=t=>Array.from(G.parseGuesses(t).guesses,g=>g.name);
assert.deepEqual(vals("50 40 60 30"),[50,40,60,30]);
assert.deepEqual(vals("50, 40\n60;30"),[50,40,60,30]);
assert.deepEqual(names("Sam 33, Ava: 22\nMr. M 0"),["Sam","Ava","Mr. M"]);
assert.deepEqual(vals("Sam 33, Ava: 22\nMr. M 0"),[33,22,0]);
assert.deepEqual(vals("12.5 100 0"),[12.5,100,0]);
const bad=G.parseGuesses("50 150 20 abc, Sam, -4, 1000");
assert.deepEqual(Array.from(bad.guesses,g=>g.value),[50,20]);
assert.equal(bad.rejected.length,5);
assert.equal(G.parseGuesses("").guesses.length,0);
assert.equal(G.parseGuesses(Array(80).fill(10).join(" ")).guesses.length,60);
// The lesson's own check question: 50, 40, 60, 30 gives an average of 45 and a target of 30.
const g=G.parseGuesses("50 40 60 30").guesses,s=G.score(g);
assert.equal(s.average,45);assert.equal(s.target,30);assert.deepEqual(Array.from(s.winners),[3]);assert.equal(s.best,0);assert.equal(s.tooHigh,0);
const tie=G.score(G.parseGuesses("10 20 30").guesses);   // target 13.33: 10 is closest
assert.deepEqual(Array.from(tie.winners),[0]);
const two=G.score(G.parseGuesses("A 0, B 40, C 20").guesses); // average 20, target 13.33: 20 wins
assert.deepEqual(Array.from(two.winners),[2]);
assert.deepEqual(Array.from(G.score(G.parseGuesses("30 30 30").guesses).winners),[0,1,2]);
assert.equal(G.score(G.parseGuesses("100 100 90").guesses).tooHigh,3);
assert.throws(()=>G.score([]));
assert.equal(Math.round(G.level(1)),33);assert.equal(Math.round(G.level(2)),22);assert.equal(Math.round(G.level(3)),15);
assert.equal(G.nearestLevel(30),1);assert.equal(G.nearestLevel(50),0);assert.equal(G.nearestLevel(21),2);
assert.ok(G.withExtra(g,100)>s.target);
assert.equal(Math.round(G.withExtra(g,100)*10)/10,37.3);
const notes=G.insights(g,s);
assert.ok(notes[0].includes("average was 45")&&notes[0].includes("target was 30"));
assert.ok(notes.every(x=>!/undefined|NaN/.test(x)));
const svg=G.plot(g,s);
assert.ok(svg.includes('role="img"')&&svg.includes("Target 30")&&svg.includes("Average 45")&&!/NaN|undefined/.test(svg));
assert.equal((svg.match(/<circle/g)||[]).length,4);
const html=read("critical-thinking/index.html"),order=[...html.matchAll(/<script src="([^"?]+)/g)].map(x=>x[1]);
assert.ok(order.indexOf("guess-round.js")>order.indexOf("data.js")&&order.indexOf("guess-round.js")<order.indexOf("../assets/hub.js"));
const src=read("critical-thinking/guess-round.js");
assert.ok(!/https?:\/\/(?!www\.w3\.org)/.test(src)&&!/localStorage|sessionStorage/.test(src)&&!/—/.test(src));
console.log("ct guess round ok");
