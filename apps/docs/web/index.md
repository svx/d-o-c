# Web Frontend

The Web Frontend is a modern web interface with Tailwind CSS styling served by Caddy web server.

## Overview

The Web Frontend is located in `apps/web` and provides a beautiful, responsive user interface using the same color palette as the documentation.

## Getting Started

### Development

```bash
# Start the web frontend in development mode
cd apps/web
pnpm dev
```

The web interface will be available at: <http://localhost:8080>

### Production

```bash
# Build and start with Docker
task docker:build
task docker:up
```

The containerized web interface will be available at: <http://localhost:8080>

## Project Structure

```text
apps/web/
├── public/
│   ├── index.html       # Modern HTML interface
│   └── styles.css       # Compiled Tailwind CSS
├── src/
│   ├── index.js         # Express server (dev only)
│   └── input.css        # Tailwind CSS source
├── Caddyfile           # Caddy web server config
├── Dockerfile          # Multi-stage Docker build
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## Features

- **Modern Design**: Tailwind CSS with VitePress color palette
- **Responsive Layout**: Mobile-first responsive design
- **Fast Performance**: Served by Caddy with compression
- **Health Checks**: Built-in monitoring endpoints
- **Security Headers**: XSS protection and security headers

## Technology Stack

- **Styling**: Tailwind CSS v3
- **Web Server**: Caddy v2 (production)
- **Development**: Express.js server
- **Build System**: Multi-stage Docker builds
- **Containerization**: Docker with optimized layers

## Customization

### Styling

The web frontend uses a custom Tailwind configuration with VitePress colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          // ... extends to match VitePress theme
          500: '#5469d4',
          // ... 
        }
      }
    }
  }
}
```

### Content

Edit `apps/web/public/index.html` to customize the interface content.

### Configuration

The Caddyfile in `apps/web/Caddyfile` controls server behavior:

- Compression settings
- Security headers  
- Health check endpoints
- Static file serving

## Deployment

### Docker (Recommended)

```bash
# Build and deploy all services
task docker:build
task docker:up
```

### Development Mode

```bash
# Start development server
cd apps/web
pnpm dev
```

## Monitoring

The web frontend includes health check support:

- **Endpoint**: `/health`
- **Response**: "OK"
- **Use**: Monitor service availability

Configure monitoring in Uptime Kuma at <http://localhost:3001> to track web frontend uptime.

## Next Steps

- [Quick Start Guide](/guide/quick-start)
- [Installation Instructions](/guide/installation)
- [Monitoring Setup](api#monitoring-setup)