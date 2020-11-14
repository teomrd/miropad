#!/bin/bash

rsync -r ./static/ ./dev/

rsync ./out/*.svg ./dev/

cp ./static/index-dev.html ./dev/index.html

serve ./dev

node ./scripts/esdev.js