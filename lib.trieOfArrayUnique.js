import {err} from "./cfg.js";
/// if (k in obj) {/* typeof k === "string" */}

const  APPEND  = true;
const PREPEND  = false;
const FIRST_IN = true;
const  LAST_IN = false;

export const cfg = {
          ...err,
   APPEND,
  PREPEND,

 FIRST_IN,  // lower index
  LAST_IN, // higher index

         /*   ArrayUnique,
              trie      */
};
export default cfg;

class ArrayUnique extends Array {
  write = APPEND;
  keep  = LAST_IN;
   has  = new Set() || new Map();

  constructor (...values) {
    var cfg;
    if (values.length === 1
    && (cfg = ArrayUnique.cfg(arguments[0])))
       {
        super();
        Object.assign(this, cfg);
       }
   else super(...values);
  }

  cfg (cfg/*, instance */) {
   if (cfg = ArrayUnique.cfg(arguments[0]))
      Object.assign(this,cfg);
  }          config=this.cfg;

  static cfg (cfg) {
    if (typeof cfg !== "object"
    ||         cfg.constructor !== Object)
        return;

    var res=new ArrayUnique(cfg);

    if (cfg.append)  res.write =  APPEND;
    if (cfg.prepend) res.write = PREPEND;

    if (cfg.firstIn) res.keep = FIRST_IN;
    if (cfg.lastIn)  res.keep =  LAST_IN;

    if (typeof obj.indexOf === "function")
       res._indexOf = obj.indexOf;

    if (typeof obj.lastIndexOf === "function")
       res._lastIndexOf = obj.lastIndexOf;

    if (typeof obj.sort === "function")
       res._sort = obj.sort;

    if (Object.keys(res).length)
        return res;
  }

 _indexOf (val, fromIndex=0) {
    return this.indexOf(val, fromIndex);
  }

 _lastIndexOf (val, fromIndex=this.length-1) {
    return this.lastIndexOf(val, fromIndex);
  }

 _sort (a, b) {
    if (a > b) return -1;
    if (a < b) return  1;
               return  0;
  }

 /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

  unique (...values) {
    const compareFn = (this.keep === FIRST_IN)
                    ?  this._indexOf
                    :  this._lastIndexOf;
    const  writeFn  = (this.write === PREPEND)
                    ?  this.unshift
                    :  this.push;
     var  val, ix;
    /////
     if  (values.length)
     for (val of values)
          switch (true) {
           case  this.keep === LAST_IN:
       if ((ix = this._indexOf(val)) !== -1)
                 this.splice(ix, 1);

           case  this.keep === FIRST_IN
            &&   this._indexOf(val) === -1:

               { writeFn.call(this, val) }
     }
     else
     for (ix=this.length; ix>=0; ix--)
      if (ix !== compareFn.call(this, this[ix]))
          this.splice(ix, 1);

     return this;
  }
  
  append (...values) {
     return (values.length)
          ?  this.splice(this.length, 0,
                           ...values)
          :  false;
  }

  prepend (...values) {
      return (values.length)
           ?  this.splice(0, 0, ...values)
           :  false;
  }

  sortAdd (value, compareFn = this._sort) {
       if (typeof compareFn !== "function")
           throw "compareFn undefined";

      for (let [i,b] of this.entries())
   switch (compareFn(value, b))
          {
           case -1:
           return this.splice(i, 0, value);

           case 0:
           return true;

           case 1:
           continue;
          }

    return this.splice(this.length, 0, value);
  }

  remove (...values) {
      if (!values.length) return;
      var val, ix, res=[];

      for (val of values)
          {ix = 0;
    while (
          (ix = this._indexOf(val, ix)) >= 0)
       res.push(this.splice(ix, 1));
    }

    return (res.length) && res || false;
 
/// for (var i=(this).length-1; i>=0; i--) {
/// for (var j=values.length-1; j>=0; j--) {}}
/// ... if unique entries always appeared once

  }

 _fnChain = {
     append: this.append.bind(this),
    prepend: this.prepend.bind(this),
    sortAdd: this.sortAdd.bind(this),
     unique: this.unique.bind(this),
     remove: this.remove.bind(this),
  };
}

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
              } else
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
  iterate: this.iterate.bind(this),
  };
}

function arrayDeepClone (arr, fn=null) {
  var v, bfr, res=[];

  switch (true) {
    case arr.constructor !== Array:
         throw cfg.err.TYPE;

/*  case  rxSet instanceof Object
     && (!rxName_main
                instanceof String
     ||  !(rx = rxSet[rxName_main])
                instanceof RegExp
        ): throw cfg.err.RX_MISSING; 
 */
    case typeof this === "function":
     (fn=this);
         break;

    case typeof fn !== "function":
     (fn=null);
         break;

    case typeof this === "object":
     var ref = fn;
     (fn=(v) => ref.call(this,v));
  }

  if  (fn) {
  for (v of arr)
   if (v instanceof Array)
           res.push(arrayDeepClone.call(fn,
                                        arr));
      else bfr=fn(v) && res.push(bfr);
  }
  else
  for (v of arr)
   if (v instanceof Array)
           res.push(arrayDeepClone(arr, fn));
      else res.push(v);
  
  return res;
}

export { ArrayUnique, trie, arrayDeepClone };
Object.assign(cfg,
       { ArrayUnique, trie, arrayDeepClone });