.DEFAULT_GOAL := dev
.PHONY : install dev deploy

MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

install:
	yarn install

dev: install
	yarn run dev

serve: build
	open http://localhost:8080 && serve $(MAKE_DIR)/dist

version:
	$(MAKE_DIR)/scripts/version.sh

build: install version
	$(MAKE_DIR)/scripts/build.sh

deploy: build
	$(MAKE_DIR)/scripts/deploy.sh