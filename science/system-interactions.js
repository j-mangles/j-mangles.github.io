/* Human Systems Explorer + Oxygen Delivery Lab.
   Grade 8 Cells & Systems booklet Topics 6–7. */
(function () {
"use strict";
const H=window.HUB;if(!H)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SYSTEMS={
 respiratory:{name:"Respiratory",organs:"Airways and lungs",job:"Moves air in and out of the body, supplying oxygen and removing carbon dioxide.",link:"The respiratory system exchanges gases with the blood. The circulatory system carries them between the lungs and body cells.",structures:[
  ["trachea","Trachea","The trachea carries air down the neck and into the chest."],["bronchi","Bronchi","The airway branches into two bronchi, one leading to each lung."],["lungs","Lungs","The lungs take in oxygen and remove carbon dioxide from the body."]],
  path:[["Air enters","Air travels down the trachea and branches into the lungs."],["Lungs","The lungs take in oxygen and remove carbon dioxide."],["Blood exchange","Oxygen enters the blood; carbon dioxide leaves it."],["Breathe out","Carbon dioxide leaves the body in exhaled air."]] },
 circulatory:{name:"Circulatory",organs:"Heart, blood and blood vessels",job:"Moves blood around the body, carrying oxygen and nutrients and taking away wastes.",link:"The heart pumps blood through blood vessels. Capillaries exchange materials with body cells.",structures:[
  ["heart","Heart","The heart has four muscular chambers that contract and relax to keep blood moving."],["arteries","Arteries","Arteries carry blood away from the heart. The pulmonary artery is an exception to the usual oxygen pattern."],["capillaries","Capillaries","Tiny capillaries exchange gases, nutrients and wastes with cells."],["veins","Veins","Veins carry blood toward the heart. The pulmonary veins are an exception to the usual oxygen pattern."],["blood","Blood","Blood carries materials around the body and includes plasma, red blood cells, white blood cells and platelets."]],
  path:[["Heart to lungs","The pulmonary artery carries oxygen-poor blood from the heart to the lungs."],["Lungs to heart","The pulmonary veins carry oxygen-rich blood back to the heart."],["Heart to body","Arteries carry blood away from the heart; capillaries exchange materials with cells."],["Body to heart","Veins return blood toward the heart. Arteries and veins are named by direction, not oxygen content."]] },
 digestive:{name:"Digestive",organs:"Mouth, stomach and intestines",job:"Breaks food into nutrients that can be absorbed and used by the body.",link:"The small intestine absorbs nutrients. Blood then carries them to body cells.",structures:[
  ["mouth","Mouth","Food enters through the mouth, where chewing begins its physical breakdown."],["esophagus","Esophagus","The esophagus moves swallowed food toward the stomach."],["liver","Liver","The liver produces bile, which helps break down food during digestion."],["stomach","Stomach","Muscular movement, acid and enzymes help break food down in the stomach."],["small-intestine","Small intestine","Most nutrient absorption takes place in the small intestine."],["large-intestine","Large intestine","The large intestine absorbs some materials and passes solid waste toward the rectum and anus."],["rectum","Rectum and anus","The large intestine passes solid waste to the rectum and anus."]],
  path:[["Mouth","Food enters the mouth and is chewed."],["Esophagus","Swallowed food moves toward the stomach."],["Stomach","Muscular movement, acid and enzymes break food down."],["Small intestine","Most nutrients are absorbed into the body here."],["Large intestine","Some materials are absorbed; solid waste moves toward the rectum and anus."],["To the cells","Blood can carry absorbed nutrients to body cells."]] },
 nervous:{name:"Nervous",organs:"Brain, spinal cord and nerves",job:"Coordinates activities by sending electrical signals between the brain and the rest of the body.",link:"The central nervous system is the brain and spinal cord. Peripheral nerves connect it with the rest of the body.",structures:[
  ["brain","Brain","The brain and spinal cord form the central nervous system."],["spinal-cord","Spinal cord","The spinal cord carries signals between the brain and nerves in the body."],["nerves","Peripheral nerves","A network of nerves connects the central nervous system to the rest of the body."],["neuron","Neuron","A neuron is a specialized cell that carries electrical signals."]],
  path:[["Information","Signals arrive from the body or the surroundings."],["Brain and spinal cord","The central nervous system processes information and coordinates activity."],["Nerves","Peripheral nerves carry signals between the central nervous system and the body."],["Response","The body responds to the information received."]] },
 integumentary:{name:"Integumentary",organs:"Skin, hair and nails",job:"Forms a protective outer layer and helps the body regulate its temperature.",link:"Blood vessels near the skin help release or conserve heat. The skin also protects the tissues underneath.",structures:[
  ["skin","Skin","Skin is the body's outer protective layer and its largest organ."],["hair","Hair","Hair grows from structures in the skin."],["nails","Nails","Nails are part of the integumentary system along with skin and hair."]],
  path:[["Protect","Skin, hair and nails form parts of the body's outer covering."],["Sense","Nerves in the skin detect conditions around the body."],["Adjust","The body can change heat loss at the skin's surface."],["Maintain","The integumentary and circulatory systems help regulate body temperature."]] }
};
const QUIZ=[
 {q:"Where are most digested nutrients absorbed?",a:["Stomach","Small intestine","Large intestine"],c:1,why:"Most nutrient absorption takes place in the small intestine."},
 {q:"How does oxygen reach body cells after entering the lungs?",a:["In blood","In the stomach","Through skin"],c:0,why:"The respiratory and circulatory systems work together."},
 {q:"Which two organs form the central nervous system?",a:["Brain and spinal cord","Heart and lungs","Stomach and liver"],c:0,why:"The brain and spinal cord form the central nervous system."},
 {q:"Which vessels allow exchange with cells?",a:["Arteries","Capillaries","Veins"],c:1,why:"Capillaries exchange gases, nutrients and wastes with cells."}
];
const STYLE=[
 ".hsi,.odi{color:var(--ink);min-width:0;line-height:1.5}",
 ".hsi{margin:0 0 30px}.odi{border-top:1px solid var(--rule);padding-top:23px;margin-top:23px}",
 ".hsi h2,.odi h2{font-family:var(--f-title);font-size:clamp(25px,3vw,31px);margin:0 0 6px}",
 ".hsi h3,.odi h3{font-size:1.08rem;margin:0 0 8px}",
 ".hsi p,.odi p{margin:7px 0 14px}.hsi .hint,.odi .hint{font-size:.88rem;color:var(--muted)}",
 ".hsi .layout{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);gap:22px;align-items:start}",
 ".hsi .diagram,.odi .diagram{background:var(--soft);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:10px;min-width:0}",
 ".hsi svg,.odi svg{display:block;width:100%;height:auto}.hsi svg{max-height:590px}",
 ".hsi .human-base{fill:color-mix(in srgb,var(--paper) 72%,var(--soft));stroke:var(--muted);stroke-width:2.2;stroke-linejoin:round}",
 ".hsi .organ{cursor:pointer;outline:none;transition:opacity .18s ease-out}.hsi .organ .part{fill:color-mix(in srgb,var(--accent) 22%,var(--paper));stroke:var(--accent);stroke-width:2;stroke-linejoin:round;transition:fill .18s ease-out,stroke-width .18s ease-out}",
 ".hsi .organ[data-organ=respiratory] .part{fill:color-mix(in srgb,#397e9e 30%,var(--paper));stroke:#397e9e}.hsi .organ[data-organ=circulatory] .part{fill:color-mix(in srgb,#b95249 25%,var(--paper));stroke:#b95249}",
 ".hsi .organ[data-organ=digestive] .part{fill:color-mix(in srgb,#bd873b 28%,var(--paper));stroke:#9a6828}.hsi .organ[data-organ=nervous] .part{fill:color-mix(in srgb,#8066a0 25%,var(--paper));stroke:#71568e}",
 ".hsi .organ[data-organ=integumentary] .part{fill:color-mix(in srgb,var(--accent) 23%,var(--paper));stroke:var(--accent)}",
 ".hsi .inset-bg{fill:var(--paper);stroke:var(--rule);stroke-width:1.5}.hsi .plasma{fill:color-mix(in srgb,#bd873b 18%,var(--paper));stroke:var(--rule)}.hsi .rbc{fill:#bd514e;stroke:#8f3937}.hsi .wbc{fill:var(--paper);stroke:#8066a0;stroke-width:3}.hsi .platelet{fill:#bd873b}",
 ".hsi .organ .part[fill=none]{fill:none!important}.hsi .organ[data-structure=skin] .part{fill:none!important;stroke-width:3}",
 ".hsi .organ:not(.active){opacity:.48}.hsi .organ.active{opacity:1}.hsi .organ.selected .part,.hsi .organ:hover .part{stroke-width:3.5}.hsi .organ:focus-visible .part{stroke:var(--ink);stroke-width:4}",
 ".hsi .callout{font:600 13px var(--f-body,system-ui);fill:var(--ink)}.hsi .leader{fill:none;stroke:var(--muted);stroke-width:1.3;stroke-dasharray:3 3}",
 ".hsi .vessel-rich{fill:none;stroke:#bd514e;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}.hsi .vessel-poor{fill:none;stroke:#347c9e;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}",
 ".hsi .air-route{fill:none;stroke:#397e9e;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.hsi .food-route{fill:none;stroke:#bd873b;stroke-width:3;stroke-dasharray:5 4;stroke-linecap:round}",
 ".hsi .nerve-route{fill:none;stroke:#8066a0;stroke-width:2.4;stroke-dasharray:3 3;stroke-linecap:round}.hsi .connections{opacity:.82;transition:opacity .18s ease-out}.hsi .connections.hidden{opacity:0;pointer-events:none}",
 ".hsi .map-controls{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:9px 0}.hsi .map-controls button{min-height:40px}.hsi .legend{display:flex;flex-wrap:wrap;gap:7px 14px;font-size:.78rem;color:var(--muted);margin:8px 0 15px}.hsi .legend span{display:flex;align-items:center;gap:6px}.hsi .legend i{display:inline-block;width:18px;border-top:3px solid var(--accent)}",
 ".hsi .legend .blood-rich{border-color:#bd514e}.hsi .legend .blood-poor{border-color:#347c9e}.hsi .legend .air{border-color:#397e9e}.hsi .legend .food{border-color:#bd873b;border-top-style:dashed}.hsi .legend .signal{border-color:#8066a0;border-top-style:dotted}",
 ".hsi button,.odi button{cursor:pointer;border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:var(--btn-radius,8px);padding:9px 11px;font:inherit;min-height:38px}",
 ".hsi button:focus-visible,.odi button:focus-visible,.odi select:focus-visible,.odi textarea:focus-visible,.odi input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}",
 ".hsi .tabs,.hsi .steps,.hsi .answers,.odi .actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}",
 ".hsi .tabs button,.hsi .steps button{flex:1 1 100px;font-size:.86rem}",
 ".hsi .tabs button[aria-pressed=true],.hsi .steps button[aria-current=step],.hsi .structures button[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--paper)}",
 ".hsi .detail{min-height:100px}.hsi .detail p{max-width:68ch}.hsi .structures{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 18px}.hsi .structures button{font-size:.84rem;min-height:40px}",
 ".hsi .step-detail{background:var(--soft);padding:12px;border-radius:var(--radius,12px);min-height:80px}.hsi .quiz{margin-top:22px;border-top:1px solid var(--rule);padding-top:16px}.hsi .answers button{flex:1 1 150px;text-align:left}",
 ".hsi .video-shelf{margin-top:22px;padding-top:17px;border-top:1px solid var(--rule)}.hsi .video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.hsi .video-card{display:flex;flex-direction:column;min-width:0;background:var(--paper);border:1px solid var(--rule);border-radius:var(--radius,12px);padding:13px}.hsi .video-card h4{font-size:.98rem;line-height:1.25;margin:0 0 6px}.hsi .video-card p{font-size:.88rem;color:var(--muted);margin:0 0 10px}.hsi .video-card a{margin-top:auto;color:var(--accent-ink);font-weight:700;text-underline-offset:3px}",
 ".hsi .feedback{min-height:29px;font-weight:650}.hsi .next:disabled{opacity:.45}",
 ".odi .diagram svg text{font:600 15px var(--f-body,system-ui);fill:var(--ink)}.odi .diagram .box{fill:var(--paper);stroke:var(--rule);stroke-width:2}",
 ".odi .diagram .flow{fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:8 8;stroke-linecap:round}.odi .diagram .flow.limited{stroke:var(--bad)}",
 ".odi .controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin:15px 0}.odi .controls label{display:flex;justify-content:space-between;gap:8px;font-weight:650;font-size:.88rem}",
 ".odi input[type=range]{accent-color:var(--accent);width:100%;margin-top:12px}.odi .bars{display:grid;grid-template-columns:1fr 1fr;gap:15px}.odi .bar-top{display:flex;justify-content:space-between;font-size:.9rem;font-weight:650}",
 ".odi .track{height:10px;margin:6px 0;background:var(--soft);border:1px solid var(--rule);border-radius:8px;overflow:hidden}.odi .fill{background:var(--accent);height:100%;transition:width .23s}.odi .fill.demand{background:var(--muted)}",
 ".odi .result{min-height:40px;font-weight:650}.odi .investigate{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}",
 ".odi select,.odi textarea{box-sizing:border-box;width:100%;padding:10px;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:var(--btn-radius,8px);font:inherit}.odi textarea{min-height:86px;resize:vertical}",
 ".odi .table-scroll{overflow-x:auto;max-width:100%}.odi table{border-collapse:collapse;width:100%;font-size:.84rem}.odi td,.odi th{padding:8px 5px;text-align:left;border-bottom:1px solid var(--rule)}.odi th{white-space:nowrap}",
 "@media(max-width:820px){.hsi .layout{grid-template-columns:1fr}.hsi .diagram{max-width:520px;margin:auto;width:100%}.odi .controls,.odi .investigate{grid-template-columns:1fr}}",
 "@media(max-width:520px){.hsi .video-grid{grid-template-columns:1fr}}",
 "@media(max-width:450px){.odi .bars{grid-template-columns:1fr}.hsi .callout{font-size:16px}}",
 "@media(prefers-reduced-motion:reduce){.hsi .organ,.hsi .organ .part,.hsi .connections,.odi .fill{transition:none}}"
].join("\n");
const body=[
 '<svg class="anatomy" viewBox="0 0 520 590" role="group" aria-labelledby="body-title body-desc">',
 '<title id="body-title">Explore the major organs and connections in five body systems</title><desc id="body-desc">A labelled body map showing the brain, spinal cord, nerves, airway, lungs, heart, blood vessels, digestive organs and skin. Select an organ or use the system and structure buttons.</desc>',
 '<defs><marker id="hsi-arrow-rich" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#bd514e"/></marker><marker id="hsi-arrow-poor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#347c9e"/></marker></defs>',
 '<path class="human-base" d="M239 105 Q211 106 193 126 L158 158 L114 254 Q108 270 122 277 Q136 282 144 266 L183 204 L177 307 L185 419 L168 555 Q166 570 183 573 L207 573 L235 420 L254 420 L282 573 L307 573 Q324 570 321 554 L304 419 L311 307 L305 204 L344 266 Q353 282 367 277 Q381 270 374 254 L331 158 Q313 106 285 105 Z"/>',
 '<ellipse class="human-base" cx="262" cy="61" rx="39" ry="44"/><path class="human-base" d="M239 96 L239 115 M285 96 L285 115"/>',
 '<g class="connections" id="body-connections">',
 '<path class="air-route" d="M262 117 L262 166 M262 166 Q243 176 232 193 M262 166 Q281 176 292 193"/>',
 '<path class="food-route" d="M261 100 L261 253 Q259 266 245 270 L247 309 Q249 325 262 327 L259 365"/>',
 '<path class="vessel-rich" marker-end="url(#hsi-arrow-rich)" d="M264 249 L264 193 L264 146 M264 249 L264 378 L263 397 M264 249 Q226 238 198 217 M264 249 Q302 238 326 217 M239 220 Q249 231 260 237"/>',
 '<path class="vessel-poor" marker-end="url(#hsi-arrow-poor)" d="M264 397 L264 249 M264 249 Q230 264 223 220 M264 249 Q298 264 305 220 M260 237 Q249 231 239 220"/>',
 '<path class="nerve-route" d="M262 88 L262 371 M262 150 L218 189 M262 150 L307 190 M262 233 L203 290 M262 233 L321 290 M262 338 L209 419 M262 338 L315 419"/>',
 '</g>',
 '<g class="organ" data-organ="integumentary" data-structure="skin" role="button" tabindex="0" aria-label="Skin, outer protective layer">',
 '<ellipse class="part" fill="none" cx="262" cy="61" rx="39" ry="44"/><path class="part" fill="none" d="M239 105 Q211 106 193 126 L158 158 L114 254 Q108 270 122 277 Q136 282 144 266 L183 204 L177 307 L185 419 L168 555 Q166 570 183 573 L207 573 L235 420 L254 420 L282 573 L307 573 Q324 570 321 554 L304 419 L311 307 L305 204 L344 266 Q353 282 367 277 Q381 270 374 254 L331 158 Q313 106 285 105"/>',
 '<path class="leader" d="M316 174 L398 142"/><text class="callout" x="402" y="138">Skin</text></g>',
 '<g class="organ" data-organ="nervous" data-structure="brain" role="button" tabindex="0" aria-label="Brain, part of the central nervous system">',
 '<path class="part" d="M237 57 Q231 36 248 28 Q259 17 273 27 Q292 24 296 42 Q309 54 297 68 Q291 82 274 81 Q260 91 247 80 Q231 75 237 57Z"/><path d="M262 31 Q255 42 263 51 Q254 59 260 75 M276 30 Q284 42 275 51 Q285 61 278 75" fill="none" stroke="var(--paper)" stroke-width="2" opacity=".9"/>',
 '<path class="leader" d="M236 53 L171 37"/><text class="callout" x="10" y="40">Brain</text></g>',
 '<g class="organ" data-organ="nervous" data-structure="spinal-cord" role="button" tabindex="0" aria-label="Spinal cord">',
 '<path class="part" d="M258 91 Q262 87 266 91 L267 216 Q263 221 259 216Z"/><path class="leader" d="M260 120 L180 111"/><text class="callout" x="10" y="114">Spinal cord</text></g>',
 '<g class="organ" data-organ="nervous" data-structure="nerves" role="button" tabindex="0" aria-label="Peripheral nerves branching through the body">',
 '<path class="part" d="M219 185 L201 205 L177 249 L181 252 L205 210 L224 190Z M305 186 L323 206 L347 249 L343 252 L319 210 L300 191Z M225 282 L199 302 L189 362 L193 363 L203 306 L229 286Z M299 282 L325 302 L335 362 L331 363 L321 306 L295 286Z M237 411 L212 437 L197 502 L201 503 L216 439 L241 415Z M286 411 L311 437 L326 502 L322 503 L307 439 L282 415Z"/>',
 '<path class="leader" d="M187 259 L117 273"/><text class="callout" x="10" y="277">Peripheral nerves</text></g>',
 '<g class="organ" data-organ="respiratory" data-structure="trachea" role="button" tabindex="0" aria-label="Trachea, the airway into the chest">',
 '<path class="part" d="M256 112 L268 112 L268 172 L256 172Z"/><path d="M257 122 L267 122 M257 132 L267 132 M257 142 L267 142 M257 152 L267 152 M257 162 L267 162" stroke="var(--paper)" stroke-width="1.5"/>',
 '<path class="leader" d="M269 130 L348 111"/><text class="callout" x="352" y="107">Trachea</text></g>',
 '<g class="organ" data-organ="respiratory" data-structure="bronchi" role="button" tabindex="0" aria-label="Bronchi branching from the trachea">',
 '<path class="part" d="M262 165 L241 187 L237 203 L242 205 L246 190 L264 174 L279 190 L284 204 L289 202 L285 187Z"/>',
 '<path class="leader" d="M283 185 L358 169"/><text class="callout" x="362" y="165">Bronchi</text></g>',
 '<g class="organ" data-organ="respiratory" data-structure="lungs" role="button" tabindex="0" aria-label="Lungs">',
 '<path class="part" d="M239 184 Q214 179 205 207 Q192 236 204 263 Q217 277 240 260 Q253 242 252 206 Q251 191 239 184Z"/><path class="part" d="M285 184 Q310 179 319 207 Q332 236 320 263 Q307 277 284 260 Q271 242 272 206 Q273 191 285 184Z"/>',
 '<path d="M245 201 Q229 214 222 242 M279 201 Q295 214 302 242" fill="none" stroke="var(--paper)" stroke-width="2" opacity=".9"/>',
 '<path class="leader" d="M319 226 L390 226"/><text class="callout" x="394" y="230">Lungs</text></g>',
 '<g class="organ" data-organ="circulatory" data-structure="heart" role="button" tabindex="0" aria-label="Heart, the muscular pump">',
 '<path class="part" d="M263 228 Q251 215 241 227 Q231 242 263 269 Q296 241 285 227 Q275 215 263 228Z"/><path d="M264 230 L264 263 M247 232 Q254 238 263 238 M281 232 Q273 238 264 238" fill="none" stroke="var(--paper)" stroke-width="1.8"/>',
 '<path class="leader" d="M286 244 L365 259"/><text class="callout" x="369" y="263">Heart</text></g>',
 '<g class="organ" data-organ="circulatory" data-structure="arteries" role="button" tabindex="0" aria-label="Arteries carry blood away from the heart">',
 '<path class="part" fill="none" d="M264 247 L264 181 M264 270 L264 376 M264 247 Q225 234 197 214 M264 247 Q303 234 329 214"/><path class="leader" d="M326 215 L400 195"/><text class="callout" x="404" y="199">Arteries</text></g>',
 '<g class="organ" data-organ="circulatory" data-structure="veins" role="button" tabindex="0" aria-label="Veins carry blood toward the heart">',
 '<path class="part" fill="none" d="M264 378 L264 270 M264 270 Q233 264 220 224 M264 270 Q295 264 308 224"/><path class="leader" d="M304 287 L386 299"/><text class="callout" x="390" y="303">Veins</text></g>',
 '<g class="organ" data-organ="circulatory" data-structure="capillaries" role="button" tabindex="0" aria-label="Capillaries exchange materials with cells">',
 '<path class="part" fill="none" d="M197 214 Q183 219 179 231 M329 214 Q343 219 347 231 M264 376 Q241 389 230 403 M264 376 Q287 389 298 403"/><path class="leader" d="M181 232 L111 230"/><text class="callout" x="10" y="234">Capillaries</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="mouth" role="button" tabindex="0" aria-label="Mouth, where food enters and chewing begins">',
 '<path class="part" d="M253 83 Q262 87 271 83 Q267 92 262 92 Q257 92 253 83Z"/><path class="leader" d="M252 87 L187 78"/><text class="callout" x="10" y="82">Mouth</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="esophagus" role="button" tabindex="0" aria-label="Esophagus moves swallowed food to the stomach">',
 '<path class="part" d="M258 93 L266 93 L267 242 L260 242Z"/><path class="leader" d="M266 200 L356 204"/><text class="callout" x="360" y="208">Esophagus</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="liver" role="button" tabindex="0" aria-label="Liver produces bile">',
 '<path class="part" d="M233 267 Q246 254 259 266 L257 293 Q245 300 230 290Z"/><path class="leader" d="M233 277 L166 288"/><text class="callout" x="10" y="292">Liver</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="stomach" role="button" tabindex="0" aria-label="Stomach">',
 '<path class="part" d="M265 267 Q283 260 289 274 Q295 287 284 302 Q275 312 265 303 Q260 296 265 267Z"/><path class="leader" d="M286 285 L369 282"/><text class="callout" x="373" y="286">Stomach</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="large-intestine" role="button" tabindex="0" aria-label="Large intestine">',
 '<path class="part" fill="none" d="M240 319 Q230 319 230 330 L230 360 Q230 372 242 372 L284 372 Q296 372 296 359 L296 330 Q296 319 284 319 M241 321 L241 333 M284 321 L284 333 M242 360 L284 360"/><path class="leader" d="M296 350 L384 350"/><text class="callout" x="388" y="354">Large intestine</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="small-intestine" role="button" tabindex="0" aria-label="Small intestine, where most nutrient absorption occurs">',
 '<path class="part" fill="none" d="M242 333 Q253 328 262 336 Q272 344 283 337 M241 344 Q252 337 263 346 Q274 355 285 345 M242 355 Q253 349 263 357 Q273 365 284 354"/><path class="leader" d="M240 345 L154 363"/><text class="callout" x="10" y="367">Small intestine</text></g>',
 '<g class="organ" data-organ="digestive" data-structure="rectum" role="button" tabindex="0" aria-label="Rectum and anus carry solid waste out of the body">',
 '<path class="part" d="M258 371 L267 371 L267 389 L258 389Z"/><path class="leader" d="M258 382 L184 402"/><text class="callout" x="10" y="406">Rectum and anus</text></g>',
 '<g class="organ" data-organ="integumentary" data-structure="hair" role="button" tabindex="0" aria-label="Hair, part of the integumentary system">',
 '<path class="part" fill="none" d="M229 50 Q226 23 251 18 Q281 12 295 40 M232 42 Q240 26 248 23 M255 18 Q267 12 277 19 M282 23 Q290 29 293 39"/><path class="leader" d="M294 33 L385 25"/><text class="callout" x="389" y="29">Hair</text></g>',
 '<g class="organ" data-organ="integumentary" data-structure="nails" role="button" tabindex="0" aria-label="Nails, part of the integumentary system">',
 '<path class="part" fill="none" d="M115 256 Q109 265 112 270 M372 256 Q379 265 375 270"/><path class="leader" d="M373 269 L416 277"/><text class="callout" x="420" y="281">Nails</text></g>',
 '<g class="organ" data-organ="nervous" data-structure="neuron" role="button" tabindex="0" aria-label="Magnified neuron, a cell that carries electrical signals">',
 '<rect class="inset-bg" x="8" y="442" width="146" height="112" rx="5"/><text class="callout" x="17" y="458">Neuron · magnified</text><path class="part" fill="none" d="M48 491 Q36 482 26 473 M47 491 Q33 499 24 510 M47 491 Q44 478 43 469 M53 490 L94 490 Q106 490 115 482 L126 482 M98 490 Q111 498 123 499"/><circle class="part" cx="49" cy="491" r="10"/><path d="M61 490 L88 490" fill="none" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#hsi-arrow-rich)"/><text x="83" y="523" font-size="10" fill="var(--muted)">Signal along the cell</text></g>',
 '<g class="organ" data-organ="circulatory" data-structure="blood" role="button" tabindex="0" aria-label="Magnified blood components: plasma, red blood cells, white blood cells and platelets">',
 '<rect class="inset-bg" x="366" y="442" width="146" height="112" rx="5"/><text class="callout" x="375" y="458">Blood · magnified</text><rect class="plasma" x="376" y="467" width="126" height="67" rx="8"/><ellipse class="rbc" cx="399" cy="488" rx="11" ry="6"/><ellipse class="rbc" cx="429" cy="509" rx="11" ry="6"/><ellipse class="rbc" cx="476" cy="486" rx="11" ry="6"/><circle class="wbc" cx="459" cy="505" r="9"/><circle class="platelet" cx="490" cy="515" r="3"/><text x="378" y="548" font-size="9" fill="var(--muted)">Plasma · red cells · white cells · platelets</text></g>',
 '<text x="260" y="580" text-anchor="middle" font-size="12" fill="var(--muted)">Schematic · not to scale</text></svg>'
].join("");
function renderSystems(el){
 let chosen="respiratory",chosenStructure="lungs",step=0,q=0,selected=null;
 el.innerHTML='<section class="hsi"><style>'+STYLE+'</style><h2>Human Systems Explorer</h2>'+
 '<p class="hint">Explore the organs in each system, then turn on the pathways to see how body systems connect. Based on the Cells &amp; Systems booklet, Topics 6–7.</p>'+
 '<div class="tabs" role="group" aria-label="Choose a body system"></div>'+
 '<div class="layout"><div><div class="map-controls"><button class="connection-toggle" type="button" aria-pressed="true">System pathways</button><span class="hint">Select an organ on the map or in the list.</span></div><div class="diagram">'+body+'</div>'+
 '<div class="legend" aria-label="Diagram pathway key"><span><i class="air"></i>Air</span><span><i class="blood-rich"></i>Oxygen-rich blood</span><span><i class="blood-poor"></i>Oxygen-poor blood</span><span><i class="food"></i>Food</span><span><i class="signal"></i>Nerve signals</span></div></div>'+
 '<div><div class="detail" aria-live="polite"></div><div class="structures" role="group" aria-label="Explore structures"></div><h3>Trace the pathway</h3><div class="steps" role="group" aria-label="Pathway stages"></div><div class="step-detail" aria-live="polite"></div></div></div>'+
 '<div class="quiz"><h3>Check the connections</h3><div class="question"></div><div class="answers"></div><p class="feedback" aria-live="polite"></p><button class="next" type="button" disabled>Next question</button></div>'+
 '<section class="video-shelf" aria-labelledby="hsi-videos-title"><h3 id="hsi-videos-title">Watch a short lesson</h3><p class="hint">These free Amoeba Sisters videos use animation and narration. Preview before showing; YouTube availability depends on school network settings.</p><div class="video-grid">'+
 '<article class="video-card"><h4>Respiratory system</h4><p>Animated tour of the airway, lungs, gas exchange and how other systems connect. Best fit: respiratory structures and oxygen moving into blood.</p><a href="https://www.youtube.com/watch?v=v_j-LD2YEqg" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article>'+
 '<article class="video-card"><h4>Circulatory system and blood pathway</h4><p>Follows blood through the heart and introduces blood vessels. Best fit: review the heart, blood, arteries, veins and capillaries.</p><a href="https://www.youtube.com/watch?v=_vZ0lefPg_0" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article>'+
 '<article class="video-card"><h4>Digestive system</h4><p>Animated tour from ingestion through absorption and elimination. Best fit: trace food through the digestive tract and identify where most nutrients are absorbed.</p><a href="https://www.youtube.com/watch?v=1UvuBYUbFk0" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article>'+
 '<article class="video-card"><h4>Human body systems overview (updated 2024)</h4><p>Fast overview of 11 systems and how they work together. Best fit: a broad recap; it covers systems beyond this booklet, so preview and select the relevant sections.</p><a href="https://www.youtube.com/watch?v=0JDCViWGn-0" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></article></div></section>'+
 '<p class="hint">The body map is a teaching schematic, not an anatomical drawing. Vessel colours show the pathway example; arteries and veins are named by the direction blood travels, with pulmonary exceptions.</p></section>';
 const get=k=>el.querySelector(k),keys=Object.keys(SYSTEMS);
 function draw(){
  const s=SYSTEMS[chosen],structure=s.structures.find(x=>x[0]===chosenStructure)||s.structures[0];chosenStructure=structure[0];
  get(".tabs").innerHTML=keys.map(k=>'<button data-system="'+k+'" type="button" aria-pressed="'+(k===chosen)+'">'+SYSTEMS[k].name+'</button>').join("");
  get(".detail").innerHTML='<h3>'+esc(s.name)+' system</h3><p><b>Major organs:</b> '+esc(s.organs)+'</p><p>'+esc(s.job)+'</p><p><b>Selected: '+esc(structure[1])+'</b><br>'+esc(structure[2])+'</p><p class="hint"><b>Connection:</b> '+esc(s.link)+'</p>';
  get(".structures").innerHTML=s.structures.map(x=>'<button type="button" data-structure="'+x[0]+'" aria-pressed="'+(x[0]===chosenStructure)+'">'+esc(x[1])+'</button>').join("");
  get(".steps").innerHTML=s.path.map((item,i)=>'<button type="button" data-step="'+i+'" aria-current="'+(step===i?'step':'false')+'">'+(i+1)+'. '+esc(item[0])+'</button>').join("");
  get(".step-detail").innerHTML='<b>'+esc(s.path[step][0])+'</b><p>'+esc(s.path[step][1])+'</p>';
  el.querySelectorAll("[data-organ]").forEach(g=>{const active=g.dataset.organ===chosen,selected=g.dataset.structure===chosenStructure;g.classList.toggle("active",active);g.classList.toggle("selected",selected);if(g.setAttribute)g.setAttribute("aria-pressed",String(selected));});
 }
 function quiz(){
  const item=QUIZ[q];get(".question").innerHTML='<b>'+(q+1)+' / '+QUIZ.length+' · '+esc(item.q)+'</b>';
  get(".answers").innerHTML=item.a.map((v,i)=>'<button type="button" data-answer="'+i+'" '+(selected!==null?'disabled':'')+'>'+esc(v)+'</button>').join("");
  get(".feedback").textContent=selected===null?"":(selected===item.c?"Correct. ":"Not quite. ")+item.why;
  get(".next").disabled=selected===null;get(".next").textContent=q===QUIZ.length-1?"Start again":"Next question";
 }
 function choose(k,structure){if(!SYSTEMS[k])return;chosen=k;chosenStructure=structure||SYSTEMS[k].structures[0][0];step=0;draw();}
 el.addEventListener("click",e=>{
  const b=e.target.closest("[data-system],[data-organ],[data-structure],[data-step],[data-answer],.next,.connection-toggle");if(!b||!el.contains(b))return;
  if(b.dataset.system)choose(b.dataset.system);
  else if(b.dataset.structure){const owner=b.dataset.organ||chosen;choose(owner,b.dataset.structure);}
  else if(b.dataset.organ)choose(b.dataset.organ);
  else if(b.dataset.step!==undefined){step=Number(b.dataset.step);draw();}
  else if(b.dataset.answer!==undefined&&selected===null){selected=Number(b.dataset.answer);quiz();}
  else if(b.classList.contains("next")&&selected!==null){q=(q+1)%QUIZ.length;selected=null;quiz();}
  else if(b.classList.contains("connection-toggle")){const layer=get("#body-connections"),show=layer.classList.contains("hidden");layer.classList.toggle("hidden",!show);b.setAttribute("aria-pressed",String(show));}
 });
 el.addEventListener("keydown",e=>{const a=e.target.closest("[data-organ][data-structure]");if(a&&(e.key===" "||e.key==="Enter")){e.preventDefault();choose(a.dataset.organ,a.dataset.structure);}});
 draw();quiz();
 el.systemsExplorer={select:choose,get current(){return chosen},get structure(){return chosenStructure},get step(){return step}};
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
})();
