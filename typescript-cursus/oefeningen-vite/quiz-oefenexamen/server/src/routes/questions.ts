import express, {Request, Response} from 'express'
import {Question} from '../models/question.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Question>(`./src/data/questions.json`)

// GET all questions
router.get('/', async (_req: Request, res: Response) => {
  const questions = await provider.getAll()
  res.json(questions)
})

// GET question by ID
router.get('/:id', async (req: Request, res: Response) => {
  const question = await provider.getById(req.params.id)
  if (!question) return res.status(404).json({error: 'Question not found'})
  res.json(question)
})

// CREATE question
router.post('/', async (req: Request, res: Response) => {
  const newQuestion: Question = {...req.body, id: uuidv4()}
  await provider.create(newQuestion)
  res.status(201).json(newQuestion)
})

// UPDATE question
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedQuestion: Question = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedQuestion)
    res.json(updatedQuestion)
  } catch {
    res.status(404).json({error: 'Question not found'})
  }
})

// DELETE question
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
