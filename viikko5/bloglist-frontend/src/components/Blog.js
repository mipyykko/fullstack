import React from 'react'

export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { blog, deletable }  = this.props

    let addedBy = blog.user
      ? blog.user.name
      : 'anonymous'


    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return(
      <div className="wrapper">
        <div className="title" style={blogStyle} onClick={this.toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div className="details" style={{ display: this.state.visible ? '' : 'none' }}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} like{blog.likes !== 1 ? 's' : ''}</p>
          <p><button onClick={this.props.handleLike}>like</button></p>
          <p>added by {addedBy}</p>
          {deletable && <p><button onClick={this.props.handleDelete} style={{ color: 'red' }}>delete</button></p>}
        </div>
      </div>
    )
  }
}
