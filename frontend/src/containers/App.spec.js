import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import authReducer from './redux/authReducer'

const setup = (path) => {
  const store = createStore(authReducer)
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
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
})

console.error = () => {}
