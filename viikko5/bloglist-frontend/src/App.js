import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import CreateBlogForm from './components/CreateBlogForm'
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

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
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
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({ error: 'wrong user or password' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null })
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
      this.setState({ title: '', author: '', url: '' })
    } catch (exception) {
      this.setState({ error: 'missing fields ' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  handleCreateBlogFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
        {this.state.user === null ?
          <LoginForm
            handleLogin={this.login}
            handleLoginFormChange={this.handleLoginFormChange}
            username={this.state.username}
            password={this.state.password}
          /> :
          <div>
            {loggedIn()}
            <CreateBlogForm
              handleCreateBlog={this.createBlog}
              handleCreateBlogFormChange={this.handleCreateBlogFormChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
            />
            <BlogForm
              blogs={this.state.blogs}
            />
          </div>
        }
      </div>
    )
  }
}

export default App
