#!/usr/bin/env bash

npm run clean && parcel build src/index.html --public-url ./dist/ && cp ./dist/index.html ./