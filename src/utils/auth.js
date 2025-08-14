// src/utils/auth.js
// ⚠️ Client-side only. For light gating, not real security.

const TOKEN_KEY = "intake_token";

// 👇 Change these to your own values
const HARDCODED_USER = "Krov";
// PASSWORD_HASH is SHA-256 hex of your chosen password (see quick command below)
const PASSWORD_HASH =
  "7d33c0b7b19417ecdf1ba31e480bfb3bb7a1ee060b3ff8f25174899d11ce3956";

/** Compute SHA-256 hex in the browser */
async function sha256Hex(str) {
  const b = new TextEncoder().encode(str);
  const h = await crypto.subtle.digest("SHA-256", b);
  return Array.from(new Uint8Array(h))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

/** Check creds (username plaintext, password hashed) */
export async function verifyCredentials(username, password) {
  if (username !== HARDCODED_USER) return false;
  return (await sha256Hex(password)) === PASSWORD_HASH;
}

/** Persist a simple token if verified */
export async function login(username, password) {
  const ok = await verifyCredentials(username, password);
  if (ok) localStorage.setItem(TOKEN_KEY, PASSWORD_HASH);
  return ok;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthed() {
  return localStorage.getItem(TOKEN_KEY) === PASSWORD_HASH;
}

/*
Quick way to get a SHA-256 for your password:
Open your browser console and paste:

(async () => {
  const s = "YOUR_PASSWORD_HERE";
  const b = new TextEncoder().encode(s);
  const h = await crypto.subtle.digest("SHA-256", b);
  console.log([...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join(""));
})()

Copy the printed hex, replace PASSWORD_HASH above.
*/
