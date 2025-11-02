# Multi-stage build for Antora documentation
FROM node:20-alpine AS builder

# Install git
RUN apk add --no-cache git

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy both docs and antora-ui for building
COPY apps/docs ./apps/docs
COPY apps/antora-ui ./apps/antora-ui

# Initialize git repository (required by Antora)
RUN git init && \
    git config user.name "Docker Build" && \
    git config user.email "build@docker.local" && \
    git add . && \
    git commit -m "Initial commit for Antora build"

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Build the UI bundle first
WORKDIR /app/apps/antora-ui
RUN pnpm build

# Build Antora documentation
WORKDIR /app/apps/docs
RUN pnpm build

# Production stage with Caddy
FROM caddy:2-alpine

# Copy Caddyfile
COPY apps/docs/Caddyfile /etc/caddy/Caddyfile

# Copy built Antora site
COPY --from=builder /app/apps/docs/build/site /usr/share/caddy

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

EXPOSE 80
