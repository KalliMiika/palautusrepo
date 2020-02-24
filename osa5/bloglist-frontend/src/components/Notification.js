
import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === "error") {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  if (type === "notif") {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }


  if (type === 'neutral') {
    return (
      <div className="neutral">
        {message}
      </div>
    )
  }
  return null
}

export default Notification