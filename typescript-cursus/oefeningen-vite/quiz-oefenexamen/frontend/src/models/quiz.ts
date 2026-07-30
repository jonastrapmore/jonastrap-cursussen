import type {Question} from './questions.ts'

export interface Quiz {
  id: string
  name: string
  questions: Question[]
}