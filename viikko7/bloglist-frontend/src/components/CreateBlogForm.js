import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

class CreateBlogForm extends React.Component {

  constructor() {
    super()
    this.redirect = null
  }

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

    this.createBlogForm.toggleVisibility()
    this.redirect = '/'
  }

  render() {
    if (this.redirect) {
      this.redirect = null
      return (
        <Redirect to={this.redirect} />
      )
    }

    return(
      <Togglable
        buttonLabel="new blog"
        ref={component => this.createBlogForm = component}>
        <div>
          <h2>Create new blog</h2>
          <Form onSubmit={this.handleCreateBlog}>
            <Form.Field>
              <Form.Input
                label="title"
                placeholder="title"
                type="text"
                name="title"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="author"
                placeholder="author"
                type="text"
                name="author"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="url"
                placeholder="url"
                type="text"
                name="url"
              />
            </Form.Field>
            <Button type="submit">Create</Button>
          </Form>
        </div>
      </Togglable>
    )
  }
}

const mapDispatchToProps = {
  createBlog
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(CreateBlogForm)