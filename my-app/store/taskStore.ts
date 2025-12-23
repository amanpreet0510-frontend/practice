//import { TaskStatus } from './hrTaskStore';
//import  {TaskStatus}  from '@/types/task.types';
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { Task } from "@/types/task.types";

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface AssignTaskPayload {
  title: string;
  description: string;
  employeeId: string;
  dueDate: string;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  task_status: TaskStatus | "all";
  statusFilter:'all'|TaskStatus;

  setStatusFilter:(status: TaskStatus | "all") => Promise<void>;

  fetchTasks: (status?: TaskStatus | "all") => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  assignTaskToEmployee?: (payload: AssignTaskPayload) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  task_status: "all",
  statusFilter:'all',


  setStatusFilter: async(status) => {
    set({
      statusFilter: status,
      loading: true,
      error: null,
    });
  },
  
  fetchTasks: async (status) => {
    set({ loading: true, error: null });

    try {
      let query = supabase.from("tasks").select("*").order("created_at", {
        ascending: false,
      });

      if (status && status !== "all") {
        query = query.eq("task_status", status); 
      }

      const { data, error } = await query;

      if (error) throw error;

      set({ tasks: data || [], loading: false, task_status: status || "all" });
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

       console.log('Updated data', status)

      if (error) throw error;

     
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task,task_status: status } : task
        ),
        loading: false,
      }));

      ;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      console.error("updateTaskStatus error:", err);
    }
  },

  
  assignTaskToEmployee: async ({ title, description, employeeId, dueDate }) => {
    set({ loading: true, error: null });
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) throw new Error("User not authenticated");

      const { data, error } = await supabase.from("tasks").insert({
        title,
        description,
        assigned_to: employeeId,
        assigned_by: userId,
        due_date: dueDate,
        task_status: "", 
      });

      if (error) throw error;

     
      set((state) => ({
        tasks: [...state.tasks, ...(data || [])],
        loading: false,
      }));

      console.log("Task assigned:", data);
    } catch (err: any) {
      set({ error: err.message, loading: false });
      console.error("assignTaskToEmployee error:", err);
    }
  },
}));
