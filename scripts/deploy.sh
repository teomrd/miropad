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
#  REQUIREMENTS:  npm, git
#          BUGS:  ---
#         NOTES:  ---
#        AUTHOR:  teomrd
#       COMPANY:  null
#       VERSION:  1.0
#       CREATED:  08/11/2019
#===============================================================================

version_type=${1:-patch};

npm version "$version_type" &&
  npm run build &&
  git add ./dist/* &&
  git amend -n &&
  git push &&
  git subtree push --prefix dist origin gh-pages
