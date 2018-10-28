import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import dataReducer from './data'
import formReducer from './form'

const rootReducer = combineReducers({
  data: dataReducer,
  form: formReducer,
})

const middlewares = [thunk]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

export default store