import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserSignupPage from './UserSignupPage'

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      const { container } = render(<UserSignupPage />)
      const header = container.querySelector('h1')
      expect(header).toHaveTextContent('Sign Up')
    })

    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const displayNameInput = queryByPlaceholderText('Display Name')
      expect(displayNameInput).toBeInTheDocument()
    })
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const usernameInput = queryByPlaceholderText('Username')
      expect(usernameInput).toBeInTheDocument()
    })
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Password')
      expect(passwordInput).toBeInTheDocument()
    })
    it('has input for password repeat', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const passwordRepeatInput = queryByPlaceholderText('Confirm Password')
      expect(passwordRepeatInput).toBeInTheDocument()
    })
    it('has submit button', () => {
      const { container } = render(<UserSignupPage />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })
  })
  describe('Interactions', () => {
    let button,
      displayNameInput,
      passwordInput,
      confirmPasswordInput,
      usernameInput

    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />)
      const { container, queryByPlaceholderText } = rendered
      displayNameInput = queryByPlaceholderText('Display Name')
      usernameInput = queryByPlaceholderText('Username')
      passwordInput = queryByPlaceholderText('Password')
      confirmPasswordInput = queryByPlaceholderText('Confirm Password')

      fireEvent.change(displayNameInput, 'the-display-name')
      fireEvent.change(usernameInput, 'the-username')
      fireEvent.change(passwordInput, 'the-password')
      fireEvent.change(confirmPasswordInput, 'the-confirm-password')

      button = container.querySelector('button')
      return rendered
    }

    it('sets the displayname value info state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const displayNameInput = queryByPlaceholderText('Display Name')
      const changeEvent = {
        target: {
          value: 'the-display-name',
        },
      }
      fireEvent.change(displayNameInput, changeEvent)
      expect(displayNameInput).toHaveValue('the-display-name')
    })
    it('sets the username value info state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const usernameInput = queryByPlaceholderText('Username')
      const changeEvent = {
        target: {
          value: 'the-username',
        },
      }
      fireEvent.change(usernameInput, changeEvent)
      expect(usernameInput).toHaveValue('the-username')
    })
    it('sets the password value info state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Password')
      const changeEvent = {
        target: {
          value: 'the-password',
        },
      }
      fireEvent.change(passwordInput, changeEvent)
      expect(passwordInput).toHaveValue('the-password')
    })
    it('sets the password value info state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const confirmPasswordInput = queryByPlaceholderText('Confirm Password')
      const changeEvent = {
        target: {
          value: 'the-confirm-password',
        },
      }
      fireEvent.change(confirmPasswordInput, changeEvent)
      expect(confirmPasswordInput).toHaveValue('the-confirm-password')
    })

    it('calls the signup API when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      }
      setupForSubmit({ actions })
      fireEvent.click(button)
      expect(actions.postSignup).toHaveBeenCalledTimes(1)
    })

    it('does not throw exception when the fields are not valid', () => {
      setupForSubmit()
      expect(() => fireEvent.click(button)).not.toThrow()
    })

    it('calls post with user body when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      }
      setupForSubmit({ actions })
      fireEvent.click(button)
      const expectedUser = {
        usernam: 'the-username',
        displayName: 'the-display-name',
        password: 'the-password',
      }
      expect(actions.postSignup).toHaveBeenCalledTimes(1)
    })
  })
})
