// ===== Module 7 — Oplossingen =====

// ===== Oefening 1: readonly op een object =====
type Boek = {
  readonly isbn: string; // ligt vast
  titel: string; // mag wijzigen
};
let boek: Boek = { isbn: "978-90-000", titel: "TypeScript" };
boek.titel = "TypeScript 2e druk"; // ✅ mag
console.log(boek.titel);
// boek.isbn = "111"; // ❌ Cannot assign to 'isbn' because it is a read-only property

// ===== Oefening 2: readonly in een class =====
class Gebruiker {
  readonly id: number;
  naam: string;

  constructor(id: number, naam: string) {
    this.id = id; // readonly mag je nog wél in de constructor zetten
    this.naam = naam;
  }
}
const u = new Gebruiker(1, "Sara");
console.log(u.id); // 1
u.naam = "Sara V."; // ✅ naam mag wijzigen
// u.id = 2; // ❌ Cannot assign to 'id' because it is a read-only property

// ===== Oefening 3: private (inkapseling) =====
class Bankrekening {
  private saldo: number; // alleen de class zelf mag hieraan

  constructor() {
    this.saldo = 0;
  }

  storten(bedrag: number): void {
    this.saldo += bedrag; // ✅ binnen de class
  }

  toonSaldo(): void {
    console.log(`Saldo: € ${this.saldo}`);
  }
}
const rekening = new Bankrekening();
rekening.storten(100);
rekening.toonSaldo(); // "Saldo: € 100"
// rekening.saldo = 999; // ❌ Property 'saldo' is private and only accessible within class 'Bankrekening'

// ===== Oefening 4: protected =====
class Dier {
  protected naam: string;

  constructor(naam: string) {
    this.naam = naam;
  }
}
class Kat extends Dier {
  miauw(): void {
    console.log(`${this.naam} miauwt`); // ✅ subclass mag bij 'protected'
  }
}
const kat = new Kat("Minoe");
kat.miauw(); // "Minoe miauwt"
// console.log(kat.naam); // ❌ Property 'naam' is protected and only accessible within class 'Dier' and its subclasses

// ===== Oefening 5: parameter properties =====
class Punt {
  constructor(
    public x: number,
    public y: number,
  ) {}
  // geen aparte declaraties of this.x = x nodig
}
const punt = new Punt(3, 4);
console.log(punt.x, punt.y); // 3 4

// ===== Oefening 6: as const op een object =====
const config = { taal: "nl", versie: 1 } as const;
console.log(config.taal); // "nl"
// config.taal = "en"; // ❌ Cannot assign to 'taal' because it is a read-only property

// ===== Oefening 7: as const op een array (uitdaging) =====
const dagen = ["ma", "di", "wo"] as const;
console.log(dagen[0]); // "ma"
// dagen.push("do"); // ❌ Property 'push' does not exist on type 'readonly ["ma", "di", "wo"]'
// Door 'as const' is de array een READONLY, vaste lijst geworden: toevoegen/wijzigen mag niet meer.
