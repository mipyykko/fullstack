import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted: false
    }
  }

  findById = (id) => {
    return this.props.blogs ? this.props.blogs.find(blog => blog.id === id) : {}
  }

  handleLike = (id) => {
    this.props.likeBlog(id)
  }

  handleDelete = (blog) => {
    if (window.confirm(`Really delete '${blog.title}' by ${blog.author}?`)) {
      this.props.deleteBlog(blog.id)
      this.setState({ deleted: true })
    }
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to='/' />
    }

    const blog = this.findById(this.props.id)

    if (!blog) return <div>Loading...</div>
    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <p>{blog.url && <a href={blog.url}>{blog.url}</a>}</p>
        <Button as='div' labelPosition='right' onClick={() => this.handleLike(blog.id)}>
          <Button icon>
            <Icon name='heart' />like
          </Button>
          <Label as='a' basic pointing='left'>{blog.likes}</Label>
        </Button>
        {((this.props.user && this.props.user.id === blog.user.id)
         || !blog.user) && <Button as='div' labelPosition='right' onClick={() => this.handleDelete(blog)}>
            <Button icon>
              <Icon name='delete' />delete
            </Button>
          </Button>}
        <p>added by {blog.user ? blog.user.name : 'anonymous' }</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    blogs: state.blogs
  })
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)