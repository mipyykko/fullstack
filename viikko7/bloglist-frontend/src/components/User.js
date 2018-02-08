import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {


  render() {
    const user = this.props.users.find(user => user.id === this.props.id)

    return user ? (
      <div>
        <h2>{user.name}</h2>
        {user.blogs &&
          <div>
            <h3>Added blogs</h3>
            <ul>
              {user.blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}
            </ul>
          </div>
        }
      </div>
    ) : null
  }
}

const mapStateToProps = (state) => {
  return ({
    users: state.users,
    blogs: state.blogs
  })
}

export default connect(mapStateToProps)(User)