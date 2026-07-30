// ===== Module 8 — Oplossingen =====

// ===== Oefening 1: je eerste generic =====
function eerste<T>(lijst: T[]): T {
  return lijst[0];
}
const eersteGetal = eerste([1, 2, 3]); // T = number (inference, geen <...> nodig)
const eersteWoord = eerste(["Jonas", "Sara"]); // T = string
console.log(eersteGetal); // 1
console.log(eersteWoord); // "Jonas"
// eersteWoord blijft een string, eersteGetal een number -> bescherming behouden

// ===== Oefening 2: generic met bewerking =====
function omdraai<T>(lijst: T[]): T[] {
  return [...lijst].reverse(); // kopie, zodat het origineel niet wijzigt
}
console.log(omdraai([1, 2, 3])); // [3, 2, 1]
console.log(omdraai(["a", "b", "c"])); // ["c", "b", "a"]

// ===== Oefening 3: meerdere type-parameters =====
function paar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = paar("leeftijd", 39); // type: [string, number]
console.log(p); // ["leeftijd", 39]

// ===== Oefening 4: constraint =====
function toonId<T extends { id: number }>(item: T): void {
  console.log(item.id); // mag: elke T heeft gegarandeerd een id
}
toonId({ id: 1, naam: "Jonas" }); // 1
// toonId({ naam: "Sara" }); // ❌ Property 'id' is missing (voldoet niet aan de constraint)

// ===== Oefening 5: generieke interface =====
interface Box<T> {
  inhoud: T;
}
const doosMetTekst: Box<string> = { inhoud: "hoi" };
const doosMetGetal: Box<number> = { inhoud: 42 };
console.log(doosMetTekst.inhoud.toUpperCase()); // "HOI" -> TS weet: string
console.log(doosMetGetal.inhoud); // 42

// ===== Oefening 6: Partial gebruiken =====
interface Gebruiker {
  id: number;
  naam: string;
  email: string;
}
function update(gebruiker: Gebruiker, wijzigingen: Partial<Gebruiker>): Gebruiker {
  return { ...gebruiker, ...wijzigingen }; // basis, daarna de wijzigingen eroverheen
}
const jonas: Gebruiker = { id: 1, naam: "Jonas", email: "jonas@x.be" };
const jonasNieuw = update(jonas, { naam: "Jonas T." }); // alleen naam wijzigen mag dankzij Partial
console.log(jonasNieuw); // { id: 1, naam: "Jonas T.", email: "jonas@x.be" }

// ===== Oefening 7: Omit en Record (uitdaging) =====
type PubliekeGebruiker = Omit<Gebruiker, "email">; // { id: number; naam: string }
const publiek: PubliekeGebruiker = { id: 1, naam: "Jonas" }; // geen email
console.log(publiek);

type Voorraad = Record<string, number>; // object met string-sleutels en number-waarden
const kraam: Voorraad = { appels: 3, peren: 5, bananen: 12 };
console.log(`Appels: ${kraam.appels}`); // "Appels: 3"
