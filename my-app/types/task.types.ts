export type TaskStatus="pending"|"completed"|"in_progress"|"cancelled"|"all"|"undefined"


export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  assigned_by: string;
  due_date:number;
  task_status: "pending"|"completed"|"in_progress"|"cancelled"|"all"|"undefined";
  created_at: string;
  statusFilter: "all" | "pending"|"completed"|"in_progress"|"cancelled";
  priority:"low"|"medium"|"high";
}

export interface AssignTaskPayload {
  title: string;
  description: string;
  employeeId: string;
  dueDate: string;
}