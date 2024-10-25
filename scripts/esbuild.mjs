/* eslint-disable quotes */
/* globals process */
/* eslint-disable no-console */
import * as esbuild from "esbuild";
import miropad from "../package.json" assert { type: "json" };

await esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    platform: "browser",
    outdir: "out",
    target: ["es2020", "chrome87", "firefox85"],
    minify: true,
    sourcemap: true,
    loader: {
      ".png": "file",
      ".svg": "file",
      ".jpg": "file",
      ".gif": "file",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
      TITLE_NAME: JSON.stringify("✍️ MiroPad"),
      VERSION: JSON.stringify(miropad.version),
      global: "globalThis",
    },
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
