import React from 'react'
import { render } from '@testing-library/react'
import Profile from './Profile'

describe('Profilepage', () => {
  describe('Layout', () => {
    it('has root page div', () => {
      const { queryByTestId } = render(<Profile />)
      const profileDiv = queryByTestId('profile')
      expect(profileDiv).toBeInTheDocument()
    })
  })
})
