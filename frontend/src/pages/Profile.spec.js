import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Profile from './Profile'
import * as apiCalls from '../api/apiCalls'

const mockSuccessGetUser = {
  data: {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png',
  },
}

const match = {
  params: {
    username: 'user1',
  },
}

describe('Profilepage', () => {
  describe('Layout', () => {
    it('has root page div', () => {
      const { queryByTestId } = render(<Profile />)
      const profileDiv = queryByTestId('profile')
      expect(profileDiv).toBeInTheDocument()
    })
    it('displays the username when data is loaded', async () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      const { findByText } = render(<Profile match={match} />)
      const user = await waitFor(() => {
        findByText('display1@user1')
      })
      expect(user).toBeInTheDocument()
    })
  })
  describe('Lifecycle', () => {
    it('calls getUser when it is rendered', () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      render(<Profile match={match} />)
      expect(apiCalls).toHaveBeenCalledTimes(1)
    })
    it('calls getUser when it is rendered with user1', () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      render(<Profile match={match} />)
      expect(apiCalls).toHaveBeenCalledTimes('user1')
    })
  })
})

console.error = () => {}
