MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev audits deploy serve version build deploy clean

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

checks: install verify-formatting lint test
	make compile

audits: install build
	deno task lighthouse

clean:
	deno clean
	rm -rf ./node_modules
	rm -rf ./out
	rm -rf ./dist
	rm -rf ./dev
	rm -rf ./*lock*

serve: build
	serve $(MAKE_DIR)/dist

version:
	$(MAKE_DIR)/scripts/version.sh

build: install
	$(MAKE_DIR)/scripts/build.sh

deploy: version build
	$(MAKE_DIR)/scripts/deploy.sh