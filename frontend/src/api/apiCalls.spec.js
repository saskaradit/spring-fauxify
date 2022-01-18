import axios from 'axios'
import * as apiCalls from './apiCalls'

describe('API', () => {
  describe('signup', () => {
    it('calls /api/v1/users', () => {
      const mockSignup = jest.fn()

      axios.post = mockSignup
      apiCalls.signup()

      const path = mockSignup.mock.calls[0][0]
      expect(path).toBe('/api/v1/users')
    })
  })
  describe('login', () => {
    it('calls /api/v1/login', () => {
      const mockLogin = jest.fn()
      axios.post = mockLogin
      apiCalls.login({ username: 'saskara', password: 'Jengjet1' })
      const path = mockLogin.mock.calls[0][0]
      expect(path).toBe('/api/v1/login')
    })
  })
  describe('listUser', () => {
    it('calls /api/v1/users?page=0&size=3 when no param provided for listUsers', () => {
      const mockListUsers = jest.fn()
      axios.get = mockListUsers
      apiCalls.listUser()
      expect(mockListUsers).toBeCalledWith('/api/v1/users?page=0&size=3')
    })
    it('calls /api/v1/users?page=5&size=10 when param is provided for listUsers', () => {
      const mockListUsers = jest.fn()
      axios.get = mockListUsers
      apiCalls.listUser({ page: 5, size: 10 })
      expect(mockListUsers).toBeCalledWith('/api/v1/users?page=5&size=10')
    })
    it('calls /api/v1/users?page=5&size=3 when param is provided for listUsers', () => {
      const mockListUsers = jest.fn()
      axios.get = mockListUsers
      apiCalls.listUser({ page: 5 })
      expect(mockListUsers).toBeCalledWith('/api/v1/users?page=5&size=3')
    })
  })
  describe('getUser', () => {
    it('calls /api/v1/users/user5 when user5 is provided', () => {
      const moockGetUser = jest.fn()
      axios.get = moockGetUser
      apiCalls.getUser('user5')
      expect(moockGetUser).toBeCalledWith('/api/v1/users/user5')
    })
  })
})
