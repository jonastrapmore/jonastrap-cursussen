import express, {Request, Response} from 'express'
import {Product} from '../models/product.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Product>(`./src/data/products.json`)

// GET all products
router.get('/', async (_req: Request, res: Response) => {
  const products = await provider.getAll()
  res.json(products)
})

// GET product by ID
router.get('/:id', async (req: Request, res: Response) => {
  const product = await provider.getById(req.params.id)
  if (!product) return res.status(404).json({error: 'Product not found'})
  res.json(product)
})

// CREATE product
router.post('/', async (req: Request, res: Response) => {
  const newProduct: Product = {...req.body, id: uuidv4()}
  await provider.create(newProduct)
  res.status(201).json(newProduct)
})

// UPDATE product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedProduct: Product = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedProduct)
    res.json(updatedProduct)
  } catch {
    res.status(404).json({error: 'Product not found'})
  }
})

// DELETE product
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
