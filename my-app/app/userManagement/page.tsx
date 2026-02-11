"use client"
import React, { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableHead, TableHeader, TableRow,TableCell } from '@/components/ui/table'
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
  const [openn, setopenn] = useState(false)
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
    .sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className='p-10 '>
     
      <div className='flex justify-between  bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] shadow-white shadow-lg rounded-2xl p-5'>
        <div className=''>
          <h1 className='text-5xl font-bold text-zinc-100'>User Management</h1>
          <h3 className='text-2xl pt-5 text-zinc-400'>Invite, manage, and control user access</h3>
        </div>
        <div className='flex justify-end'>
          <Button className='bg-zinc-300 m-10 p-7 text-[#492087] font-bold text-lg' onClick={() => {
            setopenn(true)
          }
          } ><LucideUserPlus  className='w-20 h-20'/>Invite User</Button>
          
          <InviteUser open={openn}
            onClose={() => setopenn(false)}/>
            
        </div>
      </div>
      <Card className='p-10 m-10 mt-20 bg-zinc-200 rounded-2xl h-min'>
        <CardTitle className='text-4xl font-bold p-10 pt-5 pb-3 text-zinc-700 h-fit'>All Users</CardTitle>
       <div className='m-5 mt-0 mb-2'><Input type='text' placeholder='Search.....' className='rounded-full h-15 bg-zinc-100 border border-zinc-400' value={search}
          onChange={(e) => setSearch(e.target.value)} /></div>
        <CardContent>
        <div className="min-h-screen">
        <Table>
            <TableHeader>
              <TableRow className='text-zinc-600'>
                <TableHead className='text-2xl'>Name</TableHead>
                <TableHead className='text-2xl'>Role</TableHead>
                <TableHead className='text-2xl'>Department</TableHead>
                <TableHead className='text-2xl'>Status</TableHead>
                <TableHead className='text-2xl'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=''>
            {filteredUsers.map((item, id) =>
              <>
                <TableRow key={item.id} className='border-b-0 text-zinc-600'>
                  <TableCell className='mt-10'>
                    <div className='flex gap-5 text-xl'>
                    <div>
                  <Avatar>
                  <AvatarImage alt={item.name ?? ""} src={item.image ?? undefined}/>
                    </Avatar>
                    </div>
                    <div>{item.name}</div>
                    </div>
                    </TableCell>
                  <TableCell className='mt-10 text-xl'>{item?.role}</TableCell>
                  <TableCell className='mt-10 text-xl'>{item?.email}</TableCell>
                  <TableHead > <Button className='text-xl' >
                    {item.is_active ? "active" : "Inactive"}
                  </Button></TableHead>
                  <div className='flex justify-around gap-2 mt-5 text-3xl'>
                    <Button
                      onClick={() => {
                        setSelectedUser(item)
                        setopen(true)
                      }
                      }
                    ><LucideSquarePen size={20} className=' ' /></Button>
                    {selectedUser && (
                      <EditRole
                        open={open}
                        onClose={() => setopen(false)}
                        userId={selectedUser.id}
                        currentRole={selectedUser.role as "hr" | "admin" | "employee"}
                        onSuccess={() => dispatch(fetchAllUsers())}
                      />
                    )}
                    <LucideToggleRight onClick={() => handleToggleStatus(item.id, item.is_active)} className='rounded-2xl'></LucideToggleRight>
                    <LucideTrash
                      key={item.id}
                      className="rounded-sm cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </TableRow>
              </>
            )}
            </TableBody>
               </Table>
          </div>
        </CardContent>
      </Card>
      {/* <EditRole/> */}
    </div>
  )
}

export default UserManagement