import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import UserList from './UserList'
import * as apiCalls from '../api/apiCalls'
import { MemoryRouter } from 'react-router-dom'

const setup = () => {
  return render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  )
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
const mockSuccessGetMultiPage = {
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
    last: false,
    size: 3,
    totalPages: 2,
  },
}
const mockSuccessGetMultiPageLast = {
  data: {
    content: [
      {
        username: 'user4',
        display: 'display4',
        image: '',
      },
    ],
    number: 0,
    first: false,
    last: true,
    size: 3,
    totalPages: 2,
  },
}

const mockFailGet = {
  response: {
    data: {
      message: 'Error loading the user',
    },
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
    it('displays the next button', async () => {
      apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetMultiPage)

      const { findByText } = setup()
      const nextLink = await waitFor(() => {
        findByText('Next')
      })
      expect(nextLink).toBeInTheDocument()
    })
    it('hides the next button when on the last page', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPageLast)

      const { findByText } = setup()
      const nextLink = await waitFor(() => {
        findByText('Next')
      })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('displays the prev button when not on the first page', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPageLast)

      const { findByText } = setup()
      const prevLink = await waitFor(() => {
        findByText('Prev')
      })
      expect(prevLink).toBeInTheDocument()
    })
    it('hides the prev button when on the first page', async () => {
      apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetMultiPage)

      const { findByText } = setup()
      const prevLink = await waitFor(() => {
        findByText('Prev')
      })
      expect(prevLink).not.toBeInTheDocument()
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
  describe('Interactions', () => {
    it('loads next ', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPage)
        .mockResolvedValue(mockSuccessGetMultiPageLast)

      const { findByText } = setup()
      const nextLink = await waitFor(() => {
        findByText('Next')
      })
      fireEvent.click(nextLink)
      const lastUser = await findByText('display4@user4')
      expect(lastUser).toBeInTheDocument()
    })
    it('loads prev ', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPageLast)
        .mockResolvedValue(mockSuccessGetMultiPage)

      const { findByText } = setup()
      const prevLink = await waitFor(() => {
        findByText('prev')
      })
      fireEvent.click(prevLink)
      const firstUser = await findByText('display4@user4')
      expect(firstUser).toBeInTheDocument()
    })
    it('displays errr when loading other page ', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPageLast)
        .mockResolvedValue(mockFailGet)

      const { findByText } = setup()
      const prevLink = await waitFor(() => {
        findByText('prev')
      })
      fireEvent.click(prevLink)
      const err = await findByText('Error loading the user')
      expect(err).toBeInTheDocument()
    })
    it('hides errr when loading other page ', async () => {
      apiCalls.listUsers = jest
        .fn()
        .mockResolvedValue(mockSuccessGetMultiPageLast)
        .mockResolvedValue(mockFailGet)
        .mockResolvedValue(mockSuccessGetMultiPage)

      const { findByText } = setup()
      const prevLink = await waitFor(() => {
        findByText('prev')
      })
      fireEvent.click(prevLink)
      const err = await findByText('Error loading the user')
      expect(err).not.toBeInTheDocument()
    })
    it('link to userPage', async () => {
      apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetSinglePage)

      const { findByText, container } = setup()
      await findByText('display1@user1')
      const firstAnchor = container.querySelector('a')[0]
      expect(firstAnchor.getAttributes('href')).toBe('/user1')
    })
  })
})

console.error = () => {}
