// deno-lint-ignore-file no-explicit-any
import path from "path";
import esbuild from "esbuild";
import Module from "module";
import { getExternal } from "./external";
import fs from "fs";
import os from "os";

export function run(filePath: string) {
  const fileName = filePath.split(path.sep).pop() as string;
  const outdir = os.tmpdir();
  const outfile = path.resolve(outdir, fileName);
  esbuild.buildSync({
    entryPoints: [filePath],
    platform: "node",
    format: "cjs",
    bundle: true,
    outfile,
    sourcemap: "inline",
    external: getExternal(filePath),
  });

  process.argv = [process.execPath, filePath];
  // @ts-ignore
  process.setSourceMapsEnabled(true);
  registerExtensions(
    filePath,
    path.resolve(
      outdir,
      fileName.slice(0, fileName.length - path.extname(fileName).length) +
        ".js",
    ),
  );
  Module.runMain();
}

function registerExtensions(src: string, dest: string) {
  const old = (Module as any)._extensions[".js"];
  (Module as any)
    ._extensions[".js"] = (module: any, filename: string) => {
      module._compile.cjsSourceMapCache = {};
      if (filename === src) {
        const content = fs.readFileSync("/root/test/world.js", "utf-8");
        module._compile(content, filename);
      } else {
        old(module, filename);
      }
    };
  const fn = (
    module: any,
    filename: string,
  ) => {
    const content = fs.readFileSync(dest, "utf-8");
    module._compile(content, filename);
  };
  (Module as any)._extensions[".ts"] = fn;
  (Module as any)._extensions[".tsx"] = fn;
  (Module as any)._extensions[".jsx"] = fn;
}
