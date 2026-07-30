import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { Router } from './router/router.ts'

// ===== Module 11 — stap 1: registreren + routing =====
import { PartsPage } from './pages/parts/parts.ts'
import { BuildPage } from './pages/build/build.ts'
import { CustomNavbar } from './components/navbar/navbar.ts'
import { CustomPart } from './components/partCard/part.ts'
import { CustomBuildItem } from './components/buildItem/buildItem.ts'

// 1) Registreer de custom elements (tag-naam ↔ klasse).
//    De navbar-tag is verplicht 'custom-navbar' (vraagt de opgave).
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-part', CustomPart)
window.customElements.define('custom-build-item', CustomBuildItem)

// 2) Koppel elk pad aan de juiste pagina. De Router leest bij het opstarten de URL
//    en toont de bijhorende pagina in <div id="app">.
new Router({
  '/': PartsPage,
  '/build': BuildPage,
})
