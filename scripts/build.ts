import { build } from 'esbuild'

const p1 = build({
  entryPoints: ['src/cli.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  outfile: 'cli.js',
  external: ['esbuild']
})

const p2 = build({
  entryPoints: ['index.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  outfile: 'index.js'
})

Promise.all([p1, p2]).catch((e) => {
  console.log(e)
})
