// ===== Module 0 — Oplossingen =====

// ===== Oefening 2: een eerste TypeScript-bestand compileren =====
// Twee variabelen met een expliciete type-annotatie.
let cursusNaam: string = "TypeScript Bootcamp";
let prijs: number = 19.99;
console.log(cursusNaam, prijs);

// ===== Oefening 3: een typefout uitlokken =====
// De regel hieronder staat bewust uitgecommentarieerd, want hij compileert niet:
//   prijs = "gratis";
// Foutmelding: Type 'string' is not assignable to type 'number'.
// Door 'noEmitOnError' weigert de compiler zelfs een .js te maken zolang dit erin staat.

// ===== Oefening 5: waarom is er een tussenstap (compileren) nodig? =====
// Een browser begrijpt alleen JavaScript, geen TypeScript. Daarom moet een .ts-bestand
// eerst gecompileerd worden naar .js — dat doet de TypeScript-compiler (tsc). Onderweg
// controleert tsc meteen alle types, zodat typefouten al vóór runtime aan het licht komen.
