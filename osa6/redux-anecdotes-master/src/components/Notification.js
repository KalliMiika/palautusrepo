import React from 'react'
import { connect } from 'react-redux'
//import { useSelector } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!props.notification) {
    return (
      <>
      </>
    )
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)