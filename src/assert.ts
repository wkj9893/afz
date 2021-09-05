import { lightGreen } from './color'
import { equal } from './equal'

class AssertionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AssertionError'
  }
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
  throw new AssertionError(`    actual: ${actual}     expected: ${expected}`)
}
