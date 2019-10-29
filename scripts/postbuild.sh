#!/bin/bash
############################
# postbuild.sh
############################

PACKAGE_VERSION=$(jq -r ".name" package.json)
git add ./dist/* && git commit -m "Deployment $PACKAGE_VERSION" -n
