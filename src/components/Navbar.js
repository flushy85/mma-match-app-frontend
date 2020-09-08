import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../style/Navbar.css'
import { ReactComponent as FistIcon } from '../assets/sports_mma-24px.svg'
import { Link } from 'react-router-dom'

const NavigationBar = ({ user, handleLogout }) => {
  const [show, setShow] = useState(false)

  return (
    <Navbar
      className='navbar'
      bg='light'
      variant='light'
      expand='lg'
      fixed='top'
    >
      <Link to='/'>
        <Navbar.Brand className='brand'>
          MMApp
          <FistIcon className='nav-icon' />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {user ? (
          <Nav className='mr-auto'>
            <Link to='/fighters' className='nav-link'>
              Fighters
            </Link>
            <Link to={`/user/${user.username}`} className='nav-link'>
              Profile
            </Link>
            <Link to='/' onClick={handleLogout} className='nav-link'>
              Logout
            </Link>
          </Nav>
        ) : null}
      </Navbar.Collapse>
      {user ? (
        <Navbar.Text>
          Signed in as:{' '}
          <Link to={`/user/${user.username}`}>{user.username}</Link>
        </Navbar.Text>
      ) : (
        <Nav className='mr-auto'>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </Nav>
      )}
    </Navbar>
  )
}

export default NavigationBar
