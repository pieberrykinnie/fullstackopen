import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ label, count }) => <div>{label} {count}</div>

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  return (
    <>
      <Header text="statistics" />
      <Statistic label="good" count={good} />
      <Statistic label="neutral" count={neutral} />
      <Statistic label="bad" count={bad} />
      <Statistic label="all" count={all} />
      <Statistic label="average" count={average} />
      <Statistic label="positive" count={percentage + " %"} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)

  const [average, setAverage] = useState(0)

  const [percentage, setPercentage] = useState(0)

  const addGoodFeedback = () => {
    const newGood = good + 1
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    setAverage((newGood + bad * -1) / newAll)
    setPercentage(newGood / newAll * 100)
  }

  const addNeutralFeedback = () => {
    const newNeutral = neutral + 1
    const newAll = all + 1
    setNeutral(newNeutral)
    setAll(newAll)
    setAverage((good + bad * -1) / newAll)
    setPercentage(good / newAll * 100)
  }

  const addBadFeedback = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    setAverage((good + newBad * -1) / newAll)
    setPercentage(good / newAll * 100)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={addGoodFeedback} text="good" />
      <Button onClick={addNeutralFeedback} text="neutral" />
      <Button onClick={addBadFeedback} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percentage={percentage} />
    </div>
  )
}

export default App
