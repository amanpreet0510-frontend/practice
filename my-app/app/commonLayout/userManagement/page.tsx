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
import { fetchAllUsers } from "../../../slices/profileSlice";
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
    // .sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className=' w-full min-w-0 overflow-x-hidden'>
      <div className='flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 p-5 md:p-10   bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] shadow-white shadow-lg rounded-xl '>
        <div className='min-w-0'>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-zinc-100'>User Management</h1>
          <h3 className='text-sm sm:text-base pt-1 sm:pt-2 text-zinc-400'>Invite, manage, and control user access</h3>
        </div>
        <div className='flex justify-start sm:justify-end shrink-0'>
          <Button className='bg-zinc-300 m-2 sm:m-4 md:m-1 p-4 sm:p-5 md:p-7 text-[#492087] font-bold text-sm sm:text-base lg:text-lg' onClick={() => {
            setopenn(true)
          }
          } ><LucideUserPlus className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'/>Invite User</Button>
          
          <InviteUser open={openn}
            onClose={() => setopenn(false)}/>
            
        </div>
      </div>
      <Card className='p-4 sm:p-6 md:p-8 lg:p-10 pb-6 sm:pb-10 m-2 mt-6 sm:mt-10 bg-zinc-200 rounded-xl border border-zinc-400 shadow-zinc-600 shadow-sm overflow-x-auto'>
        <CardTitle className='text-lg sm:text-xl md:text-2xl font-semibold sm:p-6 md:p-0 xl:p-10 ps-3 sm:ps-5  sm:pt-5 pb-0 text-zinc-600'>All Users</CardTitle>
       <div className=''><Input type='text' placeholder='Search.....' className='rounded-sm h-10 sm:h-12 md:h-14 w-full bg-zinc-100 border border-zinc-200 shadow-zinc-500 shadow-sm' value={search}
          onChange={(e) => setSearch(e.target.value)} /></div>
        <CardContent>
        <div className="mt-0 sm:mt-5 overflow-x-auto">
        <Table>
            <TableHeader>
              <TableRow className='text-zinc-600'>
                <TableHead className='text-sm sm:text-base md:text-lg lg:text-xl'>Name</TableHead>
                <TableHead className='text-sm sm:text-base md:text-lg lg:text-xl'>Role</TableHead>
                <TableHead className='text-sm sm:text-base md:text-lg lg:text-xl'>Department</TableHead>
                <TableHead className='text-sm sm:text-base md:text-lg lg:text-xl'>Status</TableHead>
                <TableHead className='text-sm sm:text-base md:text-lg lg:text-xl'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=''>
            {filteredUsers.map((item, id) =>
              <>
                <TableRow key={item.id} className='border-b-0 text-zinc-600 text-xs sm:text-sm'>
                  <TableCell className='mt-4 sm:mt-6 md:mt-10 py-2 sm:py-4'>
                    <div className='flex gap-2 sm:gap-5 items-center'>
                    <div>
                  <Avatar>
                  <AvatarImage alt={item.name ?? ""} src={item.image ?? undefined}/>
                    </Avatar>
                    </div>
                    <div>{item.name}</div>
                    </div>
                    </TableCell>
                  <TableCell className='mt-4 sm:mt-6 md:mt-10 py-2 sm:py-4'>{item?.role}</TableCell>
                  <TableCell className='mt-4 sm:mt-6 md:mt-10 py-2 sm:py-4 truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]'>{item?.email}</TableCell>
                  <TableCell className='mt-4 sm:mt-6 md:mt-10 py-2 sm:py-4'><Button className={`text-xs sm:text-sm ${item.is_active?"text-green-700":"text-red-700"}`} >
                    {item.is_active ? "active" : "Inactive"}
                  </Button></TableCell>
                  <TableCell className='mt-4 sm:mt-6 md:mt-10 py-2 sm:py-4'>
                  <div className='flex justify-around gap-1 sm:gap-2'>
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
                  </TableCell>
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