/**
 * Een klasse die een custom HTML-element definieert.
 *
 * Een custom element is een zelfgedefinieerd herbruikbaar HTML-element met een eigen UI, bepaalde extra attributen en
 * eventuele custom events.
 *
 * Voor elk element moet een subklasse van CustomElement gemaakt worden die de gewenste functionaliteit, events en
 * attributen implementeert.
 *
 * Je KRIJGT deze code op het examen en moet hier geen aanpassingen aan doen.
 * Je moet deze klasse enkel gebruiken.
 */
export abstract class CustomElement extends HTMLElement {
  protected componentBody: HTMLDivElement

  protected constructor(body: string) {
    super()
    this.componentBody = document.createElement('div')
    this.componentBody.innerHTML = body
  }

  // Deze functie wordt opgeroepen wanneer het element aan het DOM toegevoegd wordt.
  // Dit is de eerste plaats waar je de UI van het element kan aanpassen.
  connectedCallback() {
    this.innerHTML = ''
    this.appendChild(this.componentBody)
  }
}