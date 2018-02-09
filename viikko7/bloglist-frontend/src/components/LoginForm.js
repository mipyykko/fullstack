import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'

class LoginForm extends React.Component {
  handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    this.props.login(username, password)
    this.props.notify(`${username} logged in`)
  }

  render() {
    return (
      <div>

        <h2>Log in</h2>
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <label>username</label>
            <input
              type="text"
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input
              type="password"
              name="password"
            />
          </Form.Field>
          <Button type="submit">login</Button>
        </Form>
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
  login,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)