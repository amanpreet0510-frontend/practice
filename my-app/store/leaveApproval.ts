// store/leaveApprovalStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { LeaveBalance,LeaveRequest } from "../types/leaves.types";

interface LeaveApprovalStore {
  requests: LeaveRequest[];
  loading: boolean;
  error: string | null;

  fetchPendingLeaves: () => Promise<void>;
  updateLeaveStatus: (
    requestId: string,
    status:string
  ) => Promise<void>;
}

export const useLeaveApprovalStore = create<LeaveApprovalStore>((set) => ({
  requests: [],
  loading: false,
  error: null,

  // 🔹 HR/Admin fetch all pending leaves
  fetchPendingLeaves: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

      

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ requests: data ?? [], loading: false });
  },

  // 🔹 HR/Admin approve or reject
  updateLeaveStatus: async (requestId, status) => {
    set({ loading: true, error: null });

    const { error } = await supabase
      .from("leave_requests")
      .update({ status })
      .eq("id", requestId);

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    // Update local state
    set((state) => ({
      requests: state.requests.filter((r) => r.id !== requestId),
      loading: false,
    }));
  },
}));
