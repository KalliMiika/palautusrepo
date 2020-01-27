import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => {
  return(
    <h1>{title}</h1>
  )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistics = ({good, neutral, bad, all}) => {
    if (all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine type="Good" count={good}/>
          </tr>
          <tr>
            <StatisticLine type="Neutral" count={neutral}/>
          </tr>
          <tr>
            <StatisticLine type="Bad" count={bad}/>
          </tr>
          <tr>
            <StatisticLine type="All" count={all}/>
          </tr>
          <tr>
            <StatisticLine type="Average" count={(good-bad)/all}/>
          </tr>
          <tr>
            <StatisticLine type="Positive" good={good} all={all}/>
          </tr>
        </tbody>
      </table>
    )
}

const StatisticLine = (props) => {
  if (props.type === "Positive") {
    const good = props.good
    const all = props.all
    return (
      <>
      <td>
          Positive
      </td>
      <td>
          {good/all*100}%
      </td>
      </>
    )
  }
  return (
    <>
    <td>{props.type}</td> 
    <td>{props.count}</td> 
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementGood = () => {
      setGood(good + 1)
      setAll(all + 1)
  }
  const incrementNeutral = () => {
      setNeutral(neutral + 1)
      setAll(all + 1)
  }
  const incrementBad = () => {
      setBad(bad + 1)
      setAll(all + 1)
  }

  return (
    <div>
      <Header title='give feedback'/>
      <Button 
        handleClick={incrementGood}
        text="good"
      />
      <Button 
        handleClick={incrementNeutral}
        text="neutral"
      />
      <Button 
        handleClick={incrementBad}
        text="bad"
      />
      <Header title='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)