export interface Notifications {
  id: string;
  title:string;
  message: string;
  type:"info" | "success" | "warning" | "error";
  role: "employee" | "hr" | "admin" | "all";
  is_read: boolean,
  userId:number
}
