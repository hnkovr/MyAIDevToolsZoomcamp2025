# Deploy on Fly.io (Docker)

Prereqs: `flyctl` installed, account created.

1. Set unique app name in `fly.toml` (`app = "your-app-name"`).
2. Run `flyctl launch --no-deploy` (uses existing Dockerfile and fly.toml).
3. Deploy: `flyctl deploy`.
4. Open: `flyctl open`.

Service listens on internal port 8080 (configured in `fly.toml`).
