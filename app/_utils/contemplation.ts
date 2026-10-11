"use client";

import { useSyncExternalStore } from "react";

/**
 * Global "Contemplar Paisagem" store.
 * A single source of truth shared by every scene, so the landscape mode
 * persists while scrolling between sections (instead of only hiding the
 * texts of the scene where it was activated).
 */
let active = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setContemplating(next: boolean) {
  if (active === next) return;
  active = next;
  if (typeof document !== "undefined") {
    document.documentElement.toggleAttribute("data-contemplating", next);
  }
  emit();
}

export function toggleContemplating() {
  setContemplating(!active);
}

export function useContemplation() {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => false
  );
}
