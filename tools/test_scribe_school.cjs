"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const page=read("social-studies/egypt-scribe-school.html"),lessons=read("social-studies/egypt-lessons.js");
for(const pattern of [/Scribe School Lab/,/data-check-order/,/data-check-words/,/data-transliterate/,/Satire of the Trades/,/data-check-source/,/data-build-claim/,/data-clear/,/not submitted or saved online/])assert.match(page,pattern);
assert.match(lessons,/"id": "l6"[\s\S]*?"activity": \{"href":"egypt-scribe-school.html","title":"Try the Scribe School Lab"\}/);
assert.doesNotMatch(page,/fetch\(|localStorage|sessionStorage/);
console.log("Egypt Lesson 6 Scribe School Lab checks passed.");
