import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {

  render() {
    const user = this.props.user
    const blogs = this.props.blogs

    return(
      <div>
        <h2>Blogs</h2>
        {blogs ? blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => this.props.likeBlog(blog.id)}
            handleDelete={() => this.props.deleteBlog(blog.id)}
            deletable={
              blog.user === undefined ||
              (blog && user && blog.user.username === user.username)
            }
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    blogs: state.blogs,
    user: state.user
  })
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
