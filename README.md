# d-o-c

Documentation Operations Center

A modern Node.js repository with containerized services using pnpm workspaces, Antora documentation, Caddy web servers, and Uptime Kuma monitoring.

## 📋 Overview

This repository contains a complete containerized documentation and monitoring infrastructure:

- **🌐 Web Frontend** (`apps/web`): Modern web interface with Tailwind CSS served by Caddy
- **📚 Documentation** (`apps/docs`): Antora-powered documentation with Meilisearch search served by Caddy  
- **🔍 Search Engine** (`meilisearch`): High-performance search engine for documentation with real-time indexing
- **📊 Status Monitor**: Uptime Kuma dashboard for service monitoring and alerts

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [Task](https://taskfile.dev/) (recommended)

### Installation

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

### Development

Run applications in development mode:

```bash
task dev
# or
pnpm dev
```

This will start:

- Web frontend on <http://localhost:8080>

For documentation development:

```bash
task docs:dev
# or
pnpm docs:dev
```

This will start the documentation development server with watch mode at <http://localhost:8080>

### Production with Docker Compose

Build and start all containerized services:

```bash
task docker:build
task docker:up
```

This will start three services:
- **🌐 Web Frontend**: <http://localhost:8080> (Caddy + Tailwind CSS)
- **📚 Documentation**: <http://localhost:8081> (Caddy + Antora + Meilisearch Search)  
- **🔍 Search Engine**: <http://localhost:7700> (Meilisearch API)
- **📊 Status Monitor**: <http://localhost:3001> (Uptime Kuma)

View logs from all services:

```bash
task docker:logs
```

View logs from individual services:

```bash
task docker:logs:web      # Web frontend logs
task docker:logs:docs     # Documentation logs  
task docker:logs:uptime   # Uptime Kuma logs
task docker:logs:meilisearch # Meilisearch logs
```

Check service status:

```bash
task services:info
```

Stop all services:

```bash
task docker:down
```

## 📖 Documentation

Comprehensive documentation is available at the Antora documentation site. Start the docs server locally:

```bash
task docs:dev
```

Or serve the built documentation:

```bash
task docs:serve
```

Or view the available tasks:

```bash
task --list
```

## 🔍 Meilisearch Search Setup

The documentation includes a powerful search engine powered by Meilisearch that provides instant search with typo tolerance and highlighting.

### Automatic Setup with Docker

When you run `task docker:up`, Meilisearch is automatically:

1. **Started**: Meilisearch v1.10 container runs on port 7700
2. **Configured**: CORS enabled, main key authentication setup
3. **Indexed**: Documentation is automatically indexed from the built Antora output

### Manual Search Operations

```bash
# Check search status and document count
task search:status

# Re-index documentation (useful after content changes)
task search:index

# Test search functionality
task search:test

# Clear search index (useful for troubleshooting)
task search:clear
```

### Search Features

- **🚀 Instant Search**: Results appear as you type with <20ms response time
- **🎯 Typo Tolerance**: Finds results even with spelling mistakes  
- **🔍 Highlighting**: Search terms are highlighted in results
- **📱 Mobile Optimized**: Works seamlessly on all devices
- **⚡ Auto-complete**: Smart suggestions based on document content

### Search Integration

The search functionality is integrated into the Antora UI and includes:

- **Multi-input Support**: Works with both desktop and mobile search inputs
- **Real-time Results**: No page refresh needed, results update instantly  
- **Content Highlighting**: Matching text is highlighted in search results
- **Deep Linking**: Click results to navigate directly to relevant sections

### Troubleshooting Search

If search is not working:

1. **Check Meilisearch Status**: `task search:status`
2. **Verify Container Health**: `task docker:status`
3. **Re-index Documents**: `task search:index`
4. **Check Logs**: `task docker:logs:meilisearch`

## 🍎 macOS Auto-Startup

To configure Docker Compose to start automatically on macOS startup:

1. **Update the plist file**
   
   Edit `macos/com.doc.docker-compose.plist` and replace `/PATH/TO/YOUR/d-o-c` with the actual path to this repository.

2. **Run the setup task**
   ```bash
   task setup:macos
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
│   ├── web/                    # Web frontend with Caddy
│   │   ├── src/
│   │   │   ├── index.js        # Express server (dev only)
│   │   │   └── input.css       # Tailwind CSS source
│   │   ├── public/
│   │   │   ├── index.html      # Modern web interface
│   │   │   └── styles.css      # Compiled Tailwind CSS
│   │   ├── Caddyfile          # Caddy web server config
│   │   ├── Dockerfile         # Multi-stage build with Caddy
│   │   ├── tailwind.config.js # Tailwind configuration
│   │   └── package.json
│   └── docs/                   # Antora documentation with Caddy + Meilisearch
│       ├── src/                # Antora documentation source
│       ├── indexer/            # Meilisearch document indexer
│       │   ├── index.js        # Node.js indexing script
│       │   └── package.json    # Indexer dependencies
│       ├── antora-playbook.yml # Antora configuration
│       ├── build/              # Built documentation output
│       ├── Caddyfile          # Caddy server config for docs
│       ├── Dockerfile         # Multi-stage build with Caddy
│       ├── favicon.svg        # Shared favicon
│       └── package.json
├── macos/
│   └── com.doc.docker-compose.plist
├── docker-compose.yml          # Four containerized services
├── Taskfile.yml               # Enhanced task runner
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Available Tasks

### Development Tasks
- `task help` - Show all available tasks
- `task install` - Install all dependencies
- `task dev` - Run all apps in development mode
- `task start` - Run all apps in production mode
- `task build` - Build all apps
- `task clean` - Clean all node_modules

### Documentation Tasks
- `task docs:dev` - Start Antora documentation development server with watch mode
- `task docs:build` - Build Antora documentation for production
- `task docs:serve` - Serve built Antora documentation

### Search Tasks
- `task search:index` - Index documentation in Meilisearch
- `task search:status` - Check Meilisearch status and document count
- `task search:clear` - Clear all documents from Meilisearch index
- `task search:test` - Test search functionality

### Docker Tasks
- `task docker:build` - Build all Docker images (web, docs, uptime-kuma)
- `task docker:up` - Start all containerized services
- `task docker:down` - Stop all containers
- `task docker:restart` - Restart all containers
- `task docker:status` - Show container status

### Docker Logging Tasks
- `task docker:logs` - View logs from all containers
- `task docker:logs:web` - View web frontend logs only
- `task docker:logs:docs` - View documentation logs only  
- `task docker:logs:uptime` - View Uptime Kuma logs only
- `task docker:logs:meilisearch` - View Meilisearch search engine logs only

### Service Management
- `task services:info` - Show service URLs and status
- `task docker:clean` - Clean up containers and volumes
- `task setup:macos` - Setup macOS auto-startup

## 🔍 Services Overview

### 🌐 Web Frontend (Port 8080)

Modern web interface with Tailwind CSS styling served by Caddy.

**Key Features:**

- **Server**: Caddy 2 with automatic HTTPS
- **Styling**: Tailwind CSS with custom brand color scheme
- **Performance**: Gzip compression, static asset caching
- **Security**: Security headers, XSS protection
- **Health Checks**: Built-in health monitoring

**Development**: <http://localhost:8080>  
**Production**: <http://localhost:8080> (containerized)

### 📚 Documentation (Port 8081)

Antora-powered documentation served by Caddy with optimized caching.

**Key Features:**

- **Framework**: Antora with custom UI
- **Server**: Caddy 2 with SPA routing support
- **Theme**: Custom UI bundle with d-o-c branding
- **Performance**: Optimized caching for HTML/CSS/JS
- **Features**: Interactive navigation, search functionality

**Development**: <http://localhost:8080> (watch mode)  
**Production**: <http://localhost:8081> (containerized)

### 📊 Status Monitor (Port 3001)

Uptime Kuma monitoring dashboard for tracking service availability.

**Key Features:**

- **Service**: Uptime Kuma v1
- **Monitoring**: HTTP/HTTPS, TCP, ping monitoring
- **Alerts**: Email, Slack, Discord, and more
- **Dashboard**: Beautiful status pages
- **Data**: Persistent storage with Docker volumes

**Production**: <http://localhost:3001> (containerized only)

### 🔍 Search Engine (Port 7700)

Meilisearch high-performance search engine providing instant search for documentation.

**Key Features:**

- **Engine**: Meilisearch v1.10 with typo tolerance and instant search
- **API**: RESTful search API with comprehensive filtering options
- **Performance**: Sub-20ms search response with highlighting
- **Security**: Main key authentication and CORS support
- **Indexing**: Automatic document indexing from Antora build output
- **UI Integration**: Real-time search with result highlighting in documentation

**Development**: Automatically indexed when running `task docs:build`  
**Production**: <http://localhost:7700> (containerized) - API endpoint only

## 🏗️ Docker Architecture

### Container Overview

```text
┌───────────────────────────────────────────────────────────────────────┐
│                     Docker Network: doc-network                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Web App   │  │    Docs     │  │ Meilisearch │  │   Uptime Kuma   │  │
│  │   + Caddy   │  │  + Caddy    │  │   Search    │  │  (Monitoring)   │  │
│  │   :8080     │  │   :8081     │  │   :7700     │  │     :3001       │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
│         │                │               │                 │            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Persistent  │  │ Persistent  │  │ Persistent  │  │   Persistent    │  │
│  │   Storage   │  │   Storage   │  │   Storage   │  │    Storage      │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
```

### Persistent Data Volumes

- **`caddy_data_web`** & **`caddy_config_web`** - Web server configuration and data
- **`caddy_data_docs`** & **`caddy_config_docs`** - Documentation server data  
- **`meilisearch_data`** - Search engine indexes and configuration
- **`uptime_kuma_data`** - Monitoring dashboard data and configuration

All data persists across container restarts and updates.

### Multi-stage Builds
Both web and docs containers use optimized multi-stage builds:
1. **Build stage**: Node.js environment for building assets
2. **Production stage**: Lightweight Caddy server with built assets

## 📝 Development Workflow

### Adding New Applications

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/new-app
   ```

2. Add a `package.json` with proper workspace configuration:
   ```json
   {
     "name": "new-app",
     "version": "1.0.0",
     "scripts": {
       "dev": "node src/index.js",
       "start": "node src/index.js",
       "build": "echo 'Build complete'",
       "clean": "rm -rf node_modules"
     }
   }
   ```

3. The app will automatically be included in workspace operations.

### Documentation Updates

1. Edit files in the `apps/docs/src/` directory
2. Start the docs dev server: `task docs:dev`
3. View changes at <http://localhost:8080>

## 🚀 Deployment

### Docker Deployment (Recommended)

The repository includes complete Docker Compose configuration for production deployment:

```bash
# Build all images
task docker:build

# Start all services with persistent data
task docker:up

# Monitor services
task services:info
task docker:logs
```

**Services Available:**
- **Web Frontend**: <http://localhost:8080>
- **Documentation**: <http://localhost:8081>  
- **Search Engine**: <http://localhost:7700> (API only)
- **Status Monitor**: <http://localhost:3001>

### Development Deployment

For local development without Docker:

```bash
# Install dependencies
task install

# Start web frontend (development)
task dev

# Start documentation (separate terminal)
task docs:dev
```

### Service Monitoring

Once deployed, configure Uptime Kuma to monitor your services:

1. Access Uptime Kuma at <http://localhost:3001>
2. Create monitors for:
   - Web Frontend: <http://localhost:8080/health>
   - Documentation: <http://localhost:8081/health>
3. Configure notifications (email, Slack, etc.)

## 🔧 Configuration

### Caddy Configuration

Both web and docs services use Caddy with optimized configurations:

- **Compression**: Gzip enabled for all text content
- **Security**: Modern security headers (XSS, CSP, etc.)
- **Caching**: Aggressive caching for static assets
- **Health Checks**: Built-in health endpoints

### Tailwind CSS

The web frontend uses a custom Tailwind configuration with the d-o-c brand colors:

- **Primary Brand Color**: `#5469d4`
- **Color Palette**: Extended brand colors (50-900)
- **Components**: Custom utilities and components

## 📊 Monitoring & Observability

### Built-in Health Checks

All services include health check endpoints:
- **Web**: `/health` - Returns "OK"
- **Docs**: `/health` - Returns "Antora Documentation OK"
- **Search**: `/health` - Returns Meilisearch health status
- **Uptime Kuma**: `/` - Dashboard availability

### Container Monitoring

Docker Compose includes health checks for all containers:
- **Interval**: 30 seconds
- **Timeout**: 10 seconds  
- **Retries**: 3 attempts
- **Start Period**: 40-60 seconds

### Logs and Debugging

Access logs from any service:

```bash
# All services
task docker:logs

# Individual services  
task docker:logs:web
task docker:logs:docs
task docker:logs:uptime

# Follow logs in real-time
docker compose logs -f [service-name]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test locally
4. Update documentation as needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Task Documentation](https://taskfile.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Antora](https://antora.org/)
- [Meilisearch](https://www.meilisearch.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Caddy Web Server](https://caddyserver.com/)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [Tailwind CSS](https://tailwindcss.com/)
