const reducer = (store = [], action) => {
  console.log(action)
  if (action.type === 'UPDATE_ANECDOTE') {
    const old = store.filter(a => a.id !== action.data.id)
    //const updated = store.find(a => a.id === action.data.id)

    return [...old, action.data ]
  }
  if (action.type === 'NEW_ANECDOTE') {
    return [...store, action.content ]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const updateAnecdote = (data) => {
  return {
    type: 'UPDATE_ANECDOTE',
    data: data
  }
}

export const createAnecdote = (content) => {
  console.log(content)
  return {
    type: 'NEW_ANECDOTE',
    content
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer