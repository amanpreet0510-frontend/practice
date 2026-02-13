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
            <div className=''>
                <Card className='bg-gradient-to-b  from-[#0D091E] to-[#54239B] p-10 m-5'>
                    <div>
                        <h1 className='text-white text-4xl font-bold '>Leave History</h1>
                        <p className='text-zinc-400 text-lg pt-4'>View all your past leave requests and their approval status.</p>
                    </div>
                </Card>
                {requests.map((item, index) =>
                    <>
                        <Card className='m-10 mt-5 bg-zinc-100'>
                            <div className='flex justify-between'>
                                <div className='m-5'>
                                    <p className='text-2xl font-bold text-zinc-600'>{item.leave_type}</p>
                                    <div className='text-zinc-500 text-sm pt-2 flex justify-around gap-3'>
                                    <p>{item.start_date} <span className='ps-3'>to</span></p>
                                    <p>{item.end_date}</p>
                                    <p className='text-blue-700'>({item.days}day)</p>
                                    </div>
                                    <p className='text-zinc-600 text-sm pt-2'>Reason: <span className='text-blue-600'>{item.reason}</span></p>
                                </div>
                                    <span className={`m-10 px-4 py-1 rounded-2xl text-white ${item.status==='approved' ? 'bg-green-700' : item.status==='rejected' ? 'bg-red-700' : 'bg-yellow-200'}`}>{item.status}</span>
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
