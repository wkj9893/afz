#!/usr/bin/env node
import { run } from ".";
import path from "path";
import { version } from "../package.json";
import { performance } from "perf_hooks";

function cli() {
  const args = process.argv.slice(2);
  if (args[0] === "-v" || args[0] === "--version") {
    console.log(`v${version}`);
  } else if (args[0] === "-h" || args[0] === "--help") {
    console.log(`afz ${version}
    Run file(ts,tsx,js,jsx) using esbuild and nodejs
    USAGE:
    afz [OPTION]... [FILE]...
  
  OPTION:
    -h, --help
            Prints help information
  
    -V, --version
            Prints version information
  FILE:
    list of fileName or dirName to run`);
  } else {
    for (const arg of args) {
      if (path.isAbsolute(arg)) {
        run(arg);
      } else {
        run(path.resolve(process.cwd(), arg));
      }
    }
  }
}

const startTime = performance.now();
try {
  cli();
} catch (err) {
  console.log(err);
} finally {
  console.log();
  console.log(
    `finished in ${
      (
        (performance.now() - startTime) /
        1000
      ).toFixed(2)
    }s`,
  );
}
