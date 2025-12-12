import React from 'react'
import { useUserStore } from "@/store/userStore";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user.types";
import  Card  from '@/components/ui/Card1';



const HRDashboard = () => {

const user = useUserStore((state) => state.user);
console.log('user', user)

  return (
    <>
    <div>
     <Card 
     title={user?.name ?? ""}
     value={user?.role ?? ""}
     image={user?.image ?? ""}/>
    </div>
    </>
  )
}

export default HRDashboard;