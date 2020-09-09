import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../style/login.css'
import loginService from '../services/login'
import userService from '../services/user-service'
import { useHistory } from 'react-router-dom'

const Login = ({ setUser, setMessage }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUserName('')
      setPassword('')

      userService.setToken(user.token)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      setUser({
        name: user.name,
        username: user.username,
        id: user.id,
        favorites: user.favorites,
      })
      //need to change window.location to use react-router
      history.push(`/user/${user.username}`)
    } catch (exception) {
      console.log('wrong credentials')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <Form onSubmit={handleLogin} className='login-form'>
        <h3 className='form-title'>Login</h3>
        <Form.Group controlId='formBasicUserName'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserName(target.value)}
            type='username'
            placeholder='Enter username'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={({ target }) => setPassword(target.value)}
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'></Form.Group>
        <Button variant='dark' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
