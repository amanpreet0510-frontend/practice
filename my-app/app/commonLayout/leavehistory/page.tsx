'use client';
import React, { useEffect } from 'react'
import { Card } from '@/components/ui/Card';
import { fetchUsersOnLeave } from '@/slices/showLeaveRequest';
import { useLeaveRequestStore } from "@/store/leaveRequest";
import { useUserStore } from "@/store/userStore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch, } from "@/app/hooks";


const LeaveHistory = () => {
   
    const { requests, fetchMyLeaveRequests } = useLeaveRequestStore();
    const { users, fetchUser } = useUserStore();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const meId = useUserStore.getState().user?.id;
        if (meId) {
            fetchMyLeaveRequests(meId);
        }
    }, [fetchMyLeaveRequests]);


    return (
        <>
            <div className='w-full min-w-0 overflow-x-hidden'>
                <Card className='bg-gradient-to-b from-[#0D091E] to-[#54239B] p-4 sm:p-6 md:p-8 lg:p-5 m-2 sm:m-4 md:m-1 rounded-2xl sticky top-1 sm:top-0 z-40'>
                    <div>
                        <h1 className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>Leave History</h1>
                        <p className='text-zinc-300 text-sm sm:text-base md:text-lg pt-2 sm:pt-4'>View all your past leave requests and their approval status.</p>
                    </div>
                </Card>
                {requests.map((item, index) =>
                    <>
                        <Card className='m-3 md:m-2 mt-8  md:mt-10  lg:m-3 lg:mt-10  sm:mt-5 bg-zinc-100 border-zinc-300 rounded-2xl'>
                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 p-4 sm:p-5'>
                                <div className='min-w-0'>
                                    <p className='text-lg sm:text-xl md:text-2xl font-bold text-zinc-600'>{item.leave_type}</p>
                                    <div className='text-zinc-500 text-xs sm:text-sm pt-2 flex flex-wrap gap-2 sm:gap-3'>
                                      <p className="whitespace-nowrap">{item.start_date} <span className='px-2'>to</span> {item.end_date}</p>
                                      <p className='text-blue-700 whitespace-nowrap'>({item.days} day)</p>
                                    </div>
                                    <p className='text-zinc-600 text-xs sm:text-sm pt-2 break-words'>
                                      Reason: <span className='text-blue-600'>{item.reason}</span>
                                    </p>
                                </div>
                                <span className={`self-start sm:self-auto px-3 sm:px-4 py-1 rounded-2xl text-white text-xs sm:text-sm capitalize ${item.status==='approved' ? 'bg-green-700' : item.status==='rejected' ? 'bg-red-700' : 'bg-yellow-500'}`}>
                                  {item.status}
                                </span>
                            </div>
                        </Card>
                    </>)}
            </div>
            <div>
            </div>
        </>
    )
}

export default LeaveHistory
