# API Documentation

This section contains technical documentation for the d-o-c infrastructure components.

## Overview

The d-o-c project has been restructured to focus on documentation and monitoring. The previous API service has been removed in favor of a streamlined architecture consisting of:

- **Web Frontend**: Modern interface with Tailwind CSS
- **Documentation**: VitePress-powered documentation  
- **Monitoring**: Uptime Kuma for service monitoring

## Migration Notice

::: warning API Service Removed
The Express-based API service has been removed from this project. If you need API functionality, consider:
- Adding it back as a separate service
- Using external API services
- Implementing serverless functions
:::

## Current Architecture

The current d-o-c setup provides:

### Web Frontend
- **Location**: `apps/web`
- **Technology**: Tailwind CSS + Caddy
- **URL**: <http://localhost:8080>

### Documentation  
- **Location**: `apps/docs`
- **Technology**: VitePress + Caddy
- **URL**: <http://localhost:8081> (production)
- **URL**: <http://localhost:5173> (development)

### Monitoring
- **Service**: Uptime Kuma
- **URL**: <http://localhost:3001>
- **Features**: Service monitoring, alerts, status pages

## Docker Configuration

All services in d-o-c are containerized using Docker Compose:

```bash
# Build all images
task docker:build

# Start all services
task docker:up

# View service status
task services:info
```

## Service Health Checks

Each service includes health check endpoints:

- **Web Frontend**: `/health` - Returns "OK"
- **Documentation**: `/health` - Returns "VitePress Documentation OK"
- **Uptime Kuma**: Dashboard availability check

## Monitoring Setup

Once the services are running, configure monitoring:

1. Access Uptime Kuma at <http://localhost:3001>
2. Create monitors for each service
3. Configure notification channels (email, Slack, etc.)
4. Set up status pages for public visibility

## Development vs Production

### Development URLs
- Web: <http://localhost:8080>
- Docs: <http://localhost:5173>

### Production URLs  
- Web: <http://localhost:8080>
- Docs: <http://localhost:8081>
- Monitor: <http://localhost:3001>

## Adding New Services

To add new services to the d-o-c infrastructure:

1. Create a new directory under `apps/`
2. Add appropriate `Dockerfile` and `package.json`
3. Update `docker-compose.yml` to include the new service
4. Configure monitoring in Uptime Kuma

## Next Steps

- [Quick Start Guide](/guide/quick-start)
- [Web Frontend Documentation](/web/)
- [Installation Instructions](/guide/installation)