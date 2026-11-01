"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),page=fs.readFileSync(path.join(root,"social-studies/egypt-unified-kingdom-lab.html"),"utf8"),lessons=fs.readFileSync(path.join(root,"social-studies/egypt-lessons.js"),"utf8");
for(const p of [/Egypt's Timeline of Power/,/data-check-timeline/,/data-check-crowns/,/data-build-evidence/,/41 surveyed scholars/,/31 favored/,/intermediate period/i,/responses stay in this page/i,/not submitted or saved online/i,/@media\(max-width:560px\)/,/focus-visible/])assert.match(page,p);
assert.match(lessons,/"id": "l2"[\s\S]*?"activity": \{"href":"egypt-unified-kingdom-lab.html","title":"Explore Egypt's Timeline of Power"\}/);
assert.doesNotMatch(page,/\bfetch\s*\(|localStorage|sessionStorage/);
const script=[...page.matchAll(/<script>([\s\S]*?)<\/script>/g)][0]?.[1];assert.ok(script,"inline activity logic missing");assert.doesNotThrow(()=>new vm.Script(script));
console.log("Egypt Lesson 2 timeline and evidence lab checks passed.");
