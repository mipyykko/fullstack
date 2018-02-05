const initialState = null

const reducer = (store = initialState, action) => {
  if (action.type === 'SHOW_NOTIFICATION') {
    return [ action.message ]
  }
  if (action.type === 'RESET_NOTIFICATION') {
    return null
  }

  return store
}

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    message
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default reducer