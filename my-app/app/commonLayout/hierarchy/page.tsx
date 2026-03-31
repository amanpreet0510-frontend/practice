"use client"
import { Card } from '@/components/ui/Card'
import { LucideBuilding, LucideSquarePen } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAppDispatch } from "@/app/hooks";
import { fetchAllUsers } from "../../../slices/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AddPosition from '@/components/ui/AddPosition';
import { User } from '@/types/user.types'
import Image from 'next/image'

interface FormValues {
    name: string;
    image: string;
    position: string;
    department: string;
    reports_to: string | null;
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

    const assignedUsers = users
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const [values, setValues] = useState<FormValues>(initialValues)

    const [open, setopen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        if (open) {
          setValues(initialValues);
        }
      }, [open, initialValues]);



    useEffect(() => {
        if (users.length > 0 && selectedUser === null) {
            setSelectedUser(users[0])
        }

    }, [users])


    return (
        <>
            <div className=''>
                <Card className='bg-gradient-to-b  from-[#0D091E] to-[#54239B] shadow-white shadow-sm rounded-lg p-1 lg:p-5 2xl:m-10 mb-0 sticky top-0 z-50'>
                    <div className='p-3 flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Organizational Hierarchy</h1>
                            <h3 className='text-md pt-2 text-zinc-400'>Manage reporting relationships and organizational structure</h3>
                        </div>
                    </div>
                </Card>
                <Card className='mt-5 md:mt-0 md:m-11 shadow-zinc-600   shadow-xl rounded-2xl p-5 border border-zinc-400 '>
                    <div className='pt-5 pb-0 flex text-zinc-500'>
                        <LucideBuilding size={40} /><h1 className='text-zinc-500 ps-2 text-xl lg:text-2xl font-bold'>Company Structure</h1>
                    </div>
                    <div>
                        {assignedUsers.map((user, index) => {
                            return (
                                <>
                                    <div className='flex justify-between'>
                                        <Card
                                            key={user.id ?? user.email}
                                            onClick={() => {
                                                setSelectedUser(user)
                                            }}
                                            className={`lg:m-10 mt-2 md:mt-1 lg:mt-0 w-full text-left p-3 border border-zinc-300 rounded-2xl cursor-pointer mb-2 transition-colors
      ${selectedUser?.id === user.id ? "bg-zinc-100 border-zinc-200" : "hover:bg-white"}
    `}
                                        >
                                            <div className='flex justify-between'>
                                                <div>
                                                    <div className='flex flex-col md:flex-row text-zinc-500'>
                                                        <div className='ms-5 md:ms-10 mt-10'>
                                                            {user.image && <Image
                                                                alt={user.name ?? 'user image'}
                                                                src={user.image}
                                                                width={50}
                                                                height={50}
                                                                className="rounded-full"
                                                            />}
                                                        </div>
                                                        <div className='p-5 text-lg flex gap-30 mt-5'>
                                                            <p className=' text-blue-900'>Name : {user.name}</p>
                                                            <p className=' text-purple-950'>Position : {user.position}</p>
                                                            <p className='text-purple-950'>Department : {user.department}</p>
                                                            <p className='text-purple-950'>
                                                                Reports To: {
                                                                    users.find((u) => u.id === user.reports_to)?.name || "N/A"
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='right-0 translate-x-0 translate-y-0  lg:translate-x-0 lg:translate-y-0 flex'>
                                                    <button className='m-10  2xl:m-10'
                                                        disabled={!selectedUser}
                                                        onClick={() => {
                                                            setopen(true)
                                                        }
                                                        }><LucideSquarePen size={32} className='text-zinc-400' /></button>
                                                </div>
                                            </div>
                                        </Card>

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
                                reports_to: selectedUser.reports_to ?? null,
                            }}
                        />}

                    </div>

                </Card>

            </div>
        </>
    )
}

export default Hierarchy