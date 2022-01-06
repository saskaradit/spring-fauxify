import React from 'react'
import { useState } from 'react'
import Input from '../components/input'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='container'>
      <h1 className='text-center'>Login</h1>
      <div className='col-12 mb-3'>
        <Input
          label='Username'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          value={e.target.value}
        />
      </div>
      <div className='col-12 mb-3'>
        <Input
          label='Password'
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={e.target.value}
        />
      </div>
      <div className='text-center'>
        <button className='btn btn-primary'>Login</button>
      </div>
    </div>
  )
}

export default LoginPage
