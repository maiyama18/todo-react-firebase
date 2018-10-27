import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import dataReducer from './data'

const rootReducer = combineReducers({
  data: dataReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

export default store