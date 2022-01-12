import { applyMiddleware, createStore } from 'redux'
import authReducer from './authReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const configureStore = (addLogger = true) => {
  const middleWare = addLogger
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(logger)
  return createStore(authReducer, middleWare)
}

export default configureStore
