import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification, showError } from './notificationReducer'

const reducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return []
  default:
    return state
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)

    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      console.log(username)
      const user = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })
      dispatch(showNotification(`User ${username} logged in`))
    } catch (exception) {
      const { error } = exception.response.data
      dispatch({
        type: 'ERROR_LOGIN',
        error
      })
      dispatch(showError(`Login failed: ${error}`))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const user = window.localStorage.getItem('loggedInUser')
      window.localStorage.removeItem('loggedInUser')
      blogService.setToken(null)

      dispatch({
        type: 'LOGOUT'
      })
      dispatch(showNotification(`User ${user.name} logged out`))
    } catch (exception) {
      dispatch({
        type: 'ERROR_LOGOUT',
        error: exception.message
      })
      dispatch(showError(`Logout failed: ${exception.message}`))
    }
  }
}

export default reducer