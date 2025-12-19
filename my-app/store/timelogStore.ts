import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

export interface TimeLogState{
  totalHours: number;
  loading: boolean;
  error: string|null;
  fetchLoggedHours:(userId?: string)=>Promise<void>;
  logHours: (hours: number) => Promise<void>;
}

export const usetimeLogStore=create<TimeLogState>((set) => ({
  totalHours: 0,
  loading: false,
  error: null,

 fetchLoggedHours: async (userId?: string) => {
  set({ loading: true, error: null });


  if (!userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      set({ loading: false, error: "No authenticated user" });
      return;
    }
    userId = user.id;
  }

  const { data, error } = await supabase
    .from("employee_logged_hours")
    .select("hours")
    .eq("user_id", userId);

  if (error) {
    set({ loading: false, error: error.message });
    return;
  }

  const total = data?.reduce((sum, log) => sum + Number(log.hours), 0) ?? 0;

  set({ totalHours: total, loading: false });
 },


 
 logHours: async (hours: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No authenticated user");
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("employee_logged_hours")
    .insert([
      {
        user_id: user.id,
        log_date: today,
        hours,
      },
    ]);

  if (error) {
    console.error("Error logging hours:", error);
  } else {
    console.log("Logged hours successfully:", data);
    set((state) => ({
      totalHours: (state.totalHours)
        ? state.totalHours + (hours)
        : (hours),
    }));
  }
 }

}));