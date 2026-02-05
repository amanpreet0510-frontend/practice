"use client"
import { Card } from '@/components/ui/Card'
import { LucideBuilding, LucideSquarePen } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAppDispatch } from "@/app/hooks";
import { fetchAllUsers } from "../../slices/profileSlice";
import {  useSelector } from "react-redux";
import { RootState  } from "@/store";
import AddPosition from '@/components/ui/AddPosition';
import { User } from '@/types/user.types'
import Image from 'next/image'

interface FormValues {
    name: string;
    image: string;
    position: string;
    department: string;
    reports_to: string;
}

interface Props {
    userId: string;
    initialValues: FormValues;
}


const Hierarchy = ({ userId, initialValues }: Props) => {

    const dispatch = useAppDispatch();
    const { users, error } = useSelector(
        (state: RootState) => state.users
    );
    useEffect(() => {
        console.log('fetched users12:', users.map(u => ({ name: u.name, id: u.id,reportsTo:u.reports_to,department:u.department  })))
    }, [users])

    const assignedUsers = users
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const [values, setValues] = useState<FormValues>(initialValues)

    const [open, setopen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)



    useEffect(() => {
        if (users.length > 0 && selectedUser === null) {
            setSelectedUser(users[0])
        }

    }, [users])


    return (
        <>
            <Card className='m-5'>
                <div className='p-10 flex justify-between'>
                    <div>
                        <h1 className='text-4xl font-bold'>Organizational Hierarchy</h1>
                        <h3 className='text-xl pt-5 text-gray-500'>Manage reporting relationships and organizational structure</h3>
                    </div>
                </div>
            </Card>
            <Card className='m-5'>
                <div className='p-5 flex'>
                    <LucideBuilding size={40} color='gray' /><h1 className='ps-5 text-3xl font-bold'>Company Structure</h1>
                </div>
                <div>
                    {assignedUsers.map((user, index) => {

                        return (
                            <>
                                <div className='flex justify-between'>
                                    <Card
                                        key={user.id ?? user.email}
                                        onClick={() => {
                                            console.log('clicked user.id', user.id)
                                            setSelectedUser(user)
                                        }}
                                        className={`m-10 w-full text-left p-3 border rounded cursor-pointer mb-2 transition-colors
      ${selectedUser?.id === user.id ? "bg-gray-100 border-green-100" : "hover:bg-gray-50"}
    `}
                                    >
                                        <div className='flex'>
                                        <div className='ms-10 mt-10'>
                                        {user.image && <Image
                                            alt={user.name ?? 'user image'}
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />}
                                        </div>
                                        <div className='p-5 text-lg'>
                                            <p>{user.name}</p>
                                            <p>{user.position}</p>
                                            <p>{user.department}</p>
                                            <p>reportsTo: {user.reports_to}</p>
                                        </div>
                                        </div>
                                    </Card>
                                    <div className='absolute right-0 -translate-x-18 translate-y-14 flex'>
                                        <button className='p-7 m-8'
                                            disabled={!selectedUser}
                                            onClick={() => {
                                                setopen(true)
                                            }
                                            }><LucideSquarePen size={32} /></button>
                                    </div>
                                </div></>)
                    })}

                    {open && selectedUser && <AddPosition
                        open={open}
                        onClose={() => {
                            setopen(false)
                        }}
                        userId={selectedUser.id}
                        initialValues={{
                            name: selectedUser.name,
                            position: selectedUser.position ?? "",
                            department: selectedUser.department ?? "",
                            reports_to: selectedUser.reports_to ?? "",
                        }}
                    />}

                </div>

            </Card>


        </>
    )
}

export default Hierarchy