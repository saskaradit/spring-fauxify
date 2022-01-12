import React, { useState } from 'react'
import { connect } from 'react-redux'
import ButtonProgress from '../components/ButtonProgress'
import Input from '../components/Input'
import * as authActions from '../redux/authActions'

const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [apiError, setApiError] = useState('')
  const [pendingApi, setPendingApi] = useState(false)

  const login = () => {
    const body = {
      username,
      password,
    }
    setPendingApi(true)
    props.actions
      .postLogin(body)
      .then((response) => {
        props.dispatch(
          authActions.loginSuccess({
            ...response.data,
            password: password,
          })
        )
        setPendingApi(false)
        props.history.push('/')
      })
      .catch((error) => {
        if (error.response) {
          setApiError(error.response.data.message)
          setPendingApi(false)
        }
      })
  }

  let disableSubmit = false
  if (username === '') {
    disableSubmit = true
  }
  if (password === '') {
    disableSubmit = true
  }

  return (
    <div className='container col-4'>
      <h1 className='text-center'>Login</h1>
      <div className='col-12 mb-3'>
        <Input
          label='Username'
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value)
            setApiError('')
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
            setApiError('')
          }}
          value={password}
        />
      </div>
      {apiError && (
        <div className='col-12 mb-3'>
          <div className='alert alert-danger'>{apiError}</div>
        </div>
      )}
      <div className='text-center'>
        <ButtonProgress
          onClick={login}
          disabled={disableSubmit || pendingApi}
          pendingApiCall={pendingApi}
          text='Login'
        ></ButtonProgress>
      </div>
    </div>
  )
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => {},
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)
