import { QUESTION_LIST_REQUEST, QUESTION_LIST_RESPONSE } from './quiz.type'

const INITIAL_STATE = {
  questionListLoader: false,
  questionList: null,
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { ...state, questionListLoader: true, questionList: null }
    case QUESTION_LIST_RESPONSE:
      return {
        ...state,
        questionListLoader: false,
        questionList: action.payload,
      }
    default:
      return state
  }
}

export default quizReducer
