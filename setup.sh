#!/bin/bash

# D-O-C Setup Script
# This script helps set up the Documentation Operations Center

set -e

echo "🚀 D-O-C Setup Script"
echo "====================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm found: $(pnpm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "✅ Dependencies installed successfully!"

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo ""
    echo "⚠️  Docker is not installed. Docker is required for containerized deployment."
    echo "   Please install Docker from https://www.docker.com/"
else
    echo "✅ Docker found: $(docker --version)"
fi

# Check for Docker Compose
if docker compose version &> /dev/null; then
    echo "✅ Docker Compose found: $(docker compose version)"
elif command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose found: $(docker-compose --version)"
else
    echo "⚠️  Docker Compose is not installed."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run in development mode:  pnpm dev"
echo "  2. Run with Docker:          docker compose up -d"
echo "  3. View the web app:         http://localhost:8080"
echo "  4. View the API:             http://localhost:3000/api/docs"
echo ""
