const { io } = require('socket.io-client');
const request = require('supertest');

describe('server', () => {
  let httpServer, app, address;

  beforeAll(async () => {
    const mod = require('..');
    httpServer = mod.server;
    app = mod.app;
    await new Promise((resolve) => {
      if (httpServer.listening) return resolve();
      httpServer.listen(0, resolve);
    });
    const { port } = httpServer.address();
    address = `http://localhost:${port}`;
  });

  afterAll(async () => {
    if (!httpServer) return;
    await new Promise((resolve) => httpServer.close(resolve));
  });

  it('health endpoint responds', async () => {
    await request(app).get('/health').expect(200).then((r) => {
      expect(r.body.ok).toBe(true);
    });
  });

  it('broadcasts code:update within a session', async () => {
    const sessionId = 'test-session-1';
    const c1 = io(address, { transports: ['websocket'] });
    const c2 = io(address, { transports: ['websocket'] });

    await new Promise((r) => c1.on('connect', r));
    await new Promise((r) => c2.on('connect', r));
    c1.emit('join', sessionId);
    c2.emit('join', sessionId);

    // small join delay
    await new Promise((r) => setTimeout(r, 100));

    const expected = 'print(1)';
    const got = new Promise((resolve, reject) => {
      const to = setTimeout(() => reject(new Error('timeout')), 2000);
      c2.on('code:update', (payload) => {
        try {
          if (payload.code === expected) {
            clearTimeout(to);
            resolve(payload);
          }
        } catch (e) { /* ignore */ }
      });
    });

    c1.emit('code:update', { sessionId, code: expected, lang: 'python' });
    const payload = await got;
    expect(payload.lang).toBe('python');

    c1.close();
    c2.close();
  });
});

