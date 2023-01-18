import { QUESTION_LIST_REQUEST, QUESTION_LIST_RESPONSE } from './quiz.type'
import axios from 'axios'

export const questionListRequest = () => {
  return {
    type: QUESTION_LIST_REQUEST,
  }
}
export const questionListResponse = (data) => {
  return {
    type: QUESTION_LIST_RESPONSE,
    payload: data,
  }
}

export const getQuestions = () => (dispatch, getState) => {
  dispatch(questionListRequest())
  axios
    .get(`https://eok9ha49itquif.m.pipedream.net/`)
    .then(({ data }) => {
      if (data && data.questions) {
        dispatch(questionListResponse(data.questions))
      } else {
        dispatch(questionListResponse(null))
      }
    })
    .catch((e) => {
      dispatch(questionListResponse(e))
    })
}
