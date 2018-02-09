import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

class User extends React.Component {


  render() {
    const user = this.props.users.find(user => user.id === this.props.id)

    return user ? (
      <div>
        <h2>{user.name}</h2>
        {user.blogs &&
          <div>
            <h3>Added blogs</h3>
            <List animated>
              {user.blogs.map(blog =>
                <List.Item key={blog._id}>
                  <Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}</Link>
                </List.Item>)}
            </List>
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