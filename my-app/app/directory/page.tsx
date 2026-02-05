"use client";
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { fetchAllUsers } from "../../slices/profileSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { LucideMail, LucidePhone } from 'lucide-react';

const Directory = () => {
    const dispatch = useAppDispatch();

    const { users, error } = useSelector(
        (state: RootState) => state.users
    );
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);
     console.log('users', users)

    return (
        <>
            <div>
                <h1 className='text-5xl  font-medium m-5'>Employee Directory</h1>
                <h2 className='text-xl text-gray-300 m-5'>Browse and search employee profiles and contact information.</h2>
                <Input placeholder='search' className='items-center justify-center w-1/2 ps-2 m-10 ' />
                <Card>
                    {users.map((user) => 
                    <>
                    <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-2 border-gray-300 h-100 w-100 rounded-2xl'>
                     {user.image && <Image src={user.image} alt='' height={50} width={50}/> }
                     <ul><li>{user.name}</li>
                     <li>{user.position}</li>
                     <li>Department:{user.department}</li>
                     <li><LucideMail/>{user.email}</li>
                     <li><LucidePhone/>{user.mobile}</li>
                     </ul>
                     </div>
                    </>)}
                   
                </Card>
            </div>
        </>
    )
}

export default Directory;