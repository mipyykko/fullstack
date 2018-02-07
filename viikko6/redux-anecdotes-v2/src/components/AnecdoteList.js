import React from 'react'
import { connect } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../service/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = async (anecdote) => {
    const votedAnecdote = await anecdoteService.vote(anecdote.id)
    this.props.updateAnecdote(votedAnecdote)

    this.forceUpdate()

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
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  updateAnecdote,
  showNotification,
  resetNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
