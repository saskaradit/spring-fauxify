import React from 'react'
import { render, waitFor } from '@testing-library/react'
import UserListItem from './UserListItem'
const user = {
  username: 'user1',
  displayName: 'display1',
  image: 'profile1.png',
}

describe('UserListItem', () => {
  it('has image', () => {
    const { container } = render(<UserListItem user={user} />)
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
  })
  it('displays default image', () => {
    const userWithoutImage = {
      ...user,
      image: undefined,
    }
    const { container } = render(<UserListItem user={userWithoutImage} />)
    const image = container.querySelector('img')
    expect(image).toContain('./profile.png')
  })
  it('displays users image', () => {
    const { container } = render(<UserListItem user={user} />)
    const image = container.querySelector('img')
    expect(image).toContain('/image/profile/' + user.image)
  })
})
