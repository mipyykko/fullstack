import React from 'react'
import numberService from './services/numbers'
import { PersonList } from './components/personList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: ''
    }
  }

  componentWillMount() {
    numberService
        .getAll()
        .then(response => {
            this.setState({ persons: response.data })
        })
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
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        numberService.create(personObject)
            .then(response => {
                this.setState({ 
                    persons: [...this.state.persons, response.data], 
                    newName: '',
                    newNumber: ''
                })
            })
    }
  }

  removePerson = (person) => {
    if (window.confirm('poistetaanko ' + person.name)) {
        numberService
            .remove(person)
            .then(response => {
                var newPersons = this.state.persons
                var index = newPersons.indexOf(person)
                newPersons.splice(index, 1)
                this.setState({
                    persons: newPersons
                })
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
        <PersonList
            persons={this.state.persons} 
            filter={this.state.filter}
            removePerson={this.removePerson} />
      </div>
    )
  }
}

export default App