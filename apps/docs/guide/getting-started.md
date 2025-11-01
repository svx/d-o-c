# Getting Started

Welcome to **d-o-c** - the Documentation Operations Center! This guide will help you get up and running with our containerized documentation and monitoring infrastructure.

## Overview

d-o-c is a modern Node.js repository with containerized services using pnpm workspaces, VitePress documentation, Caddy web servers, and Uptime Kuma monitoring.

This repository contains a complete containerized documentation and monitoring infrastructure:

- **🌐 Web Frontend** (`apps/web`): Modern web interface with Tailwind CSS served by Caddy
- **📚 Documentation** (`apps/docs`): VitePress-powered documentation served by Caddy  
- **📊 Status Monitor**: Uptime Kuma dashboard for service monitoring and alerts

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [Task](https://taskfile.dev/) (recommended)

### Installing Task

Task is used as the task runner for this project. You can install it using:

**macOS:**
```bash
brew install go-task
```

**Other platforms:**
See the [Task installation guide](https://taskfile.dev/installation/) for instructions.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/svx/d-o-c.git
   cd d-o-c
   ```

2. **Install dependencies**
   ```bash
   task install
   # or
   pnpm install
   ```

## Project Structure

```
d-o-c/
├── apps/
│   ├── web/                    # Web frontend with Caddy
│   │   ├── src/
│   │   │   ├── index.js        # Express server (dev only)
│   │   │   └── input.css       # Tailwind CSS source
│   │   ├── public/
│   │   │   ├── index.html      # Modern web interface
│   │   │   ├── styles.css      # Compiled Tailwind CSS
│   │   │   └── favicon.svg     # Custom favicon
│   │   ├── Caddyfile          # Caddy web server config
│   │   ├── Dockerfile         # Multi-stage build with Caddy
│   │   ├── tailwind.config.js # Tailwind configuration
│   │   └── package.json
│   └── docs/                   # VitePress documentation with Caddy
│       ├── .vitepress/
│       │   ├── config.js       # VitePress configuration
│       │   └── theme/          # Custom theme (testthedocs style)
│       ├── public/
│       │   └── favicon.svg     # Shared favicon
│       ├── guide/              # Documentation pages
│       ├── api/                # Infrastructure documentation
│       ├── web/                # Web app documentation
│       ├── Caddyfile          # Caddy server config for docs
│       ├── Dockerfile         # Multi-stage build with Caddy
│       └── package.json
├── macos/
│   └── com.doc.docker-compose.plist
├── docker-compose.yml          # Three containerized services
├── Taskfile.yml               # Enhanced task runner
├── pnpm-workspace.yaml
└── package.json
```

## Development Workflow

### Development Mode

Start services in development mode:

```bash
# Start web frontend
task dev
# or
pnpm dev

# Start documentation (separate terminal)
task docs:dev
# or
pnpm docs:dev
```

This will start:
- **Web Frontend**: <http://localhost:8080>
- **Documentation**: <http://localhost:5173>

### Production Mode with Docker

For the full containerized experience:

```bash
# Build and start all services
task docker:build
task docker:up
```

This will start three services:
- **🌐 Web Frontend**: <http://localhost:8080> (Caddy + Tailwind CSS)
- **📚 Documentation**: <http://localhost:8081> (Caddy + VitePress)  
- **📊 Status Monitor**: <http://localhost:3001> (Uptime Kuma)

## Key Features

### Modern Technology Stack
- **pnpm Workspaces**: Efficient monorepo management
- **VitePress**: Fast, modern documentation framework
- **Tailwind CSS**: Utility-first CSS framework with custom brand colors
- **Caddy**: High-performance web server with automatic HTTPS
- **Docker Compose**: Multi-service containerization
- **Uptime Kuma**: Beautiful monitoring dashboard

### Built-in Monitoring
- Health check endpoints for all services
- Uptime Kuma dashboard for service monitoring
- Persistent data storage with Docker volumes
- Container health checks and restart policies

### Developer Experience
- Task-based automation for common operations
- Hot reloading in development mode
- Optimized Docker builds with multi-stage processes
- Comprehensive logging and debugging tools

## Next Steps

- [Installation Guide](/guide/installation) - Set up the project locally
- [Quick Start](/guide/quick-start) - Get everything running quickly
- [Infrastructure Documentation](/api/) - Learn about the containerized architecture
- [Web Frontend](/web/) - Explore the web interface