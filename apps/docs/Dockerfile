# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy docs application
COPY apps/docs ./apps/docs

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/docs

# Build VitePress documentation
RUN pnpm build

# Production stage
FROM caddy:2-alpine

# Copy Caddyfile
COPY apps/docs/Caddyfile /etc/caddy/Caddyfile

# Copy built VitePress files
COPY --from=builder /app/apps/docs/.vitepress/dist /usr/share/caddy

# Expose port 80
EXPOSE 80

# Caddy runs automatically with the default CMD