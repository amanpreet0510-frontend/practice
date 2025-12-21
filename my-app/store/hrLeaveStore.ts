import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

export interface HRLeaveRequest {
  id: string;
  user_id: string;
  leave_type: string;
  days: number;
  start_date: string;
  end_date: string;
  status: string;
}

interface HRLeaveStore {
  requests: HRLeaveRequest[];
  loading: boolean;
  fetchPendingLeaves: () => Promise<void>;
  approveLeave: (leaveId: string) => Promise<void>;
  rejectLeave: (leaveId: string) => Promise<void>;
}

export const useHRLeaveStore = create<HRLeaveStore>((set) => ({
  requests: [],
  loading: false,

  // 1️⃣ Fetch pending leaves
  fetchPendingLeaves: async () => {
    set({ loading: true });

    const { data } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    set({ requests: data || [], loading: false });
  },

  // 2️⃣ Approve leave
  approveLeave: async (leaveId) => {
    await supabase
      .from("leave_requests")
      .update({ status: "approved" })
      .eq("id", leaveId);
  },

  // 3️⃣ Reject leave
  rejectLeave: async (leaveId) => {
    await supabase
      .from("leave_requests")
      .update({ status: "rejected" })
      .eq("id", leaveId);
  },
}));
