MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev deploy serve build deploy clean

install:
	deno install

dev: clean-build-output install prepare-static-files
	open http://localhost:8000 && deno -A ./scripts/dev.js

format: 
	deno fmt

verify-formatting: 
	deno fmt --check

lint:
	deno lint

test:
	deno test

compile:
	deno task compile

checks: install compile build verify-formatting lint
	make test

lighthouse-audit: install build
	lhci autorun

# you will need to `make serve` first (in a separate terminal)
# & with this: it will update the lighthouse score badges
# in the docs folder where ReadMe refers to (you will need to commit the changes)
lighthouse-badges:
	npx lighthouse-badges -o docs/lighthouse/badges -u http://localhost:3000/

update-lighthouse-badges: lighthouse-badges
	$(MAKE_DIR)/scripts/update-badges.sh

clean-build-output:
	rm -rf ./dist

clean: clean-build-output
	deno clean
	rm -rf ./node_modules
	rm -rf ./*lock*

serve: build
	serve $(MAKE_DIR)/dist

update:
	pnpm update

prepare-static-files:
	$(MAKE_DIR)/scripts/prepare-static-files.sh

build: clean-build-output install prepare-static-files
	deno -A ./scripts/build.js

deploy: version build
	$(MAKE_DIR)/scripts/deploy.sh