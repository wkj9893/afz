#!/usr/bin/env node
import { findPaths, runTest, runFileSync } from '.'
import { lightGreen, lightRed } from './color'
import path = require('path')
import { version } from '../package.json'
import { getExternal } from './external'

async function cli() {
  const args = process.argv.slice(2)
  if (!args[0]) {
    const filepaths = findPaths(process.cwd())
    if (filepaths.length === 0) {
      console.log(
        'there is no test file( {*_,*.,}test.{js,mjs,ts,jsx,tsx} ) in this project'
      )
      return
    }
    filepaths.length === 1
      ? console.log(`running 1 test:\n`)
      : console.log(`running ${filepaths.length} tests:\n`)
    const external = getExternal(filepaths[0])
    for (const filepath of filepaths) {
      await runTest(filepath, external)
    }
    return 'test'
  } else if (args[0] === '-v' || args[0] === '--version') {
    console.log(`v${version}`)
  } else if (args[0] === '-h' || args[0] === '--help') {
    console.log('afz')
    console.log('Run tests using esbuild and nodejs\n')
    console.log(
      'Evaluate the given modules, run all tests files matching the glob'
    )
    console.log('{*_,*.,}test.{js,mjs,ts,jsx,tsx}')
    console.log('\nUSAGE:')
    console.log('afz [OPTIONS] [files]')
    console.log('\nOPTIONS:')
    console.log(
      '-h, --help                                              Prints help information'
    )
    console.log('\nARGS:')
    console.log(
      '<files>...         List of file names to run(js,mjs,ts,jsx,tsx),works like ts-node'
    )
  } else {
    for (const arg of args) {
      if (path.isAbsolute(arg)) {
        runFileSync(arg)
      } else {
        runFileSync(path.resolve(process.cwd(), arg))
      }
    }
  }
}

const startTime = performance.now()
cli()
  .then((val) => {
    if (val !== 'test') {
      return
    }
    console.log()
    console.log(
      `test result: ${lightGreen('ok')}.      finished in ${(
        (performance.now() - startTime) /
        1000
      ).toFixed(2)}s`
    )
  })

  .catch((err) => {
    console.log(err)
    console.log(
      `test result: ${lightRed('FAILED')}.      finished in ${(
        (performance.now() - startTime) /
        1000
      ).toFixed(2)}s`
    )
  })
