import React from 'react'
import { render } from '@testing-library/react'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'

const setup = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
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
})

console.error = () => {}
