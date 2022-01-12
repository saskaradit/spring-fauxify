import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import authReducer from '../redux/authReducer'

const loggedInState = {
  id: 1,
  username: 'user1',
  displayName: 'user1',
  image: 'profile.jpg',
  password: 'Jengjet1',
  isLoggedIn: true,
}

const defaultState = {
  id: 0,
  username: '',
  displayName: '',
  image: '',
  password: '',
  isLoggedIn: false,
}

const setup = (state = defaultState) => {
  const store = createStore(authReducer, state)
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  )
}

describe('Navbar', () => {
  it('has link to home', () => {
    const { container } = setup()
    const logo = container.querySelector('h4')
    expect(logo.parentElement.getAttribute('href')).toBe('/')
  })
  it('has link to signup', () => {
    const { queryByText } = setup()
    const signupLink = queryByText('Sign Up')
    expect(signupLink.getAttribute('href')).toBe('/signup')
  })
  it('has link to login', () => {
    const { queryByText } = setup()
    const signupLink = queryByText('Login')
    expect(signupLink.getAttribute('href')).toBe('/login')
  })
  it('has link to logout when user is logged int', () => {
    const { queryByText } = setup(loggedInState)
    const logoutLink = queryByText('Logout')
    expect(logoutLink).toBeInTheDocument()
  })
  it('has link to profile when user is logged int', () => {
    const { queryByText } = setup(loggedInState)
    const profileLink = queryByText('My Profile')
    expect(profileLink.getAttribute('href')).toBe('/user1')
  })

  describe('Interaction', () => {
    it('displays the login and signup links when user clicks logout', () => {
      const { queryByText } = setup(loggedInState)
      const logoutLink = queryByText('Logout')
      fireEvent.click(logoutLink)
      const loginLink = queryByText('Login')
      expect(loginLink).toBeInTheDocument()
    })
  })
})

console.error = () => {}
