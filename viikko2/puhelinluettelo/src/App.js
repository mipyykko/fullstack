import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
      this.setState({ newName: event.target.value })
  }

  addNumber = (event) => {
    event.preventDefault()
    var exists = Object.keys(this.state.persons)
        .some(key => this.state.persons[key].name === this.state.newName)
    if (exists) {
        this.setState({ newName: '' })
    } else {
        this.setState({ persons: [...this.state.persons, { name: this.state.newName }], newName: ''})
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
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
            {this.state.persons.map((person) => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App