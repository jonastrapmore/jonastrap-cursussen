import {Page} from './page.ts'

// Een type dat een concrete subklasse van Page voorstelt.
// Met andere woorden een subklasse met een publieke constructor zonder parameters.
type ConcretePage = new () => Page

// Een map die de URL van een pagina naar de bijhorende klasse mapt.
type RouteMap = Record<string, ConcretePage>

/**
 * Router die navigatie tussen verschillende pagina's in de applicatie mogelijk maakt.
 * Elk HTML-element met een data-link attribuut wordt omgevormd tot een link.
 *
 * Je KRIJGT deze code op het examen en moet hier geen aanpassingen aan doen.
 * Je moet deze klasse enkel gebruiken.
 */
export class Router {
  readonly #pages: RouteMap
  #activePage: Page | null = null

  constructor(pages: RouteMap) {
    this.#pages = pages

    // Haal de pagina op die overeenkomt met de huidige URL.
    // Als dit pad gekend is, wordt er genavigeerd naar de bijhorende pagina.
    // Als dit pad niet gekend is, wordt er genavigeerd naar de root.
    const pathName = window.location.pathname
    this.navigate(this.#pages[pathName] ? pathName : '/')
  }

  /**
   * Navigeer naar een bepaalde pagina.
   *
   * @param path Het pad van de pagina waarnaar genavigeerd moet worden.
   */
  navigate(path: string) {
    this.#activePage?.cleanup()

    // Toen de inhoud van de pagina waarnaar genavigeerd werd.
    this.#activePage = new this.#pages[path]()
    this.#activePage.render()

    // Zorg dat links werken.
    this.#setupRouter()
  }

  /**
   * Doorzoek de DOM naar elementen met een data-link attribuut en voeg een event listener toe om te navigeren naar de
   * bijhorende pagina.
   *
   * @private
   */
  #setupRouter() {
    document.querySelectorAll('[data-link]')?.forEach(link => {
      const path = link.getAttribute('data-link')!
      link.addEventListener('click', (evt) => {
        evt.preventDefault()
        window.history.pushState(null, '', `${window.location.origin}${path}`)
        this.navigate(path)
      })
    })
  }
}