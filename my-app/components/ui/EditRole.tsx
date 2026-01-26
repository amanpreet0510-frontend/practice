import React, { useState,useEffect } from 'react';
import { Card, CardTitle } from './Card';
import { Button } from './button';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile} from "@/slices/profileSlice";
import {updateUserRole,deleteUserProfile} from '@/supabaseApi/supabaseApi';


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
      <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/5  '>
        <div className='bg-white w-[400px] rounded-xl p-6 shadow-xl'>
          <div className='flex justify-around'>
            <div>
              <h3 className='text-2xl'>Edit User Role</h3>
              <h4 className='text-gray-400 text-lg font-medium'>Change the role for User</h4>
            </div>
            
            <div>
              <Button onClick={onClose}>close</Button>
            </div>
          </div>
          <CardTitle className='mt-2 text-lg'>New Role</CardTitle>
          <div className='flex flex-col'>
            <select 
            value={role} 
            onChange={(e)=>setRole(e.target.value as userRole )}
            className="border p-2 rounded w-full">
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            <Button className='mt-3' onClick={handleSave}>Update Role</Button>
          </div>
        </div>
      </Card>}
    </>
  )
}

export default EditRole