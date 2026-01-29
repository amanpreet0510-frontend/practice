import React,{useState,useEffect} from 'react'
import { Card, CardHeader,CardTitle } from './Card';
import { Button } from '@/components/ui/button'
import { X } from "lucide-react";
import { Input } from './input';
import { useAppDispatch } from "@/app/hooks";
import { inviteUser } from '@/slices/profileSlice';

export type userRole="hr"|"admin"|"employee"

type InviteUserProps  = {
  open: boolean
  onClose: () => void
//   userId:string
//   currentRole:userRole
//   onSuccess?: () => void
}

const InviteUser = ({open,
    onClose,
    // currentRole,
    // userId,
    // onSuccess
  }: InviteUserProps )=> {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    // useEffect(() => {
    //     setRole(currentRole)
    //   }, [currentRole])
    

    const handleSendInvite = async () => {
      if (!name || !email || !role) return alert("Please fill all fields");
  
      try {
        const res = await fetch("/api/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, role }),
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          throw new Error(data.error || "Failed to invite user");
        }
    
        console.log("Invited user:", data);
        onClose();
        setName("");
        setEmail("");
        setRole("employee");
      } catch (err: any) {
        alert(err.message);
      }
    };

     

   
    

    return (
        <>
         {open &&   <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50  '>
        <div className='bg-white w-[600px]  h-118 rounded-xl p-6 shadow-xl'>
          <div className='flex justify-between mb-5 pb-5'>
            <div>
              <h3 className='text-2xl font-bold'>Invite New User</h3>
              <h4 className='text-gray-400 text-md font-medium'>Enter the user details to send an invitation</h4>
            </div>
            
            <div>
              <X onClick={onClose}/>
            </div>
          </div>
          <CardTitle className='mt-2 text-lg'>Full Name</CardTitle>
          <Input placeholder='name' className="border p-2 mt-2 rounded w-full" value={name} onChange={(e)=>setName(e.target.value)}></Input>
          <CardTitle className='mt-2 text-lg'>Email</CardTitle>
          <Input placeholder='email' className="border p-2 mt-2 rounded w-full" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
          <CardTitle className='mt-2 text-lg'>Role</CardTitle>
          <div className='flex flex-col'>
            <select 
            value={role} 
            onChange={(e)=>setRole(e.target.value)}
            className="border p-2 rounded mt-2 w-full">
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            <Button className='mt-7 text-lg p-6' onClick={handleSendInvite} >Send Invitation</Button>
          </div>
        </div>
      </Card>}
        </>
    )
}

export default InviteUser