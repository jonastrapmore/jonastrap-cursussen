// ===== Module 4 — Oplossingen =====

// ===== Oefening 1: object typen =====
let boek: { titel: string; paginas: number } = {
  titel: "Harry Potter",
  paginas: 512,
};
console.log(boek.titel); // "Harry Potter"
// boek.paginas = "veel"; // ❌ Type 'string' is not assignable to type 'number'

// ===== Oefening 2: type alias =====
// We geven de object-vorm een herbruikbare naam met 'type'.
// (De optionele email? hoort bij oefening 3, we voegen 'm hier meteen toe.)
type Persoon = {
  naam: string;
  leeftijd: number;
  email?: string; // oefening 3: optionele property
};

let ben: Persoon = { naam: "Ben", leeftijd: 45 };
let gina: Persoon = { naam: "Gina", leeftijd: 40 };
console.log(ben.naam); // "Ben"
console.log(gina.naam); // "Gina"

// ===== Oefening 3: optionele property =====
let metEmail: Persoon = { naam: "Sara", leeftijd: 28, email: "sara@x.be" };
let zonderEmail: Persoon = { naam: "Tom", leeftijd: 33 }; // email mag weg
// email is 'string | undefined', dus we loggen 'm alleen als hij bestaat:
if (metEmail.email) {
  console.log(metEmail.email.toUpperCase()); // "SARA@X.BE"
}
if (zonderEmail.email) {
  console.log(zonderEmail.email); // wordt niet uitgevoerd: geen email
}

// ===== Oefening 4: interface =====
// Zelfde vorm als 'Persoon', maar nu als interface. In hetzelfde bestand mag
// de naam 'Persoon' niet twee keer bestaan, daarom 'PersoonI'. In een echt
// project (aparte bestanden) zou je gewoon 'Persoon' gebruiken.
interface PersoonI {
  naam: string;
  leeftijd: number;
  email?: string;
}
let jonas: PersoonI = { naam: "Jonas", leeftijd: 39 };
console.log(jonas.naam); // gebruik voelt identiek aan de type alias

// ===== Oefening 5: array van objecten =====
let mensen: Persoon[] = [
  { naam: "Ben", leeftijd: 45 },
  { naam: "Gina", leeftijd: 40 },
  { naam: "Sara", leeftijd: 28 },
];
for (const m of mensen) {
  console.log(`${m.naam} is ${m.leeftijd} jaar.`); // TS kent de vorm van elk item
}

// ===== Oefening 6: object als functie-parameter =====
interface Product {
  naam: string;
  prijs: number;
}
function toonProduct(product: Product): void {
  console.log(`${product.naam} kost € ${product.prijs}`);
}
toonProduct({ naam: "Oortjes", prijs: 15 }); // ✅ "Oortjes kost € 15"
// toonProduct({ naam: "Oortjes" }); // ❌ Property 'prijs' is missing in type '{ naam: string; }'

// ===== Oefening 7: uitbreiden (uitdaging) =====
// Werknemer erft naam + leeftijd (+ optionele email) van Persoon en voegt bedrijf toe.
interface Werknemer extends Persoon {
  bedrijf: string;
}
let werknemer: Werknemer = { naam: "Jonas", leeftijd: 39, bedrijf: "Thomas More" };
console.log(`${werknemer.naam} werkt bij ${werknemer.bedrijf}`); // "Jonas werkt bij Thomas More"
