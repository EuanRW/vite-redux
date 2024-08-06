import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import notificationsReducer from './notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
