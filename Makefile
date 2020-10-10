.DEFAULT_GOAL := dev
.PHONY : install dev deploy

MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

install:
	yarn

dev: install
	yarn dev

deploy:
	$(MAKE_DIR)/scripts/deploy.sh