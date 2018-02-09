import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Label, Form, Loader } from 'semantic-ui-react'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.blog = null
    this.state = {
      deleted: false
    }
  }

  findById = (id) => {
    return this.props.blogs ? this.props.blogs.find(blog => blog.id === id) : {}
  }

  handleLike = (id) => {
    this.props.likeBlog(id)
    this.props.notify(`'${this.blog.title}' liked!`)
  }

  handleDelete = (blog) => {
    if (window.confirm(`Really delete '${blog.title}' by ${blog.author}?`)) {
      this.props.deleteBlog(blog.id)
      this.props.notify(`Blog '${blog.title}' deleted`)
      this.setState({ deleted: true })
    }
  }

  handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (!comment) return
    this.props.addComment(this.props.id, comment)
    this.props.notify(`Comment '${comment}' added to '${this.blog.title}'`)
    event.target.comment.value = ''
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to='/' />
    }

    this.blog = this.findById(this.props.id)

    const { blog } = this

    if (!blog) return <Loader inverted>Loading...</Loader>

    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <p>{blog.url && <a href={blog.url}>{blog.url}</a>}</p>
        <Button as='div' labelPosition='right' onClick={() => this.handleLike()}>
          <Button icon>
            <Icon name='heart' />like
          </Button>
          <Label as='a' basic pointing='left'>{blog.likes}</Label>
        </Button>
        <p>added by {blog.user ? blog.user.name : 'anonymous' }</p>
        {((this.props.login.id && this.props.login.id === blog.user.id)
          || !blog.user) && <Button as='div' labelPosition='right' onClick={() => this.handleDelete()}>
            <Button negative icon>
              <Icon name='delete' />delete
            </Button>
          </Button>}
        <h3>comments</h3>
        <Form size={'tiny'} onSubmit={this.handleComment}>
          <Form.Field>
            <input
              type="text"
              name="comment"
              width="20"
            />
          </Form.Field>
          <Button type="submit">add comment</Button>
        </Form>
        {blog.comments && <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    blogs: state.blogs,
    login: state.login
  })
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  addComment,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)