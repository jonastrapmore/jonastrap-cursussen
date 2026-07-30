import {type Persistable, PersistenceProvider} from './persistenceProvider.ts'

export class RestPersistenceProvider<T extends Persistable> extends PersistenceProvider<T> {

  #baseUrl: string
  #cachedData: T[] = []

  constructor(baseUrl: string) {
    super()
    this.#baseUrl = baseUrl
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await fetch(this.#baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
    if (!response.ok) {
      throw new Error(`Failed to create item: ${response.statusText}`)
    }
    const newItem = await response.json()
    this.#cachedData.push(newItem)
    this.notifyObservers(this.#cachedData)

    return newItem
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.#baseUrl}/${id}`, {method: 'DELETE'})
    if (!response.ok) {
      throw new Error(`Failed to delete item with id ${id}: ${response.statusText}`)
    }
    this.#cachedData = this.#cachedData.filter(item => item.id !== id)
    this.notifyItemObservers(id, null)
    this.notifyObservers(this.#cachedData)
  }

  async get(id: string): Promise<T> {
    const response = await fetch(`${this.#baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch item with id ${id}: ${response.statusText}`)
    }
    const item = await response.json()
    this.notifyItemObservers(id, item)

    return item
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(this.#baseUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`)
    }
    this.#cachedData = await response.json()
    this.notifyObservers(this.#cachedData)
    return this.#cachedData
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.#baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
    if (!response.ok) {
      throw new Error(`Failed to update item with id ${id}: ${response.statusText}`)
    }
    const updatedItem = await response.json()
    this.#cachedData = this.#cachedData.map(item => item.id === id ? updatedItem : item)

    this.notifyObservers(this.#cachedData)
    this.notifyItemObservers(id, updatedItem)

    return updatedItem
  }
}