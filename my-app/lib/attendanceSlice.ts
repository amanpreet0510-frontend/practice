import { Payload } from './../node_modules/recharts/types/component/DefaultTooltipContent.d';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface attendanceState {
  activeSessionId:string|null;
  isWorking:boolean
  loginTime:number|null
}

const initialState: attendanceState = {
    activeSessionId:'',
    isWorking:false,
    loginTime:null,
}

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    loginTime: (state,action:PayloadAction<{sessionId:string,loginId:number}>) => {
      state.activeSessionId =action.payload.sessionId
      state.isWorking =true
      state.loginTime=action.payload.loginId

    },
    logoutTime: (state,action:PayloadAction<{sessionId:string,loginId:number}>) => {
        state.activeSessionId =null
        state.isWorking =false
        state.loginTime=null
    },
  },
})

export const { loginTime, logoutTime} = attendanceSlice.actions

export default attendanceSlice.reducer