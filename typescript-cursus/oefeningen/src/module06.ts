// ===== Module 6 — Oplossingen =====

// ===== Oefening 1: basis-class =====
class Hond {
  naam: string;

  constructor(naam: string) {
    this.naam = naam; // vul de property met de meegegeven waarde
  }

  blaf(): void {
    console.log(`${this.naam} zegt: Woef!`);
  }
}
const rex = new Hond("Rex");
rex.blaf(); // "Rex zegt: Woef!"

// ===== Oefening 2: property + methode met return-type =====
class Rechthoek {
  breedte: number;
  hoogte: number;

  constructor(breedte: number, hoogte: number) {
    this.breedte = breedte;
    this.hoogte = hoogte;
  }

  oppervlakte(): number {
    return this.breedte * this.hoogte;
  }
}
const r = new Rechthoek(3, 4);
console.log(r.oppervlakte()); // 12

// ===== Oefening 3: this en toestand =====
class Teller {
  stand: number;

  constructor() {
    this.stand = 0; // start op 0
  }

  verhoog(): void {
    this.stand += 1;
  }

  toon(): void {
    console.log(`Stand: ${this.stand}`);
  }
}
const teller = new Teller();
teller.verhoog();
teller.verhoog();
teller.verhoog();
teller.toon(); // "Stand: 3"

// ===== Oefening 4: constructor met meerdere parameters =====
class Persoon {
  naam: string;
  leeftijd: number;

  constructor(naam: string, leeftijd: number) {
    this.naam = naam;
    this.leeftijd = leeftijd;
  }

  begroet(): string {
    return `Hallo, ik ben ${this.naam}.`;
  }
}
const jonas = new Persoon("Jonas", 39);
console.log(jonas.begroet()); // "Hallo, ik ben Jonas."

// ===== Oefening 5: overerving =====
class Student extends Persoon {
  richting: string;

  constructor(naam: string, leeftijd: number, richting: string) {
    super(naam, leeftijd); // eerst de constructor van Persoon (verplicht vóór 'this')
    this.richting = richting;
  }

  // overschrijf begroet() en vul de ouder-versie aan met super.begroet()
  begroet(): string {
    return `${super.begroet()} Ik studeer ${this.richting}.`;
  }
}
const sara = new Student("Sara", 20, "TypeScript");
console.log(sara.begroet()); // "Hallo, ik ben Sara. Ik studeer TypeScript."

// ===== Oefening 6: implements =====
interface Begroetbaar {
  begroet(): string;
}
class Robot implements Begroetbaar {
  begroet(): string {
    return "BEEP. Hallo mens.";
  }
}
const robot = new Robot();
console.log(robot.begroet()); // "BEEP. Hallo mens."

// ===== Oefening 7: uitdaging — een bankrekening =====
class Bankrekening {
  saldo: number;

  constructor() {
    this.saldo = 0;
  }

  storten(bedrag: number): void {
    this.saldo += bedrag;
    console.log(`Gestort: € ${bedrag}. Nieuw saldo: € ${this.saldo}`);
  }

  opnemen(bedrag: number): void {
    if (bedrag > this.saldo) {
      console.log(`Onvoldoende saldo voor € ${bedrag} (saldo: € ${this.saldo})`);
      return;
    }
    this.saldo -= bedrag;
    console.log(`Opgenomen: € ${bedrag}. Nieuw saldo: € ${this.saldo}`);
  }

  toonSaldo(): void {
    console.log(`Saldo: € ${this.saldo}`);
  }
}
const rekening = new Bankrekening();
rekening.storten(100);
rekening.opnemen(30);
rekening.opnemen(200); // te veel -> waarschuwing
rekening.toonSaldo(); // "Saldo: € 70"
