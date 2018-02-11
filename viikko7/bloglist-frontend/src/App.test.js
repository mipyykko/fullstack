import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import BlogForm from './components/BlogForm'
jest.mock('./services/blogs')
jest.mock('./services/users')
import blogService from './services/blogs'
import userService from './services/users'
import configureMockStore from 'redux-mock-store'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('<App />', () => {
  let app

  const initialState = {
    blogs: blogService.blogs,
    users: [],
    login: {},
    notifications: []
  }

  describe('user is not logged in', () => {
    beforeEach(() => {
      const store = mockStore(initialState)
      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('does not render blogs without login', () => {
      app.update()
      const blogComponents = app.find(BlogForm)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('user is logged in', async () => {
    beforeEach(async () => {
      const user = {
        username: 'asdf',
        name: 'hdfg',
        token: '66666'
      }
      const store = await mockStore({ ...initialState, login: user })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('renders blogs after login', () => {
      app.update()
      const blogComponents = app.find(BlogForm)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})