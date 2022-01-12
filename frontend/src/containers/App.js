import React from 'react'
import UserSignupPage from '../pages/UserSignupPage'
import Home from '../pages/Home'
import { Route, Switch } from 'react-router-dom'
import Profile from '../pages/Profile'
import LoginPage from '../pages/LoginPage'
import Navbar from '../components/Navbar'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={UserSignupPage} />
          <Route path='/profile/:username' component={Profile} />
        </Switch>
      </div>
    </div>
  )
}

export default App
