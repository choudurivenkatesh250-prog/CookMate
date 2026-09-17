// Saved recipes storage.
//
// When the local SQLite server (sqlite/server.js) is running, everything is
// stored in cookmate.db. Otherwise the browser keeps the list, so the app
// still works online where there is no local database file.

const API = "http://localhost:5174";
const KEY = "cookmate.bookmarks";

function readLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

// Remember whether the local SQLite server answered, so we only try once.
let sqliteAvailable = true;

async function call(path, options) {
  if (!sqliteAvailable) throw new Error("SQLite server unavailable");
  try {
    const res = await fetch(`${API}${path}`, { ...options, signal: AbortSignal.timeout(1500) });
    if (!res.ok) throw new Error("SQLite server error");
    const data = await res.json();
    return data.ids ?? [];
  } catch (error) {
    sqliteAvailable = false;
    throw error;
  }
}

export async function loadSaved() {
  try {
    return await call("/saved");
  } catch {
    return readLocal();
  }
}

export async function toggleSaved(id) {
  const current = await loadSaved();
  const remove = current.includes(id);

  try {
    return remove
      ? await call(`/saved/${encodeURIComponent(id)}`, { method: "DELETE" })
      : await call("/saved", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
  } catch {
    const next = remove ? current.filter((x) => x !== id) : [...current, id];
    writeLocal(next);
    return next;
  }
}
