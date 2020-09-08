import React, { useState, useEffect } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Favorites from '../components/Favorites'
import Button from 'react-bootstrap/Button'
import userService from '../services/user-service'
import { Link, useParams } from 'react-router-dom'
import '../style/Profile.css'

const Profile = ({
  user,
  selectFighter,
  setFavorites,
  favorites,
  active,
  setActive,
}) => {
  useEffect(() => {
    userService.getOne(user.id).then((data) => setFavorites(data.favorites))
  }, [user])

  let { url } = useRouteMatch()
  let location = useLocation()

  const handleClick = (fighter) => {
    setActive(active.concat(fighter))
  }
  if (!favorites) {
    return (
      <div className='page-container'>
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading favorites...</span>
        </Spinner>
      </div>
    )
  } else {
    return (
      <div className='page-container'>
        <div className='match-container'>
          <h2 className='match-title'>Match Up</h2>
          <Button
            className='clear-button'
            disabled={active.length >= 1 ? false : true}
            variant='info'
            onClick={() => setActive([])}
          >
            Clear
          </Button>
          <div className='match-box-container'>
            <div className={active[0] ? 'match-box active' : 'match-box'}>
              {active[0] ? active[0] : null}
            </div>
            <p className='match-text'>Vs</p>
            <div className={active[1] ? 'match-box active' : 'match-box'}>
              {active[1] ? active[1] : null}
            </div>
          </div>

          <Link to={`/Match/${active[0]}-${active[1]}`}>
            <Button
              className='match-button'
              disabled={active.length === 2 ? false : true}
              variant='danger'
            >
              Match!
            </Button>
          </Link>
        </div>
        {favorites.length >= 1 ? (
          <Table striped responsive className='name-table'>
            <thead>
              <tr>
                <th></th>
                <th>Favorites</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav, index) => (
                <Favorites
                  key={index}
                  id={fav.id}
                  index={index}
                  firstName={fav.firstName}
                  lastName={fav.lastName}
                  rank={fav.rank}
                  handleClick={handleClick}
                  location={location}
                  selectFighter={selectFighter}
                  active={active}
                />
              ))}
            </tbody>
          </Table>
        ) : (
          'Add Favorites from Fighters List'
        )}
      </div>
    )
  }
}

export default Profile
