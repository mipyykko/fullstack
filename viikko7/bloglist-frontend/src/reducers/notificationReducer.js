const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'RESET_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const notify = (notification, timeout = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() =>
      dispatch({
        type: 'RESET_NOTIFICATION'
      }), timeout)
  }
}

export default reducer