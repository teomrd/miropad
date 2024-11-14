import * as esbuild from "esbuild";
import miropad from "../package.json" with { type: "json" };

const VERSION = `v0.0.0`;
const context = await esbuild.context({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  target: ["es2020", "chrome100", "firefox100"],
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
    VERSION: JSON.stringify(VERSION),
    global: "globalThis",
  },
});

await context.watch();

const { host, port } = await context.serve({
  servedir: "dist",
});

console.log(`Running v${miropad.version} on ${host}:${port} 🚀`);
