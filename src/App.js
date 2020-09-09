import React, { useState, useEffect } from 'react'
import NavigationBar from './components/Navbar'
import './style/App.css'
import Fighters from './components/Fighters'
import Login from './components/Login'
import Stats from './components/Stats'
import Match from './components/Match'
import Profile from './components/Profile'
import Home from './components/Home'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom'
import userService from './services/user-service'
import DetailsModal from './components/DetailsModal'

function App() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}
const ModalSwitch = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [fullName, setFullName] = useState({})
  const [message, setMessage] = useState('')
  const [favorites, setFavorites] = useState(null)
  const [active, setActive] = useState([])

  let location = useLocation()
  let history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])

  const isFavorite = (fighterId) => {
    if (favorites) {
      let f = false
      favorites.forEach((fav) => {
        if (fav.id === fighterId) {
          return (f = true)
        }
      })
      return f
    }
  }

  const handleLogout = () => {
    userService.setToken(null)
    localStorage.clear()
    window.location.href = '/'
  }

  const selectFighter = (name, id) => {
    if (fullName.id !== id) {
      setData(null)
      setFullName({ name, id })
    }
    setModalShow(true)
  }

  const handleHide = () => {
    history.goBack()
    setModalShow(false)
  }

  const handleSelect = (data) => {
    if (active.length === 0) {
      setActive([data.name])
    } else if (active.length === 1) {
      setActive(active.concat(data.name))
    }
    setModalShow(false)
  }
  let background = location.state && location.state.background

  return (
    <div className='app-container'>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Notification message={message} />
      <Switch location={background || location}>
        <Route
          path='/user/:userId'
          children={
            <Profile
              user={user}
              setModalShow={setModalShow}
              selectFighter={selectFighter}
              favorites={favorites}
              setFavorites={setFavorites}
              active={active}
              setActive={setActive}
            />
          }
        />
        <Route
          path={`/Match/:fightersId`}
          children={<Match active={active} setActive={setActive} />}
        />
        <Route path='/stats/:fighterId' children={<Stats data={data} />} />
        <Route
          path='/login'
          children={<Login setUser={setUser} setMessage={setMessage} />}
        />
        <Route
          path={`/fighters`}
          children={
            <Fighters
              selectFighter={selectFighter}
              user={user}
              isFavorite={isFavorite}
              active={active}
              setActive={setActive}
            />
          }
        />
        <Route path={`/`} children={<Home />} />
      </Switch>
      {background && (
        <Route
          path='/fighters/:fighterId'
          children={
            <DetailsModal
              data={data}
              setData={setData}
              fullName={fullName}
              show={modalShow}
              id={fullName.id}
              user={user}
              onHide={() => handleHide()}
              setMessage={setMessage}
              setFavorites={setFavorites}
              isFavorite={isFavorite}
              handleSelect={handleSelect}
              active={active}
            />
          }
        />
      )}
    </div>
  )
}

export default App
