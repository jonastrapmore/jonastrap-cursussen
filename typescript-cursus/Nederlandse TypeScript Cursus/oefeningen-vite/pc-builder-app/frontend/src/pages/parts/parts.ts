import { BuildLocalProvider, PartRestProvider } from "../../data/data.ts";
import type { BuildItem } from "../../models/buildItem.ts";
import type { Part } from "../../models/part.ts";
import { Page } from "../../router/page.ts";
import HTML from "./parts.html?raw";

// ===== Module 12/13 — onderdelen tonen + toevoegen aan de configuratie =====
export class PartsPage extends Page {
  #parts: Part[] = [];
  #build: BuildItem[] = [];
  #container = this.body.querySelector<HTMLDivElement>("#parts")!;

  constructor() {
    super(HTML);

    // (a) observer op de API-data (Module 12)
    this.unsubscribe.push(
      PartRestProvider.addObserver((parts) => {
        this.#parts = parts;
        this.render();
      }),
    );
    void PartRestProvider.getAll();

    // (a bis) observer op de configuratie in localStorage (Module 13),
    // zodat de +/✓-knop klopt en meteen bijwerkt.
    this.unsubscribe.push(
      BuildLocalProvider.addObserver((build) => {
        this.#build = build;
        this.render();
      }),
    );
    void BuildLocalProvider.getAll();
  }

  render(): void {
    super.render();

    this.#container.innerHTML = "";
    this.#parts.map((part) => {
      // zit dit onderdeel al in de configuratie?
      const existing = this.#build.find((b) => b.part.id === part.id);

      const el = document.createElement("custom-part");
      el.setAttribute("id", part.id);
      el.setAttribute("name", part.name);
      el.setAttribute("price", part.price.toFixed(2));
      el.setAttribute("category", part.category);
      el.setAttribute("is-added", existing ? "true" : "false");

      el.addEventListener("addToBuild", () => {
        if (existing) {
          // zit er al in -> eruit halen (met het BUILD-item id, niet part.id!)
          void BuildLocalProvider.delete(existing.id);
          return;
        }
        // zit er al een onderdeel van dezelfde categorie in? -> melding en VERDER NIETS
        if (this.#build.some((b) => b.part.category === part.category)) {
          window.alert(
            `Er zit al een onderdeel van de categorie "${part.category}" in de configuratie.`,
          );
          return;
        }
        // anders: toevoegen (het id maakt de provider zelf)
        void BuildLocalProvider.create({ part });
      });

      this.#container.appendChild(el);
    });
  }
}
