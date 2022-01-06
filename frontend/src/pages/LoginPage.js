import React from 'react'
import Input from '../components/input'

const LoginPage = () => {
  return (
    <div className='container'>
      <h1 className='text-center'>Login</h1>
      <div className='col-12 mb-3'>
        <Input label='Username' placeholder='Username' />
      </div>
      <div className='col-12 mb-3'>
        <Input label='Password' placeholder='Password' type='password' />
      </div>
      <div className='text-center'>
        <button className='btn btn-primary'>Login</button>
      </div>
    </div>
  )
}

export default LoginPage
