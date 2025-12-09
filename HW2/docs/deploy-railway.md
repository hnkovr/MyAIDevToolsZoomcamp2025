# Deploy on Railway

Option A — Docker:
- Create a new project → service from repo → select Docker build.
- Set `PORT=8080` variable. Deploy.

Option B — Nixpacks (no Docker):
- Set root build commands:
  - Install: `npm install`
  - Build: `npm --prefix client run build && mkdir -p server/public && cp -r client/dist/* server/public/`
  - Start: `cd server && node index.js`
- Set `PORT=8080`.

WebSockets are supported out of the box. App serves built client from `server/public`.
