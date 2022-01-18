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

export const listUsers = (param = { page: 0, size: 3 }) => {
  const path = `/api/v1/users?page=${param.page || 0}&size=${param.size || 3}`
  return axios.get(path)
}

export const getUser = (username) => {
  return axios.get(`/api/v1/userrs/${username}`)
}
