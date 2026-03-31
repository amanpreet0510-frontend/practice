import { docsProps } from './../types/document.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupabaseClient } from '@/lib/supabaseClient';


interface fetchdocsProps {
    docs:docsProps[];
}


export const fetchdocs = createAsyncThunk<
fetchdocsProps,
  void,
  { rejectValue: string }
>(
  'fetchdocs',
  async (_, { rejectWithValue }) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('documents')
      .select('*');
      

    

    if (error) {
      return rejectWithValue(error.message);
    }

    return {
      docs: (data ?? []) as docsProps[],
    };
  }
);




interface DocState {
    docs: docsProps[];
    loading: boolean;
    error: string | null;
  }

const initialState: DocState = {
  docs: [],
  loading: false,
  error: null,
};
  
const docSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    // clearState: (state) => {
    //   state.docs = [];
    //   state.error = null;
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdocs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdocs.fulfilled, (state, action) => {
        state.loading = false;
        state.docs = action.payload.docs;
      })
      .addCase(fetchdocs.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ?? action.error.message ?? null;
      });
  },
});

//export const { clearLeaveState } = leaveSlice.actions;
export default docSlice.reducer;
