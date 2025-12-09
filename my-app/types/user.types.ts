export type UserRole = "admin" | "hr" | "employee";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
