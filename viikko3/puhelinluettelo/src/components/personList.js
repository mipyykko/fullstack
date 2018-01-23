import React from 'react'

export const Person = ({ person, removePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={() => removePerson(person)}>poista</button></td>
        </tr>
    )
}

export const PersonList = ({ persons, filter, removePerson }) => {
    const personsToShow = filter.trim() === '' 
            ? persons
            : persons.filter(person =>
                 person.name.trim().toLowerCase()
                    .indexOf(filter.trim().toLowerCase()) >= 0
              || person.number.trim()
                    .indexOf(filter.trim()) >= 0)
    return (
        <div>
            <table>
                <tbody>
                {personsToShow.map(person => 
                    <Person 
                        key={person.name} 
                        person={person} 
                        removePerson={removePerson} />)}
                </tbody>
            </table>
        </div>
    )
} 
