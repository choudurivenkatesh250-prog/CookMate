import { useCallback, useEffect, useState } from "react";

import { loadSaved, toggleSaved } from "@/lib/savedStore";

const EVENT = "cookmate:bookmarks";

export function useBookmarks() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    let active = true;
    const sync = () => {
      loadSaved().then((next) => {
        if (active) setIds(next);
      });
    };

    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      active = false;
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback(async (id) => {
    const next = await toggleSaved(id);
    setIds(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { ids, toggle, isSaved: (id) => ids.includes(id) };
}
