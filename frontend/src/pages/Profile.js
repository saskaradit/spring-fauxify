import React, { useEffect, useState } from 'react'
import * as apiCalls from '../api/apiCalls'

const Profile = (props) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const username = props.match.params.username
    if (!username) return
    apiCalls.getUser().then((response) => {
      setUser(response.data)
    })
  }, [props.match.params.username])

  return (
    <div data-testid='profile'>
      {user && <span>{`${user.displayName}@${user.usename}`}</span>}
    </div>
  )
}

Profile.defaultProps = {
  match: {
    params: {},
  },
}

export default Profile
