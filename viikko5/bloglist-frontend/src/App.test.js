import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('does not render blogs without login', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'asdf',
        name: 'hdfg',
        token: '66666'
      }

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('renders blogs after login', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})