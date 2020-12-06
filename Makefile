MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev deploy serve version build deploy clean

install:
	yarn install

dev: install
	yarn run dev

clean:
	rm -rf ./node_modules
	rm -rf ./*lock*

serve: build
	serve $(MAKE_DIR)/out

version:
	$(MAKE_DIR)/scripts/version.sh

build: install version
	$(MAKE_DIR)/scripts/build.sh

deploy: build
	$(MAKE_DIR)/scripts/deploy.sh