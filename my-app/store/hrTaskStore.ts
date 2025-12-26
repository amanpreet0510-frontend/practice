import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { Task } from "@/types/task.types";

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface hrTaskStore{
    tasks: Task[];
    loading: boolean;
    error: string | null;
    status: TaskStatus | "all";
  
    fetchTasks: (status?: TaskStatus | "all") => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;

}

export const useHrTaskStore= create<hrTaskStore>((set) => ({
    tasks: [],
    loading: false,
    error: null,
    status: "all",


    fetchTasks: async (status) => {
        set({ loading: true, error: null });
    
        try {
          let query = await supabase.rpc("get_tasks_with_employee");
    
          if (status && status !== "all") {
            query = query.eq("task_status", status); 
          }
    
          const { data, error } = query;
       
          if (error) throw error;
    
          set({ tasks: data || [], loading: false, status: status || "all" });
        } catch (err: any) {
          set({ error: err.message, loading: false });
          console.error("fetchTasks error:", err);
        }
      },
      updateTaskStatus: async (id, status) => {
        set({ loading: true, error: null });
    
        try {
          const { data, error } = await supabase
            .from("tasks")
            .update({ task_status: status }) 
            .eq("id", id)
            .select();
    
          if (error) throw error;
    
         
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, task_status: status } : task
            ),
            loading: false,
          }));
    
          ;
        } catch (err: any) {
          set({ error: err.message, loading: false });
          console.error("updateTaskStatus error:", err);
        }
      }

}))