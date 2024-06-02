import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ label, count }) => <div>{label} {count}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => setGood(good + 1)
  const addNeutralFeedback = () => setNeutral(neutral + 1)
  const addBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={addGoodFeedback} text="good" />
      <Button onClick={addNeutralFeedback} text="neutral" />
      <Button onClick={addBadFeedback} text="bad" />
      <Header text="statistics" />
      <Statistic label="good" count={good} />
      <Statistic label="neutral" count={neutral} />
      <Statistic label="bad" count={bad} />
    </div>
  )
}

export default App
