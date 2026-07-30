import express from 'express'
import ticketRouter from './routes/questions.ts'
import favoriteRouter from './routes/favorites.ts'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/questions', ticketRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
