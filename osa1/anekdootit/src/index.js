import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const BestAnecdote = ({votes}) => {
  let i = 0
  let best = 0
  for (i = 1; i < anecdotes.length; i++) {
    if (votes[i] > votes[best]) {
      best = i
    }
  }
  return (
      <>
        <div>{anecdotes[best]}</div>
        <div>has {votes[best]} votes</div>
      </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const getNext = () => setSelected(Math.floor((Math.random() * anecdotes.length))) 
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>

      <Button 
        handleClick={vote}
        text="vote"
      />
      <Button 
        handleClick={getNext}
        text="get next"
      />
      <h1>Anecdote with most votes</h1>
      <BestAnecdote votes={votes}/>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)