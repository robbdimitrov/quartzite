.PHONY: setup build clean

setup:
	npm install --no-optional
build:
	npm run build
clean:
	rm -f dist/*.js
