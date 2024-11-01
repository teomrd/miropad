#!/bin/bash

rsync -r ./static/ ./dev/

rsync ./dist/*.svg ./dev/

cp ./dist/index.css ./dev/
cp ./static/index.html ./dev/index.html

deno --allow-env --allow-read ./scripts/dev.js
