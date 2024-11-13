import * as esbuild from "npm:esbuild";

const VERSION = Deno.env.get("NEW_VERSION") || `v0.0.0`;

const result = await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "browser",
  target: ["es2020", "chrome87", "firefox85"],
  minify: true,
  sourcemap: true,
  outdir: "dist",
  bundle: true,
  format: "esm",
  loader: {
    ".png": "file",
    ".svg": "file",
    ".jpg": "file",
    ".gif": "file",
  },
  define: {
    TITLE_NAME: JSON.stringify("✍️ MiroPad"),
    VERSION: JSON.stringify(VERSION),
    global: "globalThis",
  },
});

esbuild.stop();
