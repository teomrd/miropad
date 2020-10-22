#!/bin/bash

version_type=${1:-patch}

npm version "$version_type"
NEW_VERSION=$(jq -r .version ./package.json)
echo "$NEW_VERSION" >./dist/version

echo -e "✓ Version ${COLOR_GREEN}MiroPad v${NEW_VERSION}${NO_COLOR} \n"