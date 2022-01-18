import React, { useEffect, useState } from 'react'
import * as apiCalls from '../api/apiCalls'

const Profile = (props) => {
  const [user, setUser] = useState(undefined)
  const [userNotFound, setUserNotFound] = useState(false)

  useEffect(() => {
    const loadUser = () => {
      const username = props.match.params.username
      if (!username) {
        return
      }
      apiCalls
        .getUser(username)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          setUserNotFound(true)
        })
    }
    loadUser()
  }, [props.match.params.username])

  if (userNotFound) {
    return (
      <div className='alert alert-danger text-center'>
        <h5>User not found</h5>
      </div>
    )
  }
  return (
    <div data-testid='profile'>
      {user && <span>{`${user.displayName}@${user.username}`}</span>}
    </div>
  )
}

Profile.defaultProps = {
  match: {
    params: {},
  },
}

export default Profile
