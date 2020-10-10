.DEFAULT_GOAL := dev
.PHONY : install \
				 dev \
				 deploy

MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

install:
	npm install

dev: install
	npm install

deploy:
	$(MAKE_DIR)/scripts/deploy.sh