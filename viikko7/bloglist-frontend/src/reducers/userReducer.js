import userService from '../services/users'
import { showError } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
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

export default reducer