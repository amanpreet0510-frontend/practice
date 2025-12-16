import React, { useEffect } from 'react';
import {usetaskStore} from '../../store/taskStore'; 
import { useUserStore } from "@/store/userStore";
import {Card, CardHeader} from '../ui/card';



const Task = () => {
  const user = useUserStore((state) => state.user);
    const{tasks,fetchTasks}=usetaskStore();

    useEffect(()=>{
        fetchTasks()
    },[fetchTasks]);

     console.log('tasks', tasks[0])

    return (
    <>
    
    <Card>
        <CardHeader className='text-2xl font-bold'>Tasks</CardHeader>
    {tasks.map((item,id)=>
        <>
        <div key={id} className='p-15 text-2xl font-2xl fon'>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        </div>
        </>
    )}
    </Card>
    </>
  )
}

export default Task