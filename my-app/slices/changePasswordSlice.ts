import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupabaseClient } from '@/lib/supabaseClient';


interface AuthState {
    loading: boolean;
    error: string | null;
  }
  
  const initialState: AuthState = {
    loading: false,
    error: null,
  };

  export const changePassword = createAsyncThunk<
  void,
  { oldPassword: string; newPassword: string },
  { rejectValue: string }
>("auth/changePassword", async (data, { rejectWithValue }) => {
  const { oldPassword, newPassword } = data;

const supabase=getSupabaseClient();

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user?.email) {
    return rejectWithValue("Not authenticated")
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: authData.user.email,
    password: oldPassword
  })

  if (signInError) {
    return rejectWithValue("Old password is incorrect");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return rejectWithValue(updateError.message);
  }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(changePassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(changePassword.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(changePassword.rejected, (state, action) => {
          state.loading = false;
          state.error =
            (action.payload as string | undefined) ?? action.error.message ?? null;
        });
    },
  });
  
  export default authSlice.reducer;
