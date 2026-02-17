"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { fetchAllUsers } from "../../slices/profileSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { LucideMail, LucidePhone } from 'lucide-react';
import ViewProfile from '@/components/ui/ViewProfile';

const Directory = () => {
    const dispatch = useAppDispatch();

    const { users, error } = useSelector(
        (state: RootState) => state.users
    );
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);


    return (
        <>
            <div className='m-2 sm:m-4 md:m-5 lg:m-6 xl:p-1 2xl:p-5 md:pt-5 w-full min-w-0 overflow-x-hidden px-1 sm:px-0'>
                <div className='p-4 sm:p-5 md:p-6 xl:p-8 pt-1 bg-gradient-to-b sticky top-16 sm:top-20 z-40 w-full from-[#0D091E] to-[#54239B] rounded-xl md:rounded-2xl'>
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl m-3 sm:m-5 ms-0 mb-0 font-bold text-white'>Employee Directory</h1>
                    <h2 className='text-xs sm:text-sm text-zinc-400 mt-1 sm:mt-2'>Browse and search employee profiles and contact information.</h2>
                </div>
                <div className='md:mt-6 lg:mt-8 mb-2 mt-4 sm:mt-5 md:m-3'>
                    <Input placeholder='search' className='w-full items-center justify-center p-4 sm:p-6 md:ps-2 md:p-6 lg:p-8 bg-zinc-100 shadow-zinc-500 shadow-md border border-zinc-100 focus:border-zinc-100 placeholder:text-xs sm:placeholder:text-sm' />
                </div>
                <div className='mt-6 sm:mt-8 lg:m-5 lg:mt-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20 border-zinc-100 shadow-white shadow-lg'>
                        {users.map((user) =>
                            <React.Fragment key={user.id}>
                                <div className='pt-6 sm:pt-8 md:pt-10 grid grid-cols-1 border-2 border-zinc-200 min-h-[200px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px] xl:min-h-[300px] w-full rounded-2xl bg-zinc-200 shadow-2xl p-4 sm:p-5'>
                                    <div className='flex justify-between items-center gap-4 sm:gap-7 ps-3 sm:ps-5'>
                                        {user.image && <Image src={user.image} alt='' height={48} width={48} className='rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 object-cover' />}
                                        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-600 font-medium truncate flex-1 min-w-0'>{user.name}</p>
                                    </div>
                                    <div className='pe-3 sm:pe-5 pt-3 sm:pt-5'>
                                        <div className='flex justify-between ps-3 sm:ps-6 gap-2 md:gap-5 py-1'>
                                            <div className='text-xs sm:text-sm md:text-base text-zinc-600 shrink-0'>Department:</div>
                                            <div className='min-w-0 truncate'><p className='truncate'>{user.department}</p></div>
                                        </div>
                                        <div className='flex justify-between ps-3 sm:ps-6 gap-2 md:gap-5 py-1'>
                                            <div className='text-zinc-500 shrink-0'><LucideMail className='w-4 h-4 sm:w-5 sm:h-5'/></div>
                                            <div className='min-w-0 truncate'><p className='text-zinc-500 text-xs sm:text-sm truncate'>{user.email}</p></div>
                                        </div>
                                        <div className='flex ps-3 sm:ps-6 justify-between gap-4 sm:gap-8 py-2 sm:py-3'>
                                            <div className='shrink-0'><LucidePhone size={20} className='text-zinc-600 sm:w-6 sm:h-6' /></div>
                                            <div className='min-w-0'><p className='text-zinc-600 text-xs sm:text-sm'>{user.mobile}</p></div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center m-auto mt-4 sm:mt-6 rounded-2xl border border-zinc-200 items-center mb-4 sm:mb-6'>
                                        <button
                                            onClick={() => {
                                                setSelectedUserId(user.id);
                                                setOpen(true);
                                            }}
                                            className='bg-[#331961] flex justify-center m-auto rounded-xl border border-zinc-200 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg w-full max-w-[160px] sm:max-w-[180px] items-center hover:opacity-90 transition'
                                        >
                                            <p className='text-zinc-300'>View Profile</p>
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment>)}
                    </div>
                </div>
            </div>

            {open && selectedUserId && (
                <ViewProfile
                    userId={selectedUserId}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedUserId(null);
                    }}
                />
            )}
        </>
    )
}

export default Directory;