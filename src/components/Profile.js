import React, { useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Favorites from '../components/Favorites'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import {  Link, useParams } from 'react-router-dom'
import '../style/Profile.css'

const Profile = ({ user, selectFighter, favorites, active, setActive }) => {
  
  
  let { url } = useRouteMatch()
  let location = useLocation()
   
  const handleClick = (fighter, selected) => {
    if(selected){
      
      active[0] === fighter
        ? setActive(active.slice(1))
        : setActive(active.slice(0,1))
    }
    else if (active.length < 2){
      setActive(active.concat(fighter))  
    }
  }

  if(!favorites){
    return (
      <div>
        Loading favorites...
      </div>
    )
    
  } else {
    return (
      <div className="page-container">
        <h1 className="page-title">Match Up</h1>  
        <div className="match-container">
          <div className="match-box-container">
            <div  className="match-box">{active[0] ? active[0] : null}</div>
            <p className="match-text">Vs</p>
            <div  className="match-box">{active[1] ? active[1] : null}</div>
          </div>  
          <Link to={`/Match/${active[0]}-${active[1]}`}>
            <Button className="match-button" disabled={active.length === 2 ? false : true} variant="danger">Match!</Button>
          </Link>
        </div>  
        {favorites.length >= 1
          ? <Table 
              striped 
              responsive
              className="name-table"
            >
            <thead>
              <tr>
                <th>Name</th>
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
                  handleClick={handleClick}
                  location={location}
                  selectFighter={selectFighter}
                  active={active}
                />
              ))}
            </tbody>
          </Table>
          : "Add Favorites from Fighters List"
        }
      </div>
    )
  }
}

export default Profile