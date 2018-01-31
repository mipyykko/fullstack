import React from 'react'

const CreateBlogForm = ({
  handleCreateBlog, title, author, url, handleCreateBlogFormChange
}) => (
  <div>
    <h2>Create new blog</h2>
    <form onSubmit={handleCreateBlog}>
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleCreateBlogFormChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleCreateBlogFormChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleCreateBlogFormChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

export default CreateBlogForm