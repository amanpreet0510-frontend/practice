import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { User } from '../types/user.types'


export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");


    if (error) throw error;
    if (!data) return [];

    return data.map((profile): User => ({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      is_active: profile.is_active,
      first_time: profile.first_time,
      image: profile.image,
      mobile: profile.mobile,
    }));
  }
);





export const fetchProfile = createAsyncThunk(
  
  'profile/fetch',
  async (): Promise<User> => {
    const supabase = getSupabaseClient()
    const { data: auth } = await supabase.auth.getUser()

      if (!auth.user) throw new Error('Not authenticated')

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', auth.user.id)
        .single()

      if (error) throw error

      return {
        id: auth.user.id,
        email: auth.user.email!,
        name: profile.name,
        role: profile.role,
        first_time: profile.first_time,
        is_active:profile.is_active,
        image: profile.image,
        mobile: profile.mobile
      }
    }
  )

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (payload: {
    name: string
    email: string
    image: string | null
    mobile: string | null
    is_active:boolean
  }): Promise<User> => {
    const supabase = getSupabaseClient()

    const { data: authData, error: authError } =
      await supabase.auth.getUser()

    if (authError || !authData.user) {
      throw new Error('User not authenticated')
    }

    const user = authData.user

    
    if (user.email !== payload.email) {
      const { error } = await supabase.auth.updateUser({
        email: payload.email
      })
      if (error) throw error
    }

    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: payload.name,
        image: payload.image,
        mobile: payload.mobile,
        is_active:payload.is_active
      })
      .eq('id', user.id)
      .select('*')

    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('No profile returned after update')
    }

    const profile = data[0]

    
    return {
      id: profile.id,
      email: payload.email,         
      name: profile.name,
      role: profile.role,
      first_time: profile.first_time,
      image: profile.image,
      mobile: profile.mobile,
      is_active:profile.is_active
    }
  }
)


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null as User | null,
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // FETCH PROFILE
      .addCase(fetchProfile.pending, state => {
        state.loading = true
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })

      // UPDATE PROFILE (🔥 MISSING PART 🔥)
      .addCase(updateProfile.pending, state => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('UPDATED USER:', action.payload)
        if (state.data) {
          state.data.name = action.payload.name
          state.data.image = action.payload.image
          state.data.mobile = action.payload.mobile
        }
        state.loading = false
      })
      .addCase(updateProfile.rejected, state => {
        state.loading = false
      })
  }
})

export default profileSlice.reducer

