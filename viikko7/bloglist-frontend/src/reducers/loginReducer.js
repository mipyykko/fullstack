import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
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

export const login = (username, password) => {
  return async (dispatch) => {
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
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer