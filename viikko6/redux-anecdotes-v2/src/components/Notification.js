import React from 'react'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const { notification } = this.props.store.getState()

    if (notification === null || notification === '') {
      return null
    }

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
