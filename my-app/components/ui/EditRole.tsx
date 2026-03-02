import React, { useState,useEffect } from 'react';
import { Card, CardTitle } from './Card';
import { Button } from './button';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile} from "@/slices/profileSlice";
import {updateUserRole,deleteUserProfile} from '@/supabaseApi/supabaseApi';
import { X } from 'lucide-react';

export type userRole="hr"|"admin"|"employee"

type GlobalPopupProps = {
  open: boolean
  onClose: () => void
  userId:string
  currentRole:userRole
  onSuccess?: () => void
}


const EditRole = ( {open,
  onClose,
  currentRole,
  userId,
  onSuccess
}: GlobalPopupProps)=> {
  const dispatch = useAppDispatch();
 
  
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  
  const [role, setRole] = useState(currentRole)
  const [loading, setLoading] = useState(false)
  
 


  useEffect(() => {
    setRole(currentRole)
  }, [currentRole])

  if (!open) return null

  const handleSave = async () => {
    
    try {
      setLoading(true)
      await updateUserRole(userId, role)
      onSuccess?.() 
      onClose()
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

 
  

  
  return (
    <>
    {open &&
      <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/5'>
        <div className='bg-zinc-300 w-[200px] md:w-[500px] rounded-xl shadow-xl p-10'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-xl text-zinc-700 font-bold'>Edit User Role</h3>
              <h4 className='text-zinc-400 text-sm'>Change the role for User</h4>
            </div>
            
            <div>
              <Button onClick={onClose}><X/></Button>
            </div>
          </div>
          <div className='mt-10'>
          <CardTitle className='mt-2 text-sm'>New Role</CardTitle>
          <div className='flex flex-col'>
            <select 
            value={role} 
            onChange={(e)=>setRole(e.target.value as userRole )}
            className="border border-zinc-400 rounded w-full p-3 mt-4 mb-2 text-sm">
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            <Button className='mt-5 bg-[#0F0E23] p-6 text-zinc-300' onClick={handleSave}>Update Role</Button>
          </div>
        </div>
        </div>
      </Card>}
    </>
  )
}

export default EditRole