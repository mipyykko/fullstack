import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Menu, Button } from 'semantic-ui-react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notifications from './components/Notifications'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { setUser, logoutUser } from './reducers/loginReducer'

class App extends React.Component {

  componentDidMount() {
    this.props.initBlogs()
    this.props.initUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
    }
  }


  logout = () => {
    this.props.logoutUser()
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
            <Notifications />
            {!this.props.login.token ?
              <LoginForm /> :
              <div>
                <CreateBlogForm />

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
    login: state.login
  })
}

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  setUser,
  logoutUser
}

App.propTypes = {
  initBlogs: PropTypes.func.isRequired,
  initUsers: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
