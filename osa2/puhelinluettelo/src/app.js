import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/persons'

const baseUrl = 'https://sleepy-savannah-67769.herokuapp.com/api/persons'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
      console.log(event.target.name, ': ', event.target.value)
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.name, ': ', event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchKeyChange = (event) => {
    console.log(event.target.name, ': ', event.target.value)
    setSearchKey(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
        alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
        .post(baseUrl, personObject)
        .then(response => {
          console.log(response)
        })
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter by: 
      <input
        value={searchKey}
        onChange={handleSearchKeyChange}
       />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
          <div>
            name: 
            <input
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            number: 
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} searchKey={searchKey}/>
    </div>
  )

}

export default App