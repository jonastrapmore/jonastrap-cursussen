// ===== Module 12/13 — de data-providers =====
import { RestPersistenceProvider } from "./restPersistenceProvider.ts";
import { LocalStoragePersistenceProvider } from "./localStoragePersistenceProvider.ts";
import type { Part } from "../models/part.ts";
import type { BuildItem } from "../models/buildItem.ts";

// Module 12: onderdelen uit de API. Het type <Part> is verplicht.
export const PartRestProvider = new RestPersistenceProvider<Part>(
  "http://localhost:3000/parts",
);

// Module 13: de configuratie in localStorage (sleutel 'build').
export const BuildLocalProvider = new LocalStoragePersistenceProvider<BuildItem>(
  "build",
);
