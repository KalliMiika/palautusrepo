import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ notify, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ]
  })

  useEffect(() => {
    if ( result.data && !result.data.editAuthor) {
      notify('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = Number(born)
    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <select id="select" onChange={({ target }) => setName(target.value)}>
          {authors.map(a =>
            <option key={a.name}
              value={a.name}>
                {a.name}
            </option>
          )}
        </select>
        <div>
          setBornTo <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default AuthorForm