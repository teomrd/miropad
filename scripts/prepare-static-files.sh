#!/bin/bash

## copy over static files from src
rsync -r ./src/assets/images ./dist
rsync ./src/assets/favicon.ico ./dist
rsync ./src/index.html ./dist
rsync ./src/manifest.json ./dist
rsync ./src/service-worker.js ./dist
./node_modules/.bin/workbox injectManifest ./workbox-config.js

## versioning static file generation
version="${NEW_VERSION:-"v0.0.0"}"
echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} ${COLOR_RED}${version}${NO_COLOR} \n"
echo "$version" >./dist/version
