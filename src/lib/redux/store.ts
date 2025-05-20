import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from './api/chatApi'
import AppSlice from './slices/appSlice'
import ChatRoomSlice from './slices/chatRoomSlice'
import FormDataSlice from './slices/formDataSlice'
import UserSuggestionSlice from './slices/userSuggestionSlice'

export const store = configureStore({
  reducer: {
    app: AppSlice,
    chatRoom: ChatRoomSlice,
    formData: FormDataSlice,
    userSuggestion: UserSuggestionSlice,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
})

export type AppDispatch = typeof store.dispatch;