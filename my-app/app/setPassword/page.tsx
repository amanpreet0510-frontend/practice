"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react';


const SetPassword = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div>
                <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50  '>
                    <div className='bg-white w-[600px]  h-100 rounded-xl p-6 shadow-xl'>
                        <div className='flex justify-between mb-5 pb-5'>
                            <div>
                                <h3 className='text-2xl font-bold'>SetPassword</h3>
                            </div>


                        </div>
                        <div className="relative">
                            <CardTitle className='mt-5 text-lg'>Password</CardTitle>
                            <Input
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                className="pr-10 mt-5 p-7"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShow(!show)}
                                className="absolute right-2 top-1/2 translate-y-2 h-7 w-7"
                            >
                                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                        </div>

                        <CardTitle className='mt-5 text-lg'>Confirm Password</CardTitle>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pr-10 mt-5 p-7"
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShow(!show)}
                            className="absolute  translate-y-10  -translate-x-10 h-7 w-7"
                        >
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                    </div>
                </Card>

            </div>
        </>
    )
}

export default SetPassword;