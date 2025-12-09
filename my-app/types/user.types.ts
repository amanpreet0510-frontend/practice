export type UserRole = "admin" | "hr" | "employee";

export interface User {
  id: string;
  email:string;
  // name: string;
  // role: UserRole;
}
