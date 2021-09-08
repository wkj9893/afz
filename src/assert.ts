import { inspect } from 'util'
import { equal } from './equal'

class AssertionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AssertionError'
  }
}

function format(v: unknown) {
  return inspect(v, {
    depth: Infinity,
    sorted: true
  })
}

export function assert(exp: unknown, msg = '') {
  if (!exp) {
    throw new AssertionError(`assertion failed ${msg}`)
  }
}

export function assertEqual(actual: unknown, expected: unknown, msg = '') {
  if (equal(actual, expected)) {
    return
  }
  actual = format(actual)
  expected = format(expected)
  const message = `Values are not equal:\n\nActual:      ${actual}  \nExpected:    ${expected} \n${msg}`
  throw new AssertionError(message)
}
