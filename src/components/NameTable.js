import React from 'react'
import Table from 'react-bootstrap/Table'
import Fighter from './Fighter'

const NameTable = ({ nameList, selectFighter, location, filter, index, weightClasses, isFavorite }) => {
  
  const regex = new RegExp(`${filter}`, 'i')  
  const fighters = nameList.filter((fighter) => fighter.firstName.match(regex) || fighter.lastName.match(regex))
  
  if(fighters.length === 0){
    return (
      null
    )
  }
  
  return (
    <div style={
      {display: weightClasses[index].show ? "block" : "none"}
    }>
      <h2 className="weight-title">{weightClasses[index].weight}</h2>
      <Table 
        striped 
        responsive 
        className="name-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th className="fighters-list-text">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fighters.map((f, index) => (
            <Fighter
              id={f.id} 
              key={index}
              firstName={f.firstName}
              lastName={f.lastName}
              rank={f.rank}
              weightClass={f.weight}
              selectFighter={selectFighter}
              location={location}
              isFavorite={isFavorite}
            />
          ))}
        </tbody>
      </Table>
      </div>
  )
}

export default NameTable
