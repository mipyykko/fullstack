import React from 'react'
import PropTypes from 'prop-types'

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

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  handleCreateBlogFormChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string
}

export default CreateBlogForm