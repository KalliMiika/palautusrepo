

const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification
    case 'RESET':
      return initialState
    default: return state
  }
}

let timeoutID = ""

export const notify = (content, duration) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    timeoutID = setTimeout(() => {
      dispatch(reset())
    }, duration * 1000)
    dispatch({
      type: 'NOTIFY',
      notification: content
    })
  }
}

export const reset = () => {
  timeoutID = ""
  return {
    type: 'RESET'
  }
}

export default notificationReducer