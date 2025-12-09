# Build-and-run in single image
FROM node:20-alpine AS base
WORKDIR /app

# Root deps for scripts
COPY package.json ./
RUN npm pkg get name >/dev/null 2>&1 || true

# Client
COPY client/package.json client/package.json
RUN npm --prefix client install --no-audit --no-fund || true
COPY client/ client/
RUN npm --prefix client run build || true

# Server
COPY server/package.json server/package.json
RUN npm --prefix server install --no-audit --no-fund || true
COPY server/ server/

# Serve client from server/public
RUN mkdir -p server/public && cp -r client/dist/* server/public/ || true

EXPOSE 8080
WORKDIR /app/server
CMD ["node", "index.js"]
