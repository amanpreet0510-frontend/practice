import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupabaseClient } from '@/lib/supabaseClient';


  export interface AttendanceSummary {
      user_id: string;
      total_days: number;
      week_start_date:string;
      total_hours: number;
      avg_hours_per_day: number;
    }

  export const fetchAttendanceSummary = createAsyncThunk<
  AttendanceSummary[],       
  string,                  
  { rejectValue: string }   
>(
  "attendanceSummary/fetch",
  async (userId, { rejectWithValue }) => {
    const supabase=getSupabaseClient();
    const { data, error } = await supabase
      .from("attendance_weekly_summary_view")
      .select("*")
      .eq("user_id", userId)
      .order("week_start_date", { ascending: false });
      //.single<AttendanceSummary>();
      console.log('data', data)

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);
  

interface AttendanceSummaryState {
    summary: AttendanceSummary[];
    loading: boolean;
    error: string | null;
  }

const initialState: AttendanceSummaryState = {
  summary: [],
  loading: false,
  error: null,
};
  
const attendanceSlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      });
  },
});


export default attendanceSlice.reducer;
