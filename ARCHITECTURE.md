# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Documentation Operations Center           │
│                         (D-O-C Repository)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ pnpm workspace
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────┐                          ┌───────────────┐
│   API Service │                          │  Web Frontend │
│   (apps/api)  │                          │  (apps/web)   │
│               │                          │               │
│  - Express    │                          │  - Express    │
│  - Port 3000  │                          │  - Port 8080  │
│  - REST API   │                          │  - Static Web │
└───────────────┘                          └───────────────┘
        │                                           │
        └─────────────────┬───────────────────────┘
                          │
                          ▼
              ┌────────────────────┐
              │  Docker Compose    │
              │                    │
              │  - doc-api         │
              │  - doc-web         │
              │  - doc-network     │
              └────────────────────┘
```

## Directory Structure

```
d-o-c/
├── apps/                          # Application workspace
│   ├── api/                       # API Service
│   │   ├── src/
│   │   │   └── index.js          # API entry point
│   │   ├── Dockerfile            # API container definition
│   │   └── package.json          # API dependencies
│   └── web/                       # Web Frontend
│       ├── src/
│       │   └── index.js          # Web server entry point
│       ├── public/
│       │   └── index.html        # Web UI
│       ├── Dockerfile            # Web container definition
│       └── package.json          # Web dependencies
├── macos/
│   └── com.doc.docker-compose.plist  # macOS LaunchAgent for auto-startup
├── docker-compose.yml            # Multi-container orchestration
├── pnpm-workspace.yaml          # pnpm workspace configuration
├── package.json                  # Root workspace configuration
├── Makefile                      # Convenience commands
├── setup.sh                      # Setup script
├── .dockerignore                # Docker build exclusions
├── .env.example                 # Environment template
├── CONTRIBUTING.md              # Contribution guidelines
└── README.md                    # Documentation
```

## Technology Stack

### Runtime & Package Management
- **Node.js** v18+: JavaScript runtime
- **pnpm**: Fast, disk space efficient package manager
- **pnpm workspaces**: Monorepo management

### Applications
- **Express.js**: Web framework for both services
- **API Service**: RESTful API with health checks and documentation
- **Web Service**: Static file server with HTML frontend

### Infrastructure
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **macOS LaunchAgent**: Auto-startup on macOS

## Network Flow

```
User Request
     ↓
http://localhost:8080 ──────→ Web Frontend (Container)
                               │
                               │ Internal Network
                               │ (doc-network)
                               ↓
http://localhost:3000 ──────→ API Service (Container)
                               │
                               ↓
                          JSON Response
```

## Deployment Options

### 1. Development Mode
- Run directly with Node.js
- Hot reload capabilities
- Local development
```bash
pnpm dev
```

### 2. Docker Compose (Recommended)
- Containerized deployment
- Production-ready
- Easy scaling
```bash
docker compose up -d
```

### 3. macOS Auto-Startup
- Launches on macOS boot
- Uses LaunchAgent
- Persistent service
```bash
make setup-macos
```

## Health Monitoring

Both services expose health check endpoints:

- **API Health**: `http://localhost:3000/health`
  ```json
  {
    "status": "healthy",
    "service": "api",
    "timestamp": "2025-11-01T14:00:00.000Z"
  }
  ```

- **Web Health**: `http://localhost:8080/health`
  ```json
  {
    "status": "healthy",
    "service": "web",
    "timestamp": "2025-11-01T14:00:00.000Z"
  }
  ```

## Scaling Considerations

To add more services:
1. Create new app directory under `apps/`
2. Add Dockerfile
3. Update `docker-compose.yml`
4. Add to pnpm workspace (automatically detected)

## Security

- No secrets in code
- Environment variables for configuration
- Health checks for monitoring
- Isolated network for containers
- Minimal container images (Alpine-based)
