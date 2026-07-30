import type {Unsubscribe} from '../data/persistenceProvider.ts'

/**
 * Een basisklasse voor alle pagina's in de applicatie.
 *
 * Je KRIJGT deze code op het examen en moet hier geen aanpassingen aan doen.
 * Je moet deze klasse enkel gebruiken.
 */
export abstract class Page {

  protected readonly body: HTMLDivElement
  protected unsubscribe: Unsubscribe[] = []
  static readonly #root = document.querySelector<HTMLDivElement>('#app')!

  /**
   * Maak een nieuwe pagina aan.
   *
   * @param body De HTML-inhoud van de pagina als string.
   * @protected
   */
  protected constructor(body: string) {
    this.body = document.createElement('div')
    this.body.innerHTML = body
  }

  /**
   * Render de inhoud van de pagina.
   * Je moet deze methode overschrijven in de subklassen zodat je pagina specifieke inhoud ook gerenderd wordt.
   */
  render() {
    Page.#root.innerHTML = ''
    Page.#root.appendChild(this.body)
  }

  cleanup() {
    this.unsubscribe.forEach(x => x())
    this.unsubscribe = []
  }
}