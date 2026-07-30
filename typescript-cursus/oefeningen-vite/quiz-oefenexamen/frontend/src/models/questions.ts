export interface Question {
  id: string
  type: 'true-false' | 'multiple-choice'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}