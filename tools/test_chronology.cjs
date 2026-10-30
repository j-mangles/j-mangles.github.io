/* Grade 8 SS: compare-only timeline must match existing Atlas study ranges. */
"use strict";
const assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("social-studies/chronology.js"),ctx);
const C=ctx.window.ChronologyCore,atlas=read("social-studies/index.html");
assert.equal(C.PERIODS.length,5);
for(const p of C.PERIODS){
 const start=atlas.indexOf('id:"'+p.id+'", n:');
 assert.ok(start>=0,"Missing period "+p.id+" on live atlas");
 assert.ok(atlas.slice(start,start+1500).includes('span:"'+p.span+'"'),"Atlas span changed: "+p.id+" "+p.span);
 assert.ok(p.start<p.end&&p.start>=-5500&&p.end<=1600);
 assert.ok(p.caution.length>30,"Every teaching period needs a caveat");
 for(const q of C.PERIODS){
  const o=C.overlap(p.id,q.id),rev=C.overlap(q.id,p.id);
  assert.equal(o.exists,rev.exists);
  assert.equal(o.start,rev.start);
  assert.equal(o.end,rev.end);
  const figure=C.graph(p.id,q.id);
  assert.ok(figure.includes('role="img"')&&figure.includes('Selected periods'));
  assert.ok(!figure.includes("NaN")&&!figure.includes("undefined"));
 }
}
const egypt=C.overlap("mesopotamia","egypt");
assert.ok(egypt.exists&&egypt.start===-3100&&egypt.end===-539);
const gr=C.overlap("greece","rome");
assert.ok(gr.exists&&gr.start===-753&&gr.end===-146&&gr.earlier==="greece");
assert.equal(C.overlap("rome","middle-ages").exists,false);
assert.equal(C.overlap("greece","middle-ages").exists,false);
assert.equal(C.overlap("rome","rome").earlier,"same");
assert.throws(()=>C.overlap("not-real","rome"));
assert.equal(C.PERIODS.find(p=>p.id==="mesopotamia").name,"Mesopotamia");
const html=read("social-studies/compare.html");
assert.ok(html.includes('src="chronology.js"')&&html.includes("window.ChronologyCore.mount(document)"));
assert.ok(html.includes('id="period-a"')&&html.includes('id="period-b"'));
assert.ok(atlas.includes('href="compare.html"')&&read("index.html").includes('href="social-studies/compare.html"'));
console.log("Five civilization spans match the Atlas; 25 SVG comparisons and overlap cases passed.");
