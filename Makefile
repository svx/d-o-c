.PHONY: help install dev start build clean docker-build docker-up docker-down docker-logs setup-macos

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

install: ## Install all dependencies
	pnpm install

dev: ## Run all apps in development mode
	pnpm dev

start: ## Run all apps in production mode
	pnpm start

build: ## Build all apps
	pnpm build

clean: ## Clean all node_modules
	pnpm clean
	rm -rf node_modules

docker-build: ## Build Docker images
	docker compose build

docker-up: ## Start Docker containers
	docker compose up -d

docker-down: ## Stop Docker containers
	docker compose down

docker-logs: ## View Docker container logs
	docker compose logs -f

setup-macos: ## Setup macOS auto-startup (requires manual path update in plist file)
	@echo "Before running this, update the WorkingDirectory path in macos/com.doc.docker-compose.plist"
	@read -p "Have you updated the path? (y/n) " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		cp macos/com.doc.docker-compose.plist ~/Library/LaunchAgents/; \
		launchctl load ~/Library/LaunchAgents/com.doc.docker-compose.plist; \
		echo "✅ LaunchAgent installed and loaded"; \
	else \
		echo "❌ Setup cancelled. Please update the path first."; \
	fi
