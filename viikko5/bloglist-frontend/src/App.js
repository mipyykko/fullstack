import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
    {
      this.setState({ blogs })
    }
    )

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
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
        username: '', password: '', user
      })
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
    window.localStorage.removeItem('loggedInUser')
    this.setState({
      notification: `${this.state.user.name} logged out`,
      user: null
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 2000)
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

  handleCreateBlogFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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

  toggleExpanded = (ref) => {
    console.log(ref)
    let expanded = this.state.expanded
    expanded[ref] = !expanded[ref]
    this.setState({ expanded })
  }

  render() {
    const loggedIn = () => (
      <div>
        {this.state.user.name} logged in <button onClick={this.logout}>Logout</button>
      </div>
    )

    return (
      <div>
        <h2>blogs</h2>
        <Notification
          notification={this.state.notification}
          error={this.state.error}
        />
        {this.state.user === null ?
          <Togglable buttonLabel="log in">
            <LoginForm
              handleLogin={this.login}
              handleLoginFormChange={this.handleLoginFormChange}
              username={this.state.username}
              password={this.state.password}
            />
          </Togglable> :
          <div>
            {loggedIn()}
            <Togglable
              buttonLabel="new blog"
              ref={component => this.createBlogForm = component}>
              <CreateBlogForm
                handleCreateBlog={this.createBlog}
                handleCreateBlogFormChange={this.handleCreateBlogFormChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
              />
            </Togglable>
            <BlogForm
              blogs={this.state.blogs}
              handleLike={this.handleLike}
            />
          </div>
        }
      </div>
    )
  }
}

export default App
