# Module 10 — demo-project

Een minimaal **Vite + TypeScript**-project als tastbare oplossing bij de oefeningen van Module 10.
Vanaf Module 10 werken we met echte projecten (niet meer met losse `oefeningen/src/moduleNN.ts`).

## Draaien

```bash
pnpm install     # haalt Vite, TypeScript en Bootstrap binnen (maakt node_modules)
pnpm dev         # start de dev-server -> open http://localhost:5173
```

Andere scripts:

```bash
pnpm build       # tsc (typecheck) + vite build (productie-bundel in dist/)
pnpm preview     # bekijk de productie-build lokaal
```

## Welke oefening zit waar?

| Oefening | Waar te zien |
|---|---|
| **1 — nieuw project** | de projectstructuur zelf (`index.html`, `src/main.ts`, `package.json`, `tsconfig.json`) |
| **2 — scripts lezen** | `package.json` → `"scripts"` (`dev`, `build`, `preview`) |
| **3 — dev typecheckt niet** | `src/main.ts`, onderaan: haal de `const getal: number = 'tekst'`-regel uit commentaar |
| **4 — HTML met `?raw`** | `src/main.ts` importeert `src/hallo.html?raw` en zet het in `#app` |
| **5 — library toevoegen** | `bootstrap` in `package.json` + `import 'bootstrap/dist/css/bootstrap.css'` in `main.ts` |
| **6 — examen-startcode draaien** | niet in dit demo-project: gebruik de startbestanden van een examen (server + frontend), zoals oefening 6 beschrijft |

## Het punt van oefening 3 (belangrijk)

`pnpm dev` gebruikt esbuild: dat **strípt** types en checkt ze **niet**. Een echte typefout laat de
app dus gewoon draaien. De typecheck komt van je **editor** (rode kringels) en van **`pnpm build`**
(`tsc && vite build`). Kortom: "het draait" betekent niet "het is typeveilig".
