import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle } from './Card';
import { Button } from '@/components/ui/button'
import { X } from "lucide-react";
import { Input } from './input';
import { useAppDispatch } from "@/app/hooks";
import { inviteUser } from '@/slices/profileSlice';

export type userRole = "hr" | "admin" | "employee"

type InviteUserProps = {
  open: boolean
  onClose: () => void
}

const InviteUser = ({ open,
  onClose,
}: InviteUserProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

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
      {open && <Card className='fixed  inset-0 z-100  top-0  flex items-center justify-center bg-black/50 '>
        <div className='bg-zinc-300 m-5 max-w-[10px] h-100 lg:w-[600px]  lg:h-135 rounded-xl p-10 shadow-xl border-purple-100 border-2'>
          <div className='flex justify-between mb-5 pb-5'>
            <div>
              <h3 className='text-2xl font-bold text-zinc-800 '>Invite New User</h3>
              <h4 className='text-gray-400 text-md font-medium pt-2'>Enter the user details to send an invitation</h4>
            </div>

            <div>
              <X onClick={onClose} />
            </div>
          </div>
          <CardTitle className='mt-2 text-lg'>Full Name</CardTitle>
          <Input placeholder='name' className="border border-zinc-500  p-6 mt-2 rounded w-full" value={name} onChange={(e) => setName(e.target.value)}></Input>
          <CardTitle className='mt-2 text-lg'>Email</CardTitle>
          <Input placeholder='email' className="border border-zinc-500  p-6  mt-2 rounded w-full" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
          <CardTitle className='mt-2 text-lg'>Role</CardTitle>
          <div className='flex flex-col'>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-3 rounded mt-2 w-full border-zinc-500   ">
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            <Button className='mt-7 text-lg p-6 bg-[#0F0E23] text-zinc-300' onClick={handleSendInvite} >Send Invitation</Button>
          </div>
        </div>
      </Card>}
    </>
  )
}

export default InviteUser