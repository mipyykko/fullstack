import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'semantic-ui-react'

class LoginForm extends React.Component {
  handleLogin = (event) => {
    event.preventDefault()
    this.props.login(event.target.username.value, event.target.password.value)
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
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)