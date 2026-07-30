import * as fs from 'fs/promises'

export class FilePersistenceProvider<T> {
  constructor(private filename: string) {}

  private async read(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filename, 'utf-8')
      return JSON.parse(data) as T[]
    } catch (e) {
      console.log(e)
      return []
    }
  }

  private async write(data: T[]): Promise<void> {
    await fs.writeFile(this.filename, JSON.stringify(data, null, 2), 'utf-8')
  }

  async getAll(): Promise<T[]> {
    return this.read()
  }

  async getById(id: string): Promise<T | undefined> {
    const data = await this.read()
    return data.find(item => (item as any).id === id)
  }

  async create(item: T): Promise<void> {
    const data = await this.read()
    data.push(item)
    await this.write(data)
  }

  async update(id: string, updatedItem: T): Promise<void> {
    const data = await this.read()
    const index = data.findIndex(item => (item as any).id === id)
    if (index === -1) throw new Error('Item not found')
    data[index] = updatedItem
    await this.write(data)
  }

  async delete(id: string): Promise<void> {
    const data = await this.read()
    const filtered = data.filter(item => (item as any).id != id)
    await this.write(filtered)
  }
}
