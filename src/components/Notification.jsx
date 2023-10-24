import { useNotificationState } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, isError } = useNotificationState()
  if (message === null) {
    return null
  }

  return (
    <div className={`general ${isError ?  'failure' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification