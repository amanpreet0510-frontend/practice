import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { LeaveRequest } from "../types/leaves.types";

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
  applyLeave: (payload: ApplyLeavePayload, userId: string) => Promise<void>;
}

export const useLeaveRequestStore = create<LeaveRequestStore>((set) => ({
  requests: [],
  loading: false,

  fetchMyLeaveRequests: async (userId: string) => {
    if (!userId) return;
    set({ loading: true });
    
    const { data, error } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: false });

    if (error) {
      console.error(error);
      set({ loading: false });
      return;
    }

    set({ requests: data ?? [], loading: false });
  },

  applyLeave: async (payload: ApplyLeavePayload) => {
  set({ loading: true });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  console.log("auth user:", user);

  if (authError || !user) {
    console.error("User not authenticated");
    set({ loading: false });
    return;
  }

  const { data, error } = await supabase
  
    .from("leave_requests")
    .insert([
      {
        user_id: user.id,
        ...payload,
        status: "pending",
      },
    ])
    .select(); 

  set({ loading: false });
  }}))
