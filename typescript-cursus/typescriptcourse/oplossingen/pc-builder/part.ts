import HTML from "./part.html?raw";
import { CustomElement } from "../../router/customElement.ts";

// ===== Module 12/13 — het onderdeel-component =====
export class CustomPart extends CustomElement {
  // Module 13: 'is-added' erbij om de knopstaat (+/✓) te tonen.
  static observedAttributes = ["name", "price", "category", "is-added"];

  #name = this.componentBody.querySelector<HTMLHeadingElement>("#name")!;
  #price = this.componentBody.querySelector<HTMLParagraphElement>("#price")!;
  #category = this.componentBody.querySelector<HTMLSpanElement>("#category")!;
  #addBtn = this.componentBody.querySelector<HTMLButtonElement>("#add-button")!;

  constructor() {
    super(HTML);
    // Module 13: vuur een custom event af naar de pagina (die luistert op 'addToBuild').
    this.#addBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("addToBuild"));
    });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "name":
        this.#name.innerText = newValue;
        break;
      case "price":
        // newValue is altijd een string -> omzetten en mooi tonen
        this.#price.innerText = Number(newValue).toFixed(2) + " EUR";
        break;
      case "category":
        this.#category.innerText = newValue;
        break;
      case "is-added":
        // toon of dit onderdeel al in de configuratie zit
        if (newValue === "true") {
          this.#addBtn.setAttribute("class", "btn btn-success btn-sm");
          this.#addBtn.innerHTML = "&check;"; // ✓ via innerHTML, niet innerText
        } else {
          this.#addBtn.setAttribute("class", "btn btn-outline-primary btn-sm");
          this.#addBtn.innerHTML = "+";
        }
        break;
    }
  }
}
