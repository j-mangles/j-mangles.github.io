// Egypt Lesson 1: the Nile year interactive is registered, wired into the atlas and used by Lesson 1.
const assert=require("assert"),fs=require("fs"),vm=require("vm"),path=require("path");
const read=f=>fs.readFileSync(path.join(__dirname,"..",f),"utf8");
const ctx={window:{}};vm.runInNewContext(read("social-studies/egypt-interactives.js"),ctx);
const ix=ctx.window.EgyptInteractives&&ctx.window.EgyptInteractives.nileYear;
assert.ok(ix&&typeof ix.mount==="function"&&ix.cap,"nileYear interactive");
const lc={window:{}};vm.runInNewContext(read("social-studies/egypt-lessons.js"),lc);
assert.equal(lc.window.EgyptLessons[0].diagram,"nileYear");
const html=read("social-studies/index.html");
assert.ok(html.indexOf("egypt-interactives.js")>0&&html.indexOf("egypt-interactives.js")<html.indexOf("egypt-lessons.js"));
assert.ok(html.includes('querySelectorAll("#sheetcard [data-ix]")'),"atlas mounts interactives after rendering");
console.log("Nile year interactive wired into Egypt Lesson 1.");
