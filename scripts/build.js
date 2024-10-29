import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";
import miropad from "../package.json" with { type: "json" };

const result = await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "browser",
  target: ["es2020", "chrome87", "firefox85"],
  minify: true,
  sourcemap: true,
  plugins: [...denoPlugins()],
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
    VERSION: JSON.stringify(miropad.version),
    global: "globalThis",
  },
});

esbuild.stop();