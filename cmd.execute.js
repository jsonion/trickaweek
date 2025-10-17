/*
 * to accomodate command-line flow
 */

import readline from "node:readline";
const rl = readline.createInterface({
   input: process.stdin,
  output: process.stdout,
});
export const cfg = {
  welcome: () => "Welcome to cli jsonion's AI prompt chapters generator\n",

  output_step,
  output_step_sequels,
   input_case_abc_str,
   input_case_abc,
   input_case_str,
  render_step,
  underline,

  underline_symbol: "`",
};
export default cfg;

export const rx_i = Object.assign(
  /^([a-f])|([^_]{2,})$/,
  { case_abc: 1,
    case_str: 2 }
);
export const rx_o = Object.assign(
                       new RegExp("^step_"
        + "([\\d]+)"   +
  "(?:" + "_"          +
        + "([\\d]+)"   + ")?" +
  "(?:" + "_" 
        + "([a-f]{1})" + ")?" +
  "(?:" + "_"
        + "([^_]{2,})" + ")?" + "$"),
   { is_step: 0, index_1:  1,
                 index_2:  2,
                 case_abc: 3,
                 case_str: 4 }
);

let chapters=[], cur, key,
    a, b, i, n,  TPL=(0), ctrl_c="";

export function exec (cfg,/****************** /
  should contains lib cfg's, like one above */) {

  const {
    welcome,
    output_step,
    output_step_sequels,
     input_case_abc_str,
     input_case_abc,
     input_case_str,
    render_step,
    underline
  } = cfg;

  function createChapter (step) {
    return step.map((indexVal, i) => {
    switch (i) {
     ////  assign tpl str/fn on index 0 if ...
     case  0:
       if (0 === step.slice(2)
                     .every(v => v===undefined))
        {  return step[TPL];  }

     ////  step_[index_1]
     case  rx.index_1:
        {  return indexVal;   }

     ////  _[\d]+, _[a-f], _[^_]{2,}
     case  rx.index_2:
     case  rx.case_abc:
     case  rx.case_str:
        {  
           return (indexVal === undefined)
           ? [] : [
                  [indexVal, step[TPL]],
                                      ];
        }
    }});
  }

  function updateChapter (step, cur) {
    for (i=2; i<=rx.case_str; i++) {
     if (step[i]===cur[i][0]) continue;
     if (step[i] > cur[i][0])
        {
         cur[i].push([indexVal, step[TPL]]);
         return true;
        }
  }}

  chapters = Object.entries(cfg)
 .map(([k, tpl]) =>
      (key = rx_o.exec(k))
  &&  (typeof tpl === "string"
  ||   typeof tpl === "function")
  && [ tpl,

    ...key.slice(1).map(str =>
     ((key = new Number(str), !isNaN(key))
     ? key : str)  ||  (undefined)       )

     ]
  )
  .filter(k    => !!k)
  .sort((a, b) => {
    for (i=rx.index_1; i<=rx.case_str; i++)
         switch (true) {
          case  a[i]===b[i]: continue; /// next
          case  a[i] < b[i]: return (-1);
          case  a[i] > b[i]: return ( 1);
         }                   return ( 0);
  })
  .reduce((chapters, step) => {
    cur = (chapters[chapters.length-1]);
    if (!cur
    ||   cur[rx.index_1][0] !== step[rx.index_1])
         return chapters.concat(createChapter(step));
   ////  cleared new chapter creation
    
         updateChapter(step, cur);
         return chapters;
  },            chapters);
 //// ^^^ ordered list of logical steps

  if (welcome)
 //// welcome message (simple logic)
      console.log(
      (typeof cfg.welcome === "function")
            ? cfg.welcome() : cfg.welcome
      );

 //// chapters input sequence (execute `process`)
      chapters.forEach(chapter =>
      {
   if (chapter[0]) output_step(chapter);
  for (i=rx.index_2; i<rx.case_str; i++)
      {

   ///////////
  ///  ...
 ///

      }
      });
}

function output_step (step) {
  return "Step #" + (step[rx_o.index_1]) 
+ "\n" + _(new String(step[rx_o.index_1]).length+5)
+ "\n" +  render_step(step[0]);
}

function output_step_sequels (step) {}

function input_case_abc_str (step) {}

function input_case_abc (step) {
  return "\r"
  + `Choose one of the above options:\n`
  + (step[rx.case_abc].length > 1) &&
     step[rx.case_abc].join(", ");
}

function input_case_str (step) {
  `\rChoose among the following options:\n`
  + (step[rx.case_str].length > 1) &&
     step[rx.case_str].join(", ");
}

function render_step (step) {
  return typeof step[0] === "function" 
              ? step[0]() : step[0];
}

function underline (len) {
  return cfg.underline_symbol.repeat(len);
}

function ask (question) {
  return new Promise(resolve => {
    rl.question(question+" ", input => resolve(input));
  });
}

const answer = await rl.question('What is your favorite food? ');
console.log(`Oh, so your favorite food is ${answer}`);

rl.close();