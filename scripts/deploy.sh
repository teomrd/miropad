#!/bin/bash
############################
# deploy.sh
############################

npm version minor &&
  npm run build &&
  git add ./dist/* &&
  git commit -m "deploy" -n &&
  git subtree push --prefix dist origin gh-pages
