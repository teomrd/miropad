MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev audits deploy serve version build deploy clean

install:
	deno install

dev: install
	open http://localhost:8000 && deno task dev

checks: install
	deno lint

audits: install build
	deno task lighthouse

clean:
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