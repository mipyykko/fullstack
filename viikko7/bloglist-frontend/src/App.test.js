import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import BlogForm from './components/BlogForm'
import renderer from 'react-test-renderer'
jest.mock('./services/blogs') // eslint-disable-line
jest.mock('./services/users') // eslint-disable-line
import blogService from './services/blogs'
// import userService from './services/users'
import configureMockStore from 'redux-mock-store'

const puppeteer = require('puppeteer')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('<App />', () => {
  let app, store

  const initialState = {
    blogs: blogService.blogs,
    users: [],
    login: {},
    notifications: []
  }

  describe('user is not logged in', () => {
    beforeEach(() => {
      store = mockStore(initialState)
      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('does not render blogs without login', () => {
      app.update()
      const blogComponents = app.find(BlogForm)
      expect(blogComponents.length).toEqual(0)
    })

    it('renders correctly', () => {
      const tree = renderer
        .create(<Provider store={store}><App /></Provider>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('user is logged in', async () => {
    let store

    beforeEach(async () => {
      const user = {
        username: 'asdf',
        name: 'hdfg',
        token: '66666'
      }
      store = await mockStore({ ...initialState, login: user })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('renders blogs after login', () => {
      app.update()
      const blogComponents = app.find(BlogForm)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })

    it('renders correctly', () => {
      const tree = renderer
        .create(<Provider store={store}><App /></Provider>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

  })

  // skipped for now
  describe.skip('puppeteer tests', () => {
    let page, browser

    beforeEach(async () => {
      browser = await puppeteer.launch({
        headless: true
      })
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
    })

    it('renders with browser and has a menu', async () => {
      const bodyContent = await page.$eval('body', el => el.textContent)
      const menu = await page.$eval('.ui', el => (el ? true : false))

      expect(bodyContent.includes('Blog application')).toBe(true)
      expect(menu).toBe(true)
    }, 10000)

    afterAll(() => {
      browser.close()
    })
  })
})