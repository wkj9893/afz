import fs = require('fs')
import path = require('path')
import esbuild = require('esbuild')
import { spawn, spawnSync } from 'child_process'
import { getExternal } from './external'

export function match(filePath: string): boolean {
  const ext = path.extname(filePath)
  if (!['.js', '.mjs', '.ts', '.jsx', '.tsx'].includes(ext)) {
    return false
  }
  const end = filePath.length - ext.length
  if (end < 4) {
    return false
  }
  if (filePath.slice(end - 4, end) === 'test') {
    if (end == 4 || filePath[end - 5] === '_' || filePath[end - 5] === '.') {
      return true
    }
  }
  return false
}

/**
 * @param dir root dir
 * @returns all filepaths under dir matching the glob {*_,*.,}test.{js,mjs,ts,jsx,tsx}
 */
export function findPaths(dir: string): string[] {
  const res: string[] = []
  find(dir)
  return res

  function find(dir: string) {
    for (const filePath of fs.readdirSync(dir)) {
      //  skip dotfiles
      if (filePath.startsWith(`.`)) {
        continue
      }
      if (fs.statSync(path.resolve(dir, filePath)).isFile()) {
        if (match(filePath)) {
          res.push(path.resolve(dir, filePath))
        }
      } else {
        //  skip node_modules
        if (filePath === 'node_modules') {
          continue
        }
        find(path.resolve(dir, filePath))
      }
    }
  }
}

export async function runTest(
  filePath: string,
  external: string[]
): Promise<string> {
  await esbuild.build({
    entryPoints: [filePath],
    platform: 'node',
    bundle: true,
    outdir: path.resolve(__dirname, 'out'),
    sourcemap: true,
    external
  })
  filePath = filePath.split(path.sep).pop() as string
  const ext = path.extname(filePath)
  const fileName = filePath.slice(0, filePath.length - ext.length) + '.js'
  const run = spawn(process.execPath, [
    '--enable-source-maps',
    path.resolve(__dirname, 'out', fileName)
  ])
  let stdout = ''
  return new Promise((resolve, reject) => {
    run.stdout.on('data', (data) => {
      stdout += data.toString()
    })
    run.stderr.on('data', (data) => {
      if (stdout) {
        console.log()
        console.log('----------     stdout     ----------')
        console.log(stdout)
      }
      reject(data.toString())
    })
    run.on('error', (err) => {
      reject(err)
    })
    run.on('close', () => {
      resolve('')
    })
  })
}

export function runFileSync(filePath: string) {
  esbuild.buildSync({
    entryPoints: [filePath],
    platform: 'node',
    bundle: true,
    outdir: path.resolve(__dirname, 'out'),
    sourcemap: true,
    external: getExternal(filePath)
  })
  filePath = filePath.split(path.sep).pop() as string
  const ext = path.extname(filePath)
  const fileName = filePath.slice(0, filePath.length - ext.length) + '.js'
  spawnSync(
    process.execPath,
    ['--enable-source-maps', path.resolve(__dirname, 'out', fileName)],
    { stdio: 'inherit' }
  )
}
