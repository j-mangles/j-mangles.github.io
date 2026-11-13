/* Whose Golden Age? evidence labels, tile world, unlock order, sorting feedback, no invented ancient voices, privacy and size tests. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const files=["social-studies/greece-whose-golden-age.html","social-studies/greece-whose-golden-age.js","social-studies/greece-whose-golden-age-core.js"];
const [html,ui,coreSrc]=files.map(read);
const c={window:{}};
vm.runInNewContext(coreSrc,c,{filename:"greece-whose-golden-age-core.js",timeout:4000});
const G=c.window.GoldenAgeCore;

/* Five places, in order, each tied to a source lesson. */
assert.deepEqual(Array.from(G.PLACES,p=>p.id),["acropolis","assembly","household","workshop","laurion"]);
assert.deepEqual(Array.from(G.PLACES,p=>p.n),[1,2,3,4,5]);
assert.deepEqual(Array.from(G.PLACES,p=>p.lesson),["L8","L5","L10","L10","L10"]);
assert.equal(G.QUESTION,"Whose golden age was it?");

/* Every item has one of the three labels and a lesson tag; every statement has a bin and a reason. */
assert.deepEqual(Object.values(G.LABELS),["Real source","Paraphrase","Interpretation"]);
assert.deepEqual(Array.from(G.BINS,b=>b.title),["The source shows","Historians infer","We can't know"]);
const binIds=new Set(Array.from(G.BINS,b=>b.id)),seen=new Set();
let items=0,stmts=0;
for(const p of G.PLACES){
 assert.ok(p.title&&p.short&&p.intro&&Number.isFinite(p.cx)&&Number.isFinite(p.cy),p.id);
 assert.ok(G.walkable(p.entry.tx,p.entry.ty,true),p.id+" entry must be walkable");
 assert.ok(p.items.length>=2,p.id+" needs evidence");
 assert.ok(p.sort.length>=3&&p.sort.length<=4,p.id+" needs 3 to 4 statements");
 for(const i of p.items){
  items++;
  assert.ok(G.LABELS[i.kind],p.id+"/"+i.id+" needs a Real source / Paraphrase / Interpretation label");
  assert.match(i.lesson,/^L(5|8|10)$/,p.id+"/"+i.id+" needs a lesson tag");
  assert.ok(i.title&&i.text&&i.cite,p.id+"/"+i.id);
  assert.ok(G.walkable(i.tx,i.ty,true),i.id+" marker must stand on walkable ground");
  assert.ok(Math.abs(i.tx-p.cx)<=p.rx&&Math.abs(i.ty-p.cy)<=p.ry,i.id+" marker must sit inside its place");
  assert.ok(!seen.has(i.id),"Duplicate id "+i.id);seen.add(i.id);
 }
 for(const s of p.sort){
  stmts++;
  assert.ok(binIds.has(s.bin)&&s.text&&s.why&&!/\n/.test(s.why),p.id+"/"+s.id+" needs a bin and a one-line reason");
  assert.ok(!seen.has(s.id),"Duplicate id "+s.id);seen.add(s.id);
 }
}

/* No invented ancient characters, dialogue or quotations in the evidence. */
const banned=new Set(["speaker","character","dialogue","lines","quote","says","name","role"]);
(function walk(o,where){
 if(Array.isArray(o))return o.forEach((x,i)=>walk(x,where+"["+i+"]"));
 if(o&&typeof o==="object")for(const k of Object.keys(o)){assert.ok(!banned.has(k),"Field suggests an invented voice: "+where+"."+k);walk(o[k],where+"."+k);}
})(G.PLACES,"PLACES");
const allText=G.PLACES.flatMap(p=>[p.intro,...p.items.flatMap(i=>[i.title,i.text,i.cite]),...p.sort.flatMap(s=>[s.text,s.why])]);
const allowedQuoted=new Set(["golden age","Perhaps one in three"]);
for(const t of allText){
 for(const m of t.matchAll(/[“"]([^”"]*)[”"]/g))assert.ok(allowedQuoted.has(m[1]),"Unexpected quotation: "+m[0]);
 assert.ok(!/\b(I|me|my|we|our)\b/.test(t.replace(G.BINS[2].title,"")),"First-person voice in evidence: "+t);
 assert.ok(!/\bfictional\b|\bimagine\b|\bpretend\b/i.test(t),"Evidence must not be fictionalized: "+t);
}
/* Empty-voice cards for women and for enslaved miners, with the exact wording. */
const empties=G.PLACES.flatMap(p=>p.items.filter(i=>i.empty).map(i=>[p.id,i.text]));
assert.equal(JSON.stringify(empties),JSON.stringify([["household",G.EMPTY_VOICE],["laurion",G.EMPTY_VOICE]]));
assert.equal(G.EMPTY_VOICE,"No first-person account survives in this evidence.");
/* Accuracy guards from the brief. */
const text=id=>G.PLACES.flatMap(p=>p.items).find(i=>i.id===id);
assert.match(text("accounts").text,/Erechtheion, not the Parthenon/);
assert.match(text("debate").cite,/about 500 years later.*reconstruction, not a transcript/);
assert.match(text("league").text,/454 BCE \(the traditional date\)/);
assert.match(text("ostraka").text,/1937.*190 ostraka.*14 handwritings/);
assert.match(text("seventh").text,/Estimates vary/);
assert.match(text("attendant").text,/common reading, not a certainty/);
assert.match(text("flask").text,/550 to 530 BCE.*over a century before Pericles/);
assert.match(text("speaker").text,/metic arguing a court case/);
assert.match(text("third").text,/vary widely, roughly 20 to 40 percent/);
assert.equal(text("lysias").kind,"paraphrase");assert.equal(text("debate").kind,"paraphrase");

/* The one character is a labelled, present-day invention who never speaks for the past. */
const S=G.SUPERVISOR;
assert.equal(S.label,"Invented character");assert.match(S.role,/present-day/);assert.match(S.role,/Not a real person/);
for(const [k,line] of Object.entries(S.lines)){
 assert.ok(line&&!/[“”"]/.test(line),"Supervisor line must not quote anyone: "+k);
 assert.ok(!/\d{3}|BCE|percent|Plutarch|Lysias|Themistocles|Pericles|Hegeso/.test(line),"Supervisor gives tasks, not history: "+k);
}

/* The world: a walkable tile grid with one gated road to the mines. */
assert.equal(G.GRID.length,G.H);assert.ok(G.GRID.every(r=>r.length===G.W));
assert.ok(G.walkable(G.START.tx,G.START.ty,false));assert.ok(!G.walkable(G.CAMP.tx,G.CAMP.ty,true));
assert.ok(!G.walkable(-1,0,true)&&!G.walkable(0,G.H,true));
assert.equal(G.GRID[G.GATE.ty][G.GATE.tx],G.T.gate);
for(const p of G.PLACES)for(const i of p.items){
 const closed=G.findPath(G.START,i,false),open=G.findPath(G.START,i,true);
 assert.ok(open&&open.length>1,i.id+" must be reachable from the camp");
 assert.equal(!!closed,p.id!=="laurion",i.id+": only the mines sit behind the gate");
}
const route=G.findPath(G.START,G.byId("laurion").items[0],true);
assert.ok(route.some(t=>t.tx===G.GATE.tx&&t.ty===G.GATE.ty),"The only way to the mines is through the gate");
for(let k=1;k<route.length;k++)assert.equal(Math.abs(route[k].tx-route[k-1].tx)+Math.abs(route[k].ty-route[k-1].ty),1);
assert.equal(G.findPath(G.START,{tx:0,ty:G.H-1},true),null,"Cannot walk into the sea");
/* Collisions: walking into a wall or the closed gate does not move you. */
let pos=G.centre({tx:G.GATE.tx-1,ty:G.GATE.ty});
for(let k=0;k<40;k++)pos=G.step(pos,4,0,false);
assert.ok(pos.x<G.GATE.tx*G.TILE,"Closed gate blocks the road");
for(let k=0;k<40;k++)pos=G.step(pos,4,0,true);
assert.ok(pos.x>(G.GATE.tx+1)*G.TILE,"Open gate lets you through");
pos=G.centre(G.START);for(let k=0;k<400;k++)pos=G.step(pos,0,6,true);
assert.ok(pos.y<36*G.TILE,"The sea blocks you");
assert.equal(G.nearestItem(G.centre(G.START)),null);
assert.equal(G.nearestItem(G.centre(G.byId("acropolis").items[0])).item.id,"league");
assert.ok(G.nearCamp(G.centre(G.START)));

/* Unlock order: 1, then any of 2 to 4, then 5. Markers must be found before sorting or pinning. */
const finish=(st,id)=>{const p=G.byId(id);for(const i of p.items)G.find(st,id,i.id);for(const s of p.sort)G.sortAnswer(st,id,s.id,s.bin);return G.pin(st,id,p.items[0].id);};
const st=G.makeState();
assert.equal(G.task(st),"Talk to the dig supervisor at the camp.");st.briefed=true;
assert.match(G.task(st),/The Acropolis: find the markers \(0 of 3\)/);
assert.deepEqual(Array.from(G.PLACES,p=>G.isUnlocked(st,p.id)),[true,false,false,false,false]);
assert.match(G.lockReason(st,"assembly"),/The Acropolis/);
assert.throws(()=>G.find(st,"assembly","ostraka"),/locked/);
assert.throws(()=>G.pin(st,"laurion","silver"),/locked/);
const first=G.PLACES[0].sort[0];
assert.throws(()=>G.sortAnswer(st,"acropolis",first.id,first.bin),/Find every marker first/);
assert.equal(G.find(st,"acropolis","league").found,1);
assert.throws(()=>G.pin(st,"acropolis","accounts"),/Find that marker first/);
G.find(st,"acropolis","league");assert.equal(G.find(st,"acropolis","debate").found,2,"Do not count the same marker twice");
assert.equal(G.find(st,"acropolis","accounts").all,true);
assert.match(G.task(st),/sort the statements and pin one card/);

/* Sorting feedback: wrong answers do not count, right ones do, and both return the one-line reason. */
let r=G.sortAnswer(st,"acropolis",first.id,"unknown");
assert.equal(r.correct,false);assert.equal(r.why,first.why);assert.equal(Object.keys(st.sorted.acropolis||{}).length,0);
r=G.sortAnswer(st,"acropolis",first.id,first.bin);
assert.equal(r.correct,true);assert.equal(r.bin,"The source shows");assert.equal(r.complete,false);
G.sortAnswer(st,"acropolis",first.id,first.bin);
assert.equal(Object.keys(st.sorted.acropolis).length,1,"Do not count the same statement twice");
assert.throws(()=>G.sortAnswer(st,"acropolis","nope","shows"));
assert.throws(()=>G.sortAnswer(st,"acropolis",first.id,"maybe"));
assert.throws(()=>G.pin(st,"acropolis","silver"),/Unknown card/);
for(const s of G.PLACES[0].sort)G.sortAnswer(st,"acropolis",s.id,s.bin);
assert.equal(G.isComplete(st,"acropolis"),false,"A place needs a pinned card as well as the sort");
assert.equal(G.pin(st,"acropolis","accounts").complete,true);
assert.equal(G.afterPlace(st,"acropolis"),S.lines.acropolis);
assert.deepEqual(Array.from(G.PLACES,p=>G.isUnlocked(st,p.id)),[true,true,true,true,false]);
assert.match(G.task(st),/^Any order: /);
finish(st,"workshop");finish(st,"household");
assert.equal(G.gateOpen(st),false,"The mines need all three middle places");
assert.equal(G.afterPlace(st,"household"),S.lines.city);
finish(st,"assembly");
assert.equal(G.gateOpen(st),true);assert.equal(G.afterPlace(st,"assembly"),S.lines.gate);

/* Final-response gate and report. */
assert.equal(G.canWrite(st),false);assert.equal(G.doneCount(st),4);
finish(st,"laurion");
assert.equal(G.canWrite(st),true);assert.equal(G.pinned(st).length,5);
assert.equal(G.task(st),"Open your notebook and answer the question.");
G.pin(st,"acropolis","league");assert.equal(G.pinned(st).length,5,"One pinned card per place");
const rep=G.buildReport(st,"  Test Student ","My paragraph.");
assert.match(rep,/Name: Test Student\n/);assert.match(rep,/Question: Whose golden age was it\?/);
assert.match(rep,/1\. The Acropolis: From league to empire \[Paraphrase, Lesson 8\]/);
assert.match(rep,/My answer\nMy paragraph\.\n$/);
assert.ok(G.STARTERS.length>=4&&G.CHECKLIST.length===4);

/* Privacy: nothing stored, nothing sent, no student data in the address. */
const priv=/localStorage|sessionStorage|indexedDB|document\.cookie|fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|location\.(search|hash|href)|URLSearchParams|history\.(push|replace)State|<form|<img|<iframe|https?:\/\//;
for(const [i,src] of [html.replace('xmlns="http://www.w3.org/2000/svg"',""),ui.replace('"http://www.w3.org/2000/svg"','""'),coreSrc].entries()){
 const m=src.match(priv);assert.ok(!m,files[i]+" must stay page-only, found: "+(m&&m[0]));
}
assert.ok(!/<script[^>]+src="(?!greece-whose-golden-age(-core)?\.js")/.test(html),"No outside scripts");
assert.ok(!/<canvas|WebGL|<audio|<video/i.test(html+ui),"Inline SVG and DOM only");

/* Page wiring, required student-facing lines, design tokens. */
new Function(ui);
for(const id of ["view-intro","view-game","view-place","view-notebook","stage","world","pad","act","slip","task","say","places","big","open-notebook","place-cards","place-sort","nb-cards","nb-write","nb-text","copy","download"]){
 assert.ok(html.includes('id="'+id+'"'),"Missing UI element "+id);
}
assert.ok(html.includes("This activity discusses slavery and violence."));
assert.match(html,/Composite sketch, not one year/);assert.match(html,/not surveyed, not to scale/);
assert.match(html,/invented, present-day character/);assert.match(html,/No one from ancient Athens speaks/);
assert.match(html,/href="\.\.\/assets\/fonts\.css"/);
for(const v of ["--bg","--panel","--ink","--muted","--rule","--accent","--route"])assert.ok(html.includes(v+":"),"Missing atlas variable "+v);
assert.match(html,/prefers-color-scheme: dark/);assert.match(html,/prefers-reduced-motion: reduce/);
assert.match(html,/aria-live="polite"/);
assert.ok(html.indexOf("greece-whose-golden-age-core.js")<html.indexOf('src="greece-whose-golden-age.js"'));
const bytes=files.reduce((n,f)=>n+fs.statSync(path.join(root,f)).size,0);
assert.ok(bytes<150*1024,"New page files should stay under about 150 KB, got "+bytes);

/* Linked from the Greece unit without replacing the existing activity or changing its status. */
const atlas=read("social-studies/index.html");
assert.match(atlas,/id:"greece", n:"3", name:"Ancient Greece", status:"soon",\s*activities:\[\{href:"greek-inquiry-lab\.html"[^\]]*\{href:"greece-whose-golden-age\.html",title:"Whose Golden Age\? A Walk Through Athens"/);
console.log("Whose Golden Age PASS: 5 places, "+G.W+"x"+G.H+" tile world, "+items+" labelled cards, "+stmts+" sort statements, unlock order, final gate, privacy and "+bytes+" bytes.");
