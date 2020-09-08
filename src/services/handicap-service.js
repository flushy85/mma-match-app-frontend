const getAgeHandicap = (data) => {
  let age = parseInt(data.age)
  let ageGap = (30 - age) * -1 * 4
  return ageGap
}

const getStreakHandicap = (data) => {
  let winStreak = 0
  let lossStreak = 0
  for (let i = 0; i < data.fights.length; i++) {
    if (data.fights[i].result === 'win') {
      winStreak++
    } else {
      break
    }
  }
  if (winStreak === 0) {
    for (let i = 0; i < data.fights.length; i++) {
      if (data.fights[i].result === 'loss') {
        lossStreak++
      } else {
        break
      }
    }
    return lossStreak * 2 < 10 ? -(lossStreak * 2) : -10
  }
  return winStreak * 4 < 40 ? winStreak * 4 : 40
}

const getKoHandicap = (data) => {
  let koWinPercent =
    data.wins.knockouts === 0
      ? 0
      : (data.wins.knockouts / data.wins.total) * 100
  let koLossPercent =
    data.losses.knockouts === 0
      ? 0
      : (data.losses.knockouts / data.losses.total) * 100

  let koHandicap = koWinPercent - koLossPercent
  return koHandicap
}

const getSubHandicap = (data) => {
  let subWinPercent =
    data.wins.submissions === 0
      ? 0
      : (data.wins.submissions / data.wins.total) * 100
  let subLossPercent =
    data.losses.submissions === 0
      ? 0
      : (data.losses.submissions / data.losses.total) * 100

  let subHandicap = subWinPercent - subLossPercent
  return subHandicap
}

const getTimeHandicap = (data) => {
  let totalTime = 0
  data.fights.forEach((fight) => {
    if (fight.result === 'win') {
      const lastRoundArr = fight.time.split(':')
      const roundMins =
        (parseInt(fight.round) - 1) * 5 + parseInt(lastRoundArr[0])
      const roundSeconds = parseInt(lastRoundArr[1]) + roundMins * 60
      totalTime += roundSeconds
    }
  })
  const avgFightWinTime = totalTime / data.wins.total
  return avgFightWinTime
}

const getStyleHandicap = (data) => {}

export default {
  getAgeHandicap,
  getKoHandicap,
  getSubHandicap,
  getStreakHandicap,
  getTimeHandicap,
}
