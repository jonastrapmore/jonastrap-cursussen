// ===== Module 2 — Oplossingen =====

// ===== Oefening 1: getypte array + som =====
let testScores: number[] = [15, 12, 10, 12, 1];
let totaal = 0;
for (const score of testScores) {
  totaal += score;
}
console.log(totaal);
// testScores.push("zes"); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'

// ===== Oefening 2: string-array doorlopen (toUpperCase) =====
let namen: string[] = ["jonas", "sara", "jef"];
for (const naam of namen) {
  console.log(naam.toUpperCase());
}
// Was 'namen' een number[], dan gaf .toUpperCase() een fout: getallen hebben die methode niet.

// ===== Oefening 3: een lege array veilig maken =====
// let leeg = [];           // type: any[] -> onveilig, alles mag erin
let taken: string[] = []; // veilig: alleen strings
taken.push("boodschappen");
taken.push("afwassen");
console.log(taken);

// ===== Oefening 4: tuple (vaste vorm) =====
let product: [string, number] = ["oortjes", 15];
console.log(product);
// product = [15, "oortjes"]; // ❌ verkeerde volgorde: string en number omgewisseld
// product = ["oortjes"];     // ❌ te weinig items

// ===== Oefening 5: enum =====
enum Richting {
  Noord,
  Oost,
  Zuid,
  West,
}
const kompas: Richting = Richting.Noord;
if (kompas === Richting.Noord) {
  console.log("Naar het noorden");
}
// kompas === Richting.Noordd -> ❌ een typo wordt meteen gevangen

// ===== Oefening 6: enum met tekstwaarden =====
enum RichtingTekst {
  Noord = "NOORD",
  Oost = "OOST",
  Zuid = "ZUID",
  West = "WEST",
}
console.log(RichtingTekst.Noord); // "NOORD" -> nu tekst i.p.v. een nummer
