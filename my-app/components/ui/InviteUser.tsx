import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle } from './Card';
import { Button } from '@/components/ui/button'
import { X } from "lucide-react";
import { Input } from './input';
import { useAppDispatch } from "@/app/hooks";
import { inviteUser } from '@/slices/profileSlice';
import { useAppSelector } from "@/app/hooks";
import { toast, Toaster } from "sonner";





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
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [reportsTo, setReportsTo] = useState("");

  // const te = useAppSelector((state: RootState) => state.users.users);
  const users = useAppSelector((state) => state.users.users);


  const handleSendInvite = async () => {
    if (!name || !email || !role) return toast("Please fill all fields", {
      position: 'top-center',
    })

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, position, department, reports_to: reportsTo ? reportsTo : null, }),
      });

      const data = await res.json();

      if (data.alreadyExists) {
        toast.error("User already invited");
      } else {
        toast.success("Invite sent successfully");
      }
    
  

  // if (!res.ok) {
  //   toast.error(data.error || "Failed to invite user", {
  //     position: 'top-center',
  //   })
  // }

  // if (res.ok) {
  //   toast.success("invite sent successfully", {
  //     position: 'top-center',
  //   })
  // }

  onClose();
  setName("");
  setEmail("");
  setRole("employee");
  setPosition("");
  setDepartment("");
  setReportsTo("");
} catch (err: any) {
  alert(err.message);
}
  };


return (
  <>
    {open && <Card className='fixed  inset-0 z-100  top-0  flex items-center justify-center bg-black/50 '>
      <div className='bg-zinc-300 m-5 max-w-[600px] h-max lg:w-[600px]  lg:h-max rounded-xl p-10 shadow-xl border-purple-100 border-2'>
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
          <CardTitle className='mt-2 text-lg'>Position</CardTitle>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-3 rounded mt-2 w-full border-zinc-500"
          >
            <option value="">Select Position</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="HR Manager">HR Manager</option>
            <option value="HR Executive">HR Executive</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Engineering Manager">Engineering Manager</option>
            <option value="CTO">CTO</option>
            <option value="CEO">CEO</option>
            <option value="Intern">Intern</option>
          </select>
          <CardTitle className='mt-2 text-lg'>Reports To</CardTitle>
          <select
            value={reportsTo}
            onChange={(e) => setReportsTo(e.target.value)}
            className="border p-3 rounded mt-2 w-full border-zinc-500"
          >
            <option value="">Select Manager</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
        <Button className='mt-7 text-lg p-6 bg-[#0F0E23] text-zinc-300' onClick={handleSendInvite} >Send Invitation</Button>
      </div>

    </Card>}
  </>
)
}

export default InviteUser