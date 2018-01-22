import React from 'react';
import { Persons } from './components/Persons'

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
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
      this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
      this.setState({ newNumber: event.target.value })
  }
  
  handleFilterChange = (event) => {
      this.setState({ filter: event.target.value })
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
        <div>
            rajaa näytettäviä: <input
                value={this.state.filter}
                onChange={this.handleFilterChange} />
        </div>
        <AddForm />
        <h3>Lisää uusi</h3>
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
        <Persons persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App