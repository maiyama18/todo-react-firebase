import { db } from '../firebase'

const initialState = {
  submitting: '',
  text: '',
}

const CHANGE_TEXT = 'CHANGE_TEXT'
const REQUEST_SUBMIT = 'REQUEST_SUBMIT'
const REQUEST_SUBMIT_FAILURE = 'REQUEST_SUBMIT_FAILURE'
const REQUEST_SUBMIT_SUCCESS = 'REQUEST_SUBMIT_SUCCESS'

export const changeText = text => ({
  type: CHANGE_TEXT,
  payload: {
    text,
  },
})
export const requestSubmit = () => ({
  type: REQUEST_SUBMIT,
})
export const requestSubmitFailure = () => ({
  type: REQUEST_SUBMIT_FAILURE,
})
export const requestSubmitSuccess = () => ({
  type: REQUEST_SUBMIT_SUCCESS,
})

export default (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_TEXT:
    return {
      ...state,
      text: action.payload.text,
    }
  case REQUEST_SUBMIT:
    return {
      ...state,
      submitting: true,
    }
  case REQUEST_SUBMIT_FAILURE:
    return {
      ...state,
      submitting: false,
    }
  case REQUEST_SUBMIT_SUCCESS:
    return {
      ...state,
      submitting: false,
      text: '',
    }
  default:
    return state
  }
}

export const submitTodoThunk = text => async (dispatch) => {
  dispatch(requestSubmit())
  try {
    await db.collection('todos').add({
      title: text,
      completed: false,
    })
    dispatch(requestSubmitSuccess())
  } catch (err) {
    console.error(err)
    dispatch(requestSubmitFailure())
  }
}