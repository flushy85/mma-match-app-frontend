import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message }) => {
  console.log(message)
  if(!message){
    return (
      null
    )
  } else {
    return (
      <Alert className="notification" variant="success">
        {message}
      </Alert>
    )
  }
  
  
}

export default Notification