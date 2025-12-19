export interface tasks {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  assigned_by: string;
  due_date:number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface AssignTaskPayload {
  title: string;
  description: string;
  employeeId: string;
  dueDate: string;
}