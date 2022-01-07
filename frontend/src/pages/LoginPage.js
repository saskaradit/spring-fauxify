import React from 'react'
import { useState } from 'react'
import Input from '../components/input'

const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [apiError, setaApiError] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)

  const login = () => {
    if (props.actions) {
      const body = {
        username,
        password,
      }
      props.actions.postLogin(body).catch((error) => {
        if (error.response) {
          setaApiError(error.response.data.message)
        }
      })
    }
  }

  const checkField = () => {
    if (username === '' || password === '') {
      setBtnDisabled(true)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Login</h1>
      <div className='col-12 mb-3'>
        <Input
          label='Username'
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value)
            setError('')
            checkField()
          }}
          value={username}
        />
      </div>
      <div className='col-12 mb-3'>
        <Input
          label='Password'
          placeholder='Password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value)
            setError('')
            checkField()
          }}
          value={password}
        />
      </div>
      {apiError !== '' && (
        <div className='col-12 mb-3'>
          <div className='alert alert-danger'>{apiError}</div>
        </div>
      )}
      <div className='text-center'>
        <button
          className='btn btn-primary'
          onClick={login}
          disabled={btnDisabled}
        >
          Login
        </button>
      </div>
    </div>
  )
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
}

export default LoginPage
