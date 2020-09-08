import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import MatchButton from './MatchButton'

const Favorites = ({
  firstName,
  lastName,
  rank,
  handleClick,
  location,
  selectFighter,
  id,
  active,
}) => {
  return (
    <tr className='table-row'>
      <td>{rank}</td>
      <td>
        <Link
          className='list-names'
          to={{
            pathname: `/fighters/${firstName}-${lastName}`,
            state: { background: location },
          }}
          onClick={() => selectFighter(`${firstName} ${lastName}`, id)}
        >
          {firstName} {lastName}
        </Link>
      </td>
      <td>
        <MatchButton
          handleClick={handleClick}
          name={`${firstName} ${lastName}`}
          active={active}
        />
      </td>
    </tr>
  )
}

export default Favorites
