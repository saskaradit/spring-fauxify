import React from 'react'
import UserSignupPage from '../pages/UserSignupPage'
import Home from '../pages/Home'
import { Route, Switch } from 'react-router-dom'
import Profile from '../pages/Profile'
import LoginPage from '../pages/LoginPage'
import * as apiCalls from '../api/apiCalls'
import Navbar from '../components/Navbar'

const actions = {
  postLogin: apiCalls.login,
  postSignup: apiCalls.signup,
}

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            path='/login'
            component={(props) => <LoginPage {...props} actions={actions} />}
          />
          <Route
            path='/signup'
            component={(props) => (
              <UserSignupPage {...props} actions={actions} />
            )}
          />
          <Route path='/profile/:username' component={Profile} />
        </Switch>
      </div>
    </div>
  )
}

export default App
