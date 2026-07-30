import HTML from "./buildItem.html?raw";
import { CustomElement } from "../../router/customElement.ts";
import { BuildLocalProvider } from "../../data/data.ts";

// ===== Module 13 — het configuratie-regel-component =====
export class CustomBuildItem extends CustomElement {
  static observedAttributes = ["title"];
  #label = this.componentBody.querySelector<HTMLSpanElement>("#build-item")!;
  #deleteBtn =
    this.componentBody.querySelector<HTMLButtonElement>("#delete-btn")!;

  constructor() {
    super(HTML);
    // Stap 7: verwijderen rechtstreeks via de provider (geen custom event).
    // this.id = het build-item id dat build.ts meegaf via setAttribute('id', ...).
    this.#deleteBtn.addEventListener("click", () => {
      void BuildLocalProvider.delete(this.id);
    });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "title":
        this.#label.innerText = newValue;
        break;
    }
  }
}
