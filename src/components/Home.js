import React from 'react'
import { ReactComponent as FistIcon } from '../assets/sports_mma-24px.svg'

const Home = () => {
  return (
    <>
      <div className='logo'>
        <h1>MMA MATCH APP</h1>
        <div className='icon-box'>
          <FistIcon className='icon' />
        </div>
      </div>
      <footer>
        <p className='footer-text'>Designed and Created by Greg Burdick 2020</p>
        <div className='link-button-container'>
          <div className='link-button'>
            <a href='placeholder.com'>
              <i className=' link-button fa fa-github-square fa-lg'></i>
            </a>
          </div>
          <div className='link-button'>
            <a href='placeholder.com'>
              <i className='link-button fa fa-envelope-square fa-lg'></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
