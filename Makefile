MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev deploy serve build deploy clean

install:
	deno install

dev: install
	open http://localhost:8000 && sh scripts/dev.sh

verify-formatting: 
	deno fmt --check

lint:
	deno lint

test:
	deno test

compile:
	deno task compile

checks: install build verify-formatting lint test
	make compile

lighthouse-audit: install build
	lhci autorun

clean:
	deno clean
	rm -rf ./node_modules
	rm -rf ./out
	rm -rf ./dist
	rm -rf ./dev
	rm -rf ./*lock*

serve: build
	serve $(MAKE_DIR)/dist

build: install
	$(MAKE_DIR)/scripts/build.sh

deploy: version build
	$(MAKE_DIR)/scripts/deploy.sh