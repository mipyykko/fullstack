import React from 'react'
import numberService from './services/numbers'
import { PersonList } from './components/personList'
import { Message, Error } from './components/notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: '',
        error: '',
        message : ''
    }
  }

  componentWillMount() {
    numberService
        .getAll()
        .then(response => {
            console.log(response.data)
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
    const foundKey = Object.keys(this.state.persons)
        .filter(key => this.state.persons[key].name.trim() === this.state.newName.trim())
    const exists = foundKey.length > 0
    if (this.state.newName.trim() === '') {
        this.setState({ newName: '', newNumber: '' })
    } else {
        if (exists) {
            if (window.confirm('korvataanko ' + this.state.newName)) {
                const foundPerson = this.state.persons[foundKey[0]]
                const personObject = {
                    ...foundPerson,
                    number: this.state.newNumber    
                }
                numberService.update(foundPerson.id, personObject)
                    .then(response => {
                        const persons = this.state.persons.filter(n=> n.id !== foundPerson.id)
                        this.setState({
                            persons: [...persons, response.data],
                            newName: '',
                            newNumber: '',
                            message: `Käyttäjä ${response.data.name} päivitetty`
                        })
                        setTimeout(() => this.setState({ message: null }), 1000)
                    })
                    .catch(error => {
                        this.setState({
                            error: `Tapahtui jokin virhe`
                        })
                        setTimeout(() => this.setState({ error: null}), 1000)
                    })
            }
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
                        newNumber: '',
                        message: `Käyttäjä ${response.data.name} lisätty`
                    })
                    setTimeout(() => this.setState({ message: null }), 1000)
                })
                .catch(error => {
                    this.setState({
                        error: `Tapahtui jokin virhe`
                    })
                    setTimeout(() => this.setState({ error: null}), 1000)
                })
        }
  
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
                    persons: newPersons,
                    message: `Käyttäjä ${person.name} poistettu`
                })
                setTimeout(() => this.setState({ message: null}), 1000)
            })
            .catch(error => {
                this.setState({
                    persons: this.state.persons.filter(n => n.id !== person.id),
                    error: `Tapahtui jokin virhe`
                })
                setTimeout(() => this.setState({ error: null}), 1000)
            })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Message message={this.state.message} />
        <Error error={this.state.error} />
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