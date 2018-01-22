import React from 'react';

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

const Persons = ({ persons }) => {
    return (
        <div>
            <table>
                <tbody>
                {persons.map(person => <Person key={person.name} person={person} />)}
                </tbody>
            </table>
        </div>
    )
} 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-19311456' },
        { name: 'Arto Järvinen', number: '040-123554456' },
        { name: 'Lea Kutvonen', number: '040-123411256' }
      ],
      newName: '',
      newNumber: ''
    }
  }

  handleNameChange = (event) => {
      this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
      this.setState({ newNumber: event.target.value })
  }

  addNumber = (event) => {
    event.preventDefault()
    var exists = Object.keys(this.state.persons)
        .some(key => this.state.persons[key].name.trim() === this.state.newName.trim())
    if (exists || this.state.newName.trim() === '') {
        this.setState({ newName: '', newNumber: '' })
    } else {
        this.setState({ 
            persons: [...this.state.persons, { 
                name: this.state.newName,
                number: this.state.newNumber 
            }], 
            newName: '',
            newNumber: ''
        })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNumber}>
          <div>
            nimi: <input 
                value={this.state.newName} 
                onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input
                value={this.state.newNumber}
                onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={this.state.persons} />
      </div>
    )
  }
}

export default App