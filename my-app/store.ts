import { configureStore } from '@reduxjs/toolkit'
//import counterNumber from '@/app/CreateSlice';
import attendanceReducer from '@/lib/attendanceSlice';


export const store = configureStore({
  reducer: {
    //counter: counterNumber,
    attendance: attendanceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch