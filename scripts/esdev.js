/* eslint-disable quotes */

require("esbuild")
  .serve(
    {},
    {
      entryPoints: ["src/index.js"],
      bundle: true,
      outdir: "dev",
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
  // eslint-disable-next-line no-unused-vars
  .then((server) => {
    // Call "stop" on the web server when you're done
    // server.stop();
  });
