import React from 'react'
import Blog from './Blog'

const BlogForm = ({ blogs, expanded, handleLike, toggleExpanded }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
      />
    )}
  </div>
)

export default BlogForm
