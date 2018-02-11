const reducer = (state = [], action) => {
  // todo: switch to action.notification & action.error
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return [ ...state, { message: action.notification, error: action.error, id: action.id } ]
  case 'RESET_NOTIFICATION':
    return state.filter(notification => notification.id !== action.id)
  default:
    return state
  }
}

export const setNotification = (id, notification, error) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      id,
      error
    })
  }
}

export const resetNotification = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'RESET_NOTIFICATION',
      id
    })
  }
}

let notificationId = 0

export const showNotification = (notification, timeout = 5000, error = false) => {
  return async (dispatch) => {
    const id = notificationId++

    dispatch(setNotification(id, notification, error))
    setTimeout(() =>
      dispatch(resetNotification(id)), timeout)
  }
}

export const showError = (notification, timeout = 5000) => {
  return showNotification(notification, timeout, true)
}

export default reducer