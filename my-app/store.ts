
import { configureStore } from '@reduxjs/toolkit'
//import counterNumber from '@/app/CreateSlice';
import attendanceReducer from '@/lib/attendanceSlice';
import profileReducer from '@/slices/profileSlice';
import usersSlice from '@/slices/usersSlice';
import leaveReducer from '@/slices/showLeaveRequest';
import docsreducer from '@/slices/documentSlice';
import authSlicereducer from '@/slices/changePasswordSlice';
import attendanceSummaryReducer from '@/slices/attendanceHours';
import attendanceSessionsReducer from '@/slices/attendanceSessions';

// import notificationReducer from '@/features/notifications/notificationSlice'
// import appearanceReducer from '@/features/appearance/appearanceSlice'


export const store = configureStore({
  reducer: {
    //counter: counterNumber,
    summary:attendanceSummaryReducer,
    auth:authSlicereducer,
    docs:docsreducer,
    leaves:leaveReducer,
    attendance: attendanceReducer,
    profile: profileReducer,
    users: usersSlice,
    attendanceSessions: attendanceSessionsReducer,
    // notifications: notificationReducer,
    // appearance: appearanceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
