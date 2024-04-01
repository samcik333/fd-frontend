# Makefile for a project using npm scripts

# Target for starting the development server
start:
	@echo "Starting the development server..."
	npm start

# Target for building the app for production
build:
	@echo "Building the app for production..."
	npm run build

# Target for starting the test runner
test:
	@echo "Starting the test runner..."
	npm test

# Target for ejecting from create-react-app or similar tool
eject:
	@echo "Ejecting the project..."
	npm run eject

# Default target
help:
	@echo "Available commands:"
	@echo "  make start    - Starts the development server."
	@echo "  make build    - Bundles the app into static files for production."
	@echo "  make test     - Starts the test runner."
	@echo "  make eject    - Removes the tool and copies build dependencies, configuration files, and scripts into the app directory."
	@echo "Happy hacking!"

# Declare phony targets
.PHONY: start build test eject help
