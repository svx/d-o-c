FROM node:18-alpine

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy Web application
COPY apps/web ./apps/web

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/web

EXPOSE 8080

CMD ["pnpm", "start"]
