import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Menu, Button } from 'semantic-ui-react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { setUser, logout } from './reducers/loginReducer'
import { notify } from './reducers/notificationReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null
    }
  }

  componentDidMount() {
    this.props.initBlogs()
    this.props.initUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        notification: `${user.name} logged in`,
        username: '', password: ''
      })
      this.props.setUser(user)
      setTimeout(() => {
        this.setState({ notification: null })
      }, 2000)
    } catch (exception) {
      this.setState({ error: 'wrong user or password' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  logout = () => {
    const user = this.props.login
    this.props.logout()
    this.props.notify(`${user.name} logged out`, 2000)
  }

  handleLoginFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      if (newBlog !== null) {
        this.setState({ blogs: [...this.state.blogs, newBlog ] })
      }
      this.setState({
        notification: `blog ${newBlog.title} created`,
        title: '', author: '', url: ''
      })
      this.createBlogForm.toggleVisibility()
      setTimeout(() => {
        this.setState({ notification: null })
      }, 2000)
    } catch (exception) {
      this.setState({ error: 'missing fields' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  handleLike = async (id) => {
    try {
      const likedBlog = await blogService.like(id)

      if (likedBlog === null) {
        throw new Error('wrong id')
      }

      const likedIdx = this.state.blogs.findIndex(blog => id === blog.id)
      this.setState({
        blogs: this.state.blogs.slice(0, likedIdx)
          .concat([{ ...this.state.blogs[likedIdx],
            likes: likedBlog.likes }])
          .concat(this.state.blogs.slice(likedIdx + 1))
      })
    } catch (exception) {
      this.setState({ error: 'wrong id?' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)

      console.log(exception)
    }
  }

  handleDelete = async (id) => {
    try {
      const deletedBlog = this.state.blogs.find(blog => id === blog.id)

      if (deletedBlog === null) {
        throw new Error('wrong id?')
      }
      if (deletedBlog.user && deletedBlog.user.username !== this.state.user.username) {
        throw new Error('wrong user!')
      }

      if (window.confirm(`delete '${deletedBlog.title}' by ${deletedBlog.author}?`)) {
        await blogService.remove(deletedBlog)
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== deletedBlog.id),
          notification: `${deletedBlog.title} deleted` })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 2000)
      }
    } catch (exception) {
      this.setState({ error: 'cannot delete that!' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
      console.log(exception)
    }
  }

  render() {
    const loggedIn = () => (
      <div>
        <em>{this.props.login.name}</em> logged in <Button onClick={this.logout}>Logout</Button>
      </div>
    )

    return (
      <div>
        <Router>
          <div>
            <h2>blogs</h2>
            <Menu inverted>
              <Menu.Item link>
                <Link to="/">blogs</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/users">users</Link>
              </Menu.Item>
              <Menu.Item link>
                {this.props.login.name &&
                  loggedIn()}
              </Menu.Item>
            </Menu>
            <Notification />
            {!this.props.login.token ?
              <Togglable buttonLabel="log in">
                <LoginForm />
              </Togglable> :
              <div>
                <Togglable
                  buttonLabel="new blog"
                  ref={component => this.createBlogForm = component}>
                  <CreateBlogForm />
                </Togglable>
                <Route exact path="/" render={() => {
                  return(
                    <div className="blogContent">
                      <BlogForm />
                    </div>
                  )}} />
                <Route exact path="/users" render={() =>
                  <Users />}
                />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User id={match.params.id} />
                }/>
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <Blog id={match.params.id} />
                }/>
              </div>
            }
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    blogs: state.blogs,
    users: state.users,
    login: state.login
  })
}

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  setUser,
  logout,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
