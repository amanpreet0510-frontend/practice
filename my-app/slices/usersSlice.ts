import { fetchAllUsers, addUserHierarchy,updateUserHierarchy } from "./profileSlice";
import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.types'

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

 const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      // .addCase(addUserHierarchy.fulfilled, (state, action) => {
      //   const maybeUser = action.payload as User | null

      //   // Guard against a possible null payload
      //   if (!maybeUser) {
      //     return
      //   }

      //   const updatedUser: User = maybeUser

      //   const index = state.users.findIndex(
      //     (user: User) => user.id === updatedUser.id
      //   )

      //   if (index !== -1) {
      //     state.users[index] = updatedUser
      //   } else {
      //     state.users.push(updatedUser)
      //   }
      // })
      .addCase(addUserHierarchy.fulfilled, (state, action) => {
        const updatedUser = action.payload as User | null

        if (!updatedUser) return

        const index = state.users.findIndex(user => user.id === updatedUser.id)

        if (index !== -1) {
          
          state.users[index] = {
            ...state.users[index],
            ...updatedUser,
          }
        } else {
          state.users.push(updatedUser)
        }
      })
      .addCase(updateUserHierarchy.fulfilled, (state, action) => {
        const updatedUser = action.payload as User | null

        if (!updatedUser) return

        const index = state.users.findIndex(user => user.id === updatedUser.id)

        if (index !== -1) {
         
          state.users[index] = {
            ...state.users[index],
            ...updatedUser,
          }
        } else {
          state.users.push(updatedUser)
        }
      })
      


  },
});

export default usersSlice.reducer;