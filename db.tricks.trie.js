export default  trieNode;
export function trieNode (node, vals) {
  if (!node) return node  =  [vals];
             return node.push(vals);
}