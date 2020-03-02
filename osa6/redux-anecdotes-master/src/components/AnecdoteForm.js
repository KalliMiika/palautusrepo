import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.notify("you added " + content, 5)
    //dispatch(createAnecdote(content))
    //dispatch(notify("you added " + content, 5))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notify
}

//export default AnecdoteForm
export default connect(
  null, 
  mapDispatchToProps)
  (AnecdoteForm)