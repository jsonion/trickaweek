/*****
 * Mission is to match longest chain of tokens
 */
import { x, y, trie,
           macroArrayAppend } from "./lib.js";
           macroArrayAppend();

export const cfg = {
  rxSplit: /(?: *- *| *)/g,
};

export default function main (trie=new Trie()) {
const DB=new Object(), ENUMS ={}, TERMS={},
/*   (())   */         ENUMS_={};
                         var bfr;

const SPIN_DIRECTION = {
  "FS": ["fs","frontside"],
  "BS": ["bs","backside"],
};
const SPIN = {
  "FS": [...SPIN_DIRECTION["FS"],"front"],
  "BS": [...SPIN_DIRECTION["BS"],"back"],
};
const DEGS = Object.fromEntries(
         new Array(2).map((_,i) => [

  (i+2)*180, [bfr=new String((i+2)*180),
              bfr[0]                  ]

]));

///  generate SPIN per each radian (180)
for (let degs in DEGS)
for (let [key,row] of Object.entries(SPIN))
     SPIN[key+" "+degs] = x(row, [degs]);

// frontside 180 ollie (or air)
(bfr=SPIN["FS"]).append(x(bfr, DEGS["180"]));
(bfr=SPIN["BS"]).append(x(bfr, DEGS["180"]));

// fakie bigspin, fakie bs bigspin
// nollie bs bigspin
// fakie bigflip
// fakie varial flip
// fakie hardflip (similar to no-comply?)
// ... where to?

Object.assign(SPIN, { 
  "Halfcab": ["half-cab","half cab","halfcab"],
  "Full Cab": ["caballerial","full-cab","full cab","fullcab"],
});

const SUBPART = {
  "Shove-it": ["shoveit","shove-it","shuvit","shuv-it","shuv"],
  "One-Foot": ["one-foot", "one foot", "onefoot"],
};

///// ////////////////////

const STANCE         = {};
const STANCE_CHANGE  = {};
const STANCE_LANDING = {};

const AIR = {};

const FLICK_TRICK = {};
const LATE_TRICK  = {};

const GRAB_TRICK  = {};

const GRIND = {};
const SLIDE = {};

const STALL = {};
const PLANT = {};

const MANUAL    = {};
const FREESTYLE = {};

 /*/\/\/ const SPECIAL_TRICKS = {}; /\/\/*/

Object.assign(STANCE, {"Regular": ["regular"]});
Object.assign(STANCE, {"Goofy": ["goofy"]});

Object.assign(STANCE, {"Nollie": ["nollie"]});
Object.assign(STANCE, {"Switch": ["switch"]});
Object.assign(STANCE, { "Fakie": ["fakie"]});

Object.assign(AIR, {
  "Air": ["air"],
  "Ollie": ["ollie"],
  "Ollie North": ["ollie north",
   ...x(SUBPART["One-Foot"], ["ollie"]),
   ...x(["ollie"], SUBPART["One-Foot"]),
  ],
});

Object.assign(AIR, {
 "BS 180 Ollie": [
         SPIN["BS"]+" "+degs,
    ...x(SPIN["BS"], [degs], ["ollie"])
 ],
 "FS 180 Ollie": [
         SPIN["FS"]+" "+degs,
    ...x(SPIN["FS"], [degs], ["ollie"])
 ],

 // nollie bs 180
 // switch fs 180 !
 //  fakie fs 180 / fs halfcab
 // ... minimal pop, where to?

});

for (let degs in DEGS) {}
 AIR["FS Half-Cab"] = [
         SPIN["FS"]+" 180",
    ...x(SPIN["FS"], ["180"], ["ollie"])
 ],
 AIR["BS Half-Cab"] = [
    STANCE["Fakie"]+SPIN["FS"]+" 180",
    ...x(SPIN["FS"], [degs], ["ollie"])
 ];

Object.assign(STANCE_CHANGE, {
  "To Normal": ["normal", ...y("to", ["normal"])],
  "To Fakie": ["fakie", ...y("to", ["fakie"])],
  "Revert": ["revert", ...y("to", ["revert"])],
  "Pivot": ["pivot", ...y("to", ["pivot"])],
});

Object.assign(STANCE_LANDING, {
  "To Normal": ["normal", ...y("to", ["normal"], "out")],
  "To Fakie": ["fakie", ...y("to", ["fakie"], "out")],
  "Revert": ["revert", ...y("to", ["revert"], "out")],
  "Pivot": ["pivot", ...y("to", ["pivot"], "out")],
});

Object.assign(MANUALS, {
  "Manual": ["wheelie","manual"],
//"Revert": ["revert"],
//"Pivot": ["pivot"]),
});

Object.assign(MANUALS, {
  "Nosemanual": [
   ...x("", ["nose"], MANUALS["Manual"]),
   ...x(    ["nose"], MANUALS["Manual"])
  ],
});

Object.assign(FLICK_TRICK, {
  "Pop Shuvit": [
   ...x(["pop"], SUBPART["Shove-it"]),
                 SUBPART["Shove-it"]
  ],
  // nollie fs shuvit
  // nollie bs shuvit

  // nollie bs bigspin
  //  fakie bs bigspin
});

Object.assign(GRINDS, {
  "50-50": ["50-50 grind","50-50"],
});

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

Object.assign(DB, ...(bfr=[
  {STANCE},
  {STANCE_CHANGE},
  {STANCE_LANDING},

  {AIR},
  {FLICK_TRICK},
  {LATE_TRICK},
  {GRAB_TRICK},

  {GRIND},
  {SLIDE},
  {STALL},
  {PLANT},

  {MANUAL},
  {FREESTYLE},

  {SPECIAL_TRICKS},
]));

//
Object.entries(DB ).forEach(([cat,obj]) =>
Object.entries(obj).forEach(([ident,row]) =>
              (row).forEach(term => {

              (str).split(cfg.rxSplit)
                   .forEach(word =>
{ trie.iterate(word, vals, fn) });
  trie.iterate(term, vals, fn);

})));

return { DB, trie };
}