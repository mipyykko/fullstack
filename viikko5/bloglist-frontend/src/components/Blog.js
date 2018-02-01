import React from 'react'

export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  toggleVisibility = (event) => {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })
  }

  // ({ blog, expanded, handleLike, toggleExpanded }) => (
  render() {
    const blog = this.props.blog

    let addedBy = blog.user
      ? `added by ${blog.user.name}`
      : ''


    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return(
      <div>
        <div style={blogStyle} onClick={this.toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div style={{ display: this.state.visible ? '' : 'none' }}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} like{blog.likes !== 1 ? 's' : ''}</p>
          <p><button onClick={this.props.handleLike}>like</button></p>
          <p>{addedBy}</p>
        </div>
      </div>
    )
  }
}
