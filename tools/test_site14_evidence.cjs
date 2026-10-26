/* Source reasoning model aligned to teacher's fictional Site 14 student worksheet. */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("social-studies/source-lab.js"),ctx,{filename:"social-studies/source-lab.js"});
const S=ctx.window.ArtifactEvidenceCore;
assert.deepEqual(Array.from(S.CARDS,x=>x.id),["vessel","pouch","burial","figure","settlement"]);
assert.deepEqual(Array.from(S.LEVELS,x=>x.id),["strong","possible","speculative"]);
assert.ok(S.CARDS.every(x=>x.facts.length>65&&x.prompt.includes("?")));
const records=S.newEntries();
for(const c of S.CARDS){
 assert.equal(records[c.id].observation,"");
 assert.equal(records[c.id].inference,"");
 assert.equal(records[c.id].level,"possible");
 const svg=S.artifactSVG(c.id);
 assert.ok(svg.includes('role="img"')&&svg.includes("fictional")&&svg.includes("not a photograph"));
 assert.ok(!svg.includes("NaN")&&!svg.includes("undefined"));
}
assert.throws(()=>S.artifactSVG("bogus"));
records.vessel.observation="Several vessels beside a hearth.";
records.vessel.inference="They may have used pottery to cook.";
records.vessel.limits="The spiral's meaning is unknown.";
records.vessel.level="possible";
records.vessel.followUp="Residue testing could reveal vessel contents.";
const exported=S.exportNotes(records,"These sources hint at practical craft skills.");
assert.ok(exported.includes("FICTIONAL PRACTICE SITE"));
assert.ok(exported.includes("Several vessels beside a hearth."));
assert.ok(exported.includes("The spiral's meaning is unknown."));
assert.ok(exported.includes("Plausible, but uncertain"));
assert.ok(exported.includes("These sources hint at practical craft skills."));
assert.ok(exported.includes("5 · Settlement"));
const page=read("social-studies/evidence.html");
assert.ok(page.includes('src="source-lab.js"')&&page.includes("window.ArtifactEvidenceCore.mount(document)"));
for(const id of ["observation","inference","limits","confidence","next-clue","synthesis","artifact-list"])assert.ok(page.includes('id="'+id+'"'),"Missing "+id);
assert.ok(page.includes("Fictional practice site")&&page.includes("not photographs"));
assert.ok(!page.includes("docs.google.com")&&!page.includes("The_Present_Teacher_Key")&&!page.includes("TeacherGuide"));
assert.ok(read("social-studies/index.html").includes('href="evidence.html"'));
assert.ok(read("index.html").includes('href="social-studies/evidence.html"'));
console.log("Site 14 desk passed: 5 source scenarios, 3 confidence levels, original schematic SVGs and editable response export.");
