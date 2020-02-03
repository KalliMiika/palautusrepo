import React, { useState } from 'react'
import Persons from './components/persons'


const App = () => {
  
const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

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
        number: newNumber,
        id: persons.length + 1
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))

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