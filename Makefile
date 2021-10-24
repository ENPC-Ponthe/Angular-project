all: serve
.PHONY: all

# NG commands
serve:
	npm run serve
lint:
	npm run lint
build:
	npm run build
build-prod:
	node ./node_modules/@angular/cli/bin/ng build --prod

# Check Circle-CI tests in advance
ci-check: lint build-prod

# Build desktop app for various OS
windows:
	npm run package-windows
linux:
	npm run package-linux
mac:
	npm run package-mac && create-dmg Galeries-Ponthé.dmg '../release-builds/Galeries Ponthé-darwin-x64/'
