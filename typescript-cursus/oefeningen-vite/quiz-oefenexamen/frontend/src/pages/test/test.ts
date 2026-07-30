import HTML from './test.html?raw'
import {Page} from '../../router/page.ts'
import {Quiz} from '../../models/quiz.ts'

export class TestPage extends Page {

  quizzes: Quiz[] = localStorage.getItem('quizzes') ? JSON.parse(localStorage.getItem('quizzes')!) : []
  questionList = this.body.querySelector<HTMLDivElement>('#questions-list')!
  errorMessage = this.body.querySelector<HTMLDivElement>('#error-message')!

  constructor() {
    super(HTML)
  }

  render() {
    super.render()

    if (this.quizzes.length > 0) {
      this.errorMessage.hidden = true
    }

    this.quizzes.map(q => {
      this.questionList.innerHTML += `<div>${q.name}: <ul>${q.questions.map(x => `<li>${x.question}</li>`).join('')}</ul></div>`
    })
  }
}