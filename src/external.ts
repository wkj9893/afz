import path from "path";
import fs from "fs";

export function getExternal(filePath: string): string[] {
  const res: string[] = [];
  let rootDir = path.dirname(filePath);
  let prev = "";
  while (true) {
    if (fs.existsSync(path.resolve(rootDir, "package.json"))) {
      const json = JSON.parse(
        fs.readFileSync(path.resolve(rootDir, "package.json"), {
          encoding: "utf-8",
        }),
      );
      for (
        const key of Object.keys({
          ...json.dependencies,
          ...json.devDependencies,
        })
      ) {
        res.push(key);
      }
      return res;
    }
    if (prev === rootDir) {
      return res;
    }
    prev = rootDir;
    rootDir = path.dirname(rootDir);
  }
}
