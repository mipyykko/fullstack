import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { initUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  componentWillMount() {
    this.props.initUsers()
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <td>&nbsp;</td>
            <td><b>blogs added</b></td>
          </thead>
          <tbody>
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    users: state.users
  })
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)