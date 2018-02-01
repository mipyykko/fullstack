import React from 'react'
import Blog from './Blog'

const BlogForm = ({ blogs, handleLike }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={() => handleLike(blog.id)}
      />
    )}
  </div>
)

export default BlogForm
