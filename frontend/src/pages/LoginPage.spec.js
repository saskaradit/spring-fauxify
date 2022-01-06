import React from 'react'
import { render } from '@testing-library/react'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  describe('Layout', () => {
    it('has header of login', () => {
      const { container } = render(<LoginPage />)
      const header = container.querySelector('h1')
      expect(header).toBeInTheDocument()
    })
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<LoginPage />)
      const usernameInput = queryByPlaceholderText('Username')
      expect(usernameInput).toBeInTheDocument()
    })
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<LoginPage />)
      const passwordInput = queryByPlaceholderText('Password')
      expect(passwordInput).toBeInTheDocument()
    })
    it('has login button', () => {
      const { container } = render(<LoginPage />)
      const loginButton = container.querySelector('button')
      expect(loginButton).toBeInTheDocument()
    })
  })
})
