import { equal } from '../src/equal'
import { assert } from '../src/assert'

//  https://deno.land/std/testing/asserts_test.ts
assert(equal('world', 'world'))
assert(!equal('hello', 'world'))
assert(equal(5, 5))
assert(!equal(5, 6))
assert(equal(NaN, NaN))
assert(equal({ hello: 'world' }, { hello: 'world' }))
assert(!equal({ world: 'hello' }, { hello: 'world' }))
assert(
  equal(
    { hello: 'world', hi: { there: 'everyone' } },
    { hello: 'world', hi: { there: 'everyone' } }
  )
)
assert(
  !equal(
    { hello: 'world', hi: { there: 'everyone' } },
    { hello: 'world', hi: { there: 'everyone else' } }
  )
)
assert(equal({ [Symbol.for('foo')]: 'bar' }, { [Symbol.for('foo')]: 'bar' }))
assert(!equal({ [Symbol('foo')]: 'bar' }, { [Symbol('foo')]: 'bar' }))
assert(equal(/deno/, /deno/))
assert(!equal(/deno/, /node/))
assert(equal(new Date(2019, 0, 3), new Date(2019, 0, 3)))
assert(!equal(new Date(2019, 0, 3), new Date(2019, 1, 3)))
assert(
  !equal(new Date(2019, 0, 3, 4, 20, 1, 10), new Date(2019, 0, 3, 4, 20, 1, 20))
)
assert(equal(new Date('Invalid'), new Date('Invalid')))
assert(!equal(new Date('Invalid'), new Date(2019, 0, 3)))
assert(!equal(new Date('Invalid'), new Date(2019, 0, 3, 4, 20, 1, 10)))
assert(equal(new Set([1]), new Set([1])))
assert(!equal(new Set([1]), new Set([2])))
assert(equal(new Set([1, 2, 3]), new Set([3, 2, 1])))
assert(equal(new Set([1, new Set([2, 3])]), new Set([new Set([3, 2]), 1])))
assert(!equal(new Set([1, 2]), new Set([3, 2, 1])))
assert(!equal(new Set([1, 2, 3]), new Set([4, 5, 6])))
assert(equal(new Set('denosaurus'), new Set('denosaurussss')))
assert(equal(new Map(), new Map()))
assert(
  equal(
    new Map([
      ['foo', 'bar'],
      ['baz', 'baz']
    ]),
    new Map([
      ['foo', 'bar'],
      ['baz', 'baz']
    ])
  )
)
assert(
  equal(
    new Map([['foo', new Map([['bar', 'baz']])]]),
    new Map([['foo', new Map([['bar', 'baz']])]])
  )
)
assert(
  equal(new Map([['foo', { bar: 'baz' }]]), new Map([['foo', { bar: 'baz' }]]))
)
assert(
  equal(
    new Map([
      ['foo', 'bar'],
      ['baz', 'qux']
    ]),
    new Map([
      ['baz', 'qux'],
      ['foo', 'bar']
    ])
  )
)
assert(equal(new Map([['foo', ['bar']]]), new Map([['foo', ['bar']]])))
assert(!equal(new Map([['foo', 'bar']]), new Map([['bar', 'baz']])))
assert(
  !equal(
    new Map([['foo', 'bar']]),
    new Map([
      ['foo', 'bar'],
      ['bar', 'baz']
    ])
  )
)
assert(
  !equal(
    new Map([['foo', new Map([['bar', 'baz']])]]),
    new Map([['foo', new Map([['bar', 'qux']])]])
  )
)
assert(equal(new Map([[{ x: 1 }, true]]), new Map([[{ x: 1 }, true]])))
assert(!equal(new Map([[{ x: 1 }, true]]), new Map([[{ x: 1 }, false]])))
assert(!equal(new Map([[{ x: 1 }, true]]), new Map([[{ x: 2 }, true]])))
assert(equal([1, 2, 3], [1, 2, 3]))
assert(equal([1, [2, 3]], [1, [2, 3]]))
assert(!equal([1, 2, 3, 4], [1, 2, 3]))
assert(!equal([1, 2, 3, 4], [1, 2, 3]))
assert(!equal([1, 2, 3, 4], [1, 4, 2, 3]))
assert(equal(new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 4])))
assert(!equal(new Uint8Array([1, 2, 3, 4]), new Uint8Array([2, 1, 4, 3])))
assert(equal(new URL('https://example.test'), new URL('https://example.test')))
assert(
  !equal(
    new URL('https://example.test'),
    new URL('https://example.test/with-path')
  )
)
assert(!equal({ a: undefined, b: undefined }, { a: undefined, c: undefined }))
assert(!equal({ a: undefined, b: undefined }, { a: undefined }))
assert(!equal(new WeakMap(), new WeakSet()))
