# (2025-10-22~23, Vienna AT) CultTech Summit
- pitching yGest via (trickaweek, SnowMenu)
- working on rxSets functionality: abbreviate named captured groups using a token map (to alleviate RegExp.source 256 string byte limit), introduce mapping between methods and patterns, providing at function input a deterministic slice of token relevant param, and expecting at return
```
function parseRxHookFn (index, lastIndex, rxSet,
                                    match[rxGroupEnum],
                                    match.slice(
                                          rxGroupEnum,
                                          rxFirstEnum,
                                          rxLastEnum)) {
  return [lastIndex, rx];
}
```