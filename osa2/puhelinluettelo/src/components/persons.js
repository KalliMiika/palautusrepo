import React from 'react';
import Person from './person'

const Persons = ({ persons, searchKey }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))

    return(
        <>
        {personsToShow.map(person => 
          <Person key={person.id} person={person}/>
        )}
        </>
    )
}

export default Persons