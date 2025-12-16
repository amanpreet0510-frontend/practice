import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { tasks } from "@/types/task.types";

interface taskStore {
  tasks: tasks[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
}

export const usetaskStore = create<taskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

 fetchTasks: async () => { 


const { data, error, status } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: false });
 
 if (error) {
      set({
        loading: false,
        error: error.message,
      });
      return;
    }

    set({ tasks: data ?? [], loading: false });

console.log('data', data)
 
}}))
