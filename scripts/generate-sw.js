import { injectManifest } from "workbox-build";

await injectManifest({
  globDirectory: "dist/",
  globPatterns: ["**/*"],
  globIgnores: ["dist/service-worker.js"],
  swDest: "dist/service-worker.js",
  swSrc: "src/service-worker.js",
});
