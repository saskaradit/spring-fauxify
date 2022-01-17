import React from 'react'
import { render } from '@testing-library/react'
import Home from './Home'
import * as apiCalls from '../api/apiCalls'

apiCalls.listUsers = jest.fn().mockResolvedValue({
  data: {
    content: [],
    number: 0,
    size: 3,
  },
})

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
