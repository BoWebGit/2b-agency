"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { CalculatorModal } from "./CalculatorModal";

interface CalculatorContextValue {
  openCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

/**
 * Mounts the project-cost calculator modal once at the app root and
 * exposes `openCalculator()` to any component (header CTA, hero CTA,
 * service popup CTA) so they all trigger the same shared modal instead
 * of each owning their own open/close state.
 */
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <CalculatorContext.Provider value={{ openCalculator: () => setOpen(true) }}>
      {children}
      <CalculatorModal open={open} onClose={() => setOpen(false)} />
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx)
    throw new Error("useCalculator must be used within a CalculatorProvider");
  return ctx;
}
