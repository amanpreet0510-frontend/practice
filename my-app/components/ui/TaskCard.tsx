'use client';
import React,{useEffect, useReducer} from 'react';
import { Card, CardHeader } from "@/components/ui/Card";
import {
    Users,
    Building2,
    ClipboardList,
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Megaphone
  } from 'lucide-react';
  import { useTaskStore } from '@/store/taskStore';
  import { useUserStore } from "@/store/userStore";


const TaskCard = () => {

    const { user } = useUserStore();
    const { tasks, fetchTasks} =useTaskStore();

    useEffect(() => {
        if (user?.id) {
          fetchTasks();
        }
      }, [user?.id, fetchTasks]);


      const pendingTask = tasks.filter(
        task => task.task_status === "pending"
      ).length;
      
      const completedTask = tasks.filter(
        task => task.task_status === "completed"
      ).length;
      
  return (
   <>
   <Card className="hover:bg-zinc-300 border-zinc-300 ps-10 pe-10  shadow-md shadow-zinc-500 z-20">
    <div className='flex justify-center  gap-15'>
    <div>
    <h3 className='text-xl text-zinc-600  font-bold'>Pending Tasks</h3>
    <span className='text-zinc-600 mt-10'>{pendingTask}</span>
    </div>
    <div>
    <ClipboardList className='p-2 h-15 w-15 rounded-2xl text-zinc-600'/>
    </div>
    </div>
   </Card>
   <Card className="hover:bg-zinc-300 text-zinc-600 border-zinc-300 ps-10 pe-10 pt-8 shadow-md shadow-zinc-500 z-20">
   <div className='flex justify-between gap-5'>
   <span><h3 className='text-xl font-bold'>Completed Tasks</h3>
   {completedTask}</span>
   <CheckCircle2 className='p-2 h-15 w-15 rounded-2xl'/>
   </div>
   </Card>
   </>
  )
}

export default TaskCard;