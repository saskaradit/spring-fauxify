import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import axios from 'axios'
import configureStore from '../redux/configureStore'
import * as apiCalls from '../api/apiCalls'

apiCalls.listUsers = jest.fn().mockResolvedValue({
  data: {
    content: [],
    number: 0,
    size: 3,
  },
})

apiCalls.getUser = jest.fn().mockResolvedValue({
  data: {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png',
  },
})

beforeEach(() => {
  localStorage.clear()
  delete axios.defaults.headers.common['Authorization']
})

const setup = (path) => {
  const store = configureStore(false)
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
}
const changeEvent = (content) => {
  return {
    target: {
      value: content,
    },
  }
}

describe('App', () => {
  it('displays homepage when url is /', () => {
    const { queryByTestId } = setup('/')
    expect(queryByTestId('home')).toBeInTheDocument()
  })
  it('displays LoginPage when url is /login', () => {
    const { container } = setup('/login')
    const header = container.querySelector('h1')
    expect(header).toHaveTextContent('Login')
  })
  it('displays only LoginPage when url is /login', () => {
    const { queryByTestId } = setup('/login')
    expect(queryByTestId('home')).not.toBeInTheDocument()
  })
  it('displays SignUp when url is /signup', () => {
    const { container } = setup('/signup')
    const header = container.querySelector('h1')
    expect(header).toHaveTextContent('Sign Up')
  })
  it('displays My Profile after login success', async () => {
    const { queryByPlaceholderText, container, findByText } = setup('/login')

    const usernameInput = queryByPlaceholderText('Username')
    const passwordInput = queryByPlaceholderText('Password')
    const loginButton = container.querySelector('button')

    fireEvent.change(usernameInput, changeEvent('user1'))
    fireEvent.change(passwordInput, changeEvent('Jengjet1'))

    axios.post = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png',
      },
    })
    fireEvent.click(loginButton)

    const myProfileLink = await findByText('My Profile')
    expect(myProfileLink).toBeInTheDocument()
  })
  it('displays My Profile after signup success', async () => {
    const { queryByPlaceholderText, container, findByText } = setup('/signup')
    const displayNameInput = queryByPlaceholderText('Display Name')
    const usernameInput = queryByPlaceholderText('Username')
    const passwordInput = queryByPlaceholderText('Password')
    const confirmPasswordInput = queryByPlaceholderText('Confirm Password')

    fireEvent.change(displayNameInput, 'display1')
    fireEvent.change(usernameInput, 'user1')
    fireEvent.change(passwordInput, 'Jengjet1')
    fireEvent.change(confirmPasswordInput, 'Jengjet1')

    const loginButton = container.querySelector('button')
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          message: 'User Saved',
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 1,
          username: 'user1',
          displayName: 'display1',
          image: 'profile1.png',
        },
      })
    fireEvent.click(loginButton)

    const myProfileLink = await findByText('My Profile')
    expect(myProfileLink).toBeInTheDocument()
  })

  it('saves logged in user data to localStorage', async () => {
    const { queryByPlaceholderText, container, findByText } = setup('/signup')
    const displayNameInput = queryByPlaceholderText('Display Name')
    const usernameInput = queryByPlaceholderText('Username')
    const passwordInput = queryByPlaceholderText('Password')
    const confirmPasswordInput = queryByPlaceholderText('Confirm Password')

    fireEvent.change(displayNameInput, 'display1')
    fireEvent.change(usernameInput, 'user1')
    fireEvent.change(passwordInput, 'Jengjet1')
    fireEvent.change(confirmPasswordInput, 'Jengjet1')

    const loginButton = container.querySelector('button')
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          message: 'User Saved',
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 1,
          username: 'user1',
          displayName: 'display1',
          image: 'profile1.png',
        },
      })
    fireEvent.click(loginButton)

    const myProfileLink = await findByText('My Profile')
    const dataStorage = JSON.parse(localStorage.getItem('faux-auth'))
    expect(dataStorage).toEqual({
      id: 1,
      username: 'user1',
      isLoggedIn: true,
      image: 'profile1.png',
      password: 'Jengjet1',
    })
  })
  it('displays loggedin in navbar when user is in localstorage', () => {
    localStorage.getItem(
      'faux-auth',
      JSON.stringify({
        id: 1,
        username: 'user1',
        isLoggedIn: true,
        image: 'profile1.png',
        password: 'Jengjet1',
      })
    )
    const { queryByText } = setup('/')
    const myProfileLink = queryByText('My Profile')
    expect(myProfileLink).toBeInTheDocument()
  })
  it('set axios auth with bas64 encoded', async () => {
    const { queryByPlaceholderText, container, findByText } = setup('/signup')
    const displayNameInput = queryByPlaceholderText('Display Name')
    const usernameInput = queryByPlaceholderText('Username')
    const passwordInput = queryByPlaceholderText('Password')
    const confirmPasswordInput = queryByPlaceholderText('Confirm Password')

    fireEvent.change(displayNameInput, 'display1')
    fireEvent.change(usernameInput, 'user1')
    fireEvent.change(passwordInput, 'Jengjet1')
    fireEvent.change(confirmPasswordInput, 'Jengjet1')

    const loginButton = container.querySelector('button')
    axios.post = jest.fn().mockResolvedValueOnce({
      data: {
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png',
      },
    })
    fireEvent.click(loginButton)

    const axiosAuth = axios.defaults.headers.common['Authorization']

    const encoded = btoa('user1:Jengjet1')
    const expectedAuth = `Basic ${encoded}`
    expect(expectedAuth).toBe(expectedAuth)
  })
})

console.error = () => {}
