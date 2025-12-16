// types/leave.ts
export interface LeaveBalance {
  leave_type: string;
  remaining: number;
}

export interface LeaveApproval {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

