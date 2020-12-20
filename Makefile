.PHONY: build
build:
	cd app && yarn build

.PHONY: deploy
deploy: build
	firebase deploy --only hosting