import { inviteUser } from "./profileSlice";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.types'

// interface user {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     is_active: boolean;
//   }

interface UserState {
    list: User[]; 
    loading: boolean;
    error: string | null;
  }

  const initialState: UserState = {
    list: [], 
    loading: false,
    error: null,
  };

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      fetchUsersStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchUsersSuccess: (state, action) => {
        state.loading = false;
        state.list = action.payload;
      },
      fetchUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // Invite User
        .addCase(inviteUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(inviteUser.fulfilled, (state, action) => {
          state.loading = false;
          state.list.push(action.payload); 
        })
        .addCase(inviteUser.rejected, (state, action) => {
          state.loading = false;
          state.error = typeof action.payload === "string"
            ? action.payload
            : "Failed to invite user";
        });
    },
  });
  
  export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
  
  export default userSlice.reducer;
  