/**********
 * longest line (combo) wins (reduce().sort()?)
 */
import {mapCliArray, assignConfigs} from "./cmd.argMap.js";
import cfg_expr, {b_, b, li, and, or} from "./parse.expressions.js";

const cfg = assignConfigs.call(mapCliArray(process.argv.slice(2)),
{
/*blockquotes:  ["`","`"],
  delimiter:     ", ",
  delimiter_and: " and ",
  delimiter_or:  " or ",*/

  network_interface_protocol_en: [
  "torrent DHT protocol web implementation",
  "browser's native network interface APIs"
  ],
  environment_en: [
  "a standard implementation for the web",
  "a browser client application in a self-contained html document"
  ],
  importLoader: "json importmap",
  dependencies: {
    "THREE": `cdn`
  },
  lib: [
  /// scripts which shall not be modified by AI (without explicit prompt)
    "./db.tricks.tokenize.js",
    "./db.tricks.comment-intent.js",
    "./db.",
    "./cmd.argMap.js",
    "./cmd.execute.js",
    "./docs.events.md",
    "./docs.places.md",
    "./lib.js",
    "./lib.matrixString.js",
    "./lib.trieOfArrayUnique.js",
    "./parse.events-places.js",
    "./parse.expressions.js",
  ],
  import: [
  /// top level imports for the HTML document
  ],
  collection: {
       key: "vids_skatetricks",
      name: [,"skate trick video","skate trick videos"],
    entity: [,"trick", "tricks"/* plural code style */],
    schema: {
       /// JSON Structure
      ///  or key, val => string, string<Type>
    },
  },

  step_1,
  step_2,
  step_2_a_assess,
  step_2_b_execute,
}, cfg_expr);

export default cfg;
export function step_1 () {
return `About AI benchmarks ...`;
/* attempt to reveal model's training focus
 - how will AI assess it's own performance?
 - ...
 */
}

export function step_2_a_assess () {
return [`Use the results of the above research to assess a new benchmark proposal (in the next few paragraphs) -- and DO NOT execute the intructions below to create the self-containing html document:`,
{ next: step_3 }];
}

export function step_2_b_execute () {
return `Execute the intructions below to create a self-containing html document:`;
}

export function step_3 () {
return (...params) => `
Create peer-to-peer networking interface, using ${b(cfg.network_interface_protocol_en[0])} to exchange ${and(b, cfg.collection.name[2])}, as part of ${cfg.enviroment_en[0]}.`;
}

/* 
 * At Leap Summit *chilling*
 * Learn
 * Engage
 * Act
 * Progress
 * ... The acronym sure sounds good -- and now that vibe coding provides process insight at a higher level, maybe there's a conclusion to reach hereby!
 */