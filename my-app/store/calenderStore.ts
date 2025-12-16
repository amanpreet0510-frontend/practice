import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import { CalendarEvent } from "../types/calender.types";

interface calenderStore {
  CalendarEvent: CalendarEvent[];
  loading: boolean;
  error: string|null;
  fetchEvents: (userId: string) => Promise<void>;
}

export const usecalenderStore = create<calenderStore>((set) => ({
  CalendarEvent: [],
  loading: true,
  error: '',

  fetchEvents: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("public_calendar")
      .select("*")
      .order("date", { ascending: true });


    if (error) {
      set({
        loading: false,
        error: error.message,
      });
      return;
    }
set({
      CalendarEvent: data ?? [],
      loading: false,
    });

  },
}));
