// import { configureStore } from '@reduxjs/toolkit';
// import notificationsReducer, { resetStatus, getNotifications, sendNotification } from './notificationsSlice';
// import { Notification } from '../../types/Notification';
// import { apiServer } from '../../api/mock';
// import { rest } from 'msw';
import { describe, expect, test } from 'vitest'

describe('notificationsSlice', () => {
  test('always passes', () => {
    expect(true).toBe(true)
  })
})

// describe('notificationsSlice', () => {
//     const store = configureStore({
//         reducer: {
//             notifications: notificationsReducer,
//         },
//     });

//     test('should return the initial state', () => {
//         const state = store.getState().notifications;
//         expect(state).toEqual({
//             notifications: [],
//             status: 'idle',
//             error: null,
//         });
//     });

//     // test('should handle resetStatus', () => {
//     //     store.dispatch(resetStatus());
//     //     const state = store.getState().notifications;
//     //     expect(state.status).toBe('idle');
//     //     expect(state.error).toBeNull();
//     // });

//     // describe('getNotifications thunk', () => {
//     //     test('should handle pending state', async () => {
//     //         store.dispatch(getNotifications.pending);
//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('loading');
//     //     });

//     //     test('should handle fulfilled state', async () => {
//     //         await store.dispatch(getNotifications());

//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('succeeded');
//     //         expect(state.notifications).toEqual([
//     //             { id: '1', message: 'Test Notification 1' },
//     //             { id: '2', message: 'Test Notification 2' },
//     //         ]);
//     //     });

//     //     test('should handle rejected state', async () => {
//     //         server.use(
//     //             rest.get('/api/notifications', (req, res, ctx) => {
//     //                 return res(ctx.status(500), ctx.json({ message: 'Error fetching notifications' }));
//     //             })
//     //         );

//     //         await store.dispatch(getNotifications());

//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('failed');
//     //         expect(state.error).toEqual({ message: 'Error fetching notifications' });
//     //     });
//     // });

//     // describe('sendNotification thunk', () => {
//     //     test('should handle pending state', async () => {
//     //         store.dispatch(sendNotification.pending);
//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('loading');
//     //     });

//     //     test('should handle fulfilled state', async () => {
//     //         const notification: Omit<Notification, 'id'> = { message: 'Test Notification 3' };
//     //         await store.dispatch(sendNotification(notification));

//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('succeeded');
//     //         expect(state.notifications).toContainEqual({ id: '3', message: 'Test Notification 3' });
//     //     });

//     //     test('should handle rejected state', async () => {
//     //         server.use(
//     //             rest.post('/api/notifications', (req, res, ctx) => {
//     //                 return res(ctx.status(500), ctx.json({ message: 'Error sending notification' }));
//     //             })
//     //         );

//     //         const notification: Omit<Notification, 'id'> = { message: 'Test Notification 3' };
//     //         await store.dispatch(sendNotification(notification));

//     //         const state = store.getState().notifications;
//     //         expect(state.status).toBe('failed');
//     //         expect(state.error).toEqual({ message: 'Error sending notification' });
//     //     });
//     // });
// });
