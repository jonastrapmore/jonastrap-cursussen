import { BuildLocalProvider } from "../../data/data.ts";
import type { BuildItem } from "../../models/buildItem.ts";
import { Page } from "../../router/page.ts";
import HTML from "./build.html?raw";

// ===== Module 13 — de configuratiepagina =====
export class BuildPage extends Page {
  #build: BuildItem[] = [];
  #container = this.body.querySelector<HTMLUListElement>("#build-list")!;
  #total = this.body.querySelector<HTMLSpanElement>("#build-total")!;

  constructor() {
    super(HTML);
    this.unsubscribe.push(
      BuildLocalProvider.addObserver((data) => {
        this.#build = data;
        this.render();
      }),
    );
    void BuildLocalProvider.getAll();
  }

  render(): void {
    super.render();
    this.#container.innerHTML = "";

    this.#build.map((entry) => {
      const el = document.createElement("custom-build-item");
      el.setAttribute("id", entry.id); // het BUILD-item id (nodig om te verwijderen)
      // naam + prijs op één regel via een template literal
      el.setAttribute(
        "title",
        `${entry.part.name} (${entry.part.price.toFixed(2)} EUR)`,
      );
      this.#container.appendChild(el);
    });

    // totaalprijs over de hele configuratie (reduce; startwaarde 0)
    const total = this.#build.reduce((sum, entry) => sum + entry.part.price, 0);
    this.#total.innerText = total.toFixed(2);
  }
}
