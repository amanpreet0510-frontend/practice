export interface User {
  id: string;
  email:string;
  name: string;
  role: string;
  first_time: boolean,
  image:string | null
}
