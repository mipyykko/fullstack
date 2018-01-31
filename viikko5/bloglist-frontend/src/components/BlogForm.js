import React from 'react'
import Blog from './Blog'

const BlogForm = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog._id} blog={blog}/>
    )}
  </div>
)

export default BlogForm
