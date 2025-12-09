const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

// Serve built client if present
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  socket.on('join', (sessionId) => {
    if (!sessionId) return;
    socket.join(`session:${sessionId}`);
    socket.emit('joined', { sessionId });
  });

  socket.on('code:update', (payload) => {
    try {
      const { sessionId, code, lang, cursor } = payload || {};
      if (!sessionId) return;
      socket.to(`session:${sessionId}`).emit('code:update', { code, lang, cursor });
    } catch (_) {}
  });
});

const PORT = process.env.PORT || 8080;
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[server] listening on :${PORT}`);
  });
}

module.exports = { app, server };
