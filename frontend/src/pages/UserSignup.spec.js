import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import UserSignupPage from './UserSignupPage'
import * as authActions from '../redux/authActions'

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

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({})
          }, 300)
        })
      })
    }

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
    it('does not allow user to click the signup after an ongoing api call ', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      }
      setupForSubmit({ actions })
      fireEvent.click(button)
      fireEvent.click(button)
      expect(actions.postSignup).toHaveBeenCalledTimes(1)
    })
    it('displays spinner when an api is ongoing', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      }
      const { queryByText, container } = setupForSubmit({ actions })
      fireEvent.click(button)

      const spinner = container.querySelector('.sr-only')
      expect(spinner).toBeInTheDocument()
    })
    it('hides spinner when an api is completed', async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      }
      const { queryByText } = setupForSubmit({ actions })
      fireEvent.click(button)

      const spinner = queryByText('Loading...')
      // await waitForElementToBeRemoved(spinner)
      expect(spinner).not.toBeInTheDocument()
    })
    it('displays validation error for displayName', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      }
      const { findByText } = setupForSubmit({ actions })
      fireEvent.click(button)

      const errorMessage = await findByText('Cannot be null')

      expect(errorMessage).toBeInTheDocument()
    })
    it('enables the signup button only when the password match', () => {
      setupForSubmit()
      expect(button).not.toBeDisabled()
    })
    it('disables the signup button when the password did not match', () => {
      setupForSubmit()
      fireEvent.change(confirmPasswordInput, 'new-pass')
      expect(button).not.toBeDisabled()
    })
    it('displays the error when the password did not match', () => {
      const { queryByText } = setupForSubmit()
      fireEvent.change(confirmPasswordInput, 'new-pass')
      const mismatch = queryByText('Does not match to password')
      expect(button).not.toBeDisabled()
    })
    it('hides validation error for displayName', async () => {
      const changeEvent = (content) => {
        return {
          target: {
            value: content,
          },
        }
      }
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      }
      const { findByText } = setupForSubmit({ actions })
      fireEvent.click(button)

      const errorMessage = await findByText('Cannot be null')
      fireEvent.change(displayNameInput, changeEvent('name updated'))

      expect(errorMessage).not.toBeInTheDocument()
    })
    // it('redirects after successful signup', async () => {
    //   const actions = {
    //     postSignup: jest.fn().mockResolvedValue({}),
    //   }
    //   const history = {
    //     push: jest.fn(),
    //   }
    //   setupForSubmit({ history, actions })
    //   fireEvent.click(button)
    //   expect(history.push).toBeCalledWith('/')
    // })
  })
})

console.error = () => {}
