import React from 'react';


class App extends React.Component {
  store = this.props.store

  constructor(props) {
    super(props)
    this.state = { anecdote: '' }
  }

  upvote = (id) => {
    this.store.dispatch({
      type: 'UPVOTE',
      data: { id }
    })
  }

  handleAnecdoteFormChange = (event) => {
    this.setState({ anecdote: event.target.value })
  }

  handleAnecdoteCreate = (event) => {
    event.preventDefault()
    this.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: { anecdote: this.state.anecdote }
    })
    this.setState({ anecdote: '' })
  }

  render() {
    const anecdotes = this.store.getState()
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.upvote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleAnecdoteCreate}>
          <div><input 
            type="text"
            name="anecdote"
            value={this.state.anecdote}
            onChange={this.handleAnecdoteFormChange}
          /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App