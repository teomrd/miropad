#!/bin/bash

NEW_VERSION=$(jq -r .version ./package.json)

echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} v${COLOR_RED}${NEW_VERSION}${NO_COLOR} \n"

mkdir -p ./dist

cp ./src/manifest.json ./dist
cp ./static/favicon.ico ./dist

cp -r ./src/assets/images ./dist/images

deno ./scripts/build.js

cp ./static/index.html ./dist

./node_modules/.bin/workbox injectManifest ./workbox-config.js

echo -e "👷‍♂️ Build finished 🙌\n"
