import { db } from '../firebase'

const initialState = {
  updatingIds: [],
  todos: [],
}

const SET_TODOS = 'SET_TODOS'
const REQUEST_TOGGLE_TODO = 'REQUEST_TOGGLE_TODO'
const REQUEST_TOGGLE_TODO_FAILURE = 'REQUEST_TOGGLE_TODO_FAILURE'
const REQUEST_TOGGLE_TODO_SUCCESS = 'REQUEST_TOGGLE_TODO_SUCCESS'

export const setTodos = todos => ({
  type: SET_TODOS,
  payload: {
    todos,
  },
})
export const requestToggleTodo = id => ({
  type: REQUEST_TOGGLE_TODO,
  payload: {
    id,
  },
})
export const requestToggleTodoFailure = id => ({
  type: REQUEST_TOGGLE_TODO_FAILURE,
  payload: {
    id,
  },
})
export const requestToggleTodoSuccess = id => ({
  type: REQUEST_TOGGLE_TODO_SUCCESS,
  payload: {
    id,
  },
})

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_TODOS:
    return {
      ...state,
      todos: action.payload.todos,
    }
  case REQUEST_TOGGLE_TODO:
    return {
      ...state,
      updatingIds: [
        ...state.updatingIds,
        action.payload.id,
      ],
    }
  case REQUEST_TOGGLE_TODO_FAILURE:
    return {
      ...state,
      updatingIds: state.updatingIds.map(id => id !== action.payload.id),
    }
  case REQUEST_TOGGLE_TODO_SUCCESS:
    return {
      ...state,
      updatingIds: state.updatingIds.map(id => id !== action.payload.id),
    }
  default:
    return state
  }
}

export const registerTodosListenerThunk = () => async (dispatch) => {
  db.collection('todos').onSnapshot(querySnapshot => {
    const todos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    dispatch(setTodos(todos))
  })
}
export const toggleTodoThunk = todo => async (dispatch) => {
  dispatch(requestToggleTodo())
  try {
    await db.collection('todos').doc(todo.id).update({
      completed: !todo.completed,
    })
    dispatch(requestToggleTodoSuccess())
  } catch (err) {
    console.error(err)
    dispatch(requestToggleTodoFailure())
  }
}