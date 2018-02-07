import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, resetNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.store.dispatch(voteAnecdote(anecdote.id))

    this.props.store.dispatch(showNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => this.props.store.dispatch(resetNotification()), 5000)
  }

  render() {
    const { filter } = this.props.store.getState()
    const anecdotes = this.props.store.getState().anecdotes
      .filter(a => a.content.indexOf(filter) > -1)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
