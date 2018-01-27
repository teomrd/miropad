#!/usr/bin/env bash

rm -rf ./dist &&
rm -rf ./.cache &&
rm -f ./index.html &&
parcel build src/index.html --public-url ./dist/ &&
cp ./dist/index.html ./