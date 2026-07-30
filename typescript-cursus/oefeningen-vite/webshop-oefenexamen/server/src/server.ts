import express from 'express'
import productRouter from './routes/products.ts'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/products', productRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
