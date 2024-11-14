#!/bin/bash

## copy over static files from src
rsync -r ./src/assets/images ./dev
rsync ./src/assets/favicon.ico ./dev
rsync ./src/index.html ./dev
rsync ./src/manifest.json ./dev
rsync ./src/service-worker.js ./dist
./node_modules/.bin/workbox injectManifest ./workbox-dev-config.js

deno -A ./scripts/dev.js
