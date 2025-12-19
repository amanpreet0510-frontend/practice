import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { tasks } from "@/types/task.types";
//import type { AssignTaskPayload } from "@/types/task.types";

export interface AssignTaskPayload {
  title: string;
  description: string;
  employeeId: string;
  dueDate: string;
}


interface taskStore {
  tasks: tasks[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;


  assignTaskToEmployee: (
    payload: AssignTaskPayload
  ) => Promise<void>;

  assignTaskToAll: (
    title:string,
    description:string,
    dueDate:number,
    priority:string,
  )=> Promise<void>;

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


 
},
  assignTaskToEmployee: async ({
    title,
    description,
    employeeId,
    dueDate
  }:AssignTaskPayload) => {
    const { data } = await supabase.auth.getUser();

    const userId = data?.user?.id;

    if (!userId) throw new Error("User not authenticated");

    
    const { error } = await supabase.from("tasks").insert({
      title,
      description,
      assigned_to: employeeId,
      assigned_by: userId,
      due_date: dueDate,
      status: "pending",
    });

    // if (error) throw error;
    if (error) {
  console.error("Supabase insert error:", error);
  console.error("Message:", error.message);
  console.error("Details:", error.details);
  console.error("Hint:", error.hint);
  console.error("Code:", error.code);
  throw error;
}
  },

 assignTaskToAll: async (
    title:string,
    description:string,
    dueDate:number,
    priority = "medium",
  ) => {
    set({ loading: true, error: null });

    const { error } = await supabase.rpc(
      "assign_task_to_all_employees",
      {
        task_title: title,
        task_description: description,
        task_due_date: dueDate,
        task_priority: priority,
      }
    );

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ loading: false });
  }

}))