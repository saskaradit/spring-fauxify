import axios from 'axios'

export const signup = (user) => {
  return axios.post('/api/v1/users', user)
}

export const login = (user) => {
  return axios.post('/api/v1/login', {}, { auth: user })
}

export const setAuthHeader = (username, password, isLoggedIn) => {
  if (isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
      username + ':' + password
    )}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
