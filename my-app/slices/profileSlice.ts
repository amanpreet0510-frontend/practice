import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { User } from '../types/user.types'


export const inviteUser = createAsyncThunk<
  User,
  { name: string; email: string; role: "admin" | "hr" | "employee" },
  { rejectValue: string }
>(
  "users/inviteUser",
  async ({ name, email, role }, { rejectWithValue }) => {
    const supabase = getSupabaseClient()
    try {
      const { data, error } = await supabase.from("profiles").insert([
        {
          name,
          email,
          role,
          first_time: true,
          is_active: true,
        },
      ]).select().single();

      if (error) throw error;

      // Normalize to our shared User type
      const created: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        first_time: data.first_time,
        is_active: data.is_active,
        image: data.image ?? null,
        mobile: data.mobile ?? null,
      }

      return created;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to invite user");
    }
  }
);


export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (): Promise<User[]> => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("profiles")
      .select("*");


    if (error) throw error;
    if (!data) return [];

    console.log('=== fetchAllUsers raw data ===')
    console.log('First profile sample:', data[0])
    console.log('First profile keys:', data[0] ? Object.keys(data[0]) : 'no data')
    console.log('First profile id:', data[0]?.id)

    return data.map((profile): User => {
      const mapped = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        is_active: profile.is_active,
        first_time: profile.first_time,
        image: profile.image,
        mobile: profile.mobile,
        position: profile.position,
        department: profile.department,
        reports_to: profile.reports_to
      }
      console.log('Mapped user id:', mapped.id, 'from profile.id:', profile.id)
      return mapped
    });
  }
);


export const addUserHierarchy = createAsyncThunk(
  "users/addHierarchy",
  async (

    payload: {
      userId: string
      name:string | null
      image:string | null
      position: string | null
      department: string | null
      reports_to: string | null
    },
    { rejectWithValue }
  ) => {
    const supabase = getSupabaseClient()
    const { data,error } = await supabase
      .from("profiles")
      .upsert({
        name:payload.name,
        image:payload.image,
        position: payload.position,
        department: payload.department,
        reports_to: payload.reports_to,
      })
      .eq("id", payload.userId)
      .select()
      .single()


    if (error) return rejectWithValue(error.message)

    return data
  }
)

export const updateUserHierarchy = createAsyncThunk(
  "users/updateHierarchy",
  async (

    payload: {
      userId: string
      name:string | null
      position: string | null
      department: string | null
      reports_to: string | null
    },
    { rejectWithValue }
  ) => {
    const supabase = getSupabaseClient()
    const { data,error } = await supabase
      .from("profiles")
      .update({
        name:payload.name,
        position: payload.position,
        department: payload.department,
        reports_to: payload.reports_to,
      })
      .eq("id", payload.userId)
      .select()
      .single()

      console.log('payload.reports_to', payload.reports_to)

    if (error) return rejectWithValue(error.message)

    return data
  }
)



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
      is_active: profile.is_active,
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
    is_active: boolean
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
        is_active: payload.is_active
      })
      .eq('id', user.id)
      .select('*')

console.log('payload.image', payload.image)

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
      is_active: profile.is_active
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
     
      .addCase(fetchProfile.pending, state => {
        state.loading = true
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })

      
      .addCase(updateProfile.pending, state => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
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

