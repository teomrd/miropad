import * as esbuild from "esbuild";
import miropad from "../package.json" assert { type: "json" };

const context = await esbuild.context({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "dev/index.js",
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
    VERSION: JSON.stringify(miropad.version),
    global: "globalThis",
  },
});

await context.watch();

const { host, port } = await context.serve({
  servedir: "dev",
});

console.log(`Running v${miropad.version} on ${host}:${port} 🚀`);
