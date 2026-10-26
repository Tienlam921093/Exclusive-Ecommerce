const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const appSource = require('node:fs').readFileSync(path.join(__dirname, 'app.js'), 'utf8');
assert.match(appSource, /id="cart-items"/);
assert.match(appSource, /function renderCart\(\)/);
assert.match(appSource, /function renderOrders\(\)/);
assert.match(appSource, /page=orders/);
assert.match(appSource, /data-detail-image/);
assert.match(appSource, /Idempotency-Key/);
assert.match(appSource, /orderSubmissionInProgress/);
assert.equal((appSource.match(/if \(event\.target\.matches\('\.add-cart'\)\)/g) || []).length, 1, 'Add To Cart must be handled once per click.');

async function run() {
  process.env.SESSION_SECRET = 'auth-test-session-secret';
  const ordersFile = path.join(os.tmpdir(), `exclusive-orders-${crypto.randomUUID()}.json`);
  process.env.ORDERS_FILE = ordersFile;
  const auth = require('./server.js');
  const email = `auth-test-${Date.now()}-${crypto.randomUUID()}@example.com`;
  const password = 'correct horse battery staple';
  const registered = await auth.registerWithEmail({ name: 'Test Account', email, password });
  assert.equal(registered.email, email);
  await assert.rejects(auth.registerWithEmail({ name: 'Test Account', email, password }), { status: 409 });
  const loggedIn = await auth.loginWithEmail({ email, password });
  assert.equal(loggedIn.id, registered.id);
  await assert.rejects(auth.loginWithEmail({ email, password: 'wrong-password' }), { status: 401 });
  const request = { headers: { cookie: `exclusive_session=${auth.makeSession(registered)}` } };
  assert.equal(auth.readSession(request).sub, registered.id);
  await assert.rejects(auth.verifyGoogleIdToken('invalid'), { status: 503 });

  await new Promise((resolve) => auth.server.listen(0, '127.0.0.1', resolve));
  try {
    const address = auth.server.address();
    const endpoint = `http://127.0.0.1:${address.port}/api/orders`;
    const key = crypto.randomUUID();
    const payload = { items: [{ name: 'HAVIT HV-G92 Gamepad', price: '$120', quantity: 1, image: 'figma-gamepad.png' }] };
    const responses = await Promise.all(Array.from({ length: 30 }, () => fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify(payload),
    })));
    const results = await Promise.all(responses.map((response) => response.json()));
    assert.equal(responses.filter((response) => response.status === 201).length, 1);
    assert.equal(responses.filter((response) => response.status === 200).length, 29);
    assert.equal(new Set(results.map((result) => result.order.id)).size, 1);
    const orderStore = JSON.parse(await fs.readFile(ordersFile, 'utf8'));
    assert.equal(orderStore.orders.length, 1);
    assert.equal(Object.keys(orderStore.idempotency).length, 1);

    const conflict = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify({ items: [{ ...payload.items[0], quantity: 2 }] }),
    });
    assert.equal(conflict.status, 409);
    console.log('Auth smoke checks and 30-request idempotency test passed.');
  } finally {
    auth.server.closeAllConnections?.();
    await new Promise((resolve, reject) => auth.server.close((error) => error ? reject(error) : resolve()));
    await fs.rm(ordersFile, { force: true });
    await fs.rm(`${ordersFile}.lock`, { force: true });
  }

  const dataDir = path.join(__dirname, 'data');
  try {
    const fs = require('node:fs/promises');
    const usersFile = path.join(dataDir, 'users.json');
    const users = JSON.parse(await fs.readFile(usersFile, 'utf8'));
    const retained = users.filter((user) => !user.email?.startsWith('auth-test-'));
    if (retained.length !== users.length) await fs.writeFile(usersFile, JSON.stringify(retained, null, 2), { mode: 0o600 });
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
