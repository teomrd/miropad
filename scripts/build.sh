#!/bin/bash

NEW_VERSION=$(jq -r .version ./package.json)

echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} v${COLOR_RED}${NEW_VERSION}${NO_COLOR} \n"

mkdir -p ./out

cp ./src/manifest.json ./out
cp -r ./src/assets/images ./out/images


yarn run build

echo -e "✓ Build finished \n"