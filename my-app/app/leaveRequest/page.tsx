'use client';
import React,{useEffect} from 'react'
import { Toaster } from "sonner";
import ApplyLeaveCard from '@/components/ui/ApplyleaveCard';
import LeaveDetailsCard from '@/components/ui/LeaveDetailsCard';
import {Card} from '@/components/ui/Card';
import { useLeaveStore } from "@/store/leaveStore";
import { useUserStore } from "@/store/userStore";
import { useLeaveRequestStore } from "@/store/leaveRequest";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch } from "@/app/hooks";
import { fetchUsersOnLeave } from "@/slices/showLeaveRequest";

const LeaveRequestPage = () => {

   const dispatch = useAppDispatch();
   const user = useUserStore((s) => s.user);

  const { onLeave, pendingCount, error } = useSelector(
      (state: RootState) => state.leaves
    );
    

    useEffect(() => {
        dispatch(fetchUsersOnLeave());
      }, [dispatch]);
  const { leaves, totalRemaining, loading, fetchLeaveBalance } = useLeaveStore();
  const { fetchMyLeaveRequests } = useLeaveRequestStore();
  

  
  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalance(user.id);
      fetchMyLeaveRequests(user.id);
    }
  }, [user?.id, fetchLeaveBalance, fetchMyLeaveRequests]);


  const yearlyTotal = leaves.reduce((sum, l) => sum + l.total, 0);
  const yearlyUsed = leaves.reduce((sum, l) => sum + l.used, 0);


  return (
    <>
      <Toaster position="top-center" />
      <div className='bg-gradient-to-b  from-[#0D091E] to-[#54239B] p-10'>
        <h1 className='text-white text-5xl font-bold'>
          Request Leave 
        </h1>
        <p className='text-zinc-400 text-lg mt-4'>Submit a new leave request and notify your manager.</p>
      </div>
      <div className='grid grid-cols-3'>
      <div>
        <Card className='h-50 w-100 m-15 mb-2  p-12 bg-zinc-200 border border-purple-200 text-zinc-600'>
           <span>Annual Leave Balance</span>
           <span className='text-blue-700'>{totalRemaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div>
        <Card className='h-50 w-100 m-15 mb-2  p-12 bg-zinc-200 border border-purple-200 text-zinc-600'>
           <span>Sick Leave Balance</span>
           <span className='text-blue-700'>{leaves[0]?.remaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div>
        <Card className='h-50 w-100 m-15 mb-2  p-12 bg-zinc-200 border border-purple-200 text-zinc-600'>
           <span>Pending request</span>
           <span className='text-blue-700'>{pendingCount}</span>
           <p>Available</p>
        </Card>
      </div>
      </div>
      <div className='w-full'>
        <div className=' p-10'>
          <ApplyLeaveCard />
        </div>
        <div className='flex p-10'>
          <LeaveDetailsCard />
        </div>
      </div>
    </>
  )
}

export default LeaveRequestPage;
