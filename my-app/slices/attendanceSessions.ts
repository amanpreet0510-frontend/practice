import { Suspense } from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { loginTime, logoutTime } from '@/lib/attendanceSlice';

export interface AttendanceSession {
  id: string;
  user_id: string;
  login_time: string;
  logout_time: string | null;
}

interface AttendanceSessionsState {
  sessions: AttendanceSession[];
  currentSession: AttendanceSession | null;
  login_time:string;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceSessionsState = {
  sessions: [],
  currentSession: null,
  login_time:'',
  loading: false,
  error: null,
};

export const fetchAttendanceSessions = createAsyncThunk<
  AttendanceSession[],
  string,
  { rejectValue: string }
>('attendanceSessions/fetch', async (userId, { rejectWithValue }) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId)
    .order('login_time', { ascending: false });

   

  if (error) {
    return rejectWithValue(error.message);
  }

  return (data ?? []) as AttendanceSession[];
});

export const loginAttendance = createAsyncThunk<
  AttendanceSession,
  string,
  { rejectValue: string }
>('attendanceSessions/login', async (userId, { rejectWithValue, dispatch }) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('attendance')
    .insert([
      {
        user_id: userId,
        login_time: new Date().toISOString(),
        logout_time: null,
      },
    ])
    .select()
    .single();

console.log('data12', data)

  if (error || !data) {
    return rejectWithValue(error?.message ?? 'Failed to create session');
  }

  dispatch(
    loginTime({
      sessionId: data.id,
      loginId: Date.now(),
    })
  );

  return data as AttendanceSession;
});

export const logoutAttendance = createAsyncThunk<
  AttendanceSession,
  string,
  { rejectValue: string }
>('attendanceSessions/logout', async (sessionId, { rejectWithValue, dispatch }) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('attendance')
    .update({ logout_time: new Date().toISOString() })
    .eq('id', sessionId)
    .select()
    .single();

  if (error || !data) {
    return rejectWithValue(error?.message ?? 'Failed to logout from session');
  }

  dispatch(
    logoutTime({
      sessionId,
      loginId: Date.now(),
    })
  );

  return data as AttendanceSession;
});


export const fetchTodayLogin = createAsyncThunk(
  "attendance/fetchTodayLogin",
  async (userId: string, { rejectWithValue }) => {
    const supabase=getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_attendance_with_users",
      { p_user_id: userId }
    );

    if (error) return rejectWithValue(error.message);

    const today = new Date().toISOString().split("T")[0];

    const todayRecord = data?.find((item: any) =>
      item.login_time?.startsWith(today)
    );

    return todayRecord?.login_time || null;
  }
);


const attendanceSessionsSlice = createSlice({
  name: 'attendanceSessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
        state.currentSession = action.payload.find((s) => !s.logout_time) ?? null;
      })
      .addCase(fetchAttendanceSessions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
        state.sessions = [];
        state.currentSession = null;
      })
      .addCase(loginAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = [action.payload, ...state.sessions];
        state.currentSession = action.payload;
      })
      .addCase(loginAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      })
      .addCase(logoutAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = state.sessions.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
        state.currentSession = null;
      })
      .addCase(logoutAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      })
      .addCase(fetchTodayLogin.fulfilled, (state, action) => {
        state.login_time = action.payload;
      })
      .addCase(fetchTodayLogin.rejected, (state, action) => {
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      });
  },
});

export default attendanceSessionsSlice.reducer;
