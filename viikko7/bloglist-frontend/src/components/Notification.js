import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    console.log(this.props)

    if (!this.props.notification) {
      return null
    }

    return (
      <div>
        {this.props.notification &&
        <div className="notification">
          {this.props.notification}
        </div>}
        {this.props.error &&
        <div className="error">
          {this.props.error}
        </div>}
      </div>
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