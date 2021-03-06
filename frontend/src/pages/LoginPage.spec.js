import React from 'react'
import { fireEvent, render } from '@testing-library/react'
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
  describe('Interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      }
    }
    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({})
          }, 300)
        })
      })
    }

    let usernameInput, passwordInput, loginButton

    const setupForSubmit = (props) => {
      const rendered = render(<LoginPage {...props} />)

      const { queryByPlaceholderText, container } = rendered

      usernameInput = queryByPlaceholderText('Username')
      passwordInput = queryByPlaceholderText('Password')
      loginButton = container.querySelector('button')

      fireEvent.change(usernameInput, changeEvent('Saskara'))
      fireEvent.change(passwordInput, changeEvent('Jengjet1'))
      return rendered
    }

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />)
      const usernameInput = queryByPlaceholderText('Username')
      fireEvent.change(usernameInput, changeEvent('rad'))
      expect(usernameInput).toHaveValue('rad')
    })
    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />)
      const passwordInput = queryByPlaceholderText('Password')
      fireEvent.change(passwordInput, changeEvent('secret'))
      expect(passwordInput).toHaveValue('secret')
    })
    it('calls postlogin when the actions are provided in props and the fields are valid', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      }
      setupForSubmit({ actions })
      fireEvent.click(loginButton)
      expect(actions.postLogin).toHaveBeenCalledTimes(1)
    })
    it('does not throw exception when no actions are provided', () => {
      setupForSubmit()
      expect(() => fireEvent.click(loginButton)).not.toThrow()
    })
    it('calls postLogin with credentials in body', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      }
      setupForSubmit({ actions })
      fireEvent.click(loginButton)
      const expectedUser = {
        username: 'Saskara',
        password: 'Jengjet1',
      }
      expect(actions.postLogin).toHaveBeenCalledWith(expectedUser)
    })
    it('enables the button when the fields are not empty', () => {
      setupForSubmit()
      expect(loginButton).not.toBeDisabled()
    })
    it('disables the button when the fields are empty', () => {
      setupForSubmit()
      fireEvent.change(usernameInput, changeEvent(''))
      expect(loginButton).toBeDisabled()
    })
    it('alert when login fails', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login Failed',
            },
          },
        }),
      }
      const { findByText } = setupForSubmit({ actions })
      fireEvent.click(loginButton)

      const alert = await findByText('Login Failed')
      expect(alert).toBeInTheDocument()
    })
    it('hides alert when input changes', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login Failed',
            },
          },
        }),
      }
      const { findByText } = setupForSubmit({ actions })
      fireEvent.click(loginButton)

      const alert = await findByText('Login Failed')
      fireEvent.change(usernameInput, changeEvent('hehe'))
      expect(alert).not.toBeInTheDocument()
    })
    it('does not allow user to click the login after an ongoing api call ', () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      }
      setupForSubmit({ actions })
      fireEvent.click(loginButton)
      fireEvent.click(loginButton)
      expect(actions.postLogin).toHaveBeenCalledTimes(1)
    })
  })
})

console.error = () => {}
