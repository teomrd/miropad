#!/bin/bash

rsync -r ./static/ ./dev/

rsync ./out/*.svg ./dev/

cp ./out/index.css ./dev/
cp ./static/index.html ./dev/index.html

node ./scripts/esdev.js
