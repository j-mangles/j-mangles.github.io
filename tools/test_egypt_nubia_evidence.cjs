"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const html=fs.readFileSync(path.join(__dirname,"../social-studies/egypt-nubia-evidence.html"),"utf8");
for(const text of [
 "Two royal voices",
 "Senusret III’s boundary stone, about 1860 BCE",
 "Piye’s Victory Stela, about 727 BCE",
 "Who made each source, and what was each king trying to show?",
 "How does the Egyptian source describe Nubians?",
 "What do the two sources have in common",
 "Why do historians need sources from both Egypt and Kush?",
 "document.querySelectorAll(\"[data-royal-work]\").forEach(x=>x.value=\"\")"
]) assert.ok(html.includes(text),"Missing Lesson 9 source-task detail: "+text);
assert.match(html,/Responses stay in this page and are not submitted or saved online/);
console.log("Egypt and Nubia source-task alignment checks passed.");
