import React from 'react'
import Form from 'react-bootstrap/Form'

const Checkbox = ({ weight, handleChange }) => {
  
  return (
    <div className="checkbox-item">
      <Form.Check
        className="checkbox"
        inline
        defaultChecked={true}
        onChange={handleChange}
        type="checkbox"
        id={`${weight}`}
        label={`${weight}`}/>
    </div>
  )
}

export default Checkbox