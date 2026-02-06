import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { LeaveRequest } from '@/types/leaves.types';
interface FetchUsersOnLeaveResult {
  onLeave: LeaveRequest[];
  pendingCount: number;
}

export const fetchUsersOnLeave = createAsyncThunk<
  FetchUsersOnLeaveResult,
  void,
  { rejectValue: string }
>(
  'users/fetchUsersOnLeave',
  async (_, { rejectWithValue }) => {
    const supabase = getSupabaseClient();

    const { data: onLeaveData, error: onLeaveError } = await supabase
      .from('users_currently_on_leave')
      .select('*');

    if (onLeaveError) {
      return rejectWithValue(onLeaveError.message);
    }

    const { count, error: countError } = await supabase
      .from('leave_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (countError) {
      return rejectWithValue(countError.message);
    }

    return {
      onLeave: (onLeaveData ?? []) as LeaveRequest[],
      pendingCount: count ?? 0,
    };
  }
);



interface LeaveState {
    onLeave: LeaveRequest[];
    pendingCount: number;
    loading: boolean;
    error: string | null;
  }

const initialState: LeaveState = {
  onLeave: [],
  pendingCount: 0,
  loading: false,
  error: null,
};
  
const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    clearLeaveState: (state) => {
      state.onLeave = [];
      state.error = null;
      state.loading = false;
      state.pendingCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersOnLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersOnLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.onLeave = action.payload.onLeave;
        state.pendingCount = action.payload.pendingCount;
      })
      .addCase(fetchUsersOnLeave.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      });
  },
});

export const { clearLeaveState } = leaveSlice.actions;
export default leaveSlice.reducer;