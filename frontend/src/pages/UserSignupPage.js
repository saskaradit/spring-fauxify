import React, { useState } from 'react'

const UserSignupPage = (props) => {
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    if (props.actions) {
      const user = {
        username,
        displayName,
        password,
      }
      setSent(true)
      props.actions.postSignup(user).then((response) => {
        setSent(false)
      })
    }
  }

  return (
    <div className='container col-4'>
      <h1 className='text-center'>Sign Up</h1>
      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Display Name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <button className='btn btn-primary' onClick={submit} disabled={sent}>
          Sign Up
          {sent && (
            <div className='spinner-border text-light spinner-border-sm mr-sm-1'>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
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
