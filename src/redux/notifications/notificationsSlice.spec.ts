import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, { resetStatus, getNotifications, sendNotification } from './notificationsSlice';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { apiServer } from '../..';
import notificationsSlice from './notificationsSlice';
import { http, HttpResponse } from 'msw';
import { Notification } from '../../types/Notification';

describe('notificationsSlice', () => {
    const store = configureStore({
        reducer: {
            notifications: notificationsReducer,
        },
    });

    beforeAll(() => apiServer.listen());
    afterEach(() => apiServer.resetHandlers());
    afterAll(() => apiServer.close());

    test('should return the initial state', () => {
        const state = store.getState().notifications;
        expect(state).toEqual({
            notifications: [],
            status: 'idle',
            error: null,
        });
    });

    test('should handle resetStatus', () => {
        store.dispatch(resetStatus());
        const state = store.getState().notifications;
        expect(state.status).toBe('idle');
        expect(state.error).toBeNull();
    });

    describe('getNotifications thunk', () => {
        test('should handle pending state', () => {
            const action = { type: getNotifications.pending.type}
            const newState = notificationsSlice(store.getState().notifications, action)
            
            expect(newState.status).toBe('loading');
        });

        test('should handle fulfilled state', async () => {
            await store.dispatch(getNotifications());

            const state = store.getState().notifications;
            
            expect(state.status).toBe('succeeded');
            expect(state.notifications[0].message).toEqual('Initial message');
        });
      })

        test('should handle rejected state', async () => {
            apiServer.use(
              http.get('/api/notifications', () => {
                return HttpResponse.json({ message: 'Error fetching notifications' }, { status: 500 })
              })
            );

            await store.dispatch(getNotifications());

            const state = store.getState().notifications;
            expect(state.status).toBe('failed');
            expect(state.error).toEqual({ message: 'Error fetching notifications' });
        });

    describe('sendNotification thunk', () => {
        test('should handle pending state', () => {
          const action = { type: sendNotification.pending.type}
          const newState = notificationsSlice(store.getState().notifications, action)
          
          expect(newState.status).toBe('loading');
      });

        test('should handle fulfilled state', async () => {
            const notification: Omit<Notification, 'id'> = { message: 'Test Notification 3' };
            await store.dispatch(sendNotification(notification));

            const state = store.getState().notifications;
            expect(state.status).toBe('succeeded');
            expect(state.notifications[1].message).toEqual('Test Notification 3');
        });

        test('should handle rejected state', async () => {
            apiServer.use(
              http.post('/api/notifications', () => {
                return HttpResponse.json({ message: 'Error sending notification' }, { status: 500 })
              })
            );

            const notification: Omit<Notification, 'id'> = { message: 'Test Notification 3' };
            await store.dispatch(sendNotification(notification));

            const state = store.getState().notifications;
            expect(state.status).toBe('failed');
            expect(state.error).toEqual({ message: 'Error sending notification' });
        });
    });
});
