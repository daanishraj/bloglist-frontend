import { createContext, useContext, useReducer } from 'react'

const emptyNotification = { message: null }

const reducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return emptyNotification
  default:
    return state
  }
}

const NotificationContext = createContext()



export const NotificationContextProvider = (props) => {
  const [notificationState, dispatchNotification] = useReducer(reducer, emptyNotification)

  return (
    <NotificationContext.Provider value={[notificationState, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationState = () => {
  const [state] = useContext(NotificationContext)
  return state
}

export const useDispatchNotification = () => {
  const [, dispatch] = useContext(NotificationContext)

  const notify = (message, isError = false) => {
    dispatch({ type: 'SET', payload: { message, isError } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 4000)
  }

  return notify
}