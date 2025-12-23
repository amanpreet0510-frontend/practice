import React from 'react'
import ApplyLeaveCard from '@/components/ui/ApplyleaveCard';
import LeaveDetailsCard from '@/components/ui/LeaveDetailsCard';

const LeaveRequestPage = () => {


  return (


    <>
    <div className='bg-[#F4FFC3]'>
    <div className=' p-10'>
    <ApplyLeaveCard />
    </div>
    <div className='w-full p-10'>
    <LeaveDetailsCard />
    </div>
    </div>
    </>
  )
}

export default LeaveRequestPage;