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
   
    const [role, setRole] = useState("")
    const [values, setValues] = useState<FormValues>(initialValues)


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


           onClose()
            console.log("Hierarchy updated successfully")
        } catch (err) {
            console.log("Failed to update hierarchy")
        }
    }

    return (
        <>
            {open && <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50   '>
                <div className='bg-zinc-200  w-[600px]  h-150 rounded-xl p-6 shadow-xl'>
                    <div className='flex justify-between m-5 mb-0  pb-5'>
                        <div>
                            <h3 className='text-2xl font-bold text-zinc-700'>Edit Position</h3>
                            <h4 className='text-gray-400 text-sm mt-2'> Edit User information</h4>
                        </div>

                        <div>
                            <X onClick={onClose} />
                        </div>
                    </div>
                    <div className='ms-10 me-10 text-zinc-500'>
                    <CardTitle className='mt-2 text-lg'>Name</CardTitle>
                    <Input placeholder='name' className="border p-2 mt-3 rounded w-full" value={values.name}
                        onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                        }  ></Input>
                    <CardTitle className='mt-2 text-lg'>Position</CardTitle>
                    <Input placeholder='Position' className="border p-2 mt-3 rounded w-full" value={values.position}
                        onChange={(e) =>
                            setValues({ ...values, position: e.target.value })
                        }></Input>
                    <CardTitle className='mt-2 text-lg'>Department</CardTitle>
                    <Input placeholder='Department' className="border p-2 mt-3 rounded w-full" value={values.department}
                        onChange={(e) =>
                            setValues({ ...values, department: e.target.value })
                        }></Input>
                    <CardTitle className='mt-3 text-lg'>Reports To</CardTitle>
                    <div className='flex flex-col'>
                        <select
                            value={values.reports_to}
                            onChange={(e) =>
                                setValues({ ...values, reports_to: e.target.value })}
                            className="border p-2 rounded mt-3 w-full">
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                        </select>
                        <Button className='mt-10 mb-0 text-lg p-6 bg-[#0F0E23] text-zinc-300' onClick={handleSubmit}>Update</Button>
                    </div>
                    </div>
                </div>
            </Card>}
        </>
    )
}

export default AddPosition;