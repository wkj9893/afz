function isKeyedCollection(x: any): boolean {
  return [Symbol.iterator, 'size'].every((k) => k in x)
}

export function equal(a: any, b: any): boolean {
  const seen = new Map()
  return compare(a, b)
  function compare(a: any, b: any): boolean {
    // Have to render RegExp & Date for string comparison
    // unless it's mistreated as object
    if (
      a &&
      b &&
      ((a instanceof RegExp && b instanceof RegExp) ||
        (a instanceof URL && b instanceof URL))
    ) {
      return String(a) === String(b)
    }
    if (a instanceof Date && b instanceof Date) {
      const aTime = a.getTime()
      const bTime = b.getTime()
      // Check for NaN equality manually since NaN is not
      // equal to itself.
      if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
        return true
      }
      return a.getTime() === b.getTime()
    }
    if (Object.is(a, b)) {
      return true
    }
    if (a && typeof a === 'object' && b && typeof b === 'object') {
      if (a instanceof WeakMap || b instanceof WeakMap) {
        if (!(a instanceof WeakMap && b instanceof WeakMap)) return false
        throw new TypeError('cannot compare WeakMap instances')
      }
      if (a instanceof WeakSet || b instanceof WeakSet) {
        if (!(a instanceof WeakSet && b instanceof WeakSet)) return false
        throw new TypeError('cannot compare WeakSet instances')
      }
      if (seen.get(a) === b) {
        return true
      }
      if (Object.keys(a).length !== Object.keys(b).length) {
        return false
      }
      //  Map or Set
      if (isKeyedCollection(a) && isKeyedCollection(b)) {
        if (a.size !== b.size) {
          return false
        }

        let unmatchedEntries = a.size

        for (const [aKey, aValue] of a.entries()) {
          for (const [bKey, bValue] of b.entries()) {
            /* Given that Map keys can be references, we need
             * to ensure that they are also deeply equal */
            if (compare(aKey, bKey) && compare(aValue, bValue)) {
              unmatchedEntries--
            }
          }
        }
        return unmatchedEntries === 0
      }
      const merged = { ...a, ...b }
      for (const key of [
        ...Object.getOwnPropertyNames(merged),
        ...Object.getOwnPropertySymbols(merged)
      ]) {
        if (!compare(a[key], b[key])) {
          return false
        }
        if ((key in a && !(key in b)) || (key in b && !(key in a))) {
          return false
        }
      }
      seen.set(a, b)
      return true
    }
    return false
  }
}
