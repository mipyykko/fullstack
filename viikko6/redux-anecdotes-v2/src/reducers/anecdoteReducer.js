import anecdoteService from '../service/anecdotes'

const reducer = (store = [], action) => {
  console.log(action)
  if (action.type === 'UPDATE_ANECDOTE') {
    const old = store.filter(a => a.id !== action.votedAnecdote.id)

    return [...old, action.votedAnecdote ]
  }
  if (action.type === 'NEW_ANECDOTE') {
    return [...store, action.newAnecdote ]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }

  return store
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote.id)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export default reducer