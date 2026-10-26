# Exclusive demo

## Run locally

This project now serves its pages and Google sign-in API from a small Node server. Use Node.js 18 or newer, then run:

```powershell
$env:GOOGLE_CLIENT_ID="your-oauth-client-id.apps.googleusercontent.com"
$env:SESSION_SECRET="a-long-random-value-you-keep-private"
npm start
```

Open the exact URL printed by `npm start`. If port 4173 is occupied by an older copy, the app automatically switches to `http://localhost:4174`. Do not open `index.html` as a local file; authentication requires the server.

## Configure Google Sign-In

1. In Google Cloud Console, configure the OAuth consent screen and create an OAuth client with application type **Web application**.
2. Add both `http://localhost:4173` and `http://localhost:4174` as authorized JavaScript origins. Add any other exact host and port printed by `npm start`. For deployment, add the exact HTTPS site origin too.
3. Set the client ID as `GOOGLE_CLIENT_ID` in the server environment. Keep `SESSION_SECRET` private and use HTTPS in production.

The Google Identity Services button returns an ID token to the browser. The server verifies its signature, issuer, audience, expiry, and verified email against Google's signing keys. Verified accounts are saved in `data/users.json` and the app sets an HTTP-only session cookie. Existing Google users are signed in; a first Google sign-in creates their app account.

This demo stores accounts in a local JSON file. For a deployed multi-user store, replace that file with a database and configure HTTPS and persistent secrets.

## Email and password accounts

Sign-up requires a name, valid email, and password of at least 8 characters. Passwords are stored as salted scrypt hashes; login creates the same HTTP-only session used by Google sign-in. Accounts are saved locally in `data/users.json`.

## Order submission

Checkout sends `POST /api/orders` with an `Idempotency-Key`. The browser reuses the key for retries of the same cart and disables the button while a request is in flight. The server serializes writes to `data/orders.json`; requests with the same user and key return the original order, while reusing a key with a different cart returns HTTP 409. The order and its idempotency record are written together so parallel requests create one order.

This JSON-file store is for the single-server demo. A multi-instance deployment should move orders and idempotency records into a shared database and enforce a unique constraint on `(user_id, idempotency_key)`.

If Google shows `Error 400: origin_mismatch`, copy the exact origin of the page behind the Google popup (scheme, host, and port) into the same OAuth client's **Authorized JavaScript origins**, save, wait a minute, and reload. For example, `http://localhost:4173` and `http://localhost:4174` are different origins; so are `localhost` and `127.0.0.1`. Confirm that `GOOGLE_CLIENT_ID` in the server is the client ID you edited.
