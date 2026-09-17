import { useCallback, useEffect, useSyncExternalStore } from "react";

import { loadSaved, toggleSaved } from "@/lib/savedStore";

// Saved recipes live in one tiny shared store instead of one copy per card.
// Every RecipeCard used to fetch the list again on mount; now the whole app
// reads a single snapshot and re-renders only when it really changes.
const EMPTY = [];
const INITIAL = { ids: EMPTY, loading: true };

let ids = EMPTY;
let ready = false;
let inflight = null;
let snapshot = INITIAL;

const listeners = new Set();

function publish(nextIds, nextLoading) {
  ids = nextIds;
  snapshot = { ids, loading: nextLoading };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

// The server has no localStorage, so it always renders the empty state.
function getServerSnapshot() {
  return INITIAL;
}

function ensureLoaded() {
  if (ready) return Promise.resolve(ids);
  if (inflight) return inflight;
  publish(EMPTY, true);
  inflight = loadSaved().then((next) => {
    ready = true;
    inflight = null;
    publish(next, false);
    return next;
  });
  return inflight;
}

function setSaved(next) {
  ready = true;
  publish(next, false);
}

// Another tab changed the list: pick it up quietly, without a loading flash.
if (typeof window !== "undefined") {
  window.addEventListener("storage", () => {
    if (ready) ensureLoaded();
  });
}

export function useBookmarks() {
  const { ids: savedIds, loading: isLoading } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!ready) ensureLoaded();
  }, []);

  const toggle = useCallback(async (id) => {
    setSaved(await toggleSaved(id));
  }, []);

  return {
    ids: savedIds,
    loading: isLoading,
    toggle,
    isSaved: (id) => savedIds.includes(id),
  };
}
