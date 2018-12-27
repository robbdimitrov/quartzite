.PHONY: setup build lint test clean

setup:
	@echo "Downloading dependencies..."
	@npm install --no-optional

build:
	@echo "Building..."
	@npm run build

lint:
	@echo "Linting..."
	@npm run lint

test:
	@echo "Running tests..."
	@npm test

clean:
	@echo "Cleaning up..."
	@rm -rf dist/*.js node_modules package-lock.json

all: setup lint build test
