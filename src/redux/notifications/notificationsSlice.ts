import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Notification } from '../../types/Notification'

interface NotificationsState {
  notifications: Notification[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: NotificationsState = {
  notifications: [],
  status: 'idle',
  error: null,
}

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Notification[]>('/api/notifications')
      return response.data
      // eslint-disable-next-line
        } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  },
)

export const sendNotification = createAsyncThunk(
  'notifications/sendNotification',
  async (notification: Omit<Notification, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Notification>('/api/notifications', notification)
      return response.data
      // eslint-disable-next-line
        } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  },
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNotification.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(sendNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
        state.status = 'succeeded'
        state.notifications.push(action.payload)
      })
      // eslint-disable-next-line
            .addCase(sendNotification.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getNotifications.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.status = 'succeeded'
        state.notifications = action.payload
      })
    // eslint-disable-next-line
            .addCase(getNotifications.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetStatus } = notificationsSlice.actions

export default notificationsSlice.reducer
