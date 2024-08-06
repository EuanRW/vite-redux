import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// import { setupServer } from 'msw/node'
import { Notification } from '../types/Notification'

const allNotifications: Notification[] = [
  { id: Date.now(), message: 'Initial message' },
]

export const handlers = [
  http.get('/api/notifications', () => {
    return HttpResponse.json(allNotifications)
  }),
  http.post('/api/notifications', async ({ request }) => {
    const newNotification = await request.json()

    const { message } = newNotification as { message: string }
    const id = Date.now()

    allNotifications.push({ id, message })

    return HttpResponse.json({ id, message }, { status: 201 })
  }),
]

export const apiWorker = setupWorker(...handlers)
// export const apiServer = setupServer(...handlers)
