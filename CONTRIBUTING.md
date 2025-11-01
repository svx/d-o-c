# Contributing to D-O-C

Thank you for your interest in contributing to the Documentation Operations Center!

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/d-o-c.git
   cd d-o-c
   ```
3. Run the setup script:
   ```bash
   ./setup.sh
   ```

## Development Workflow

### Adding a New Application

To add a new application to the workspace:

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/new-app
   ```

2. Create a `package.json` following the workspace naming convention:
   ```json
   {
     "name": "@d-o-c/new-app",
     "version": "1.0.0",
     "description": "Description of your app",
     "main": "src/index.js",
     "scripts": {
       "dev": "node src/index.js",
       "start": "node src/index.js",
       "clean": "rm -rf node_modules"
     },
     "dependencies": {}
   }
   ```

3. Install dependencies from the root:
   ```bash
   pnpm install
   ```

4. Create a `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY pnpm-workspace.yaml ./
   COPY package.json ./
   COPY apps/new-app ./apps/new-app
   RUN npm install -g pnpm
   RUN pnpm install --frozen-lockfile
   WORKDIR /app/apps/new-app
   EXPOSE 3001
   CMD ["pnpm", "start"]
   ```

5. Add the service to `docker-compose.yml`:
   ```yaml
   new-app:
     build:
       context: .
       dockerfile: apps/new-app/Dockerfile
     container_name: doc-new-app
     ports:
       - "3001:3001"
     environment:
       - PORT=3001
       - NODE_ENV=production
     restart: unless-stopped
     networks:
       - doc-network
   ```

### Running Applications

#### Development Mode
Run all applications in development mode:
```bash
pnpm dev
```

Run a specific application:
```bash
cd apps/api
pnpm dev
```

#### Production Mode
Using Docker Compose:
```bash
docker compose up -d
```

View logs:
```bash
docker compose logs -f
```

Stop containers:
```bash
docker compose down
```

### Testing Your Changes

1. Test locally in development mode:
   ```bash
   pnpm dev
   ```

2. Test with Docker:
   ```bash
   docker compose up --build
   ```

3. Verify endpoints are working:
   ```bash
   curl http://localhost:3000/health
   curl http://localhost:8080/health
   ```

## Code Style

- Use consistent indentation (2 spaces for JavaScript/JSON)
- Follow existing code patterns in the repository
- Keep dependencies minimal
- Document complex logic with comments

## Commit Messages

Use clear, descriptive commit messages:

- ✅ Good: "Add health check endpoint to API service"
- ✅ Good: "Update Docker Compose to use version 2 syntax"
- ❌ Bad: "fix stuff"
- ❌ Bad: "updates"

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request with:
   - Clear description of changes
   - Any relevant issue numbers
   - Screenshots (if UI changes)

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the architecture
- Documentation improvements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
