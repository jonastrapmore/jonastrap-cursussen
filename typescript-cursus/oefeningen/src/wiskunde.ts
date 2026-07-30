// ===== Module 9 — Oplossingen (hulpbestand: named exports) =====

// Oefening 1: named exports
export function tel(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

// Oefening 4: een type exporteren
export interface Punt {
  x: number;
  y: number;
}

// Geen 'export' -> blijft privé binnen dit bestand (alleen hier bruikbaar).
function intern(): string {
  return "geheim";
}
