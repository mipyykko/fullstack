import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import blogReducer from './blogReducer'
jest.mock('../services/blogs.js')
import blogService from '../services/blogs.js'

import { createBlog, deleteBlog } from './blogReducer'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('blog reducer tests', () => {

  describe('create blog tests', () => {
    it('should create an action to add new blog', async () => {
      const blog = {
        'title': 'testings',
        'author': 'asdfg',
        'url': 'http://url.url'
      }

      const expectedAction = {
        type: 'CREATE_BLOG',
        newBlog: { ...blog }
      }

      const store = mockStore({ blogs: [] })

      return store.dispatch(createBlog(blog))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedAction)
        })
    })
  })

  describe('delete blog tests', () => {
    it('should create an action to delete blog', async () => {
      const blog = {
        title: 'blah',
        author: 'blah blah',
        url: 'blah blah blah',
        id: '666'
      }

      const expectedAction = {
        type: 'DELETE_BLOG',
        deletedBlog: { ...blog }
      }

      const store = mockStore({ blogs: [blog] })

      return store.dispatch(deleteBlog(blog))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedAction)
        })
    })
  })
})