export { x, y, and_or };

// calculate string combinations from ...args: Array<string[]>
// if first arg is string => shift it to separator
function x (...args) {
 const separator
   =   args[0] instanceof String && args.shift()
                                 || (" ");
 
  var res=[], len_total=1, len_row=[],
      bfr,                 counter;

  for (let i=args.length-1; i>=0; i--)
   if (      args[i] instanceof Array
   && (bfr = args[i].length))
      {len_total *= (bfr    );
       len_row.shift(bfr - 1)}
       else
      {args.splice(i, (true))}

  if (!len_row.length) return;
  counter = new Array(len_row.length).map(v=>0);

  for (let i=0; i<len_total; i++)
      {res.push(calcCombination());
                  updateCounter()}

  return res;
 /******///// /////******/

  function calcCombination () {
    var lit="";

    for (let [i,n] of counter.entries()) {
        lit += args[i][n]
            +  separator;
    }

    return lit.substring(0,
           lit.length - (separator.length));
  }

  function updateCounter (i) {
    var i=counter.length, n;
    
    do  {n = counter[i]+1;
   //// index exists for next item, exit
    if  (n<= row_len[i])
        {    counter[i]++;
             return;     }
   //// reset overflowing pointer to 0
   else {    counter[i]=0;
             continue;   }
        }    while ((i=i-1) >= 0)
  }
}

 ////////
/*
    ...prepend: string[],
         terms: Array<string>,
     ...append: string[]

 */////////////////////////////////////
function y (...args) {
  try {
  var terms,
      prepend = [],
       append = [],
         both = [];

 ///// distinguish terms
  for (let val of args) {
   if (typeof val === "string") {
   if (terms) append.push([val]);
        else prepend.push([val]);
                        continue;
   }

   if (typeof val    === "object"
   &&         val.length         ) {
   if (val.every(v=>typeof v === "string")) {
       terms=val;
       continue;
  }}}

 ///// prepend
  if  (prepend.length)
  for (let i=0; i<prepend.length; i++) {
       prepend[i]
    = [prepend[i]].concat(terms.map(v=>prepend[i]+" "+v));
  }

 ///// append
  if  (append.length)
  for (let i=0; i<append.length; i++) {
       append[i]
    = [append[i]].concat(terms.map(v=>v+" "+append[i]));
  }
 
 ///// ... 
  if (prepend.length
  &&   append.length)
  for (let i=0; i<prepend.length; i++) {
  for (let j=0; j<  terms.length; j++) {
  for (let k=0; k< append.length; k++) {
      both.push(prepend[i][0] +
                  terms[j]    +
                 append[k][0]);
  }}}

  prepend.forEach(arr => arr.unshift());
   append.forEach(arr => arr.unshift());

  return [...prepend, ...append, ...both];
} catch (e) { throw e; }
}

 ///////////////////////////////////////////////
/*   render text from (array of) objects
 -   generate from string[]
 => `${obj[0]}`, `${obj[1]}` and `${obj[2]}`

 -   generate from Array<Object.length === 1>,
 -   generate from Record[string, string]
 => `${Object.keys(obj[i])[0]}, ...`
 */
function and_or (obj) {
  const {delimiter, delimiter_last, blockquotes} =
        (this.constructor === Object  &&  this)
    ||  {delimiter:      ", ",
         delimiter_last: " and ",   blockquotes: '`'};

  var last, prev, entries;
  try {
  switch (true) {
   case   obj.constructor === Object:
         [last, prev,
                ...entries] = Object.keys(obj).reverse();
          break;///hopeful

   case   obj.constructor === Array: 
  switch (true) {
   case   entries=[]
    &&    obj.length
    &&    obj.every((item) => item.constructor === Object
                           && entries.push(Object.keys(item)[0])):
   case   entries=[]
    &&    obj.length
    &&    obj.every((item) => item.constructor === String
                           && entries.push(item)):
   case   entries=[]
    &&    obj.length
    &&    obj.every((item) => item.constructor === Array
                           && entries.push(item[0])):
         [last, prev,
                ...entries] = entries.reverse();
          break;
  }       break;
  }

  if (!last)
      throw new Error ("unrecognized inputs/types");

  if (!prev)
      return blockquotes + last + blockquotes;

  if (!entries.length)
      return blockquotes + prev + blockquotes +
          delimiter_last +
             blockquotes + last + blockquotes;

 else return blockquotes + entries.join(blockquotes + delimiter) + blockquotes
                         +
             blockquotes + prev + blockquotes +
          delimiter_last +
             blockquotes + last + blockquotes;
} catch (e) { throw e; }
}