import React from 'react'
import './App.css'
import UserSignupPage from './pages/UserSignupPage'
import LoginPage from './pages/LoginPage'
import * as apiCalls from './api/apiCalls'

const actions = {
  postSignup: apiCalls.signup,
}

function App() {
  return (
    <div className='App'>
      <UserSignupPage actions={actions} />
      <LoginPage />
    </div>
  )
}

export default App
