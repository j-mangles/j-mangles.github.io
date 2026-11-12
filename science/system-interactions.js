/* Human Systems Explorer + Oxygen Delivery Lab.
   Grade 8 Cells & Systems booklet lessons 9–10. Simplified diagrams and indexes. */
(function () {
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SYSTEMS={
 respiratory:{name:"Respiratory",organs:"Lungs",job:"Moves air in and out to bring oxygen in and remove carbon dioxide.",link:"The circulatory system carries oxygen from the lungs to cells.",path:[["Inhale","Air enters the lungs."],["Gas exchange","Oxygen enters the blood while carbon dioxide leaves it."],["Transport","Blood carries oxygen to body cells."],["Exhale","Carbon dioxide is breathed out."]]},
 circulatory:{name:"Circulatory",organs:"Heart and blood vessels",job:"Pumps blood to carry oxygen and nutrients to cells and take wastes away.",link:"The respiratory system supplies oxygen; the digestive system supplies absorbed nutrients.",path:[["Heart","Heart muscle pumps blood."],["Arteries","Carry blood away from the heart."],["Capillaries","Exchange materials with body cells."],["Veins","Carry blood back toward the heart."]]},
 digestive:{name:"Digestive",organs:"Stomach and intestines",job:"Breaks food into nutrients that the body can absorb.",link:"Blood transports nutrients absorbed by the small intestine.",path:[["Mouth","Food enters and begins to break down."],["Stomach","Acid and muscular movement break food down."],["Small intestine","Most nutrient absorption happens here."],["Transport","Nutrients can be carried to cells in the blood."]]},
 nervous:{name:"Nervous",organs:"Brain, spinal cord and nerves",job:"Sends electrical signals between the brain and the rest of the body.",link:"The brain and nerves coordinate responses involving other systems.",path:[["Brain","Processes information and directs responses."],["Spinal cord","Part of the central nervous system."],["Other nerves","Carry signals to and from the body."],["Response","The body responds to incoming information."]]},
 muscular:{name:"Muscular",organs:"Skeletal muscles, tendons and other muscle tissues",job:"Skeletal muscles contract to pull on bones and move joints. Muscle tissue also helps move blood and food through the body.",link:"The nervous system signals muscles to contract; the skeletal system provides support, and the circulatory system brings oxygen and nutrients.",path:[["Brain and nerves","Motor signals travel through nerves to skeletal muscles."],["Muscle contraction","Muscle fibres shorten and generate a pulling force."],["Tendon and bone","A tendon transmits the muscle force to a bone."],["Movement","Bones move around a joint, often with an opposing muscle relaxing."]]},
 skeletal:{name:"Skeletal",organs:"Bones, joints, cartilage and ligaments",job:"Bones provide support and protection, and joints allow movement. Bone marrow also produces blood cells.",link:"Muscles pull on bones at joints; the nervous system coordinates actions, while blood supplies living bone tissues.",path:[["Bones","Rigid bones provide a framework and protect important organs."],["Joint","Two or more bones meet at a joint, which can permit movement."],["Muscle and tendon","A contracting skeletal muscle pulls on a bone through a tendon."],["Coordinated motion","The joint moves as muscles are activated and other muscles relax."]]},
 integumentary:{name:"Integumentary",organs:"Skin, hair and nails",job:"Protects the body and helps regulate body temperature.",link:"Works with nervous and circulatory systems in homeostasis.",path:[["Skin","Creates a protective barrier."],["Conditions","Skin can detect conditions around the body."],["Temperature","The body can adjust heat loss through the skin."],["Homeostasis","Systems work together to maintain stable conditions."]]}
};
const QUIZ=[
 {q:"Where are most digested nutrients absorbed?",a:["Stomach","Small intestine","Large intestine"],c:1,why:"Most nutrient absorption takes place in the small intestine."},
 {q:"How does oxygen reach body cells after entering the lungs?",a:["In blood","In the stomach","Through skin"],c:0,why:"The respiratory and circulatory systems work together."},
 {q:"Which two organs form the central nervous system?",a:["Brain and spinal cord","Heart and lungs","Stomach and liver"],c:0,why:"The brain and spinal cord form the central nervous system."},
 {q:"Which vessels allow exchange with cells?",a:["Arteries","Capillaries","Veins"],c:1,why:"Capillaries exchange gases, nutrients and wastes with cells."},
 {q:"How do skeletal muscles move the bones of a joint?",a:["They push bones away using nerves","They contract and pull through tendons","They pump blood directly into joints"],c:1,why:"Skeletal muscles generate a pulling force, transmitted by tendons to bones."},
 {q:"Which system includes bones, joints and protective structures such as the rib cage?",a:["Skeletal","Digestive","Nervous"],c:0,why:"The skeletal system supports the body and protects organs."}
];
const STYLE=[
 ".hsi,.odi{color:var(--ink);min-width:0;line-height:1.5}",
 ".hsi{margin:0 0 30px}.odi{border-top:1px solid var(--rule);padding-top:23px;margin-top:23px}",
 ".hsi h2,.odi h2{font-family:var(--f-title);font-size:clamp(25px,3vw,31px);margin:0 0 6px}",
 ".hsi h3,.odi h3{font-size:1.08rem;margin:0 0 8px}",
 ".hsi p,.odi p{margin:7px 0 14px}.hsi .hint,.odi .hint{font-size:.88rem;color:var(--muted)}",
 ".hsi .layout{display:grid;grid-template-columns:minmax(0,310px) minmax(0,1fr);gap:22px;align-items:start}",
 ".hsi .diagram,.odi .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:10px;min-width:0}",
 ".hsi svg,.odi svg{display:block;width:100%;height:auto}.hsi svg{max-height:430px}",
 ".hsi .body{fill:color-mix(in srgb,var(--paper) 75%,var(--soft));stroke:var(--muted);stroke-width:2;stroke-opacity:.5}",
 ".hsi .layout{grid-template-columns:minmax(0,400px) minmax(0,1fr)}",
 ".hsi svg{max-height:none}",
 ".hsi .organ{opacity:.66;transition:opacity .22s ease;cursor:pointer;outline:none}",
 ".hsi .organ.active,.hsi .organ:hover,.hsi .organ:focus-visible{opacity:1}",
 ".hsi .sys-integumentary .part{fill:#f3d9ca;stroke:#c28f7c}",
 ".hsi .sys-skeletal .part{fill:#e8ddc8;stroke:#9d876b}",
 ".hsi .sys-muscular .part{fill:#d9867d;stroke:#a94f4c}",
 ".hsi .sys-nervous .part{fill:#d5b6dc;stroke:#895b9b}",
 ".hsi .sys-respiratory .part{fill:#d9edf4;stroke:#408eb7}",
 ".hsi .sys-circulatory .part{fill:#f3d0d2;stroke:#a84755}",
 ".hsi .sys-digestive .part{fill:#edc4a3;stroke:#b67853}",
 ".hsi .organ:focus-visible .part{stroke:#172b3c;stroke-width:3}",
 ".hsi .organ{cursor:pointer;outline:none}.hsi .organ .part{fill:color-mix(in srgb,var(--accent) 27%,var(--paper));stroke:var(--accent);stroke-width:2;transition:fill .2s,stroke-width .2s}",
 ".hsi .organ.active .part,.hsi .organ:hover .part{fill:color-mix(in srgb,var(--accent) 65%,var(--paper));stroke-width:3}.hsi .organ:focus-visible .part{stroke:var(--ink);stroke-width:4}",
 ".hsi button,.odi button{cursor:pointer;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:var(--btn-radius,8px);padding:9px 11px;font:inherit;min-height:38px}",
 ".hsi button:focus-visible,.odi button:focus-visible,.odi select:focus-visible,.odi textarea:focus-visible,.odi input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
 ".hsi .tabs,.hsi .steps,.hsi .answers,.odi .actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}",
 ".hsi .tabs button,.hsi .steps button{flex:1 1 100px;font-size:.86rem}",
 ".hsi .tabs button[aria-pressed=true],.hsi .steps button[aria-current=step]{background:var(--accent);border-color:var(--accent);color:var(--paper)}",
 ".hsi .detail{min-height:154px}.hsi .step-detail{background:var(--soft);padding:12px;border-radius:var(--radius,12px);min-height:80px}",
 ".hsi .quiz{margin-top:22px;border-top:1px solid var(--rule);padding-top:16px}.hsi .answers button{flex:1 1 150px;text-align:left}",
 ".hsi .feedback{min-height:29px;font-weight:650}.hsi .next:disabled{opacity:.45}",
 ".odi .diagram svg text{font:600 15px var(--f-body,system-ui);fill:var(--ink)}.odi .diagram .box{fill:var(--paper);stroke:var(--rule);stroke-width:2}",
 ".odi .diagram .flow{fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:8 8;stroke-linecap:round}.odi .diagram .flow.limited{stroke:var(--bad)}",
 ".odi .controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:15px 0}",
 ".odi .controls label{display:flex;justify-content:space-between;gap:8px;font-weight:650;font-size:.88rem}",
 ".odi input[type=range]{accent-color:var(--accent);width:100%;margin-top:12px}",
 ".odi .bars{display:grid;grid-template-columns:1fr 1fr;gap:15px}.odi .bar-top{display:flex;justify-content:space-between;font-size:.9rem;font-weight:650}",
 ".odi .track{height:10px;margin:6px 0;background:var(--soft);border:1px solid var(--rule);border-radius:8px;overflow:hidden}",
 ".odi .fill{background:var(--accent);height:100%;transition:width .23s}.odi .fill.demand{background:var(--muted)}",
 ".odi .result{min-height:40px;font-weight:650}.odi .investigate{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}",
 ".odi select,.odi textarea{box-sizing:border-box;width:100%;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);font:inherit}",
 ".odi textarea{min-height:86px;resize:vertical}.odi .table-scroll{overflow-x:auto;max-width:100%}.odi table{border-collapse:collapse;width:100%;font-size:.84rem}",
 ".odi td,.odi th{padding:8px 5px;text-align:left;border-bottom:1px solid var(--rule)}.odi th{white-space:nowrap}",
 "@media(max-width:740px){.hsi .layout{grid-template-columns:1fr}.hsi .diagram{max-width:330px;margin:auto;width:100%}.odi .controls,.odi .investigate{grid-template-columns:1fr}}",
 "@media(max-width:450px){.odi .bars{grid-template-columns:1fr}}",
 "@media(prefers-reduced-motion:reduce){.hsi .organ .part,.odi .fill{transition:none}}"
].join("\n");
const body=`
<svg viewBox="0 0 430 530" role="img" aria-labelledby="body-title body-desc">
<title id="body-title">Interactive human systems anatomy atlas</title>
<desc id="body-desc">A detailed schematic showing the brain and nerves, airway and lungs, heart and blood vessels, digestive organs, muscles, bones, and a magnified skin cross-section. Select a system with the buttons to highlight it. Not to scale.</desc>
<defs>
 <pattern id="hsi-fibres" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><path d="M0 1H8M0 5H8" stroke="#a94743" stroke-width="1" opacity=".42"/></pattern>
 <pattern id="hsi-bone" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".7" fill="#9d876b" opacity=".45"/><circle cx="4.5" cy="4.5" r=".7" fill="#9d876b" opacity=".45"/></pattern>
</defs>
<rect x="5" y="5" width="420" height="520" rx="18" fill="#f8fafc" stroke="#d9e1e9"/>
<text x="20" y="28" fill="#526175" font-size="11" font-weight="700" letter-spacing="1.3">HUMAN SYSTEMS · ANATOMY ATLAS</text>

<!-- body silhouette and integumentary cross-section -->
<g class="organ sys-integumentary" data-organ="integumentary" role="button" tabindex="0" aria-label="Skin, hair and nails, integumentary system">
 <path class="part" d="M191 91 Q169 98 158 117 L132 156 Q123 172 116 196 L93 251 Q88 263 98 270 L109 268 L137 222 L143 277 L147 351 L139 440 Q139 451 153 453 L168 452 L184 358 L201 358 L211 452 L227 452 L244 358 L260 452 L276 453 Q290 451 288 440 L277 351 L284 277 L290 222 L318 268 L329 270 Q339 263 334 251 L311 196 Q304 172 295 156 L269 117 Q257 98 235 91 Z" fill="#f3d9ca" stroke="#c28f7c" stroke-width="2.3"/>
 <ellipse class="part" cx="213" cy="59" rx="34" ry="39" fill="#f3d9ca" stroke="#c28f7c" stroke-width="2.3"/>
 <path d="M184 59q8-7 16 0m26 0q8-7 16 0M201 78q12 8 24 0" fill="none" stroke="#9e6f63" stroke-width="1.8" stroke-linecap="round"/>
 <path d="M179 45q5-21 22-24m-8 33q5-17 17-18m21-12q14 3 20 19m-10 7q-2-12-12-16" fill="none" stroke="#7d5c50" stroke-width="1.5"/>
 <path d="M141 166q-14 32-18 56m178-56q14 32 18 56M153 289q7 36 8 57m104-57q-7 36-8 57" fill="none" stroke="#d6a695" stroke-width="1.1" opacity=".8"/>
</g>

<!-- skeleton: ribs, spine, pelvis and long bones -->
<g class="organ sys-skeletal" data-organ="skeletal" role="button" tabindex="0" aria-label="Bones and joints, skeletal system">
 <g fill="none" stroke="#d5c7aa" stroke-width="6" stroke-linecap="round">
  <path d="M189 120Q168 111 157 124M237 120q21-9 32 4"/>
  <path d="M211 130v119M215 136v111"/>
  <path d="M211 139q-33-14-45 3t-1 18q17-7 46 1M219 139q33-14 45 3t1 18q-17-7-46 1"/>
  <path d="M210 161q-34-12-46 4t0 17q19-5 46 2M220 161q34-12 46 4t0 17q-19-5-46 2"/>
  <path d="M210 183q-32-10-43 5t2 16q18-4 41 3M220 183q32-10 43 5t-2 16q-18-4-41 3"/>
  <path d="M210 205q-27-7-37 7t5 14q13-2 32 4M220 205q27-7 37 7t-5 14q-13-2-32 4"/>
  <path d="M194 244q19-9 39 0l12 22-25 22-28-10-12-16z"/>
  <path d="M194 253l-24 36m70-36 23 36M187 272l-20 73m63-73 21 73"/>
  <path d="M171 293l-7 71m88-71 7 71M163 365l-9 72m103-72 9 72"/>
  <path d="M159 143l-28 52m138-52 28 52M132 196l-19 52m183-52 19 52"/>
  <path d="M115 248l-10 15m210-15 10 15"/>
 </g>
 <g fill="url(#hsi-bone)" stroke="#a89273" stroke-width="1.2" opacity=".9">
  <path d="M194 246q19-9 39 0l12 22-25 22-28-10-12-16z"/>
  <path d="M163 365l-8 73m17-74-7 73M245 365l7 73m17-74 7 73"/>
 </g>
 <g fill="#d5c7aa" stroke="#a89273" stroke-width="1.4">
  <circle cx="131" cy="196" r="5"/><circle cx="294" cy="196" r="5"/><circle cx="164" cy="365" r="5"/><circle cx="254" cy="365" r="5"/>
 </g>
</g>

<!-- muscular system: paired shoulder, arm, chest, abdominal and leg muscles -->
<g class="organ sys-muscular" data-organ="muscular" role="button" tabindex="0" aria-label="Skeletal muscles and diaphragm, muscular system">
 <g fill="#d9867d" stroke="#a94f4c" stroke-width="1.5">
  <path class="part" d="M181 119q-22 2-27 23l18 22 21-14-3-22zM245 119q22 2 27 23l-18 22-21-14 3-22z"/>
  <path class="part" d="M169 142q-13-5-21 10l-19 48 10 17q14-23 23-35l16-20zM257 142q13-5 21 10l19 48-10 17q-14-23-23-35l-16-20z"/>
  <path class="part" d="M184 154q-20-6-27 12l17 47 35-9 4-37zM242 154q20-6 27 12l-17 47-35-9-4-37z"/>
  <path class="part" d="M184 215q29-11 57 0l-5 30q-23 10-47 0z"/>
  <path class="part" d="M183 252q-18 8-22 27l20 17 24-16-2-24zM243 252q18 8 22 27l-20 17-24-16 2-24z"/>
  <path class="part" d="M169 292q-12 8-11 24l23 46 20-6-5-39-11-24zM257 292q12 8 11 24l-23 46-20-6 5-39 11-24z"/>
  <path class="part" d="M161 368q-18 4-19 24l9 48 23 3 9-44-4-28zM265 368q18 4 19 24l-9 48-23 3-9-44 4-28z"/>
 </g>
 <g fill="none" stroke="url(#hsi-fibres)" stroke-width="8" opacity=".9">
  <path d="M164 151l-16 53m105-53 16 53M177 165l16 37m49-37-16 37M170 301l17 47m70-47-17 47M153 388l8 40m104-40-8 40"/>
 </g>
 <path d="M184 212q29 15 57 0" fill="none" stroke="#a94f4c" stroke-width="2"/>
</g>

<!-- nervous system: folded cortex, spinal cord and branching peripheral nerves -->
<g class="organ sys-nervous" data-organ="nervous" role="button" tabindex="0" aria-label="Brain, spinal cord and peripheral nerves, nervous system">
 <path class="part" d="M192 47q-10-16 4-23 7-10 18-3 10-8 18 0 13-2 15 11 11 4 7 17 7 12-5 19-2 13-16 12-8 9-19 1-9 7-16 0-12 4-16-8-14-1-9-14-8-7-1-12z" fill="#d5b6dc" stroke="#895b9b" stroke-width="2"/>
 <path d="M198 34q9-7 12 4t-7 10m21-20q-6 8 3 12t-4 11m15-13q-8 3-4 11t-5 9m-41-1q10-5 13 3t-2 10m26-7q-7-5-12 1t4 10m20-4q-9-5-13 2" fill="none" stroke="#956ba5" stroke-width="2" stroke-linecap="round"/>
 <path d="M213 94v148m0-102q-17 5-28 23t-16 40m44-56q20 4 30 22t17 40M213 176q-18 5-29 19m29-2q19 5 30 20M213 218q-18 6-28 22m28-6q17 6 25 22M213 241v80m0-47q-13 9-20 22m20-9q15 8 21 20" fill="none" stroke="#8b59a0" stroke-width="2.6" stroke-linecap="round"/>
 <g fill="#8b59a0"><circle cx="169" cy="197" r="3"/><circle cx="260" cy="197" r="3"/><circle cx="184" cy="194" r="3"/><circle cx="244" cy="213" r="3"/><circle cx="185" cy="240" r="3"/><circle cx="235" cy="256" r="3"/></g>
</g>

<!-- respiratory system: airway, branching bronchi, lung lobes and alveoli detail -->
<g class="organ sys-respiratory" data-organ="respiratory" role="button" tabindex="0" aria-label="Trachea, bronchi and lungs, respiratory system">
 <path d="M213 119v46m-5-44h10m-10 7h10m-10 7h10m-10 7h10m-10 7h10" fill="none" stroke="#408eb7" stroke-width="3" stroke-linecap="round"/>
 <path class="part" d="M209 163q-17-13-31-3-17 7-22 31-8 31 4 52 12 17 31 5 12-9 18-24zM217 163q17-13 31-3 17 7 22 31 8 31-4 52-12 17-31 5-12-9-18-24z" fill="#d9edf4" stroke="#408eb7" stroke-width="2"/>
 <path d="M213 163l-16 13m16-13 16 13m-16-2-21 14m21-14 21 14m-43 0-13 13m13-13-1 25m50-25 13 13m-13-13 1 25m-49-25-9 17m59-17 9 17" fill="none" stroke="#438fb5" stroke-width="2.3" stroke-linecap="round"/>
 <path d="M164 194q13-7 26 1m-31 11q14-8 29 0m-24 13q14-7 27 1m49-25q-13-7-26 1m31 11q-14-8-29 0m24 13q-14-7-27 1" fill="none" stroke="#78b2c9" stroke-width="1.5"/>
 <g fill="#fff" stroke="#408eb7" stroke-width="1.4"><circle cx="162" cy="232" r="4"/><circle cx="170" cy="236" r="4"/><circle cx="178" cy="232" r="4"/><circle cx="248" cy="232" r="4"/><circle cx="256" cy="236" r="4"/><circle cx="264" cy="232" r="4"/></g>
 <path d="M166 235l-8 12m11-10v14m7-14 5 12m67-14 8 12m-11-10v14m-7-14-5 12" stroke="#408eb7" stroke-width="1.2"/>
</g>

<!-- circulatory system: heart with four chambers and systemic/pulmonary vessels -->
<g class="organ sys-circulatory" data-organ="circulatory" role="button" tabindex="0" aria-label="Four-chambered heart and blood vessels, circulatory system">
 <path d="M212 195q-12-19-22-8-12 12 2 27l21 22 20-22q15-16 2-27-11-10-23 8z" fill="#f3d0d2" stroke="#a84755" stroke-width="2"/>
 <path d="M212 197v31m3-31v31m-25-13h22m4 0h20" fill="none" stroke="#a84755" stroke-width="1.6"/>
 <path d="M212 195q-12-19-22-8-12 12 2 27m23-19q12-19 22-8 12 12-2 27" fill="none" stroke="#a84755" stroke-width="1.2"/>
 <path d="M205 198q-9 6-2 12m17-12q9 6 2 12" fill="none" stroke="#c7787e" stroke-width="1.4"/>
 <path d="M203 195v-20q0-7 6-7v27m7 0v-26q0-7 6-7v32" fill="none" stroke="#b44c58" stroke-width="4" stroke-linecap="round"/>
 <path d="M201 191q-10-14-15-28m31 30q16-18 27-21" fill="none" stroke="#427aab" stroke-width="3.3" stroke-linecap="round"/>
 <path d="M200 211q-21 9-35 20l-5 22m54-17v45m7-45q23 8 39 22l8 20" fill="none" stroke="#bd5965" stroke-width="2.6" stroke-linecap="round"/>
 <path d="M163 231q-9-7-17-13m17 13-3 20m101-20q9-7 17-13m-17 13 3 20" fill="none" stroke="#648fb5" stroke-width="2"/>
 <g fill="#fff" stroke="#b55260" stroke-width="1"><circle cx="162" cy="254" r="2.5"/><circle cx="268" cy="254" r="2.5"/><circle cx="214" cy="280" r="2.5"/></g>
</g>

<!-- digestive system: liver, stomach, pancreas and detailed bowel -->
<g class="organ sys-digestive" data-organ="digestive" role="button" tabindex="0" aria-label="Digestive tract, liver, stomach and intestines, digestive system">
 <path d="M213 132v101" fill="none" stroke="#ad7054" stroke-width="3"/>
 <path d="M210 230q-23-20-43-12-16 7-12 22 7 18 30 17 20 0 29-15z" fill="#a95f55" stroke="#76453f" stroke-width="1.8"/>
 <path d="M199 249q-6 4-10 13l-5 4" fill="none" stroke="#62825b" stroke-width="2"/>
 <path class="part" d="M216 237q24-12 39 2 14 14 2 27-10 10-31 6-11-4-10-15z" fill="#edc4a3" stroke="#b67853" stroke-width="2"/>
 <path d="M228 246q12-9 21 1t-2 15q-9 5-14-2m-16 18q15-8 32-3" fill="none" stroke="#bd8665" stroke-width="1.5"/>
 <path d="M226 275q-10 7-16 3t-13 2" fill="none" stroke="#d39a65" stroke-width="3"/>
 <path d="M184 276q-9 6-7 17v28q0 11 10 11h46q10 0 10-11v-28q0-11-9-17" fill="none" stroke="#b77b54" stroke-width="7" stroke-linejoin="round"/>
 <path d="M188 281q-5 3-5 11v28q0 5 5 5h43q5 0 5-5v-28q0-8-5-11" fill="none" stroke="#e5b99a" stroke-width="3"/>
 <path d="M190 287q32-8 41 2t-40 7q-6 9 38 8t2 9q-34-7-41 2t39 7" fill="none" stroke="#d38c69" stroke-width="2.2" stroke-linecap="round"/>
 <path d="M213 331v12q0 12-10 12" fill="none" stroke="#b77b54" stroke-width="3"/>
</g>

<!-- skin inset: epidermis, dermis, hair follicle, sweat gland, capillaries -->
<g aria-label="Magnified skin cross-section">
 <path d="M289 292Q322 300 330 325" fill="none" stroke="#aa887b" stroke-width="1.2" stroke-dasharray="3 3"/>
 <rect x="300" y="324" width="111" height="115" rx="9" fill="#fff" stroke="#c9d4df"/>
 <text x="309" y="338" fill="#526175" font-size="8.5" font-weight="700">SKIN · MAGNIFIED</text>
 <path d="M308 345h95v15q-15-5-28 0t-24 0q-19-5-43 0z" fill="#eabca8" stroke="#bd8b77" stroke-width="1"/>
 <path d="M308 360q19-5 38 0t39 0q10-3 18 0v48h-95z" fill="#f3d7c9" stroke="#d2a28f" stroke-width="1"/>
 <path d="M308 408h95v20h-95z" fill="#f5e6ce" stroke="#d2c09d" stroke-width="1"/>
 <text x="312" y="357" fill="#684c45" font-size="7">epidermis</text><text x="312" y="377" fill="#684c45" font-size="7">dermis</text><text x="312" y="423" fill="#684c45" font-size="7">fat layer</text>
 <path d="M347 345q-1 22-8 39t-1 22q7 7 12 1t-2-9q-5-2-3-8l6-23q2-10 1-22" fill="none" stroke="#73574d" stroke-width="2.1"/>
 <path d="M347 382q-14 1-15 11m15-11q13 3 14 12" fill="none" stroke="#a87562" stroke-width="1.3"/>
 <path d="M378 350q5 6 0 11t1 11q5 6 0 12t1 11" fill="none" stroke="#488cb0" stroke-width="1.7"/>
 <path d="M379 373q-7-3-9 2m9 7q7-4 10 1" fill="none" stroke="#bc6370" stroke-width="1.4"/>
 <circle cx="379" cy="348" r="2" fill="#488cb0"/>
 <text x="306" y="451" fill="#64748b" font-size="7.5">barrier · sensation · temperature</text>
</g>

<!-- labels and orientation cues -->
<g fill="#526175" font-size="8.5" font-weight="650">
 <text x="19" y="95">BRAIN</text><path d="M47 92h112l33-25" fill="none" stroke="#a9b5c2" stroke-width="1"/>
 <text x="19" y="176">LUNGS</text><path d="M49 173h96l24 18" fill="none" stroke="#a9b5c2" stroke-width="1"/>
 <text x="19" y="240">HEART</text><path d="M48 237h108l43-23" fill="none" stroke="#a9b5c2" stroke-width="1"/>
 <text x="19" y="326">DIGESTIVE TRACT</text><path d="M97 323h71l18-9" fill="none" stroke="#a9b5c2" stroke-width="1"/>
 <text x="19" y="492">SKELETON + MUSCLES</text><path d="M117 489h26l20-54" fill="none" stroke="#a9b5c2" stroke-width="1"/>
</g>
<path d="M20 509h390" stroke="#d9e1e9"/>
<text x="20" y="520" fill="#64748b" font-size="8.5">Interactive schematic · structures simplified · not to scale</text>
</svg>`;
function renderSystems(el){
 let chosen="respiratory",step=0,q=0,selected=null;
 el.innerHTML='<section class="hsi"><style>'+STYLE+'</style><h2>Human Systems Explorer</h2>'+
 '<p class="hint">Choose an organ, explore its role and trace how it works with other systems. Based on the Systems booklet.</p>'+
 '<div class="layout"><div class="diagram">'+body+'</div><div><div class="tabs" role="group" aria-label="Choose a body system"></div>'+
 '<div class="detail" aria-live="polite"></div><h3>Trace the pathway</h3><div class="steps" role="group" aria-label="Pathway stages"></div><div class="step-detail" aria-live="polite"></div></div></div>'+
 '<div class="quiz"><h3>Check the connections</h3><div class="question"></div><div class="answers"></div><p class="feedback" aria-live="polite"></p><button class="next" type="button" disabled>Next question</button></div>'+
 '<p class="hint">This diagram is simplified. Real systems include many more structures, and the shapes are not anatomically to scale.</p></section>';
 const get=k=>el.querySelector(k),keys=Object.keys(SYSTEMS);
 function draw(){
  const s=SYSTEMS[chosen];get(".tabs").innerHTML=keys.map(k=>'<button data-system="'+k+'" type="button" aria-pressed="'+(k===chosen)+'">'+SYSTEMS[k].name+'</button>').join("");
  get(".detail").innerHTML='<h3>'+esc(s.name)+' system</h3><p><b>Organs:</b> '+esc(s.organs)+'</p><p>'+esc(s.job)+'</p><p class="hint"><b>Connection:</b> '+esc(s.link)+'</p>';
  get(".steps").innerHTML=s.path.map((item,i)=>'<button type="button" data-step="'+i+'" aria-current="'+(step===i?'step':'false')+'">'+(i+1)+'. '+esc(item[0])+'</button>').join("");
  get(".step-detail").innerHTML='<b>'+esc(s.path[step][0])+'</b><p>'+esc(s.path[step][1])+'</p>';
  el.querySelectorAll("[data-organ]").forEach(g=>g.classList.toggle("active",g.dataset.organ===chosen));
 }
 function quiz(){
  const item=QUIZ[q];get(".question").innerHTML='<b>'+(q+1)+' / '+QUIZ.length+' · '+esc(item.q)+'</b>';
  get(".answers").innerHTML=item.a.map((v,i)=>'<button type="button" data-answer="'+i+'" '+(selected!==null?'disabled':'')+'>'+esc(v)+'</button>').join("");
  get(".feedback").textContent=selected===null?"":(selected===item.c?"Correct. ":"Not quite. ")+item.why;
  get(".next").disabled=selected===null;get(".next").textContent=q===QUIZ.length-1?"Start again":"Next question";
 }
 function choose(k){if(!SYSTEMS[k])return;chosen=k;step=0;draw();}
 el.addEventListener("click",e=>{
  const b=e.target.closest("[data-system],[data-organ],[data-step],[data-answer],.next");if(!b||!el.contains(b))return;
  if(b.dataset.system||b.dataset.organ)choose(b.dataset.system||b.dataset.organ);
  else if(b.dataset.step!==undefined){step=Number(b.dataset.step);draw();}
  else if(b.dataset.answer!==undefined&&selected===null){selected=Number(b.dataset.answer);quiz();}
  else if(b.classList.contains("next")&&selected!==null){q=(q+1)%QUIZ.length;selected=null;quiz();}
 });
 el.addEventListener("keydown",e=>{const a=e.target.closest("[data-organ]");if(a&&(e.key===" "||e.key==="Enter")){e.preventDefault();choose(a.dataset.organ);}});
 draw();quiz();
 el.systemsExplorer={select:choose,get current(){return chosen},get step(){return step}};
}
function oxygenModel(v){
 for(const k of ["breathing","circulation","activity"])if(!Number.isFinite(v[k])||v[k]<0||v[k]>100)throw Error("Values must be 0 to 100");
 const lung=Math.round(30+v.breathing*.7),pump=Math.round(30+v.circulation*.7),need=Math.round(30+v.activity*.65),delivered=Math.min(lung,pump);
 return {lung,pump,need,delivered,limit:lung<pump?"respiratory":pump<lung?"circulatory":"both",enough:delivered>=need};
}
function renderOxygen(el){
 let v={breathing:60,circulation:60,activity:30},trials=[];
 const controls=[["breathing","Breathing effectiveness"],["circulation","Circulation effectiveness"],["activity","Muscle activity"]];
 const diagram='<svg viewBox="0 0 750 192" role="img" aria-label="Simplified path from lungs to heart and blood to muscle cells.">'+
 '<defs><marker id="oxygen-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--accent)"/></marker></defs>'+
 '<path id="od-lung-flow" class="flow" d="M218 91H278" marker-end="url(#oxygen-arrow)"/><path id="od-pump-flow" class="flow" d="M458 91H515" marker-end="url(#oxygen-arrow)"/>'+
 '<rect class="box" x="10" y="28" width="208" height="124" rx="15"/><rect class="box" x="280" y="28" width="177" height="124" rx="15"/><rect class="box" x="518" y="28" width="223" height="124" rx="15"/>'+
 '<text x="114" y="53" text-anchor="middle">Lungs</text><text x="369" y="53" text-anchor="middle">Heart and blood</text><text x="629" y="53" text-anchor="middle">Muscle cells</text>'+
 '<text x="114" y="80" text-anchor="middle">Add oxygen</text><text x="369" y="80" text-anchor="middle">Carry oxygen</text><text x="629" y="80" text-anchor="middle">Use oxygen</text>'+
 '<text id="od-lung" x="114" y="121" text-anchor="middle">—</text><text id="od-pump" x="369" y="121" text-anchor="middle">—</text><text id="od-need" x="629" y="121" text-anchor="middle">—</text>'+
 '<text x="375" y="181" text-anchor="middle" font-size="12">Index values only · not a medical model</text></svg>';
 el.innerHTML='<section class="odi"><style>'+STYLE+'</style><h2>Oxygen Delivery Lab</h2>'+
 '<p class="hint">Change one condition at a time to model how the respiratory and circulatory systems work together to meet muscle-cell demand.</p>'+
 '<div class="diagram">'+diagram+'</div><div class="controls">'+controls.map(([key,label])=>'<div><label for="od-'+key+'">'+label+' <output id="od-'+key+'-value">'+v[key]+'</output></label><input id="od-'+key+'" type="range" data-control="'+key+'" min="0" max="100" step="10" value="'+v[key]+'"></div>').join("")+'</div>'+
 '<div class="bars"><div><div class="bar-top"><span>Oxygen delivered</span><output id="od-delivered">—</output></div><div class="track"><div id="od-supply" class="fill"></div></div></div>'+
 '<div><div class="bar-top"><span>Muscle need</span><output id="od-demand">—</output></div><div class="track"><div id="od-needbar" class="fill demand"></div></div></div></div>'+
 '<p class="result" id="od-result" role="status"></p><p class="hint">Teaching model: lungs supply oxygen, blood flow carries it, and the smaller capacity limits delivery. Activity changes the need. All values are illustrative indexes, not actual oxygen saturation, breathing rates or heart rates.</p>'+
 '<div class="investigate"><div><h3>Predict and test</h3><p class="hint">What happens if muscle activity rises but one delivery system stays less effective? Change only one slider at a time and record two trials.</p>'+
 '<div class="actions"><button id="od-record" type="button">Record trial</button><button id="od-reset" type="button">Reset controls</button></div></div>'+
 '<div><h3>Compare</h3><label for="od-predict">Which system is limiting delivery now?</label><select id="od-predict"><option value="">Make a prediction</option><option value="respiratory">Respiratory</option><option value="circulatory">Circulatory</option><option value="both">Both equally</option></select><p class="hint" id="od-pred-result" aria-live="polite"></p></div></div>'+
 '<div class="table-scroll"><table><thead><tr><th>Trial</th><th>Breathing</th><th>Flow</th><th>Activity</th><th>Delivered</th><th>Need</th><th>Limit</th></tr></thead><tbody id="od-trials"><tr><td colspan="7">No trials recorded.</td></tr></tbody></table></div>'+
 '<div class="investigate"><label>What evidence did the trials show?<textarea id="od-observe" placeholder="When I changed... the model showed..."></textarea></label>'+
 '<label>How do these systems work together?<textarea id="od-explain" placeholder="The lungs..., the blood..., and the muscle cells..."></textarea></label></div>'+
 '<div class="actions"><button id="od-download" type="button">Download investigation</button><button id="od-clear" type="button">Clear trials</button></div><p class="hint" id="od-message" role="status"></p></section>';
 const get=k=>el.querySelector(k),name=k=>k==="respiratory"?"respiratory system":k==="circulatory"?"circulatory system":"both systems";
 function draw(){
  const m=oxygenModel(v);
  controls.forEach(([key])=>{get("#od-"+key).value=v[key];get("#od-"+key+"-value").textContent=String(v[key]);});
  get("#od-lung").textContent=String(m.lung);get("#od-pump").textContent=String(m.pump);get("#od-need").textContent=String(m.need);
  get("#od-delivered").textContent=String(m.delivered);get("#od-demand").textContent=String(m.need);
  get("#od-supply").style.width=m.delivered+"%";get("#od-needbar").style.width=m.need+"%";
  get("#od-lung-flow").classList.toggle("limited",m.limit==="respiratory");
  get("#od-pump-flow").classList.toggle("limited",m.limit==="circulatory");
  get("#od-result").textContent=m.enough?"Model supply meets muscle demand. The current limit is the "+name(m.limit)+".":"Model supply is below muscle demand. The limiting factor is the "+name(m.limit)+".";
  const p=get("#od-predict").value;get("#od-pred-result").textContent=p?(p===m.limit?"Your prediction matches the model.":"The model's limiting factor is "+name(m.limit)+"."):"";
 }
 function showTrials(){
  get("#od-trials").innerHTML=trials.length?trials.map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+t.breathing+'</td><td>'+t.circulation+'</td><td>'+t.activity+'</td><td>'+t.delivered+'</td><td>'+t.need+'</td><td>'+esc(name(t.limit))+'</td></tr>').join(""):'<tr><td colspan="7">No trials recorded.</td></tr>';
 }
 el.addEventListener("input",e=>{const key=e.target.dataset.control;if(Object.prototype.hasOwnProperty.call(v,key)){v[key]=Number(e.target.value);draw();}});
 get("#od-predict").addEventListener("change",draw);
 get("#od-record").onclick=()=>{trials.push(Object.assign({},v,oxygenModel(v)));if(trials.length>8)trials.shift();showTrials();get("#od-message").textContent="Trial recorded locally. Try a second condition.";};
 get("#od-reset").onclick=()=>{v={breathing:60,circulation:60,activity:30};draw();};
 get("#od-clear").onclick=()=>{trials=[];showTrials();get("#od-message").textContent="Trial table cleared.";};
 get("#od-download").onclick=()=>{
  const text=["Oxygen Delivery Lab — Grade 8 Science","Recorded trials (illustrative indexes):",trials.length?trials.map((t,i)=>(i+1)+". Breathing "+t.breathing+", flow "+t.circulation+", activity "+t.activity+"; delivered "+t.delivered+", need "+t.need+"; limit: "+name(t.limit)).join("\n"):"No trials recorded.","What evidence did the trials show?",get("#od-observe").value.trim(),"How do these systems work together?",get("#od-explain").value.trim(),"Model limitation: simplified comparison, not actual physiology."].join("\n\n");
  const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download="oxygen-delivery-investigation.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);get("#od-message").textContent="Investigation downloaded.";
 };
 draw();showTrials();
 el.oxygenStudio={get values(){return Object.assign({},v)},get trials(){return trials.slice()},set(next){v=Object.assign({},v,next);draw();}};
}
H.systemInteractions={systems:SYSTEMS,questions:QUIZ,oxygenModel};
function extend(key,render,first){
 const previous=H.lessonTools&&H.lessonTools[key];H.lessonTools=H.lessonTools||{};
 H.lessonTools[key]=function(root){
  const fresh=document.createElement("div"),old=previous?document.createElement("div"):null;
  if(first){root.appendChild(fresh);render(fresh);if(old){root.appendChild(old);previous(old);}}
  else{if(old){root.appendChild(old);previous(old);}root.appendChild(fresh);render(fresh);}
 };
}
extend("cells/systems",renderSystems,true);
extend("cells/circulatory",renderOxygen,false);
H.systemExplorerData={systems:SYSTEMS,quiz:QUIZ};
})();