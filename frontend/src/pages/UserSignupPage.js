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
    <div className='container'>
      <h1 className='text-center'>Sign Up</h1>
      <div className='col-12 mb-3'>
        <label>Display Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='Display Name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className='col-12 mb-3'>
        <label>Username</label>
        <input
          className='form-control'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='col-12 mb-3'>
        <label>Password</label>
        <input
          className='form-control'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='col-12 mb-3'>
        <label>Confirm Password</label>
        <input
          className='form-control'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <button className='btn btn-primary' onClick={submit}>
          Sign Up
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
