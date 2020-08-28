import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'


const Fighter = ({ firstName, lastName, rank, selectFighter, location, isFavorite, id }) => {
  let { url } = useRouteMatch()  
  
  return (
    <tr className="table-row">
      <td>
        {rank}
      </td>  
      <td>
        <Link className="list-names"
          to={{
            pathname: `${url}/${firstName}-${lastName}`,
            state: { background: location }
          }} 
          onClick={
            () => selectFighter(`${firstName} ${lastName}`, id)
          }>
          <div className="fighters-list-text">
            {firstName} {lastName}
          </div>      
        </Link>
      </td>
      <td>
      {isFavorite(id) ? <i style={{ color: "gold" }} className="fa fa-star"></i> : null}
      </td>
    </tr>  
  )
}

export default Fighter