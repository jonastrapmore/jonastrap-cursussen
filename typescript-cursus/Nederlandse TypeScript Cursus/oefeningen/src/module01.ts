// ===== Module 1 — Oplossingen =====

// ===== Oefening 1: de drie basistypes met expliciete annotaties =====
let leeftijd: number = 30;
let naam: string = "Jonas";
let isTsLeuk: boolean = true;
console.log(leeftijd);
console.log(naam);
console.log(isTsLeuk);

// ===== Oefening 2: type inference bewijzen =====
let punten = 100; // TypeScript leidt zelf af: punten is een 'number'
// punten = "veel"; // ❌ Type 'string' is not assignable to type 'number'

// ===== Oefening 3: een typefout uitlokken en lezen =====
let temperatuur: number = 20;
// temperatuur = "warm"; // ❌ Type 'string' is not assignable to type 'number'
console.log(temperatuur);

// ===== Oefening 4: 'any' herkennen (onveilig) =====
let mysterie; // geen waarde, geen type -> type is 'any'
mysterie = 4;
mysterie = "tekst";
mysterie = false;
console.log(mysterie);
// Bij 'any' klaagt TypeScript nooit: alle typecontrole staat uit -> onveilig.

// ===== Oefening 5: 'any' oplossen (veilig) =====
let mysterieVeilig: number = 4; // wél een type -> TypeScript bewaakt het
// mysterieVeilig = "tekst"; // ❌ dit houdt TypeScript nu tegen
console.log(mysterieVeilig);
// Verschil met oefening 4: hier is het type bekend, dus verkeerde waarden worden gevangen.

// ===== Oefening 6: alles samen in een template literal =====
console.log(
  `${naam} is mijn naam, mijn leeftijd is ${leeftijd}, en vind ik TypeScript leuk? ${isTsLeuk}`,
);
