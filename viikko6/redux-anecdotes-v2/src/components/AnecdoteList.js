import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, resetNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.voteAnecdote(anecdote.id)

    this.props.showNotification(`you voted for '${anecdote.content}'`)
    setTimeout(() => this.props.resetNotification(), 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.indexOf(filter) > -1)
    .sort((a, b) => b.votes - a.voter)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification,
  resetNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
