import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' // eslint-disable-line
import { Table } from 'semantic-ui-react' // eslint-disable-line
import PropTypes from 'prop-types'

class Users extends React.Component {

  render() {
    return (
      <div>
        <h2>Users</h2>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.Cell>&nbsp;</Table.Cell>
              <Table.Cell><b>blogs added</b></Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    users: state.users
  })
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Users)