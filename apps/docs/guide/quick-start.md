# Quick Start

Get d-o-c running in development and production mode quickly with this guide.

## Development Mode

Start services in development mode:

```bash
# Using Task (recommended)
task dev         # Starts web frontend
task docs:dev    # Starts documentation

# Or directly with pnpm
pnpm dev
```

This will start:

- **Web Frontend**: http://localhost:8080
- **Documentation**: http://localhost:5173 (with `task docs:dev`)

## Production Mode with Docker

Start all containerized services:

```bash
# Build and start all services
task docker:build
task docker:up
```

This will start:

- **Web Frontend**: http://localhost:8080 (Caddy + Tailwind CSS)
- **Documentation**: http://localhost:8081 (Caddy + VitePress)
- **Status Monitor**: http://localhost:3001 (Uptime Kuma)
- **Bookmark Manager**: http://localhost:3002 (Linkwarden + PostgreSQL)
- **Analytics Dashboard**: http://localhost:3000 (Grafana)
- **Container Monitor**: http://localhost:8082 (cAdvisor)
- **Metrics Database**: http://localhost:9090 (Prometheus)
- **System Metrics**: http://localhost:9100 (Node Exporter)

> **🔐 Security Note:** Grafana uses default credentials (`admin`/`admin`). Change the password after first login.

## Individual Services

You can also start services individually:

### Web Frontend

```bash
cd apps/web
pnpm dev
```

### Documentation

```bash
# Using Task
task docs:dev

# Or directly
cd apps/docs
pnpm dev
```

## Production Mode with Docker

For production-like environment using Docker:

```bash
# Start all services
task docker:up

# View logs
task docker:logs

# Stop all services
task docker:down
```

## Available Services

Once running, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| Web | <http://localhost:8080> | Web interface |
| Docs | <http://localhost:5173> | Documentation site (dev) |
| Docs | <http://localhost:8081> | Documentation site (production) |
| Monitor | <http://localhost:3001> | Uptime Kuma dashboard |
| Bookmarks | <http://localhost:3002> | Linkwarden bookmark manager |
| Analytics | <http://localhost:3000> | Grafana monitoring dashboard |
| Container Metrics | <http://localhost:8082> | cAdvisor container monitoring |
| Metrics DB | <http://localhost:9090> | Prometheus time-series database |
| System Metrics | <http://localhost:9100> | Node Exporter system metrics |

## Common Tasks

Here are some common development tasks:

```bash
# Install dependencies
task install

# Build all applications
task build

# Clean all node_modules
task clean

# Run Docker containers
task docker:up

# View Docker logs
task docker:logs

# Stop Docker containers
task docker:down
```

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, you can modify the ports in:

- `apps/web/src/index.js` for the web frontend
- `apps/docs/.vitepress/config.js` for the documentation
- `docker-compose.yml` for production services

### Permission Issues

On macOS/Linux, if you encounter permission issues with Docker:

```bash
sudo docker compose up
```

### Clean Installation

If you're having dependency issues, try a clean installation:

```bash
task clean
task install
```

## Next Steps

- Check out the [Web Frontend](/web/)
- Learn about [Installation](/guide/installation)
- Explore the monitoring dashboard at <http://localhost:3001>
- Set up monitoring with Grafana at <http://localhost:3000>
- Manage bookmarks with Linkwarden at <http://localhost:3002>
- View container metrics at <http://localhost:8082>