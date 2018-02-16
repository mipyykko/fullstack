import userService from '../services/users'
import { showError } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  case 'REFRESH_USER': {
    const old = state.filter(user => user.id !== action.user.id)
    return [...old, action.user]
  }
  default:
    return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        users
      })
    } catch (exception) {
      dispatch({
        type: 'ERROR_INIT_USERS'
      })
      dispatch(showError(`Error initializing users: ${exception.message}`))
    }
  }
}

export const refreshUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await userService.getById(id)
      if (!user)
        throw new Error('no id')
      dispatch({
        type: 'REFRESH_USER',
        user
      })
    } catch (exception) {
      dispatch({
        type: 'ERROR_REFRESH_USER'
      })
      // don't show error here as we're kinda internal
    }
  }
}
export default reducer