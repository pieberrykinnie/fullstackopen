import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  let result;

  if (all > 0) {
    result = (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={percentage + " %"} />
      </div>
    )
  } else {
    result = <div>No feedback given</div>
  }

  return result;
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
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percentage={percentage} />
    </div>
  )
}

export default App
