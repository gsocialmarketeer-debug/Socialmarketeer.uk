import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const destination = path.join(root, "dist");
const publicExtensions = new Set([".html", ".css", ".js", ".jpg", ".png", ".pdf"]);

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile() || !publicExtensions.has(path.extname(entry.name))) continue;
  await cp(path.join(root, entry.name), path.join(destination, entry.name));
}

console.log("Public website built in dist/.");
