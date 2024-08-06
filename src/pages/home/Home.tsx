import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import GovUkTable from '../../components/GovUkTable'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { getNotifications } from '../../redux/notifications/notificationsSlice'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const notifications = useSelector((state: RootState) => state.notifications.notifications)
  const status = useSelector((state: RootState) => state.notifications.status)
  const error = useSelector((state: RootState) => state.notifications.error)

  const TableRows = notifications.map((notification) => {
    return { id: notification.id.toString(), message: notification.message }
  })

  const handleClick = () => {
    navigate('/notifications')
  }

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content">
        <div className="table-action-div">
          <button onClick={handleClick} className="govuk-button" data-module="govuk-button">
            New notification
          </button>
        </div>
        <div>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && (
            <p>
              Error:
              {error}
            </p>
          )}
          {status === 'succeeded' && (
            <GovUkTable caption="Notifications" headers={['id', 'message']} rows={TableRows} />
          )}
        </div>
      </main>

    </div>
  )
}

export default Home
