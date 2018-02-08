import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification, error }) => (
  <div>
    {notification &&
    <div className="notification">
      {notification}
    </div>}
    {error &&
    <div className="error">
      {error}
    </div>}
  </div>
)

const mapStateToProps = (state) => {
  return({
    notification: state.notification,
    error: state.error
  })
}

export default connect(mapStateToProps)(Notification)