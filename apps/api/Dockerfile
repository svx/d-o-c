FROM node:18-alpine

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copy API application
COPY apps/api ./apps/api

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["pnpm", "start"]
