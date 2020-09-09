import React, { useEffect, useState } from 'react'
import fighterService from '../services/fighter-service'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import '../style/Match.css'
import { useHistory } from 'react-router-dom'
import handicapService from '../services/handicap-service'

const CompareBar = ({ name, value }) => {
  return (
    <div className='compare-box'>
      <ProgressBar>
        <ProgressBar className='progress' now={value} key={1} />
        <ProgressBar className='danger' now={100 - value} key={2} />
      </ProgressBar>
      {name}
    </div>
  )
}

const Match = ({ active }) => {
  const [fighters, setFighters] = useState(null)
  const [handicap, setHandicap] = useState(null)
  const [handicapTotal, setHandicapTotal] = useState(50)

  const fighterA = active[0]
  const fighterB = active[1]

  const history = useHistory()

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
        { name: 'Age', value: ageCap },
        { name: 'Win/Loss Streak', value: streakCap },
        { name: 'Knockout', value: koCap },
        { name: 'Submission', value: subCap },
      ])

      setHandicapTotal(totalCap)
      setFighters([
        { name: detailsA.name, image: detailsA.image_url },
        { name: detailsB.name, image: detailsB.image_url },
      ])
    }
    fetchDetails(fighterA, fighterB)
  }, [fighterA, fighterB])

  if (fighters && handicap) {
    return (
      <div className='page-container'>
        <div className='match-image-box'>
          <div className='match-image-boxA'>
            {}
            <Image
              id='fighterA-image'
              className='match-image'
              src={`http://www.sherdog.com${fighters[0].image}`}
            />
            <h2 className='fighter-name'>{fighters[0].name}</h2>
          </div>
          <h1>Vs</h1>
          <div className='match-image-boxB'>
            <Image
              id='fighterB-image'
              className='match-image'
              src={`http://www.sherdog.com${fighters[1].image}`}
            />
            <h2 className='fighter-name'>{fighters[1].name}</h2>
          </div>
        </div>
        <div className='compare-box-wrapper'>
          {handicap.map((h, index) => (
            <CompareBar key={index} name={h.name} value={h.value} />
          ))}
          <div className='main-compare-box'>
            <ProgressBar className='total-bar-wrapper'>
              <ProgressBar className='total-bar progress' now={50} key={1} />
              <ProgressBar className='total-bar danger' now={50} key={2} />
            </ProgressBar>
          </div>
          <div id='fighterA-percent'>
            <h3>{handicapTotal}%</h3>
          </div>
          <div id='fighterB-percent'>
            <h3>{100 - handicapTotal}%</h3>
          </div>
        </div>
        <Button
          className='back-button'
          onClick={() => history.goBack()}
          variant='dark'
        >
          Back
        </Button>
      </div>
    )
  } else {
    return (
      <div
        className='page-container'
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading fighters...</span>
        </Spinner>
      </div>
    )
  }
}

export default Match
