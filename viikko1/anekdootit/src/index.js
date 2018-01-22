import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(this.props.anecdotes.length).fill(0)
    }
  }

  componentWillMount() {
      this.randomQuote()
  }

  randomQuote = () => () => this.setState({ selected: Math.floor(Math.random() * this.props.anecdotes.length) })

  vote = () => () => {
    const newVotes = Array.from(this.state.votes)
    newVotes[this.state.selected]++  
    this.setState({ ...this.state, votes: newVotes })
  }

  quote = (index) => {
    return (
        <div>
            <div>
                {this.props.anecdotes[index]}
            </div>
            <div>
                Has {this.state.votes[index]} vote{this.state.votes[index] === 1 ? '' : 's'}
            </div>
        </div>
    )
  }

  render() {
    const mostVotes = () => this.state.votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    return (
        <div>
            <button onClick={this.randomQuote()}>Random quote</button>
            {this.quote(this.state.selected)}
            <button onClick={this.vote()}>Vote for this</button>
            <h2>anecdote with most votes:</h2>
            {this.quote(mostVotes())}
        </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)