# Nederlandse TypeScript Cursus

Een complete, originele cursus om TypeScript te leren, als vervolg op JavaScript. Geschreven in
het Nederlands, in eigen woorden, met oefeningen per module.

## Inhoud

- `0 - Lees mij eerst.md` + `00`..`03 - Module N - ...md`: de cursusmodules.
- `oefeningen/`: een kale `tsc`-opzet om de oefeningen in te maken (`src/` -> `dist/`).

## Aan de slag met de oefeningen

```bash
cd oefeningen
tsc --watch          # compileert + controleert types
node dist/module01.js   # draait een gecompileerd oefenbestand
```

> De gecompileerde `dist/`-map staat in `.gitignore` (build-output, hoort niet in versiebeheer).
