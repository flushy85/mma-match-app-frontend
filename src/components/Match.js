import React, { useEffect, useState } from 'react'
import fighterService from '../services/fighter-service'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import '../style/Match.css'
import { useHistory } from 'react-router-dom'
import handicapService from '../services/handicap-service'

const CompareBar = ({name, value}) => {
  
  
  return (
    <div className="compare-box">
      <ProgressBar>
        <ProgressBar  now={value} key={1} />
        <ProgressBar  variant="danger" now={100 - value} key={2} />
      </ProgressBar>
      {name}
    </div>
  )
}


const Match = ({active, setActive}) => {
  const [fighter, setFighter] = useState(null)
  const [handicap, setHandicap] = useState(null)
  const [handicapTotal, setHandicapTotal] = useState(50)
  
  const fighterA = active[0]
  const fighterB = active[1]

  const history= useHistory()


  useEffect(() => {
    
    async function fetchDetails(a, b) {
      const detailsA = await fighterService.getOne(a)
      const detailsB = await fighterService.getOne(b)
      
      const ageA = handicapService.getAgeHandicap(detailsA)
      const ageB = handicapService.getAgeHandicap(detailsB)
      
      const streakA = handicapService.getStreakHandicap(detailsA)
      const streakB = handicapService.getStreakHandicap(detailsB)
      
      const knockOutA = handicapService.getKoHandicap(detailsA)
      const knockOutB = handicapService.getKoHandicap(detailsB)

      const submissionA = handicapService.getSubHandicap(detailsA)
      const submissionB = handicapService.getSubHandicap(detailsB)
      
      const ageCap = 50 - ageA + ageB
      const streakCap = 50 + streakA - streakB
      const koCap = 50 + knockOutA - knockOutB
      const subCap = 50 + submissionA - submissionB
      const totalCap = Math.round((ageCap + streakCap + koCap + subCap) / 4)
      
      setHandicap([
        {name: 'Age', value: ageCap},
        {name: 'Win/Loss Streak', value: streakCap},
        {name: 'Knockout', value: koCap},
        {name: 'Submission', value: subCap}      
      ])

      setHandicapTotal(totalCap)
      setFighter([
        { name: detailsA.name, image: detailsA.image_url},
        { name: detailsB.name, image: detailsB.image_url}
    ])
    }
    fetchDetails(fighterA, fighterB)
  }, [])
  

  if(fighter && handicap){
    return (
      <div className="page-container">
        <div className="match-image-box">
          <Image id="fighterA-image" className="match-image" src={`http://www.sherdog.com${fighter[0].image}`} />
          <Image id="fighterB-image" className="match-image" src={`http://www.sherdog.com${fighter[1].image}`} />
        </div>
        <h3>{fighter[0].name} Vs {fighter[1].name}</h3>
        <div className="compare-box-wrapper">
          {handicap.map((h, index) => (
            <CompareBar
              key={index}
              name={h.name}
              value={h.value}

            />
          ))}
          <div className="compare-box">
            <ProgressBar className="total-bar-wrapper">
              <ProgressBar  className="total-bar" now={50} key={1} />
              <ProgressBar  className="total-bar" variant="danger" now={50} key={2} />
            </ProgressBar>
          </div>
          <div id="fighterA-percent">
          <h3>{handicapTotal}%</h3>
          </div>
          <Button onClick={() => history.goBack()} variant="dark">return</Button>
          <div id="fighterB-percent">
          <h3>{100 - handicapTotal}%</h3>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>   
    )
  }
}

export default Match