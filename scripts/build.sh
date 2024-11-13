#!/bin/bash

version="${NEW_VERSION:-"v0.0.0"}"

echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} ${COLOR_RED}${version}${NO_COLOR} \n"

mkdir -p ./dist

cp ./src/manifest.json ./dist
cp ./static/favicon.ico ./dist
cp ./src/service-worker.js ./dist

echo "$version" >./dist/version

cp -r ./src/assets/images ./dist/images

deno -A ./scripts/build.js

cp ./static/index.html ./dist

./node_modules/.bin/workbox injectManifest ./workbox-config.js

echo -e "👷‍♂️ Build finished 🙌\n"
