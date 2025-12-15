import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { LeaveBalance, LeaveRequest } from "@/types/leaves.types";


interface ApplyLeavePayload {
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
}


interface LeaveReqStore {
   requests: LeaveRequest[];
  loading: boolean;
  fetchMyLeaveRequests: (userId: string) => Promise<void>;
  applyLeave: (payload: ApplyLeavePayload, userId: string) => Promise<void>;
}


export const LeaveReqStore = create<LeaveReqStore>((set) => ({
requests:[];

}))