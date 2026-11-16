/* Critical Thinking Lesson 8: Strategy Tournament. Checks the scoring, the rule engine and the page wiring. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const h={window:{HUB:{tools:{games:()=>{}},lessonTools:{"games/g1":()=>{}}}}};
const keepGames=h.window.HUB.tools.games,keepG1=h.window.HUB.lessonTools["games/g1"];
vm.runInNewContext(read("critical-thinking/tournament.js"),h,{filename:"critical-thinking/tournament.js"});
const T=h.window.TournamentCore;
assert.equal(typeof h.window.HUB.lessonTools["lab/l8"],"function","Mounts on Lesson 8, Cooperate or Betray");
assert.equal(h.window.HUB.tools.games,keepGames,"Leaves Beat the Bot alone");
assert.equal(h.window.HUB.lessonTools["games/g1"],keepG1,"Leaves the payoff explorer alone");

// Scoring matches the lesson notes in data.js.
h.window.HUB=undefined;const d={window:{}};vm.runInNewContext(read("critical-thinking/data.js"),d);
const l8=d.window.HUB.units.find(u=>u.id==="lab").lessons.find(l=>l.id==="l8");
assert.ok(l8&&/both cooperate = 3 each/i.test(l8.notes[0])&&/betrayer 5, cooperator 0/i.test(l8.notes[0]));
assert.deepEqual([T.PAY.CC,T.PAY.BB,T.PAY.BC,T.PAY.CB].map(x=>Array.from(x)),[[3,3],[1,1],[5,0],[0,5]]);

// Codes.
assert.equal(T.parse("ccb-0-0-r").afterB,"B");
assert.equal(T.encode(T.parse("CCB13B")),"CCB13B");
for(const bad of ["","CCB","CCB02R","CCB40R","XCB00R","CCB00X","CCB00RR"])assert.equal(T.parse(bad),null,bad);
assert.equal(T.classicFor("CCB00R"),"Tit for Tat");
assert.equal(T.classicFor("BCB00R"),null);

// Known matches, 10 rounds.
const P=code=>({name:code,code}),m=(a,b,n=10)=>T.match(P(a),P(b),n,1,2);
assert.deepEqual([m("CCC00R","CCC00R").pa,m("CCC00R","CCC00R").pb],[30,30]);
assert.deepEqual([m("BBB00R","CCC00R").pa,m("BBB00R","CCC00R").pb],[50,0]);
assert.deepEqual([m("CCB00R","BBB00R").pa,m("CCB00R","BBB00R").pb],[9,14]);   // Tit for Tat loses round 1, then 1 point each
assert.equal(m("CCB00R","CCB00R").pa,30);
assert.equal(m("CCB00B","CCC00R").a.join(""),"CCCCCCCCCB","Final-round rule betrays only at the end");
assert.equal(m("CCC03R","CCC00R").a.join(""),"CCBCCBCCBC","Surprise betrayal every 3rd round");
assert.equal(m("CCC20R","BBB00R").a.join(""),"CCBBBBBBBB","Grudge after two betrayals");
assert.equal(m("BCB00R","CCB00R").a.join("").slice(0,4),"BCBC","Suspicious start echoes against Tit for Tat");
assert.throws(()=>T.match(P("CCC00R"),P("nope"),10,1,2));
assert.throws(()=>T.match(P("CCC00R"),P("CCC00R"),0,1,2));

// A full tournament with the six class strategies.
const field=Array.from(T.CLASSICS,c=>Object.assign({kind:"classic"},c));
assert.deepEqual(field.map(c=>c.name),["Tit for Tat","Always Cooperate","Always Betray","Grudger","Forgiving Tit for Tat","Random"]);
const t=T.tournament(field,10,42),again=T.tournament(field,10,42);
assert.equal(t.matchCount,15);assert.equal(t.standings.length,6);
assert.deepEqual(t.standings.map(r=>r.total),again.standings.map(r=>r.total),"Same seed, same result");
let sum=0;
for(const r of t.rows){
 assert.equal(r.matches.length,5);assert.equal(r.wins+r.ties+r.losses,5);
 assert.equal(r.matches.reduce((s,x)=>s+x.pts,0),r.total);
 for(const x of r.matches){assert.equal(x.mine.length,10);const back=t.rows[x.opp].matches.find(y=>y.opp===r.i);assert.equal(back.pts,x.oppPts);assert.equal(back.mine.join(""),x.theirs.join(""));}
 sum+=r.total;
}
assert.ok(sum>=15*20&&sum<=15*60,"Each match is worth 20 to 60 points combined");
const by=n=>t.rows.find(r=>r.name===n);
assert.equal(by("Tit for Tat").wins,0,"Tit for Tat never beats a partner head to head");
assert.equal(by("Always Betray").losses,0,"Always Betray never loses a match head to head");
assert.ok(by("Tit for Tat").nice&&by("Always Cooperate").nice&&by("Grudger").nice&&!by("Always Betray").nice);
for(let k=1;k<t.standings.length;k++)assert.ok(t.standings[k-1].total>=t.standings[k].total);
const notes=T.insights(t);
assert.ok(notes.length>=1&&notes.length<=3&&notes.every(s=>typeof s==="string"&&!/undefined|NaN/.test(s)));
assert.throws(()=>T.tournament(field.slice(0,1),10,1));

// Names.
assert.equal(T.cleanName("  A   very long strategy name indeed "),"A very long strate");
assert.equal(T.uniqueName("Ace",["Ace","Ace 2"]),"Ace 3");

// Page wiring.
const html=read("critical-thinking/index.html"),order=[...html.matchAll(/<script src="([^"?]+)/g)].map(x=>x[1]);
assert.ok(order.indexOf("tournament.js")>order.indexOf("data.js")&&order.indexOf("tournament.js")<order.indexOf("../assets/hub.js"),"tournament.js loads after data.js and before hub.js");
const src=read("critical-thinking/tournament.js");
assert.ok(!/https?:\/\//.test(src),"No outside requests");
assert.ok(!/—/.test(src),"No em dashes in student text");
assert.ok(/prefers-reduced-motion/.test(read("critical-thinking/ct.css")));
console.log("ct tournament ok");
