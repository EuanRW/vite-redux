import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetStatus, sendNotification } from '../../redux/notifications/notificationsSlice'
import './Notifications.css'

interface FormValues {
  message: string
}

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.notifications.status)
  const error = useAppSelector((state) => state.notifications.error)

  useEffect(() => {
    dispatch(resetStatus())
  }, [dispatch])

  // eslint-disable-next-line
  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    dispatch(resetStatus())
    dispatch(sendNotification(values))
    setSubmitting(false)
    resetForm()
  }

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <main className="govuk-main-wrapper govuk-width-container">
          <Form>
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">
                  Send a Notification
                </h1>
              </legend>
              {status === 'succeeded' && (
                <div className="govuk-panel govuk-panel--confirmation">
                  <h1 className="govuk-panel__title">
                    Success
                  </h1>
                  <div className="govuk-panel__body">
                    The notification was sent successfully.
                  </div>
                </div>
              )}
              {status === 'failed' && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex={-1}>
                  <h2 className="govuk-error-summary__title" id="error-summary-title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <p>{error}</p>
                  </div>
                </div>
              )}
              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="message">
                  Message
                </label>
                <Field
                  className="govuk-input"
                  type="text"
                  name="message"
                  id="message"
                  autoComplete="off"
                />
              </div>
              <button
                className="govuk-button"
                type="submit"
                disabled={isSubmitting || status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Notification'}
              </button>
            </fieldset>
          </Form>
        </main>
      )}
    </Formik>
  )
}

export default Notifications
