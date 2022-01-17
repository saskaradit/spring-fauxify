import React from 'react'
import { render, waitFor } from '@testing-library/react'
import UserList from './UserList'
import * as apiCalls from '../api/apiCalls'

const setup = () => {
  return render(<UserList />)
}

const mockedEmptySuccessResponse = {
  data: {
    content: [],
    number: 0,
    size: 3,
  },
}

const mockSuccessGetSinglePage = {
  data: {
    content: [
      {
        username: 'user1',
        display: 'display1',
        image: '',
      },
      {
        username: 'user2',
        display: 'display2',
        image: '',
      },
      {
        username: 'user3',
        display: 'display3',
        image: '',
      },
    ],
    number: 0,
    first: true,
    last: true,
    size: 3,
    totalPages: 1,
  },
}

describe('UserList', () => {
  describe('layout', () => {
    it('has header of users', () => {
      const { container } = setup()
      const header = container.querySelector('h3')
      expect(header).toHaveTextContent('Users')
    })
    it('displays the displayName@username when listUser api returns users', async () => {
      apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetSinglePage)

      const { findByText } = setup()
      const firstUser = await findByText('display1@user1')
      expect(firstUser).toBeInTheDocument()
    })
  })
  describe('Lifecycle', () => {
    it('calls listUsrs api when it is rendered', () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockedEmptySuccessResponse)
      setup()
      expect(apiCalls.listUsers).toHaveBeenCalledTimes(1)
    })
    it('calls listUsrs api with page 0 and size 3', () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockedEmptySuccessResponse)
      setup()
      expect(apiCalls.listUsers).toHaveBeenCalledWith({ page: 0, size: 3 })
    })
  })
})

console.error = () => {}
