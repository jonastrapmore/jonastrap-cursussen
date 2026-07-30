import HTML from './quizzes.html?raw'
import {Page} from '../../router/page.ts'
import {Quiz} from '../../models/quiz.ts'

export class QuizzesPage extends Page {

  #quizNameList = this.body.querySelector<HTMLUListElement>('#quizzes-list')!
  #questionList = this.body.querySelector<HTMLUListElement>('#questions-list')!
  #activeQuiz: string | null = null
  #quizzes: Quiz[] = []

  constructor() {
    super(HTML)
  }

  render() {
    super.render()

    this.#quizNameList.innerHTML = ''
    this.#quizzes.map(quiz => {
      const li = document.createElement('li')
      li.innerText = quiz.name
      li.classList.add('list-group-item', 'list-group-item-action')
      this.#quizNameList.appendChild(li)

      li.addEventListener('click', () => {
        this.#activeQuiz = quiz.id
        this.render()
      })
    })


    const activeQuiz = this.#quizzes.find(quiz => quiz.id === this.#activeQuiz)
    this.#questionList.innerHTML = activeQuiz ? '' : 'Select a quiz to see the questions, if there are no quizzes, create one!'
    activeQuiz?.questions.map(q => {
      /**
       * TODO: Voeg hier de examen code toe.
       **/
    })

  }
}
