"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { LucideBuilding, LucidePlus } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProfile, addUserHierarchy, updateUserHierarchy } from "@/slices/profileSlice";
import { fetchAllUsers } from "../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import AddPosition from '@/components/ui/AddPosition';
import { User } from '@/types/user.types'


interface FormValues {
    name: string
    position: string;
    department: string;
    reportsTo: string;
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
    console.log('users', users)

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const [values, setValues] = useState<FormValues>(initialValues)

    const [open, setopen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    
    useEffect(() => {
        if (users.length > 0 && !selectedUser) {
          setSelectedUser(users[0])
        }
      }, [users,selectedUser])
      
    //   const handleSubmit = async () => {
    //     try {
    //         await dispatch(
    //             updateUserHierarchy({
    //                 userId,
    //                 name:values.name || null,
    //                 position: values.position || null,
    //                 department: values.department || null,
    //                 reports_to: values.reportsTo || null,
    //             })
    //         ).unwrap()

    //         console.log("Hierarchy updated successfully")
    //     } catch (err) {
    //         console.log("Failed to update hierarchy")
    //     }
    // }


    return (
        <>
            <Card className='m-5'>
                <div className='p-10 flex justify-between'>
                    <div>
                        <h1 className='text-4xl font-bold'>Organizational Hierarchy</h1>
                        <h3 className='text-xl pt-5 text-gray-500'>Manage reporting relationships and organizational structure</h3>
                    </div>
                    <div>
                        {users.map((user)=><><li>{user.position}</li></>)}
                        <Button className='p-7 m-8' 
                        //disabled={!selectedUser}
                        onClick={() => {
                            
                            setopen(true)
                        }
                        }><LucidePlus />Add Position</Button>
                        {selectedUser && <AddPosition
                            open={open}
                            onClose={() => setopen(false)}
                            userId={selectedUser.id}
                            initialValues={{
                                name:selectedUser.name,
                                position: selectedUser.position ?? "",
                                department: selectedUser.department ?? "",
                                reportsTo: selectedUser.reports_to ?? "",
                            }}
                           
                        />}

                    </div>
                </div>
                
            </Card>
            <Card className='m-5'>
                <div className='p-5 flex'>
                    <LucideBuilding size={40} color='gray' /><h1 className='ps-5 text-3xl font-bold'>Company Structure</h1>
                </div>
                <Card>

                </Card>
            </Card>


        </>
    )
}

export default Hierarchy