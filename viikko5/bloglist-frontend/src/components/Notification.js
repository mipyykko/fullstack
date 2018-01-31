import React from 'react'

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

export default Notification