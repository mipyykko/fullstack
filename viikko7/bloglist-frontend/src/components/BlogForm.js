import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class BlogForm extends React.Component {

  render() {
    const user = this.props.user
    const blogs = this.props.blogs

    return(
      <div>
        <h2>Blogs</h2>
        <Table striped celled>
          <Table.Body>
            {blogs.map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    user: state.user
  })
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
