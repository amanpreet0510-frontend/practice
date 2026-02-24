import React, { useEffect } from 'react';
import { Card } from './Card';
import { fetchAllUsers } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { RootState } from "@/store";
import Image from 'next/image';
import { Button } from './button';
import { Cross, LucideBriefcase, Mail, Phone, X } from 'lucide-react';
import { User } from '@/types/user.types';


type GlobalPopupProps = {
    open: boolean
    onClose: () => void
    userId: string
}

const ViewProfile = ({ userId, onClose, open }: GlobalPopupProps) => {
    const dispatch = useAppDispatch();

    const { users, error } = useSelector(
        (state: RootState) => state.users
    );
    

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, users.length]);

    const user = users.find((u) => u.id === userId);

    

    if (!user) return null;

    return (
        <>
            {open && <Card className='fixed inset-0 z-100 flex items-center justify-center bg-black/40 text-zinc-700 p-4'>
                <div className='bg-zinc-200 rounded-xl p-4 sm:p-6 shadow-xl max-h-[90vh] w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[440px] lg:w-[440px] lg:max-w-none overflow-y-auto  border-2 border-zinc-400'>
                    <div className='flex justify-between p-2 pt-4 sm:pt-6 md:pt-10'>
                        <div>
                            <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-zinc-700'>Employee Profile</h3>
                        </div>
                        <div>
                            <Button onClick={onClose} ><X /></Button>
                        </div>
                    </div>
                    <div className='ps-3 sm:ps-5'>
                    <div className='flex gap-3 sm:gap-5 ms-1 mt-1'>
                        <div className='shrink-0'>
                            {user.image && (
                                <Image alt='' height={80} width={80} src={user.image} className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover'/>
                            )}
                        </div>
                        <div className='min-w-0'>
                            <h1 className='text-lg sm:text-xl md:text-2xl pt-2 sm:pt-5 truncate'>{user.name}</h1>
                            <h1 className='text-xs sm:text-sm text-purple-900 truncate'>{user.position}</h1>
                        </div>
                    </div>
                    <div className='ms-1 m-4 sm:m-6 md:m-8'>
                        <h4 className='text-zinc-600 text-base sm:text-lg md:text-xl'>Contact Information</h4>
                        <div className='flex gap-5 mt-3'>
                            <div><Mail /></div>
                            <div className='text-purple-900'>{user.email}</div>
                        </div>
                        <div className='flex gap-5 mt-3'>
                            <div><Phone /></div>
                            <div className='text-purple-900'>{user.mobile}</div>
                        </div>
                    </div>
                    <div className='ms-1 m-4 sm:m-6 md:m-8'>
                        <h4 className='text-zinc-600 text-base sm:text-lg md:text-xl'>Professional Details</h4>
                        <div className='flex gap-5 mt-3 text-zinc-500'>
                            <div><LucideBriefcase /></div>
                            <div className='text-md'>
                                <p>Department</p>
                                <p className='text-sm text-purple-900'>{user.department}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 sm:mt-5 text-zinc-600 text-base sm:text-lg md:text-xl'><h3>Reports to</h3><span className='break-words'>{user.reports_to}</span></div>
                    <div className='mt-3'><h2>Location</h2></div>
                    <div className='mt-3 gap-5 flex '>
                        <div><h2>Status</h2></div>
                        <div><button className={`rounded-2xl text-sm text-zinc-300  px-5 ${user?.is_active ? "bg-green-800" : "bg-red-700"}`}>{user?.is_active ? "active" : "Inactive"}</button></div>
                    </div>
                    </div>
                </div>
            </Card>}
        </>
    )
}

export default ViewProfile