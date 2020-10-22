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

echo -e "🚀  Deploying... \n"

git add ./dist/*
git amend -n
git push
git subtree push --prefix dist origin gh-pages

echo -e "🎉 MiroPad v${COLOR_GREEN}${NEW_VERSION}${NO_COLOR} deployed \n"