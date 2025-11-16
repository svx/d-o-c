# d-o-c

Documentation Operations Center

A modern Node.js repository with containerized services using pnpm workspaces, VitePress documentation, Caddy web servers, and Uptime Kuma monitoring.

## 📋 Overview

This repository contains a complete containerized documentation and monitoring infrastructure:

- **🌐 Web Frontend** (`apps/web`): Modern web interface with Tailwind CSS served by Caddy
- **📚 Documentation** (`apps/docs`): VitePress-powered documentation served by Caddy
- **📊 Status Monitor**: Uptime Kuma dashboard for service monitoring and alerts
- **🔖 Bookmark Manager**: Linkwarden for collaborative bookmark management with PostgreSQL
- **📈 Container Monitor**: cAdvisor for Docker container resource monitoring
- **📊 Analytics Dashboard**: Grafana with pre-configured Docker monitoring dashboard

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

This will start the documentation server on <http://localhost:5173>

### Production with Docker Compose

Build and start all containerized services:

```bash
task docker:build
task docker:up
```

This will start eight services:
- **🌐 Web Frontend**: <http://localhost:8080> (Caddy + Tailwind CSS)
- **📚 Documentation**: <http://localhost:8081> (Caddy + VitePress)
- **📊 Status Monitor**: <http://localhost:3001> (Uptime Kuma)
- **🔖 Bookmark Manager**: <http://localhost:3002> (Linkwarden + PostgreSQL)
- **📈 Container Monitor**: <http://localhost:8082> (cAdvisor)
- **📊 Analytics Dashboard**: <http://localhost:3000> (Grafana)
- **📈 Metrics Database**: <http://localhost:9090> (Prometheus)
- **📊 System Metrics**: <http://localhost:9100> (Node Exporter)

> **🔐 Security Note:** Grafana uses default credentials (`admin`/`admin`). **Change the password immediately** after first login for security reasons.

View logs from all services:

```bash
task docker:logs
```

View logs from individual services:

```bash
task docker:logs:web           # Web frontend logs
task docker:logs:docs          # Documentation logs
task docker:logs:uptime        # Uptime Kuma logs
task docker:logs:linkwarden    # Linkwarden logs
task docker:logs:linkwarden-db # Linkwarden database logs
task docker:logs:cadvisor      # cAdvisor logs
task docker:logs:grafana       # Grafana logs
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

Comprehensive documentation is available at the VitePress documentation site. Start the docs server locally:

```bash
task docs:dev
```

Or view the available tasks:

```bash
task --list
```

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
│   └── docs/                   # VitePress documentation with Caddy
│       ├── .vitepress/
│       │   ├── config.js       # VitePress configuration
│       │   └── theme/          # Custom theme (testthedocs style)
│       ├── guide/              # Documentation pages
│       ├── api/                # API documentation
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

## 🛠️ Available Tasks

### Development Tasks

- `task help` - Show all available tasks
- `task install` - Install all dependencies
- `task dev` - Run all apps in development mode
- `task start` - Run all apps in production mode
- `task build` - Build all apps
- `task clean` - Clean all node_modules

### Documentation Tasks

- `task docs:dev` - Start documentation development server
- `task docs:build` - Build documentation for production
- `task docs:preview` - Preview documentation build

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

### Service Management

- `task services:info` - Show service URLs and status
- `task docker:clean` - Clean up containers and volumes
- `task setup:macos` - Setup macOS auto-startup

## 🔍 Services Overview

### 🌐 Web Frontend (Port 8080)

Modern web interface with Tailwind CSS styling served by Caddy.

**Key Features:**

- **Server**: Caddy 2 with automatic HTTPS
- **Styling**: Tailwind CSS with VitePress color scheme
- **Performance**: Gzip compression, static asset caching
- **Security**: Security headers, XSS protection
- **Health Checks**: Built-in health monitoring

**Development**: <http://localhost:8080>
**Production**: <http://localhost:8080> (containerized)

### 📚 Documentation (Port 8081)

VitePress-powered documentation served by Caddy with optimized caching.

**Key Features:**

- **Framework**: VitePress with custom theme
- **Server**: Caddy 2 with SPA routing support
- **Theme**: Custom styling matching testthedocs/awesome-docs
- **Performance**: Optimized caching for HTML/CSS/JS
- **Features**: Interactive navigation, search functionality

**Development**: <http://localhost:5173>
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

### 🔖 Bookmark Manager (Port 3002)

Linkwarden collaborative bookmark and link management platform.

**Key Features:**

- **Service**: Linkwarden (Latest) + PostgreSQL 16
- **Management**: Collaborative bookmark organization
- **Collections**: Organize bookmarks in collections and folders
- **Sharing**: Team collaboration and sharing features
- **Archive**: Full-page archiving and search
- **Data**: PostgreSQL database with persistent storage
- **Security**: Built-in user authentication and access control

**Production**: <http://localhost:3002> (containerized only)

**Default Login**: Setup admin account on first visit

### 📈 Container Monitor (Port 8080)

cAdvisor (Container Advisor) provides resource usage and performance data for containers.

**Key Features:**

- **Service**: cAdvisor (Latest)
- **Monitoring**: Real-time container resource usage (CPU, memory, network, filesystem)
- **Metrics**: Prometheus-compatible metrics endpoint
- **Performance**: Low overhead container monitoring
- **Data**: Resource usage statistics and historical data
- **Integration**: Direct integration with Grafana dashboards

**Production**: <http://localhost:8082> (containerized only)

### 📊 Analytics Dashboard (Port 3000)

Grafana analytics dashboard with pre-configured Docker monitoring dashboard.

**Key Features:**

- **Service**: Grafana (Latest)
- **Dashboard**: Pre-loaded Docker monitoring dashboard (ID: 15798)
- **Data Source**: cAdvisor metrics via Prometheus protocol
- **Visualization**: CPU usage, memory consumption, container performance
- **Authentication**: Admin login (admin/admin)
- **Storage**: Persistent dashboard and configuration storage
- **Alerting**: Built-in alerting and notification capabilities

**Production**: <http://localhost:3000> (containerized only)

**Default Login**: admin / admin

> **⚠️ Important Security Note:** The default credentials are `admin`/`admin`. You **must change this password** immediately after your first login to secure your Grafana instance. Grafana will prompt you to change the password on first access.

### 🔍 Automatic Container Name Detection

The monitoring system automatically detects and displays container information in Grafana dashboards! The "Docker Monitoring" dashboard shows:

- **Container service mappings** - Automatic discovery of all running containers with proper service names
- **System resource usage** - CPU and memory metrics for overall system monitoring  
- **Real-time discovery** - New containers appear automatically without manual configuration

**Note**: Individual container metrics require Docker socket access, which has security limitations on macOS. The system provides system-level monitoring and complete container discovery.

## 🏗️ Docker Architecture

### Container Overview

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              Docker Network: doc-network                                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│ │ Web App  │ │   Docs   │ │  Uptime  │ │Linkwarden│ │ cAdvisor │ │ Grafana  │                │
│ │ + Caddy  │ │ + Caddy  │ │   Kuma   │ │(Bookmark)│ │(Monitor) │ │(Analytics│                │
│ │  :8080   │ │  :8081   │ │  :3001   │ │  :3002   │ │  :8082   │ │  :3000   │                │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘                │
│      │            │            │            │            │            │                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐      │     ┌──────────┐ ┌──────────┐                │
│ │Persistent│ │Persistent│ │Persistent│      │     │  Docker  │ │Persistent│                │
│ │ Storage  │ │ Storage  │ │ Storage  │      │     │   Host   │ │ Storage  │                │
│ └──────────┘ └──────────┘ └──────────┘      │     │  Metrics │ └──────────┘                │
│                                             │     └──────────┘                             │
│                                      ┌──────────┐                                         │
│                                      │PostgreSQL│                                         │
│                                      │ Database │                                         │
│                                      │  :5432   │                                         │
│                                      └──────────┘                                         │
│                                           │                                               │
│                                      ┌──────────┐                                         │
│                                      │Persistent│                                         │
│                                      │ Database │                                         │
│                                      │ Storage  │                                         │
│                                      └──────────┘                                         │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Persistent Data Volumes

- **`caddy_data_web`** & **`caddy_config_web`** - Web server configuration and data
- **`caddy_data_docs`** & **`caddy_config_docs`** - Documentation server data
- **`uptime_kuma_data`** - Monitoring dashboard data and configuration
- **`linkwarden_data`** - Linkwarden application data and archives
- **`linkwarden_db_data`** - PostgreSQL database with bookmarks and user data
- **`grafana_data`** - Grafana dashboards, configurations, and analytics data

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

1. Edit files in the `apps/docs/` directory
2. Start the docs dev server: `task docs:dev`
3. View changes at <http://localhost:5173>

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
- **Status Monitor**: <http://localhost:3001>
- **Bookmark Manager**: <http://localhost:3002>
- **Container Monitor**: <http://localhost:8082> (cAdvisor)
- **Analytics Dashboard**: <http://localhost:3000> (Grafana)
- **Metrics Database**: <http://localhost:9090> (Prometheus)
- **System Metrics**: <http://localhost:9100> (Node Exporter)

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
   - Bookmark Manager: <http://localhost:3002/api/v1/public/status>
   - Container Monitor: <http://localhost:8082/healthz>
   - Analytics Dashboard: <http://localhost:3000/api/health>
   - Metrics Database: <http://localhost:9090/-/healthy>
   - System Metrics: <http://localhost:9100/metrics>
3. Configure notifications (email, Slack, etc.)

## 🔧 Configuration

### Caddy Configuration

Both web and docs services use Caddy with optimized configurations:

- **Compression**: Gzip enabled for all text content
- **Security**: Modern security headers (XSS, CSP, etc.)
- **Caching**: Aggressive caching for static assets
- **Health Checks**: Built-in health endpoints

### Tailwind CSS

The web frontend uses a custom Tailwind configuration matching the VitePress theme colors:

- **Primary Brand Color**: `#5469d4`
- **Color Palette**: Extended brand colors (50-900)
- **Components**: Custom utilities and components

## 📊 Monitoring & Observability

### Built-in Health Checks

All services include health check endpoints:
- **Web**: `/health` - Returns "OK"
- **Docs**: `/health` - Returns "VitePress Documentation OK"
- **Uptime Kuma**: `/` - Dashboard availability
- **Linkwarden**: `/api/v1/public/status` - Service status and health
- **cAdvisor**: `/healthz` - Container monitoring health
- **Grafana**: `/api/health` - Dashboard service health
- **Prometheus**: `/-/healthy` - Metrics database health
- **Node Exporter**: `/metrics` - System metrics health

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
task docker:logs:linkwarden
task docker:logs:linkwarden-db

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
- [VitePress](https://vitepress.dev/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Caddy Web Server](https://caddyserver.com/)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [Linkwarden](https://github.com/linkwarden/linkwarden)
- [cAdvisor](https://github.com/google/cadvisor)
- [Grafana](https://grafana.com/)
- [Tailwind CSS](https://tailwindcss.com/)
