import { db } from '../firebase'

const initialState = {
  fetching: false,
  updatingIds: [],
  todos: [],
}

const REQUEST_TODOS = 'REQUEST_TODOS'
const REQUEST_TODOS_FAILURE = 'REQUEST_TODOS_FAILURE'
const REQUEST_TODOS_SUCCESS = 'REQUEST_TODOS_SUCCESS'
const REQUEST_TOGGLE_TODO = 'REQUEST_TOGGLE_TODO'
const REQUEST_TOGGLE_TODO_FAILURE = 'REQUEST_TOGGLE_TODO_FAILURE'
const REQUEST_TOGGLE_TODO_SUCCESS = 'REQUEST_TOGGLE_TODO_SUCCESS'

export const requestTodos = () => ({
  type: REQUEST_TODOS,
})
export const requestTodosFailure = () => ({
  type: REQUEST_TODOS_FAILURE,
})
export const requestTodosSuccess = todos => ({
  type: REQUEST_TODOS_SUCCESS,
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
export const requestToggleTodoSuccess = todo => ({
  type: REQUEST_TOGGLE_TODO_SUCCESS,
  payload: {
    todo,
  },
})

export default (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_TODOS:
    return {
      ...state,
      fetching: true,
    }
  case REQUEST_TODOS_FAILURE:
    return {
      ...state,
      fetching: false,
    }
  case REQUEST_TODOS_SUCCESS:
    return {
      ...state,
      fetching: false,
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
      updatingIds: state.updatingIds.filter(id => id !== action.payload.id),
    }
  case REQUEST_TOGGLE_TODO_SUCCESS:
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== action.payload.todo.id) return todo
        return action.payload.todo
      }),
      updatingIds: state.updatingIds.filter(id => id !== action.payload.todo.id),
    }
  default:
    return state
  }
}

export const fetchTodosThunk = () => async (dispatch) => {
  dispatch(requestTodos())
  try {
    const querySnapshot = await db.collection('todos').get()
    const todos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    dispatch(requestTodosSuccess(todos))
  } catch (err) {
    console.error(err)
    dispatch(requestTodosFailure())
  }
}
export const toggleTodoThunk = (todo) => async (dispatch) => {
  dispatch(requestToggleTodo(todo.id))
  try {
    const todoRef = db.collection('todos').doc(todo.id)
    await todoRef.update({
      completed: !todo.completed,
    })
    dispatch(requestToggleTodoSuccess({
      ...todo,
      completed: !todo.completed,
    }))
  } catch (err) {
    console.error(err)
    dispatch(requestToggleTodoFailure(todo.id))
  }
}