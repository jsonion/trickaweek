const cfg = {
  rxPathTree: /\./g,
  err: {
    TYPE: "Invalid type",
  },
};
export default cfg;

       function mapCliString(args) {/*!preparsed?*/}
export function mapCliArray (args) {
  const rx = /^(?<flag>--?)(?<val>.+)$/;

  if  (!args              instanceof Array
  ||   !args.length
  ||   !args.every(v => v instanceof String))
        return;

  var res={ __cli:true },
      i, arg, match_1, match_2, iterate;

  for ([i, arg] of (iterate=args.entries()))
   if (match_1 = rx.exec(arg))
      {
   if (i < args.length-1
   && (match_2 = rx.exec(args[i+1]))
   && !match_2.groups.flag)
       tree(match_1.groups.val,
            match_2.groups.val);
       else
       tree(match_1.groups.val, true);
      }

  return res;

  function tree (path, val) {
    var obj=res, keys=path.split(cfg.rxPathTree),
                 leaf=keys.pop();
    for (let k of keys) {
         obj[k] = {};
         obj    = obj[k];
    }
    obj[leaf] = val;
  }
}

export function assignConfigs (rootConfig,
                                ...configs) {
  if (typeof this === "object"
  &&         this.__cli)
  deepMerge(rootConfig, this);

  for (let cfg of configs)
  deepMerge(cfg, rootConfig);
}

function deepMerge (obj, assign) {
  var cur;
  Object.entries(assign)
        .forEach(([key, val]) => {
  switch (true) {
   case  typeof (cur=obj[key]) === "undefined":
         return;

   case  typeof cur === "function"
    &&   typeof val === "function":
         return obj[key] = val;

   case  cur === null:
   case  cur.constructor === Boolean:
         return obj[key] = val;

   case  cur instanceof Object
    &&   val instanceof Object:
         return deepMerge(cur, val);

   case  cur.constructor
    ===  val.constructor:
         return obj[key] = val;

   case (cur instanceof RegExp
    ||   cur instanceof String)
    &&   val instanceof String
    &&   val[0] === "/":
         return obj[key] = new RegExp(...rxParams(val));

         default:
   try { return obj[key] = new cur.constructor(val);
       } catch (e) {
         throw (e);
       }
  }});

  function rxParams (str) {
    let i = str.lastIndexOf("/");
    return [str.substring(1, str.length),
            str.substring(i+1)];
  }
}