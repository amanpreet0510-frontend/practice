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
   <Card className='p-10'>
    <div className='flex justify-between w-50  gap-5'>
    <span><h3>Pending Tasks</h3>
    {pendingTask}</span>
    <ClipboardList className='bg-blue-300 p-2 h-15 w-15 rounded-2xl'/>
    </div>
   </Card>
   <Card className='p-10'>
   <div className='flex justify-between gap-5'>
   <span><h3>Completed Tasks</h3>
   {completedTask}</span>
   <CheckCircle2 className='bg-green-200 p-2 h-15 w-15 rounded-2xl'/>
   </div>
   </Card>
   </>
  )
}

export default TaskCard;