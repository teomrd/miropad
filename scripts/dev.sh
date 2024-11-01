#!/bin/bash

rsync -r ./static/ ./dev/

rsync ./dist/*.svg ./dev/

cp ./dist/index.css ./dev/
cp ./static/index.html ./dev/index.html

deno -A ./scripts/dev.js
