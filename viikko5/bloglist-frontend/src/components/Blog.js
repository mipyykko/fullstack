import React from 'react'

export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible })
  }

  // ({ blog, expanded, handleLike, toggleExpanded }) => (
  render() {
    let addedBy = this.props.blog.user
      ? `added by ${this.props.blog.user.name}`
      : ''

    return(
      <div onClick={() => this.toggleVisibility()}>
        <div>
          {this.props.blog.title} {this.props.blog.author} {this.props.expanded}
        </div>
        <div style={{ display: this.state.visible ? '' : 'none' }}>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          {this.props.blog.likes} like{this.props.blog.likes !== 1 ? 's' : ''}
          <button onClick={this.props.handleLike}>like</button>
          {addedBy}
        </div>
      </div>
    )
  }
}
