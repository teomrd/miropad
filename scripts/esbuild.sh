#!/bin/bash

node ./scripts/esbuild.js

cp ./static/index.html ./out

workbox injectManifest workbox-config.js