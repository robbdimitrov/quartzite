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
	@rm -f dist/*.js

all: setup lint test build
