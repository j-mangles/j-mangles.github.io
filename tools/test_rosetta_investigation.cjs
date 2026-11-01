"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const page=read("social-studies/egypt-rosetta-investigation.html"),lessons=read("social-studies/egypt-lessons.js");
for(const p of [/Rosetta Stone Investigation/,/Cartouche A/,/Cleopatra/,/Coptic/,/claim-date/,/claim-curse/,/claim-door/,/claim-news/,/data-check-curse/,/data-build-position/,/data-clear/,/not submitted or saved online/])assert.match(page,p);
assert.match(lessons,/"id": "l12"[\s\S]*?"activity": \{"href":"egypt-rosetta-investigation.html","title":"Open the Rosetta Stone Investigation"\}/);
assert.doesNotMatch(page,/fetch\(|localStorage|sessionStorage/);
console.log("Egypt Lesson 12 Rosetta Stone Investigation checks passed.");
