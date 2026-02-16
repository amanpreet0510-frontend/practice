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
            <div className='rounded-2xl p-15 pt-5 '>
                <div className='p-8 bg-gradient-to-b sticky top-0 z-50 w-full from-[#0D091E] to-[#54239B]  rounded-2xl '>
                    <h1 className='text-3xl m-5 ms-0 mb-0 font-bold text-white'>Employee Directory</h1>
                    <h2 className='text-sm text-zinc-400 mt-2'>Browse and search employee profiles and contact information.</h2>
                </div>
                <div className='mt-8 mb-2 m-3'>
                    <Input placeholder='search' className='items-center justify-center  ps-2  bg-zinc-100 shadow-zinc-500 shadow-md p-8 border border-zinc-100  focus:border-zinc-100' />
                </div>
                <div className='m-5 mt-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 border-zinc-100  shadow-white shadow-lg'>
                        {users.map((user) =>
                            <React.Fragment key={user.id}>
                                <div className='pt-10 ps-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  border-2 border-zinc-200 h-90 w-100 rounded-2xl bg-zinc-200 shadow-2xl '>
                                    <div className='flex justify-between gap-7'>
                                        {user.image && <Image src={user.image} alt='' height={10} width={10} className='rounded-full h-15 w-15' />}
                                        <p className='text-2xl text-zinc-600'>{user.name}</p>
                                        <p className='w-full text-sm text-zinc-600'>{user.position}</p>
                                    </div>
                                    <div className='pt-25 -ms-20'>
                                        <div className='flex justify-between gap-5 py-1'>
                                            <div className='text-lg text-zinc-600'>Department:</div>
                                            <div><p>{user.department}</p></div>
                                        </div>
                                        <div className='flex justify-between gap-5 py-1'>
                                            <div className='text-zinc-500 text-sm'><LucideMail size={25} /></div>
                                            <div><p className='text-zinc-500 text-sm'>{user.email}</p></div>
                                        </div>
                                        <div className='flex justify-between gap-8 py-3'>
                                            <div><LucidePhone size={25} className='text-zinc-600' /></div>
                                            <div><p className='text-zinc-600'>{user.mobile}</p></div>
                                        </div>
                                    </div>

                                    <div className=' flex justify-center m-auto rounded-2xl  border border-zinc-200 h-10 w-40   items-center left-0 -translate-x-25 mb-8'>
                                        <button
                                            onClick={() => {
                                                setSelectedUserId(user.id);
                                                setOpen(true);
                                            }}
                                            className='bg-[#331961] flex justify-center rounded-2xl  border border-zinc-200 h-10 w-40 m-auto mb-4 items-center'
                                        >
                                            <p className='text-zinc-300 '>View Profile</p>
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