import { Calendar } from '../ui/calendar';
import React from 'react';

const AdminDashboard = () => {
  return (
    <>
    <div className=''>
        <h1 className='text-4xl font-extrabold p-10'>Calendar</h1>
        <Calendar className='bg-blue-300 rounded-2xl p-20'/>
    </div>
    </>
  )
}

export default AdminDashboard;