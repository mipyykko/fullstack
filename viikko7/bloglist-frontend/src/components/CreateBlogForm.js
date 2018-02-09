import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class CreateBlogForm extends React.Component {

  handleCreateBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    if (!blog.title || !blog.author) return

    this.props.createBlog(blog)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    this.props.notify(`Blog '${blog.title}' added!`)
  }

  render() {
    return(
      <div>
        <h2>Create new blog</h2>
        <Form onSubmit={this.handleCreateBlog}>
          <Form.Field>
            <label>title</label>
            <input
              type="text"
              name="title"
            />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input
              type="text"
              name="author"
            />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <input
              type="text"
              name="url"
            />
          </Form.Field>
          <Button type="submit">Create</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createBlog,
  notify
}

export default connect(null, mapDispatchToProps)(CreateBlogForm)