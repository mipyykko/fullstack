import React from 'react'
import Blog from './components/Blog'
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
      this.setState({ error: 'väärä käyttäjä tai salasana' })
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

  render() {
    const loginForm = () => (
      <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={this.login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFormChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFormChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
    )

    const blogForm = () => (
      <div>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>
        <h2>blogs</h2>
        {this.state.user === null ?
          loginForm() :
          blogForm()}
      </div>
    )
  }
}

export default App;
