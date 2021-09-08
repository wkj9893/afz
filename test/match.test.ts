import { match } from '../src'
import { assertEqual } from '../src/assert'

assertEqual(match('test.js'), true)
assertEqual(match('test.mjs'), true)
assertEqual(match('test.ts'), true)
assertEqual(match('test.jsx'), true)
assertEqual(match('test.tsx'), true)
assertEqual(match('test.go'), false)
assertEqual(match('hello_test.ts'), true)
assertEqual(match('hello.test.ts'), true)
assertEqual(match('hello-test.ts'), false)

assertEqual([1, 34, 2], { a: 2 }, 'weq')
