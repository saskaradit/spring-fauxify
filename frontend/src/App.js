import React from 'react'
import './App.css'
import UserSignupPage from './pages/UserSignupPage'
import LoginPage from './pages/LoginPage'
import * as apiCalls from './api/apiCalls'

const actions = {
  postSignup: apiCalls.signup,
}
const logActions = {
  postLogin: apiCalls.login,
}

function App() {
  return (
    <div className='App'>
      <UserSignupPage actions={actions} />
      <LoginPage actions={logActions} />
    </div>
  )
}

export default App
