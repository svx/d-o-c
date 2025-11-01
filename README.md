# d-o-c
Documentation Operations Center

A multi-application Node.js repository using pnpm workspaces and Docker Compose.

## 📋 Overview

This repository contains multiple Node.js applications managed as a monorepo using pnpm workspaces:

- **API Service** (`apps/api`): Express-based REST API
- **Web Frontend** (`apps/web`): Static web server with HTML interface

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- macOS (for auto-startup configuration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/svx/d-o-c.git
   cd d-o-c
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

### Development

Run all applications in development mode:

```bash
pnpm dev
```

This will start:
- API service on http://localhost:3000
- Web frontend on http://localhost:8080

### Production with Docker Compose

Build and start all services:

```bash
docker-compose up -d
```

View logs:

```bash
docker-compose logs -f
```

Stop all services:

```bash
docker-compose down
```

## 🍎 macOS Auto-Startup

To configure Docker Compose to start automatically on macOS startup:

1. **Update the plist file**
   
   Edit `macos/com.doc.docker-compose.plist` and replace `/PATH/TO/YOUR/d-o-c` with the actual path to this repository.

2. **Copy to LaunchAgents**
   ```bash
   cp macos/com.doc.docker-compose.plist ~/Library/LaunchAgents/
   ```

3. **Load the LaunchAgent**
   ```bash
   launchctl load ~/Library/LaunchAgents/com.doc.docker-compose.plist
   ```

4. **Verify it's loaded**
   ```bash
   launchctl list | grep com.doc
   ```

### Uninstall Auto-Startup

To disable auto-startup:

```bash
launchctl unload ~/Library/LaunchAgents/com.doc.docker-compose.plist
rm ~/Library/LaunchAgents/com.doc.docker-compose.plist
```

## 📦 Workspace Structure

```
d-o-c/
├── apps/
│   ├── api/              # API service
│   │   ├── src/
│   │   │   └── index.js
│   │   ├── Dockerfile
│   │   └── package.json
│   └── web/              # Web frontend
│       ├── src/
│       │   └── index.js
│       ├── public/
│       │   └── index.html
│       ├── Dockerfile
│       └── package.json
├── macos/
│   └── com.doc.docker-compose.plist
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Available Scripts

From the root directory:

- `pnpm dev` - Run all apps in development mode
- `pnpm start` - Run all apps in production mode
- `pnpm build` - Build all apps
- `pnpm clean` - Clean all node_modules

## 🔍 API Endpoints

### API Service (Port 3000)

- `GET /health` - Health check
- `GET /api/docs` - API documentation

### Web Service (Port 8080)

- `GET /` - Web interface
- `GET /health` - Health check

## 📝 Adding New Applications

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/new-app
   ```

2. Add a `package.json` with the workspace naming convention:
   ```json
   {
     "name": "@d-o-c/new-app",
     "version": "1.0.0"
   }
   ```

3. Install dependencies from the root:
   ```bash
   pnpm install
   ```

4. Create a Dockerfile and add the service to `docker-compose.yml`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

MIT
