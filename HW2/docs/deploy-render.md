# Deploy on Render (Docker)

- Ensure Dockerfile exists at repo root (it builds client and runs server).
- Create a new Web Service in Render, use Git repo, choose Docker runtime.
- Set env var `PORT=8080`.
- Alternatively, use the blueprint `render.yaml` in this repo.

Start command is defined by Dockerfile (`node server/index.js`). After deploy, app serves on the service URL.
