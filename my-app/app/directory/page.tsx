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
            <div className='rounded-2xl p-5 '>
                <div className='bg-gradient-to-b w-full from-[#0D091E] to-[#54239B] p-8 rounded-2xl '>
                    <h1 className='text-5xl m-5 font-bold text-white'>Employee Directory</h1>
                    <h2 className='text-xl text-zinc-500 m-5'>Browse and search employee profiles and contact information.</h2>
                </div>
                <Input placeholder='search' className='items-center justify-center  ps-2  mt-10 mb-10  bg-zinc-300 p-8 border border-zinc-200  focus:border-zinc-400 focus:border-2' />
                <div className=''>
                    <Card className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-b w-full from-[#0D091E] to-[#54239B]  shadow-white shadow-lg'>
                        {users.map((user) =>
                            <React.Fragment key={user.id}>
                                <div className='ms-10 mt-10 pt-15 ps-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  border-2 border-gray-300 h-110 w-100 rounded-2xl bg-zinc-300 shadow-2xl shadow-zinc-600'>
                                    {user.image && <Image src={user.image} alt='' height={10} width={10} className='rounded-full h-15 w-15' />}
                                    <ul>
                                        <li className='text-2xl text-black'>{user.name}</li>
                                        <li className='w-full text-sm text-zinc-600'>{user.position}</li>

                                        <div className='pt-15'>
                                            <div className='flex justify-between gap-5 py-3'>
                                                <div className='text-xl'>Department:</div>
                                                <div><li>{user.department}</li></div>
                                            </div>
                                            <div className='flex justify-between gap-8 py-3'>
                                                <div><LucideMail size={30} /></div>
                                                <div><li>{user.email}</li></div>
                                            </div>
                                            <div className='flex justify-between gap-8 py-3'>
                                                <div><LucidePhone size={30} /></div>
                                                <div><li>{user.mobile}</li></div>
                                            </div>
                                        </div>
                                    </ul>
                                    <div className='flex justify-center rounded-2xl bg-zinc-100 border border-zinc-200 h-10 w-40 m-auto mb-5 items-center right-0'>
                                        <button
                                            onClick={() => {
                                                setSelectedUserId(user.id);
                                                setOpen(true);
                                            }}
                                            className='flex justify-center rounded-2xl bg-zinc-100 border border-zinc-200 h-10 w-40 m-auto mb-5 items-center'
                                        >
                                            <p className='text-black'>View Profile</p>
                                        </button>
                                        </div>
                                </div>
                            </React.Fragment>)}
                    </Card>
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