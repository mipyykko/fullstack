import React from 'react'

export const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

export const Persons = ({ persons, filter }) => {
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
                {personsToShow.map(person => <Person key={person.name} person={person} />)}
                </tbody>
            </table>
        </div>
    )
} 
