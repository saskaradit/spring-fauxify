import React, { useState } from 'react'

const UserSignupPage = (props) => {
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const submit = () => {
    if (props.actions) {
      props.actions.postSignup()
      const user = {
        username,
        displayName,
        password,
      }
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type='text'
          placeholder='Display Name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={submit}>Sign Up</button>
      </div>
    </div>
  )
}

// UserSignupPage.defaultProps = {
//   actions: {
//     postSignup: () =>
//       new Promise((resolve, reject) => {
//         resolve({})
//       }),
//   },
// }

export default UserSignupPage
