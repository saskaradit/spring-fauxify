import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const logout = () => {
    const action = {
      type: 'logout-success',
    }
    props.dispatch(action)
  }

  let links = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/signup'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  )
  if (props.user.isLoggedIn) {
    links = (
      <ul className='nav navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link
            to={`/${props.user.username}`}
            className='nav-link'
            style={{ cursor: 'pointer' }}
          >
            My Profile
          </Link>
          <li className='nav-item nav-link' onClick={logout}>
            Logout
          </li>
        </li>
      </ul>
    )
  }
  return (
    <div className='bg-white shadow-sm mb-2'>
      <div className='container'>
        <nav className='navbar navbar-light navbar-expand'>
          <Link to='/' className='navbar-brand'>
            <h4>Fauxify</h4>
          </Link>
          {links}
        </nav>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state }
}

export default connect(mapStateToProps)(Navbar)
