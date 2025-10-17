class trie {
      #terminator;
      #terminated;
      #stringKeys;

      #trie = null;
      #list = new Array(); #cfg;
  //////////////////////////////////////
  constructor (cfg={returnTerminated: true,
                          stringKeys: true,
                          arrayPaths: false}) {

       if (!cfg instanceof Object) cfg={};
       this.#trie
          = new Object();

       this.#stringKeys
          = (cfg.stringKeys) ? true : false;

       this.#terminated
          = (cfg.returnTerminated !== undefined)
           !!cfg.returnTerminated  || true;

       this.#terminator 
          = (cfg.terminator instanceof String
          && cfg.terminator) ? cfg.terminator
                             : "\\$";

     //\/\/\/\/\/ /\/ /\ /  \/ /\ \ /\/\/\/\/\//
  }

  iterate (keys, vals=undefined, fn) {
          [keys, vals, fn]
               = formatInputs(keys, vals, fn);

           const trie
               = this.#trie;
           const list
               = this.#list;

           const stringKeys
               = this.#stringKeys;
           const terminator
               = this.#terminator;
           const terminated
               = this.#terminated;

           const iterate
               = objectLoop;

             var obj, key, i;
      return iterate(trie, keys, vals);

    function objectLoop (obj, keys, vals) {
      do { key = keys[0]
      if (typeof obj[key] === "object"
      && ( obj = obj[keys.shift()] )) continue;
                                     else break;
      } while (keys.length)

      switch  (true)  {
        case  (vals !== undefined):
         if   (keys.length) {
        ////   create path with leaf node 
         for  (key of keys)
         obj = obj[key] = {};

               obj[terminator] = fn(null, vals);
               return true;
         }
         ////  update node via external method
         else  return fn(obj[terminator], vals);

               default:
          if (!keys.length) {
          if ( terminated )
                   //// return leaf node only
                  return fn
                    &&   fn(obj[terminator])
                         || obj[terminator];
                   else
                   //// return paths & leaf node
                  return fn
                    &&   fn(obj)
                         || obj;
              }    else
                  return undefined;
    }}

    function formatInputs (keys, vals=undefined,
                                   fn=undefined) {
      switch (true) {
        case  keys instanceof String:
        keys=(keys.split("")); break;

        case !keys instanceof Array:
        keys=[keys];
      }

      if (keys[keys.length-1] === terminator)
          keys.pop();

 //// if (stringKeys)
      keys=keys.map((v) => {
      switch (typeof v) {
        case "number":
              v = `${v}`;
        case "string":
              return v;

        case "object":
         if  (Object !== v.constructor
         &&   Object.getOwnPropertyDescriptor
             (Object.getPrototypeOf(v),
             "toString"))
              return v.toString();

              default: throw (".");
      }});

      if  (!keys.length
      ||  (fn && typeof fn !== "function"))
           throw (".");

      return [keys, vals, fn];
    }
  }

 _fnChain = {
     unique: this.unique.bind(this),
    iterate: this.iterate.bind(this),
  };
}

export default trie;
export { trie };