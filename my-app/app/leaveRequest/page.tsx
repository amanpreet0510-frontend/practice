import React from 'react'
import ApplyLeaveCard from '@/components/ui/ApplyleaveCard';
import LeaveDetailsCard from '@/components/ui/LeaveDetailsCard';

const LeaveRequestPage = () => {


  return (


    <>
    <div className='bg-[#1E103C] bg-gradient-to-r from-[#0D091E] to-[#54239B]'>
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