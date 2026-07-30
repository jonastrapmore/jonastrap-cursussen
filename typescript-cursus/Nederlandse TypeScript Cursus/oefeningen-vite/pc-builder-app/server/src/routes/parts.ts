import express, {Request, Response} from 'express'
import {Part} from '../models/part.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Part>(`./src/data/parts.json`)

// GET all parts
router.get('/', async (_req: Request, res: Response) => {
  const parts = await provider.getAll()
  res.json(parts)
})

// GET part by ID
router.get('/:id', async (req: Request, res: Response) => {
  const part = await provider.getById(req.params.id)
  if (!part) return res.status(404).json({error: 'Part not found'})
  res.json(part)
})

// CREATE part
router.post('/', async (req: Request, res: Response) => {
  const newPart: Part = {...req.body, id: uuidv4()}
  await provider.create(newPart)
  res.status(201).json(newPart)
})

// UPDATE part
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedPart: Part = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedPart)
    res.json(updatedPart)
  } catch {
    res.status(404).json({error: 'Part not found'})
  }
})

// DELETE part
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
