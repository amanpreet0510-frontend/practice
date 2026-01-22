"use client"
import React, { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { LucideSquarePen, LucideToggleRight, LucideTrash, LucideUserPlus } from 'lucide-react';
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user.types";
import { supabase } from '@/lib/supabaseClient'
import { fetchAllUsers } from "../../slices/profileSlice";
import { RootState, AppDispatch } from "@/store";
import EditRole from '@/components/ui/EditRole';


const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [active, setIsActive] = useState(true);


  const [employee, setEmployee] = useState<User[]>([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  console.log('users', users)

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: !currentStatus })
      .eq("id", id)

    if (error) {
      console.error(error.message)
      return
    }

    setEmployee((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, is_active: !currentStatus } : u
      )
    )
  }

  const [open, setopen] = useState(false);



  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='text-5xl font-bold'>User Management</h1>
          <h3 className='text-2xl pt-5 text-gray-500'>Invite, manage, and control user access</h3>
        </div>
        <div className='flex justify-end'>
          <Button className='bg-[#BBC863] m-10 p-7 text-white text-lg'><LucideUserPlus />Invite User</Button>
        </div>
      </div>
      <Card className='p-5 mt-5'>
        <CardTitle className='text-2xl font-bold'>All Users</CardTitle>
        <Input type='text' placeholder='Search.....' className='h-15' />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>

              {users.map((item, id) =>
                <>
                  <TableRow>
                    <TableHead>{item?.name}</TableHead>
                    <TableHead>{item?.role}</TableHead>
                    <TableHead>{item?.email}</TableHead>
                    <TableHead> <Button >
                      {item.is_active ? "active" : "Inactive"}
                    </Button></TableHead>
                    <TableHead> <div className='flex justify-around gap-2'>
                      <Button
                        onClick={() => {
                          setopen(true)
                          setSelectedUser(item)
                        }
                        }

                      >  <LucideSquarePen className='bg-gray-400' /></Button>
                      {selectedUser && (
                        <EditRole
                          open={open}
                          onClose={() => setopen(false)}
                          userId={selectedUser.id}
                          currentRole={selectedUser.role as "hr" | "admin" | "employee"}
                          onSuccess={() => dispatch(fetchAllUsers())}
                        />
                      )}
                      <LucideToggleRight onClick={() => toggleUserStatus(item.id, item.is_active)} className='bg-green-300 rounded-2xl'></LucideToggleRight>
                      <LucideTrash className='bg-red-500 rounded-sm' />
                    </div></TableHead>
                  </TableRow>
                </>
              )}

            </TableHeader>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement