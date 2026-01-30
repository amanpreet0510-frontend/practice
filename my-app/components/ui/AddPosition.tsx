import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from './Card';
import { Button } from '@/components/ui/button'
import { X } from "lucide-react";
import { Input } from './input';
import { useAppDispatch } from "@/app/hooks";
import { addUserHierarchy,updateUserHierarchy } from "@/slices/profileSlice";

interface FormValues {
    name:string;
    position: string;
    department: string;
    reports_to: string;
}

type AddPositionProps = {
    open: boolean
    onClose: () => void,
    userId: string;
    initialValues: FormValues;
}


const AddPosition = ({ open,
    onClose,
    userId,
    initialValues
}: AddPositionProps) => {
    const dispatch = useAppDispatch();

    // const [name, setName] = useState("")
    // const [position, setPosition] = useState("")
    // const [department, setDepartment] = useState("")
    const [role, setRole] = useState("")
    const [values, setValues] = useState<FormValues>(initialValues)

    // const handleSubmit = async () => {
    //     try {
    //         await dispatch(
    //             addUserHierarchy({
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

console.log('userId', userId)

    const handleSubmit = async () => {
        try {
            await dispatch(
                updateUserHierarchy({
                    userId,
                    name:values.name || null,
                    position: values.position || null,
                    department: values.department || null,
                    reports_to: values.reports_to || null,
                })
            ).unwrap()

console.log('values.reportsTo', values.reports_to)

           onClose()
            console.log("Hierarchy updated successfully")
        } catch (err) {
            console.log("Failed to update hierarchy")
        }
    }

    return (
        <>
            {open && <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50  '>
                <div className='bg-white w-[600px]  h-140 rounded-xl p-6 shadow-xl'>
                    <div className='flex justify-between mb-5 pb-5'>
                        <div>
                            <h3 className='text-2xl font-bold'>Edit Position</h3>
                            <h4 className='text-gray-400 text-md font-medium'> Edit User information</h4>
                        </div>

                        <div>
                            <X onClick={onClose} />
                        </div>
                    </div>
                    <CardTitle className='mt-2 text-lg'>Name</CardTitle>
                    <Input placeholder='name' className="border p-2 mt-2 rounded w-full" value={values.name}
                        onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                        }  ></Input>
                    <CardTitle className='mt-2 text-lg'>Position</CardTitle>
                    <Input placeholder='Position' className="border p-2 mt-2 rounded w-full" value={values.position}
                        onChange={(e) =>
                            setValues({ ...values, position: e.target.value })
                        }></Input>
                    <CardTitle className='mt-2 text-lg'>Department</CardTitle>
                    <Input placeholder='Department' className="border p-2 mt-2 rounded w-full" value={values.department}
                        onChange={(e) =>
                            setValues({ ...values, department: e.target.value })
                        }></Input>
                    <CardTitle className='mt-2 text-lg'>Reports To</CardTitle>
                    <div className='flex flex-col'>
                        <select
                            value={values.reports_to}
                            onChange={(e) =>
                                setValues({ ...values, reports_to: e.target.value })}
                            className="border p-2 rounded mt-2 w-full">
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                        </select>
                        <Button className='mt-7 text-lg p-6' onClick={handleSubmit}>Update</Button>
                    </div>
                </div>
            </Card>}
        </>
    )
}

export default AddPosition;