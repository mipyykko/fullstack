import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { createBlog } from '../reducers/blogReducer'

class CreateBlogForm extends React.Component {

  handleCreateBlog = (event) => {
    event.preventDefault()
    this.props.createBlog(
      event.target.title.value,
      event.target.author.value,
      event.target.url.value
    )
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
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

export default connect(null, { createBlog })(CreateBlogForm)