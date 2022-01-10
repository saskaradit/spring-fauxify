import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-white shadow-sm mb-2'>
      <div className='container'>
        <nav className='navbar navbar-light navbar-expand'>
          <Link to='/' className='navbar-brand'>
            <h4>Fauxify</h4>
          </Link>
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
        </nav>
      </div>
    </div>
  )
}

export default Navbar
