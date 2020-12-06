/* globals process */
/* eslint-disable no-console */

require("esbuild")
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "dist/out.js",
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
      TITLE_NAME: JSON.stringify("✍️ MiroPad"),
      VERSION: JSON.stringify(require("../package.json").version),
    },
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
