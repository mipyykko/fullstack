import React from 'react'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { loginUser } from '../reducers/loginReducer'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    this.props.loginUser(username, password)
  }

  render() {
    return (
      <Togglable
        buttonLabel="log in">
        <div>

          <h2>Log in</h2>
          <Form onSubmit={this.handleLogin}>
            <Form.Field>
              <Form.Input
                label="username"
                placeholder="username"
                type="text"
                name="username"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="password"
                placeholder="password"
                type="password"
                name="password"

              />
            </Form.Field>
            <Button type="submit">login</Button>
          </Form>
        </div>
      </Togglable>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    login: state.login
  })
}

const mapDispatchToProps = {
  loginUser
}

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)