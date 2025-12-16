// store/leaveStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { LeaveBalance } from "@/types/leaves.types";

interface LeaveStore {
  leaves: LeaveBalance[];
  totalRemaining: number;
  loading: boolean;
  error: string | null;
  fetchLeaveBalance: (userId: string) => Promise<void>;
  resetLeaveStore: () => void;
}

export const useLeaveStore = create<LeaveStore>((set) => ({
  leaves: [],
  totalRemaining: 0,
  loading: false,
  error: null,

  fetchLeaveBalance: async (userId: string) => {
    

    set({ loading: true, error: null });

    const { data, error, status } = await supabase
      .from("leave_balances")
      .select("leave_type, remaining")
      .eq("user_id", userId);

        

    if (error) {
      set({
        loading: false,
        error: error.message,
      });
      return;
    }

    const totalRemaining =
      data?.reduce((sum, leave) => sum + leave.remaining, 0) ?? 0;

    set({
      leaves: data ?? [],
      totalRemaining,
      loading: false,
    });
  },

  resetLeaveStore: () =>
    set({
      leaves: [],
      totalRemaining: 0,
      loading: false,
      error: null,
    }),
}));
