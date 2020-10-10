#!/bin/bash
#===============================================================================
#
#          FILE: deploy.sh
#
#         USAGE:  ./deploy.sh
#
#   DESCRIPTION: upgrades the version and deploying to github pages
#
#       OPTIONS:  $1: patch(default), minor, major
#  REQUIREMENTS:  npm, git, jq
#          BUGS:  ---
#         NOTES:  ---
#        AUTHOR:  teomrd
#       COMPANY:  null
#       VERSION:  1.0
#       CREATED:  08/11/2019
#===============================================================================

version_type=${1:-patch}

npm version "$version_type"
cp ./src/manifest.json ./dist
cp -r ./src/assets/images ./dist/images
NEW_VERSION=$(jq -r .version ./package.json)
echo "$NEW_VERSION" >./dist/version

echo -e "🛠️  Building ${COLOR_GREEN}MiroPad${NO_COLOR} version ${COLOR_RED}${NEW_VERSION}${NO_COLOR} \n"

npm run build

echo -e "🚀  Deploying... \n"

git add ./dist/*
git amend -n
git push
git subtree push --prefix dist origin gh-pages

echo -e "🎉 MiroPad v${COLOR_GREEN}${NEW_VERSION}${NO_COLOR} deployed \n"