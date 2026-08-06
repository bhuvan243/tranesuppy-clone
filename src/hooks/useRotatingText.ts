"use client";

import { useEffect, useState } from "react";

interface UseRotatingTextOptions {
  items: string[];
  intervalMs: number;
  /** How long the exit animation runs before swapping to the next item. */
  transitionMs?: number;
}

/**
 * Cycles through `items`, exposing the current item plus a `transitioning`
 * flag the caller can use to trigger an up-swap CSS animation.
 */
export function useRotatingText({ items, intervalMs, transitionMs = 220 }: UseRotatingTextOptions) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (items.length <= 1) return;

    const cycle = setInterval(() => {
      setTransitioning(true);
      const swap = setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setTransitioning(false);
      }, transitionMs);
      return () => clearTimeout(swap);
    }, intervalMs);

    return () => clearInterval(cycle);
  }, [items, intervalMs, transitionMs]);

  return { current: items[index], transitioning };
}
