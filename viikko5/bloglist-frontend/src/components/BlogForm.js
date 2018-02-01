import React from 'react'
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

export default BlogForm
