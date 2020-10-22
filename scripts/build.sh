#!/bin/bash

echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} version ${COLOR_RED}${NEW_VERSION}${NO_COLOR} \n"

cp ./src/manifest.json ./dist
cp -r ./src/assets/images ./dist/images

yarn run build

echo -e "✓ Build finished \n"