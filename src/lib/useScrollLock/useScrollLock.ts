import { useEffect, useCallback } from "react";

export function useScrollLock(lock: boolean) {
  const preventScroll = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const preventKeys = useCallback((e: KeyboardEvent) => {
    if (
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (lock) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeys, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [lock, preventScroll, preventKeys]);
}




export const useScrollLockss = (isLocked: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (isLocked) {
      body.style.overflow = "hidden"; // disable scroll
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isLocked]);
};
