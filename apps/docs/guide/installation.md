# Installation

This guide will walk you through installing and setting up d-o-c on your local machine.

## Prerequisites Check

First, verify that you have all the required tools installed:

```bash
# Check Node.js version (should be v18+)
node --version

# Check pnpm version (should be v8+)
pnpm --version

# Check Docker version
docker --version
docker compose version

# Check Task (optional but recommended)
task --version
```

## Clone the Repository

```bash
git clone https://github.com/svx/d-o-c.git
cd d-o-c
```

## Install Dependencies

Install all workspace dependencies using pnpm:

```bash
# Using Task (recommended)
task install

# Or directly with pnpm
pnpm install
```

This will install dependencies for:
- Root workspace
- API service (`apps/api`)
- Web frontend (`apps/web`)
- Documentation (`docs`)

## Verify Installation

After installation, you can verify everything is working:

```bash
# List all available tasks
task --list

# Check workspace structure
pnpm list --depth=0
```

## Environment Setup

### macOS Users

If you want to set up automatic Docker startup on macOS, you can use the provided configuration:

1. First, update the path in `macos/com.doc.docker-compose.plist`
2. Run the setup task:

```bash
task setup:macos
```

### Docker Setup

Build the Docker images:

```bash
task docker:build
```

## Next Steps

Now that you have everything installed, proceed to the [Quick Start](/guide/quick-start) guide to get your development environment running.