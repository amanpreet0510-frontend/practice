import React from 'react';
import { Card } from './Card';
import { LucideCalendar,LucideArrowUpRight, LucideUsers, LucideTrendingUp} from 'lucide-react';
import LeaveDetailsCard from './LeaveDetailsCard';
import Task from "@/components/ui/ReadTask";
import Link from 'next/link';

const QuickActions = () => {

    return (
        <>
            <div className='' >
                <h2 className='mt-10 mb-5 text-2xl text-zinc-500'>Quick Actions</h2>
                <div className=' grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 md:gap-10 xl:gap-10 2xl:gap-10  md:pt-2'>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                        <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideCalendar className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'><Link href='/commonLayout/leaveRequest'>Request leave</Link><LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                    <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideUsers className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'><Link href='/commonLayout/directory'>Team Directory</Link><LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                    <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideTrendingUp className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'><Link href='/commonLayout/settings'>My Profile</Link><LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    </div>
                    <div className='grid grid-cols-1 mt-15 gap-10 lg:grid-cols-2  xl:grid-cols-2  md:gap-10 xl:gap-10 2xl:gap-10  md:pt-2'>
                    <LeaveDetailsCard />
                    <Task />
                    </div>
                
            </div>
        </>
    )
}

export default QuickActions