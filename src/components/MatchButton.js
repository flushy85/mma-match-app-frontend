import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { ReactComponent as FistIcon } from '../assets/sports_mma-24px.svg'

const MatchButton = ({ handleClick, name, active }) => {
  return (
    <div>
      <Button
        disabled={active && active.length === 2 ? true : false}
        size='sm'
        variant='light'
        onClick={() => {
          handleClick(name)
        }}
      >
        <FistIcon />
      </Button>
    </div>
  )
}

export default MatchButton
