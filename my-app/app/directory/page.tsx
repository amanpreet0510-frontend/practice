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
            <div className='m-5  md:rounded-2xl xl:p-1 2xl:p-5 md:pt-5 '>
                <div className='p-5 pt-1 xl:p-8 bg-gradient-to-b sticky top-0 z-50 w-full from-[#0D091E] to-[#54239B] rounded-xl  md:rounded-2xl '>
                    <h1 className='text-sm md:text-3xl m-5 ms-0 mb-0 font-bold text-white'>Employee Directory</h1>
                    <h2 className='text-[10px] md:text-sm text-zinc-400 mt-2'>Browse and search employee profiles and contact information.</h2>
                </div>
                <div className='md:mt-8 mb-2 mt-5 md:m-3'>
                    <Input placeholder='search' className='items-center justify-center  md:ps-2  bg-zinc-100 shadow-zinc-500 shadow-md  md:p-8 border border-zinc-100  focus:border-zinc-100 placeholder:text-sm' />
                </div>
                <div className='mt-8 lg:m-5 lg:mt-10 '>
                    <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-20 2xl:gap-20 border-zinc-100  shadow-white shadow-lg'>
                        {users.map((user) =>
                            <React.Fragment key={user.id}>
                                <div className='pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  border-2 border-zinc-200 h-70 w-full md:h-80 md:w-50 xl:h-85 xl:w-70 2xl:h-90 2xl:w-120 rounded-2xl bg-zinc-200 shadow-2xl '>
                                    <div className='flex justify-between gap-7 ps-5 2xl:ps-12'>
                                        {user.image && <Image src={user.image} alt='' height={10} width={10} className='rounded-full h-10 w-15  md:h-15 md:w-15' />}
                                        <p className='md:text-2xl text-zinc-600'>{user.name}</p>
                                        {/* <p className='w-full text-sm text-zinc-600'>{user.position}</p> */}
                                    </div>
                                    <div className='pe-5 pt-5 md:pt-20 md:-ms-25 lg:pt-20 lg:-ms-15 xl:pt-25 xl:-ms-20'>
                                        <div className='flex justify-between  ps-6 md:gap-5 py-1'>
                                            <div className='text-sm md:text-lg text-zinc-600'>Department:</div>
                                            <div><p>{user.department}</p></div>
                                        </div>
                                        <div className='flex justify-between ps-6 md:justify-between  md:gap-5 py-1'>
                                            <div className='text-zinc-500 text-[10px] md:text-sm'><LucideMail/></div>
                                            <div><p className='text-zinc-500 text-sm'>{user.email}</p></div>
                                        </div>
                                        <div className='flex ps-6 justify-between gap-8 py-3'>
                                            <div><LucidePhone size={25} className='text-zinc-600' /></div>
                                            <div><p className='text-zinc-600'>{user.mobile}</p></div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center m-auto mt-2 lg:mt-55 2xl:mt-58  rounded-2xl  border border-zinc-200 h-10 w-10 md:h-10 2xl:w-50    items-center  xl:-translate-x-25 mb-8'>
                                        <button
                                            onClick={() => {
                                                setSelectedUserId(user.id);
                                                setOpen(true);
                                            }}
                                            className='bg-[#331961] flex justify-center m-auto  rounded-sm ms-0 md:ms-[50px] lg:-ms-20 xl:ms-30 2xl:ms-0 lg:rounded-2xl  border border-zinc-200 p-5 text-[10px] 2xl:text-xl h-5 w-30 xl:h-10 xl:w-50 2xl:w-100 mb-4 items-center'
                                        >
                                            <p className='text-zinc-300 w-max xl:w-full'>View Profile</p>
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