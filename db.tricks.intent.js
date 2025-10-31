import {trie, x,y, rxSet} from "./lib.js";

const DB_={/* to evaluate */};
const cfg={
      err:{ TYPE: "Invalid type", }
                                  };

var coll, key, strs=[];

/* [idea]
 *  first pass, variable/key-val define
 *  cursor traverses to find end of block
 *  2nd pass, offset indeks sintaktičnih komentarjev
 */

// const COLLECTION = {
const rxDefine =
  "(?:" + "const"
        +  "|"   +  "var"
        +  "|"   +  "let"
        +  ")"   +  "\\s+"
        + "(.+)" + "\\s*" + "=" + "\\s*";

// AIR["sw fs 180"] = x(STANCE["Switch"], [...AIR["FS 180 Ollie"]]);
const rxEval = "";

// Object.assign(COLLECTION, {
const rxAssign = "Object\\s*\\.assign\\s*\\(\\s*"
               + "(.+)" + "\\s*" + "," + "\\s*";

// COLLECTION["FS Half-Cab"] = [
const rxSetter = [
 "(.+)" +
  "(?:" + "\\."        + "(?<dot>[^\\s=]+)" +
   "|"  + "\\["        + "(?<b>[\"'`])"
                       + "(?<square>.+)"
                       + "\\k<b>"
        + "\\]"        +
   ")"  + "\\s*" + "=" + "\\s*",
 { val: 1 }];

const rxType = null;

const rxBrackets = {
  "/*": "*/",
   "[": "]",
   "{": "}",
   "(": ")",
};
const rxMultiline = "(?:" + ".|\\n" + ")*";
const rxSpaces = ["\\s*", "\\s+"];
const rx = {
  _fn: ()=>{},
   fn: new RegExp(
   "^"  +
  "(?:" + "function"     + "\\s+" + ".*" 
                         + "\\s*" + "\\("
        + "(?:\\s+|.+)*"          + "\\)"
                         + "\\s*" + "{"
        +
   "|"  + "\\("
        + "(?:\\s+|.+)*" + "\\)"
                         + "\\s*"
        + "(?<arrow>=>)" + "\\s*" +
          "(?<braces>"   + "\\{"  + "|" + "\\(" +
                     ")" +
   ")", `m`
 ),
_type: ()=>{},
 type: Object.assign(new RegExp(
 "\\s+" +
  "(?:" + rxDefine +
   "|"  + rxAssign +
   "|"  + rxSetter + 
   ")"  + "(?<bracket>[[{])", `gm`),{})
};

function getTricksInComments (fnc, DB, trie,
                            format=formatNode) {
    if (typeof fnc !== "function"
    ||     !DB instanceof Object
    ||   !trie instanceof trieOfArrayUniqiue)
         throw cfg.err.TYPE;

    if (typeof format !== "function")
        format = null;

    if (!exclude              instanceof Array
    ||  !exclude.length
    ||  !exclude.every(v => v instanceof String))
         exclude = null;

    Object.keys(DB_).forEach(k => delete DB[k]);
  /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
    var match, i;
    
    fnc = `${fnc}`.trim();
  match = rxFnHeader.exec(fnc);

    ///
   ///  ^> part of code to generalize from
  ///

  fnc=(!match.groups.arrow || match.groups.braces)
      ? fnc.substring(match.index+1, fnc.length-1)
      : fnc.substring(match.index+1);

  /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
  while (match = rxType.exec(fnc))
        {
         rxBlocks.lastIndex = rxType.lastIndex;
           rxType.lastIndex =
        (match.groups.define)
    &&            evalDefine(match.groups.define, DB, trie, fnc)
    ||  (match.groups.assign)
    &&            evalAssign(match.groups.assign, DB, trie, fnc)
    ||  (match.groups.set)
    &&            evalSetter(match.groups.set, DB, trie, fnc);
        }
}

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

                match = rx.type.exec(fnc);
            if (match.groups.bracket)
    parseBlocks(match.groups.bracket)

function parseBlocks (openingSymbol) {}
function parseComment (str) {}

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

const rxBlocks = Object.assign(
                    new RegExp(
   ///  },{
   ///  });
   ///  };
                    rxSpaces[0] +
  "(?:" + "(\\})" + rxSpaces[0] + ","     +
                    rxSpaces[0] + "{"     +
   "|"  + "(\\})" + rxSpaces[0] + "(\\)?" +
                    rxSpaces[0] + "(;)?"  +

   ///  ...x(COLLECTION.key => DB.COLLECTION.key
   "|"  + "(\\()" + // parentheses a
   "|"  + "(\\))" + // parentheses b
   "|"  + "(\\[)" + // square a
   "|"  + "(\\])" + // square b

   ///  comment inline, comment multiline
   "|"  + "(\\/\\/)"  + "(.*)\n"       +
   "|"  + "(\\/\\*)"  +
   "("  + rxMultiline + ")" + "\\*\\/" +
   "|"  +
  "(?:" + "(?<b>" + "[\"'`]" + ")"
        + ".+"    + "\\k<b>" +
   "|"  + 
   ")", 'gm'),
  { assign_next:      1,
    assign_close:     2,
    assign_semicolon: 3 });


// "FS Half-Cab": [
const rxKey = new RegExp("")

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
/*
const rxBlocks = 
  "(?:" + "(\\/\\/)" + // comment inline
   "|"  + "(\\/\\*)" + // comment multiline
   "|"  + "(\\{)" +    // curly a
   "|"  + "(\\})" +    // curly b
   "|"  + "(\\()" +    // parentheses a
   "|"  + "(\\))" +    // parentheses b
   "|"  + "(\\[)" +    // square a
   "|"  + "(\\])" +    // square b
   "|"  + 
  "(?:" + "(?<b>" + "[\"'`]" + ")"
        + ".+"    + "\\k<b>" +
   "|"  + 

   ")";

const rxEval = new RegExp();
const rxAssignJS = new RegExp();
*///

function evalAssign (collectionName,
                     DB, trie,  str) {
  var block=[];
  trie.iterate
  try {
  eval(`Object.assign(${collectionName}, {
                      ${jsCode}
  })`)} catch (e) {
        throw (e) }
}

function evalDefine (collectionName,
                     DB, trie, code) {

  trie.iterate
  try {
  eval(`Object.assign(${collectionName}, {
                      ${jsCode}
  })`)} catch (e) {
        throw (e) }
}

function evalSetter (collectionName,
                     DB, trie, code) {

  trie.iterate
  try {
  eval(`Object.assign(${collectionName}, S{
                      ${jsCode}
  })`)} catch (e) {
        throw (e) }
}