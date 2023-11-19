/* eslint-disable quotes */
/* eslint-disable no-console */
import * as esbuild from "esbuild";
import miropad from "../package.json" assert { type: "json" };
import { wasmLoader } from 'esbuild-plugin-wasm'

const context = await esbuild.context({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "dev/index.js",
  plugins: [wasmLoader()],
  format: "esm",
  target: ["esnext", "chrome120"],
  minify: true,
  sourcemap: true,
  loader: {
    ".png": "file",
    ".svg": "file",
    ".jpg": "file",
    ".gif": "file",
  },
  define: {
    "process.env.NODE_ENV": '"development"',
    TITLE_NAME: JSON.stringify("✍️ MiroPad"),
    VERSION: JSON.stringify(miropad.version),
    global: "globalThis",
  },
});

await context.watch();

const { host, port } = await context.serve({
  servedir: "dev",
});

console.log(`Running v${miropad.version} on ${host}:${port} 🚀`);
