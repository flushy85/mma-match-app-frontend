import React from 'react'
import { ReactComponent as FistIcon } from "../assets/sports_mma-24px.svg"

const Home = () => {
  return(
    <div className="logo">
      <h1>MMA MATCH APP</h1>
      <div className="icon-box">
        <FistIcon className="icon"/>
      </div>
    </div>
  )
}
 
export default Home