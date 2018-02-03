import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogForm = ({ blogs, handleLike, handleDelete, user }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={() => handleLike(blog.id)}
        handleDelete={() => handleDelete(blog.id)}
        deletable={
          blog.user === undefined ||
          (blog && user && blog.user.username === user.username)
        }
      />
    )}
  </div>
)

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default BlogForm
