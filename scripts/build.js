import * as esbuild from "npm:esbuild";

const VERSION = Deno.env.get("NEW_VERSION") || `v0.0.0`;

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "browser",
  target: ["es2020", "chrome87", "firefox85"],
  sourcemap: false,
  outdir: "dist",
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
  treeShaking: true,
  minify: true,
  splitting: true,
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  pure: ["console.log"],
});

esbuild.stop();
