
import { configureStore } from '@reduxjs/toolkit'
//import counterNumber from '@/app/CreateSlice';
import attendanceReducer from '@/lib/attendanceSlice';
import profileReducer from '@/slices/profileSlice';
import usersSlice from '@/slices/usersSlice';
// import notificationReducer from '@/features/notifications/notificationSlice'
// import appearanceReducer from '@/features/appearance/appearanceSlice'


export const store = configureStore({
  reducer: {
    //counter: counterNumber,
    attendance: attendanceReducer,
    profile: profileReducer,
    users: usersSlice,
    // notifications: notificationReducer,
    // appearance: appearanceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch