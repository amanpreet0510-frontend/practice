import { create } from "zustand";
import { User } from "@/types/user.types";
import { persist } from "zustand/middleware";
import { getSupabaseClient } from '@/lib/supabaseClient'

interface UserState {
  user: User | null;
  users: User[];
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      users: [],
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      fetchUser: async () => {
        const supabase = getSupabaseClient()
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*");

          

        set({
          users: data ?? [],
        });

        

      },
    }),



    {
      name: "user-storage",
    }
  )
);
