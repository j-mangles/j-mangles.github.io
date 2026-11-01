"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),page=fs.readFileSync(path.join(root,"social-studies/egypt-afterlife-lab.html"),"utf8"),lessons=fs.readFileSync(path.join(root,"social-studies/egypt-lessons.js"),"utf8");
for(const p of [/Passport to the Afterlife/,/data-check-steps/,/data-check-source/,/data-check-budget/,/data-clear/,/10 deben/,/values|protecting grain/i,/Field of Reeds/,/not submitted or saved online/i,/prices below are invented/i,/@media\(max-width:560px\)/,/focus-visible/])assert.match(page,p);
assert.match(lessons,/"id": "l4"[\s\S]*?"activity": \{"href":"egypt-afterlife-lab.html","title":"Open Passport to the Afterlife"\}/);
assert.doesNotMatch(page,/\bfetch\s*\(|localStorage|sessionStorage/);
const script=[...page.matchAll(/<script>([\s\S]*?)<\/script>/g)][0]?.[1];assert.ok(script,"inline activity logic missing");assert.doesNotThrow(()=>new vm.Script(script));
console.log("Egypt Lesson 4 afterlife lab checks passed.");
