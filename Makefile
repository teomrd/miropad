MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev audits deploy serve version build deploy clean

install:
	pnpm install

dev: install build
	open http://localhost:8000 && pnpm run dev

checks: install
	pnpm run lint && pnpm run test

audits: install build
	pnpm run lighthouse

clean:
	rm -rf ./node_modules
	rm -rf ./out
	rm -rf ./dev
	rm -rf ./*lock*

serve: build
	serve $(MAKE_DIR)/out

update:
	pnpm up

force-update:
	pnpm up --latest

version:
	$(MAKE_DIR)/scripts/version.sh

build: install
	$(MAKE_DIR)/scripts/build.sh

deploy: build
  # you can run `make deploy version=minor`
	@echo "Deploying version: $(version)"
	$(MAKE_DIR)/scripts/version.sh $(version)
	$(MAKE_DIR)/scripts/deploy.sh