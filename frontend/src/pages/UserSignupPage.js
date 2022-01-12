import React, { useState } from 'react'
import { connect } from 'react-redux'
import ButtonProgress from '../components/ButtonProgress'
import Input from '../components/Input'

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
          const body = {
            username,
            password,
          }
          setPendingApi(true)
          props.actions
            .postLogin(body)
            .then((response) => {
              const action = {
                type: 'login-success',
                payload: {
                  ...response.data,
                  password: password,
                },
              }
              props.dispatch(action)
              setPendingApi(false)
              props.history.push('/')
            })
            .catch((error) => {
              if (error.response) {
                setErrors(error.response.data.message)
                setPendingApi(false)
              }
            })
          // setSent(false)
          // props.history.push('/')
        })
        .catch((error) => {
          if (error.response.data && error.response.data.validationErrors) {
            setErrors(error.response.data.validationErrors)
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
            // const errors = { ...errors } || {}
            delete errors.displayName
            setDisplayName(e.target.value)
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
            // const errors = { ...errors }
            delete errors.username
            setUsername(e.target.value)
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
            setMatchPassword(confirmPassword === e.target.value)
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
            setMatchPassword(e.target.value === password)
            delete errors.confirmPassword
            // const errors = { ...errors }
            errors.confirmPassword =
              e.target.value === password ? '' : 'Password does not match'
          }}
          hasError={errors.confirmPassword && true}
          error={errors.confirmPassword}
        />
      </div>
      <div className='text-center'>
        <ButtonProgress
          onClick={submit}
          disabled={sent || !matchPassword}
          text='Sign Up'
          pendingApiCall={sent}
        ></ButtonProgress>
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
  history: {
    push: () => {},
  },
}

export default connect()(UserSignupPage)
