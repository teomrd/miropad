/* eslint-disable quotes */
/* globals process */
/* eslint-disable no-console */

require("esbuild")
  .serve(
    {
      servedir: "dev",
    },
    {
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
        VERSION: JSON.stringify(require("../package.json").version),
      },
    }
  )
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
