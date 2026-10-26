/* Combined release gate: all subject pages reference their actual tools and all prior smoke tests pass. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const {spawnSync}=require("node:child_process");
const root=path.resolve(__dirname,"..");
const pages={
 "math/index.html":["percent-strategy.js","number-line-lab.js","chance-lab.js"],
 "science/index.html":["homeostasis.js","organization-explorer.js"],
 "ela/index.html":["writer-studio.js"],
 "critical-thinking/index.html":["evidence-inspector.js"]
};
for(const [file,tools] of Object.entries(pages)){
 const dir=path.join(root,path.dirname(file)),html=fs.readFileSync(path.join(root,file),"utf8");
 const src=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(src).size,src.length,file+" has duplicate script tags");
 assert.ok(src.indexOf("data.js")>=0,file+" missing data.js");
 assert.ok(src.indexOf("../assets/hub.js")>=0,file+" missing shared lesson renderer");
 for(const tool of tools){
  assert.ok(src.includes(tool),file+" missing "+tool);
  assert.ok(src.indexOf("data.js")<src.indexOf(tool),tool+" loads before its data");
  assert.ok(src.indexOf(tool)<src.indexOf("../assets/hub.js"),tool+" loads after the lesson renderer");
 }
 for(const link of src)if(!/^https?:\/\//.test(link))assert.ok(fs.existsSync(path.resolve(dir,link)),file+" script missing on disk: "+link);
}
const tests=[
 "test_review_retries.cjs","check_content.cjs","test_atlas_lessons.cjs",
 "test_homeostasis.cjs","test_writer_studio.cjs","test_percent_strategy.cjs",
 "test_evidence_inspector.cjs","test_number_line_lab.cjs",
 "test_organization_explorer.cjs","test_chance_lab.cjs"
];
for(const file of tests){
 const p=path.join(root,"tools",file);
 assert.ok(fs.existsSync(p),"Missing regression test "+file);
 const run=spawnSync(process.execPath,[p],{cwd:root,encoding:"utf8",timeout:20000});
 if(run.status!==0){process.stderr.write((run.stdout||"")+(run.stderr||""));throw Error(file+" failed with "+run.status);}
 process.stdout.write("PASS "+file+"\n");
}
console.log("Integrated release smoke tests passed. Browser/device QA remains separate.");