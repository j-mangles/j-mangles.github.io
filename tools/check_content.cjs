/* No-dependency content validation for student website. Run: node tools/check_content.cjs */
"use strict";
const fs=require("node:fs"), path=require("node:path"), vm=require("node:vm");
const root=path.resolve(__dirname,".."),errors=[];
const check=(ok,message)=>{if(!ok)errors.push(message);};
let unitsChecked=0,lessonsChecked=0,questionsChecked=0,activitiesChecked=0,assetsChecked=0;
const subjects=["math","ela","science","critical-thinking"];
for(const subject of subjects){
  const filename=path.join(root,subject,"data.js");
  const script=fs.readFileSync(filename,"utf8"),sandbox={window:{}};
  try{vm.runInNewContext(script,sandbox,{filename,timeout:2000});}
  catch(e){errors.push(subject+" cannot load: "+e.message);continue;}
  const hub=sandbox.window.HUB;
  if(!hub||!Array.isArray(hub.units)){errors.push(subject+" missing HUB.units");continue;}
  check(hub.subject!==undefined,subject+" missing subject ID");
  const unitIDs=new Set();
  for(const unit of hub.units){
    unitsChecked++;
    check(typeof unit.id==="string"&&!unitIDs.has(unit.id),subject+" duplicate/bad unit id "+unit.id);
    unitIDs.add(unit.id);
    check(!!unit.name,subject+" missing unit name "+unit.id);
    const lessonIDs=new Set();
    for(const lesson of unit.lessons||[]){
      lessonsChecked++;
      const ref=subject+"/"+unit.id+"/"+lesson.id;
      check(typeof lesson.id==="string"&&!lessonIDs.has(lesson.id),ref+" duplicate/bad lesson ID");
      lessonIDs.add(lesson.id);
      check(!!lesson.title,ref+" missing lesson title");
      for(const question of lesson.check||[]){
        questionsChecked++;
        check(typeof question.q==="string"&&question.q.trim().length>0,ref+" blank question");
        check(Array.isArray(question.a)&&question.a.length>=2,ref+" missing answer choices");
        check(Number.isInteger(question.c)&&question.c>=0&&question.c<question.a.length,ref+" invalid correct-answer index");
        check(typeof question.why==="string"&&question.why.length>0,ref+" missing question feedback");
      }
      if(lesson.activity){
        activitiesChecked++;
        const a=lesson.activity;
        check(!!a.title&&Array.isArray(a.prompts)&&a.prompts.length>0,ref+" invalid student activity");
        for(const prompt of a.prompts||[])check(typeof prompt.label==="string"&&prompt.label.trim().length>0,ref+" blank activity prompt");
      }
      for(const image of lesson.imgs||[]){
        assetsChecked++;
        check(typeof image.src==="string"&&image.src.startsWith("img/"),ref+" unsafe or invalid image path");
        if(typeof image.src==="string"&&image.src.startsWith("img/"))
          check(fs.existsSync(path.join(root,subject,image.src)),ref+" missing image "+image.src);
      }
    }
  }
}
/* Guard lesson-tool controls from broad quiz event binding. Both use .opt styling. */
const hubScript=fs.readFileSync(path.join(root,"assets","hub.js"),"utf8");
check(!/document\.querySelectorAll\(\s*["']\.opt["']\s*\)/.test(hubScript),
  "hub quiz handlers must not hijack interactive-tool .opt buttons");
check(hubScript.includes('document.querySelectorAll("article.lesson > .q .opts button[data-q][data-o]")'),
  "hub quiz handling must be scoped to the lesson question containers");

/* Check atlas assets without attempting to execute the large D3-based browser application. */
const atlas=fs.readFileSync(path.join(root,"social-studies","index.html"),"utf8");
const imagePaths=[...atlas.matchAll(/(?:img:|src:)"(img\/[^"]+\.(?:png|jpe?g|webp))"/g)];
for(const match of imagePaths){
  assetsChecked++;
  check(fs.existsSync(path.join(root,"social-studies",match[1])),"atlas missing "+match[1]);
}
console.log("Checked "+unitsChecked+" units, "+lessonsChecked+" lessons, "+questionsChecked+" questions, "+activitiesChecked+" student activities, "+assetsChecked+" asset references.");
if(errors.length){errors.forEach(e=>console.error("ERROR: "+e));process.exitCode=1;}
else console.log("Student website content validation passed.");
