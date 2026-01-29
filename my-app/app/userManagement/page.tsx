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
import { getSupabaseClient } from '@/lib/supabaseClient'
import { fetchAllUsers } from "../../slices/profileSlice";
import { RootState, AppDispatch } from "@/store";
import EditRole from '@/components/ui/EditRole';
import { deleteUserProfile, updateUserStatus } from '@/supabaseApi/supabaseApi';
import { fetchProfile } from "@/slices/profileSlice";
import InviteUser from '@/components/ui/InviteUser';


const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onSuccess = () => {
    dispatch(fetchAllUsers())
  }


  const supabase = getSupabaseClient();

  const { users, error } = useSelector(
    (state: RootState) => state.users
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [search, setSearch] = useState<string>("");




  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('users state updated:', users);
  //   console.log('users count:', users?.length || 0);
  //   if (error) {
  //     console.error('Error fetching users:', error);
  //   }
  //   if (loading) {
  //     console.log('Loading users...');
  //   }
  // }, [users, error]);





  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    console.log('userId123', userId)
    try {
      setLoading(true)
      await updateUserStatus(userId, !currentStatus)

      dispatch(fetchAllUsers())
    } catch (err) {
      console.error("Failed to update status", err)
    } finally {
      setLoading(false)
    }
  }


  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleDelete = async (userId: string) => {
    if (!userId) return;

    try {
      setLoading(true)
      await deleteUserProfile(userId)
      onSuccess?.()
    } catch (err) {
      console.error("Failed to delete user", err)
    } finally {
      setLoading(false)
    }
  }


  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  })
    //.sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='text-5xl font-bold'>User Management</h1>
          <h3 className='text-2xl pt-5 text-gray-500'>Invite, manage, and control user access</h3>
        </div>
        <div className='flex justify-end'>
          <Button className='bg-[#BBC863] m-10 p-7 text-white text-lg' onClick={() => {
            setopen(true)
          }
          } ><LucideUserPlus />Invite User</Button>
          <InviteUser open={open}
            onClose={() => setopen(false)}/>
            
        </div>
      </div>
      <Card className='p-5 mt-5'>
        <CardTitle className='text-2xl font-bold'>All Users</CardTitle>
        <Input type='text' placeholder='Search.....' className='h-15' value={search}
          onChange={(e) => setSearch(e.target.value)} />
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
            </TableHeader>
            {filteredUsers.map((item, id) =>
              <>
                <TableRow key={item.id}>
                  <TableHead>{item?.name}</TableHead>
                  <TableHead>{item?.role}</TableHead>
                  <TableHead>{item?.email}</TableHead>
                  <TableHead> <Button >
                    {item.is_active ? "active" : "Inactive"}
                  </Button></TableHead>
                  <div className='flex justify-around gap-2'>
                    <Button
                      onClick={() => {
                        setSelectedUser(item)
                        setopen(true)
                      }
                      }
                    ><LucideSquarePen className='bg-gray-400' /></Button>
                    {selectedUser && (
                      <EditRole
                        open={open}
                        onClose={() => setopen(false)}
                        userId={selectedUser.id}
                        currentRole={selectedUser.role as "hr" | "admin" | "employee"}
                        onSuccess={() => dispatch(fetchAllUsers())}
                      />
                    )}
                    <LucideToggleRight onClick={() => handleToggleStatus(item.id, item.is_active)} className='bg-green-300 rounded-2xl'></LucideToggleRight>
                    <LucideTrash
                      key={item.id}
                      className="bg-red-500 rounded-sm cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </TableRow>
              </>
            )}


          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement