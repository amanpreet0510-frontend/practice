import React from 'react';
import { Card } from './Card';
import { LucideCalendar,LucideArrowUpRight, LucideUsers, LucideTrendingUp} from 'lucide-react';
import LeaveDetailsCard from './LeaveDetailsCard';
import Task from "@/components/ui/ReadTask";

const QuickActions = () => {

    return (
        <>
            <div >
                <h2 className='mt-10 mb-5 text-2xl text-zinc-500'>Quick Actions</h2>
                <div className=' gap-6 grid grid-cols-3'>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                        <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideCalendar className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'>Request leave<LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                    <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideUsers className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'>Team Directory<LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    <Card className='hover:bg-zinc-300 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20'>
                    <div className='flex flex-col justify-center m-auto gap-7'>
                            <LucideTrendingUp className='flex justify-center m-auto' />
                            <h3 className='flex  gap-3 border border-zinc-400 p-3 rounded-2xl'>Team Directory<LucideArrowUpRight/></h3>
                            </div>
                    </Card>
                    </div>
                    <div className='grid grid-cols-2 mt-15 gap-30'>
                    <LeaveDetailsCard />
                    <Task />
                    </div>
                
            </div>
        </>
    )
}

export default QuickActions