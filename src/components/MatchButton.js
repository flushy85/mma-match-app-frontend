import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { ReactComponent as FistIcon } from '../assets/sports_mma-24px.svg'

const MatchButton = ({handleClick, name, active}) => {
  const [selected, setSelected] = useState(false)

  return (
    <div>
      <Button disabled={active && (active.length === 2 && !selected) ? true : false}className={selected ? 'button-false' : 'button-true'}size="sm" variant="light" onClick={() => {handleClick(name, selected); setSelected(!selected)}}><FistIcon/></Button>
    </div>
  )
}

export default MatchButton