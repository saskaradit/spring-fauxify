import { applyMiddleware, createStore } from 'redux'
import authReducer from './authReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as apiCalls from '../api/apiCalls'

const configureStore = (addLogger = true) => {
  let localStorageData = localStorage.getItem('faux-auth')
  let persistedState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false,
  }
  if (localStorageData) {
    try {
      persistedState = JSON.parse(localStorageData)
      apiCalls.setAuthHeader(persistedState)
    } catch (error) {}
  }
  const middleWare = addLogger
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(logger)
  const store = createStore(authReducer, persistedState, middleWare)
  store.subscribe(() => {
    localStorage.setItem('faux-auth', JSON.stringify(store.getState()))
    apiCalls.setAuthHeader(store.getState())
  })
  return store
}

export default configureStore
