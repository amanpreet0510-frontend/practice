export interface User {
  id: string;
  email:string;
  name: string;
  role: string;
  first_time: boolean,
  image:string | null,
  mobile: string | null,
  is_active:boolean,
  position?: string | null
  department?: string | null
  reports_to?: string | null
}
