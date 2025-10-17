import {x,y} from "./lib.js";

const DB_={/* to evaluate */};
 var  coll, key; 

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

const rxFnHeader = new RegExp(
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
          "(?<braces>"   + "\\{"  + "|\\(" + ")" +
   ")", 'm'
);

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

const rxType = new RegExp(
// const COLLECTION = {
  "(?:" + "(?:" + "const"
        +  "|"  +  "var"
        +  "|"  +  "let"
        +  ")"  +  "\\s+"
        + "(?<define>.+)" + "\\s*" + "=" + "\\s*"
        + "{"   +

// Object.assign(COLLECTION, {
   "|"  + "Object\\s*\\.assign\\s*\\(\\s*"
        + "(?<assign>.+)" + "\\s*" + "," + "\\s*"
        + "{"             +

// COLLECTION["FS Half-Cab"] = [
   "|"  + "\\n\\s*"    +
          "(?<set>.+)" +
  "(?:" + "\\."        + "(?<dot>[^\\s=]+)" +
   "|"  + "\\["        + "(?<b>[\"'`])"
                       + "(?<bracket>.+)"
                       + "\\k<b>" 
        + "\\]"        +
   ")"  + "\\s*" + "=" + "\\["              +
   ")", 'gm'
);

// const COLLECTION = {
const rxDefine = new RegExp(
 /*   "Nollie BS 180": [
        x("nollie", SPIN["BS"], DEGS["180"]),
        x(SPIN["BS"], DEGS["180"], ["nollie"]),
        x(SPIN["BS"],              ["nollie"]),
      ],
    // trick collection paths which exist 
  */
);

// Object.assign(COLLECTION, {
const rxAssign = new RegExp(
/*  "Revert": [
    "revert",
    // "hm bs revert",
   //   hm bs revert
  // ...x(SPIN.BS,   "revert"])
 // ...x(SPIN["BS"], "revert"])
*/
);

const rxSet = new RegExp(
/* COLLECTION["FS Half-Cab"] = [
  //     SPIN["FS"]+" 180",
 // ...x(SPIN["FS"], ["180"], ["ollie"])
*/
);

const rxEval = new RegExp(

);

const rxAssignJS = new RegExp(

);

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

function getTricksInComments (fnc, DB,
                              exclude, format) {
    if (!exclude             instanceof Array
    ||  !exclude.every(v => v instanceof String))
         exclude = null;

    if (typeof format !== "function")
        format = null;

    Object.keys(DB_).forEach(k => delete DB_[k]);

    var  match, i,
         block=[];
    
    fnc = `${fnc}`.trim();
  match = rxFnHeader.exec(fnc);

  fnc=(!match.groups.arrow || match.groups.braces)
     ?  fnc.substring(match.index, fnc.length-1)
     :  fnc.substring(match.index);

  while (match = rxDefine.exec(fnc)) {
     if (match.groups.assign)
        {rxBlocks.lastIndex 
       = rxDefine.lastIndex;
  while (match) {}
        }
  }
}

function evalAssign (collectionName,
                     DB, trie, code) {

  trie.iterate
  try {
  eval(`Object.assign(${collectionName}, {
                      ${jsCode}
  })`)} catch (e) {
        throw (e) }
}