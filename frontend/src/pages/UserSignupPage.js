import React, { useEffect, useState } from 'react'
import Input from '../components/input'

const UserSignupPage = (props) => {
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState(true)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const submit = () => {
    if (props.actions) {
      const user = {
        username,
        displayName,
        password,
      }
      setSent(true)
      props.actions
        .postSignup(user)
        .then((response) => {
          setSent(false)
        })
        .catch((apiError) => {
          if (
            apiError.response.data &&
            apiError.response.data.validationErrors
          ) {
            setErrors(apiError.response.data.validationErrors)
          }
          setSent(false)
        })
    }
  }

  return (
    <div className='container col-4'>
      <h1 className='text-center'>Sign Up</h1>
      <div className='mb-3'>
        <Input
          label='Display Name'
          type='text'
          placeholder='Display Name'
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value)
            const errors = { ...errors }
            delete errors.displayName
            setDisplayName(value)
            setErrors(errors)
          }}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className='mb-3'>
        <Input
          label='Username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            const errors = { ...errors }
            delete errors.username
            setUsername(value)
            setErrors(errors)
          }}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className='mb-3'>
        <Input
          label='Password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setMatchPassword(confirmPassword === password)
            const errors = { ...errors }
            delete errors.username
            errors.confirmPassword = matchPassword
              ? ''
              : 'Password does not match'
          }}
          hasError={errors.password && true}
          error={errors.password}
        />
      </div>
      <div className='mb-3'>
        <Input
          label='Confirm Password'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setMatchPassword(confirmPassword === password)
            delete errors.username
            const errors = { ...errors }
            errors.confirmPassword = matchPassword
              ? ''
              : 'Password does not match'
          }}
          hasError={errors.confirmPassword && true}
          error={errors.confirmPassword}
        />
      </div>
      <div className='text-center'>
        <button
          className='btn btn-primary'
          onClick={submit}
          disabled={sent || !matchPassword}
        >
          Sign Up
          {sent && (
            <div className='spinner-border text-light spinner-border-sm mr-sm-1'>
              <span className='sr-only'> </span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({})
      }),
  },
}

export default UserSignupPage
