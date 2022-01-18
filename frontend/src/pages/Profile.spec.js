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

const mockFailGetUser = {
  response: {
    data: {
      message: 'User not foun',
    },
  },
}

const match = {
  params: {
    username: 'user1',
  },
}

const setup = (props) => {
  return render(<Profile {...props} />)
}

describe('Profilepage', () => {
  describe('Layout', () => {
    it('has root page div', () => {
      const { queryByTestId } = setup()
      const profileDiv = queryByTestId('profile')
      expect(profileDiv).toBeInTheDocument()
    })
    it('displays the username when data is loaded', async () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      const { findByText } = setup({ match })
      const user = findByText('display1@user1')
      expect(user).toBeInTheDocument()
    })
    it('not found error', async () => {
      apiCalls.getUser = jest.fn().mockRejectedValue(mockFailGetUser)
      const { findByText } = setup({ match })
      const user = findByText('User not found')
      expect(user).toBeInTheDocument()
    })
  })
  describe('Lifecycle', () => {
    it('calls getUser when it is rendered', () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      setup({ match })
      expect(apiCalls).toHaveBeenCalledTimes(1)
    })
    it('calls getUser when it is rendered with user1', () => {
      apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser)
      setup({ match })
      expect(apiCalls.getUser).toHaveBeenCalledWith('user1')
    })
  })
})

console.error = () => {}
