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
    console.log('first', users)

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, users.length]);

    const user = users.find((u) => u.id === userId);

    console.log('user.is_active', user?.is_active)
    if (!user) return null;




    return (
        <>
            {open && <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-zinc-700'>
                <div className='bg-zinc-300  rounded-xl p-6 shadow-xl h-170 w-110 shadow-2xl shadow-zinc-500 border-3 border-zinc-400'>
                    <div className='flex justify-between p-5'>
                        <div>
                            <h3 className='text-2xl'>Employee Profile</h3>
                        </div>
                        <div>
                            <Button onClick={onClose}><X /></Button>
                        </div>
                    </div>

                    <div className='flex gap-5 ms-8'>
                        <div>
                            {user.image && (
                                <Image alt='' height={10} width={10} src={user.image} className='w-20 h-20 rounded-full' />
                            )}
                        </div>
                        <div>
                            <h1 className='text-2xl'>{user.name}</h1>
                            <h1 className='text-sm text-purple-900'>{user.position}</h1>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-zinc-500 m-8 text-xl'>Contact Information</h4>
                        <div className='flex gap-5 ms-8'>
                            <div><Mail /></div>
                            <div className='text-purple-900'>{user.email}</div>
                        </div>
                        <div className='flex gap-5 ms-8 mt-3'>
                            <div><Phone /></div>
                            <div className='text-purple-900'>{user.mobile}</div>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-zinc-500 m-8 text-xl'>Professional Deatils</h4>
                        <div className='flex gap-5 ms-8'>
                            <div><LucideBriefcase /></div>
                            <div className='text-zinc-950 text-lg'>
                                <p>Department</p>
                                <p className='text-sm text-purple-900'>{user.department}</p>
                            </div>
                        </div>
                    </div>
                    <div className='ms-8 mt-5 text-zinc-500 text-xl'><h3>Reports to</h3>{user.reports_to}</div>
                    <div className='ms-8 mt-3'><h2>Location</h2></div>
                    <div className='ms-8 mt-3 gap-5 flex '>
                        <div><h2>Status</h2></div>
                        <div><button className={`rounded-2xl text-sm text-zinc-700  px-5 ${user?.is_active ? "bg-green-200" : "bg-red-300"}`}>{user?.is_active ? "active" : "Inactive"}</button></div>
                    </div>
                </div>
            </Card>}
        </>
    )
}

export default ViewProfile