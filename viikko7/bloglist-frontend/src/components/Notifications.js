import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { resetNotification } from '../reducers/notificationReducer'

class Notifications extends React.Component {

  handleDismiss = (id) => {
    this.props.resetNotification(id)
  }

  render() {
    return (
      <div>
        {this.props.notifications.slice(0, 3).map(n =>
          <Message
            key={n.id}
            positive={!n.error}
            negative={n.error}
            onDismiss={() => this.handleDismiss(n.id)}>
            {n.message}
          </Message>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    notifications: state.notifications
  })
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  resetNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { resetNotification })(Notifications)