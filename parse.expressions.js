export const cfg = {
  blockquotes:   ["`","`"],
  delimiter:     ", ",
  delimiter_and: " and ",
  delimiter_or:  " or ",
}
export default cfg;

export function b_ () {
return cfg.blockquotes[0];
}

export function b (str=null) {
return (typeof str == "string" && str)
             ? cfg.blockquotes[0]
             + str
             + cfg.blockquotes[1]

             : cfg.blockquotes[1];
}

export function li (...ul) {
  var [b,ul] = typeof ul[0] === "function" 
      && ul || [(str=>str), ul[0]];
  var res = "\n";
  try {
  for (let li of ul) {
   if (li
   &&  typeof (li) === "string")
      res += b(li)  +  "\n";
  }   return res;
  } catch (e) { throw e; }
}

export function and (...obj) {
  var [b,obj] = typeof obj[0] === "function" 
      && obj || [(str=>str), obj[0]];
  return and_or.call({
    blockquotes:     b,
    delimiter:       cfg.delimiter,
    delimiter_last:  cfg.delimiter_and,
  },
  obj);
}

export function or (...obj) {
  var [b,obj] = typeof obj[0] === "function" 
      && obj || [(str=>str), obj[0]];
  return and_or.call({
    blockquotes:    b,
    delimiter:      cfg.delimiter,
    delimiter_last: cfg.delimiter_or,
  },
  obj);
}

 ///////////////////////////////////////////////
/*   render text from (array of) objects
 -   generate from string[]
 => `${obj[0]}`, `${obj[1]}` and `${obj[2]}`

 -   generate from Array<Object.length === 1>,
 -   generate from Record[string, unknown]
 => `${Object.keys(obj[i])[0]}, ...`
 */
function and_or (obj) {
  const {delimiter, delimiter_last, blockquotes:b} = cfg
    ||  {delimiter:      ", ",
         delimiter_last: " and ",   blockquotes:
                                    str => str};
  var last, prev, entries;
  try {
  switch (true) {
   case   obj.constructor === Object:
         [last, prev,
                ...entries] = Object.keys(obj)
               /***hopeful***/      .reverse();
          break;

   case   obj.constructor === Array:
  switch (true) {
   case   entries=[]
    &&    obj.length
    &&    obj.every(item => item.constructor === Object
                         && entries.push(Object.keys(item)[0])):
   case   entries=[]
    &&    obj.length
    &&    obj.every(item => item.constructor === String
                         && entries.push(item)):
   case   entries=[]
    &&    obj.length
    &&    obj.every(item => item.constructor === Array
                         && entries.push(item[0])):
         [last, prev,
                ...entries] = entries.reverse();
          break;
  }       break;
  }

  if (!last)
       throw new Error ("unrecognized inputs/types");

  if (!prev)
       return b_() + last + b();

  if (!entries.length)
       return b_() + prev + b() +
           delimiter_last   +
              b_() + last + b();

  else return b_() + entries.join(b() + delimiter + b_()) + b()
                  +
              b_() + prev + b() +
           delimiter_last   +
              b_() + last + b();
} catch (e) { throw e; }
}