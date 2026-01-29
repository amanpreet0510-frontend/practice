import { create } from "zustand";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { LeaveRequest } from "@/types/leaves.types";

interface ApplyLeavePayload {
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
}

interface LeaveRequestStore {
  requests: LeaveRequest[];
  loading: boolean;
  fetchMyLeaveRequests: (userId: string) => Promise<void>;
  applyLeave: (
    payload: ApplyLeavePayload,
    userId: string
  ) => Promise<void>;
}


export const useLeaveRequestStore = create<LeaveRequestStore>((set) => ({
  requests: [],
  loading: false,

  fetchMyLeaveRequests: async (userId: string) => {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    set({ requests: data ?? [] });
  },

  applyLeave: async (payload: ApplyLeavePayload, userId: string) => {
    set({ loading: true });
    const supabase = getSupabaseClient();
    await supabase.from("leave_requests").insert({
      ...payload,
      user_id: userId,
      leave_unit:
        payload.days === 1 ? "full" :
        payload.days === 0.5 ? "half" : "short"
    });

    set({ loading: false });
  }
}));
