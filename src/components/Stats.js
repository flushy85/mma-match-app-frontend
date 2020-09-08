import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import '../style/Stats.css'
import BarChart from './Barchart'

const Stats = ({ data }) => {
  let { fighterId } = useParams()
  let history = useHistory()
  const [event, setEvent] = useState(null)
  const [hide, setHide] = useState(true)

  const selectFight = (e) => {
    if (e === event) {
      setHide(!hide)
    } else {
      setHide(false)
      setEvent(e)
    }
  }
  const winStreak = () => {
    let count = 0
    for (let i = 0; i < data.fights.length; i++) {
      if (data.fights[i].result === 'win') {
        count += 1
      } else {
        break
      }
    }
    return count
  }

  const fightList = () => {
    let recentFights = data.fights
    if (recentFights.length > 9) {
      recentFights = data.fights.slice(0, 9)
    }
    return recentFights.map((fight, id) => (
      <div className='list-item' key={id}>
        <ListGroup.Item
          onClick={() => selectFight(fight)}
          action
          className={
            fight.result === 'win'
              ? 'list-item-win'
              : fight.result === 'loss'
              ? 'list-item-loss'
              : 'warning'
          }
        >
          {fight.result === 'win' ? 'W' : 'L'}
        </ListGroup.Item>
      </div>
    ))
  }

  if (!data) {
    return (
      <div className='page-container' style={{ color: 'white' }}>
        <h1 className='noData-msg'>
          No data, please select fighter from main list.
        </h1>
      </div>
    )
  } else {
    const winsArr = [
      { type: 'KOs', value: data.wins.knockouts, win: true },
      { type: 'Subs', value: data.wins.submissions, win: true },
      { type: 'Decs', value: data.wins.decisions, win: true },
    ]
    const lossesArr = [
      { type: 'KOs', value: 10, win: false },
      { type: 'Subs', value: data.losses.submissions, win: false },
      { type: 'Decs', value: data.losses.decisions, win: false },
    ]
    console.log(event)
    return (
      <div className='page-container'>
        <h1 className='page-title'>{fighterId}</h1>
        <div>
          <p>
            <strong>Height:</strong>
            {data.height}
          </p>
          <p>
            <strong>Weight:</strong>
            {data.weight}
          </p>
          <p>
            <strong>Record:</strong>
            {data.wins.total}-{data.losses.total}-
            {data.draws ? data.draws.total : 0}
            {data.no_contests ? `(${data.no_contests} NC)` : null}
          </p>
          <p>
            <strong>Win Streak:</strong>
            {winStreak()}
          </p>
        </div>
        <div className={hide ? 'events-box-closed' : 'events-box-open'}>
          <h1>Recent Fights</h1>
          <ListGroup className='fight-list' horizontal>
            {fightList()}
          </ListGroup>
          {event ? (
            <div className='event-box'>
              <h3>{event.date}</h3>
              vs<h4>{event.opponent}</h4>
              <p>
                <b>{event.result}</b> in round number <b>{event.round}</b> by{' '}
                <b>{event.method}</b>
              </p>
            </div>
          ) : null}
        </div>
        <div className='barchart-container'>
          <BarChart data={winsArr} />
          <BarChart data={lossesArr} />
        </div>
        <Button onClick={() => history.goBack()} variant='dark'>
          Back
        </Button>
      </div>
    )
  }
}

export default Stats

/*

'wins': {
            'total': 23,
            'knockouts': 18,
            'submissions': 1,
            'decisions': 4,
            'others': 0
        },


<div className="stat-box-container">
            <div className="stat-box">
              <h3>wins</h3>
              <h3>{data.wins.total}</h3>
              KO: {data.wins.knockouts} Sub: {data.wins.submissions} Dec: {data.wins.decisions} Other: {data.wins.others}
            </div>
            <div className="stat-box">
              <h3>losses</h3>
              <h3>{data.losses.total}</h3>
              KO: {data.losses.knockouts} Sub: {data.losses.submissions} Dec: {data.losses.decisions} Other: {data.losses.others}
            </div>

            */
