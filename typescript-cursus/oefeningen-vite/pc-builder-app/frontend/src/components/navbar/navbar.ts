import { CustomElement } from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

// ===== Module 11 — stap 1: je eerste custom element =====
// De navbar is het eenvoudigste custom element: enkel vaste HTML, geen attributen.
// De links in navbar.html hebben een data-link, zodat de Router ze klikbaar maakt
// (navigeren zonder de pagina te herladen).
export class CustomNavbar extends CustomElement {
  constructor() {
    super(HTML)
  }
}
