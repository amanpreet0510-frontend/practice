import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

export const useLeaveRequestStore = create((set) => ({
  requests: [],
  loading: false,

  fetchMyLeaveRequests: async (userId: string) => {
    const { data } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    set({ requests: data });
  },

  applyLeave: async (payload: any, userId: string) => {
    set({ loading: true });

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
