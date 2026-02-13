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
      <div className='bg-gradient-to-r from-[#0D091E] to-[#54239B] rounded-2xl ms-15 me-15 mt-8 sticky top-0 z-50 shadow-sm p-10'>
        <h1 className='text-white text-4xl  font-bold'>
          Request Leave 
        </h1>
        <p className='text-zinc-400 text-md mt-2'>Submit a new leave request and notify your manager.</p>
      </div>
      <div className='grid grid-cols-3 gap-20 m-15 mb-3'>
      <div>
        <Card className='p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-xl'>Annual Leave Balance</span>
           <span className='text-blue-700'>{totalRemaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div>
        <Card className='p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-xl'>Sick Leave Balance</span>
           <span className='text-blue-700'>{leaves[0]?.remaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div>
        <Card className='p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-xl'>Pending request</span>
           <span className='text-blue-700'>{pendingCount}</span>
           <p>Available</p>
        </Card>
      </div>
      </div>
      <div className='w-full'>
        <div className='p-15 pt-10'>
          <ApplyLeaveCard />
        </div>
        <div className='flex ps-15 pe-15 mb-18'>
          <LeaveDetailsCard />
        </div>
      </div>
    </>
  )
}

export default LeaveRequestPage;
