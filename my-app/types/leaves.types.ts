export interface LeaveBalance {
  leave_type: string;
  total: number;
  used: number;
  remaining: number;
}

export interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  leave_unit: "full" | "half" | "short";
  status: "pending" | "approved" | "rejected";
  reason: string | null;
  attachment_url: string | null;
  created_at: string;
}
