import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {

  render() {
    console.log(this.props)

    if (!this.props.notification) {
      return null
    }

    return (
      <Message positive>
        {this.props.notification}
      </Message>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    notification: state.notification,
    error: state.error
  })
}

export default connect(mapStateToProps)(Notification)