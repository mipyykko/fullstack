import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../service/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.createAnecdote(newAnecdote)
    this.props.showNotification(`anecdote '${content}' created`)

    setTimeout(() => this.props.resetNotification(), 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  resetNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
