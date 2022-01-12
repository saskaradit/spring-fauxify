import React from 'react'
import { render } from '@testing-library/react'
import Home from './Home'

describe('Homepage', () => {
  describe('Layout', () => {
    it('has root page div', () => {
      const { queryByTestId } = render(<Home />)
      const homeDiv = queryByTestId('home')
      expect(homeDiv).toBeInTheDocument()
    })
  })
})

console.error = () => {}
