// CookMate local SQLite server (plain Node.js, no Express).
// Run on your own computer with Node 22+:
//
//   node sqlite/server.js
//
// It creates cookmate.db in the project folder and serves the saved recipes
// on http://localhost:5174. The web app talks to it automatically when it is
// running, and falls back to browser storage when it is not.

import http from "node:http";
import { DatabaseSync } from "node:sqlite";

const PORT = 5174;

const db = new DatabaseSync("cookmate.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS saved_recipes (
    recipe_id TEXT PRIMARY KEY,
    saved_at  TEXT NOT NULL
  );
`);

const listSaved = () => db.prepare("SELECT recipe_id FROM saved_recipes ORDER BY saved_at").all();
const insertSaved = db.prepare(
  "INSERT OR IGNORE INTO saved_recipes (recipe_id, saved_at) VALUES (?, ?)",
);
const deleteSaved = db.prepare("DELETE FROM saved_recipes WHERE recipe_id = ?");

function send(res, status, data) {
  res.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "GET,POST,DELETE,OPTIONS",
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "OPTIONS") return send(res, 204, {});

  if (url.pathname === "/saved" && req.method === "GET") {
    return send(res, 200, { ids: listSaved().map((row) => row.recipe_id) });
  }

  if (url.pathname === "/saved" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const { id } = JSON.parse(body || "{}");
    if (!id) return send(res, 400, { error: "id is required" });
    insertSaved.run(id, new Date().toISOString());
    return send(res, 200, { ids: listSaved().map((row) => row.recipe_id) });
  }

  if (url.pathname.startsWith("/saved/") && req.method === "DELETE") {
    deleteSaved.run(decodeURIComponent(url.pathname.slice("/saved/".length)));
    return send(res, 200, { ids: listSaved().map((row) => row.recipe_id) });
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`CookMate SQLite server running on http://localhost:${PORT}`);
});
