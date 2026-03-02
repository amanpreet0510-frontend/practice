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
      <div className='bg-gradient-to-r from-[#0D091E] to-[#54239B] rounded-2xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 mt-4 sm:mt-6 md:mt-0 lg:mt-2 sticky top-0 sm:top-1 z-40 shadow-sm p-4 sm:p-6 md:p-8 lg:p-8'>
        <h1 className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>
          Request Leave 
        </h1>
        <p className='text-zinc-400 text-sm sm:text-base mt-1 sm:mt-2'>Submit a new leave request and notify your manager.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6   sm:gap-6 md:gap-10 lg:gap-16 m-2 sm:m-4 md:m-6 lg:m-8 mb-3'>
      <div className='min-w-0'>
        <Card className='p-5 mt-4 sm:mt-0 sm:p-6 md:p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-base sm:text-lg md:text-xl'>Annual Leave Balance</span>
           <span className='text-blue-700'>{totalRemaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div className='min-w-0'>
        <Card className='p-5 sm:p-6 md:p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-base sm:text-lg md:text-xl'>Sick Leave Balance</span>
           <span className='text-blue-700'>{leaves[0]?.remaining}days</span>
           <p>Available</p>
        </Card>
      </div>
      <div className='min-w-0 sm:col-span-2 lg:col-span-1'>
        <Card className='p-5 sm:p-6 md:p-7 bg-zinc-200 border border-zinc-300 text-zinc-600'>
           <span className='text-zinc-600 text-base sm:text-lg md:text-xl'>Pending request</span>
           <span className='text-blue-700'>{pendingCount}</span>
           <p>Available</p>
        </Card>
      </div>
      </div>
      <div className='w-full min-w-0 px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='pt-6 sm:pt-8 md:pt-5 lg:pt-5 pb-4'>
          <ApplyLeaveCard />
        </div>
        <div className='flex mb-12 sm:mb-16 md:mb-18 mt-10'>
          <LeaveDetailsCard />
        </div>
      </div>
    </>
  )
}

export default LeaveRequestPage;
