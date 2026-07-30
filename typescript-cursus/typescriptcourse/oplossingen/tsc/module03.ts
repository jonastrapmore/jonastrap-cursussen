// ===== Module 3 — Oplossingen =====

// ===== Oefening 1: parameter- en return-type =====
function oppervlakte(breedte: number, hoogte: number): number {
  return breedte * hoogte;
}
console.log(oppervlakte(4, 5)); // 20
// oppervlakte("4", 5); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'

// ===== Oefening 2: inference (return-type weggelaten) =====
function verdubbel(getal: number) {
  return getal * 2;
}
// Muis over 'verdubbel' -> function verdubbel(getal: number): number
// TypeScript leidt zelf 'number' af, want getal * 2 is altijd een number.
console.log(verdubbel(8)); // 16

// ===== Oefening 3: void =====
function toon(tekst: string): void {
  console.log(tekst);
  // geen return -> het return-type is 'void' (muis erover bevestigt dit)
}
toon("Hallo vanuit een void-functie");

// ===== Oefening 4: optionele parameter =====
function begroet(naam: string, titel?: string) {
  if (titel) {
    return `Hallo, ${titel} ${naam}!`;
  }
  return `Hallo, ${naam}!`;
}
console.log(begroet("Sara")); // "Hallo, Sara!"
console.log(begroet("Sara", "dr.")); // "Hallo, dr. Sara!"
// titel is eigenlijk 'string | undefined', daarom de if-check voor we hem gebruiken.

// ===== Oefening 5: standaardwaarde =====
function prijsMetBtw(prijs: number, btw: number = 0.21): number {
  return prijs * (1 + btw);
}
console.log(prijsMetBtw(100)); // 121  -> btw valt terug op 0.21
console.log(prijsMetBtw(100, 0.06)); // 106  -> eigen btw meegegeven
// 'btw' krijgt zijn type (number) vanzelf uit de standaardwaarde 0.21.

// ===== Oefening 6: functie als type =====
let bewerking: (a: number, b: number) => number;

bewerking = (a, b) => a + b; // optellen; a en b hoeven geen type (afgeleid uit 'bewerking')
console.log(bewerking(10, 3)); // 13

bewerking = (a, b) => a - b; // aftrekken; past op hetzelfde type
console.log(bewerking(10, 3)); // 7
// bewerking = (a, b) => `${a}`; // ❌ Type 'string' is not assignable to type 'number'

// ===== Oefening 7: rest-parameter (uitdaging) =====
function gemiddelde(...getallen: number[]): number {
  let totaal = 0;
  for (const g of getallen) {
    totaal += g;
  }
  return totaal / getallen.length;
}
console.log(gemiddelde(10, 20, 30)); // 20
// ...getallen verzamelt alle losse argumenten in één number[].
