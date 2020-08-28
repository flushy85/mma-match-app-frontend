import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import '../style/DetailsModal.css'
import Container from 'react-bootstrap/Container'
import {  Link, useParams } from 'react-router-dom'
import fighterService from  '../services/fighter-service'
import userService from '../services/user-service'
import { ReactComponent as FistIcon } from '../assets/sports_mma-24px.svg'

function DetailsModal({ data, setData, show, onHide, user, fullName, setMessage, isFavorite, setFavorites, handleSelect, active }) {
  let { fighterId } = useParams()
  
  useEffect(() => {
    if(fullName){
      async function fetchDetails() {
      const details = await fighterService.getOne(fullName.name)
      setData({
        ...details
        })
      }
      fetchDetails()
    }
  }, [fullName])


  const handleAddFavorite = async () => {
    try {
      const newUser = await userService.addFavorite(fullName.id, { user: user.username })
      
      setMessage(`${fullName.name} successfully added to favorites`)
      setFavorites([...newUser.favorites])
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleRemoveFavorite = async () => {
    try {
      const newUser = await userService.removeFavorite(fullName.id, { user: user.username })
      setMessage(`${fullName.name} successfully removed from favorites`)
      setFavorites([...newUser.favorites])
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container fluid>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      {data
        ? <div>
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title  className="fighter-title" id="contained-modal-title-vcenter">
                <h2 >{data.name} "{data.nickname}"</h2>
              </Modal.Title>
                {isFavorite(fullName.id) ? <i style={{ color: "gold", paddingLeft: '10px' }} className="fa fa-star fa-2x"></i> : null}
            </Modal.Header>
            <Modal.Body className="data-card">
              <div className="image-box">
                <Image className="fighter-image" src={`http://www.sherdog.com${data.image_url}`} />
              </div>
              <div className="text-box">
                <p><strong>Age:   </strong>{data.age}</p>
                <p><strong>Birthday:</strong>{data.birthday}</p>
                <p><strong>Hometown:</strong>{data.locality}</p>
                <p><strong>Nationality:</strong>{data.nationality}</p>
                <p><strong>Weight Class:</strong>{data.weight_class}</p>
              </div>
              <div className="modal-button-box">
                {user ? !isFavorite(fullName.id) 
                          ? <Button className="modal-button" variant="danger" onClick={handleAddFavorite}>Favorite</Button>
                          : <Button className="modal-button" variant="dark" onClick={handleRemoveFavorite}>Remove</Button>
                      : null
                }
                <Link className="modal-button" to={`/stats/${fighterId}`} ><Button variant="info">Stats Page</Button></Link>
              </div>
            </Modal.Body>
          </div>
        :  <div>
            <Modal.Body>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Modal.Body>
          </div>
      }
      </Modal>
    </Container>
  )
}

export default DetailsModal