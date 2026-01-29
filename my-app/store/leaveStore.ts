import { create } from "zustand";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { LeaveBalance } from "@/types/leaves.types";

interface LeaveStore {
  leaves: LeaveBalance[];
  totalRemaining: number;
  loading: boolean;
  error: string | null;
  fetchLeaveBalance: (userId: string) => Promise<void>;
}

export const useLeaveStore = create<LeaveStore>((set) => ({
  leaves: [],
  totalRemaining: 0,
  loading: false,
  error: null,

  fetchLeaveBalance: async (userId: string) => {
  set({ loading: true, error: null });

  
  const supabase = getSupabaseClient();
    const { data: policies, error: policyError } = await supabase
    .from("leave_policies")
    .select("leave_type, yearly_quota");

  if (policyError) {
    set({ loading: false, error: policyError.message });
    return;
  }

 
  const { data: usedLeaves } = await supabase
    .from("leave_requests")
    .select("leave_type, days")
    .eq("user_id", userId)
    .eq("status", "approved");

 
  const map: Record<
    string,
    { leave_type: string; total: number; used: number; remaining: number }
  > = {};

  policies?.forEach((p) => {
    const quota = Number(p.yearly_quota); 

    map[p.leave_type] = {
      leave_type: p.leave_type,
      total: quota,
      used: 0,
      remaining: quota,
    };
  });

 
  usedLeaves?.forEach((u) => {
    if (!map[u.leave_type]) return;

    const days = Number(u.days);

    map[u.leave_type].used += days;
    map[u.leave_type].remaining -= days;
  });


  const leaves = Object.values(map);

  const totalRemaining = leaves.reduce(
    (sum, l) => sum + l.remaining,
    0
  );

  set({
    leaves,
    totalRemaining,
    loading: false,
  });
}
}))